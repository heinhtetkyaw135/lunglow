import React, { useState, useRef } from 'react';
import { CameraIcon, ArrowUpRightIcon, NavBlogIcon } from '../../components/common/Icons';
import { useTheme } from '../../hooks/useTheme';
import { useLunglowData } from '../../hooks/useLunglowData';

export function AdminBlogPage() {
  const { t, isLight, themeTokens } = useTheme();
  const { blogs, handleCreateBlog, setPage } = useLunglowData();

  const [blogTitle, setBlogTitle] = useState('');
  const [blogCategory, setBlogCategory] = useState('Official Guide');
  const [blogContent, setBlogContent] = useState('');
  const [blogPhoto, setBlogPhoto] = useState(null);
  const [publishedTick, setPublishedTick] = useState(false);
  const adminPhotoRef = useRef(null);

  const adminBlogs = blogs.filter((b) => b.authorRole === 'admin');

  const handleAdminPhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') setBlogPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAdminBlogSubmit = (e) => {
    e.preventDefault();
    if (!blogTitle.trim() && !blogContent.trim()) return;
    handleCreateBlog({
      title: blogTitle || 'Official Lunglow Health Advisory',
      category: blogCategory,
      content: blogContent,
      image: blogPhoto,
    });
    setBlogTitle('');
    setBlogContent('');
    setBlogPhoto(null);
    setPublishedTick(true);
    setTimeout(() => setPublishedTick(false), 2600);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-1.5">{t.admin.blogPage.title}</h1>
        <p className={`text-xs sm:text-base ${themeTokens.mutedText} max-w-3xl`}>{t.admin.blogPage.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Editor */}
        <form
          onSubmit={handleAdminBlogSubmit}
          className={`lg:col-span-3 rounded-3xl sm:rounded-[38px] border ${themeTokens.cardSurface} p-5 sm:p-8 flex flex-col gap-5`}
        >
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h2 className="text-lg sm:text-xl font-bold">{t.blog.formHeader}</h2>
            <span className="rounded-full bg-[#CABA3A]/25 border border-[#CABA3A] text-[#CABA3A] px-4 py-1 text-xs font-bold">
              {t.blog.officialAdminBadge}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <input
                type="text"
                required
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                placeholder={t.blog.titlePlaceholder}
                className={`w-full h-12 rounded-full border ${themeTokens.inputSurface} px-5 text-sm sm:text-base focus:outline-none`}
              />
            </div>
            <div>
              <select
                aria-label={t.blog.categoryLabel}
                value={blogCategory}
                onChange={(e) => setBlogCategory(e.target.value)}
                className={`w-full h-12 rounded-full border ${themeTokens.inputSurface} px-5 text-sm sm:text-base focus:outline-none cursor-pointer`}
              >
                {['Official Guide', 'Health & Science', 'Tips & Tricks', 'Success Story'].map((cat) => (
                  <option
                    key={cat}
                    value={cat}
                    className={isLight ? 'bg-white text-[#132211]' : 'bg-[#141814] text-white'}
                  >
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <textarea
            rows={6}
            required
            value={blogContent}
            onChange={(e) => setBlogContent(e.target.value)}
            placeholder={t.blog.contentPlaceholder}
            className={`w-full rounded-3xl border ${themeTokens.inputSurface} p-5 text-sm sm:text-base focus:outline-none resize-y`}
          />

          {blogPhoto && (
            <div className="relative w-full max-h-64 rounded-3xl overflow-hidden border border-[#5FB032]/40 animate-pop">
              <img src={blogPhoto} alt="Admin blog cover" className="w-full h-60 object-cover" />
              <button
                type="button"
                onClick={() => setBlogPhoto(null)}
                className="absolute top-3 right-3 rounded-full bg-black/80 text-white text-xs font-bold px-3.5 py-1.5"
              >
                ✕ {t.blog.removePhotoBtn}
              </button>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <input
                ref={adminPhotoRef}
                type="file"
                accept="image/*"
                onChange={handleAdminPhotoChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => adminPhotoRef.current?.click()}
                className={`px-5 py-2.5 text-xs sm:text-sm inline-flex items-center gap-2 ${themeTokens.secondaryBtn}`}
              >
                <CameraIcon className="w-4 h-4 text-[#5FB032]" />
                <span>{t.blog.uploadPhotoBtn}</span>
              </button>
            </div>

            <button
              type="submit"
              className={`px-8 py-3 text-sm sm:text-base inline-flex items-center gap-2 ${themeTokens.primaryBtn}`}
            >
              <span>{t.blog.publishBtn}</span>
              <ArrowUpRightIcon className="w-4 h-4" />
            </button>
          </div>

          {publishedTick && (
            <div className="rounded-2xl bg-[#5FB032]/15 border border-[#5FB032]/50 text-[#5FB032] px-5 py-3 text-sm font-bold flex items-center gap-2 animate-toast-in">
              <span className="w-2 h-2 rounded-full bg-[#5FB032] animate-pulse" />
              Published! Your article is now live on the user blog feed.
            </div>
          )}
        </form>

        {/* Live preview column */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className={`rounded-3xl border ${themeTokens.cardSurface} p-5`}>
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-[#CABA3A] mb-3">Live Preview</h3>
            <div className={`rounded-2xl border ${themeTokens.subCardSurface} overflow-hidden`}>
              {blogPhoto ? (
                <img src={blogPhoto} alt="" className="w-full h-36 object-cover" />
              ) : (
                <div className={`w-full h-36 flex items-center justify-center ${isLight ? 'bg-[#E2EFE0]' : 'bg-black/40'}`}>
                  <NavBlogIcon className="w-10 h-10 text-[#5FB032]/50" />
                </div>
              )}
              <div className="p-4">
                <span className="rounded-full bg-[#CABA3A]/20 border border-[#CABA3A]/60 text-[#CABA3A] px-3 py-0.5 text-[10px] font-bold">
                  {blogCategory}
                </span>
                <h4 className="font-bold mt-2 text-sm sm:text-base break-words">
                  {blogTitle || 'Your headline appears here…'}
                </h4>
                <p className={`text-xs ${themeTokens.mutedText} mt-1 line-clamp-3`}>
                  {blogContent || 'Article body preview…'}
                </p>
              </div>
            </div>
          </div>

          {/* Published admin blogs */}
          <div className={`rounded-3xl border ${themeTokens.cardSurface} p-5 flex flex-col gap-3`}>
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-[#5FB032]">
              {adminBlogs.length} Official Articles Live
            </h3>
            <div className="flex flex-col gap-2.5 max-h-[300px] overflow-y-auto pr-1">
              {adminBlogs.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setPage('blog')}
                  className={`rounded-2xl border ${themeTokens.subCardSurface} p-3.5 flex items-center gap-3 text-left lunglow-btn-spring`}
                >
                  {b.image ? (
                    <img src={b.image} alt="" className="w-12 h-12 rounded-xl object-cover shrink-0" />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-[#5FB032]/15 border border-[#5FB032]/30 flex items-center justify-center shrink-0">
                      <NavBlogIcon className="w-5 h-5 text-[#5FB032]" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="text-sm font-bold truncate">{b.title}</div>
                    <div className={`text-xs ${themeTokens.mutedText}`}>
                      {b.createdAt} • {b.likes} likes
                    </div>
                  </div>
                </button>
              ))}
              {adminBlogs.length === 0 && (
                <div className={`rounded-2xl border ${themeTokens.subCardSurface} p-6 text-center text-xs ${themeTokens.mutedText}`}>
                  No admin articles yet — publish your first one!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

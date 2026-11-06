import React, { useState, useRef } from 'react';
import {
  CameraIcon,
  TrashCanIcon,
  FlagReportIcon,
  ArrowUpRightIcon,
  NavAdminShieldIcon,
} from '../../components/common/Icons';
import { ProfileModal } from '../../components/common/ProfileModal';
import { ASSETS } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { useLunglowData } from '../../hooks/useLunglowData';

const BLOG_CATEGORIES = ['Official Guide', 'Tips & Tricks', 'Success Story', 'Health & Science'];
const MAX_BLOG_PHOTOS = 5;
const INITIAL_COMMENT_COUNT = 3;
const LONG_CONTENT_THRESHOLD = 420; // chars before "See more" collapses the body

export function BlogPage() {
  const { t, isLight, themeTokens } = useTheme();
  const { userName, isAdmin } = useAuth();
  const {
    blogs,
    handleCreateBlog,
    handleToggleBlogLike,
    handleDeleteBlog,
    handleAddBlogComment,
    handleDeleteBlogComment,
    handleOpenReportModal,
  } = useLunglowData();

  const [showEditor, setShowEditor] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(isAdmin ? 'Official Guide' : 'Tips & Tricks');
  const [content, setContent] = useState('');
  const [coverPhotos, setCoverPhotos] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});
  const [expandedComments, setExpandedComments] = useState({});
  const [expandedContent, setExpandedContent] = useState({});
  const [profileTarget, setProfileTarget] = useState(null);
  const photoInputRef = useRef(null);

  const handleCoverPhotoChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const remaining = Math.max(0, MAX_BLOG_PHOTOS - coverPhotos.length);
    const toAdd = files.slice(0, remaining);
    toAdd.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setCoverPhotos((prev) => {
            if (prev.length >= MAX_BLOG_PHOTOS) return prev;
            return [...prev, reader.result];
          });
        }
      };
      reader.readAsDataURL(file);
    });
    // reset the input so selecting the same file again re-triggers onChange
    e.target.value = '';
  };

  const removeCoverPhoto = (idx) => {
    setCoverPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;
    handleCreateBlog({
      title: title || 'Smoke-Free Health Update',
      category,
      content: content || 'Every clean day helps your lungs recover and glow.',
      image: coverPhotos[0] || null,
      images: coverPhotos,
    });
    setTitle('');
    setContent('');
    setCoverPhotos([]);
    setShowEditor(false);
  };

  const openProfile = (blog) =>
    setProfileTarget({
      author: blog.author,
      avatar: blog.authorAvatar,
      isYou: blog.author.includes(userName),
      authorRole: blog.authorRole,
    });

  const filteredBlogs = blogs.filter((b) =>
    selectedCategoryFilter === 'All' ? true : b.category === selectedCategoryFilter
  );

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* Header & Write Blog Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-1.5">
            {t.blog.title}
          </h1>
          <p className={`text-xs sm:text-base ${themeTokens.mutedText} max-w-2xl`}>
            {t.blog.subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowEditor((prev) => !prev)}
          className={`self-start sm:self-center px-7 py-3.5 text-sm sm:text-base shrink-0 ${themeTokens.primaryBtn}`}
        >
          {showEditor ? t.blog.hideFormBtn : t.blog.writeBtn}
        </button>
      </div>

      {/* Blog Composer Card (Admin & Users can write blogs and upload photos) */}
      {showEditor && (
        <form
          onSubmit={handlePublish}
          className={`rounded-3xl sm:rounded-[38px] border ${themeTokens.cardSurface} p-5 sm:p-8 flex flex-col gap-5 animate-page-enter`}
        >
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h2 className="text-xl sm:text-2xl font-bold">{t.blog.formHeader}</h2>
            <span
              className={`rounded-full px-4 py-1 text-xs font-bold inline-flex items-center gap-1.5 ${
                isAdmin
                  ? 'bg-[#CABA3A]/25 border border-[#CABA3A] text-[#CABA3A]'
                  : 'bg-[#5FB032]/20 border border-[#5FB032]/40 text-[#5FB032]'
              }`}
            >
              {isAdmin && <NavAdminShieldIcon className="w-3.5 h-3.5" />}
              <span>{isAdmin ? t.blog.officialAdminBadge : t.blog.memberAuthorBadge}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t.blog.titlePlaceholder}
                className={`w-full h-12 rounded-full border ${themeTokens.inputSurface} px-5 text-sm sm:text-base focus:outline-none`}
              />
            </div>

            <div>
              <select
                aria-label={t.blog.categoryLabel}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full h-12 rounded-full border ${themeTokens.inputSurface} px-5 text-sm sm:text-base focus:outline-none cursor-pointer`}
              >
                {BLOG_CATEGORIES.map((cat) => (
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
            rows={4}
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t.blog.contentPlaceholder}
            className={`w-full rounded-3xl border ${themeTokens.inputSurface} p-5 text-sm sm:text-base focus:outline-none resize-y`}
          />

          {coverPhotos.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {coverPhotos.map((src, idx) => (
                <div
                  key={idx}
                  className="relative rounded-2xl overflow-hidden border border-[#5FB032]/40 aspect-[4/3]"
                >
                  <img
                    src={src}
                    alt={`Blog photo ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    aria-label={`Remove photo ${idx + 1}`}
                    onClick={() => removeCoverPhoto(idx)}
                    className="absolute top-2 right-2 rounded-full bg-black/80 text-white text-xs font-bold w-6 h-6 flex items-center justify-center hover:bg-black"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-3 flex-wrap">
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleCoverPhotoChange}
                className="hidden"
              />
              <button
                type="button"
                disabled={coverPhotos.length >= MAX_BLOG_PHOTOS}
                onClick={() => photoInputRef.current?.click()}
                className={`px-5 py-2.5 text-xs sm:text-sm inline-flex items-center gap-2 ${themeTokens.secondaryBtn} ${
                  coverPhotos.length >= MAX_BLOG_PHOTOS ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <CameraIcon className="w-4 h-4 text-[#5FB032]" />
                <span>{t.blog.uploadPhotoBtn}</span>
              </button>
              <span className={`text-[11px] sm:text-xs ${themeTokens.mutedText}`}>
                {coverPhotos.length}/{MAX_BLOG_PHOTOS}
              </span>
            </div>

            <button
              type="submit"
              className={`px-8 py-3 text-sm sm:text-base inline-flex items-center gap-2 ${themeTokens.primaryBtn}`}
            >
              <span>{t.blog.publishBtn}</span>
              <ArrowUpRightIcon className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2.5">
        {['All', ...BLOG_CATEGORIES].map((cat) => {
          const active = selectedCategoryFilter === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategoryFilter(cat)}
              className={`rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all ${
                active
                  ? 'bg-[#CABA3A] text-black shadow-md scale-[1.02]'
                  : isLight
                  ? 'border border-[#2E5A1C]/20 bg-white/85 text-[#132211] hover:bg-white'
                  : 'border border-white/20 bg-black/40 text-white hover:border-white/40'
              }`}
            >
              {cat === 'All' ? t.blog.categories.all : cat}
            </button>
          );
        })}
      </div>

      {/* Blog Articles List */}
      <div className="flex flex-col gap-6 sm:gap-8">
        {filteredBlogs.map((blog) => {
          const canDelete = isAdmin || blog.author.includes(userName);
          const commentText = commentInputs[blog.id] || '';
          const blogComments = blog.comments || [];
          const commentsExpanded = !!expandedComments[blog.id];
          const visibleComments = commentsExpanded
            ? blogComments
            : blogComments.slice(0, INITIAL_COMMENT_COUNT);
          const contentExpanded = !!expandedContent[blog.id];
          const isLongContent = (blog.content || '').length > LONG_CONTENT_THRESHOLD;
          const blogPhotos = Array.isArray(blog.images) && blog.images.length > 0
            ? blog.images
            : (blog.image ? [blog.image] : []);

          return (
            <article
              key={blog.id}
              className={`rounded-3xl sm:rounded-[38px] border ${themeTokens.cardSurface} p-5 sm:p-8 flex flex-col gap-5`}
            >
              {/* Author & Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="relative group">
                    <button
                      type="button"
                      aria-label={`View ${blog.author} profile`}
                      onClick={() => openProfile(blog)}
                      className="block w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#5FB032]/40 p-1 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5FB032] cursor-pointer"
                    >
                      <img
                        src={blog.authorAvatar || ASSETS.avatar}
                        alt={blog.author}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </button>
                    <button
                      type="button"
                      title={t.blog.reportAvatar}
                      onClick={() =>
                        handleOpenReportModal({
                          targetType: 'profile-image',
                          targetId: blog.id,
                          targetAuthor: blog.author,
                          excerpt: `Profile image of ${blog.author}`,
                        })
                      }
                      className="opacity-0 group-hover:opacity-100 focus:opacity-100 absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#FF3B30] text-white flex items-center justify-center text-[10px] shadow transition"
                    >
                      <FlagReportIcon className="w-3 h-3" />
                    </button>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => openProfile(blog)}
                        className="text-base sm:text-lg font-bold hover:text-[#5FB032] transition text-left cursor-pointer"
                      >
                        {blog.author}
                      </button>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                          blog.authorRole === 'admin'
                            ? 'bg-[#CABA3A]/25 text-[#CABA3A] border border-[#CABA3A]/50'
                            : 'bg-[#5FB032]/20 text-[#5FB032]'
                        }`}
                      >
                        {blog.authorRole === 'admin'
                          ? t.blog.officialAdminBadge
                          : t.blog.memberAuthorBadge}
                      </span>
                    </div>
                    <span className={`text-xs ${themeTokens.mutedText}`}>{blog.createdAt}</span>
                  </div>
                </div>

                <span className="rounded-full border border-[#5FB032]/40 bg-[#5FB032]/15 text-[#5FB032] px-4 py-1.5 text-xs sm:text-sm font-bold">
                  {blog.category}
                </span>
              </div>

              {/* Blog Title, Photos & Content */}
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-3">
                  {blog.title}
                </h2>
                {blogPhotos.length > 0 && (
                  <div
                    className={`mb-4 gap-3 ${
                      blogPhotos.length === 1
                        ? 'block'
                        : 'grid grid-cols-2 sm:grid-cols-3'
                    }`}
                  >
                    {blogPhotos.map((src, idx) => (
                      <div
                        key={idx}
                        className={`rounded-3xl overflow-hidden border border-white/15 ${
                          blogPhotos.length === 1 ? 'w-full max-h-80' : 'aspect-[4/3]'
                        }`}
                      >
                        <img
                          src={src}
                          alt={`${blog.title} photo ${idx + 1}`}
                          className={`w-full object-cover ${
                            blogPhotos.length === 1 ? 'h-72' : 'h-full'
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                )}
                <p
                  className={`text-sm sm:text-base leading-relaxed whitespace-pre-line ${
                    isLongContent && !contentExpanded
                      ? 'line-clamp-4'
                      : ''
                  }`}
                >
                  {blog.content}
                </p>
                {isLongContent && (
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedContent((prev) => ({
                        ...prev,
                        [blog.id]: !contentExpanded,
                      }))
                    }
                    className={`mt-2 text-xs sm:text-sm font-bold transition hover:underline ${
                      isLight ? 'text-[#3A7B18]' : 'text-[#5FB032]'
                    }`}
                  >
                    {contentExpanded ? t.common.seeLess : t.common.seeMore}
                  </button>
                )}
              </div>

              {/* Actions Bar: Like, Report Blog, Delete Blog */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-current/15">
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleToggleBlogLike(blog.id)}
                    className={`rounded-full border px-4 py-2 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold transition ${
                      blog.userLiked
                        ? 'border-[#CABA3A] bg-[#CABA3A]/20'
                        : isLight
                        ? 'border-[#2E5A1C]/20 bg-[#F2F7EF]'
                        : 'border-white/20 bg-black/35'
                    }`}
                  >
                    <span>❤️</span>
                    <span>{blog.likes}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleOpenReportModal({
                        targetType: 'blog',
                        targetId: blog.id,
                        targetAuthor: blog.author,
                        excerpt: blog.title,
                      })
                    }
                    className={`rounded-full border px-4 py-2 inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium transition hover:border-[#FF3B30] hover:text-[#FF3B30] ${
                      isLight
                        ? 'border-[#2E5A1C]/20 bg-[#F2F7EF]'
                        : 'border-white/20 bg-black/35'
                    }`}
                  >
                    <FlagReportIcon className="w-3.5 h-3.5" />
                    <span>{t.blog.reportBlog}</span>
                  </button>
                </div>

                {canDelete && (
                  <button
                    type="button"
                    title="Delete blog article"
                    onClick={() => handleDeleteBlog(blog.id)}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#CABA3A] hover:brightness-110 flex items-center justify-center shadow-md lunglow-btn-spring"
                  >
                    <TrashCanIcon className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Blog Comments Section */}
              <div className={`rounded-2xl sm:rounded-3xl border ${themeTokens.subCardSurface} p-4 sm:p-5 flex flex-col gap-3.5`}>
                <div className="text-xs sm:text-sm font-bold text-[#5FB032]">
                  {t.blog.commentsTitle} ({blogComments.length})
                </div>

                {visibleComments.map((com) => (
                  <div
                    key={com.id}
                    className={`rounded-2xl border px-4 py-2.5 flex items-start justify-between gap-3 ${
                      isLight
                        ? 'border-[#2E5A1C]/15 bg-white'
                        : 'border-white/15 bg-black/35'
                    }`}
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <img
                        src={com.authorAvatar || ASSETS.avatar}
                        alt={com.author}
                        className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs sm:text-sm font-bold">{com.author}</span>
                          <span className={`text-[10px] ${themeTokens.mutedText}`}>
                            {com.createdAt}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm break-words">{com.text}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        title="Report comment"
                        onClick={() =>
                          handleOpenReportModal({
                            targetType: 'comment',
                            targetId: com.id,
                            parentId: blog.id,
                            targetAuthor: com.author,
                            excerpt: com.text,
                          })
                        }
                        className="p-1.5 rounded-full hover:bg-[#FF3B30]/15 text-[#FF3B30] transition"
                      >
                        <FlagReportIcon className="w-3.5 h-3.5" />
                      </button>

                      {(isAdmin || com.author === userName) && (
                        <button
                          type="button"
                          title="Delete comment"
                          onClick={() => handleDeleteBlogComment(blog.id, com.id)}
                          className="p-1.5 rounded-full hover:bg-red-500/15 text-[#FF3B30] transition"
                        >
                          <TrashCanIcon className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {blogComments.length > INITIAL_COMMENT_COUNT && (
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedComments((prev) => ({
                        ...prev,
                        [blog.id]: !commentsExpanded,
                      }))
                    }
                    className={`self-start text-xs sm:text-sm font-bold transition hover:underline ${
                      isLight ? 'text-[#3A7B18]' : 'text-[#5FB032]'
                    }`}
                  >
                    {commentsExpanded
                      ? t.common.seeLess
                      : `${t.common.seeMore} (${blogComments.length - INITIAL_COMMENT_COUNT})`}
                  </button>
                )}

                {/* Add Comment Input */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!commentText.trim()) return;
                    handleAddBlogComment(blog.id, commentText);
                    setCommentInputs((prev) => ({ ...prev, [blog.id]: '' }));
                  }}
                  className="flex items-center gap-2.5 pt-1"
                >
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) =>
                      setCommentInputs((prev) => ({ ...prev, [blog.id]: e.target.value }))
                    }
                    placeholder={t.blog.commentPlaceholder}
                    className={`flex-1 h-10 sm:h-11 rounded-full border ${themeTokens.inputSurface} px-4 text-xs sm:text-sm focus:outline-none`}
                  />
                  <button
                    type="submit"
                    className={`h-10 sm:h-11 px-5 text-xs sm:text-sm shrink-0 ${themeTokens.primaryBtn}`}
                  >
                    {t.blog.postCommentBtn}
                  </button>
                </form>
              </div>
            </article>
          );
        })}
      </div>

      {profileTarget && (
        <ProfileModal
          author={profileTarget.author}
          avatar={profileTarget.avatar}
          isYou={profileTarget.isYou}
          authorRole={profileTarget.authorRole}
          onClose={() => setProfileTarget(null)}
        />
      )}
    </div>
  );
}

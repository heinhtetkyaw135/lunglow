import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  FlagReportIcon,
  NavChatIcon,
  NavBlogIcon,
} from '../../components/common/Icons';
import { ASSETS } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import { useLunglowData } from '../../hooks/useLunglowData';

// Read-only "Community feed and blog feed" for admins.
// Renders posts & blog articles exactly as users see them. Reports opened via
// the Report Queue "Details" button land here with the target highlighted.
export function AdminCommunityBlogFeedPage() {
  const { t, isLight, themeTokens } = useTheme();
  const { posts, blogs, reports, reportFocusId, setReportFocusId } = useLunglowData();
  const [tab, setTab] = useState('all'); // 'all' | 'community' | 'blog'
  const itemRefs = useRef({});

  // The report being inspected (set by AdminReportsPage → setReportFocusId).
  const focusReport = useMemo(
    () => reports.find((r) => r.id === reportFocusId) || null,
    [reports, reportFocusId]
  );

  // Resolve the focused report to { kind, id, parentId } where kind tells us
  // which feed + which card to highlight.
  const focus = useMemo(() => {
    if (!focusReport) return null;
    const { targetType, targetId, parentId } = focusReport;
    if (targetType === 'post') return { kind: 'post', id: targetId };
    if (targetType === 'blog') return { kind: 'blog', id: targetId };
    if (targetType === 'comment') {
      // Find which post or blog holds this comment (parentId may be absent on
      // older reports, so fall back to scanning the comment lists).
      let parent = parentId;
      let kind = null;
      if (parent && posts.some((p) => p.id === parent)) kind = 'post';
      else if (parent && blogs.some((b) => b.id === parent)) kind = 'blog';
      if (!kind) {
        const inPost = posts.find((p) => (p.comments || []).some((c) => c.id === targetId));
        const inBlog = blogs.find((b) => (b.comments || []).some((c) => c.id === targetId));
        if (inPost) { kind = 'post'; parent = inPost.id; }
        else if (inBlog) { kind = 'blog'; parent = inBlog.id; }
      }
      return kind ? { kind: 'comment', id: targetId, parentId: parent } : null;
    }
    return null;
  }, [focusReport, posts, blogs]);

  // Sets of reported ids for quick lookup while rendering.
  const reportedPostIds = useMemo(
    () => new Set(reports.filter((r) => r.targetType === 'post').map((r) => r.targetId)),
    [reports]
  );
  const reportedBlogIds = useMemo(
    () => new Set(reports.filter((r) => r.targetType === 'blog').map((r) => r.targetId)),
    [reports]
  );
  const reportedCommentIds = useMemo(
    () => new Set(reports.filter((r) => r.targetType === 'comment').map((r) => r.targetId)),
    [reports]
  );

  // When a focus report arrives, switch to the right tab then scroll to it.
  useEffect(() => {
    if (!focus) return;
    setTab(focus.kind === 'blog' ? 'blog' : 'community');
  }, [focus]);

  useEffect(() => {
    if (!focus) return;
    const key = focus.kind === 'comment' ? focus.parentId : focus.id;
    const el = itemRefs.current[key];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [focus, tab]);

  // Clear focus when leaving so a later manual visit isn't stale.
  useEffect(() => () => setReportFocusId(null), [setReportFocusId]);

  const tabs = [
    { id: 'all', label: t.admin.feedPage.all, icon: null },
    { id: 'community', label: t.admin.feedPage.communityFeed, icon: NavChatIcon },
    { id: 'blog', label: t.admin.feedPage.blogFeed, icon: NavBlogIcon },
  ];

  const highlightCls = 'ring-2 ring-[#FF3B30] border-[#FF3B30] shadow-[0_0_0_4px_rgba(255,59,48,0.15)]';

  const reportedBadge = (extraCls = '') => (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-[#FF3B30]/20 border border-[#FF3B30] text-[#FF3B30] px-3 py-1 text-[10px] sm:text-xs font-extrabold tracking-wide ${extraCls}`}
    >
      <FlagReportIcon className="w-3 h-3" />
      {t.admin.feedPage.reportedBadge}
    </span>
  );

  const focusBanner = focusReport && (
    <div className={`rounded-2xl border ${isLight ? 'border-[#FF3B30]/40 bg-[#FF3B30]/8' : 'border-[#FF3B30]/40 bg-[#FF3B30]/10'} px-4 py-3 flex items-center justify-between gap-3 flex-wrap`}>
      <div className="flex items-center gap-2.5 min-w-0">
        <FlagReportIcon className="w-4 h-4 text-[#FF3B30] shrink-0" />
        <p className="text-xs sm:text-sm font-semibold">
          {t.admin.feedPage.reportedHighlight}{' '}
          <span className={`${themeTokens.mutedText} font-medium`}>
            {t.reportModal.targetTypes[focusReport.targetType]} • {focusReport.reason}
          </span>
        </p>
      </div>
      <button
        type="button"
        onClick={() => { setReportFocusId(null); setTab('all'); }}
        className={`px-4 py-1.5 text-xs ${themeTokens.secondaryBtn}`}
      >
        {t.common.close}
      </button>
    </div>
  );

  const renderComment = (com, parentKind) => {
    const isReported = reportedCommentIds.has(com.id);
    const isFocused = focus?.kind === 'comment' && focus.id === com.id;
    return (
      <div
        key={com.id}
        className={`rounded-2xl border px-4 py-2.5 flex items-start gap-2.5 ${
          isReported
            ? 'border-[#FF3B30]/60 ' + (isLight ? 'bg-[#FF3B30]/8' : 'bg-[#FF3B30]/10')
            : isLight
            ? 'border-[#2E5A1C]/15 bg-white'
            : 'border-white/15 bg-black/35'
        } ${isFocused ? 'ring-2 ring-[#FF3B30]' : ''}`}
      >
        <img
          src={com.authorAvatar || ASSETS.avatar}
          alt={com.author}
          className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs sm:text-sm font-bold">{com.author}</span>
            <span className={`text-[10px] ${themeTokens.mutedText}`}>{com.createdAt}</span>
            {isReported && reportedBadge('!px-2.5 !py-0.5 !text-[9px]')}
          </div>
          <p className="text-xs sm:text-sm break-words">{com.text}</p>
        </div>
      </div>
    );
  };

  const renderPost = (post) => {
    const isReported = reportedPostIds.has(post.id);
    const isFocused = focus?.kind === 'post' && focus.id === post.id;
    const isParentOfFocusedComment = focus?.kind === 'comment' && focus.kind === 'comment' && focus.parentId === post.id;
    const isTipPost = post.postType === 'tip';
    const badgeText = isTipPost
      ? post.tipCategory || 'Tips & Tricks'
      : post.badgeCustom ||
        (post.badgeKey === 'progress'
          ? t.profile.tabProgress
          : post.badgeKey === 'vault'
          ? t.profile.tabVault
          : t.profile.tabCleanWeeks);
    const postComments = post.comments || [];
    const cardHighlight = isFocused || isParentOfFocusedComment ? highlightCls : '';

    return (
      <article
        key={post.id}
        ref={(el) => (itemRefs.current[post.id] = el)}
        className={`rounded-3xl sm:rounded-[38px] border ${themeTokens.cardSurface} p-5 sm:p-8 flex flex-col gap-5 transition-shadow ${cardHighlight}`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <img
              src={post.authorAvatar || ASSETS.avatar}
              alt={post.author}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border border-[#5FB032]/40"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-lg sm:text-xl font-bold">{post.author}</span>
                {isReported && reportedBadge()}
                {isParentOfFocusedComment && !isReported && reportedBadge()}
              </div>
              <span className={`text-xs ${themeTokens.mutedText}`}>
                {t.admin.feedPage.communityFeed}
              </span>
            </div>
          </div>
          <div
            className={`rounded-full border px-5 py-1.5 text-xs sm:text-sm font-bold ${
              isTipPost
                ? 'border-[#CABA3A]/60 bg-[#CABA3A]/15 text-[#CABA3A]'
                : isLight
                ? 'border-[#2E5A1C]/25 bg-[#F2F7EF] text-[#2E6B12]'
                : 'border-white/25 text-[#5FB032]'
            }`}
          >
            {badgeText}
          </div>
        </div>

        {isTipPost ? (
          <div className={`rounded-2xl sm:rounded-3xl border ${themeTokens.subCardSurface} p-5 sm:p-6`}>
            {post.title && (
              <h3 className="text-lg sm:text-2xl font-bold text-[#5FB032] mb-2">{post.title}</h3>
            )}
            {post.image && (
              <div className="w-full max-h-72 rounded-2xl overflow-hidden border border-white/15 mb-4">
                <img src={post.image} alt={post.title} className="w-full h-64 object-cover" />
              </div>
            )}
            <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line">{post.content}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {(post.stats || []).map((st, idx) => (
              <div
                key={idx}
                className={`rounded-2xl sm:rounded-[28px] border ${themeTokens.subCardSurface} py-8 sm:py-10 px-4 text-center`}
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#5FB032] mb-2">
                  {st.value}
                </div>
                <div className="text-sm sm:text-base">{t.profile[st.labelKey] || st.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-current/15">
          {['fire', 'clap', 'heart'].map((rType) => {
            const emoji = rType === 'fire' ? '🔥' : rType === 'clap' ? '👏' : '❤️';
            return (
              <span
                key={rType}
                className={`rounded-full border px-4 py-2 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold ${
                  isLight ? 'border-[#2E5A1C]/20 bg-[#F2F7EF]' : 'border-white/25 bg-[#181818]'
                }`}
              >
                <span>{emoji}</span>
                <span>{post.reactions?.[rType] ?? 0}</span>
              </span>
            );
          })}
        </div>

        {postComments.length > 0 && (
          <div className={`rounded-2xl sm:rounded-3xl border ${themeTokens.subCardSurface} p-4 sm:p-5 flex flex-col gap-3`}>
            <div className="text-xs sm:text-sm font-bold text-[#5FB032]">
              {t.communityExtra.commentsLabel} ({postComments.length})
            </div>
            {postComments.map((com) => renderComment(com, 'post'))}
          </div>
        )}
      </article>
    );
  };

  const renderBlog = (blog) => {
    const isReported = reportedBlogIds.has(blog.id);
    const isFocused = focus?.kind === 'blog' && focus.id === blog.id;
    const isParentOfFocusedComment = focus?.kind === 'comment' && focus.parentId === blog.id;
    const blogComments = blog.comments || [];
    const blogPhotos = Array.isArray(blog.images) && blog.images.length > 0
      ? blog.images
      : (blog.image ? [blog.image] : []);
    const cardHighlight = isFocused || isParentOfFocusedComment ? highlightCls : '';

    return (
      <article
        key={blog.id}
        ref={(el) => (itemRefs.current[blog.id] = el)}
        className={`rounded-3xl sm:rounded-[38px] border ${themeTokens.cardSurface} p-5 sm:p-8 flex flex-col gap-5 transition-shadow ${cardHighlight}`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <img
              src={blog.authorAvatar || ASSETS.avatar}
              alt={blog.author}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border border-[#5FB032]/40"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-base sm:text-lg font-bold">{blog.author}</span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                    blog.authorRole === 'admin'
                      ? 'bg-[#CABA3A]/25 text-[#CABA3A] border border-[#CABA3A]/50'
                      : 'bg-[#5FB032]/20 text-[#5FB032]'
                  }`}
                >
                  {blog.authorRole === 'admin' ? t.blog.officialAdminBadge : t.blog.memberAuthorBadge}
                </span>
                {isReported && reportedBadge()}
                {isParentOfFocusedComment && !isReported && reportedBadge()}
              </div>
              <span className={`text-xs ${themeTokens.mutedText}`}>
                {blog.createdAt} • {t.admin.feedPage.blogFeed}
              </span>
            </div>
          </div>
          <span className="rounded-full border border-[#5FB032]/40 bg-[#5FB032]/15 text-[#5FB032] px-4 py-1.5 text-xs sm:text-sm font-bold">
            {blog.category}
          </span>
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-3">{blog.title}</h2>
          {blogPhotos.length > 0 && (
            <div className={`mb-4 gap-3 ${blogPhotos.length === 1 ? 'block' : 'grid grid-cols-2 sm:grid-cols-3'}`}>
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
                    className={`w-full object-cover ${blogPhotos.length === 1 ? 'h-72' : 'h-full'}`}
                  />
                </div>
              ))}
            </div>
          )}
          <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line">{blog.content}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-current/15">
          <span
            className={`rounded-full border px-4 py-2 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold ${
              isLight ? 'border-[#2E5A1C]/20 bg-[#F2F7EF]' : 'border-white/20 bg-black/35'
            }`}
          >
            <span>❤️</span>
            <span>{blog.likes}</span>
          </span>
        </div>

        {blogComments.length > 0 && (
          <div className={`rounded-2xl sm:rounded-3xl border ${themeTokens.subCardSurface} p-4 sm:p-5 flex flex-col gap-3`}>
            <div className="text-xs sm:text-sm font-bold text-[#5FB032]">
              {t.blog.commentsTitle} ({blogComments.length})
            </div>
            {blogComments.map((com) => renderComment(com, 'blog'))}
          </div>
        )}
      </article>
    );
  };

  const showCommunity = tab === 'all' || tab === 'community';
  const showBlog = tab === 'all' || tab === 'blog';

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-1.5">{t.admin.feedPage.title}</h1>
        <p className={`text-xs sm:text-base ${themeTokens.mutedText} max-w-3xl`}>{t.admin.feedPage.subtitle}</p>
      </div>

      {focusBanner}

      <div className="flex flex-wrap items-center gap-2.5">
        {tabs.map((tabObj) => {
          const Icon = tabObj.icon;
          const active = tab === tabObj.id;
          return (
            <button
              key={tabObj.id}
              type="button"
              onClick={() => { setTab(tabObj.id); if (tabObj.id === 'all') setReportFocusId(null); }}
              className={`rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all inline-flex items-center gap-2 ${
                active
                  ? 'bg-[#CABA3A] text-black shadow-md scale-[1.02]'
                  : isLight
                  ? 'border border-[#2E5A1C]/20 bg-white/85 text-[#132211] hover:bg-white'
                  : 'border border-white/20 bg-black/40 text-white hover:border-white/40'
              }`}
            >
              {Icon && <Icon className="w-4 h-4" />}
              {tabObj.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-6 sm:gap-8">
        {showCommunity && (
          <section className="flex flex-col gap-4">
            <h2 className={`text-xs font-extrabold uppercase tracking-widest ${themeTokens.mutedText} inline-flex items-center gap-2`}>
              <NavChatIcon className="w-4 h-4" />
              {t.admin.feedPage.communityFeed}
            </h2>
            {posts.length === 0 ? (
              <div className={`rounded-2xl border ${themeTokens.subCardSurface} p-8 text-center text-sm ${themeTokens.mutedText}`}>
                {t.admin.feedPage.emptyPosts}
              </div>
            ) : (
              posts.map(renderPost)
            )}
          </section>
        )}

        {showBlog && (
          <section className="flex flex-col gap-4">
            <h2 className={`text-xs font-extrabold uppercase tracking-widest ${themeTokens.mutedText} inline-flex items-center gap-2`}>
              <NavBlogIcon className="w-4 h-4" />
              {t.admin.feedPage.blogFeed}
            </h2>
            {blogs.length === 0 ? (
              <div className={`rounded-2xl border ${themeTokens.subCardSurface} p-8 text-center text-sm ${themeTokens.mutedText}`}>
                {t.admin.feedPage.emptyBlogs}
              </div>
            ) : (
              blogs.map(renderBlog)
            )}
          </section>
        )}
      </div>
    </div>
  );
}

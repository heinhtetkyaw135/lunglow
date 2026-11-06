import React, { useState, useRef } from 'react';
import {
  TrashCanIcon,
  CameraIcon,
  FlagReportIcon,
  ArrowUpRightIcon,
} from '../../components/common/Icons';
import { ASSETS } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { useLunglowData } from '../../hooks/useLunglowData';

const TIP_TAGS = ['Tips & Tricks', 'Suggestion', 'Craving Hack', 'Motivation'];

export function CommunityFeedPage() {
  const { t, isLight, themeTokens } = useTheme();
  const { userName, userAvatar, isAdmin } = useAuth();
  const {
    feedFilter,
    setFeedFilter,
    posts,
    handleReaction,
    handleDeletePost,
    handleCreateTipPost,
    handleAddPostComment,
    handleDeletePostComment,
    handleOpenReportModal,
  } = useLunglowData();

  const [tipTitle, setTipTitle] = useState('');
  const [tipCategory, setTipCategory] = useState('Tips & Tricks');
  const [tipContent, setTipContent] = useState('');
  const [tipImage, setTipImage] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});
  const tipPhotoRef = useRef(null);

  const handleTipPhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setTipImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePublishTip = (e) => {
    e.preventDefault();
    if (!tipTitle.trim() && !tipContent.trim()) return;
    handleCreateTipPost({
      title: tipTitle || 'Helpful Quit-Smoking Tip',
      tipCategory,
      content: tipContent,
      image: tipImage,
    });
    setTipTitle('');
    setTipContent('');
    setTipImage(null);
  };

  const filterButtons = [
    { id: 'All', label: t.community.all },
    { id: 'Tips', label: t.communityExtra.filterTips },
    { id: 'Progress', label: t.communityExtra.filterProgress },
    { id: 'You', label: t.community.you },
    { id: 'Other', label: t.community.other },
  ];

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* Header & Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
          {t.community.title}
        </h1>

        <div className="flex flex-wrap items-center gap-2.5">
          {filterButtons.map((fObj) => (
            <button
              key={fObj.id}
              type="button"
              onClick={() => setFeedFilter(fObj.id)}
              className={`h-10 sm:h-11 px-4 sm:px-5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                feedFilter === fObj.id
                  ? 'bg-[#CABA3A] text-black shadow-lg scale-[1.02]'
                  : 'bg-white text-black hover:bg-white/90 border border-black/10'
              }`}
            >
              {fObj.label}
            </button>
          ))}
        </div>
      </div>

      {/* Share Suggestions, Tips & Tricks Composer Card */}
      <form
        onSubmit={handlePublishTip}
        className={`rounded-3xl sm:rounded-[38px] border ${themeTokens.cardSurface} p-5 sm:p-8 flex flex-col gap-4`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">
              {t.communityExtra.shareTipHeader}
            </h2>
            <p className={`text-xs sm:text-sm ${themeTokens.mutedText}`}>
              {t.communityExtra.shareTipSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {TIP_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setTipCategory(tag)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  tipCategory === tag
                    ? 'bg-[#5FB032] text-black font-bold shadow'
                    : isLight
                    ? 'border border-[#2E5A1C]/20 bg-[#F2F7EF]'
                    : 'border border-white/20 bg-black/35'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <input
          type="text"
          value={tipTitle}
          onChange={(e) => setTipTitle(e.target.value)}
          placeholder={t.communityExtra.tipTitlePlaceholder}
          className={`w-full h-11 sm:h-12 rounded-full border ${themeTokens.inputSurface} px-5 text-sm sm:text-base focus:outline-none`}
        />

        <textarea
          rows={3}
          value={tipContent}
          onChange={(e) => setTipContent(e.target.value)}
          placeholder={t.communityExtra.tipContentPlaceholder}
          className={`w-full rounded-3xl border ${themeTokens.inputSurface} p-4 sm:p-5 text-sm sm:text-base focus:outline-none resize-y`}
        />

        {tipImage && (
          <div className="relative w-full max-h-60 rounded-3xl overflow-hidden border border-[#5FB032]/40">
            <img src={tipImage} alt="Uploaded tip preview" className="w-full h-56 object-cover" />
            <button
              type="button"
              onClick={() => setTipImage(null)}
              className="absolute top-3 right-3 rounded-full bg-black/80 text-white text-xs font-bold px-3 py-1"
            >
              ✕
            </button>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div>
            <input
              ref={tipPhotoRef}
              type="file"
              accept="image/*"
              onChange={handleTipPhotoUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => tipPhotoRef.current?.click()}
              className={`px-5 py-2.5 text-xs sm:text-sm inline-flex items-center gap-2 ${themeTokens.secondaryBtn}`}
            >
              <CameraIcon className="w-4 h-4 text-[#5FB032]" />
              <span>{t.communityExtra.uploadImageBtn}</span>
            </button>
          </div>

          <button
            type="submit"
            className={`px-7 py-2.5 text-xs sm:text-sm inline-flex items-center gap-2 ${themeTokens.primaryBtn}`}
          >
            <span>{t.communityExtra.publishPostBtn}</span>
            <ArrowUpRightIcon className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Posts Feed */}
      <div className="flex flex-col gap-6 sm:gap-8">
        {posts
          .filter((post) => {
            if (feedFilter === 'You') return post.isYou;
            if (feedFilter === 'Other') return !post.isYou;
            if (feedFilter === 'Tips') return post.postType === 'tip';
            if (feedFilter === 'Progress') return post.postType !== 'tip';
            return true;
          })
          .map((post) => {
            const isTipPost = post.postType === 'tip';
            const badgeText = isTipPost
              ? post.tipCategory || 'Tips & Tricks'
              : post.badgeCustom ||
                (post.badgeKey === 'progress'
                  ? t.profile.tabProgress
                  : post.badgeKey === 'vault'
                  ? t.profile.tabVault
                  : t.profile.tabCleanWeeks);

            const canDelete = isAdmin || post.isYou;
            const commentText = commentInputs[post.id] || '';

            return (
              <div
                key={post.id}
                className={`rounded-3xl sm:rounded-[38px] border ${themeTokens.cardSurface} p-5 sm:p-8 flex flex-col gap-5`}
              >
                {/* Author Row */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="relative group">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#5FB032]/40 p-1 overflow-hidden">
                        <img
                          src={post.isYou ? userAvatar : post.authorAvatar || ASSETS.avatar}
                          alt={post.author}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        title={t.communityExtra.reportAvatar}
                        onClick={() =>
                          handleOpenReportModal({
                            targetType: 'profile-image',
                            targetId: post.authorId || post.id,
                            targetAuthor: post.author,
                            excerpt: `Uploaded profile photo of ${post.author}`,
                          })
                        }
                        className="opacity-0 group-hover:opacity-100 focus:opacity-100 absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#FF3B30] text-white flex items-center justify-center text-[10px] shadow transition"
                      >
                        <FlagReportIcon className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-lg sm:text-xl font-bold">
                      {post.isYou
                        ? `${userName} ${t.community.youSuffix}`
                        : post.author}
                    </span>
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

                {/* Body Content: Tip & Trick Post OR Progress Stat Cards */}
                {isTipPost ? (
                  <div className={`rounded-2xl sm:rounded-3xl border ${themeTokens.subCardSurface} p-5 sm:p-6`}>
                    {post.title && (
                      <h3 className="text-lg sm:text-2xl font-bold text-[#5FB032] mb-2">
                        {post.title}
                      </h3>
                    )}
                    {post.image && (
                      <div className="w-full max-h-72 rounded-2xl overflow-hidden border border-white/15 mb-4">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    )}
                    <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line">
                      {post.content}
                    </p>
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
                        <div className="text-sm sm:text-base">
                          {t.profile[st.labelKey] || st.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reactions, Report Post, and Delete Post Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-current/15">
                  <div className="flex flex-wrap items-center gap-2.5">
                    {['fire', 'clap', 'heart'].map((rType) => {
                      const emoji =
                        rType === 'fire' ? '🔥' : rType === 'clap' ? '👏' : '❤️';
                      return (
                        <button
                          key={rType}
                          type="button"
                          onClick={() => handleReaction(post.id, rType)}
                          className={`rounded-full border px-4 py-2 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold transition ${
                            post.userReacted?.[rType]
                              ? 'border-[#CABA3A] bg-[#CABA3A]/20'
                              : isLight
                              ? 'border-[#2E5A1C]/20 bg-[#F2F7EF] hover:border-[#2E5A1C]/50'
                              : 'border-white/25 bg-[#181818] hover:border-white/50'
                          }`}
                        >
                          <span>{emoji}</span>
                          <span>{post.reactions[rType]}</span>
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      onClick={() =>
                        handleOpenReportModal({
                          targetType: 'post',
                          targetId: post.id,
                          targetAuthor: post.author,
                          excerpt: isTipPost
                            ? post.title || post.content
                            : `${badgeText} post by ${post.author}`,
                        })
                      }
                      className={`rounded-full border px-4 py-2 inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium transition hover:border-[#FF3B30] hover:text-[#FF3B30] ${
                        isLight
                          ? 'border-[#2E5A1C]/20 bg-[#F2F7EF]'
                          : 'border-white/20 bg-black/35'
                      }`}
                    >
                      <FlagReportIcon className="w-3.5 h-3.5" />
                      <span>{t.communityExtra.reportPost}</span>
                    </button>
                  </div>

                  {canDelete && (
                    <button
                      type="button"
                      aria-label="Delete post"
                      onClick={() => handleDeletePost(post.id)}
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#CABA3A] hover:brightness-110 flex items-center justify-center shadow-lg lunglow-btn-spring"
                    >
                      <TrashCanIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Comments Section */}
                <div className={`rounded-2xl sm:rounded-3xl border ${themeTokens.subCardSurface} p-4 sm:p-5 flex flex-col gap-3`}>
                  <div className="text-xs sm:text-sm font-bold text-[#5FB032]">
                    {t.communityExtra.commentsLabel} ({(post.comments || []).length})
                  </div>

                  {(post.comments || []).map((com) => (
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
                          title={t.communityExtra.reportComment}
                          onClick={() =>
                            handleOpenReportModal({
                              targetType: 'comment',
                              targetId: com.id,
                              parentId: post.id,
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
                            onClick={() => handleDeletePostComment(post.id, com.id)}
                            className="p-1.5 rounded-full hover:bg-red-500/15 text-[#FF3B30] transition"
                          >
                            <TrashCanIcon className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!commentText.trim()) return;
                      handleAddPostComment(post.id, commentText);
                      setCommentInputs((prev) => ({ ...prev, [post.id]: '' }));
                    }}
                    className="flex items-center gap-2.5 pt-1"
                  >
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) =>
                        setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                      }
                      placeholder={t.communityExtra.writeCommentPlaceholder}
                      className={`flex-1 h-10 sm:h-11 rounded-full border ${themeTokens.inputSurface} px-4 text-xs sm:text-sm focus:outline-none`}
                    />
                    <button
                      type="submit"
                      className={`h-10 sm:h-11 px-5 text-xs sm:text-sm shrink-0 ${themeTokens.primaryBtn}`}
                    >
                      {t.communityExtra.sendCommentBtn}
                    </button>
                  </form>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

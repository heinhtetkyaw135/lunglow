import React from 'react';
import {
  CameraIcon,
  PencilIcon,
  NavProfileCardIcon,
  NavPiggyIcon,
  FlameIcon,
  ArrowUpRightIcon,
  FlagReportIcon,
  TrophyIcon,
} from '../../components/common/Icons';
import { LimitFormCard } from '../../components/common/LimitFormCard';
import { MilestoneShareCards } from '../../components/common/MilestoneShareCards';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { useLunglowData } from '../../hooks/useLunglowData';

export function ProfilePage() {
  const { t, lang, isLight, themeTokens } = useTheme();
  const {
    userName,
    userAvatar,
    isEditingProfile,
    setIsEditingProfile,
    tempName,
    setTempName,
    fileInputRef,
  } = useAuth();
  const {
    handlePhotoUpload,
    handleSaveProfileName,
    profileTab,
    setProfileTab,
    handleShareProgressCard,
    handleOpenReportModal,
    showToast,
    metrics,
    challenges,
  } = useLunglowData();

  // Challenges the user has completed (joined + full progress) earn a profile badge.
  const earnedBadges = challenges.filter((c) => c.joined && c.progress >= c.days);

  return (
    <>
      <div
        className={`flex flex-wrap items-center justify-between gap-4 pb-5 mb-8 border-b-2 ${
          isLight ? 'border-[#2E5A1C]/30' : 'border-white'
        }`}
      >
        <div className="flex items-center gap-4 sm:gap-5">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title={t.profile.changePhoto}
            className="group relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#5FB032]/50 p-1 overflow-hidden shrink-0 focus:outline-none focus:ring-2 focus:ring-[#CABA3A]"
          >
            <img
              src={userAvatar}
              alt={userName}
              className="w-full h-full rounded-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-medium">
              <CameraIcon className="w-5 h-5 text-[#CABA3A] mb-0.5" />
              <span>{t.profile.uploadOverlay}</span>
            </div>
          </button>

          {isEditingProfile ? (
            <form
              onSubmit={handleSaveProfileName}
              className="flex flex-wrap items-center gap-2.5"
            >
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Your name"
                className={`rounded-full border ${themeTokens.inputSurface} px-4 py-2 text-base sm:text-lg focus:outline-none focus:border-[#CABA3A]`}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`rounded-full border px-4 py-2 text-xs sm:text-sm font-medium inline-flex items-center gap-1.5 ${
                  isLight
                    ? 'border-[#2E5A1C]/30 bg-white hover:bg-gray-100'
                    : 'border-white/40 bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <CameraIcon className="w-4 h-4 text-[#5FB032]" />
                <span>{t.profile.uploadPhoto}</span>
              </button>
              <button
                type="submit"
                className="bg-[#CABA3A] text-black font-semibold px-5 py-2 rounded-full text-xs sm:text-sm"
              >
                {t.profile.saveBtn}
              </button>
            </form>
          ) : (
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
                {userName}
              </h2>
              <div className="flex flex-wrap items-center gap-3 mt-0.5">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs text-[#5FB032] font-medium hover:underline inline-flex items-center gap-1"
                >
                  <CameraIcon className="w-3.5 h-3.5" />
                  <span>{t.profile.changePhoto}</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleOpenReportModal({
                      targetType: 'profile-image',
                      targetId: 'u-1',
                      targetAuthor: userName,
                      excerpt: `Uploaded profile photo of ${userName}`,
                    })
                  }
                  className="text-xs text-[#FF3B30] font-medium hover:underline inline-flex items-center gap-1"
                >
                  <FlagReportIcon className="w-3 h-3" />
                  <span>{t.blog.reportAvatar}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          aria-label="Edit profile name and photo"
          onClick={() => {
            setTempName(userName);
            setIsEditingProfile((prev) => !prev);
          }}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#CABA3A] hover:brightness-110 active:scale-95 transition text-black flex items-center justify-center shrink-0 shadow-lg"
        >
          <PencilIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      <div className="mb-8">
        <LimitFormCard titleText={t.limit.resetTitle} isOnboarding={false} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <button
          type="button"
          onClick={() => setProfileTab('progress')}
          className={`h-28 sm:h-36 rounded-3xl sm:rounded-[32px] flex flex-col items-center justify-center gap-2.5 text-base sm:text-xl font-semibold transition-all shadow-xl px-3 text-center ${
            profileTab === 'progress'
              ? 'bg-[#CABA3A] text-black scale-[1.01]'
              : 'bg-white text-black hover:bg-white/90 border border-black/10'
          }`}
        >
          <NavProfileCardIcon className="w-8 h-8 sm:w-9 sm:h-9" />
          <span>{t.profile.tabProgress}</span>
        </button>

        <button
          type="button"
          onClick={() => setProfileTab('vault')}
          className={`h-28 sm:h-36 rounded-3xl sm:rounded-[32px] flex flex-col items-center justify-center gap-2.5 text-base sm:text-xl font-semibold transition-all shadow-xl px-3 text-center ${
            profileTab === 'vault'
              ? 'bg-[#CABA3A] text-black scale-[1.01]'
              : 'bg-white text-black hover:bg-white/90 border border-black/10'
          }`}
        >
          <NavPiggyIcon className="w-9 h-9 sm:w-10 sm:h-10" />
          <span>{t.profile.tabVault}</span>
        </button>

        <button
          type="button"
          onClick={() => setProfileTab('clean-weeks')}
          className={`h-28 sm:h-36 rounded-3xl sm:rounded-[32px] flex flex-col items-center justify-center gap-2.5 text-base sm:text-xl font-semibold transition-all shadow-xl px-3 text-center ${
            profileTab === 'clean-weeks'
              ? 'bg-[#CABA3A] text-black scale-[1.01]'
              : 'bg-white text-black hover:bg-white/90 border border-black/10'
          }`}
        >
          <FlameIcon className="w-8 h-8 sm:w-9 sm:h-9" color="#000000" />
          <span>{t.profile.tabCleanWeeks}</span>
        </button>
      </div>

      <div className={`rounded-3xl sm:rounded-[40px] border ${themeTokens.cardSurface} p-5 sm:p-8`}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div
            className={`rounded-full border px-5 sm:px-6 py-2 text-[#5FB032] text-sm sm:text-base font-semibold ${
              isLight ? 'border-[#2E5A1C]/25 bg-[#F3F8F0]' : 'border-white/25'
            }`}
          >
            {profileTab === 'progress' && t.profile.tabProgress}
            {profileTab === 'vault' && t.profile.tabVault}
            {profileTab === 'clean-weeks' && t.profile.tabCleanWeeks}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                showToast(
                  lang === 'my'
                    ? 'လင့်ခ်ကို ကူးယူပြီးပါပြီ!'
                    : 'Progress card link copied to clipboard!'
                )
              }
              className={`font-medium text-xs sm:text-base rounded-full px-6 py-2 transition active:scale-95 ${themeTokens.secondaryBtn}`}
            >
              {t.profile.copyLink}
            </button>

            <button
              type="button"
              onClick={handleShareProgressCard}
              className="bg-[#CABA3A] hover:brightness-110 active:scale-95 transition text-black font-semibold text-xs sm:text-base rounded-full px-6 py-2 inline-flex items-center gap-1.5"
            >
              <span>{t.profile.share}</span>
              <ArrowUpRightIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {profileTab === 'progress' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            <div className={`rounded-2xl sm:rounded-[28px] border ${themeTokens.subCardSurface} py-7 sm:py-9 px-4 text-center`}>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#5FB032] mb-2">
                {metrics.longestStreak} {t.profile.daysUnit}
              </div>
              <div className="text-sm sm:text-base">{t.profile.longestStreak}</div>
            </div>
            <div className={`rounded-2xl sm:rounded-[28px] border ${themeTokens.subCardSurface} py-7 sm:py-9 px-4 text-center`}>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#5FB032] mb-2">
                {metrics.currentStreak} {t.profile.daysUnit}
              </div>
              <div className="text-sm sm:text-base">{t.profile.currentStreak}</div>
            </div>
            <div className={`rounded-2xl sm:rounded-[28px] border ${themeTokens.subCardSurface} py-7 sm:py-9 px-4 text-center`}>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#5FB032] mb-2">
                {metrics.cleanDaysThisMonth} {t.profile.daysUnit}
              </div>
              <div className="text-sm sm:text-base">{t.profile.cleanDaysMonth}</div>
            </div>
          </div>
        )}

        {profileTab === 'vault' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            <div className={`rounded-2xl sm:rounded-[28px] border ${themeTokens.subCardSurface} py-7 sm:py-9 px-4 text-center`}>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#5FB032] mb-2">
                {metrics.totalSavedMoney} $
              </div>
              <div className="text-sm sm:text-base">{t.profile.totalSavedMoney}</div>
            </div>
            <div className={`rounded-2xl sm:rounded-[28px] border ${themeTokens.subCardSurface} py-7 sm:py-9 px-4 text-center`}>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#5FB032] mb-2">
                {metrics.totalAvoidedCigarettes}
              </div>
              <div className="text-sm sm:text-base">{t.profile.avoidedCigs}</div>
            </div>
            <div className={`rounded-2xl sm:rounded-[28px] border ${themeTokens.subCardSurface} py-7 sm:py-9 px-4 text-center`}>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#5FB032] mb-2">
                {metrics.totalReducedAndCleanDays} {t.profile.daysUnit}
              </div>
              <div className="text-sm sm:text-base">{t.profile.totalReducedCleanDays}</div>
            </div>
          </div>
        )}

        {profileTab === 'clean-weeks' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            <div className={`rounded-2xl sm:rounded-[28px] border ${themeTokens.subCardSurface} py-7 sm:py-9 px-4 text-center`}>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#5FB032] mb-2">
                {metrics.totalCleanWeeks}
              </div>
              <div className="text-sm sm:text-base">{t.profile.totalCleanWeeks}</div>
            </div>
            <div className={`rounded-2xl sm:rounded-[28px] border ${themeTokens.subCardSurface} py-7 sm:py-9 px-4 text-center`}>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#5FB032] mb-2">
                {metrics.slipsRecorded}
              </div>
              <div className="text-sm sm:text-base">{t.profile.slipRecorded}</div>
            </div>
            <div className={`rounded-2xl sm:rounded-[28px] border ${themeTokens.subCardSurface} py-7 sm:py-9 px-4 text-center`}>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#5FB032] mb-2">
                {metrics.capAdherence} %
              </div>
              <div className="text-sm sm:text-base">{t.profile.capAdherence}</div>
            </div>
          </div>
        )}
      </div>

      {/* Earned challenge badges — appears once the user completes a challenge */}
      <div className={`rounded-3xl sm:rounded-[40px] border ${themeTokens.cardSurface} p-5 sm:p-8 mt-8`}>
        <div className="flex items-center gap-2.5 mb-5">
          <TrophyIcon className="w-6 h-6 text-[#CABA3A]" />
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            {t.profile.earnedBadges}
          </h2>
          <span className="rounded-full bg-[#CABA3A]/20 text-[#CABA3A] px-3 py-0.5 text-xs font-bold">
            {earnedBadges.length}
          </span>
        </div>

        {earnedBadges.length === 0 ? (
          <p className={`text-sm ${themeTokens.mutedText}`}>{t.profile.noBadges}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {earnedBadges.map((c) => (
              <div
                key={c.id}
                className={`rounded-3xl border ${themeTokens.subCardSurface} p-4 flex flex-col items-center text-center gap-2.5`}
              >
                <div className="w-14 h-14 rounded-full bg-[#CABA3A]/20 border-2 border-[#CABA3A] flex items-center justify-center text-3xl shadow-lg">
                  {c.emoji || '🏆'}
                </div>
                <div className="font-bold text-sm sm:text-base text-[#CABA3A] leading-tight">
                  {c.reward}
                </div>
                <div className={`text-[10px] sm:text-xs leading-tight ${themeTokens.mutedText}`}>
                  {c.title}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <MilestoneShareCards />
    </>
  );
}

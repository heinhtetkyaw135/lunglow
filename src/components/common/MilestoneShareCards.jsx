import React from 'react';
import { FlameIcon, TrophyIcon, DollarCircleIcon, ArrowUpRightIcon } from './Icons';
import { useTheme } from '../../hooks/useTheme';
import { useLunglowData } from '../../hooks/useLunglowData';

export function MilestoneShareCards() {
  const { t, isLight, themeTokens } = useTheme();
  const {
    metrics,
    handleShareMilestoneCard,
    handleDownloadMilestonePng,
  } = useLunglowData();

  const milestoneList = [
    {
      id: 'streak7',
      badge: t.milestones.cards.streak7.badge,
      title: t.milestones.cards.streak7.title,
      desc: t.milestones.cards.streak7.desc,
      statValue: `${metrics.currentStreak} ${t.profile.daysUnit}`,
      unlocked: metrics.currentStreak >= 7 || metrics.longestStreak >= 7,
      icon: FlameIcon,
    },
    {
      id: 'avoided300',
      badge: t.milestones.cards.avoided300.badge,
      title: t.milestones.cards.avoided300.title,
      desc: t.milestones.cards.avoided300.desc,
      statValue: `${metrics.totalAvoidedCigarettes}`,
      unlocked: metrics.totalAvoidedCigarettes >= 300,
      icon: TrophyIcon,
    },
    {
      id: 'saved150',
      badge: t.milestones.cards.saved150.badge,
      title: t.milestones.cards.saved150.title,
      desc: t.milestones.cards.saved150.desc,
      statValue: `${metrics.totalSavedMoney} $`,
      unlocked: metrics.totalSavedMoney >= 150,
      icon: DollarCircleIcon,
    },
    {
      id: 'clean12w',
      badge: t.milestones.cards.clean12w.badge,
      title: t.milestones.cards.clean12w.title,
      desc: t.milestones.cards.clean12w.desc,
      statValue: `${metrics.totalCleanWeeks} Wks`,
      unlocked: metrics.totalCleanWeeks >= 12,
      icon: TrophyIcon,
    },
  ];

  return (
    <div className={`rounded-3xl sm:rounded-[40px] border ${themeTokens.cardSurface} p-5 sm:p-8 mt-8`}>
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1.5">
          {t.milestones.title}
        </h2>
        <p className={`text-xs sm:text-sm ${themeTokens.mutedText}`}>
          {t.milestones.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {milestoneList.map((item) => {
          const IconComp = item.icon;
          return (
            <div
              key={item.id}
              className={`rounded-3xl border ${themeTokens.subCardSurface} p-5 sm:p-6 flex flex-col justify-between gap-5 relative overflow-hidden`}
            >
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="rounded-full border border-[#5FB032]/40 bg-[#5FB032]/15 text-[#5FB032] px-4 py-1 text-xs sm:text-sm font-bold">
                  {item.badge}
                </span>

                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    item.unlocked
                      ? 'bg-[#CABA3A]/20 text-[#CABA3A]'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}
                >
                  {item.unlocked ? `✓ ${t.milestones.unlocked}` : t.milestones.inProgress}
                </span>
              </div>

              <div className="flex items-center gap-4 my-1">
                <div className="w-14 h-14 rounded-2xl bg-[#5FB032]/15 border border-[#5FB032]/30 flex items-center justify-center text-[#5FB032] shrink-0">
                  <IconComp className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#5FB032] leading-tight">
                    {item.statValue}
                  </div>
                  <div className="text-base sm:text-lg font-bold mt-0.5">
                    {item.title}
                  </div>
                </div>
              </div>

              <p className={`text-xs sm:text-sm ${themeTokens.mutedText} leading-relaxed`}>
                {item.desc}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => handleShareMilestoneCard(item)}
                  className="flex-1 rounded-full bg-[#CABA3A] hover:brightness-110 active:scale-95 text-black font-semibold text-xs sm:text-sm px-5 py-2.5 inline-flex items-center justify-center gap-1.5 transition shadow-md"
                >
                  <span>{t.milestones.shareToFeed}</span>
                  <ArrowUpRightIcon className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDownloadMilestonePng(item)}
                  className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition active:scale-95 ${
                    isLight
                      ? 'bg-gray-200 text-[#142412] hover:bg-gray-300'
                      : 'bg-white text-black hover:bg-white/90'
                  }`}
                >
                  {t.milestones.downloadPng}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

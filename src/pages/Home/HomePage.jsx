import React from 'react';
import { FlameIcon, NoSmokingIcon } from '../../components/common/Icons';
import { DailyTrackerCard } from '../../components/home/DailyTrackerCard';
import { WeeklyStatusChart } from '../../components/home/WeeklyStatusChart';
import { BreathingQuickCard } from '../../components/home/BreathingQuickCard';
import { TriggerMoodCard } from '../../components/home/TriggerMoodCard';
import { CravingHeatmapCard } from '../../components/home/CravingHeatmapCard';
import { useTheme } from '../../hooks/useTheme';
import { useLunglowData } from '../../hooks/useLunglowData';

export function HomePage() {
  const { t, themeTokens } = useTheme();
  const { metrics } = useLunglowData();

  return (
    <div className="flex flex-col gap-6 sm:gap-7">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 animate-stagger-1">
        <div className={`rounded-3xl sm:rounded-[32px] border ${themeTokens.cardSurface} px-6 py-4 flex items-center gap-4`}>
          <div className={themeTokens.iconBadge}>
            <FlameIcon className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold leading-none mb-1 tabular-nums">
              {metrics.currentStreak}
            </div>
            <div className={`text-xs sm:text-sm ${themeTokens.mutedText} font-semibold`}>
              {t.home.currentStreak}
            </div>
          </div>
        </div>

        <div className={`rounded-3xl sm:rounded-[32px] border ${themeTokens.cardSurface} px-6 py-4 flex items-center gap-4`}>
          <div className={themeTokens.iconBadge}>
            <NoSmokingIcon className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold leading-none mb-1 tabular-nums">
              {metrics.avgReducedCigarettes}
            </div>
            <div className={`text-xs sm:text-sm ${themeTokens.mutedText} font-semibold`}>
              {t.home.avgReduced}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7 animate-stagger-2">
        <DailyTrackerCard />
        <WeeklyStatusChart />
      </div>

      <div className="animate-stagger-3">
        <BreathingQuickCard />
      </div>

      <div className="animate-stagger-4 flex flex-col gap-6 sm:gap-7">
        <TriggerMoodCard />
        <CravingHeatmapCard />
      </div>
    </div>
  );
}

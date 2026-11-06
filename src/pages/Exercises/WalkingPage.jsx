import React from 'react';
import { ASSETS } from '../../types';
import { formatTimer } from '../../libs/smokingAnalytics';
import { useTheme } from '../../hooks/useTheme';
import { useLunglowData } from '../../hooks/useLunglowData';

export function WalkingPage() {
  const { t, themeTokens } = useTheme();
  const { walkingTimer, setPage } = useLunglowData();

  return (
    <div className={`rounded-3xl sm:rounded-[40px] border ${themeTokens.cardSurface} p-6 sm:p-10 lg:p-12 flex flex-col justify-between gap-6`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <button
            type="button"
            onClick={() => {
              walkingTimer.setIsActive(false);
              setPage('exercises');
            }}
            className="text-xl sm:text-2xl lg:text-3xl font-semibold hover:text-[#5FB032] transition text-left mb-3 block"
          >
            ← {t.exercises.walkingHeader}
          </button>
          <div className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            {formatTimer(walkingTimer.seconds)}
          </div>
        </div>

        <div className={`text-xs sm:text-sm ${themeTokens.mutedText}`}>
          {walkingTimer.isActive ? t.exercises.sessionActive : t.exercises.clickStartHint}
        </div>
      </div>

      <div className="my-2 sm:my-4 flex flex-col items-center justify-center">
        <div className="w-56 h-56 sm:w-72 sm:h-72 lg:w-[340px] lg:h-[340px] rounded-full overflow-hidden bg-white flex items-center justify-center shadow-2xl border border-black/10">
          <img
            src={walkingTimer.isActive ? ASSETS.walking : ASSETS.walkingStatic}
            alt={t.exercises.walkingHeader}
            className="w-[85%] h-[85%] object-contain"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-4 pt-2">
        <div className="hidden lg:block" />

        <div className="flex items-center justify-center gap-4 sm:gap-6 order-2 lg:order-1">
          <button
            type="button"
            onClick={walkingTimer.reset}
            className={`font-semibold text-base sm:text-lg rounded-full px-9 sm:px-12 py-3 shadow-lg transition active:scale-95 ${themeTokens.secondaryBtn}`}
          >
            {t.exercises.reset}
          </button>
          <button
            type="button"
            onClick={walkingTimer.toggle}
            className="bg-[#CABA3A] hover:brightness-110 active:scale-95 transition text-black font-semibold text-base sm:text-lg rounded-full px-9 sm:px-12 py-3 shadow-lg"
          >
            {walkingTimer.isActive ? t.exercises.pause : t.exercises.start}
          </button>
        </div>

        <div className="text-center lg:text-right text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight order-1 lg:order-2">
          {t.exercises.keepOn}
        </div>
      </div>
    </div>
  );
}

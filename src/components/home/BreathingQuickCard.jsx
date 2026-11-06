import React from 'react';
import { ArrowUpRightIcon } from '../common/Icons';
import { ASSETS } from '../../types';
import { formatTimer } from '../../libs/smokingAnalytics';
import { useTheme } from '../../hooks/useTheme';
import { useLunglowData } from '../../hooks/useLunglowData';

export function BreathingQuickCard() {
  const { t, isLight, themeTokens } = useTheme();
  const { breathingTimer, getBreathingPhase, isInhalePhase, setPage } = useLunglowData();

  return (
    <section
      aria-label={t.home.breathingTitle}
      className={`rounded-3xl sm:rounded-[38px] border ${themeTokens.cardSurface} p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8`}
    >
      <div className="flex-1 text-center lg:text-left">
        <div
          aria-live="polite"
          className="inline-flex items-center gap-2 rounded-full bg-[#5FB032]/15 border border-[#5FB032]/40 px-4 py-1.5 text-xs sm:text-sm font-bold text-[#5FB032] mb-3"
        >
          <span className={`w-2.5 h-2.5 rounded-full bg-[#5FB032] ${breathingTimer.isActive ? 'animate-ping' : ''}`} />
          <span>{getBreathingPhase()}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-2">
          {t.home.breathingTitle}
        </h2>
        <p className={`text-sm sm:text-base ${themeTokens.mutedText} max-w-xl mb-6 mx-auto lg:mx-0`}>
          {t.home.breathingSubtitle}
        </p>

        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6">
          <div
            aria-live="polite"
            className="text-4xl sm:text-5xl font-extrabold tracking-tight min-w-[115px] tabular-nums"
          >
            {formatTimer(breathingTimer.seconds)}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={breathingTimer.reset}
              className={`px-6 py-2.5 text-sm sm:text-base ${themeTokens.secondaryBtn}`}
            >
              {t.exercises.reset}
            </button>

            <button
              type="button"
              onClick={breathingTimer.toggle}
              className={`px-7 py-2.5 text-sm sm:text-base ${themeTokens.primaryBtn}`}
            >
              {breathingTimer.isActive ? t.exercises.pause : t.exercises.start}
            </button>

            <button
              type="button"
              onClick={() => setPage('breathing')}
              className={`rounded-full border px-5 py-2.5 text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 lunglow-btn-spring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5FB032] ${
                isLight
                  ? 'border-[#2E5A1C]/30 hover:bg-[#5FB032]/10'
                  : 'border-white/30 hover:bg-white/10'
              }`}
            >
              <span>{t.home.fullView}</span>
              <ArrowUpRightIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Animated Concentric Breathing Rings */}
      <div className="shrink-0 flex flex-col items-center relative p-3">
        <div
          aria-hidden="true"
          className={`absolute inset-0 rounded-full border-2 border-[#5FB032]/35 transition-all duration-[3500ms] ease-in-out pointer-events-none ${
            breathingTimer.isActive
              ? isInhalePhase
                ? 'scale-110 opacity-90'
                : 'scale-95 opacity-35'
              : 'scale-100 opacity-30'
          }`}
        />
        <div
          className={`relative z-10 w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden bg-[#EFE6DD] flex items-center justify-center shadow-2xl border-4 border-[#5FB032]/40 transition-transform duration-[3500ms] ease-in-out ${
            breathingTimer.isActive
              ? isInhalePhase
                ? 'scale-105'
                : 'scale-95'
              : 'scale-100'
          }`}
        >
          <img
            src={breathingTimer.isActive ? ASSETS.breathing : ASSETS.breathingStatic}
            alt={t.home.breathingTitle}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

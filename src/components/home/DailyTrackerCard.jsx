import React from 'react';
import { HomeLungIcon } from '../common/Icons';
import { useTheme } from '../../hooks/useTheme';
import { useLunglowData } from '../../hooks/useLunglowData';

export function DailyTrackerCard() {
  const { t, isLight, themeTokens, getStatusCfg } = useTheme();
  const { metrics, smokedToday, setSmokedToday, dailyLimit } = useLunglowData();

  const homeStatusCfg = getStatusCfg(metrics.todayStatus);
  const lungFillRatio = Math.max(0.08, Math.min(1, 1 - smokedToday / Math.max(1, dailyLimit)));
  const capUsagePct = Math.min(100, Math.round((smokedToday / Math.max(1, dailyLimit)) * 100));

  return (
    <section
      aria-label="Daily Cigarette Tracker"
      className={`lg:col-span-5 rounded-3xl sm:rounded-[38px] border ${themeTokens.cardSurface} p-6 sm:p-8 flex flex-col justify-between min-h-[460px] sm:min-h-[530px]`}
    >
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div
          role="status"
          aria-live="polite"
          className={`rounded-full border px-5 py-2 inline-flex items-center gap-2.5 transition-colors duration-300 ${
            isLight ? 'border-[#2E5A1C]/25 bg-[#F2F7EF]' : 'border-white/30 bg-black/35'
          }`}
        >
          <span
            className="w-3.5 h-3.5 rounded-full transition-colors duration-300"
            style={{
              backgroundColor: homeStatusCfg.color,
              boxShadow: `0 0 12px ${homeStatusCfg.color}`,
            }}
          />
          <span
            className="text-base sm:text-lg font-bold transition-colors duration-300"
            style={{ color: homeStatusCfg.color }}
          >
            {homeStatusCfg.label}
          </span>
        </div>
        <span className={`text-xs sm:text-sm ${themeTokens.mutedText} font-medium`}>
          {t.home.todayLabel}
        </span>
      </div>

      {/* Animated Lung Visual with Ambient Aura Glow */}
      <div className="my-4 sm:my-6 flex items-center justify-center relative">
        <div
          aria-hidden="true"
          className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full blur-2xl animate-pulse-glow pointer-events-none transition-colors duration-500"
          style={{ backgroundColor: `${homeStatusCfg.color}28` }}
        />
        <div className="relative z-10 animate-float-slow">
          <HomeLungIcon
            fillRatio={lungFillRatio}
            statusColor={homeStatusCfg.color}
            isLight={isLight}
            className="w-48 h-48 sm:w-60 sm:h-60 transition-all duration-500"
          />
        </div>
      </div>

      {/* Counter & Smooth Progress Bar */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center justify-center gap-5 sm:gap-7">
          <button
            type="button"
            aria-label="Decrease cigarettes smoked today"
            onClick={() => setSmokedToday((prev) => Math.max(0, prev - 1))}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#3A3E3A] hover:bg-[#4E534E] text-white text-2xl font-bold flex items-center justify-center shadow-md lunglow-btn-spring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CABA3A]"
          >
            −
          </button>

          <div
            aria-live="polite"
            aria-atomic="true"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight min-w-[125px] text-center tabular-nums"
          >
            {smokedToday}/{dailyLimit}
          </div>

          <button
            type="button"
            aria-label="Increase cigarettes smoked today"
            onClick={() => setSmokedToday((prev) => prev + 1)}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#CABA3A] hover:bg-[#d6c645] text-black text-2xl font-bold flex items-center justify-center shadow-[0_6px_18px_rgba(202,186,58,0.35)] lunglow-btn-spring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5FB032]"
          >
            +
          </button>
        </div>

        {/* Smooth Cap Adherence Progress Bar */}
        <div className="w-full max-w-[260px] h-2 rounded-full bg-black/25 overflow-hidden border border-white/10">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${capUsagePct}%`,
              backgroundColor: homeStatusCfg.color,
            }}
          />
        </div>

        <p className={`text-xs ${themeTokens.mutedText} text-center`}>
          {t.home.statusHint(dailyLimit)}
        </p>
      </div>
    </section>
  );
}

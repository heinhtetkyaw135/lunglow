import React from 'react';
import { TODAY_KEY } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import { useLunglowData } from '../../hooks/useLunglowData';

export function WeeklyStatusChart() {
  const { t, isLight, themeTokens, getStatusCfg } = useTheme();
  const { currentWeekBars, dailyLimit } = useLunglowData();

  return (
    <section
      aria-label="Weekly Status Chart"
      className={`lg:col-span-7 rounded-3xl sm:rounded-[38px] border ${themeTokens.cardSurface} p-6 sm:p-8 flex flex-col justify-between min-h-[460px] sm:min-h-[530px]`}
    >
      {/* Legend */}
      <div className="flex flex-wrap items-center justify-start sm:justify-between gap-2">
        {['clean', 'reduced', 'exceeded', 'missed', 'upcoming'].map((key) => {
          const cfg = getStatusCfg(key);
          return (
            <div
              key={key}
              className={`rounded-full border px-3.5 py-1.5 inline-flex items-center gap-2 text-xs sm:text-sm transition-colors ${
                isLight ? 'border-[#2E5A1C]/20 bg-[#F2F7EF]' : 'border-white/25 bg-black/30'
              }`}
            >
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: cfg.color }}
              />
              <span className={cfg.textClass}>{cfg.label}</span>
            </div>
          );
        })}
      </div>

      {/* Day pills — grey track + status-colored fill */}
      <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end pt-8 pb-2 flex-1">
        {currentWeekBars.map((item, idx) => {
          const cfg = getStatusCfg(item.status);
          const isToday = item.dateKey === TODAY_KEY;

          const hasLog = item.cigs !== null && item.cigs !== undefined;
          const isFullStatus = item.status === 'clean' || item.status === 'exceeded' || item.status === 'missed';
          const fillPct = isFullStatus
            ? 100
            : item.status === 'reduced' && hasLog
            ? Math.max(6, Math.min(100, (item.cigs / Math.max(1, dailyLimit)) * 100))
            : 0;

          return (
            <div
              key={item.dateKey}
              className="group flex flex-col items-center gap-2.5 sm:gap-3.5 h-full justify-end"
            >
              <span
                className={`text-[11px] sm:text-sm lg:text-base font-semibold truncate max-w-full transition-colors ${
                  isToday ? 'text-[#5FB032] font-extrabold' : ''
                }`}
              >
                {item.dayLabel}
              </span>

              {/* Track pill with bottom fill */}
              <div
                title={`${item.labelDate}: ${cfg.label}${hasLog ? ` (${item.cigs}/${dailyLimit} cigs)` : ''}`}
                className={`relative w-full max-w-[26px] sm:max-w-[38px] md:max-w-[44px] h-44 sm:h-60 lg:h-[290px] rounded-full overflow-hidden animate-bar-grow shadow-md transition-all duration-300 group-hover:scale-x-105 ${
                  isLight ? 'bg-[#DDE8D8]' : 'bg-[#3A3E3A]'
                } ${isToday ? 'ring-2 ring-[#5FB032] ring-offset-2 ring-offset-transparent shadow-[0_0_20px_rgba(95,176,50,0.45)]' : ''}`}
                style={{ animationDelay: `${idx * 55}ms` }}
              >
                {item.status !== 'upcoming' && (
                  <div
                    className="absolute left-0 right-0 bottom-0 transition-all duration-500"
                    style={{
                      height: `${fillPct}%`,
                      backgroundColor: cfg.color,
                    }}
                  />
                )}
              </div>

              <span className={`text-[10px] sm:text-xs ${themeTokens.mutedText} font-medium h-4 tabular-nums`}>
                {item.status === 'upcoming'
                  ? '—'
                  : !hasLog
                  ? t.home.missedShort
                  : `${item.cigs}`}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useLunglowData } from '../../hooks/useLunglowData';

export function CravingHeatmapCard() {
  const { t, isLight, themeTokens, weekdaysList, timeBlocksList } = useTheme();
  const {
    heatmapData,
    handleToggleHeatmapCell,
    handleLogCravingNow,
    peakWindowLabel,
  } = useLunglowData();

  const getCellStyle = (level) => {
    if (level === 2) {
      return 'bg-[#FF0000] text-white border-[#FF0000] shadow-sm';
    }
    if (level === 1) {
      return 'bg-[#CABA3A] text-black border-[#CABA3A] shadow-sm';
    }
    return isLight
      ? 'bg-[#5FB032]/20 text-[#142412] border-[#5FB032]/35'
      : 'bg-[#5FB032]/25 text-white border-[#5FB032]/40';
  };

  return (
    <div className={`rounded-3xl sm:rounded-[40px] border ${themeTokens.cardSurface} p-5 sm:p-8 flex flex-col justify-between gap-6`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-1.5">
            {t.heatmap.title}
          </h2>
          <p className={`text-xs sm:text-sm ${themeTokens.mutedText} max-w-xl`}>
            {t.heatmap.subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={handleLogCravingNow}
          className="rounded-full bg-[#CABA3A] hover:brightness-110 active:scale-95 text-black font-semibold text-xs sm:text-sm px-5 py-2.5 transition shadow-md shrink-0"
        >
          {t.heatmap.logNowBtn}
        </button>
      </div>

      {/* Peak Risk Window Callout Banner */}
      <div className={`rounded-2xl sm:rounded-3xl border ${themeTokens.subCardSurface} px-4 sm:px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2`}>
        <div className="flex items-center gap-2.5">
          <span className="w-3 h-3 rounded-full bg-[#FF0000] shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">
            {t.heatmap.peakWindowLabel}:{' '}
            <span className="text-[#CABA3A] font-bold">{peakWindowLabel}</span>
          </span>
        </div>
        <span className={`text-xs ${themeTokens.mutedText}`}>
          {t.heatmap.peakAdvice}
        </span>
      </div>

      {/* Responsive Heatmap Table Wrapper */}
      <div className="w-full overflow-x-auto pb-1">
        <div className="min-w-[520px]">
          {/* Header Row: Time Blocks */}
          <div className="grid grid-cols-7 gap-2 mb-2 text-center items-center">
            <div className="text-left text-xs font-semibold opacity-70 pl-1">Day</div>
            {timeBlocksList.map((block, idx) => (
              <div key={idx} className={`text-[11px] sm:text-xs font-medium truncate ${themeTokens.mutedText}`}>
                {block}
              </div>
            ))}
          </div>

          {/* 7 Weekday Rows */}
          <div className="flex flex-col gap-2">
            {weekdaysList.map((dayName, dIdx) => (
              <div key={dIdx} className="grid grid-cols-7 gap-2 items-center">
                <div className="text-xs sm:text-sm font-medium truncate pr-1">
                  {dayName}
                </div>
                {[0, 1, 2, 3, 4, 5].map((sIdx) => {
                  const level = heatmapData[`${dIdx}-${sIdx}`] ?? 0;
                  const levelText =
                    level === 2
                      ? t.heatmap.high
                      : level === 1
                      ? t.heatmap.moderate
                      : t.heatmap.low;
                  return (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() => handleToggleHeatmapCell(dIdx, sIdx)}
                      title={`${dayName} (${timeBlocksList[sIdx]}): ${levelText}`}
                      className={`h-8 sm:h-9 rounded-full border text-[11px] font-semibold transition-all hover:scale-105 ${getCellStyle(
                        level
                      )}`}
                    >
                      {level === 2 ? 'High' : level === 1 ? 'Med' : 'Low'}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs">
        <div className="inline-flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#5FB032]" />
          <span>{t.heatmap.low}</span>
        </div>
        <div className="inline-flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#CABA3A]" />
          <span>{t.heatmap.moderate}</span>
        </div>
        <div className="inline-flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#FF0000]" />
          <span>{t.heatmap.high}</span>
        </div>
      </div>
    </div>
  );
}

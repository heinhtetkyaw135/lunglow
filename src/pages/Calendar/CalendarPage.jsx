import React from 'react';
import { FlameIcon, TrophyIcon, NoSmokingIcon } from '../../components/common/Icons';
import { CravingHeatmapCard } from '../../components/home/CravingHeatmapCard';
import { YEARS } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import { useLunglowData } from '../../hooks/useLunglowData';

export function CalendarPage() {
  const { t, isLight, themeTokens, getStatusCfg, monthsList, weekdaysList } = useTheme();
  const {
    selectedMonthIdx,
    setSelectedMonthIdx,
    selectedYear,
    setSelectedYear,
    calendarFilter,
    setCalendarFilter,
    calendarData,
    metrics,
    dailyLimit,
  } = useLunglowData();

  return (
    <>
      <div className="flex items-center justify-end gap-3 sm:gap-4 mb-6">
        <div className="relative flex-1 sm:flex-initial">
          <select
            aria-label="Select Month"
            value={selectedMonthIdx}
            onChange={(e) => setSelectedMonthIdx(Number(e.target.value))}
            className={`w-full appearance-none rounded-full border font-medium text-sm sm:text-base pl-5 sm:pl-6 pr-10 py-2.5 focus:outline-none focus:border-[#CABA3A] cursor-pointer ${
              isLight
                ? 'border-[#2E5A1C]/25 bg-white text-[#142412] shadow-sm'
                : 'border-white/25 bg-[#111111] text-white'
            }`}
          >
            {monthsList.map((mName, idx) => (
              <option
                key={idx}
                value={idx}
                className={isLight ? 'bg-white text-[#142412]' : 'bg-[#111111] text-white'}
              >
                {mName}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#CABA3A]">
            ⌄
          </span>
        </div>

        <div className="relative flex-1 sm:flex-initial">
          <select
            aria-label="Select Year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className={`w-full appearance-none rounded-full border font-medium text-sm sm:text-base pl-5 sm:pl-6 pr-10 py-2.5 focus:outline-none focus:border-[#CABA3A] cursor-pointer ${
              isLight
                ? 'border-[#2E5A1C]/25 bg-white text-[#142412] shadow-sm'
                : 'border-white/25 bg-[#111111] text-white'
            }`}
          >
            {YEARS.map((y) => (
              <option
                key={y}
                value={y}
                className={isLight ? 'bg-white text-[#142412]' : 'bg-[#111111] text-white'}
              >
                {y}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#CABA3A]">
            ⌄
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-6 sm:mb-7">
        <div className={`rounded-3xl sm:rounded-[30px] border ${themeTokens.cardSurface} px-6 py-5 flex items-center gap-4`}>
          <FlameIcon className="w-9 h-9 sm:w-10 sm:h-10 shrink-0" />
          <div>
            <div className="text-3xl sm:text-4xl font-bold leading-none mb-1">
              {metrics.currentStreak}
            </div>
            <div className={`text-xs sm:text-sm ${themeTokens.mutedText}`}>
              {t.calendar.currentStreak}
            </div>
          </div>
        </div>

        <div className={`rounded-3xl sm:rounded-[30px] border ${themeTokens.cardSurface} px-6 py-5 flex items-center gap-4`}>
          <TrophyIcon className="w-9 h-9 sm:w-10 sm:h-10 shrink-0" />
          <div>
            <div className="text-3xl sm:text-4xl font-bold leading-none mb-1">
              {metrics.longestStreak}
            </div>
            <div className={`text-xs sm:text-sm ${themeTokens.mutedText}`}>
              {t.calendar.longestStreak}
            </div>
          </div>
        </div>

        <div className={`rounded-3xl sm:rounded-[30px] border ${themeTokens.cardSurface} px-6 py-5 flex items-center gap-4`}>
          <NoSmokingIcon className="w-10 h-10 sm:w-11 sm:h-11 shrink-0" />
          <div>
            <div className="text-3xl sm:text-4xl font-bold leading-none mb-1">
              {metrics.totalAvoidedCigarettes}
            </div>
            <div className={`text-xs sm:text-sm ${themeTokens.mutedText}`}>
              {t.calendar.avoidedCigs}
            </div>
          </div>
        </div>
      </div>

      <div className={`rounded-3xl sm:rounded-[40px] border ${themeTokens.cardSurface} p-4 sm:p-8`}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5">
            {['clean', 'reduced', 'exceeded', 'missed'].map((key) => {
              const cfg = getStatusCfg(key);
              const count = calendarData.counts[key] || 0;
              const isSelected = calendarFilter === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() =>
                    setCalendarFilter((prev) => (prev === key ? null : key))
                  }
                  className={`rounded-full border px-4 sm:px-5 py-2 sm:py-2.5 inline-flex items-center gap-2.5 text-xs sm:text-base transition-all ${
                    isSelected
                      ? isLight
                        ? 'border-[#142412] bg-[#5FB032]/15 scale-105 shadow-md'
                        : 'border-white bg-white/15 scale-105 shadow-lg'
                      : calendarFilter
                      ? 'opacity-45 hover:opacity-80 border-current/20'
                      : isLight
                      ? 'border-[#2E5A1C]/25 bg-[#F3F8F0] hover:border-[#2E5A1C]/50'
                      : 'border-white/25 bg-transparent hover:border-white/50'
                  }`}
                >
                  <span
                    className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full"
                    style={{ backgroundColor: cfg.color }}
                  />
                  <span className={cfg.textClass}>{cfg.label}</span>
                  <span className={`${cfg.textClass} ml-1 font-bold`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {calendarFilter && (
            <button
              type="button"
              onClick={() => setCalendarFilter(null)}
              className="text-xs sm:text-sm text-[#5FB032] hover:underline font-semibold"
            >
              {t.calendar.showAllDays}
            </button>
          )}
        </div>

        <div className="grid grid-cols-7 gap-1.5 sm:gap-3 text-center mb-3 sm:mb-4">
          {weekdaysList.map((d, i) => (
            <div
              key={i}
              className={`text-[11px] sm:text-sm md:text-base font-semibold truncate ${themeTokens.mutedText}`}
            >
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1.5 sm:gap-3">
          {Array.from({ length: calendarData.firstDayOfWeek }, (_, idx) => (
            <div
              key={`empty-${idx}`}
              className={`h-10 sm:h-12 md:h-14 lg:h-[62px] rounded-full border ${
                isLight
                  ? 'border-[#2E5A1C]/10 bg-[#E6F0E0]/60'
                  : 'border-white/10 bg-[#141414]/60'
              }`}
            />
          ))}

          {calendarData.days.map((dayObj) => {
            const { dayNum, status, smokedVal, isToday } = dayObj;
            const cfg = status !== 'upcoming' ? getStatusCfg(status) : null;
            const isDimmed = calendarFilter !== null && calendarFilter !== status;

            return (
              <div
                key={dayNum}
                title={`${monthsList[selectedMonthIdx]} ${dayNum}, ${selectedYear}: ${
                  status === 'upcoming'
                    ? t.status.upcoming
                    : `${cfg?.label}${
                        smokedVal !== null && smokedVal !== undefined
                          ? ` (${smokedVal}/${dailyLimit} cigs)`
                          : ''
                      }`
                }`}
                className={`h-10 sm:h-12 md:h-14 lg:h-[62px] rounded-full flex items-center justify-center text-xs sm:text-base md:text-lg lg:text-xl font-semibold transition-all select-none ${
                  isDimmed
                    ? isLight
                      ? 'bg-gray-200/70 text-gray-400 border border-gray-300 opacity-35'
                      : 'bg-[#151515] text-white/20 border border-white/10 opacity-30'
                    : cfg
                    ? `${cfg.bgClass} ${cfg.dayText} shadow-md`
                    : isLight
                    ? 'border border-[#2E5A1C]/20 bg-[#EDF5E8] text-[#142412]'
                    : 'border border-white/25 bg-[#141414] text-white'
                } ${
                  isToday && !isDimmed
                    ? 'ring-2 ring-[#5FB032] ring-offset-2 ring-offset-transparent'
                    : ''
                }`}
              >
                {dayNum}
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-6 sm:mt-8">
        <CravingHeatmapCard />
      </div>
    </>
  );
}

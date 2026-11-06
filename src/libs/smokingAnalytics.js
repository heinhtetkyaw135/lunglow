import {
  TODAY_YEAR,
  TODAY_MONTH_IDX,
  TODAY_DAY,
  TODAY_KEY,
} from '../types';

export const formatDateKey = (year, monthIdx, day) => {
  const m = String(monthIdx + 1).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
};

export const formatTimer = (totalSec) => {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

export const computeDayStatus = (dateKey, logsByDate, dailyLimit) => {
  if (dateKey > TODAY_KEY) {
    return 'upcoming';
  }
  const hasEntry = Object.prototype.hasOwnProperty.call(logsByDate, dateKey);
  const smoked = hasEntry ? logsByDate[dateKey] : undefined;
  if (smoked === null || smoked === undefined) {
    return 'missed';
  }
  if (smoked === 0) {
    return 'clean';
  }
  if (smoked <= dailyLimit) {
    return 'reduced';
  }
  return 'exceeded';
};

export const calculateLimitSummary = (cigsPerDay, cigPrice) => {
  const dailySmoked = Math.max(0, Number(cigsPerDay) || 0);
  const monthlySmoked = dailySmoked * 30;
  const unitPrice = Math.max(0, Number(cigPrice) || 0);
  const dailySpent = +(dailySmoked * unitPrice).toFixed(2);
  const monthlySpent = +(dailySpent * 30).toFixed(2);
  return { dailySmoked, monthlySmoked, dailySpent, monthlySpent };
};

export const calculateMetrics = (logsByDate, dailyLimit, cigPrice, smokedToday) => {
  let monthAvoided = 0;
  let loggedDaysCount = 0;
  let cleanDaysThisMonth = 0;
  let cleanOrReducedThisMonth = 0;
  let exceededThisMonth = 0;

  for (let d = 1; d <= TODAY_DAY; d++) {
    const k = formatDateKey(TODAY_YEAR, TODAY_MONTH_IDX, d);
    const val = logsByDate[k];
    if (val !== null && val !== undefined) {
      loggedDaysCount++;
      const avoidedOnDay = Math.max(0, dailyLimit - val);
      monthAvoided += avoidedOnDay;
      if (val === 0) cleanDaysThisMonth++;
      if (val <= dailyLimit) cleanOrReducedThisMonth++;
      else exceededThisMonth++;
    }
  }

  const historicalAvoidedBase = 152;
  const totalAvoidedCigarettes = historicalAvoidedBase + monthAvoided;
  const avgReducedCigarettes =
    loggedDaysCount > 0
      ? Math.round(monthAvoided / loggedDaysCount)
      : Math.max(0, dailyLimit - smokedToday);

  const monthSavedMoney = +(monthAvoided * cigPrice).toFixed(2);
  const totalSavedMoney = +(totalAvoidedCigarettes * cigPrice).toFixed(2);

  const todayStatus = computeDayStatus(TODAY_KEY, logsByDate, dailyLimit);
  let currentStreak = 0;
  if (todayStatus === 'clean' || todayStatus === 'reduced') {
    currentStreak = 7 + (smokedToday === 0 ? 2 : 1);
  } else {
    currentStreak = 0;
  }

  const longestStreak = Math.max(20, currentStreak);
  const totalReducedAndCleanDays = 109 + cleanOrReducedThisMonth;
  const totalCleanWeeks = 12 + (smokedToday === 0 ? 1 : 0);
  const slipsRecorded = exceededThisMonth;
  const capAdherence =
    loggedDaysCount > 0
      ? Math.round((cleanOrReducedThisMonth / loggedDaysCount) * 100)
      : 100;

  return {
    monthAvoided,
    totalAvoidedCigarettes,
    avgReducedCigarettes,
    monthSavedMoney,
    totalSavedMoney,
    currentStreak,
    longestStreak,
    cleanDaysThisMonth,
    totalReducedAndCleanDays,
    totalCleanWeeks,
    slipsRecorded,
    capAdherence,
    todayStatus,
  };
};

export const calculateWeekBars = (logsByDate, dailyLimit, weekdaysList) => {
  const weekDates = [
    { dayIdx: 0, dateKey: '2026-10-11', labelDate: 'Oct 11' },
    { dayIdx: 1, dateKey: '2026-10-12', labelDate: 'Oct 12' },
    { dayIdx: 2, dateKey: '2026-10-13', labelDate: 'Oct 13' },
    { dayIdx: 3, dateKey: '2026-10-14', labelDate: 'Oct 14' },
    { dayIdx: 4, dateKey: '2026-10-15', labelDate: 'Oct 15' },
    { dayIdx: 5, dateKey: '2026-10-16', labelDate: 'Oct 16 (Today)' },
    { dayIdx: 6, dateKey: '2026-10-17', labelDate: 'Oct 17' },
  ];
  return weekDates.map((item) => {
    const status = computeDayStatus(item.dateKey, logsByDate, dailyLimit);
    const cigs = logsByDate[item.dateKey];
    return {
      ...item,
      dayLabel: weekdaysList[item.dayIdx],
      status,
      cigs,
    };
  });
};

export const calculateCalendarMonth = (selectedYear, selectedMonthIdx, logsByDate, dailyLimit) => {
  const yearNum = parseInt(selectedYear, 10) || 2026;
  const validMonthIdx = selectedMonthIdx >= 0 && selectedMonthIdx < 12 ? selectedMonthIdx : 9;

  const firstDayOfWeek = new Date(yearNum, validMonthIdx, 1).getDay();
  const daysInMonth = new Date(yearNum, validMonthIdx + 1, 0).getDate();

  const days = [];
  const counts = { clean: 0, reduced: 0, exceeded: 0, missed: 0 };

  for (let d = 1; d <= daysInMonth; d++) {
    const dateKey = formatDateKey(yearNum, validMonthIdx, d);
    let status;
    let smokedVal = logsByDate[dateKey];

    if (dateKey > TODAY_KEY) {
      status = 'upcoming';
    } else if (Object.prototype.hasOwnProperty.call(logsByDate, dateKey)) {
      status = computeDayStatus(dateKey, logsByDate, dailyLimit);
    } else {
      const seed = (yearNum * 37 + (validMonthIdx + 1) * 13 + d * 7) % 10;
      if (seed <= 3) {
        smokedVal = 0;
        status = 'clean';
      } else if (seed <= 6) {
        smokedVal = Math.max(1, Math.round(dailyLimit * 0.6));
        status = 'reduced';
      } else if (seed <= 8) {
        smokedVal = dailyLimit + 4;
        status = 'exceeded';
      } else {
        smokedVal = null;
        status = 'missed';
      }
    }

    if (counts[status] !== undefined) {
      counts[status]++;
    }

    days.push({
      dayNum: d,
      dateKey,
      status,
      smokedVal,
      isToday: dateKey === TODAY_KEY,
    });
  }

  return {
    firstDayOfWeek,
    daysInMonth,
    days,
    counts,
  };
};

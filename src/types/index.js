/**
 * @typedef {'dark' | 'light'} ThemeMode
 * @typedef {'en' | 'my'} LanguageCode
 * @typedef {'clean' | 'reduced' | 'exceeded' | 'missed' | 'upcoming'} DayStatus
 * @typedef {'landing' | 'register' | 'login' | 'set-limit' | 'home' | 'exercises' | 'breathing' | 'walking' | 'memory-game' | 'tictactoe-game' | 'calendar' | 'goal' | 'profile' | 'community'} PageRoute
 */

export const TODAY_YEAR = 2026;
export const TODAY_MONTH_IDX = 9; // 0-indexed: 9 = October
export const TODAY_DAY = 16; // Friday, Oct 16, 2026
export const TODAY_KEY = '2026-10-16';

export const YEARS = ['2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'];

export const MONTHS_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const MONTHS_MY = [
  'ဇန်နဝါရီ', 'ဖေဖော်ဝါရီ', 'မတ်', 'ဧပြီ', 'မေ', 'ဇွန်',
  'ဇူလိုင်', 'ဩဂုတ်', 'စက်တင်ဘာ', 'အောက်တိုဘာ', 'နိုဝင်ဘာ', 'ဒီဇင်ဘာ',
];

export const WEEKDAYS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const WEEKDAYS_MY = ['တနင်္ဂနွေ', 'တနင်္လာ', 'အင်္ဂါ', 'ဗုဒ္ဓဟူး', 'ကြာသပတေး', 'သောကြာ', 'စနေ'];

export const TIME_BLOCKS_EN = ['6–9 AM', '9–12 PM', '12–3 PM', '3–6 PM', '6–9 PM', '9–12 AM'];
export const TIME_BLOCKS_MY = ['နံနက် ၆–၉', 'နံနက် ၉–၁၂', 'နေ့ ၁၂–၃', 'ညနေ ၃–၆', 'ည ၆–၉', 'ည ၉–၁၂'];

export const ASSETS = {
  background: '/assets/background_image.png',
  breathing: '/assets/breathing_exercise.gif',
  breathingStatic: '/assets/breathing_static.png',
  walking: '/assets/walking_exercise.gif',
  walkingStatic: '/assets/walking_static.png',
  avatar: '/assets/avatar.png',
};

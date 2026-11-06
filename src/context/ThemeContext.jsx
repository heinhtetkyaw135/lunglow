import React, { useState, useMemo } from 'react';
import { ThemeContext } from './theme-context';
import { I18N } from '../data/translations';
import {
  MONTHS_EN,
  MONTHS_MY,
  WEEKDAYS_EN,
  WEEKDAYS_MY,
  TIME_BLOCKS_EN,
  TIME_BLOCKS_MY,
} from '../types';
import { getThemeTokens, createStatusConfigGetter } from '../libs/themeUtils';

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('en');

  const isLight = theme === 'light';
  const t = I18N[lang];
  const weekdaysList = lang === 'my' ? WEEKDAYS_MY : WEEKDAYS_EN;
  const monthsList = lang === 'my' ? MONTHS_MY : MONTHS_EN;
  const timeBlocksList = lang === 'my' ? TIME_BLOCKS_MY : TIME_BLOCKS_EN;

  const themeTokens = useMemo(() => getThemeTokens(isLight), [isLight]);
  const getStatusCfg = useMemo(() => createStatusConfigGetter(t, isLight), [t, isLight]);

  const toggleTheme = () => setTheme((curr) => (curr === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        isLight,
        lang,
        setLang,
        t,
        weekdaysList,
        monthsList,
        timeBlocksList,
        themeTokens,
        getStatusCfg,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

import React from 'react';
import { SunIcon, MoonIcon } from '../common/Icons';
import { useTheme } from '../../hooks/useTheme';

export function TopControls() {
  const { lang, setLang, toggleTheme, isLight, t } = useTheme();

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3 select-none" role="toolbar" aria-label="Language and Theme Controls">
      <div
        role="group"
        aria-label="Language Selector"
        className={`rounded-full p-1 border flex items-center text-xs sm:text-sm font-semibold transition-colors ${
          isLight
            ? 'border-[#2E5A1C]/25 bg-white/95 text-[#132211] shadow-sm'
            : 'border-white/25 bg-black/55 text-white shadow-md'
        }`}
      >
        <button
          type="button"
          aria-pressed={lang === 'en'}
          onClick={() => setLang('en')}
          className={`px-3.5 py-1.5 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CABA3A] ${
            lang === 'en'
              ? 'bg-[#5FB032] text-black font-bold shadow-sm scale-[1.02]'
              : 'opacity-75 hover:opacity-100'
          }`}
        >
          EN
        </button>
        <button
          type="button"
          aria-pressed={lang === 'my'}
          onClick={() => setLang('my')}
          className={`px-3.5 py-1.5 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CABA3A] ${
            lang === 'my'
              ? 'bg-[#5FB032] text-black font-bold shadow-sm scale-[1.02]'
              : 'opacity-75 hover:opacity-100'
          }`}
        >
          မြန်မာ
        </button>
      </div>

      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
        className={`rounded-full px-4 py-2 border flex items-center gap-2 text-xs sm:text-sm font-semibold lunglow-btn-spring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CABA3A] ${
          isLight
            ? 'border-[#2E5A1C]/25 bg-white/95 text-[#132211] hover:bg-white shadow-sm'
            : 'border-white/25 bg-black/55 text-white hover:bg-black/75 shadow-md'
        }`}
      >
        {isLight ? (
          <>
            <SunIcon className="w-4 h-4 text-[#CABA3A]" />
            <span>{t.theme.light}</span>
          </>
        ) : (
          <>
            <MoonIcon className="w-4 h-4 text-[#CABA3A]" />
            <span>{t.theme.dark}</span>
          </>
        )}
      </button>
    </div>
  );
}

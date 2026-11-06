import React from 'react';
import { LunglowLogo, ArrowUpRightIcon } from '../components/common/Icons';
import { TopControls } from '../components/layout/TopControls';
import { useTheme } from '../hooks/useTheme';
import { useLunglowData } from '../hooks/useLunglowData';

export function LandingPage() {
  const { isLight, t } = useTheme();
  const { setPage } = useLunglowData();

  return (
    <div className="min-h-screen w-full flex flex-col justify-between px-5 sm:px-12 lg:px-16 py-7 sm:py-10">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <LunglowLogo className="h-10 sm:h-14 w-auto" isLight={isLight} />
        <TopControls />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center text-center my-8">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold tracking-tight leading-[1.28] max-w-4xl mb-8 sm:mb-12">
          <div>
            {t.landing.line1Prefix}
            <span className="text-[#5FB032]">{t.landing.line1Highlight}</span>
            {t.landing.line1Suffix}
          </div>
          <div>
            {t.landing.line2Prefix}
            <span className="text-[#5FB032]">{t.landing.line2Highlight}</span>
            {t.landing.line2Suffix}
          </div>
        </h1>

        <button
          type="button"
          onClick={() => setPage('register')}
          className={`group rounded-full border px-8 sm:px-10 py-3.5 sm:py-4 text-lg sm:text-xl font-semibold flex items-center gap-3 transition-all shadow-xl hover:scale-105 ${
            isLight
              ? 'border-[#2E5A1C]/40 bg-[#142412] text-white hover:bg-[#1E351B]'
              : 'border-white/60 bg-black/45 hover:bg-black/65 backdrop-blur-md text-white'
          }`}
        >
          <span>{t.landing.getStarted}</span>
          <ArrowUpRightIcon className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </main>

      <div className="flex justify-center pb-2">
        <button
          type="button"
          onClick={() => setPage('admin-login')}
          className={`text-[11px] sm:text-xs font-semibold tracking-wide ${
            isLight ? 'text-[#284224]/60 hover:text-[#2E5A1C]' : 'text-white/40 hover:text-[#CABA3A]'
          } transition-colors`}
        >
          Admin Console →
        </button>
      </div>
    </div>
  );
}

import React from 'react';
import { LunglowLogo } from '../common/Icons';
import { Sidebar } from './Sidebar';
import { TopControls } from './TopControls';
import { useTheme } from '../../hooks/useTheme';
import { useLunglowData } from '../../hooks/useLunglowData';

export function DashboardLayout({ children }) {
  const { isLight } = useTheme();
  const { page, setPage, broadcast } = useLunglowData();

  return (
    <div className="min-h-screen w-full">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-[#CABA3A] focus:px-5 focus:py-2.5 focus:text-black focus:font-bold focus:shadow-xl"
      >
        Skip to main content
      </a>

      <Sidebar />

      <main
        id="main-content"
        className={`w-full max-w-[1520px] mx-auto px-4 sm:px-6 md:px-8 lg:pl-[106px] xl:pl-[130px] lg:pr-8 xl:pr-10 pt-5 sm:pt-7 pb-28 lg:pb-12`}
      >
        <header className="flex items-center justify-between gap-4 flex-wrap mb-6 sm:mb-8">
          <LunglowLogo
            className="h-10 sm:h-13 w-auto transition-transform duration-200 hover:scale-[1.02]"
            onClick={() => setPage('home')}
            isLight={isLight}
          />
          <TopControls />
        </header>

        {broadcast && (
          <div className={`mb-5 rounded-3xl border px-5 py-3.5 flex items-center gap-3 animate-toast-in ${
            isLight
              ? 'border-[#CABA3A]/50 bg-[#CABA3A]/12 text-[#132211]'
              : 'border-[#CABA3A]/40 bg-[#CABA3A]/10 text-white'
          }`}>
            <span className="w-2.5 h-2.5 rounded-full bg-[#CABA3A] animate-pulse shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-extrabold tracking-widest text-[#CABA3A] block">LUNGLOW UPDATE</span>
              <p className="text-sm font-semibold break-words">{broadcast.message}</p>
            </div>
          </div>
        )}

        {/* Smooth Page Transition Container */}
        <div key={page} className="animate-page-enter">
          {children}
        </div>
      </main>
    </div>
  );
}

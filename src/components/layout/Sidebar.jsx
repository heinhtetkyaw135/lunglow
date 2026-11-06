import React from 'react';
import {
  NavHomeIcon,
  NavTimerIcon,
  NavCalendarIcon,
  NavPiggyIcon,
  NavProfileCardIcon,
  NavChatIcon,
  NavBlogIcon,
  NavLogoutIcon,
  TrophyIcon,
  SendIcon,
} from '../common/Icons';
import { useTheme } from '../../hooks/useTheme';
import { useLunglowData } from '../../hooks/useLunglowData';

export function Sidebar() {
  const { isLight, t } = useTheme();
  const { page, setPage, setLogoutModalOpen } = useLunglowData();
  const labels = t.nav;
  const short = t.navShort;

  const navItems = [
    { id: 'home', label: labels.home, short: short.home, icon: NavHomeIcon, match: ['home'] },
    {
      id: 'exercises',
      label: labels.exercises,
      short: short.exercises,
      icon: NavTimerIcon,
      match: ['exercises', 'breathing', 'walking', 'memory-game', 'tictactoe-game'],
    },
    { id: 'calendar', label: labels.calendar, short: short.calendar, icon: NavCalendarIcon, match: ['calendar'] },
    { id: 'goal', label: labels.goal, short: short.goal, icon: NavPiggyIcon, match: ['goal'] },
    { id: 'profile', label: labels.profile, short: short.profile, icon: NavProfileCardIcon, match: ['profile'] },
    { id: 'community', label: labels.community, short: short.community, icon: NavChatIcon, match: ['community'] },
    { id: 'challenges', label: labels.challenges, short: short.challenges, icon: TrophyIcon, match: ['challenges'] },
    { id: 'requests', label: labels.requests, short: short.requests, icon: SendIcon, match: ['requests'] },
    { id: 'blog', label: t.blog.navLabel, short: short.blog, icon: NavBlogIcon, match: ['blog'] },
  ];

  const handleNavClick = (item) => {
    setPage(item.id);
  };

  return (
    <>
      <aside
        aria-label="Desktop Primary Navigation"
        className={`hidden lg:flex fixed left-4 xl:left-7 top-1/2 -translate-y-1/2 z-40 w-[76px] xl:w-[86px] h-[calc(100vh-2rem)] max-h-[900px] rounded-[36px] border transition-all duration-300 ${
          isLight
            ? 'border-[#2E5A1C]/20 bg-white/90 backdrop-blur-xl shadow-[0_16px_40px_rgba(20,36,18,0.12)]'
            : 'border-white/25 bg-[#101410]/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.75)]'
        } py-5 px-2 flex-col items-center justify-between select-none`}
      >
        <div className="flex flex-col items-center gap-1.5 xl:gap-2 w-full mt-1">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = item.match.includes(page);
            return (
              <button
                key={item.id}
                type="button"
                title={item.label}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => handleNavClick(item)}
                className={`relative w-14 xl:w-16 rounded-2xl px-1 py-1.5 flex flex-col items-center gap-1 lunglow-btn-spring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5FB032] ${
                  isActive
                    ? 'bg-[#CABA3A] text-black shadow-[0_6px_20px_rgba(202,186,58,0.45)] scale-[1.03]'
                    : isLight
                    ? 'text-[#1A2E17] hover:text-[#3A7B18] hover:bg-[#5FB032]/15'
                    : 'text-white/85 hover:text-[#CABA3A] hover:bg-white/10'
                }`}
              >
                <IconComponent className="w-5 h-5 shrink-0" />
                <span className="text-[9px] xl:text-[10px] font-bold leading-none tracking-tight whitespace-nowrap">
                  {item.short}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mb-1">
          <button
            type="button"
            title={labels.logout}
            aria-label={labels.logout}
            onClick={() => setLogoutModalOpen(true)}
            className={`w-11 h-11 xl:w-12 xl:h-12 rounded-full flex items-center justify-center lunglow-btn-spring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B30] ${
              isLight
                ? 'text-[#1A2E17] hover:text-[#FF3B30] hover:bg-red-500/10'
                : 'text-white/85 hover:text-[#FF3B30] hover:bg-white/10'
            }`}
          >
            <NavLogoutIcon className="w-5 h-5" />
          </button>
        </div>
      </aside>

      <nav
        aria-label="Mobile Primary Navigation"
        className={`lg:hidden fixed bottom-3 left-2 right-2 z-40 h-16 rounded-full border transition-all duration-300 ${
          isLight
            ? 'border-[#2E5A1C]/25 bg-white/95 text-[#1A2E17] shadow-[0_12px_32px_rgba(20,36,18,0.18)]'
            : 'border-white/25 bg-[#0F130F]/95 text-white shadow-[0_16px_40px_rgba(0,0,0,0.8)]'
        } backdrop-blur-xl px-1.5 flex items-center justify-around select-none overflow-x-auto`}
      >
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = item.match.includes(page);
          return (
            <button
              key={item.id}
              type="button"
              title={item.label}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => handleNavClick(item)}
              className={`relative w-11 sm:w-14 rounded-2xl px-0.5 py-1 flex flex-col items-center gap-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5FB032] shrink-0 ${
                isActive
                  ? 'bg-[#CABA3A] text-black shadow-[0_4px_14px_rgba(202,186,58,0.45)] scale-[1.03]'
                  : isLight
                  ? 'text-[#1A2E17] hover:text-[#3A7B18]'
                  : 'text-white/85 hover:text-[#CABA3A]'
              }`}
            >
              <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span className="text-[8px] sm:text-[9px] font-bold leading-none tracking-tight whitespace-nowrap">
                {item.short}
              </span>
            </button>
          );
        })}
        <button
          type="button"
          title={labels.logout}
          aria-label={labels.logout}
          onClick={() => setLogoutModalOpen(true)}
          className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B30] shrink-0 ${
            isLight ? 'text-[#1A2E17] hover:text-[#FF3B30]' : 'text-white/85 hover:text-[#FF3B30]'
          }`}
        >
          <NavLogoutIcon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
        </button>
      </nav>
    </>
  );
}

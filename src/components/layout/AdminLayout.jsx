import React from 'react';
import {
  LunglowLogo,
  NavHomeIcon,
  FlagReportIcon,
  NavChatIcon,
  NavBlogIcon,
  ChartLineIcon,
  TrophyIcon,
  InboxIcon,
  NavLogoutIcon,
  NavAdminShieldIcon,
  MegaphoneIcon,
} from '../common/Icons';
import { TopControls } from './TopControls';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { useLunglowData } from '../../hooks/useLunglowData';

const ADMIN_NAV = [
  { id: 'admin', icon: NavHomeIcon },
  { id: 'admin-reports', icon: FlagReportIcon, badge: 'reports' },
  { id: 'admin-feed', icon: NavChatIcon },
  { id: 'admin-blog', icon: NavBlogIcon },
  { id: 'admin-analytics', icon: ChartLineIcon },
  { id: 'admin-challenges', icon: TrophyIcon, badge: 'challenges' },
  { id: 'admin-requests', icon: InboxIcon, badge: 'requests' },
];

export function AdminLayout({ children, activePage }) {
  const { isLight, t } = useTheme();
  const { setAdminLoggedIn, setRole } = useAuth();
  const { setPage, reports, userRequests, challenges, broadcast } = useLunglowData();

  const pendingRequests = userRequests.filter((r) => r.status === 'pending').length;
  const liveChallenges = challenges.filter((c) => c.active).length;

  const badgeFor = (kind) => {
    if (kind === 'reports') return reports.length;
    if (kind === 'requests') return pendingRequests;
    if (kind === 'challenges') return liveChallenges;
    return 0;
  };

  return (
    <div className="min-h-screen w-full">
      <a
        href="#admin-main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-[#CABA3A] focus:px-5 focus:py-2.5 focus:text-black focus:font-bold focus:shadow-xl"
      >
        Skip to admin content
      </a>

      {/* Desktop admin rail */}
      <aside
        aria-label="Admin Console Navigation"
        className={`hidden lg:flex fixed left-4 xl:left-7 top-1/2 -translate-y-1/2 z-40 w-[76px] xl:w-[86px] h-[calc(100vh-2rem)] max-h-[860px] rounded-[36px] border transition-all duration-300 ${
          isLight
            ? 'border-[#2E5A1C]/20 bg-white/90 backdrop-blur-xl shadow-[0_16px_40px_rgba(20,36,18,0.12)]'
            : 'border-white/25 bg-[#101410]/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.75)]'
        } py-5 px-2 flex-col items-center justify-between select-none`}
      >
        <div className="flex flex-col items-center gap-3 w-full">
          <div className={`w-11 h-11 xl:w-12 xl:h-12 rounded-2xl flex items-center justify-center mb-1 ${
            isLight ? 'bg-[#CABA3A]/20 text-[#8a7b10]' : 'bg-[#CABA3A]/15 text-[#CABA3A]'
          }`}>
            <NavAdminShieldIcon className="w-6 h-6" />
          </div>
          {ADMIN_NAV.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activePage;
            const badge = item.badge ? badgeFor(item.badge) : 0;
            const key = item.id === 'admin' ? 'overview' : item.id.replace('admin-', '');
            return (
              <button
                key={item.id}
                type="button"
                title={t.admin.menu[key]}
                aria-label={t.admin.menu[key]}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setPage(item.id)}
                className={`relative w-14 xl:w-16 rounded-2xl px-1 py-1.5 flex flex-col items-center gap-1 lunglow-btn-spring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5FB032] ${
                  isActive
                    ? 'bg-[#CABA3A] text-black shadow-[0_6px_20px_rgba(202,186,58,0.45)] scale-[1.03]'
                    : isLight
                    ? 'text-[#1A2E17] hover:text-[#3A7B18] hover:bg-[#5FB032]/15'
                    : 'text-white/85 hover:text-[#CABA3A] hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="text-[9px] xl:text-[10px] font-bold leading-none tracking-tight whitespace-nowrap">
                  {t.admin.menuShort[key]}
                </span>
                {badge > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-0.5 rounded-full bg-[#FF3B30] text-white text-[10px] font-bold flex items-center justify-center shadow">
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col items-center gap-2.5 mb-1">
          <button
            type="button"
            title={t.admin.exitConsole}
            onClick={() => {
              setAdminLoggedIn(false);
              setRole('member');
              setPage('landing');
            }}
            className={`w-11 h-11 xl:w-12 xl:h-12 rounded-full flex items-center justify-center lunglow-btn-spring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5FB032] ${
              isLight
                ? 'text-[#1A2E17] hover:text-[#3A7B18] hover:bg-[#5FB032]/15'
                : 'text-white/85 hover:text-[#5FB032] hover:bg-white/10'
            }`}
          >
            <NavHomeIcon className="w-5 h-5" />
          </button>
          <button
            type="button"
            title={t.nav.logout}
            onClick={() => {
              setAdminLoggedIn(false);
              setRole('member');
              setPage('landing');
            }}
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

      <main
        id="admin-main-content"
        className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 md:px-8 lg:pl-[106px] xl:pl-[130px] lg:pr-8 xl:pr-10 pt-5 sm:pt-7 pb-32 lg:pb-12"
      >
        <header className="flex items-center justify-between gap-4 flex-wrap mb-5 sm:mb-7">
          <div className="flex items-center gap-3 sm:gap-4">
            <LunglowLogo
              className="h-9 sm:h-11 w-auto transition-transform duration-200 hover:scale-[1.02]"
              onClick={() => setPage('admin')}
              isLight={isLight}
            />
            <span className={`hidden sm:inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] sm:text-xs font-extrabold tracking-widest ${
              isLight
                ? 'border-[#CABA3A] bg-[#CABA3A]/15 text-[#8a7b10]'
                : 'border-[#CABA3A]/60 bg-[#CABA3A]/10 text-[#CABA3A]'
            }`}>
              <NavAdminShieldIcon className="w-3.5 h-3.5" />
              {t.admin.consoleTag}
            </span>
          </div>
          <TopControls />
        </header>

        {broadcast && (
          <div className={`mb-5 rounded-3xl border px-5 py-3.5 flex items-center gap-3 animate-toast-in ${
            isLight
              ? 'border-[#CABA3A]/50 bg-[#CABA3A]/12 text-[#132211]'
              : 'border-[#CABA3A]/40 bg-[#CABA3A]/10 text-white'
          }`}>
            <MegaphoneIcon className="w-5 h-5 text-[#CABA3A] shrink-0 animate-float-slow" />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-extrabold tracking-widest text-[#CABA3A] block">LIVE BROADCAST</span>
              <p className="text-sm font-semibold truncate">{broadcast.message}</p>
            </div>
            <span className="w-2 h-2 rounded-full bg-[#5FB032] animate-pulse shrink-0" />
          </div>
        )}

        <div key={activePage} className="animate-page-enter">
          {children}
        </div>
      </main>

      {/* Mobile admin bottom nav */}
      <nav
        aria-label="Admin Mobile Navigation"
        className={`lg:hidden fixed bottom-3 left-2 right-2 z-40 h-16 rounded-full border transition-all duration-300 ${
          isLight
            ? 'border-[#2E5A1C]/25 bg-white/95 text-[#1A2E17] shadow-[0_12px_32px_rgba(20,36,18,0.18)]'
            : 'border-white/25 bg-[#0F130F]/95 text-white shadow-[0_16px_40px_rgba(0,0,0,0.8)]'
        } backdrop-blur-xl px-1.5 flex items-center justify-around select-none`}
      >
        {ADMIN_NAV.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === activePage;
          const badge = item.badge ? badgeFor(item.badge) : 0;
          const key = item.id === 'admin' ? 'overview' : item.id.replace('admin-', '');
          return (
            <button
              key={item.id}
              type="button"
              aria-label={t.admin.menu[key]}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => setPage(item.id)}
              className={`relative w-11 sm:w-14 rounded-2xl px-0.5 py-1 flex flex-col items-center gap-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5FB032] shrink-0 ${
                isActive
                  ? 'bg-[#CABA3A] text-black shadow-[0_4px_14px_rgba(202,186,58,0.45)] scale-[1.03]'
                  : isLight
                  ? 'text-[#1A2E17] hover:text-[#3A7B18]'
                  : 'text-white/85 hover:text-[#CABA3A]'
              }`}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span className="text-[8px] sm:text-[9px] font-bold leading-none tracking-tight whitespace-nowrap">
                {t.admin.menuShort[key]}
              </span>
              {badge > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#FF3B30] text-white text-[9px] font-bold flex items-center justify-center">
                  {badge}
                </span>
              )}
            </button>
          );
        })}
        <button
          type="button"
          aria-label={t.admin.exitConsole}
          onClick={() => {
            setAdminLoggedIn(false);
            setRole('member');
            setPage('landing');
          }}
          className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all focus-visible:outline-none ${
            isLight ? 'text-[#1A2E17] hover:text-[#3A7B18]' : 'text-white/85 hover:text-[#5FB032]'
          }`}
        >
          <NavHomeIcon className="w-5 h-5" />
        </button>
      </nav>
    </div>
  );
}

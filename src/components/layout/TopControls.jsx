import React, { useEffect, useRef } from 'react';
import { SunIcon, MoonIcon, BellIcon } from '../common/Icons';
import { useTheme } from '../../hooks/useTheme';
import { useLunglowData } from '../../hooks/useLunglowData';

const NOTIF_KIND_COLOR = {
  broadcast: 'bg-[#CABA3A]',
  report: 'bg-[#FF3B30]',
  request: 'bg-[#5FB032]',
  info: 'bg-[#5FB032]',
};

export function TopControls() {
  const { toggleTheme, isLight, t } = useTheme();
  const {
    notifications,
    notifOpen,
    setNotifOpen,
    unreadNotifCount,
    markAllNotifsRead,
    clearNotifications,
  } = useLunglowData();

  const panelRef = useRef(null);
  const bellRef = useRef(null);

  // Close the notification panel on outside click / Escape.
  useEffect(() => {
    if (!notifOpen) return undefined;
    const onDown = (e) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        bellRef.current &&
        !bellRef.current.contains(e.target)
      ) {
        setNotifOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setNotifOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [notifOpen, setNotifOpen]);

  const togglePanel = () => {
    setNotifOpen((o) => {
      const next = !o;
      if (next) markAllNotifsRead();
      return next;
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3 select-none" role="toolbar" aria-label="Theme and Notification Controls">
      <div className="relative">
        <button
          ref={bellRef}
          type="button"
          onClick={togglePanel}
          aria-label={t.notif.bellLabel}
          aria-expanded={notifOpen}
          aria-haspopup="true"
          className={`relative rounded-full w-10 h-10 sm:w-11 sm:h-11 border flex items-center justify-center lunglow-btn-spring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CABA3A] ${
            isLight
              ? 'border-[#2E5A1C]/25 bg-white/95 text-[#132211] hover:bg-white shadow-sm'
              : 'border-white/25 bg-black/55 text-white hover:bg-black/75 shadow-md'
          }`}
        >
          <BellIcon className="w-5 h-5" />
          {unreadNotifCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#FF3B30] text-white text-[10px] font-bold flex items-center justify-center shadow">
              {unreadNotifCount > 9 ? '9+' : unreadNotifCount}
            </span>
          )}
        </button>

        {notifOpen && (
          <div
            ref={panelRef}
            role="dialog"
            aria-label={t.notif.panelTitle}
            className={`absolute right-0 top-[calc(100%+10px)] z-50 w-[320px] sm:w-[360px] rounded-3xl border overflow-hidden shadow-2xl animate-pop ${
              isLight
                ? 'border-[#2E5A1C]/20 bg-white/98 text-[#132211]'
                : 'border-white/20 bg-[#101410]/97 text-white'
            } backdrop-blur-xl`}
          >
            <div className={`flex items-center justify-between px-5 py-4 border-b ${isLight ? 'border-[#2E5A1C]/10' : 'border-white/10'}`}>
              <span className="font-bold text-sm sm:text-base tracking-tight">{t.notif.panelTitle}</span>
              {notifications.length > 0 && (
                <button
                  type="button"
                  onClick={clearNotifications}
                  className={`text-[11px] sm:text-xs font-semibold ${isLight ? 'text-[#3A7B18] hover:underline' : 'text-[#CABA3A] hover:underline'}`}
                >
                  {t.notif.clearAll}
                </button>
              )}
            </div>

            <div className="max-h-[340px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className={`px-5 py-10 text-center text-sm ${isLight ? 'text-[#284224]/70' : 'text-white/60'}`}>
                  {t.notif.empty}
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`flex items-start gap-3 px-5 py-3.5 border-b last:border-b-0 ${
                      isLight ? 'border-[#2E5A1C]/8' : 'border-white/8'
                    }`}
                  >
                    <span className={`mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 ${NOTIF_KIND_COLOR[n.kind] || NOTIF_KIND_COLOR.info}`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold leading-snug break-words">{n.title}</p>
                      <p className={`text-xs sm:text-[13px] leading-snug break-words mt-0.5 ${isLight ? 'text-[#284224]/80' : 'text-white/75'}`}>{n.body}</p>
                      <p className={`text-[10px] mt-1 ${isLight ? 'text-[#284224]/50' : 'text-white/45'}`}>{n.time}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
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

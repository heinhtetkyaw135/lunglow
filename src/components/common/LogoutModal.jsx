import React, { useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useLunglowData } from '../../hooks/useLunglowData';

export function LogoutModal() {
  const { isLight, t, themeTokens } = useTheme();
  const { logoutModalOpen, setLogoutModalOpen, setPage } = useLunglowData();

  useEffect(() => {
    if (!logoutModalOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLogoutModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [logoutModalOpen, setLogoutModalOpen]);

  if (!logoutModalOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-modal-title"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-page-enter"
      onClick={() => setLogoutModalOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-md rounded-[36px] border p-6 sm:p-8 text-center shadow-2xl animate-pop ${
          isLight
            ? 'border-[#2E5A1C]/25 bg-white text-[#132211]'
            : 'border-white/25 bg-[#141814] text-white'
        }`}
      >
        <div className="w-14 h-14 rounded-full bg-[#FF3B30]/15 border border-[#FF3B30]/40 text-[#FF3B30] flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
          !
        </div>
        <h3 id="logout-modal-title" className="text-xl sm:text-2xl font-bold mb-2">
          {t.logoutModal.title}
        </h3>
        <p className={`${themeTokens.mutedText} text-sm sm:text-base mb-7`}>
          {t.logoutModal.message}
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setLogoutModalOpen(false)}
            className={`flex-1 py-3 ${themeTokens.secondaryBtn}`}
          >
            {t.logoutModal.cancel}
          </button>
          <button
            type="button"
            onClick={() => {
              setLogoutModalOpen(false);
              setPage('landing');
            }}
            className={`flex-1 py-3 ${themeTokens.primaryBtn}`}
          >
            {t.logoutModal.confirm}
          </button>
        </div>
      </div>
    </div>
  );
}

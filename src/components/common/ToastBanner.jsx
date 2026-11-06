import React from 'react';
import { useLunglowData } from '../../hooks/useLunglowData';

export function ToastBanner() {
  const { toastMessage, showToast } = useLunglowData();
  if (!toastMessage) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="fixed top-5 right-5 z-50 bg-[#5FB032] text-black font-semibold text-sm sm:text-base px-5 py-3 rounded-full shadow-[0_12px_32px_rgba(95,176,50,0.45)] border border-white/40 flex items-center gap-3 animate-toast-in"
    >
      <span className="w-2.5 h-2.5 rounded-full bg-black animate-ping shrink-0" />
      <span>{toastMessage}</span>
      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={() => showToast('')}
        className="ml-1 w-6 h-6 rounded-full bg-black/15 hover:bg-black/25 flex items-center justify-center text-xs font-bold transition"
      >
        ✕
      </button>
    </div>
  );
}

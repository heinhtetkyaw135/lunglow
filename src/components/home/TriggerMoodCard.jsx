import React from 'react';
import { ArrowUpRightIcon, FlameIcon } from '../common/Icons';
import { useTheme } from '../../hooks/useTheme';
import { useLunglowData } from '../../hooks/useLunglowData';

const TRIGGER_KEYS = ['stress', 'meal', 'coffee', 'social', 'boredom', 'fatigue'];

export function TriggerMoodCard() {
  const { t, isLight, themeTokens } = useTheme();
  const {
    selectedTrigger,
    setSelectedTrigger,
    resistedCount,
    handleResistTrigger,
    setPage,
  } = useLunglowData();

  const currentItem = t.triggers.items[selectedTrigger] || t.triggers.items.stress;

  return (
    <div className={`rounded-3xl sm:rounded-[40px] border ${themeTokens.cardSurface} p-5 sm:p-8 flex flex-col justify-between gap-6`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-1.5">
            {t.triggers.title}
          </h2>
          <p className={`text-xs sm:text-sm ${themeTokens.mutedText} max-w-xl`}>
            {t.triggers.subtitle}
          </p>
        </div>

        <div
          className={`rounded-full border px-4 py-2 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold shrink-0 ${
            isLight
              ? 'border-[#2E5A1C]/25 bg-[#F3F8F0] text-[#3A7B18]'
              : 'border-white/30 bg-black/30 text-[#5FB032]'
          }`}
        >
          <FlameIcon className="w-4 h-4 text-[#5FB032]" />
          <span>
            {t.triggers.resistedCountLabel}: <strong>{resistedCount}</strong>
          </span>
        </div>
      </div>

      {/* Trigger Selection Pills */}
      <div className="flex flex-wrap items-center gap-2.5">
        {TRIGGER_KEYS.map((k) => {
          const item = t.triggers.items[k];
          const isSelected = selectedTrigger === k;
          return (
            <button
              key={k}
              type="button"
              onClick={() => setSelectedTrigger(k)}
              className={`rounded-full px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                isSelected
                  ? 'bg-[#CABA3A] text-black shadow-lg scale-[1.02]'
                  : isLight
                  ? 'border border-[#2E5A1C]/25 bg-[#F3F8F0] text-[#142412] hover:bg-[#E4EFE0]'
                  : 'border border-white/25 bg-black/30 text-white hover:border-white/50'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Instant Smoke-Free Recommendations Box */}
      <div className={`rounded-2xl sm:rounded-[28px] border ${themeTokens.subCardSurface} p-4 sm:p-6`}>
        <div className="text-sm sm:text-base font-bold text-[#5FB032] mb-3">
          {currentItem.label} — Smoke-Free Alternatives:
        </div>

        <ul className="space-y-2.5 mb-5">
          {currentItem.tips.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed">
              <span className="w-5 h-5 rounded-full bg-[#5FB032]/20 text-[#5FB032] font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">
                {idx + 1}
              </span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setPage(currentItem.actionPage)}
            className="rounded-full bg-[#CABA3A] hover:brightness-110 active:scale-95 text-black font-semibold text-xs sm:text-sm px-6 py-2.5 inline-flex items-center gap-2 transition shadow-md"
          >
            <span>{currentItem.actionLabel}</span>
            <ArrowUpRightIcon className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleResistTrigger}
            className="rounded-full bg-[#5FB032] hover:brightness-110 active:scale-95 text-black font-semibold text-xs sm:text-sm px-6 py-2.5 transition shadow-md"
          >
            {t.triggers.logResistedBtn}
          </button>
        </div>
      </div>
    </div>
  );
}

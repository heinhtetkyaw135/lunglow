import React from 'react';
import { ArrowUpRightIcon } from '../../components/common/Icons';
import { ASSETS } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import { useLunglowData } from '../../hooks/useLunglowData';

export function ExercisesPage() {
  const { t, themeTokens, isLight } = useTheme();
  const { breathingTimer, walkingTimer, setPage } = useLunglowData();

  const items = [
    {
      line1: t.exercises.breathingCardTitle1,
      line2: t.exercises.breathingCardTitle2,
      image: ASSETS.breathingStatic,
      imgAlt: t.exercises.breathingHeader,
      onClick: () => {
        breathingTimer.reset();
        setPage('breathing');
      },
    },
    {
      line1: t.exercises.walkingCardTitle1,
      line2: t.exercises.walkingCardTitle2,
      image: ASSETS.walkingStatic,
      imgAlt: t.exercises.walkingHeader,
      onClick: () => {
        walkingTimer.reset();
        setPage('walking');
      },
    },
    {
      line1: t.games.memoryCardTitle1,
      line2: t.games.memoryCardTitle2,
      emoji: '🧩',
      onClick: () => setPage('memory-game'),
    },
    {
      line1: t.games.tttCardTitle1,
      line2: t.games.tttCardTitle2,
      emoji: '❌⭕',
      onClick: () => setPage('tictactoe-game'),
    },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-7">
      {items.map((item, idx) => (
        <div
          key={idx}
          className={`rounded-3xl sm:rounded-[40px] border ${themeTokens.cardSurface} p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6`}
        >
          <div className="flex items-center gap-5 sm:gap-6 min-w-0">
            <div
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden flex items-center justify-center shrink-0 border shadow-inner ${
                isLight
                  ? 'border-[#2E5A1C]/15 bg-[#F2F7EF]'
                  : 'border-white/15 bg-[#161A16]'
              }`}
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.imgAlt}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl sm:text-5xl" aria-hidden="true">
                  {item.emoji}
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight min-w-0">
              {item.line1}
              <br />
              {item.line2}
            </h2>
          </div>

          <button
            type="button"
            onClick={item.onClick}
            className="self-start sm:self-center bg-[#CABA3A] hover:brightness-110 active:scale-95 transition text-black font-semibold text-sm sm:text-base rounded-full px-7 py-3.5 inline-flex items-center gap-2.5 shrink-0 shadow-lg"
          >
            <span>{t.exercises.getStarted}</span>
            <ArrowUpRightIcon className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

import React from 'react';
import { ArrowUpRightIcon } from '../../components/common/Icons';
import { useTheme } from '../../hooks/useTheme';
import { useLunglowData } from '../../hooks/useLunglowData';

export function ExercisesPage() {
  const { t, themeTokens } = useTheme();
  const { breathingTimer, walkingTimer, setPage } = useLunglowData();

  const items = [
    {
      line1: t.exercises.breathingCardTitle1,
      line2: t.exercises.breathingCardTitle2,
      onClick: () => {
        breathingTimer.reset();
        setPage('breathing');
      },
    },
    {
      line1: t.exercises.walkingCardTitle1,
      line2: t.exercises.walkingCardTitle2,
      onClick: () => {
        walkingTimer.reset();
        setPage('walking');
      },
    },
    {
      line1: t.games.memoryCardTitle1,
      line2: t.games.memoryCardTitle2,
      onClick: () => setPage('memory-game'),
    },
    {
      line1: t.games.tttCardTitle1,
      line2: t.games.tttCardTitle2,
      onClick: () => setPage('tictactoe-game'),
    },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-7">
      {items.map((item, idx) => (
        <div
          key={idx}
          className={`rounded-3xl sm:rounded-[40px] border ${themeTokens.cardSurface} px-6 sm:px-10 py-9 sm:py-14 flex flex-col sm:flex-row sm:items-center justify-between gap-6`}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight">
            {item.line1}
            <br />
            {item.line2}
          </h2>

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

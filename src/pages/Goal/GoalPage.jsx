import React from 'react';
import {
  SmokingCigaretteIcon,
  DollarCircleIcon,
  TrashCanIcon,
  NumberStepperChevrons,
  ArrowUpRightIcon,
} from '../../components/common/Icons';
import { useTheme } from '../../hooks/useTheme';
import { useLunglowData } from '../../hooks/useLunglowData';

export function GoalPage() {
  const { t, themeTokens } = useTheme();
  const {
    metrics,
    goals,
    newGoalTitle,
    setNewGoalTitle,
    newGoalPrice,
    setNewGoalPrice,
    handleAddGoal,
    handleDeleteGoal,
  } = useLunglowData();

  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)] lg:min-h-[calc(100vh-9rem)]">
      <div className={`rounded-3xl sm:rounded-[40px] border ${themeTokens.cardSurface} p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 sm:mb-10`}>
        <div className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-snug max-w-md">
          {t.goal.bannerLine1}
          <br />
          {t.goal.bannerLine2}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full sm:w-auto">
          <div
            className={`h-36 sm:w-44 sm:h-44 rounded-3xl sm:rounded-[36px] border ${themeTokens.subCardSurface} flex flex-col items-center justify-center gap-2 sm:gap-3 px-4`}
          >
            <SmokingCigaretteIcon className="w-16 h-12 sm:w-20 sm:h-14" />
            <div className="text-3xl sm:text-5xl font-bold">
              {metrics.monthAvoided}
            </div>
          </div>

          <div
            className={`h-36 sm:w-44 sm:h-44 rounded-3xl sm:rounded-[36px] border ${themeTokens.subCardSurface} flex flex-col items-center justify-center gap-2 sm:gap-3 px-4`}
          >
            <DollarCircleIcon className="w-12 h-12 sm:w-14 sm:h-14" />
            <div className="text-3xl sm:text-5xl font-bold">
              {metrics.monthSavedMoney}$
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl sm:text-4xl font-bold mb-5">
          {t.goal.sectionTitle}
        </h2>

        <div className="flex flex-col gap-3.5 sm:gap-4">
          {goals.map((g) => {
            const pct = Math.min(
              100,
              Math.round((metrics.totalSavedMoney / Math.max(1, g.price)) * 100)
            );
            return (
              <div key={g.id} className="flex items-center gap-3 sm:gap-5">
                <div
                  className={`flex-1 h-14 sm:h-[68px] rounded-full border ${themeTokens.cardSurface} px-6 sm:px-9 flex items-center justify-between text-sm sm:text-xl font-medium relative overflow-hidden`}
                >
                  <div
                    className="absolute inset-y-0 left-0 bg-[#5FB032]/25 pointer-events-none transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                  <span className="relative z-10 truncate pr-3">
                    {g.title} ({g.price}$)
                  </span>
                  <span className="relative z-10 font-bold text-[#5FB032] shrink-0">
                    {pct}%
                  </span>
                </div>

                <button
                  type="button"
                  aria-label={`Delete goal ${g.title}`}
                  onClick={() => handleDeleteGoal(g.id)}
                  className="w-14 h-14 sm:w-[68px] sm:h-[68px] rounded-full bg-[#CABA3A] hover:brightness-110 active:scale-95 transition flex items-center justify-center shrink-0 shadow-lg"
                >
                  <TrashCanIcon className="w-6 h-6" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-auto pt-10">
        <form
          onSubmit={handleAddGoal}
          className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-5"
        >
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-xs sm:text-sm font-medium pl-1">
              {t.goal.goalLabel}
            </label>
            <input
              type="text"
              value={newGoalTitle}
              onChange={(e) => setNewGoalTitle(e.target.value)}
              placeholder="laptop"
              className={`h-11 sm:h-12 rounded-full border ${themeTokens.inputSurface} px-5 text-sm sm:text-base focus:outline-none focus:border-[#CABA3A]`}
            />
          </div>

          <div className="flex flex-col gap-1.5 w-full sm:w-56">
            <label className="text-xs sm:text-sm font-medium pl-1">
              {t.goal.priceLabel}
            </label>
            <div className={`h-11 sm:h-12 rounded-full border ${themeTokens.inputSurface} px-5 flex items-center justify-between`}>
              <input
                type="number"
                min="1"
                value={newGoalPrice}
                onChange={(e) => setNewGoalPrice(e.target.value)}
                className="bg-transparent text-sm sm:text-base w-full focus:outline-none"
              />
              <NumberStepperChevrons
                onIncrement={() => setNewGoalPrice((v) => Number(v || 0) + 50)}
                onDecrement={() =>
                  setNewGoalPrice((v) => Math.max(10, Number(v || 0) - 50))
                }
              />
            </div>
          </div>

          <button
            type="submit"
            className="h-11 sm:h-12 bg-[#CABA3A] hover:brightness-110 active:scale-95 transition text-black font-semibold text-sm sm:text-base rounded-full px-8 inline-flex items-center justify-center gap-2 shrink-0 shadow-lg"
          >
            <span>{t.goal.setGoalBtn}</span>
            <ArrowUpRightIcon className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

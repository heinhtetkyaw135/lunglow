import React from 'react';
import { SmokingCigaretteIcon, NumberStepperChevrons } from './Icons';
import { calculateLimitSummary } from '../../libs/smokingAnalytics';
import { useTheme } from '../../hooks/useTheme';
import { useLunglowData } from '../../hooks/useLunglowData';

export function LimitFormCard({ titleText, isOnboarding = false }) {
  const { t, themeTokens } = useTheme();
  const {
    limitFormCigs,
    setLimitFormCigs,
    limitFormPrice,
    setLimitFormPrice,
    handleSaveLimit,
  } = useLunglowData();

  const { dailySmoked, monthlySmoked, dailySpent, monthlySpent } = calculateLimitSummary(
    limitFormCigs,
    limitFormPrice
  );

  return (
    <div
      className={`w-full rounded-3xl sm:rounded-[40px] border ${themeTokens.cardSurface} px-5 sm:px-10 lg:px-14 py-8 sm:py-11 flex flex-col items-center text-center`}
    >
      <SmokingCigaretteIcon className="w-24 h-20 sm:w-32 sm:h-24 mb-3" />
      <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
        {titleText}
      </h2>
      <p className={`${themeTokens.mutedText} text-sm sm:text-lg lg:text-xl max-w-[640px] leading-relaxed mb-8`}>
        {t.limit.subtitle}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7 w-full max-w-[760px] mb-8">
        <div className="flex flex-col items-start gap-2.5">
          <label className="text-sm sm:text-base font-medium pl-1">
            {t.limit.cigsPerDay}
          </label>
          <div className={`w-full h-12 sm:h-[56px] rounded-full border ${themeTokens.inputSurface} px-5 flex items-center justify-between`}>
            <input
              type="number"
              min="1"
              value={limitFormCigs}
              onChange={(e) => setLimitFormCigs(e.target.value)}
              className="bg-transparent text-base sm:text-lg font-medium w-full focus:outline-none"
            />
            <NumberStepperChevrons
              onIncrement={() => setLimitFormCigs((v) => Number(v || 0) + 1)}
              onDecrement={() => setLimitFormCigs((v) => Math.max(1, Number(v || 0) - 1))}
            />
          </div>

          <div className={`w-full h-12 sm:h-[56px] rounded-full border ${themeTokens.subCardSurface} px-4 flex items-center justify-center text-sm sm:text-base lg:text-lg`}>
            <span>
              {t.limit.smoked} : <span className="text-[#FF0000] font-semibold">{dailySmoked}</span>
              {t.limit.perDay} |{' '}
              <span className="text-[#FF0000] font-semibold">{monthlySmoked}</span>
              {t.limit.perMonth}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-start gap-2.5">
          <label className="text-sm sm:text-base font-medium pl-1">
            {t.limit.cigPrice}
          </label>
          <div className={`w-full h-12 sm:h-[56px] rounded-full border ${themeTokens.inputSurface} px-5 flex items-center justify-between`}>
            <input
              type="number"
              step="0.1"
              min="0.05"
              value={limitFormPrice}
              onChange={(e) => setLimitFormPrice(e.target.value)}
              className="bg-transparent text-base sm:text-lg font-medium w-full focus:outline-none"
            />
            <NumberStepperChevrons
              onIncrement={() =>
                setLimitFormPrice((v) => +(Number(v || 0) + 0.1).toFixed(2))
              }
              onDecrement={() =>
                setLimitFormPrice((v) => Math.max(0.05, +(Number(v || 0) - 0.1).toFixed(2)))
              }
            />
          </div>

          <div className={`w-full h-12 sm:h-[56px] rounded-full border ${themeTokens.subCardSurface} px-4 flex items-center justify-center text-sm sm:text-base lg:text-lg`}>
            <span>
              {t.limit.spent} : <span className="text-[#FF0000] font-semibold">{dailySpent}$</span>
              {t.limit.perDay} |{' '}
              <span className="text-[#FF0000] font-semibold">{monthlySpent}$</span>
              {t.limit.perMonth}
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => handleSaveLimit(isOnboarding)}
        className="bg-[#CABA3A] hover:brightness-110 active:scale-95 transition text-black font-semibold text-base sm:text-lg rounded-full px-12 sm:px-16 py-3 shadow-lg"
      >
        {t.limit.save}
      </button>
    </div>
  );
}

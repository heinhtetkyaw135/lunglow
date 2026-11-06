import React from 'react';
import { ArrowUpRightIcon } from '../common/Icons';
import { useTheme } from '../../hooks/useTheme';
import { useLunglowData } from '../../hooks/useLunglowData';

const MOOD_LIST = [
  { id: 'strong', emoji: '💪' },
  { id: 'calm', emoji: '😌' },
  { id: 'fighting', emoji: '🛡️' },
  { id: 'stressed', emoji: '⚡' },
];

export function DailyCheckInCard() {
  const { t, isLight, themeTokens } = useTheme();
  const {
    selectedMood,
    setSelectedMood,
    checkedInToday,
    handleCompleteCheckIn,
    reminders,
    handleToggleReminder,
    handleUpdateReminderTime,
    handleTestPushReminder,
  } = useLunglowData();

  const reminderLabels = {
    morning: t.checkIn.morningLabel,
    peak: t.checkIn.peakLabel,
    evening: t.checkIn.eveningLabel,
  };

  return (
    <div className={`rounded-3xl sm:rounded-[40px] border ${themeTokens.cardSurface} p-5 sm:p-8`}>
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-6">
        {t.checkIn.title}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Sub-Card: Daily Pledge Check-In */}
        <div className={`rounded-2xl sm:rounded-[28px] border ${themeTokens.subCardSurface} p-5 sm:p-6 flex flex-col justify-between gap-5`}>
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-1">
              {t.checkIn.pledgeTitle}
            </h3>
            <p className={`text-xs sm:text-sm ${themeTokens.mutedText}`}>
              {t.checkIn.pledgeSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {MOOD_LIST.map((m) => {
              const isSelected = selectedMood === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedMood(m.id)}
                  className={`rounded-full px-3.5 py-2.5 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                    isSelected
                      ? 'bg-[#CABA3A] text-black shadow-md'
                      : isLight
                      ? 'border border-[#2E5A1C]/20 bg-white text-[#142412] hover:bg-gray-100'
                      : 'border border-white/20 bg-black/40 text-white hover:border-white/50'
                  }`}
                >
                  <span>{m.emoji}</span>
                  <span className="truncate">{t.checkIn.moods[m.id]}</span>
                </button>
              );
            })}
          </div>

          {checkedInToday ? (
            <div className="rounded-full bg-[#5FB032]/20 border border-[#5FB032] text-[#5FB032] px-5 py-3 text-center text-xs sm:text-sm font-bold">
              ✓ {t.checkIn.checkedInBadge}
            </div>
          ) : (
            <button
              type="button"
              onClick={handleCompleteCheckIn}
              className="w-full rounded-full bg-[#CABA3A] hover:brightness-110 active:scale-95 text-black font-semibold text-sm sm:text-base py-3 inline-flex items-center justify-center gap-2 transition shadow-lg"
            >
              <span>{t.checkIn.checkInBtn}</span>
              <ArrowUpRightIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Right Sub-Card: Configurable Push Reminders */}
        <div className={`rounded-2xl sm:rounded-[28px] border ${themeTokens.subCardSurface} p-5 sm:p-6 flex flex-col justify-between gap-4`}>
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h3 className="text-lg sm:text-xl font-bold">
              {t.checkIn.remindersTitle}
            </h3>
            <button
              type="button"
              onClick={handleTestPushReminder}
              className="rounded-full bg-[#5FB032] hover:brightness-110 active:scale-95 text-black font-semibold text-xs px-4 py-1.5 inline-flex items-center gap-1.5 transition shadow"
            >
              <span>{t.checkIn.testPushBtn}</span>
              <ArrowUpRightIcon className="w-3 h-3" />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {reminders.map((rem) => (
              <div
                key={rem.id}
                className={`rounded-full border px-4 py-2 flex items-center justify-between gap-3 ${
                  isLight
                    ? 'border-[#2E5A1C]/20 bg-white'
                    : 'border-white/20 bg-black/35'
                }`}
              >
                <span className="text-xs sm:text-sm font-medium truncate">
                  {reminderLabels[rem.id]}
                </span>

                <div className="flex items-center gap-2.5 shrink-0">
                  <input
                    type="time"
                    value={rem.time}
                    onChange={(e) => handleUpdateReminderTime(rem.id, e.target.value)}
                    aria-label={reminderLabels[rem.id]}
                    className={`rounded-full border px-2.5 py-1 text-xs font-semibold focus:outline-none ${
                      isLight
                        ? 'border-[#2E5A1C]/30 bg-[#F3F8F0] text-[#142412]'
                        : 'border-white/30 bg-[#181818] text-white'
                    }`}
                  />

                  <button
                    type="button"
                    role="switch"
                    aria-checked={rem.enabled}
                    aria-label={`Toggle ${reminderLabels[rem.id]}`}
                    onClick={() => handleToggleReminder(rem.id)}
                    className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CABA3A] ${
                      rem.enabled ? 'bg-[#5FB032]' : 'bg-gray-500/40'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                        rem.enabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

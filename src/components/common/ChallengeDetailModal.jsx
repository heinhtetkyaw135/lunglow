import React, { useEffect } from 'react';
import { TrophyIcon, UsersGroupIcon, CheckCircleIcon, SparklesIcon } from './Icons';
import { useTheme } from '../../hooks/useTheme';

// Challenge detail pop-up — centered card on a dark blurred backdrop,
// matching the app's logout/report modal positioning. Shows how the
// challenge works, its duration, participants and reward.
export function ChallengeDetailModal({ challenge, onClose }) {
  const { isLight, t, themeTokens } = useTheme();

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const progressPct = Math.min(100, Math.round((challenge.progress / challenge.days) * 100));
  const completed = challenge.joined && challenge.progress >= challenge.days;

  const metaRows = [
    { icon: TrophyIcon, label: t.challenges.detailDuration, value: `${challenge.days} ${t.challenges.daysLabel}` },
    { icon: UsersGroupIcon, label: t.challenges.detailParticipants, value: challenge.participants.toLocaleString() },
    { icon: SparklesIcon, label: t.challenges.detailReward, value: challenge.reward },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="challenge-detail-title"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-page-enter"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-lg max-h-[88vh] overflow-y-auto rounded-[36px] border p-6 sm:p-8 shadow-2xl animate-pop ${
          isLight
            ? 'border-[#2E5A1C]/25 bg-white text-[#132211]'
            : 'border-white/25 bg-[#141814] text-white'
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-full bg-[#CABA3A]/15 border border-[#CABA3A]/40 text-[#CABA3A] flex items-center justify-center shrink-0 text-2xl">
            {challenge.emoji || '🎯'}
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#CABA3A]">
              {t.challenges.detailTitle}
            </span>
            <h3 id="challenge-detail-title" className="text-xl sm:text-2xl font-bold leading-tight">
              {challenge.title}
            </h3>
          </div>
        </div>

        {/* Cover */}
        {challenge.cover && (
          <div className="w-full max-h-44 rounded-3xl overflow-hidden border border-white/15 mb-4">
            <img src={challenge.cover} alt={challenge.title} className="w-full h-40 object-cover" />
          </div>
        )}

        <p className={`${themeTokens.mutedText} text-sm sm:text-base leading-relaxed mb-4`}>
          {challenge.description}
        </p>

        {/* How it works */}
        <div className={`rounded-2xl border ${themeTokens.subCardSurface} p-4 mb-4`}>
          <div className="text-xs font-extrabold uppercase tracking-widest text-[#5FB032] mb-2">
            {t.challenges.detailHowItWorks}
          </div>
          <p className="text-xs sm:text-sm leading-relaxed">
            {challenge.details || challenge.description}
          </p>
        </div>

        {/* Meta rows */}
        <div className="flex flex-col gap-2.5 mb-4">
          {metaRows.map((row, idx) => {
            const Icon = row.icon;
            return (
              <div
                key={idx}
                className={`flex items-center justify-between gap-3 rounded-full border ${themeTokens.subCardSurface} px-5 py-2.5`}
              >
                <span className={`text-xs sm:text-sm inline-flex items-center gap-2 ${themeTokens.mutedText}`}>
                  <Icon className="w-4 h-4 text-[#5FB032]" />
                  {row.label}
                </span>
                <span className="text-sm sm:text-base font-bold text-[#5FB032] shrink-0">{row.value}</span>
              </div>
            );
          })}
        </div>

        {/* Progress (if joined) */}
        {challenge.joined && (
          <div className="mb-5">
            <div className="flex justify-between items-center text-xs font-bold mb-1.5">
              <span className={themeTokens.mutedText}>{t.challenges.progressLabel}</span>
              <span className={completed ? 'text-[#5FB032]' : 'text-[#CABA3A]'}>
                {challenge.progress}/{challenge.days} {t.challenges.daysShort}
              </span>
            </div>
            <div className={`h-3.5 rounded-full overflow-hidden ${isLight ? 'bg-[#E2EFE0]' : 'bg-black/50'}`}>
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${progressPct}%`,
                  background: completed ? 'linear-gradient(90deg,#5FB032,#8bd450)' : 'linear-gradient(90deg,#CABA3A,#5FB032)',
                }}
              />
            </div>
          </div>
        )}

        {/* Footer buttons */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className={`px-6 py-2.5 text-xs sm:text-sm ${themeTokens.secondaryBtn}`}
          >
            {t.common.close}
          </button>
          {completed && (
            <span className="rounded-full bg-[#5FB032]/20 border border-[#5FB032]/60 text-[#5FB032] px-5 py-2.5 text-xs sm:text-sm font-bold inline-flex items-center gap-2">
              <CheckCircleIcon className="w-4 h-4" />
              {t.challenges.completedMsg}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

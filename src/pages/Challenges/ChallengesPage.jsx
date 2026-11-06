import React, { useState } from 'react';
import { TrophyIcon, UsersGroupIcon, CheckCircleIcon, SparklesIcon } from '../../components/common/Icons';
import { ChallengeDetailModal } from '../../components/common/ChallengeDetailModal';
import { useTheme } from '../../hooks/useTheme';
import { useLunglowData } from '../../hooks/useLunglowData';

export function ChallengesPage() {
  const { t, isLight, themeTokens } = useTheme();
  const { challenges, handleJoinChallenge, handleChallengeLogDay } = useLunglowData();
  const [tab, setTab] = useState('live'); // 'live' | 'joined'
  const [detailTarget, setDetailTarget] = useState(null);

  const todayKey = new Date().toDateString();
  const liveChallenges = challenges.filter((c) => c.active);
  const joinedChallenges = challenges.filter((c) => c.joined);
  const shown = tab === 'live' ? liveChallenges : joinedChallenges;

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#5FB032]/15 border border-[#5FB032]/50 text-[#5FB032] px-4 py-1 text-xs font-bold mb-2">
            <TrophyIcon className="w-4 h-4" />
            <span>{t.nav.challenges}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-1.5">{t.challenges.title}</h1>
          <p className={`text-xs sm:text-base ${themeTokens.mutedText} max-w-3xl`}>{t.challenges.subtitle}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 flex-wrap">
        {[
          { id: 'live', label: `${t.challenges.tabLive} (${liveChallenges.length})` },
          { id: 'joined', label: `${t.challenges.tabJoined} (${joinedChallenges.length})` },
        ].map((tabItem) => (
          <button
            key={tabItem.id}
            type="button"
            onClick={() => setTab(tabItem.id)}
            className={`h-12 sm:h-14 rounded-full px-6 sm:px-8 font-bold text-sm sm:text-base transition-all lunglow-btn-spring ${
              tab === tabItem.id
                ? 'bg-[#CABA3A] text-black shadow-lg scale-[1.02]'
                : isLight
                ? 'bg-white text-black border border-[#2E5A1C]/20'
                : 'bg-white/10 text-white border border-white/20 hover:bg-white/15'
            }`}
          >
            {tabItem.label}
          </button>
        ))}
      </div>

      {shown.length === 0 && (
        <div className={`rounded-3xl border ${themeTokens.subCardSurface} py-16 px-6 text-center flex flex-col items-center gap-3`}>
          <TrophyIcon className="w-14 h-14 text-[#CABA3A] animate-float-slow" />
          <p className={`text-sm sm:text-base font-semibold ${themeTokens.mutedText}`}>
            {tab === 'joined' ? t.challenges.emptyJoined : 'No live challenges right now — check back soon!'}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 sm:gap-6">
        {shown.map((c, idx) => {
          const progressPct = Math.min(100, Math.round((c.progress / c.days) * 100));
          const completed = c.joined && c.progress >= c.days;
          const loggedToday = c.lastLogDate === todayKey;
          return (
            <div
              key={c.id}
              className={`rounded-3xl sm:rounded-[36px] border ${themeTokens.cardSurface} overflow-hidden flex flex-col animate-stagger-${Math.min(idx + 1, 4)}`}
            >
              {/* Cover media */}
              <div className={`relative h-40 sm:h-48 ${isLight ? 'bg-[#E2EFE0]' : 'bg-black/40'}`}>
                {c.cover ? (
                  <img src={c.cover} alt={c.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-7xl animate-float-slow">{c.emoji || '🎯'}</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-3.5 left-3.5 rounded-full bg-[#CABA3A] text-black px-3.5 py-1 text-[10px] sm:text-xs font-extrabold shadow-lg">
                  {c.reward}
                </span>
                {c.joined && (
                  <span className="absolute top-3.5 right-3.5 rounded-full bg-[#5FB032] text-black px-3.5 py-1 text-[10px] sm:text-xs font-extrabold shadow-lg inline-flex items-center gap-1">
                    <CheckCircleIcon className="w-3.5 h-3.5" />
                    {t.challenges.joinedBadge}
                  </span>
                )}
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-3">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white drop-shadow-lg break-words">{c.title}</h2>
                  <span className="text-4xl shrink-0 drop-shadow-lg">{c.emoji}</span>
                </div>
              </div>

              <div className="p-5 sm:p-6 flex flex-col gap-4 flex-1">
                <p className={`text-sm ${themeTokens.mutedText} leading-relaxed`}>{c.description}</p>

                <div className={`flex flex-wrap items-center gap-4 text-xs sm:text-sm font-semibold ${themeTokens.mutedText}`}>
                  <span className="inline-flex items-center gap-1.5">
                    <UsersGroupIcon className="w-4 h-4 text-[#5FB032]" />
                    {c.participants.toLocaleString()} {t.challenges.participantsLabel}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <TrophyIcon className="w-4 h-4 text-[#CABA3A]" />
                    {c.days} {t.challenges.daysLabel}
                  </span>
                </div>

                {c.joined && (
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className={themeTokens.mutedText}>{t.challenges.progressLabel}</span>
                      <span className={completed ? 'text-[#5FB032]' : 'text-[#CABA3A]'}>
                        {c.progress}/{c.days} {t.challenges.daysShort}
                      </span>
                    </div>
                    <div className={`h-3.5 rounded-full overflow-hidden ${isLight ? 'bg-[#E2EFE0]' : 'bg-black/50'}`}>
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${progressPct}%`,
                          background: completed
                            ? 'linear-gradient(90deg,#5FB032,#8bd450)'
                            : 'linear-gradient(90deg,#CABA3A,#5FB032)',
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3 mt-auto pt-1">
                  {/* Detail button — always available */}
                  <button
                    type="button"
                    onClick={() => setDetailTarget(c)}
                    className={`px-5 py-2.5 text-xs sm:text-sm inline-flex items-center gap-1.5 ${themeTokens.secondaryBtn}`}
                  >
                    <SparklesIcon className="w-4 h-4" />
                    {t.challenges.detailBtn}
                  </button>

                  {completed ? (
                    <div className="rounded-full bg-[#5FB032]/20 border border-[#5FB032]/60 text-[#5FB032] px-5 py-2.5 text-xs sm:text-sm font-bold inline-flex items-center gap-2">
                      <SparklesIcon className="w-4 h-4" />
                      {t.challenges.completedMsg}
                    </div>
                  ) : c.joined ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleChallengeLogDay(c.id)}
                        disabled={loggedToday}
                        title={loggedToday ? 'Already logged today' : ''}
                        className={`px-6 py-2.5 text-sm inline-flex items-center gap-2 ${themeTokens.primaryBtn} ${
                          loggedToday ? 'opacity-60 cursor-not-allowed' : ''
                        }`}
                      >
                        <CheckCircleIcon className="w-4 h-4" />
                        {loggedToday ? t.challenges.loggedToday : t.challenges.logDayBtn}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleJoinChallenge(c.id)}
                        className={`px-5 py-2.5 text-xs sm:text-sm ${themeTokens.secondaryBtn}`}
                      >
                        {t.challenges.leaveBtn}
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleJoinChallenge(c.id)}
                      disabled={!c.active}
                      className={`px-7 py-3 text-sm sm:text-base inline-flex items-center gap-2 ${themeTokens.primaryBtn} disabled:opacity-50`}
                    >
                      <TrophyIcon className="w-4 h-4" />
                      {t.challenges.joinBtn}
                    </button>
                  )}
                  {!c.active && (
                    <span className={`text-xs font-semibold ${themeTokens.mutedText}`}>{t.challenges.pausedMsg}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {detailTarget && (
        <ChallengeDetailModal challenge={detailTarget} onClose={() => setDetailTarget(null)} />
      )}
    </div>
  );
}

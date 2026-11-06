import React, { useRef, useState } from 'react';
import {
  TrophyIcon,
  PauseIcon,
  PlayIcon,
  TrashCanIcon,
  UsersGroupIcon,
  SparklesIcon,
  CameraIcon,
} from '../../components/common/Icons';
import { ChallengeDetailModal } from '../../components/common/ChallengeDetailModal';
import { CountUp } from '../../components/common/Charts';
import { useTheme } from '../../hooks/useTheme';
import { useLunglowData } from '../../hooks/useLunglowData';

export function AdminChallengesPage() {
  const { t, isLight, themeTokens } = useTheme();
  const {
    challenges,
    handleAdminAddChallenge,
    handleAdminToggleChallenge,
    handleAdminDeleteChallenge,
    handleAdminUpdateChallengeCover,
  } = useLunglowData();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reward, setReward] = useState('');
  const [days, setDays] = useState(7);
  const [coverPhoto, setCoverPhoto] = useState(null);

  // Detail modal + cover replacement for existing challenges
  const [detailTarget, setDetailTarget] = useState(null);
  const [coverReplaceId, setCoverReplaceId] = useState(null);
  const formPhotoRef = useRef(null);
  const cardPhotoRef = useRef(null);

  const liveCount = challenges.filter((c) => c.active).length;
  const totalParticipants = challenges.reduce((s, c) => s + c.participants, 0);

  const readImageFile = (file, onLoaded) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') onLoaded(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFormPhotoChange = (e) => {
    readImageFile(e.target.files?.[0], setCoverPhoto);
    e.target.value = '';
  };

  const handleCardPhotoChange = (e) => {
    const challengeId = coverReplaceId;
    readImageFile(e.target.files?.[0], (src) => {
      if (challengeId) handleAdminUpdateChallengeCover(challengeId, src);
    });
    setCoverReplaceId(null);
    e.target.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    handleAdminAddChallenge({ title, description, reward, days, cover: coverPhoto });
    setTitle('');
    setDescription('');
    setReward('');
    setDays(7);
    setCoverPhoto(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-1.5">{t.admin.challengesPage.title}</h1>
        <p className={`text-xs sm:text-base ${themeTokens.mutedText} max-w-3xl`}>{t.admin.challengesPage.subtitle}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className={`rounded-2xl border ${themeTokens.cardSurface} px-5 py-4 animate-stagger-1`}>
          <div className="text-2xl font-extrabold text-[#5FB032]"><CountUp value={liveCount} /></div>
          <div className={`text-xs ${themeTokens.mutedText} font-semibold`}>{t.admin.challengesPage.statusLive}</div>
        </div>
        <div className={`rounded-2xl border ${themeTokens.cardSurface} px-5 py-4 animate-stagger-2`}>
          <div className="text-2xl font-extrabold text-[#CABA3A]"><CountUp value={challenges.length} /></div>
          <div className={`text-xs ${themeTokens.mutedText} font-semibold`}>Total Challenges</div>
        </div>
        <div className={`rounded-2xl border ${themeTokens.cardSurface} px-5 py-4 animate-stagger-3 col-span-2 sm:col-span-1`}>
          <div className="text-2xl font-extrabold"><CountUp value={totalParticipants} /></div>
          <div className={`text-xs ${themeTokens.mutedText} font-semibold`}>{t.admin.challengesPage.participantsLabel}</div>
        </div>
      </div>

      {/* Create form */}
      <form
        onSubmit={handleSubmit}
        className={`rounded-3xl sm:rounded-[38px] border ${themeTokens.cardSurface} p-5 sm:p-8 flex flex-col gap-4`}
      >
        <div className="flex items-center gap-3">
          <div className={themeTokens.iconBadge}>
            <SparklesIcon className="w-6 h-6" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold">{t.admin.challengesPage.launchBtn}</h2>
        </div>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t.admin.challengesPage.formTitlePlaceholder}
          className={`w-full h-12 rounded-full border ${themeTokens.inputSurface} px-5 text-sm focus:outline-none`}
        />
        <textarea
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t.admin.challengesPage.formDescPlaceholder}
          className={`w-full rounded-3xl border ${themeTokens.inputSurface} p-4 text-sm focus:outline-none resize-y`}
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            value={reward}
            onChange={(e) => setReward(e.target.value)}
            placeholder={t.admin.challengesPage.formRewardPlaceholder}
            className={`h-12 rounded-full border ${themeTokens.inputSurface} px-5 text-sm focus:outline-none sm:col-span-2`}
          />
          <input
            type="number"
            min={1}
            value={days}
            onChange={(e) => setDays(e.target.value)}
            placeholder={t.admin.challengesPage.formDaysPlaceholder}
            className={`h-12 rounded-full border ${themeTokens.inputSurface} px-5 text-sm focus:outline-none`}
          />
        </div>

        {/* Cover photo upload */}
        <input
          ref={formPhotoRef}
          type="file"
          accept="image/*"
          onChange={handleFormPhotoChange}
          className="hidden"
        />
        {coverPhoto ? (
          <div className="relative w-full max-h-60 rounded-3xl overflow-hidden border border-[#5FB032]/40">
            <img src={coverPhoto} alt="Challenge cover preview" className="w-full h-52 object-cover" />
            <button
              type="button"
              onClick={() => setCoverPhoto(null)}
              className="absolute top-3 right-3 rounded-full bg-black/80 text-white text-xs font-bold px-3 py-1"
            >
              ✕
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => formPhotoRef.current?.click()}
            className={`self-start px-5 py-2.5 text-xs sm:text-sm inline-flex items-center gap-2 ${themeTokens.secondaryBtn}`}
          >
            <CameraIcon className="w-4 h-4 text-[#5FB032]" />
            <span>{t.admin.challengesPage.uploadCoverBtn}</span>
          </button>
        )}

        <button type="submit" className={`self-end px-8 py-3 text-sm sm:text-base ${themeTokens.primaryBtn}`}>
          {t.admin.challengesPage.launchBtn}
        </button>
      </form>

      {/* Challenge list */}
      <div className="flex flex-col gap-4">
        {challenges.map((c, idx) => (
          <div
            key={c.id}
            className={`rounded-3xl border ${themeTokens.cardSurface} overflow-hidden animate-stagger-${Math.min(idx + 1, 4)}`}
          >
            <div className="flex flex-col sm:flex-row">
              {/* Cover media */}
              <div className={`sm:w-52 h-36 sm:h-auto shrink-0 relative ${isLight ? 'bg-[#E2EFE0]' : 'bg-black/40'}`}>
                {c.cover ? (
                  <img src={c.cover} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl">{c.emoji || '🎯'}</div>
                )}
                <span
                  className={`absolute top-3 left-3 rounded-full px-3 py-1 text-[10px] font-extrabold tracking-wide ${
                    c.active ? 'bg-[#5FB032] text-black' : 'bg-black/70 text-white border border-white/30'
                  }`}
                >
                  {c.active ? `● ${t.admin.challengesPage.statusLive}` : `‖ ${t.admin.challengesPage.statusPaused}`}
                </span>
                <button
                  type="button"
                  title={c.cover ? t.admin.challengesPage.changeCoverBtn : t.admin.challengesPage.uploadCoverBtn}
                  onClick={() => {
                    setCoverReplaceId(c.id);
                    cardPhotoRef.current?.click();
                  }}
                  className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center shadow hover:bg-black transition"
                >
                  <CameraIcon className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 p-5 flex flex-col gap-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                      <span>{c.emoji}</span>
                      <span className="break-words">{c.title}</span>
                    </h3>
                    <p className={`text-xs sm:text-sm ${themeTokens.mutedText} mt-1 line-clamp-2`}>{c.description}</p>
                  </div>
                  <span className="rounded-full bg-[#CABA3A]/20 border border-[#CABA3A]/60 text-[#CABA3A] px-3.5 py-1 text-[11px] font-bold shrink-0">
                    {c.reward}
                  </span>
                </div>

                <div className={`flex flex-wrap items-center gap-4 text-xs ${themeTokens.mutedText} font-semibold`}>
                  <span className="inline-flex items-center gap-1.5">
                    <UsersGroupIcon className="w-4 h-4" />
                    {c.participants.toLocaleString()} {t.admin.challengesPage.participantsLabel}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <TrophyIcon className="w-4 h-4 text-[#CABA3A]" />
                    {c.days} {t.challenges.daysLabel}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 mt-auto pt-1">
                  <button
                    type="button"
                    onClick={() => setDetailTarget(c)}
                    className={`px-5 py-2.5 text-xs sm:text-sm inline-flex items-center gap-1.5 ${themeTokens.secondaryBtn}`}
                  >
                    <SparklesIcon className="w-4 h-4" />
                    {t.challenges.detailBtn}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAdminToggleChallenge(c.id)}
                    className={`px-5 py-2.5 rounded-full text-xs font-bold inline-flex items-center gap-2 lunglow-btn-spring shadow ${
                      c.active ? 'bg-[#FF3B30] text-white' : 'bg-[#5FB032] text-black'
                    }`}
                  >
                    {c.active ? <PauseIcon className="w-3.5 h-3.5" /> : <PlayIcon className="w-3.5 h-3.5" />}
                    {c.active ? t.admin.challengesPage.pauseBtn : t.admin.challengesPage.activateBtn}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAdminDeleteChallenge(c.id)}
                    className={`px-4 py-2.5 rounded-full text-xs font-bold inline-flex items-center gap-2 border lunglow-btn-spring ${
                      isLight ? 'border-[#2E5A1C]/25 text-[#C81E1E] hover:bg-red-500/10' : 'border-white/25 text-[#FF3B30] hover:bg-[#FF3B30]/10'
                    }`}
                  >
                    <TrashCanIcon className="w-3.5 h-3.5" />
                    {t.admin.challengesPage.deleteBtn}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {challenges.length === 0 && (
          <div className={`rounded-3xl border ${themeTokens.subCardSurface} py-14 px-6 text-center flex flex-col items-center gap-3`}>
            <TrophyIcon className="w-12 h-12 text-[#CABA3A]" />
            <p className={`text-sm sm:text-base font-semibold ${themeTokens.mutedText}`}>{t.admin.challengesPage.empty}</p>
          </div>
        )}
      </div>

      {/* Shared file input for replacing an existing challenge's cover */}
      <input
        ref={cardPhotoRef}
        type="file"
        accept="image/*"
        onChange={handleCardPhotoChange}
        className="hidden"
      />

      {detailTarget && (
        <ChallengeDetailModal challenge={detailTarget} onClose={() => setDetailTarget(null)} />
      )}
    </div>
  );
}

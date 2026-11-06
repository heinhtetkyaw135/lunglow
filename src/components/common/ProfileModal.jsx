import React, { useEffect } from 'react';
import { FlagReportIcon, NavAdminShieldIcon } from './Icons';
import { ASSETS } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { useLunglowData } from '../../hooks/useLunglowData';

// Profile overview pop-up — mirrors the ReportModal layout exactly:
// centered card on a dark blurred backdrop, a header row with a circular
// visual + label + title, a body section, and a right-aligned button row.
// Closes on backdrop click or Escape.
export function ProfileModal({ author, avatar, isYou = false, authorRole, onClose }) {
  const { isLight, t, themeTokens } = useTheme();
  const { userName, userAvatar } = useAuth();
  const { managedUsers, metrics, handleOpenReportModal } = useLunglowData();

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const record = managedUsers.find(
    (u) =>
      u.name === author ||
      u.name.replace(' (Admin)', '') === author.replace(' (Admin)', '') ||
      u.name === author.replace(' (Lunglow Admin)', ' (Admin)')
  );
  const displayName = isYou ? userName : record?.name || author;
  const displayAvatar = isYou ? userAvatar : avatar || record?.avatar || ASSETS.avatar;
  const displayRole = authorRole || record?.role || 'member';
  const isSuspended = record?.status === 'suspended';

  const streak = isYou ? metrics.currentStreak : record?.streak;
  const savedMoney = isYou ? metrics.totalSavedMoney : record?.savedMoney;
  const avoidedCigs = isYou ? metrics.totalAvoidedCigarettes : record?.avoidedCigs;
  const bio = isYou ? '' : record?.bio || '';
  const joinedAt = record?.joinedAt || '—';

  const stats = [
    { label: t.profile.currentStreak, value: streak != null ? `${streak} ${t.profile.daysUnit}` : '—' },
    { label: t.profile.totalSavedMoney, value: savedMoney != null ? `${savedMoney} $` : '—' },
    { label: t.profile.avoidedCigs, value: avoidedCigs != null ? avoidedCigs : '—' },
  ];

  const openReportProfile = () => {
    onClose();
    handleOpenReportModal({
      targetType: 'profile-image',
      targetId: record?.id || author,
      targetAuthor: displayName,
      excerpt: `Profile overview of ${displayName} (reported from profile pop-up)`,
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-name"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-page-enter"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-lg rounded-[36px] border p-6 sm:p-8 shadow-2xl animate-pop ${
          isLight
            ? 'border-[#2E5A1C]/25 bg-white text-[#132211]'
            : 'border-white/25 bg-[#141814] text-white'
        }`}
      >
        <div className="text-center">
          <div className="w-20 h-20 rounded-full border-[3px] border-[#5FB032]/60 p-1 overflow-hidden mx-auto mb-4 shadow-md">
            <img
              src={displayAvatar}
              alt={displayName}
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          <h3 id="profile-modal-name" className="text-xl sm:text-2xl font-bold break-words">
            {displayName}
            {isYou ? ` ${t.community.youSuffix}` : ''}
          </h3>

          <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-bold ${
                displayRole === 'admin'
                  ? 'bg-[#CABA3A]/25 text-[#CABA3A] border border-[#CABA3A]/50'
                  : 'bg-[#5FB032]/20 text-[#5FB032]'
              }`}
            >
              {displayRole === 'admin' && <NavAdminShieldIcon className="w-3 h-3" />}
              {displayRole === 'admin' ? t.admin.roleAdmin : t.admin.roleMember}
            </span>
            <span
              className={`inline-block rounded-full px-3.5 py-1 text-[11px] font-bold ${
                isSuspended ? 'bg-[#FF3B30]/15 text-[#FF3B30]' : 'bg-[#5FB032]/15 text-[#5FB032]'
              }`}
            >
              {isSuspended ? t.admin.userStatusSuspended : t.admin.userStatusActive}
            </span>
          </div>

          {bio && (
            <p className={`${themeTokens.mutedText} text-xs sm:text-sm leading-relaxed mt-3`}>
              {bio}
            </p>
          )}

          <div className={`mt-5 rounded-2xl border ${themeTokens.subCardSurface} p-4 grid grid-cols-3 gap-2`}>
            {stats.map((s, idx) => (
              <div key={idx} className="min-w-0 px-1">
                <div className="text-base sm:text-lg font-bold text-[#5FB032] leading-tight break-words">
                  {s.value}
                </div>
                <div className="text-[9px] sm:text-[10px] mt-1 leading-snug">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <p className={`text-[10px] sm:text-xs mt-3 ${themeTokens.mutedText}`}>
            {t.common.joined}: {joinedAt}
          </p>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 py-3 ${themeTokens.secondaryBtn}`}
            >
              {t.common.close}
            </button>
            {!isYou && (
              <button
                type="button"
                onClick={openReportProfile}
                className="flex-1 py-3 rounded-full bg-[#FF3B30] hover:brightness-110 active:scale-95 text-white font-semibold text-sm inline-flex items-center justify-center gap-2 shadow-lg transition lunglow-btn-spring"
              >
                <FlagReportIcon className="w-4 h-4" />
                <span>{t.common.reportProfile}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

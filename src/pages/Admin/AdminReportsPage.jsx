import React, { useState } from 'react';
import {
  FlagReportIcon,
  TrashCanIcon,
  CheckCircleIcon,
  EyeIcon,
} from '../../components/common/Icons';
import { CountUp } from '../../components/common/Charts';
import { ASSETS } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import { useLunglowData } from '../../hooks/useLunglowData';

export function AdminReportsPage() {
  const { t, isLight, themeTokens } = useTheme();
  const { reports, managedUsers, handleAdminResolveReport } = useLunglowData();
  const [reportFilter, setReportFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  const filteredReports = reports.filter((r) => reportFilter === 'all' || r.targetType === reportFilter);

  const filters = [
    { id: 'all', label: t.admin.filterAll },
    { id: 'blog', label: t.admin.filterBlogs },
    { id: 'post', label: t.admin.filterPosts },
    { id: 'comment', label: t.admin.filterComments },
    { id: 'profile-image', label: t.admin.filterAvatars },
  ];

  const typeCounts = {
    all: reports.length,
    blog: reports.filter((r) => r.targetType === 'blog').length,
    post: reports.filter((r) => r.targetType === 'post').length,
    comment: reports.filter((r) => r.targetType === 'comment').length,
    'profile-image': reports.filter((r) => r.targetType === 'profile-image').length,
  };

  const findReportedAvatar = (rep) => {
    const user = managedUsers.find((u) => u.id === rep.targetId || u.name === rep.targetAuthor);
    return user?.avatar || ASSETS.avatar;
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-1.5">{t.admin.reportsPage.title}</h1>
        <p className={`text-xs sm:text-base ${themeTokens.mutedText} max-w-3xl`}>{t.admin.reportsPage.subtitle}</p>
      </div>

      {/* Queue stat strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: 'Pending', value: reports.length, color: '#FF3B30' },
          { label: 'Blogs', value: typeCounts.blog, color: '#CABA3A' },
          { label: 'Posts', value: typeCounts.post, color: '#5FB032' },
          { label: 'Comments + Photos', value: typeCounts.comment + typeCounts['profile-image'], color: '#7dd3fc' },
        ].map((s, i) => (
          <div key={i} className={`rounded-2xl border ${themeTokens.cardSurface} px-4 py-3.5 animate-stagger-${i + 1}`}>
            <div className="text-xl sm:text-2xl font-extrabold" style={{ color: s.color }}>
              <CountUp value={s.value} />
            </div>
            <div className={`text-[10px] sm:text-xs ${themeTokens.mutedText} font-semibold`}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className={`rounded-3xl sm:rounded-[38px] border ${themeTokens.cardSurface} p-5 sm:p-8 flex flex-col gap-6`}>
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setReportFilter(f.id)}
              className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition-all lunglow-btn-spring ${
                reportFilter === f.id
                  ? 'bg-[#5FB032] text-black font-bold shadow'
                  : isLight
                  ? 'border border-[#2E5A1C]/20 bg-[#F2F7EF]'
                  : 'border border-white/20 bg-black/35'
              }`}
            >
              {f.label}
              <span className="ml-1.5 opacity-70 tabular-nums">({typeCounts[f.id] ?? 0})</span>
            </button>
          ))}
        </div>

        {filteredReports.length === 0 ? (
          <div className={`rounded-3xl border ${themeTokens.subCardSurface} py-14 px-6 text-center flex flex-col items-center gap-3`}>
            <CheckCircleIcon className="w-12 h-12 text-[#5FB032]" />
            <p className="text-base sm:text-lg font-semibold text-[#5FB032]">{t.admin.noReports}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredReports.map((rep, idx) => {
              const isAvatarReport = rep.targetType === 'profile-image';
              const typeBadgeLabel = t.reportModal.targetTypes[rep.targetType] || rep.targetType;
              const expanded = expandedId === rep.id;

              return (
                <div
                  key={rep.id}
                  className={`rounded-2xl sm:rounded-3xl border ${themeTokens.subCardSurface} p-5 flex flex-col gap-4 animate-stagger-${Math.min(idx + 1, 4)}`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-3.5 min-w-0">
                      {isAvatarReport ? (
                        <img
                          src={findReportedAvatar(rep)}
                          alt={rep.targetAuthor}
                          className="w-11 h-11 rounded-full object-cover border border-[#FF3B30]/50 shrink-0"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-[#FF3B30]/15 border border-[#FF3B30]/40 text-[#FF3B30] flex items-center justify-center shrink-0">
                          <FlagReportIcon className="w-5 h-5" />
                        </div>
                      )}
                      <div className="flex flex-col gap-2 min-w-0">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="rounded-full bg-[#FF3B30]/20 border border-[#FF3B30] text-[#FF3B30] px-3.5 py-0.5 text-xs font-bold">
                            {typeBadgeLabel}
                          </span>
                          <span className="text-sm sm:text-base font-bold">{rep.targetAuthor}</span>
                          <span className={`text-xs ${themeTokens.mutedText}`}>• {rep.createdAt}</span>
                        </div>
                        <p className={`text-xs sm:text-sm font-medium break-words ${expanded ? '' : 'line-clamp-2'}`}>
                          "{rep.excerpt}"
                        </p>
                        <div className={`text-xs ${themeTokens.mutedText} flex flex-wrap items-center gap-3`}>
                          <span>
                            <strong>{t.admin.reasonLabel}</strong>{' '}
                            <span className="text-[#CABA3A] font-semibold">{rep.reason}</span>
                          </span>
                          <span>
                            <strong>{t.admin.reportedBy}</strong> {rep.reportedBy}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => setExpandedId(expanded ? null : rep.id)}
                        className={`px-4 py-2.5 text-xs sm:text-sm inline-flex items-center gap-1.5 ${themeTokens.secondaryBtn}`}
                      >
                        <EyeIcon className="w-4 h-4" />
                        {expanded ? 'Less' : 'Details'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAdminResolveReport(rep, 'dismiss')}
                        className={`px-5 py-2.5 text-xs sm:text-sm ${themeTokens.secondaryBtn}`}
                      >
                        {t.admin.dismissAction}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAdminResolveReport(rep, 'delete')}
                        className="rounded-full bg-[#FF3B30] hover:brightness-110 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 inline-flex items-center gap-2 shadow-md lunglow-btn-spring"
                      >
                        <TrashCanIcon className="w-4 h-4" />
                        <span>{isAvatarReport ? t.admin.resetAvatarAction : t.admin.deleteAction}</span>
                      </button>
                    </div>
                  </div>

                  {expanded && (
                    <div className={`rounded-2xl border ${isLight ? 'border-[#2E5A1C]/15 bg-white/60' : 'border-white/10 bg-black/30'} p-4 text-xs sm:text-sm animate-page-enter`}>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <span className={`block font-bold ${themeTokens.mutedText} text-[10px] uppercase tracking-wider mb-1`}>Target ID</span>
                          <code className="font-mono text-[#CABA3A]">{rep.targetId}</code>
                        </div>
                        <div>
                          <span className={`block font-bold ${themeTokens.mutedText} text-[10px] uppercase tracking-wider mb-1`}>Type</span>
                          {typeBadgeLabel}
                        </div>
                        <div>
                          <span className={`block font-bold ${themeTokens.mutedText} text-[10px] uppercase tracking-wider mb-1`}>Reporter</span>
                          {rep.reportedBy}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { InboxIcon, CheckCircleIcon, TrashCanIcon, SendIcon } from '../../components/common/Icons';
import { CountUp } from '../../components/common/Charts';
import { ASSETS } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import { useLunglowData } from '../../hooks/useLunglowData';

const STATUS_STYLES = {
  pending: { chip: 'bg-[#CABA3A]/20 border-[#CABA3A]/60 text-[#CABA3A]' },
  'in-progress': { chip: 'bg-[#7dd3fc]/20 border-[#7dd3fc]/60 text-[#7dd3fc]' },
  resolved: { chip: 'bg-[#5FB032]/20 border-[#5FB032]/60 text-[#5FB032]' },
};

export function AdminRequestsPage() {
  const { t, isLight, themeTokens } = useTheme();
  const { userRequests, handleAdminUpdateRequestStatus, handleAdminDeleteRequest } = useLunglowData();
  const [statusFilter, setStatusFilter] = useState('all');

  const pending = userRequests.filter((r) => r.status === 'pending').length;
  const inProgress = userRequests.filter((r) => r.status === 'in-progress').length;
  const resolved = userRequests.filter((r) => r.status === 'resolved').length;

  const filtered = userRequests.filter((r) => statusFilter === 'all' || r.status === statusFilter);

  const statusLabel = (s) =>
    s === 'pending'
      ? t.admin.requestsPage.statusPending
      : s === 'in-progress'
      ? t.admin.requestsPage.statusInProgress
      : t.admin.requestsPage.statusResolved;

  const filters = [
    { id: 'all', count: userRequests.length },
    { id: 'pending', count: pending },
    { id: 'in-progress', count: inProgress },
    { id: 'resolved', count: resolved },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-1.5">{t.admin.requestsPage.title}</h1>
        <p className={`text-xs sm:text-base ${themeTokens.mutedText} max-w-3xl`}>{t.admin.requestsPage.subtitle}</p>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: t.admin.requestsPage.statusPending, value: pending, color: '#CABA3A' },
          { label: t.admin.requestsPage.statusInProgress, value: inProgress, color: '#7dd3fc' },
          { label: t.admin.requestsPage.statusResolved, value: resolved, color: '#5FB032' },
        ].map((s, i) => (
          <div key={i} className={`rounded-2xl border ${themeTokens.cardSurface} px-4 py-3.5 sm:px-5 sm:py-4 animate-stagger-${i + 1}`}>
            <div className="text-xl sm:text-2xl font-extrabold" style={{ color: s.color }}>
              <CountUp value={s.value} />
            </div>
            <div className={`text-[10px] sm:text-xs ${themeTokens.mutedText} font-semibold`}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setStatusFilter(f.id)}
            className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition-all lunglow-btn-spring ${
              statusFilter === f.id
                ? 'bg-[#CABA3A] text-black font-bold shadow'
                : isLight
                ? 'border border-[#2E5A1C]/20 bg-[#F2F7EF]'
                : 'border border-white/20 bg-black/35'
            }`}
          >
            {f.id === 'all' ? 'All' : statusLabel(f.id)}
            <span className="ml-1.5 opacity-70 tabular-nums">({f.count})</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className={`rounded-3xl border ${themeTokens.subCardSurface} py-14 px-6 text-center flex flex-col items-center gap-3`}>
          <InboxIcon className="w-12 h-12 text-[#5FB032]" />
          <p className={`text-sm sm:text-base font-semibold ${themeTokens.mutedText}`}>{t.admin.requestsPage.empty}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((req, idx) => (
            <div
              key={req.id}
              className={`rounded-3xl border ${themeTokens.cardSurface} p-5 flex flex-col gap-4 animate-stagger-${Math.min(idx + 1, 4)}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-3.5 min-w-0">
                  <img
                    src={req.avatar || ASSETS.avatar}
                    alt={req.user}
                    className="w-11 h-11 rounded-full object-cover border border-[#5FB032]/40 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-sm sm:text-base">{req.user}</span>
                      <span className="rounded-full bg-[#5FB032]/15 border border-[#5FB032]/40 text-[#5FB032] px-3 py-0.5 text-[10px] font-bold">
                        {req.category}
                      </span>
                      <span className={`rounded-full border px-3 py-0.5 text-[10px] font-bold ${STATUS_STYLES[req.status]?.chip}`}>
                        {statusLabel(req.status)}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold mt-1 break-words">{req.subject}</h3>
                    <p className={`text-xs sm:text-sm ${themeTokens.mutedText} mt-1 break-words`}>{req.message}</p>
                    <span className={`text-[10px] ${themeTokens.mutedText} font-semibold`}>{req.createdAt}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {req.status !== 'in-progress' && (
                    <button
                      type="button"
                      onClick={() => handleAdminUpdateRequestStatus(req.id, 'in-progress')}
                      className={`px-4 py-2.5 text-xs font-bold rounded-full inline-flex items-center gap-1.5 lunglow-btn-spring ${
                        isLight ? 'bg-[#E2ECE0] text-[#132211]' : 'bg-white text-black'
                      }`}
                    >
                      <SendIcon className="w-3.5 h-3.5" />
                      {t.admin.requestsPage.markInProgress}
                    </button>
                  )}
                  {req.status !== 'resolved' ? (
                    <button
                      type="button"
                      onClick={() => handleAdminUpdateRequestStatus(req.id, 'resolved')}
                      className="px-4 py-2.5 text-xs font-bold rounded-full bg-[#5FB032] text-black inline-flex items-center gap-1.5 lunglow-btn-spring shadow"
                    >
                      <CheckCircleIcon className="w-3.5 h-3.5" />
                      {t.admin.requestsPage.markResolved}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleAdminUpdateRequestStatus(req.id, 'pending')}
                      className={`px-4 py-2.5 text-xs font-bold rounded-full ${themeTokens.secondaryBtn}`}
                    >
                      {t.admin.requestsPage.markPending}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleAdminDeleteRequest(req.id)}
                    className={`px-4 py-2.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5 border lunglow-btn-spring ${
                      isLight ? 'border-[#2E5A1C]/25 text-[#C81E1E] hover:bg-red-500/10' : 'border-white/25 text-[#FF3B30] hover:bg-[#FF3B30]/10'
                    }`}
                  >
                    <TrashCanIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

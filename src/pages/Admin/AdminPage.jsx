import React, { useState } from 'react';
import {
  UsersGroupIcon,
  FlameIcon,
  FlagReportIcon,
  NavBlogIcon,
  NavAdminShieldIcon,
  TrophyIcon,
  InboxIcon,
  MegaphoneIcon,
  ArrowUpRightIcon,
  TrashCanIcon,
} from '../../components/common/Icons';
import { CountUp, MiniLineChart, MiniBarChart, DonutChart } from '../../components/common/Charts';
import { ASSETS } from '../../types';
import { useTheme } from '../../hooks/useTheme';
import { useLunglowData } from '../../hooks/useLunglowData';

const WEEKLY_SIGNUPS = [42, 55, 48, 63, 71, 66, 84, 79, 92, 105, 98, 121];

export function AdminPage() {
  const { t, isLight, themeTokens, lang } = useTheme();
  const {
    blogs,
    posts,
    reports,
    managedUsers,
    challenges,
    userRequests,
    broadcast,
    handlePublishBroadcast,
    handleClearBroadcast,
    handleAdminToggleUserStatus,
    handleAdminResetUserAvatar,
    setPage,
    showToast,
  } = useLunglowData();

  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [userQuery, setUserQuery] = useState('');

  const totalRegisteredUsers = 1280 + managedUsers.length;
  const activeUsersCount = 838 + managedUsers.filter((u) => u.status === 'active').length;
  const pendingReportsCount = reports.length;
  const totalPublishedItems = blogs.length + posts.length;
  const liveChallenges = challenges.filter((c) => c.active).length;
  const openRequests = userRequests.filter((r) => r.status !== 'resolved').length;

  const filteredUsers = managedUsers.filter((u) =>
    u.name.toLowerCase().includes(userQuery.trim().toLowerCase()) ||
    u.email.toLowerCase().includes(userQuery.trim().toLowerCase())
  );

  const kpis = [
    {
      icon: UsersGroupIcon,
      value: totalRegisteredUsers,
      label: t.admin.kpiTotalUsers,
      color: 'text-white',
      delta: '+9.4%',
      iconCls: themeTokens.iconBadge,
    },
    {
      icon: FlameIcon,
      value: activeUsersCount,
      label: t.admin.kpiActiveUsers,
      color: 'text-[#5FB032]',
      delta: '+4.1%',
      iconCls: themeTokens.iconBadge,
    },
    {
      icon: FlagReportIcon,
      value: pendingReportsCount,
      label: t.admin.kpiPendingReports,
      color: 'text-[#FF3B30]',
      delta: pendingReportsCount > 0 ? 'action needed' : 'clear',
      iconCls:
        'w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#FF3B30]/15 border border-[#FF3B30]/35 text-[#FF3B30] flex items-center justify-center shrink-0',
      page: 'admin-reports',
    },
    {
      icon: NavBlogIcon,
      value: totalPublishedItems,
      label: t.admin.kpiTotalContent,
      color: 'text-[#CABA3A]',
      delta: '+12 this week',
      iconCls:
        'w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#CABA3A]/15 border border-[#CABA3A]/35 text-[#CABA3A] flex items-center justify-center shrink-0',
      page: 'admin-blog',
    },
  ];

  const engagementSegments = [
    { value: 46, color: '#5FB032', label: 'Clean streaks' },
    { value: 27, color: '#CABA3A', label: 'Reducing' },
    { value: 17, color: '#7dd3fc', label: 'Exercising' },
    { value: 10, color: '#FF3B30', label: 'Struggling' },
  ];

  const userBars = [
    { label: 'Active', value: managedUsers.filter((u) => u.status === 'active').length + 831 },
    { label: 'Suspended', value: managedUsers.filter((u) => u.status !== 'active').length + 7 },
    { label: 'New wk', value: 121 },
    { label: 'Churned', value: 18 },
  ];

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#CABA3A]/20 border border-[#CABA3A] text-[#CABA3A] px-4 py-1 text-xs font-bold mb-2">
            <NavAdminShieldIcon className="w-4 h-4" />
            <span>{t.admin.navLabel}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-1.5">
            {t.admin.overview.title}
          </h1>
          <p className={`text-xs sm:text-base ${themeTokens.mutedText} max-w-3xl`}>{t.admin.subtitle}</p>
        </div>
        <div className="relative shrink-0 hidden md:block">
          <img
            src={ASSETS.breathing}
            alt="Breathing animation"
            className="w-24 h-24 lg:w-28 lg:h-28 rounded-3xl object-cover border border-[#5FB032]/40 shadow-lg animate-float-slow"
          />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <button
              key={i}
              type="button"
              onClick={() => kpi.page && setPage(kpi.page)}
              className={`rounded-3xl border ${themeTokens.cardSurface} px-6 py-5 flex items-center gap-4 text-left animate-stagger-${i + 1} ${kpi.page ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <div className={kpi.iconCls}>
                <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div className="min-w-0">
                <div className={`text-2xl sm:text-3xl font-extrabold ${kpi.color}`}>
                  <CountUp value={kpi.value} />
                </div>
                <div className={`text-xs sm:text-sm ${themeTokens.mutedText} font-semibold truncate`}>
                  {kpi.label}
                </div>
                <div className="text-[10px] font-bold text-[#5FB032]">{kpi.delta}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        <div className={`lg:col-span-2 rounded-3xl border ${themeTokens.cardSurface} p-5 sm:p-6`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base sm:text-lg font-bold">{t.admin.overview.signupTrend}</h2>
            <span className="rounded-full bg-[#5FB032]/15 border border-[#5FB032]/40 text-[#5FB032] px-3 py-1 text-[10px] sm:text-xs font-bold">
              +18% MoM
            </span>
          </div>
          <MiniLineChart data={WEEKLY_SIGNUPS} height={170} />
        </div>

        <div className={`rounded-3xl border ${themeTokens.cardSurface} p-5 sm:p-6 flex flex-col items-center justify-center gap-3`}>
          <h2 className="text-base sm:text-lg font-bold self-start">{t.admin.overview.engagementSplit}</h2>
          <DonutChart
            segments={engagementSegments}
            centerValue={`${activeUsersCount.toLocaleString()}`}
            centerLabel={t.admin.kpiActiveUsers}
          />
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 w-full mt-1">
            {engagementSegments.map((s) => (
              <div key={s.label} className="flex items-center gap-2 text-[11px] font-semibold">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: s.color }} />
                <span className={themeTokens.mutedText}>{s.label}</span>
                <span className="ml-auto tabular-nums">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Broadcast + quick stats + latest reports */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* Broadcast manager */}
        <div className={`rounded-3xl border ${themeTokens.cardSurface} p-5 sm:p-6 flex flex-col gap-4`}>
          <div className="flex items-center gap-3">
            <div className={themeTokens.iconBadge}>
              <MegaphoneIcon className="w-6 h-6" />
            </div>
            <h2 className="text-base sm:text-lg font-bold">{t.admin.tabBroadcast}</h2>
          </div>
          <textarea
            rows={3}
            value={broadcastMessage}
            onChange={(e) => setBroadcastMessage(e.target.value)}
            placeholder={lang === 'my' ? 'ကြေညာချက် ရေးပါ...' : 'Type a global announcement…'}
            className={`w-full rounded-2xl border ${themeTokens.inputSurface} p-4 text-sm focus:outline-none resize-none`}
          />
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={() => {
                handlePublishBroadcast(broadcastMessage);
                setBroadcastMessage('');
              }}
              disabled={!broadcastMessage.trim()}
              className={`px-5 py-2.5 text-sm ${themeTokens.primaryBtn} disabled:opacity-50`}
            >
              {t.admin.tabBroadcast}
            </button>
            {broadcast && (
              <button
                type="button"
                onClick={handleClearBroadcast}
                className={`px-5 py-2.5 text-sm ${themeTokens.secondaryBtn}`}
              >
                {lang === 'my' ? 'ရပ်မည်' : 'Clear'}
              </button>
            )}
          </div>
          {broadcast && (
            <div className={`rounded-2xl border ${themeTokens.subCardSurface} p-3.5 flex items-center gap-2.5`}>
              <span className="w-2.5 h-2.5 rounded-full bg-[#5FB032] animate-pulse shrink-0" />
              <span className="text-sm font-medium">{broadcast.message}</span>
            </div>
          )}
        </div>

        {/* User status mix */}
        <div className={`rounded-3xl border ${themeTokens.cardSurface} p-5 sm:p-6`}>
          <h2 className="text-base sm:text-lg font-bold mb-4">{t.admin.overview.usersByStatus}</h2>
          <MiniBarChart data={userBars} height={170} />
        </div>

        {/* Latest reports preview */}
        <div className={`rounded-3xl border ${themeTokens.cardSurface} p-5 sm:p-6 flex flex-col gap-3`}>
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold">{t.admin.overview.recentReports}</h2>
            <button
              type="button"
              onClick={() => setPage('admin-reports')}
              className="text-xs font-bold text-[#CABA3A] inline-flex items-center gap-1 hover:gap-2 transition-all"
            >
              {t.admin.overview.viewAll}
              <ArrowUpRightIcon className="w-3.5 h-3.5" />
            </button>
          </div>
          {reports.slice(0, 3).map((rep) => (
            <button
              key={rep.id}
              type="button"
              onClick={() => setPage('admin-reports')}
              className={`rounded-2xl border ${themeTokens.subCardSurface} p-3.5 text-left flex items-start gap-3 w-full`}
            >
              <FlagReportIcon className="w-4 h-4 text-[#FF3B30] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <div className="text-sm font-bold truncate">{rep.targetAuthor}</div>
                <div className={`text-xs ${themeTokens.mutedText} truncate`}>{rep.excerpt}</div>
              </div>
            </button>
          ))}
          {reports.length === 0 && (
            <div className={`rounded-2xl border ${themeTokens.subCardSurface} p-6 text-center text-sm font-semibold text-[#5FB032]`}>
              {t.admin.noReports}
            </div>
          )}
          <div className="flex gap-2.5 mt-auto pt-2">
            <button
              type="button"
              onClick={() => setPage('admin-challenges')}
              className={`flex-1 rounded-2xl border ${themeTokens.subCardSurface} p-3 flex items-center gap-2.5 text-left lunglow-btn-spring`}
            >
              <TrophyIcon className="w-5 h-5 text-[#CABA3A] shrink-0" />
              <div className="min-w-0">
                <div className="text-sm font-extrabold tabular-nums">{liveChallenges}</div>
                <div className={`text-[10px] ${themeTokens.mutedText} font-semibold leading-tight`}>{t.admin.overview.activeChallenges}</div>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setPage('admin-requests')}
              className={`flex-1 rounded-2xl border ${themeTokens.subCardSurface} p-3 flex items-center gap-2.5 text-left lunglow-btn-spring`}
            >
              <InboxIcon className="w-5 h-5 text-[#5FB032] shrink-0" />
              <div className="min-w-0">
                <div className="text-sm font-extrabold tabular-nums">{openRequests}</div>
                <div className={`text-[10px] ${themeTokens.mutedText} font-semibold leading-tight`}>{t.admin.overview.openRequests}</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* User management table */}
      <div className={`rounded-3xl sm:rounded-[38px] border ${themeTokens.cardSurface} p-5 sm:p-8 flex flex-col gap-5`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl sm:text-2xl font-bold">{t.admin.tabUsers}</h2>
          <input
            type="text"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            placeholder="Search users…"
            className={`h-10 rounded-full border ${themeTokens.inputSurface} px-4 text-sm w-56 focus:outline-none`}
          />
        </div>

        <div className="flex flex-col gap-3.5">
          {filteredUsers.map((u) => {
            const isActive = u.status === 'active';
            return (
              <div
                key={u.id}
                className={`rounded-2xl sm:rounded-3xl border ${themeTokens.subCardSurface} p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={u.avatar || ASSETS.avatar}
                    alt={u.name}
                    className="w-12 h-12 rounded-full object-cover border border-[#5FB032]/40 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-base sm:text-lg font-bold">{u.name}</span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                          u.role === 'admin' ? 'bg-[#CABA3A]/25 text-[#CABA3A]' : 'bg-[#5FB032]/20 text-[#5FB032]'
                        }`}
                      >
                        {u.role.toUpperCase()}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                          isActive ? 'bg-[#5FB032]/20 text-[#5FB032]' : 'bg-[#FF3B30]/20 text-[#FF3B30]'
                        }`}
                      >
                        {isActive ? t.admin.userStatusActive : t.admin.userStatusSuspended}
                      </span>
                    </div>
                    <div className={`text-xs ${themeTokens.mutedText}`}>
                      {u.email} • Streak: {u.streak} days
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleAdminResetUserAvatar(u.id, u.name)}
                    className={`px-4 py-2 text-xs ${themeTokens.secondaryBtn}`}
                  >
                    {t.admin.resetUserPhotoBtn}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAdminToggleUserStatus(u.id)}
                    className={`rounded-full px-5 py-2 text-xs font-bold transition shadow lunglow-btn-spring ${
                      isActive ? 'bg-[#FF3B30] text-white hover:brightness-110' : 'bg-[#5FB032] text-black hover:brightness-110'
                    }`}
                  >
                    {isActive ? t.admin.suspendBtn : t.admin.activateBtn}
                  </button>
                </div>
              </div>
            );
          })}
          {filteredUsers.length === 0 && (
            <div className={`rounded-2xl border ${themeTokens.subCardSurface} p-8 text-center text-sm ${themeTokens.mutedText}`}>
              No users match "{userQuery}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

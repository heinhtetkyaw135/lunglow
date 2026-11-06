import React from 'react';
import { DownloadIcon, ChartBarIcon, FlameIcon, UsersGroupIcon, FlagReportIcon } from '../../components/common/Icons';
import { CountUp, MiniLineChart, MiniBarChart, DonutChart } from '../../components/common/Charts';
import { useTheme } from '../../hooks/useTheme';
import { useLunglowData } from '../../hooks/useLunglowData';

const SIGNUP_TREND = [42, 55, 48, 63, 71, 66, 84, 79, 92, 105, 98, 121];
const DAILY_ACTIVE = [510, 540, 575, 560, 610, 640, 690, 655, 720, 760, 810, 838];

export function AdminAnalyticsPage() {
  const { t, themeTokens } = useTheme();
  const { blogs, posts, reports, managedUsers, challenges, userRequests, showToast, lang } = useLunglowData();

  const totalRegisteredUsers = 1280 + managedUsers.length;
  const activeUsersCount = 838 + managedUsers.filter((u) => u.status === 'active').length;
  const pendingReportsCount = reports.length;
  const totalPublishedItems = blogs.length + posts.length;
  const liveChallenges = challenges.filter((c) => c.active).length;
  const totalParticipants = challenges.reduce((s, c) => s + c.participants, 0);

  const handleExportCSV = () => {
    const rows = [
      ['Metric', 'Value'],
      ['Total Registered Users', totalRegisteredUsers],
      ['Active Users', activeUsersCount],
      ['Pending Reports', pendingReportsCount],
      ['Published Content', totalPublishedItems],
      ['Live Challenges', liveChallenges],
      ['Challenge Participants', totalParticipants],
      ['Open User Requests', userRequests.filter((r) => r.status !== 'resolved').length],
    ];
    const csv = rows.map((r) => r.join(',')).join('\n');
    downloadBlob(new Blob([csv], { type: 'text/csv' }), 'lunglow-admin-analytics.csv');
  };

  const handleExportJSON = () => {
    const payload = {
      generatedAt: new Date().toISOString(),
      kpi: {
        totalRegisteredUsers,
        activeUsersCount,
        pendingReportsCount,
        totalPublishedItems,
        liveChallenges,
        totalChallengeParticipants: totalParticipants,
      },
      trends: { signupsWeekly: SIGNUP_TREND, dailyActive: DAILY_ACTIVE },
      users: managedUsers,
      reports,
      challenges,
      userRequests,
    };
    downloadBlob(
      new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }),
      'lunglow-admin-analytics.json'
    );
  };

  const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    showToast(lang === 'my' ? `${filename} ဒေါင်းလုဒ်ပြီးပါပြီ!` : `${filename} downloaded!`);
  };

  const healthStats = [
    { label: t.admin.analyticsPage.totalSavedLabel, value: '$12,480', icon: ChartBarIcon, color: '#5FB032' },
    { label: t.admin.analyticsPage.avgStreakLabel, value: '9.6 days', icon: FlameIcon, color: '#CABA3A' },
    { label: t.admin.analyticsPage.retentionLabel, value: '71%', icon: UsersGroupIcon, color: '#7dd3fc' },
    { label: t.admin.analyticsPage.reportRateLabel, value: '0.8%', icon: FlagReportIcon, color: '#FF3B30' },
  ];

  const contentSplit = [
    { value: blogs.length, color: '#CABA3A', label: 'Blogs' },
    { value: posts.length, color: '#5FB032', label: 'Posts' },
    { value: reports.length, color: '#FF3B30', label: 'Flagged' },
  ];

  const weeklyEngagement = [
    { label: 'W1', value: 310 }, { label: 'W2', value: 356 }, { label: 'W3', value: 402 },
    { label: 'W4', value: 388 }, { label: 'W5', value: 445 }, { label: 'W6', value: 471 },
    { label: 'W7', value: 524 }, { label: 'W8', value: 508 }, { label: 'W9', value: 559 },
    { label: 'W10', value: 590 }, { label: 'W11', value: 612 }, { label: 'W12', value: 660 },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-1.5">{t.admin.analyticsPage.title}</h1>
          <p className={`text-xs sm:text-base ${themeTokens.mutedText} max-w-3xl`}>{t.admin.analyticsPage.subtitle}</p>
        </div>
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={handleExportCSV}
            className={`px-5 py-2.5 text-sm inline-flex items-center gap-2 ${themeTokens.primaryBtn}`}
          >
            <DownloadIcon className="w-4 h-4" />
            {t.admin.analyticsPage.exportCsv}
          </button>
          <button
            type="button"
            onClick={handleExportJSON}
            className={`px-5 py-2.5 text-sm inline-flex items-center gap-2 ${themeTokens.secondaryBtn}`}
          >
            <DownloadIcon className="w-4 h-4" />
            {t.admin.analyticsPage.exportJson}
          </button>
        </div>
      </div>

      {/* Health stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {healthStats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className={`rounded-3xl border ${themeTokens.cardSurface} px-5 py-4.5 py-5 flex items-center gap-4 animate-stagger-${i + 1}`}>
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border"
                style={{ backgroundColor: `${s.color}22`, borderColor: `${s.color}55`, color: s.color }}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold" style={{ color: s.color }}>{s.value}</div>
                <div className={`text-xs ${themeTokens.mutedText} font-semibold`}>{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        <div className={`rounded-3xl border ${themeTokens.cardSurface} p-5 sm:p-6`}>
          <h2 className="text-base font-bold mb-4">Daily Active Users</h2>
          <MiniLineChart data={DAILY_ACTIVE} height={150} stroke="#CABA3A" />
          <div className={`mt-3 text-xs ${themeTokens.mutedText} font-semibold`}>
            Peak today: <span className="text-[#CABA3A] font-bold">{Math.max(...DAILY_ACTIVE).toLocaleString()}</span>
          </div>
        </div>

        <div className={`rounded-3xl border ${themeTokens.cardSurface} p-5 sm:p-6`}>
          <h2 className="text-base font-bold mb-4">Weekly Engagement Sessions</h2>
          <MiniBarChart data={weeklyEngagement} height={170} />
        </div>

        <div className={`rounded-3xl border ${themeTokens.cardSurface} p-5 sm:p-6 flex flex-col items-center justify-center gap-3`}>
          <h2 className="text-base font-bold self-start">Content Mix</h2>
          <DonutChart
            segments={contentSplit}
            centerValue={totalPublishedItems}
            centerLabel="items"
          />
          <div className="flex flex-col gap-1.5 w-full">
            {contentSplit.map((s) => (
              <div key={s.label} className="flex items-center gap-2 text-xs font-semibold">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                <span className={themeTokens.mutedText}>{s.label}</span>
                <span className="ml-auto tabular-nums font-bold">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Signups trend + summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        <div className={`rounded-3xl border ${themeTokens.cardSurface} p-5 sm:p-6`}>
          <h2 className="text-base font-bold mb-4">{t.admin.overview.signupTrend}</h2>
          <MiniLineChart data={SIGNUP_TREND} height={140} />
        </div>
        <div className={`rounded-3xl border ${themeTokens.cardSurface} p-5 sm:p-6`}>
          <h2 className="text-base font-bold mb-4">Export Summary</h2>
          <ul className={`text-sm space-y-2.5 ${themeTokens.mutedText}`}>
            {[
              ['Total Registered Users', totalRegisteredUsers.toLocaleString()],
              ['Active Users Today', activeUsersCount.toLocaleString()],
              ['Pending Reports', pendingReportsCount],
              ['Published Blogs & Posts', totalPublishedItems],
              ['Live Challenges', liveChallenges],
              ['Challenge Participants', totalParticipants.toLocaleString()],
            ].map(([label, value]) => (
              <li key={label} className="flex justify-between border-b border-dashed pb-2 last:border-0" style={{ borderColor: 'rgba(128,128,128,0.2)' }}>
                <span>{label}</span>
                <strong className="tabular-nums"><CountUp value={typeof value === 'string' ? Number(value.replace(/,/g, '')) : value} /></strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

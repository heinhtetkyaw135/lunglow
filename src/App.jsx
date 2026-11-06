import React from 'react';
import { ASSETS } from './types';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { LunglowDataProvider } from './context/LunglowDataProvider';
import { useTheme } from './hooks/useTheme';
import { useAuth } from './hooks/useAuth';
import { useLunglowData } from './hooks/useLunglowData';
import { AnimationStyles } from './components/common/AnimationStyles';
import { ToastBanner } from './components/common/ToastBanner';
import { LogoutModal } from './components/common/LogoutModal';
import { ReportModal } from './components/common/ReportModal';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { SetLimitPage } from './pages/SetLimitPage';
import { HomePage } from './pages/Home/HomePage';
import { ExercisesPage } from './pages/Exercises/ExercisesPage';
import { BreathingPage } from './pages/Exercises/BreathingPage';
import { WalkingPage } from './pages/Exercises/WalkingPage';
import { MemoryGamePage } from './pages/Exercises/MemoryGamePage';
import { TicTacToePage } from './pages/Exercises/TicTacToePage';
import { CalendarPage } from './pages/Calendar/CalendarPage';
import { GoalPage } from './pages/Goal/GoalPage';
import { ProfilePage } from './pages/Profile/ProfilePage';
import { CommunityFeedPage } from './pages/Community/CommunityFeedPage';
import { BlogPage } from './pages/Blog/BlogPage';
import { AdminPage } from './pages/Admin/AdminPage';
import { AdminReportsPage } from './pages/Admin/AdminReportsPage';
import { AdminCommunityBlogFeedPage } from './pages/Admin/AdminCommunityBlogFeedPage';
import { AdminBlogPage } from './pages/Admin/AdminBlogPage';
import { AdminAnalyticsPage } from './pages/Admin/AdminAnalyticsPage';
import { AdminChallengesPage } from './pages/Admin/AdminChallengesPage';
import { AdminRequestsPage } from './pages/Admin/AdminRequestsPage';
import { ChallengesPage } from './pages/Challenges/ChallengesPage';
import { RequestsPage } from './pages/Requests/RequestsPage';

const USER_PAGES = [
  'home',
  'exercises',
  'breathing',
  'walking',
  'memory-game',
  'tictactoe-game',
  'calendar',
  'goal',
  'profile',
  'community',
  'blog',
  'challenges',
  'requests',
];

const ADMIN_PAGES = [
  'admin',
  'admin-reports',
  'admin-feed',
  'admin-blog',
  'admin-analytics',
  'admin-challenges',
  'admin-requests',
];

function AppRoutes() {
  const { isLight } = useTheme();
  const { page } = useLunglowData();
  const { adminLoggedIn } = useAuth();

  return (
    <div
      className={`min-h-screen w-full relative overflow-x-hidden transition-colors duration-300 ${
        isLight ? 'text-[#142412]' : 'text-white'
      }`}
      style={{
        fontFamily: "'Inter', 'Noto Sans Myanmar', system-ui, sans-serif",
        backgroundColor: isLight ? '#EAF4E4' : '#0B0B0B',
        backgroundImage: isLight
          ? 'radial-gradient(circle at 85% 12%, rgba(95, 176, 50, 0.24) 0%, rgba(234, 244, 228, 0.92) 60%), linear-gradient(to right, rgba(46, 90, 28, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(46, 90, 28, 0.06) 1px, transparent 1px)'
          : `linear-gradient(180deg, rgba(5, 12, 5, 0.60) 0%, rgba(6, 10, 6, 0.74) 100%), url(${ASSETS.background})`,
        backgroundSize: isLight ? 'cover, 48px 48px, 48px 48px' : 'cover',
        backgroundPosition: 'center top',
        backgroundAttachment: 'fixed',
      }}
    >
      <AnimationStyles />
      <ToastBanner />
      <LogoutModal />
      <ReportModal />

      {page === 'landing' && <LandingPage />}
      {(page === 'register' || page === 'login' || page === 'admin-login') && <AuthPage />}
      {page === 'set-limit' && <SetLimitPage />}

      {ADMIN_PAGES.includes(page) && (
        adminLoggedIn ? (
          <AdminLayout activePage={page}>
            {page === 'admin' && <AdminPage />}
            {page === 'admin-reports' && <AdminReportsPage />}
            {page === 'admin-feed' && <AdminCommunityBlogFeedPage />}
            {page === 'admin-blog' && <AdminBlogPage />}
            {page === 'admin-analytics' && <AdminAnalyticsPage />}
            {page === 'admin-challenges' && <AdminChallengesPage />}
            {page === 'admin-requests' && <AdminRequestsPage />}
          </AdminLayout>
        ) : (
          <AuthPage />
        )
      )}

      {USER_PAGES.includes(page) && (
        <DashboardLayout>
          {page === 'home' && <HomePage />}
          {page === 'exercises' && <ExercisesPage />}
          {page === 'breathing' && <BreathingPage />}
          {page === 'walking' && <WalkingPage />}
          {page === 'memory-game' && <MemoryGamePage />}
          {page === 'tictactoe-game' && <TicTacToePage />}
          {page === 'calendar' && <CalendarPage />}
          {page === 'goal' && <GoalPage />}
          {page === 'profile' && <ProfilePage />}
          {page === 'community' && <CommunityFeedPage />}
          {page === 'blog' && <BlogPage />}
          {page === 'challenges' && <ChallengesPage />}
          {page === 'requests' && <RequestsPage />}
        </DashboardLayout>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LunglowDataProvider>
          <AppRoutes />
        </LunglowDataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

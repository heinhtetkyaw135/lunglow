# Lunglow Website — Clean Architecture (React + Tailwind CSS)

A responsive React + Tailwind CSS web application structured with separated `components/`, `context/`, `data/`, `hooks/`, `libs/`, `pages/`, and `types/` directories.

## Project Structure

```text
src/
├── components/
│   ├── common/
│   │   ├── Icons.jsx
│   │   ├── LimitFormCard.jsx
│   │   ├── LogoutModal.jsx
│   │   └── ToastBanner.jsx
│   ├── home/
│   │   ├── BreathingQuickCard.jsx
│   │   ├── DailyTrackerCard.jsx
│   │   └── WeeklyStatusChart.jsx
│   ├── layout/
│   │   ├── DashboardLayout.jsx
│   │   ├── Sidebar.jsx
│   │   └── TopControls.jsx
│   └── ui/
│       ├── Badge.jsx
│       ├── Button.jsx
│       ├── Card.jsx
│       └── Input.jsx
├── context/
│   ├── AuthContext.jsx
│   ├── auth-context.js
│   ├── LunglowDataProvider.jsx
│   ├── lunglow-data-context.js
│   ├── ThemeContext.jsx
│   └── theme-context.js
├── data/
│   ├── trackerData.js
│   └── translations.js
├── hooks/
│   ├── useAuth.js
│   ├── useExerciseTimer.js
│   ├── useLunglowData.js
│   └── useTheme.js
├── libs/
│   ├── smokingAnalytics.js
│   └── themeUtils.js
├── pages/
│   ├── AuthPage.jsx
│   ├── LandingPage.jsx
│   ├── SetLimitPage.jsx
│   ├── Calendar/
│   │   └── CalendarPage.jsx
│   ├── Community/
│   │   └── CommunityFeedPage.jsx
│   ├── Exercises/
│   │   ├── BreathingPage.jsx
│   │   ├── ExercisesPage.jsx
│   │   └── WalkingPage.jsx
│   ├── Goal/
│   │   └── GoalPage.jsx
│   ├── Home/
│   │   └── HomePage.jsx
│   └── Profile/
│       └── ProfilePage.jsx
├── types/
│   └── index.js
├── App.jsx
├── main.jsx
└── index.css
```

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { LunglowDataContext } from './lunglow-data-context';
import { TODAY_KEY } from '../types';
import { ASSETS } from '../types';
import {
  INITIAL_LOGS_BY_DATE,
  INITIAL_GOALS,
  INITIAL_POSTS,
  INITIAL_HEATMAP,
  INITIAL_REMINDERS,
  INITIAL_BLOGS,
  INITIAL_MANAGED_USERS,
  INITIAL_REPORTS,
  INITIAL_CHALLENGES,
  INITIAL_USER_REQUESTS,
} from '../data/trackerData';
import {
  calculateMetrics,
  calculateWeekBars,
  calculateCalendarMonth,
} from '../libs/smokingAnalytics';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { useExerciseTimer } from '../hooks/useExerciseTimer';

export function LunglowDataProvider({ children }) {
  const { lang, t, weekdaysList, timeBlocksList } = useTheme();
  const { userName, setUserName, userAvatar, setUserAvatar, tempName, setIsEditingProfile, role, isAdmin } = useAuth();

  const [page, setPageState] = useState(() => {
    if (typeof window === 'undefined') return 'landing';
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    if (path === '/user/register') return 'register';
    if (path === '/user/login') return 'login';
    if (path === '/user/set-limit') return 'set-limit';
    if (path === '/admin/login') return 'admin-login';
    if (path.startsWith('/admin/')) {
      const slug = path.slice('/admin/'.length);
      return !slug || slug === 'overview' ? 'admin' : `admin-${slug}`;
    }
    if (path === '/user/home' || path === '/home') return 'home';
    if (path.startsWith('/user/')) return path.slice('/user/'.length) || 'home';
    return 'landing';
  });

  const ADMIN_PAGE_IDS = ['admin', 'admin-reports', 'admin-blog', 'admin-analytics', 'admin-challenges', 'admin-requests'];

  const pagePath = useCallback((nextPage) => {
    const routes = {
      landing: '/',
      register: '/user/register',
      login: '/user/login',
      'set-limit': '/user/set-limit',
      home: '/user/home',
      admin: '/admin/overview',
      'admin-login': '/admin/login',
    };
    if (nextPage in routes) return routes[nextPage];
    if (nextPage.startsWith('admin-')) return `/admin/${nextPage.slice('admin-'.length)}`;
    if (['exercises', 'breathing', 'walking', 'memory-game', 'tictactoe-game', 'calendar', 'goal', 'profile', 'community', 'blog', 'challenges', 'requests'].includes(nextPage)) {
      return `/user/${nextPage}`;
    }
    return `/${nextPage}`;
  }, []);

  const setPage = useCallback((nextPage) => {
    setPageState(nextPage);
    if (typeof window !== 'undefined') {
      const nextPath = pagePath(nextPage);
      if (window.location.pathname !== nextPath) {
        window.history.pushState({ page: nextPage }, '', nextPath);
      }
    }
  }, [pagePath]);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/\/$/, '') || '/';
      if (path === '/user/register') setPageState('register');
      else if (path === '/user/login') setPageState('login');
      else if (path === '/user/set-limit') setPageState('set-limit');
      else if (path === '/admin/login') setPageState('admin-login');
      else if (path.startsWith('/admin/')) {
        const slug = path.slice('/admin/'.length);
        setPageState(!slug || slug === 'overview' ? 'admin' : `admin-${slug}`);
      }
      else if (path.startsWith('/user/')) setPageState(path.slice('/user/'.length) || 'home');
      else setPageState('landing');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [toastMessage, setToastMessage] = useState('');
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  }, []);

  const [dailyLimit, setDailyLimit] = useState(20);
  const [cigPrice, setCigPrice] = useState(0.5);
  const [limitFormCigs, setLimitFormCigs] = useState(20);
  const [limitFormPrice, setLimitFormPrice] = useState(0.5);

  const [logsByDate, setLogsByDate] = useState(INITIAL_LOGS_BY_DATE);
  const smokedToday = logsByDate[TODAY_KEY] ?? 0;

  const setSmokedToday = useCallback((updater) => {
    setLogsByDate((prev) => {
      const currentVal = prev[TODAY_KEY] ?? 0;
      const nextVal = Math.max(0, typeof updater === 'function' ? updater(currentVal) : updater);
      return { ...prev, [TODAY_KEY]: nextVal };
    });
  }, []);

  // Feature 2: Trigger & Mood Tagging state
  const [selectedTrigger, setSelectedTrigger] = useState('stress');
  const [resistedCount, setResistedCount] = useState(14);

  const handleResistTrigger = () => {
    setResistedCount((prev) => prev + 1);
    showToast(
      lang === 'my'
        ? 'ဂုဏ်ယူပါသည်! ဆေးလိပ်သောက်ချင်စိတ်ကို အောင်မြင်စွာ ထိန်းချုပ်နိုင်ခဲ့ပါသည် (+1)'
        : 'Great job! Logged +1 resisted craving.'
    );
  };

  // Feature 3: Peak Craving Heatmap state
  const [heatmapData, setHeatmapData] = useState(INITIAL_HEATMAP);

  const handleToggleHeatmapCell = (dayIdx, slotIdx) => {
    const key = `${dayIdx}-${slotIdx}`;
    setHeatmapData((prev) => ({
      ...prev,
      [key]: ((prev[key] ?? 0) + 1) % 3,
    }));
  };

  const handleLogCravingNow = () => {
    const key = '5-2'; // Friday 12-3 PM
    setHeatmapData((prev) => ({
      ...prev,
      [key]: 2,
    }));
    showToast(
      lang === 'my'
        ? 'လက်ရှိအချိန်အတွက် သောက်ချင်စိတ်ပြင်းထန်မှုကို ဇယားတွင် မှတ်သားပြီးပါပြီ!'
        : 'Logged current craving intensity to your heatmap!'
    );
  };

  const peakWindowLabel = useMemo(() => {
    const slotScores = [0, 0, 0, 0, 0, 0];
    for (let d = 0; d < 7; d++) {
      for (let s = 0; s < 6; s++) {
        slotScores[s] += heatmapData[`${d}-${s}`] ?? 0;
      }
    }
    let maxIdx = 2;
    for (let s = 0; s < 6; s++) {
      if (slotScores[s] > slotScores[maxIdx]) maxIdx = s;
    }
    return timeBlocksList[maxIdx] || '12–3 PM';
  }, [heatmapData, timeBlocksList]);

  // Feature 4: Daily Check-In & Push Reminders state
  const [selectedMood, setSelectedMood] = useState('strong');
  const [checkedInToday, setCheckedInToday] = useState(false);
  const [reminders, setReminders] = useState(INITIAL_REMINDERS);

  const handleCompleteCheckIn = () => {
    setCheckedInToday(true);
    showToast(
      lang === 'my'
        ? 'ယနေ့အတွက် နေ့စဉ် Check-In ကတိကဝတ်ပြုခြင်း အောင်မြင်ပါသည်!'
        : 'Daily Check-In completed! Stay strong today.'
    );
  };

  const handleToggleReminder = (id) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const handleUpdateReminderTime = (id, newTime) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, time: newTime } : r))
    );
  };

  const handleTestPushReminder = () => {
    showToast(t.checkIn.pushToast);
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (window.Notification.permission === 'granted') {
        new window.Notification('Lunglow', { body: t.checkIn.pushToast });
      } else if (window.Notification.permission !== 'denied') {
        window.Notification.requestPermission().then((perm) => {
          if (perm === 'granted') {
            new window.Notification('Lunglow', { body: t.checkIn.pushToast });
          }
        });
      }
    }
  };

  // Exercise timers
  const breathingTimer = useExerciseTimer(
    180,
    useCallback(() => {
      showToast(
        lang === 'my'
          ? '၃ မိနစ် အသက်ရှူလေ့ကျင့်ခန်း ပြီးဆုံးပါပြီ!'
          : '3-Minute Breathing Exercise completed!'
      );
    }, [lang, showToast])
  );

  const walkingTimer = useExerciseTimer(
    300,
    useCallback(() => {
      showToast(
        lang === 'my'
          ? '၅ မိနစ် လမ်းလျှောက်လေ့ကျင့်ခန်း ပြီးဆုံးပါပြီ!'
          : '5-Minute Walking Exercise completed!'
      );
    }, [lang, showToast])
  );

  const getBreathingPhase = () => {
    if (!breathingTimer.isActive) return t.exercises.inhale;
    const cycle = (180 - breathingTimer.seconds) % 12;
    if (cycle < 4) return t.exercises.inhale;
    if (cycle < 7) return t.exercises.hold;
    return t.exercises.exhale;
  };

  const isInhalePhase = !breathingTimer.isActive || (180 - breathingTimer.seconds) % 12 < 4;

  const [selectedMonthIdx, setSelectedMonthIdx] = useState(9);
  const [selectedYear, setSelectedYear] = useState('2026');
  const [calendarFilter, setCalendarFilter] = useState(null);

  const [goals, setGoals] = useState(INITIAL_GOALS);
  const [newGoalTitle, setNewGoalTitle] = useState('laptop');
  const [newGoalPrice, setNewGoalPrice] = useState(2000);

  const [profileTab, setProfileTab] = useState('progress');
  const [feedFilter, setFeedFilter] = useState('All');
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [blogs, setBlogs] = useState(INITIAL_BLOGS);
  const [managedUsers, setManagedUsers] = useState(INITIAL_MANAGED_USERS);
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [reportModalTarget, setReportModalTarget] = useState(null);

  // Admin-provided Challenges (shared between admin dashboard & user site)
  const [challenges, setChallenges] = useState(INITIAL_CHALLENGES);

  const handleAdminAddChallenge = ({ title, description, reward, days, cover }) => {
    const newChallenge = {
      id: `ch-${Date.now()}`,
      title: title.trim() || 'New Challenge',
      description: description.trim() || 'Complete this challenge to earn your reward.',
      reward: reward.trim() || 'Exclusive Badge',
      days: Math.max(1, Number(days) || 7),
      participants: 0,
      active: true,
      joined: false,
      progress: 0,
      emoji: '🎯',
      cover: cover || null,
    };
    setChallenges((prev) => [newChallenge, ...prev]);
    showToast(lang === 'my' ? 'စိန်ခေါ်မှုအသစ် ထုတ်ပြန်ပြီးပါပြီ!' : 'New challenge is now live for all users!');
  };

  const handleAdminToggleChallenge = (challengeId) => {
    setChallenges((prev) =>
      prev.map((c) => (c.id === challengeId ? { ...c, active: !c.active } : c))
    );
  };

  const handleAdminDeleteChallenge = (challengeId) => {
    setChallenges((prev) => prev.filter((c) => c.id !== challengeId));
    showToast(lang === 'my' ? 'စိန်ခေါ်မှု ဖျက်ပြီးပါပြီ' : 'Challenge removed');
  };

  const handleJoinChallenge = (challengeId) => {
    setChallenges((prev) =>
      prev.map((c) =>
        c.id === challengeId
          ? {
              ...c,
              joined: !c.joined,
              participants: Math.max(0, c.participants + (c.joined ? -1 : 1)),
              progress: c.joined ? 0 : c.progress,
            }
          : c
      )
    );
    const target = challenges.find((c) => c.id === challengeId);
    if (target && !target.joined) {
      showToast(lang === 'my' ? 'စိန်ခေါ်မှုတွင် ပါဝင်ပြီးပါပြီ! ကံကောင်းပါစေ!' : 'Joined the challenge — good luck!');
    }
  };

  const handleChallengeLogDay = (challengeId) => {
    setChallenges((prev) =>
      prev.map((c) => {
        if (c.id !== challengeId || !c.joined) return c;
        const nextProgress = Math.min(c.days, c.progress + 1);
        if (nextProgress === c.days && c.progress < c.days) {
          setTimeout(() => {
            handleResistTrigger();
            showToast(lang === 'my' ? `စိန်ခေါ်မှု ပြီးမြောက်ပါပြီ - "${c.title}"! ${c.reward} ရရှိပါပြီ!` : `Challenge complete — "${c.title}"! You earned the ${c.reward}!`);
          }, 0);
        }
        return { ...c, progress: nextProgress };
      })
    );
  };

  // User Requests inbox (user submits → admin reviews)
  const [userRequests, setUserRequests] = useState(INITIAL_USER_REQUESTS);

  const handleSubmitUserRequest = ({ category, subject, message }) => {
    const newReq = {
      id: `req-${Date.now()}`,
      user: userName,
      userId: 'u-1',
      avatar: userAvatar,
      category,
      subject: subject.trim(),
      message: message.trim(),
      status: 'pending',
      createdAt: 'Just now',
    };
    setUserRequests((prev) => [newReq, ...prev]);
    showToast(
      lang === 'my'
        ? 'သင့်တောင်းဆိုချက်ကို Admin ထံ ပေးပို့ပြီးပါပြီ!'
        : 'Your request was sent to the Admin team!'
    );
  };

  const handleAdminUpdateRequestStatus = (requestId, nextStatus) => {
    setUserRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status: nextStatus } : r))
    );
    showToast(
      lang === 'my'
        ? 'တောင်းဆိုချက် အခြေအနေ မွမ်းမံးပြီးပါပြီ'
        : `Request marked as ${nextStatus}`
    );
  };

  const handleAdminDeleteRequest = (requestId) => {
    setUserRequests((prev) => prev.filter((r) => r.id !== requestId));
    showToast(lang === 'my' ? 'တောင်းဆိုချက် ဖျက်ပြီးပါပြီ' : 'Request removed');
  };

  // Global broadcast banner (admin publishes → user dashboard shows it)
  const [broadcast, setBroadcast] = useState(null); // { message, publishedAt }

  const handlePublishBroadcast = (message) => {
    if (!message.trim()) return;
    setBroadcast({ message: message.trim(), publishedAt: 'Just now' });
    showToast(lang === 'my' ? 'ကြေညာချက်ကို သုံးစွဲသူအားလုံးထံ ပေးပို့ပြီးပါပြီ!' : 'Broadcast pushed to all user dashboards!');
  };

  const handleClearBroadcast = () => {
    setBroadcast(null);
    showToast(lang === 'my' ? 'ကြေညာချက် ရပ်တန့်ပြီးပါပြီ' : 'Broadcast cleared');
  };

  // Open Report Modal for blog, post, comment, or profile-image
  const handleOpenReportModal = (targetObj) => {
    setReportModalTarget(targetObj);
  };

  const handleCloseReportModal = () => {
    setReportModalTarget(null);
  };

  const handleSubmitReport = (reason, note = '') => {
    if (!reportModalTarget) return;
    const newReport = {
      id: `rep-${Date.now()}`,
      targetType: reportModalTarget.targetType,
      targetId: reportModalTarget.targetId,
      parentId: reportModalTarget.parentId || null,
      targetAuthor: reportModalTarget.targetAuthor || 'Community User',
      reason: note ? `${reason} (${note})` : reason,
      excerpt: reportModalTarget.excerpt || '',
      reportedBy: userName,
      createdAt: 'Just now',
    };
    setReports((prev) => [newReport, ...prev]);
    setReportModalTarget(null);
    showToast(t.reportModal.submittedToast);
  };

  // Blog Actions (Create, Like, Delete, Comment)
  const handleCreateBlog = ({ title, category, content, image }) => {
    const newBlog = {
      id: `blog-${Date.now()}`,
      title: title.trim() || 'Untitled Lunglow Article',
      category: category || 'Tips & Tricks',
      author: isAdmin ? `${userName} (Admin)` : userName,
      authorRole: isAdmin ? 'admin' : 'member',
      authorAvatar: userAvatar,
      createdAt: 'Oct 18, 2026',
      image: image || null,
      content: content.trim(),
      likes: 1,
      userLiked: true,
      comments: [],
    };
    setBlogs((prev) => [newBlog, ...prev]);
    showToast(
      lang === 'my'
        ? 'ဘလော့ဂ်ဆောင်းပါးအသစ် တင်ပြီးပါပြီ!'
        : 'Published new blog article!'
    );
  };

  const handleToggleBlogLike = (blogId) => {
    setBlogs((prev) =>
      prev.map((b) => {
        if (b.id !== blogId) return b;
        const nextLiked = !b.userLiked;
        return {
          ...b,
          userLiked: nextLiked,
          likes: Math.max(0, b.likes + (nextLiked ? 1 : -1)),
        };
      })
    );
  };

  const handleDeleteBlog = (blogId) => {
    setBlogs((prev) => prev.filter((b) => b.id !== blogId));
    setReports((prev) => prev.filter((r) => !(r.targetType === 'blog' && r.targetId === blogId)));
    showToast(lang === 'my' ? 'ဘလော့ဂ်ကို ဖျက်ပြီးပါပြီ' : 'Blog article deleted');
  };

  const handleAddBlogComment = (blogId, text) => {
    if (!text.trim()) return;
    const newCom = {
      id: `bcom-${Date.now()}`,
      author: userName,
      authorAvatar: userAvatar,
      text: text.trim(),
      createdAt: 'Just now',
    };
    setBlogs((prev) =>
      prev.map((b) =>
        b.id === blogId ? { ...b, comments: [...(b.comments || []), newCom] } : b
      )
    );
  };

  const handleDeleteBlogComment = (blogId, commentId) => {
    setBlogs((prev) =>
      prev.map((b) =>
        b.id === blogId
          ? { ...b, comments: (b.comments || []).filter((c) => c.id !== commentId) }
          : b
      )
    );
    setReports((prev) =>
      prev.filter((r) => !(r.targetType === 'comment' && r.targetId === commentId))
    );
    showToast(lang === 'my' ? 'မှတ်ချက်ကို ဖျက်ပြီးပါပြီ' : 'Comment deleted');
  };

  // Community Feed Tip Post & Comment Actions
  const handleCreateTipPost = ({ title, tipCategory, content, image }) => {
    const newPost = {
      id: `post-tip-${Date.now()}`,
      postType: 'tip',
      author: userName,
      authorId: 'u-1',
      authorAvatar: userAvatar,
      isYou: true,
      tipCategory: tipCategory || 'Tips & Tricks',
      title: title.trim() || 'Smoke-Free Tip',
      content: content.trim(),
      image: image || null,
      reactions: { fire: 1, clap: 0, heart: 0 },
      userReacted: { fire: true },
      comments: [],
    };
    setPosts((prev) => [newPost, ...prev]);
    showToast(
      lang === 'my'
        ? 'အကြံပြုချက်ပို့စ်အသစ် တင်ပြီးပါပြီ!'
        : 'Shared your tip post to Community Feed!'
    );
  };

  const handleAddPostComment = (postId, text) => {
    if (!text.trim()) return;
    const newCom = {
      id: `pcom-${Date.now()}`,
      author: userName,
      authorAvatar: userAvatar,
      text: text.trim(),
      createdAt: 'Just now',
    };
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, comments: [...(p.comments || []), newCom] } : p
      )
    );
  };

  const handleDeletePostComment = (postId, commentId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, comments: (p.comments || []).filter((c) => c.id !== commentId) }
          : p
      )
    );
    setReports((prev) =>
      prev.filter((r) => !(r.targetType === 'comment' && r.targetId === commentId))
    );
    showToast(lang === 'my' ? 'မှတ်ချက်ကို ဖျက်ပြီးပါပြီ' : 'Comment deleted');
  };

  // Admin Moderation & User Management Actions
  const handleAdminResolveReport = (report, action = 'delete') => {
    if (action === 'delete') {
      if (report.targetType === 'blog') {
        setBlogs((prev) => prev.filter((b) => b.id !== report.targetId));
      } else if (report.targetType === 'post') {
        setPosts((prev) => prev.filter((p) => p.id !== report.targetId));
      } else if (report.targetType === 'comment') {
        setBlogs((prev) =>
          prev.map((b) => ({
            ...b,
            comments: (b.comments || []).filter((c) => c.id !== report.targetId),
          }))
        );
        setPosts((prev) =>
          prev.map((p) => ({
            ...p,
            comments: (p.comments || []).filter((c) => c.id !== report.targetId),
          }))
        );
      } else if (report.targetType === 'profile-image') {
        setManagedUsers((prev) =>
          prev.map((u) =>
            u.id === report.targetId || u.name === report.targetAuthor
              ? { ...u, avatar: ASSETS.avatar }
              : u
          )
        );
        if (report.targetAuthor === userName) {
          setUserAvatar(ASSETS.avatar);
        }
      }
      showToast(
        lang === 'my'
          ? 'တိုင်ကြားထားသော အကြောင်းအရာ/ပုံကို Admin မှ ဖျက်သိမ်းပြီးပါပြီ!'
          : 'Admin action completed: Reported item removed!'
      );
    } else {
      showToast(
        lang === 'my'
          ? 'တိုင်ကြားချက်ကို ပယ်ဖျက်ပြီးပါပြီ'
          : 'Report dismissed by Admin.'
      );
    }
    setReports((prev) => prev.filter((r) => r.id !== report.id));
  };

  const handleAdminToggleUserStatus = (userId) => {
    setManagedUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' }
          : u
      )
    );
    showToast(lang === 'my' ? 'အသုံးပြုသူ အခြေအနေ ပြောင်းလဲပြီးပါပြီ' : 'Updated user account status');
  };

  const handleAdminResetUserAvatar = (userId, targetName) => {
    setManagedUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, avatar: ASSETS.avatar } : u))
    );
    if (targetName === userName) {
      setUserAvatar(ASSETS.avatar);
    }
    setReports((prev) =>
      prev.filter((r) => !(r.targetType === 'profile-image' && r.targetId === userId))
    );
    showToast(lang === 'my' ? 'ပရိုဖိုင်ပုံကို မူလပုံသို့ ပြန်ပြောင်းပြီးပါပြီ' : 'Reset user profile image to default');
  };

  const metrics = useMemo(() => {
    const base = calculateMetrics(logsByDate, dailyLimit, cigPrice, smokedToday);
    return {
      ...base,
      currentStreak: base.currentStreak + (checkedInToday ? 1 : 0),
    };
  }, [logsByDate, dailyLimit, cigPrice, smokedToday, checkedInToday]);

  const currentWeekBars = useMemo(
    () => calculateWeekBars(logsByDate, dailyLimit, weekdaysList),
    [logsByDate, dailyLimit, weekdaysList]
  );

  const calendarData = useMemo(
    () => calculateCalendarMonth(selectedYear, selectedMonthIdx, logsByDate, dailyLimit),
    [selectedYear, selectedMonthIdx, logsByDate, dailyLimit]
  );

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setUserAvatar(reader.result);
        showToast(lang === 'my' ? 'ပရိုဖိုင်ပုံ ပြောင်းလဲပြီးပါပြီ!' : 'Profile photo updated!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfileName = (e) => {
    e.preventDefault();
    const cleaned = tempName.trim() || 'Hein Htet Kyaw';
    setUserName(cleaned);
    setPosts((prev) => prev.map((p) => (p.isYou ? { ...p, author: cleaned } : p)));
    setIsEditingProfile(false);
    showToast(lang === 'my' ? 'ပရိုဖိုင်အမည် ပြောင်းလဲပြီးပါပြီ!' : 'Profile updated!');
  };

  const handleSaveLimit = (isOnboarding = false) => {
    const newLimit = Math.max(1, Number(limitFormCigs) || 20);
    const newPrice = Math.max(0.05, Number(limitFormPrice) || 0.5);
    setDailyLimit(newLimit);
    setCigPrice(newPrice);
    showToast(
      lang === 'my'
        ? `သိမ်းဆည်းပြီးပါပြီ - တစ်နေ့ ${newLimit} လိပ် ($${newPrice}/လိပ်)`
        : `Saved: Limit ${newLimit} cigs/day at $${newPrice}/cig`
    );
    if (isOnboarding) {
      setPage('home');
    }
  };

  const handleAddGoal = (e) => {
    e.preventDefault();
    const title = newGoalTitle.trim() || 'New Goal';
    const price = Math.max(1, Number(newGoalPrice) || 100);
    setGoals((prev) => [...prev, { id: Date.now(), title, price }]);
    setNewGoalTitle('');
    setNewGoalPrice(500);
    showToast(
      lang === 'my'
        ? `ပန်းတိုင်အသစ် ထည့်သွင်းပြီးပါပြီ - ${title} (${price}$)`
        : `Added goal: ${title} (${price}$)`
    );
  };

  const handleDeleteGoal = (goalId) => {
    setGoals((prev) => prev.filter((item) => item.id !== goalId));
  };

  const handleShareProgressCard = () => {
    const tabMap = {
      progress: {
        badgeKey: 'progress',
        stats: [
          { value: `${metrics.longestStreak} ${t.profile.daysUnit}`, labelKey: 'longestStreak' },
          { value: `${metrics.currentStreak} ${t.profile.daysUnit}`, labelKey: 'currentStreak' },
          { value: `${metrics.cleanDaysThisMonth} ${t.profile.daysUnit}`, labelKey: 'cleanDaysMonth' },
        ],
      },
      vault: {
        badgeKey: 'vault',
        stats: [
          { value: `${metrics.totalSavedMoney} $`, labelKey: 'totalSavedMoney' },
          { value: `${metrics.totalAvoidedCigarettes}`, labelKey: 'avoidedCigs' },
          { value: `${metrics.totalReducedAndCleanDays} ${t.profile.daysUnit}`, labelKey: 'totalReducedCleanDays' },
        ],
      },
      'clean-weeks': {
        badgeKey: 'clean-weeks',
        stats: [
          { value: `${metrics.totalCleanWeeks}`, labelKey: 'totalCleanWeeks' },
          { value: `${metrics.slipsRecorded}`, labelKey: 'slipRecorded' },
          { value: `${metrics.capAdherence} %`, labelKey: 'capAdherence' },
        ],
      },
    };
    const chosen = tabMap[profileTab];
    const newPost = {
      id: `post-${Date.now()}`,
      author: userName,
      isYou: true,
      badgeKey: chosen.badgeKey,
      stats: chosen.stats,
      reactions: { fire: 1, clap: 0, heart: 0 },
      userReacted: { fire: true },
    };
    setPosts((prev) => [newPost, ...prev]);
    showToast(lang === 'my' ? 'အသိုင်းအဝိုင်းသို့ မျှဝေပြီးပါပြီ!' : 'Shared to Community Feed!');
    setPage('community');
  };

  // Feature 5: Share Milestone Card to Community Feed or Download as PNG
  const handleShareMilestoneCard = (milestoneItem) => {
    const newPost = {
      id: `post-${Date.now()}`,
      author: userName,
      isYou: true,
      badgeCustom: milestoneItem.badge,
      stats: [
        { value: milestoneItem.statValue, label: milestoneItem.title },
        { value: `${metrics.currentStreak} ${t.profile.daysUnit}`, labelKey: 'currentStreak' },
        { value: `${metrics.totalSavedMoney} $`, labelKey: 'totalSavedMoney' },
      ],
      reactions: { fire: 1, clap: 1, heart: 1 },
      userReacted: { fire: true },
    };
    setPosts((prev) => [newPost, ...prev]);
    showToast(lang === 'my' ? 'အောင်မြင်မှုမှတ်တိုင်ကို မျှဝေပြီးပါပြီ!' : 'Shared Milestone Card to Community Feed!');
    setPage('community');
  };

  const handleDownloadMilestonePng = (milestoneItem) => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 560;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Dark Lunglow background with emerald glow
      const grad = ctx.createLinearGradient(0, 0, 1080, 560);
      grad.addColorStop(0, '#0B130A');
      grad.addColorStop(1, '#142611');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1080, 560);

      // Subtle border
      ctx.strokeStyle = '#5FB032';
      ctx.lineWidth = 4;
      ctx.strokeRect(24, 24, 1032, 512);

      // Brand header
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 42px Inter, sans-serif';
      ctx.fillText('Lunglow', 70, 95);

      ctx.fillStyle = '#CABA3A';
      ctx.font = 'bold 26px Inter, sans-serif';
      ctx.fillText(milestoneItem.badge.toUpperCase(), 70, 165);

      // Stat value & title
      ctx.fillStyle = '#5FB032';
      ctx.font = 'bold 86px Inter, sans-serif';
      ctx.fillText(milestoneItem.statValue, 70, 275);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 40px Inter, sans-serif';
      ctx.fillText(milestoneItem.title, 70, 345);

      ctx.fillStyle = '#CCCCCC';
      ctx.font = '24px Inter, sans-serif';
      ctx.fillText(milestoneItem.desc, 70, 400);

      ctx.fillStyle = '#CABA3A';
      ctx.font = '24px Inter, sans-serif';
      ctx.fillText(`Achieved by ${userName} • Every Clean Day Makes Your Lung Glow`, 70, 480);

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `lunglow-milestone-${milestoneItem.id}.png`;
      link.href = dataUrl;
      link.click();
      showToast(lang === 'my' ? 'မှတ်တိုင်ပုံကို ဒေါင်းလုဒ်ရယူပြီးပါပြီ!' : 'Milestone badge PNG downloaded!');
    } catch {
      showToast('Milestone badge ready!');
    }
  };

  const handleReaction = (postId, type) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        const already = !!post.userReacted[type];
        return {
          ...post,
          reactions: {
            ...post.reactions,
            [type]: Math.max(0, post.reactions[type] + (already ? -1 : 1)),
          },
          userReacted: {
            ...post.userReacted,
            [type]: !already,
          },
        };
      })
    );
  };

  const handleDeletePost = (postId) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    showToast(lang === 'my' ? 'ပို့စ်ကို ဖျက်ပြီးပါပြီ' : 'Post deleted from Community Feed');
  };

  return (
    <LunglowDataContext.Provider
      value={{
        page,
        setPage,
        toastMessage,
        showToast,
        logoutModalOpen,
        setLogoutModalOpen,
        dailyLimit,
        cigPrice,
        limitFormCigs,
        setLimitFormCigs,
        limitFormPrice,
        setLimitFormPrice,
        handleSaveLimit,
        smokedToday,
        setSmokedToday,
        selectedTrigger,
        setSelectedTrigger,
        resistedCount,
        handleResistTrigger,
        heatmapData,
        handleToggleHeatmapCell,
        handleLogCravingNow,
        peakWindowLabel,
        selectedMood,
        setSelectedMood,
        checkedInToday,
        handleCompleteCheckIn,
        reminders,
        handleToggleReminder,
        handleUpdateReminderTime,
        handleTestPushReminder,
        breathingTimer,
        walkingTimer,
        getBreathingPhase,
        isInhalePhase,
        selectedMonthIdx,
        setSelectedMonthIdx,
        selectedYear,
        setSelectedYear,
        calendarFilter,
        setCalendarFilter,
        goals,
        newGoalTitle,
        setNewGoalTitle,
        newGoalPrice,
        setNewGoalPrice,
        handleAddGoal,
        handleDeleteGoal,
        profileTab,
        setProfileTab,
        handleShareProgressCard,
        handleShareMilestoneCard,
        handleDownloadMilestonePng,
        feedFilter,
        setFeedFilter,
        posts,
        handleReaction,
        handleDeletePost,
        blogs,
        handleCreateBlog,
        handleToggleBlogLike,
        handleDeleteBlog,
        handleAddBlogComment,
        handleDeleteBlogComment,
        handleCreateTipPost,
        handleAddPostComment,
        handleDeletePostComment,
        reports,
        reportModalTarget,
        handleOpenReportModal,
        handleCloseReportModal,
        handleSubmitReport,
        managedUsers,
        handleAdminResolveReport,
        handleAdminToggleUserStatus,
        handleAdminResetUserAvatar,
        challenges,
        handleAdminAddChallenge,
        handleAdminToggleChallenge,
        handleAdminDeleteChallenge,
        handleJoinChallenge,
        handleChallengeLogDay,
        userRequests,
        handleSubmitUserRequest,
        handleAdminUpdateRequestStatus,
        handleAdminDeleteRequest,
        broadcast,
        handlePublishBroadcast,
        handleClearBroadcast,
        handlePhotoUpload,
        handleSaveProfileName,
        metrics,
        currentWeekBars,
        calendarData,
      }}
    >
      {children}
    </LunglowDataContext.Provider>
  );
}

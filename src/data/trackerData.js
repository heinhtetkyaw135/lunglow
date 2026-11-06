const STORAGE_KEY = 'lunglow-tracker-data-v1';

export const INITIAL_LOGS_BY_DATE = {
  '2026-10-01': 0,
  '2026-10-02': 0,
  '2026-10-03': 0,
  '2026-10-04': 12,
  '2026-10-05': 25,
  '2026-10-06': 24,
  '2026-10-07': 14,
  '2026-10-08': 10,
  '2026-10-09': 0,
  '2026-10-10': 0,
  '2026-10-11': 0,
  '2026-10-12': 12,
  '2026-10-13': 25,
  '2026-10-14': null,
  '2026-10-15': 0,
  '2026-10-16': 10,
  '2026-09-01': 0,
  '2026-09-02': 0,
  '2026-09-03': 10,
  '2026-09-04': 12,
  '2026-09-05': 24,
  '2026-09-06': 0,
  '2026-09-07': null,
  '2026-09-08': 8,
  '2026-09-09': 0,
  '2026-09-10': 0,
  '2025-10-01': 0,
  '2025-10-02': 12,
  '2025-10-03': 22,
  '2025-10-04': 0,
};

export const INITIAL_GOALS = [
  { id: 1, title: 'Noise-canceling headphones', price: 300 },
];

export const INITIAL_POSTS = [
  {
    id: 'post-tip-1',
    postType: 'tip',
    author: 'Su Myat Noe',
    authorId: 'u-4',
    authorAvatar: '/assets/avatar.png',
    isYou: false,
    tipCategory: 'Tips & Tricks',
    title: 'Cinnamon Stick + Cold Water Trick for Evening Cravings',
    content:
      'Whenever I get a strong urge after dinner, I sip ice water and hold a small cinnamon stick like a cigarette. It satisfies both the hand-to-mouth habit and the flavor craving without nicotine!',
    image: null,
    reactions: { fire: 8, clap: 12, heart: 19 },
    userReacted: {},
    comments: [
      {
        id: 'pcom-1',
        author: 'Hein Htet Kyaw',
        authorAvatar: '/assets/avatar.png',
        text: 'Going to try this tonight after dinner, thank you!',
        createdAt: '1h ago',
      },
    ],
  },
  {
    id: 'post-1',
    postType: 'progress',
    author: 'Hein Htet Kyaw',
    authorId: 'u-1',
    authorAvatar: '/assets/avatar.png',
    isYou: true,
    badgeKey: 'clean-weeks',
    stats: [
      { value: '12', labelKey: 'totalCleanWeeks' },
      { value: '0', labelKey: 'slipRecorded' },
      { value: '100 %', labelKey: 'capAdherence' },
    ],
    reactions: { fire: 1, clap: 5, heart: 10 },
    userReacted: {},
    comments: [
      {
        id: 'pcom-2',
        author: 'Kyaw Swar',
        authorAvatar: '/assets/avatar.png',
        text: '12 clean weeks with 0 slips is inspiring! Keep glowing!',
        createdAt: '3h ago',
      },
    ],
  },
  {
    id: 'post-2',
    postType: 'progress',
    author: 'Kyaw Swar',
    authorId: 'u-3',
    authorAvatar: '/assets/avatar.png',
    isYou: false,
    badgeKey: 'vault',
    stats: [
      { value: '300 $', labelKey: 'totalSavedMoney' },
      { value: '500', labelKey: 'avoidedCigs' },
      { value: '120 days', labelKey: 'totalReducedCleanDays' },
    ],
    reactions: { fire: 1, clap: 5, heart: 10 },
    userReacted: {},
    comments: [],
  },
];

export function loadTrackerStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function persistTrackerStorage(payload) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore storage quota errors in sandboxed environments
  }
}

export const INITIAL_HEATMAP = {
  // 7 days (0=Sun..6=Sat) x 6 time blocks (0..5), values: 0 (Low/Clean), 1 (Moderate), 2 (Peak Craving)
  '0-0': 0, '0-1': 1, '0-2': 1, '0-3': 0, '0-4': 1, '0-5': 0,
  '1-0': 1, '1-1': 1, '1-2': 2, '1-3': 1, '1-4': 1, '1-5': 0,
  '2-0': 1, '2-1': 2, '2-2': 2, '2-3': 2, '2-4': 1, '2-5': 1,
  '3-0': 0, '3-1': 1, '3-2': 2, '3-3': 1, '3-4': 0, '3-5': 0,
  '4-0': 0, '4-1': 1, '4-2': 1, '4-3': 1, '4-4': 0, '4-5': 0,
  '5-0': 1, '5-1': 1, '5-2': 2, '5-3': 1, '5-4': 2, '5-5': 0,
  '6-0': 0, '6-1': 0, '6-2': 1, '6-3': 1, '6-4': 1, '6-5': 0,
};

export const INITIAL_REMINDERS = [
  { id: 'morning', time: '08:00', enabled: true },
  { id: 'peak', time: '13:00', enabled: true },
  { id: 'evening', time: '21:00', enabled: true },
];


export const INITIAL_BLOGS = [
  {
    id: 'blog-1',
    title: 'How Deep Breathing Repairs Lung Capacity in the First 14 Days',
    category: 'Official Guide',
    author: 'Dr. Aye Chan (Lunglow Admin)',
    authorRole: 'admin',
    authorAvatar: '/assets/avatar.png',
    createdAt: 'Oct 16, 2026',
    image: null,
    content:
      'When you reduce your daily cigarette intake and practice 3-minute diaphragmatic breathing, residual carbon monoxide clears from your bloodstream within 12 to 24 hours. By day 14, bronchial tubes relax and cilia begin regrowing, measurably improving oxygen uptake during brisk walks.',
    likes: 28,
    userLiked: false,
    comments: [
      {
        id: 'bcom-1',
        author: 'Kyaw Swar',
        authorAvatar: '/assets/avatar.png',
        text: 'Doing the 3-minute breathing right after lunch saved my streak this week!',
        createdAt: '2h ago',
      },
    ],
  },
  {
    id: 'blog-2',
    title: 'My 5 Favorite Craving Hacks When Drinking Morning Tea',
    category: 'Tips & Tricks',
    author: 'Hein Htet Kyaw',
    authorRole: 'member',
    authorAvatar: '/assets/avatar.png',
    createdAt: 'Oct 15, 2026',
    image: null,
    content:
      'Morning tea at the tea shop used to be my hardest trigger. Switching to holding my cup in my right hand, chewing a strong mint leaf, and playing two quick rounds of Memory Tiles completely broke my automatic habit loop.',
    likes: 19,
    userLiked: true,
    comments: [
      {
        id: 'bcom-2',
        author: 'Su Myat Noe',
        authorAvatar: '/assets/avatar.png',
        text: 'Holding the cup in the smoking hand is such a simple and effective trick!',
        createdAt: '5h ago',
      },
    ],
  },
];

export const INITIAL_MANAGED_USERS = [
  {
    id: 'u-1',
    name: 'Hein Htet Kyaw',
    email: 'heinhtet@lunglow.dev',
    role: 'member',
    status: 'active',
    streak: 8,
    avatar: '/assets/avatar.png',
    joinedAt: '2026-08-14',
  },
  {
    id: 'u-2',
    name: 'Dr. Aye Chan (Admin)',
    email: 'admin@lunglow.dev',
    role: 'admin',
    status: 'active',
    streak: 45,
    avatar: '/assets/avatar.png',
    joinedAt: '2026-01-10',
  },
  {
    id: 'u-3',
    name: 'Kyaw Swar',
    email: 'kyawswar@example.com',
    role: 'member',
    status: 'active',
    streak: 12,
    avatar: '/assets/avatar.png',
    joinedAt: '2026-09-02',
  },
  {
    id: 'u-4',
    name: 'Su Myat Noe',
    email: 'sumyat@example.com',
    role: 'member',
    status: 'active',
    streak: 19,
    avatar: '/assets/avatar.png',
    joinedAt: '2026-09-18',
  },
  {
    id: 'u-5',
    name: 'Aung Kaung Myat',
    email: 'aungkaung@example.com',
    role: 'member',
    status: 'suspended',
    streak: 0,
    avatar: '/assets/avatar.png',
    joinedAt: '2026-10-01',
  },
];

export const INITIAL_REPORTS = [
  {
    id: 'rep-1',
    targetType: 'post',
    targetId: 'post-2',
    targetAuthor: 'Kyaw Swar',
    reason: 'Spam or Misleading',
    excerpt: 'Community post: 300 $ Total saved money • 500 Avoided cigarettes',
    reportedBy: 'Su Myat Noe',
    createdAt: 'Oct 17, 2026',
  },
  {
    id: 'rep-2',
    targetType: 'comment',
    targetId: 'bcom-1',
    parentId: 'blog-1',
    targetAuthor: 'Kyaw Swar',
    reason: 'Harmful Medical Advice',
    excerpt: 'Comment on blog: "Doing the 3-minute breathing right after lunch..."',
    reportedBy: 'Aung Kaung Myat',
    createdAt: 'Oct 17, 2026',
  },
  {
    id: 'rep-3',
    targetType: 'profile-image',
    targetId: 'u-5',
    targetAuthor: 'Aung Kaung Myat',
    reason: 'Inappropriate Image / Photo',
    excerpt: 'Uploaded profile photo flagged by community member',
    reportedBy: 'Su Myat Noe',
    createdAt: 'Oct 18, 2026',
  },
  {
    id: 'rep-4',
    targetType: 'blog',
    targetId: 'blog-2',
    targetAuthor: 'Hein Htet Kyaw',
    reason: 'Spam or Misleading',
    excerpt: 'Blog article: "My 5 Favorite Craving Hacks When Drinking Morning Tea"',
    reportedBy: 'Aung Kaung Myat',
    createdAt: 'Oct 18, 2026',
  },
];

export const INITIAL_CHALLENGES = [
  {
    id: 'ch-1',
    title: '7-Day Clean Challenge',
    description: 'Stay completely smoke-free for 7 consecutive days. Log a clean day every day this week to unlock your badge.',
    reward: 'Gold Lung Badge',
    days: 7,
    participants: 342,
    active: true,
    joined: true,
    progress: 4,
    emoji: '🏆',
    cover: '/assets/breathing_exercise.gif',
  },
  {
    id: 'ch-2',
    title: 'Weekend Zero-Smoke Sprint',
    description: 'Keep Saturday and Sunday completely clean. Weekend triggers are the hardest — beat them for a shield badge.',
    reward: 'Streak Shield',
    days: 2,
    participants: 128,
    active: true,
    joined: false,
    progress: 0,
    emoji: '⚡',
    cover: '/assets/walking_exercise.gif',
  },
  {
    id: 'ch-3',
    title: 'Morning Breath Warrior',
    description: 'Complete the 3-minute breathing exercise every morning for 5 days straight — no morning cigarette.',
    reward: 'Breath Master Badge',
    days: 5,
    participants: 96,
    active: false,
    joined: false,
    progress: 0,
    emoji: '🫁',
    cover: '/assets/breathing_exercise.gif',
  },
];

export const INITIAL_USER_REQUESTS = [
  {
    id: 'req-1',
    user: 'Kyaw Swar',
    userId: 'u-3',
    avatar: '/assets/avatar.png',
    category: 'New Feature',
    subject: 'Dark-mode calendar heatmap export',
    message: 'Could we get an option to export the craving heatmap as an image to share with my doctor?',
    status: 'pending',
    createdAt: 'Oct 16, 2026',
  },
  {
    id: 'req-2',
    user: 'Su Myat Noe',
    userId: 'u-4',
    avatar: '/assets/avatar.png',
    category: 'Challenge Idea',
    subject: 'Team-based quit challenge',
    message: 'Would love a challenge where friends can team up and combine their clean days into a group streak.',
    status: 'pending',
    createdAt: 'Oct 15, 2026',
  },
  {
    id: 'req-3',
    user: 'Aung Kaung Myat',
    userId: 'u-5',
    avatar: '/assets/avatar.png',
    category: 'Account',
    subject: 'Restore my deleted post',
    message: 'I accidentally deleted my progress card post. Any way to restore it?',
    status: 'resolved',
    createdAt: 'Oct 12, 2026',
  },
];

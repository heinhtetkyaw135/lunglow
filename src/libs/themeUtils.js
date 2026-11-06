export const getThemeTokens = (isLight) => ({
  cardSurface: isLight
    ? 'border-[#2E5A1C]/20 bg-white/90 backdrop-blur-xl text-[#132211] shadow-[0_14px_34px_-10px_rgba(20,36,18,0.10),inset_0_1px_0_0_rgba(255,255,255,0.95)] lunglow-card-interactive'
    : 'border-white/20 bg-[#111511]/65 backdrop-blur-xl text-white shadow-[0_18px_44px_-12px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.16)] lunglow-card-interactive',
  subCardSurface: isLight
    ? 'border-[#2E5A1C]/15 bg-[#F2F7EF] text-[#132211] shadow-sm transition-colors duration-200'
    : 'border-white/15 bg-[#161A16]/90 text-white shadow-inner transition-colors duration-200',
  inputSurface: isLight
    ? 'border-[#2E5A1C]/35 bg-white text-[#132211] placeholder-[#132211]/45 focus:border-[#4A9322] focus:ring-2 focus:ring-[#5FB032]/30 transition-all duration-200'
    : 'border-white/45 bg-black/40 text-white placeholder-white/40 focus:border-[#CABA3A] focus:ring-2 focus:ring-[#CABA3A]/30 transition-all duration-200',
  mutedText: isLight ? 'text-[#284224]' : 'text-white/80',
  primaryBtn:
    'bg-[#CABA3A] hover:bg-[#d4c442] text-black font-semibold rounded-full shadow-[0_6px_20px_rgba(202,186,58,0.28)] hover:shadow-[0_10px_26px_rgba(202,186,58,0.42)] lunglow-btn-spring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5FB032] focus-visible:ring-offset-2',
  secondaryBtn: isLight
    ? 'bg-[#E2ECE0] text-[#132211] hover:bg-[#D3E3CF] font-semibold rounded-full lunglow-btn-spring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E5A1C]'
    : 'bg-white text-black hover:bg-white/90 font-semibold rounded-full shadow-md lunglow-btn-spring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CABA3A]',
  iconBadge: isLight
    ? 'w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#5FB032]/15 border border-[#5FB032]/30 text-[#2E6B12] flex items-center justify-center shrink-0 shadow-sm'
    : 'w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#5FB032]/15 border border-[#5FB032]/35 text-[#5FB032] flex items-center justify-center shrink-0 shadow-inner',
});

export const createStatusConfigGetter = (t, isLight) => (key) => {
  const map = {
    clean: {
      label: t.status.clean,
      color: '#5FB032',
      bgClass: 'bg-[#5FB032]',
      textClass: isLight ? 'text-[#2E6B12] font-semibold' : 'text-[#5FB032] font-semibold',
      dayText: 'text-black font-bold',
    },
    reduced: {
      label: t.status.reduced,
      color: '#CABA3A',
      bgClass: 'bg-[#CABA3A]',
      textClass: isLight ? 'text-[#7A6C08] font-semibold' : 'text-[#CABA3A] font-semibold',
      dayText: 'text-black font-bold',
    },
    exceeded: {
      label: t.status.exceeded,
      color: '#FF3B30',
      bgClass: 'bg-[#FF3B30]',
      textClass: isLight ? 'text-[#C81E1E] font-semibold' : 'text-[#FF4D4D] font-semibold',
      dayText: 'text-white font-bold',
    },
    missed: {
      label: t.status.missed,
      color: isLight ? '#475569' : '#FFFFFF',
      bgClass: isLight ? 'bg-[#475569]' : 'bg-white',
      textClass: isLight ? 'text-[#334155] font-semibold' : 'text-white font-semibold',
      dayText: isLight ? 'text-white font-bold' : 'text-black font-bold',
    },
    upcoming: {
      label: t.status.upcoming,
      color: isLight ? '#94A3B8' : '#575454',
      bgClass: isLight ? 'bg-[#CBD5E1]' : 'bg-[#575454]',
      textClass: isLight ? 'text-[#334155] font-medium' : 'text-white/85 font-medium',
      dayText: isLight ? 'text-[#1E293B]' : 'text-white',
    },
  };
  return map[key] || map.clean;
};

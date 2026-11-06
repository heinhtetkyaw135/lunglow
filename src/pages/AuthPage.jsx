import React, { useState } from 'react';
import { LunglowLogo, ArrowUpRightIcon, NavAdminShieldIcon } from '../components/common/Icons';
import { TopControls } from '../components/layout/TopControls';
import { Input } from '../components/ui/Input';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { useLunglowData } from '../hooks/useLunglowData';

export function AuthPage() {
  const { isLight, t, themeTokens, lang } = useTheme();
  const {
    authEmail,
    setAuthEmail,
    authPassword,
    setAuthPassword,
    authConfirmPassword,
    setAuthConfirmPassword,
    setRole,
    setAdminLoggedIn,
  } = useAuth();
  const { page, setPage } = useLunglowData();
  const isAdminRoute = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');
  const [adminError, setAdminError] = useState('');

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (!authEmail.trim() || !authPassword.trim()) {
      setAdminError(
        lang === 'my'
          ? 'Admin အကောင့်အချက်အလက် နှစ်ခုလုံး ထည့်သွင်းပါ။'
          : 'Please enter admin email and password.'
      );
      return;
    }
    setAdminLoggedIn(true);
    setRole('admin');
    setAdminError('');
    setPage('admin');
  };

  const handleUserAuth = (e) => {
    e.preventDefault();
    setRole('member');
    setPage(page === 'register' ? 'set-limit' : 'home');
  };

  // Fully separate admin login screen — never shares the user auth card.
  if (isAdminRoute) {
    return (
      <div className="min-h-screen w-full flex flex-col justify-between px-4 py-6 sm:py-8">
        <div className="max-w-[960px] w-full mx-auto flex justify-end mb-4">
          <TopControls />
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div
            className={`w-full max-w-[560px] rounded-3xl sm:rounded-[44px] border ${themeTokens.cardSurface} px-5 sm:px-12 py-10 sm:py-12 flex flex-col items-center justify-center`}
          >
            <LunglowLogo
              className="h-10 sm:h-11 w-auto mb-5"
              onClick={() => setPage('landing')}
              isLight={isLight}
            />
            <div className="inline-flex items-center gap-2 rounded-full bg-[#CABA3A]/15 border border-[#CABA3A]/50 text-[#CABA3A] px-4 py-1.5 text-xs font-extrabold tracking-widest mb-7">
              <NavAdminShieldIcon className="w-4 h-4" />
              {t.admin.consoleTag}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold mb-2">{t.auth.adminLogin}</h1>
            <p className={`text-xs sm:text-sm ${themeTokens.mutedText} mb-7 text-center`}>
              {lang === 'my'
                ? 'Admin စီမံခန့်ခွဲမှု စင်တာသို့ ဝင်ရောက်ရန် အတည်ပြုစာဖြင့် အကောင့်ဝင်ပါ။'
                : 'Sign in with admin credentials to open the control center.'}
            </p>

            <form onSubmit={handleAdminLogin} className="w-full flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm sm:text-base font-medium pl-1">{t.auth.email}</label>
                <Input
                  type="email"
                  value={authEmail}
                  onChange={(e) => {
                    setAuthEmail(e.target.value);
                    setAdminError('');
                  }}
                  placeholder="admin@lunglow.dev"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm sm:text-base font-medium pl-1">{t.auth.password}</label>
                <Input
                  type="password"
                  value={authPassword}
                  onChange={(e) => {
                    setAuthPassword(e.target.value);
                    setAdminError('');
                  }}
                  placeholder="••••••••"
                />
              </div>

              {adminError && (
                <div className="rounded-2xl bg-[#FF3B30]/12 border border-[#FF3B30]/40 text-[#FF3B30] px-4 py-2.5 text-xs sm:text-sm font-semibold animate-toast-in">
                  {adminError}
                </div>
              )}

              <div className="flex justify-center mt-2">
                <button
                  type="submit"
                  className={`px-10 py-3 inline-flex items-center gap-2.5 text-base sm:text-lg ${themeTokens.primaryBtn}`}
                >
                  <span>{t.auth.adminLogin}</span>
                  <ArrowUpRightIcon className="w-4 h-4" />
                </button>
              </div>
            </form>

            <button
              type="button"
              onClick={() => setPage('landing')}
              className={`mt-6 text-xs sm:text-sm font-semibold ${themeTokens.mutedText} hover:text-[#CABA3A] transition`}
            >
              ← {lang === 'my' ? 'သုံးစွဲသူ စာမျက်နှာသို့ ပြန်သွားရန်' : 'Back to user site'}
            </button>
          </div>
        </div>

        <div className="h-2" />
      </div>
    );
  }

  // Standard user register/login — no path to admin from here.
  return (
    <div className="min-h-screen w-full flex flex-col justify-between px-4 py-6 sm:py-8">
      <div className="max-w-[960px] w-full mx-auto flex justify-end mb-4">
        <TopControls />
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div
          className={`w-full max-w-[780px] rounded-3xl sm:rounded-[44px] border ${themeTokens.cardSurface} px-5 sm:px-12 py-10 sm:py-12 flex flex-col items-center justify-center`}
        >
          <LunglowLogo
            className="h-10 sm:h-11 w-auto mb-7"
            onClick={() => setPage('landing')}
            isLight={isLight}
          />

          <div className="w-full max-w-[420px] bg-[#CABA3A] rounded-full p-1.5 grid grid-cols-2 mb-8 shadow-inner">
            <button
              type="button"
              onClick={() => setPage('register')}
              className={`py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all ${
                page === 'register'
                  ? 'bg-white text-black shadow'
                  : 'bg-transparent text-black hover:bg-white/20'
              }`}
            >
              {t.auth.register}
            </button>
            <button
              type="button"
              onClick={() => setPage('login')}
              className={`py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all ${
                page === 'login'
                  ? 'bg-white text-black shadow'
                  : 'bg-transparent text-black hover:bg-white/20'
              }`}
            >
              {t.auth.login}
            </button>
          </div>

          <form onSubmit={handleUserAuth} className="w-full max-w-[420px] flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm sm:text-base font-medium pl-1">{t.auth.email}</label>
              <Input
                type="email"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm sm:text-base font-medium pl-1">{t.auth.password}</label>
              <Input
                type="password"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            {page === 'register' && (
              <div className="flex flex-col gap-2">
                <label className="text-sm sm:text-base font-medium pl-1">
                  {t.auth.confirmPassword}
                </label>
                <Input
                  type="password"
                  value={authConfirmPassword}
                  onChange={(e) => setAuthConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            )}

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-[#CABA3A] hover:brightness-110 active:scale-95 transition text-black font-semibold text-base sm:text-lg rounded-full px-10 py-3 flex items-center gap-2.5 shadow-lg"
              >
                <span>{page === 'register' ? t.auth.register : t.auth.login}</span>
                <ArrowUpRightIcon className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="h-2" />
    </div>
  );
}

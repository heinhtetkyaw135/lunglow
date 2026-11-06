import React, { useState } from 'react';
import { SendIcon, InboxIcon, CheckCircleIcon } from '../../components/common/Icons';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { useLunglowData } from '../../hooks/useLunglowData';

const CATEGORY_KEYS = ['feature', 'challenge', 'account', 'bug', 'other'];
const CATEGORY_VALUES = {
  feature: 'New Feature',
  challenge: 'Challenge Idea',
  account: 'Account',
  bug: 'Bug Report',
  other: 'Other',
};

const STATUS_CHIP = {
  pending: 'bg-[#CABA3A]/20 border-[#CABA3A]/60 text-[#CABA3A]',
  'in-progress': 'bg-[#7dd3fc]/20 border-[#7dd3fc]/60 text-[#7dd3fc]',
  resolved: 'bg-[#5FB032]/20 border-[#5FB032]/60 text-[#5FB032]',
};

export function RequestsPage() {
  const { t, isLight, themeTokens, lang } = useTheme();
  const { userName } = useAuth();
  const { userRequests, handleSubmitUserRequest } = useLunglowData();

  const [category, setCategory] = useState('feature');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sentTick, setSentTick] = useState(false);

  const myRequests = userRequests.filter((r) => r.user === userName);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    handleSubmitUserRequest({
      category: t.requests.categories[category] || CATEGORY_VALUES[category],
      subject,
      message,
    });
    setSubject('');
    setMessage('');
    setCategory('feature');
    setSentTick(true);
    setTimeout(() => setSentTick(false), 2800);
  };

  const statusLabel = (s) =>
    s === 'pending'
      ? t.requests.statusPending
      : s === 'in-progress'
      ? t.requests.statusInProgress
      : t.requests.statusResolved;

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-[#CABA3A]/15 border border-[#CABA3A]/50 text-[#CABA3A] px-4 py-1 text-xs font-bold mb-2">
          <SendIcon className="w-4 h-4" />
          <span>{t.nav.requests}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-1.5">{t.requests.title}</h1>
        <p className={`text-xs sm:text-base ${themeTokens.mutedText} max-w-3xl`}>{t.requests.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Request form */}
        <form
          onSubmit={handleSubmit}
          className={`lg:col-span-3 rounded-3xl sm:rounded-[38px] border ${themeTokens.cardSurface} p-5 sm:p-8 flex flex-col gap-5`}
        >
          <h2 className="text-lg sm:text-xl font-bold">{t.requests.formTitle}</h2>

          <div className="flex flex-col gap-2">
            <label className={`text-xs sm:text-sm font-bold ${themeTokens.mutedText} pl-1`}>
              {t.requests.categoryLabel}
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_KEYS.map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setCategory(key)}
                  className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all lunglow-btn-spring ${
                    category === key
                      ? 'bg-[#5FB032] text-black font-bold shadow'
                      : isLight
                      ? 'border border-[#2E5A1C]/20 bg-[#F2F7EF]'
                      : 'border border-white/20 bg-black/35'
                  }`}
                >
                  {t.requests.categories[key]}
                </button>
              ))}
            </div>
          </div>

          <input
            type="text"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder={t.requests.subjectPlaceholder}
            className={`w-full h-12 rounded-full border ${themeTokens.inputSurface} px-5 text-sm sm:text-base focus:outline-none`}
          />

          <textarea
            rows={5}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t.requests.messagePlaceholder}
            className={`w-full rounded-3xl border ${themeTokens.inputSurface} p-5 text-sm sm:text-base focus:outline-none resize-y`}
          />

          <div className="flex items-center justify-end gap-3 flex-wrap">
            <button
              type="submit"
              className={`px-8 py-3 text-sm sm:text-base inline-flex items-center gap-2 ${themeTokens.primaryBtn}`}
            >
              <SendIcon className="w-4 h-4" />
              {t.requests.submitBtn}
            </button>
          </div>

          {sentTick && (
            <div className="rounded-2xl bg-[#5FB032]/15 border border-[#5FB032]/50 text-[#5FB032] px-5 py-3 text-sm font-bold flex items-center gap-2 animate-toast-in">
              <CheckCircleIcon className="w-4 h-4" />
              {lang === 'my' ? 'Admin ထံ ပေးပို့ပြီးပါပြီ!' : 'Request sent to the admin team!'}
            </div>
          )}
        </form>

        {/* My requests */}
        <div className={`lg:col-span-2 rounded-3xl border ${themeTokens.cardSurface} p-5 sm:p-6 flex flex-col gap-4`}>
          <div className="flex items-center gap-3">
            <div className={themeTokens.iconBadge}>
              <InboxIcon className="w-5 h-5" />
            </div>
            <h2 className="text-base sm:text-lg font-bold">{t.requests.myRequestsTitle}</h2>
          </div>

          <div className="flex flex-col gap-3 max-h-[520px] overflow-y-auto pr-1">
            {myRequests.length === 0 && (
              <div className={`rounded-2xl border ${themeTokens.subCardSurface} p-8 text-center text-xs sm:text-sm ${themeTokens.mutedText}`}>
                {t.requests.empty}
              </div>
            )}
            {myRequests.map((req) => (
              <div key={req.id} className={`rounded-2xl border ${themeTokens.subCardSurface} p-4 flex flex-col gap-2`}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#5FB032]/15 border border-[#5FB032]/40 text-[#5FB032] px-3 py-0.5 text-[10px] font-bold">
                    {req.category}
                  </span>
                  <span className={`rounded-full border px-3 py-0.5 text-[10px] font-bold ${STATUS_CHIP[req.status]}`}>
                    {statusLabel(req.status)}
                  </span>
                </div>
                <div className="font-bold text-sm break-words">{req.subject}</div>
                <p className={`text-xs ${themeTokens.mutedText} line-clamp-3 break-words`}>{req.message}</p>
                <span className={`text-[10px] ${themeTokens.mutedText} font-semibold`}>{req.createdAt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { FlagReportIcon } from './Icons';
import { useTheme } from '../../hooks/useTheme';
import { useLunglowData } from '../../hooks/useLunglowData';

export function ReportModal() {
  const { isLight, t, themeTokens } = useTheme();
  const { reportModalTarget, handleCloseReportModal, handleSubmitReport } = useLunglowData();

  const [selectedReason, setSelectedReason] = useState(t.reportModal.reasons[0]);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (reportModalTarget) {
      setSelectedReason(t.reportModal.reasons[0]);
      setNote('');
    }
  }, [reportModalTarget, t.reportModal.reasons]);

  useEffect(() => {
    if (!reportModalTarget) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') handleCloseReportModal();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [reportModalTarget, handleCloseReportModal]);

  if (!reportModalTarget) return null;

  const targetTypeLabel =
    t.reportModal.targetTypes[reportModalTarget.targetType] || 'Content';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-modal-title"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-page-enter"
      onClick={handleCloseReportModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-lg rounded-[36px] border p-6 sm:p-8 shadow-2xl animate-pop ${
          isLight
            ? 'border-[#2E5A1C]/25 bg-white text-[#132211]'
            : 'border-white/25 bg-[#141814] text-white'
        }`}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-full bg-[#FF3B30]/15 border border-[#FF3B30]/40 text-[#FF3B30] flex items-center justify-center shrink-0">
            <FlagReportIcon className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#CABA3A]">
              {targetTypeLabel} • {reportModalTarget.targetAuthor}
            </span>
            <h3 id="report-modal-title" className="text-xl sm:text-2xl font-bold">
              {t.reportModal.title}
            </h3>
          </div>
        </div>

        {reportModalTarget.excerpt && (
          <div className={`rounded-2xl border ${themeTokens.subCardSurface} px-4 py-2.5 text-xs sm:text-sm italic mb-4 truncate`}>
            "{reportModalTarget.excerpt}"
          </div>
        )}

        <p className={`${themeTokens.mutedText} text-xs sm:text-sm mb-4`}>
          {t.reportModal.subtitle}
        </p>

        <div className="flex flex-col gap-2.5 mb-4">
          {t.reportModal.reasons.map((r) => {
            const active = selectedReason === r;
            return (
              <button
                key={r}
                type="button"
                onClick={() => setSelectedReason(r)}
                className={`w-full text-left px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  active
                    ? 'bg-[#CABA3A] text-black shadow-md'
                    : isLight
                    ? 'border border-[#2E5A1C]/20 bg-[#F2F7EF] hover:bg-[#E3EDE0]'
                    : 'border border-white/20 bg-black/40 hover:border-white/40'
                }`}
              >
                {r}
              </button>
            );
          })}
        </div>

        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={t.reportModal.notePlaceholder}
          className={`w-full h-11 rounded-full border ${themeTokens.inputSurface} px-4 text-xs sm:text-sm mb-6 focus:outline-none`}
        />

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleCloseReportModal}
            className={`px-6 py-2.5 text-xs sm:text-sm ${themeTokens.secondaryBtn}`}
          >
            {t.reportModal.cancelBtn}
          </button>
          <button
            type="button"
            onClick={() => handleSubmitReport(selectedReason, note)}
            className="rounded-full bg-[#FF3B30] hover:brightness-110 text-white font-semibold text-xs sm:text-sm px-6 py-2.5 shadow-lg lunglow-btn-spring"
          >
            {t.reportModal.submitBtn}
          </button>
        </div>
      </div>
    </div>
  );
}

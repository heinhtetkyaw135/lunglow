import React from 'react';
import { useTheme } from '../../hooks/useTheme';

export function Badge({ children, dotColor, textColor, className = '' }) {
  const { isLight } = useTheme();
  return (
    <div
      className={`rounded-full border px-4 py-1.5 inline-flex items-center gap-2 text-xs sm:text-sm ${
        isLight ? 'border-[#2E5A1C]/20 bg-[#F3F8F0]' : 'border-white/30 bg-black/25'
      } ${className}`}
    >
      {dotColor && (
        <span
          className="w-3 h-3 rounded-full shrink-0"
          style={{ backgroundColor: dotColor }}
        />
      )}
      <span style={textColor ? { color: textColor } : undefined}>{children}</span>
    </div>
  );
}

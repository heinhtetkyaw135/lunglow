import React from 'react';
import { useTheme } from '../../hooks/useTheme';

export function Card({ children, className = '', subCard = false }) {
  const { themeTokens } = useTheme();
  const baseSurface = subCard ? themeTokens.subCardSurface : themeTokens.cardSurface;
  return (
    <div className={`rounded-3xl sm:rounded-[40px] border ${baseSurface} ${className}`}>
      {children}
    </div>
  );
}

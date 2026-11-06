import React from 'react';
import { useTheme } from '../../hooks/useTheme';

export function Input({ className = '', ...props }) {
  const { themeTokens } = useTheme();
  return (
    <input
      className={`w-full h-12 sm:h-[54px] rounded-full border ${themeTokens.inputSurface} px-5 text-base focus:outline-none focus:border-[#CABA3A] ${className}`}
      {...props}
    />
  );
}

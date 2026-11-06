import React from 'react';

export function Button({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) {
  const variants = {
    primary: 'bg-[#CABA3A] hover:brightness-110 active:scale-95 text-black font-semibold shadow-lg',
    secondary: 'bg-white hover:bg-white/90 active:scale-95 text-black font-semibold shadow',
    ghost: 'bg-transparent hover:bg-white/10',
  };
  return (
    <button
      type={type}
      className={`rounded-full transition-all inline-flex items-center justify-center ${
        variants[variant] || variants.primary
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

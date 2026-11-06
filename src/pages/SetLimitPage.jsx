import React from 'react';
import { LunglowLogo } from '../components/common/Icons';
import { TopControls } from '../components/layout/TopControls';
import { LimitFormCard } from '../components/common/LimitFormCard';
import { useTheme } from '../hooks/useTheme';
import { useLunglowData } from '../hooks/useLunglowData';

export function SetLimitPage() {
  const { isLight, t } = useTheme();
  const { setPage } = useLunglowData();

  return (
    <div className="min-h-screen w-full px-4 sm:px-10 lg:px-16 py-7 flex flex-col">
      <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
        <LunglowLogo
          className="h-10 sm:h-14 w-auto"
          onClick={() => setPage('landing')}
          isLight={isLight}
        />
        <TopControls />
      </div>
      <div className="flex-1 flex items-center justify-center max-w-[1080px] w-full mx-auto">
        <LimitFormCard titleText={t.limit.setTitle} isOnboarding={true} />
      </div>
    </div>
  );
}

import { useContext } from 'react';
import { LunglowDataContext } from '../context/lunglow-data-context';

export function useLunglowData() {
  const context = useContext(LunglowDataContext);
  if (!context) {
    throw new Error('useLunglowData must be used inside LunglowDataProvider');
  }
  return context;
}

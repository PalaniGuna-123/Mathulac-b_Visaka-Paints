import { createContext, useContext } from 'react';

export interface SmoothScrollContextValue {
  scrollTo: (target: string | HTMLElement, offset?: number) => void;
}

export const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null);

export function useSmoothScroll() {
  const context = useContext(SmoothScrollContext);
  if (!context) {
    throw new Error('useSmoothScroll must be used inside SmoothScrollProvider');
  }
  return context;
}

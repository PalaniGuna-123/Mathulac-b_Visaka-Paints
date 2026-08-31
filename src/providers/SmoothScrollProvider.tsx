import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../lib/animation';
import { SmoothScrollContext } from './smoothScrollContext';

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.1,
      wheelMultiplier: 0.9,
    });

    lenisRef.current = lenis;

    // Original raf call — restores the scroll feel the user preferred.
    const tick = (time: number) => lenis.raf(time * 1000);

    // Keep ScrollTrigger in sync whenever Lenis scrolls.
    const handleScroll = () => ScrollTrigger.update();

    // Re-measure all ScrollTrigger positions after a Lenis resize.
    const handleRefresh = () => lenis.resize();

    let refreshFrame = 0;
    let disposed = false;
    const queueRefresh = () => {
      if (disposed) return;
      window.cancelAnimationFrame(refreshFrame);
      refreshFrame = window.requestAnimationFrame(() => {
        if (!disposed) ScrollTrigger.refresh();
      });
    };

    lenis.on('scroll', handleScroll);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.addEventListener('refresh', handleRefresh);
    window.addEventListener('load', queueRefresh);

    // Also refresh when all fonts are loaded — prevents layout-shift
    // from affecting ScrollTrigger measurements.
    void document.fonts?.ready.then(queueRefresh);
    queueRefresh();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(refreshFrame);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      ScrollTrigger.removeEventListener('refresh', handleRefresh);
      window.removeEventListener('load', queueRefresh);
      lenis.off('scroll', handleScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback((target: string | HTMLElement, offset = -76) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { offset, duration: 1.15 });
      return;
    }

    const element = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  const value = useMemo(() => ({ scrollTo }), [scrollTo]);

  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>;
}

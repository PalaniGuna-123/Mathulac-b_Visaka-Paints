import { useCallback, useEffect, useRef, useState } from 'react';
import { BrowserRouter } from './routes/Router';
import { MainLayout } from './components/layout/MainLayout';
import { AppRoutes } from './routes/AppRoutes';
import { SmoothScrollProvider } from './providers/SmoothScrollProvider';
import { Loader } from './components/common/Loader';

const CRITICAL_ASSETS = [
  '/assets/brand/mathulac-logo-nav.webp',
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const loadedRef = useRef(0);
  const totalRef = useRef(CRITICAL_ASSETS.length + 1); // +1 for fonts

  const updateProgress = useCallback(() => {
    loadedRef.current += 1;
    const pct = Math.min(100, Math.round((loadedRef.current / totalRef.current) * 100));
    setProgress((prev) => Math.max(prev, pct));
  }, []);

  useEffect(() => {
    if (!loading) return;

    // Track image loading
    CRITICAL_ASSETS.forEach((src) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = updateProgress;
      img.onerror = updateProgress; // count errors too so we don't stall
      img.src = src;
    });

    // Track font loading
    if (document.fonts?.ready) {
      document.fonts.ready.then(updateProgress).catch(updateProgress);
    } else {
      updateProgress();
    }

    // Safety: if nothing loads (cached / offline), still finish
    const safety = window.setTimeout(() => {
      setProgress(100);
    }, 5000);

    return () => window.clearTimeout(safety);
  }, [loading, updateProgress]);

  // Remove the inline HTML loader from index.html once React's Loader is visible
  useEffect(() => {
    const el = document.getElementById('initial-loader');
    if (el) {
      el.classList.add('is-done');
      const timer = setTimeout(() => el.remove(), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <Loader progress={progress} onComplete={handleComplete} />}
      <SmoothScrollProvider>
        <BrowserRouter>
          <MainLayout>
            <AppRoutes />
          </MainLayout>
        </BrowserRouter>
      </SmoothScrollProvider>
    </>
  );
}

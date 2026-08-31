import { useEffect } from 'react';
import { BrowserRouter } from './routes/Router';
import { MainLayout } from './components/layout/MainLayout';
import { AppRoutes } from './routes/AppRoutes';
import { SmoothScrollProvider } from './providers/SmoothScrollProvider';

declare global {
  interface Window {
    __signalAppReady?: () => void;
  }
}

export default function App() {
  useEffect(() => {
    // If not on home page, signal ready on next frame
    if (window.location.pathname !== '/') {
      const raf = requestAnimationFrame(() => {
        if (typeof window !== 'undefined' && window.__signalAppReady) {
          window.__signalAppReady();
        }
      });
      return () => cancelAnimationFrame(raf);
    }
  }, []);

  return (
    <SmoothScrollProvider>
      <BrowserRouter>
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </BrowserRouter>
    </SmoothScrollProvider>
  );
}

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
  // Signal to the loader that React has mounted and rendered its DOM tree
  useEffect(() => {
    // Wait for the browser to perform its first layout paint frame
    const raf = requestAnimationFrame(() => {
      if (typeof window !== 'undefined' && window.__signalAppReady) {
        window.__signalAppReady();
      }
    });
    return () => cancelAnimationFrame(raf);
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

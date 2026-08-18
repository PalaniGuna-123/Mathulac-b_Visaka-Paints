import { lazy, Suspense } from 'react';
import { Routes, Route } from './Router';

const HomePage = lazy(() => import('../pages/HomePage'));
const ProductsPage = lazy(() => import('../pages/ProductsPage'));
const StudioPage = lazy(() => import('../pages/StudioPage'));
const WoodPage = lazy(() => import('../pages/WoodPage'));
const AutoPage = lazy(() => import('../pages/AutoPage'));
const DecorPage = lazy(() => import('../pages/DecorPage'));
const ColoursPage = lazy(() => import('../pages/ColoursPage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ink">
      <div className="w-8 h-8 border-2 border-magenta border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/studio" element={<StudioPage />} />
        <Route path="/spaces" element={<StudioPage />} />
        <Route path="/wood" element={<WoodPage />} />
        <Route path="/auto" element={<AutoPage />} />
        <Route path="/decor" element={<DecorPage />} />
        <Route path="/colours" element={<ColoursPage />} />
        <Route path="/palette" element={<ColoursPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;

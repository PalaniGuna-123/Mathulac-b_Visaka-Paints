import { Routes, Route } from './Router';
import {
  HomePage,
  ProductsPage,
  StudioPage,
  WoodPage,
  AutoPage,
  DecorPage,
  ColoursPage,
  AboutPage,
  ContactPage,
  NotFoundPage,
} from '../pages';

export function AppRoutes() {
  return (
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
  );
}

export default AppRoutes;

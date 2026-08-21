import { Routes, Route } from './Router';
import {
  HomePage,
  ProductsPage,
  ProductDetailPage,
  StudioPage,
  WoodPage,
  AutoPage,
  DecorPage,
  ColoursPage,
  AdvertisementPage,
  AboutPage,
  ServicesPage,
  ContactPage,
  SpecificationsPage,
  NotFoundPage,
} from '../pages';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/service" element={<ServicesPage />} />
      <Route path="/turnkey" element={<ServicesPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/product" element={<ProductsPage />} />
      <Route path="/specifications" element={<SpecificationsPage />} />
      <Route path="/specs" element={<SpecificationsPage />} />
      <Route path="/official-catalog" element={<SpecificationsPage />} />
      <Route path="/catalog" element={<SpecificationsPage />} />
      <Route path="/studio" element={<StudioPage />} />
      <Route path="/wood" element={<SpecificationsPage />} />
      <Route path="/auto" element={<AutoPage />} />
      <Route path="/decor" element={<DecorPage />} />
      <Route path="/decorative" element={<DecorPage />} />
      <Route path="/colours" element={<ColoursPage />} />
      <Route path="/palette" element={<ColoursPage />} />
      <Route path="/advertisement" element={<AdvertisementPage />} />
      <Route path="/advertisements" element={<AdvertisementPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/inquiry" element={<ContactPage />} />
      <Route path="/enquiry" element={<ContactPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;

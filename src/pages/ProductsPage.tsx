import { useEffect, useState } from 'react';
import { ProductShowcase } from '../features/products';
import { ContactSection } from '../features/contact';
import { useLocation } from '../routes/Router';

export function ProductsPage() {
  const { search } = useLocation();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('thinners');

  useEffect(() => {
    const params = new URLSearchParams(search);
    const cat = params.get('category');
    if (cat) {
      const matchMap: Record<string, string> = {
        auto: 'primers-auto-putty',
        wood: 'wood-coatings',
        decor: 'trendy-interior-products',
        decorative: 'trendy-interior-products',
        interior: 'trendy-interior-products',
        exterior: 'exterior-emulsion',
        thinners: 'thinners',
        primers: 'primers-auto-putty',
        enamels: 'synthetic-enamels',
        hammertone: 'hammertone-paints',
        aluminium: 'aluminium-paints',
        putty: 'acrylic-cement-putty',
        tile: 'tile-coat',
      };
      if (matchMap[cat.toLowerCase()]) {
        setSelectedCategoryId(matchMap[cat.toLowerCase()]);
      }
    }
  }, [search]);

  return (
    <div className="w-full pt-20">
      {/* 12-System Packaged Catalog Grid & Brand Trust Section */}
      <ProductShowcase
        initialFilter={selectedCategoryId}
        showTrustSection={true}
      />

      {/* Inquiry Bottom Banner */}
      <ContactSection />
    </div>
  );
}

export default ProductsPage;

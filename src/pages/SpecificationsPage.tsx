import { useEffect, useState } from 'react';
import { OfficialCatalogSection } from '../features/products';
import { ContactSection } from '../features/contact';
import { useLocation } from '../routes/Router';
import { FileSpreadsheet } from 'lucide-react';
import { Link } from '../routes/Router';

export function SpecificationsPage() {
  const { search } = useLocation();
  const [activeDivision, setActiveDivision] = useState<'auto' | 'wood' | 'decorative'>('auto');

  useEffect(() => {
    const params = new URLSearchParams(search);
    const div = params.get('division') || params.get('div');
    if (div) {
      const lower = div.toLowerCase();
      if (lower === 'auto' || lower === 'automotive') setActiveDivision('auto');
      else if (lower === 'wood' || lower === 'timber') setActiveDivision('wood');
      else if (lower === 'decorative' || lower === 'decor' || lower === 'interior' || lower === 'exterior') {
        setActiveDivision('decorative');
      }
    }
  }, [search]);

  return (
    <div className="w-full pt-20 bg-ink min-h-screen text-white">
      {/* Top Breadcrumb Bar */}
      <div className="bg-[#050711] border-b border-white/10 px-4 md:px-8 py-3">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-white/60">
            <Link to="/" className="hover:text-cyan">
              Home
            </Link>
            <span>/</span>
            <Link to="/products" className="hover:text-cyan">
              Products
            </Link>
            <span>/</span>
            <span className="text-cyan font-bold">Official Technical Specifications</span>
          </div>
          <span className="text-[10px] font-mono font-bold text-cyan uppercase tracking-wider bg-cyan/10 px-2.5 py-1 rounded-full border border-cyan/20 flex items-center gap-1.5">
            <FileSpreadsheet className="w-3 h-3" /> QA Laboratory Datasheets
          </span>
        </div>
      </div>

      {/* Official 3-Division Laboratory Technical Specifications */}
      <OfficialCatalogSection
        activeDivision={activeDivision}
        onDivisionChange={setActiveDivision}
      />

      {/* Inquiry Bottom Banner */}
      <ContactSection />
    </div>
  );
}

export default SpecificationsPage;

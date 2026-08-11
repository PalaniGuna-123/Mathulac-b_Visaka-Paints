import { useEffect, useState } from 'react';
import { ProductShowcase } from '../features/products';
import { ContactSection } from '../features/contact';
import { ShieldCheck, Layers, Sparkles, Droplets } from 'lucide-react';
import { useLocation } from '../routes/Router';

export function ProductsPage() {
  const { search } = useLocation();
  const [initialCategory, setInitialCategory] = useState('All');

  useEffect(() => {
    const params = new URLSearchParams(search);
    const cat = params.get('category');
    if (cat) {
      const matchMap: Record<string, string> = {
        interior: 'Interior',
        exterior: 'Exterior',
        wood: 'Wood',
        metal: 'Metal',
        decorative: 'Decorative',
        auto: 'Automotive',
      };
      if (matchMap[cat]) setInitialCategory(matchMap[cat]);
    }
  }, [search]);

  return (
    <div className="w-full pt-20">
      {/* Page Hero Header */}
      <div className="relative py-16 md:py-24 px-5 md:px-8 bg-gradient-to-b from-ink via-[#1a0b2e] to-ink border-b border-white/10">
        <div className="max-w-[1400px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan/20 text-cyan text-xs font-bold uppercase tracking-widest mb-4 border border-cyan/30">
            <Layers className="w-3.5 h-3.5" /> Full Product Catalogue
          </div>
          <h1 className="heading-hero text-white">Engineering The Perfect Coat</h1>
          <p className="text-white/70 max-w-2xl mx-auto mt-6 text-base md:text-lg">
            Every Mathulac coating formulation is tested for climate durability, coverage opacity, color brilliance, and seamless application.
          </p>

          {/* Quick Pillar Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
            {[
              { icon: ShieldCheck, title: 'Weather Shield', desc: 'Resists heavy monsoon & UV' },
              { icon: Droplets, title: 'Low VOC Safe', desc: 'Family & eco conscious' },
              { icon: Sparkles, title: 'Deep Pigment', desc: 'Superior color retention' },
              { icon: Layers, title: 'High Coverage', desc: 'Maximum sq.ft per litre' },
            ].map((p, idx) => (
              <div key={idx} className="p-4 rounded-xl glass border border-white/10 text-left">
                <p.icon className="w-5 h-5 text-magenta mb-2" />
                <div className="text-white font-bold text-sm">{p.title}</div>
                <div className="text-white/55 text-xs mt-0.5">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Product Showcase Component */}
      <ProductShowcase initialFilter={initialCategory} />

      {/* Inquiry Bottom Banner */}
      <ContactSection />
    </div>
  );
}

export default ProductsPage;

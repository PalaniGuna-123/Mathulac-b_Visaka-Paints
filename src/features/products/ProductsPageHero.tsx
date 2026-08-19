import React, { useState } from 'react';
import { Car, TreePine, Paintbrush, ArrowRight, Layers, Sparkles, ExternalLink, FileSpreadsheet, Eye } from 'lucide-react';
import { useNavigate } from '../../routes/Router';
import { OfficialDivisionModal } from './OfficialDivisionModal';

interface ProductsPageHeroProps {
  onSelectCategory?: (categoryId: string) => void;
  onSelectDivision?: (division: 'auto' | 'wood' | 'decorative') => void;
}

export function ProductsPageHero({ onSelectCategory, onSelectDivision }: ProductsPageHeroProps) {
  const navigate = useNavigate();
  const [modalDivision, setModalDivision] = useState<'auto' | 'wood' | 'decorative' | null>(null);

  const divisions: Array<{
    id: 'auto' | 'wood' | 'decorative';
    title: string;
    divisionCode: string;
    internalPage: string;
    targetCategory: string;
    tagline: string;
    description: string;
    icon: typeof Car;
    accent: string;
    badgeBg: string;
    gradient: string;
    borderGlow: string;
    bgImage: string;
    specStats: string;
    subSystems: string[];
  }> = [
    {
      id: 'auto',
      title: 'Auto Finishes',
      divisionCode: 'Division 01',
      internalPage: '/auto',
      targetCategory: 'primers-auto-putty',
      tagline: 'Bodyshop Primers, Body Fillers, Solid/Metallic Enamels & 2K Clears',
      description:
        'Anti-corrosive zinc chrome primers, rapid-sand NC body putties, OEM synthetic enamels (24 shades), and showroom mirror clear coats.',
      icon: Car,
      accent: '#EF4444',
      badgeBg: 'bg-red-500/20 text-red-300 border-red-500/30',
      gradient: 'from-red-950/70 via-[#160a14]/80 to-ink',
      borderGlow: 'hover:border-red-500/50 hover:shadow-red-500/20',
      bgImage: 'https://images.pexels.com/photos/34042808/pexels-photo-34042808.jpeg?auto=compress&cs=tinysrgb&w=800',
      specStats: '7 Lab Specs • 24 VP Color Shades',
      subSystems: ['Zinc Chrome Metal', 'Oil Primer Brown', 'Speed Kote', 'NC Putty Grey', 'Synthetic Enamel', 'Topcoat Clears'],
    },
    {
      id: 'wood',
      title: 'Wood Finishes',
      divisionCode: 'Division 02',
      internalPage: '/wood',
      targetCategory: 'wood-coatings',
      tagline: 'Melamine Base, Wood Polish, Sanding Sealers & Table Top Clears',
      description:
        'Fast-drying NC sanding sealers, Table Top mirror clears, wood polishes, and melamine systems engineered to nourish natural timber grain.',
      icon: TreePine,
      accent: '#F59E0B',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      gradient: 'from-amber-950/70 via-[#181108]/80 to-ink',
      borderGlow: 'hover:border-amber-500/50 hover:shadow-amber-500/20',
      bgImage: 'https://images.pexels.com/photos/4705928/pexels-photo-4705928.jpeg?auto=compress&cs=tinysrgb&w=800',
      specStats: '5 Timber Lab Specifications',
      subSystems: ['Melamine Base', 'Wood Polish Colorless', 'NC Sanding Sealer Special', 'NC Sanding Sealer Matt', 'NC Table Top Glossy'],
    },
    {
      id: 'decorative',
      title: 'Decorative Paints',
      divisionCode: 'Division 03',
      internalPage: '/decor',
      targetCategory: 'trendy-interior-products',
      tagline: 'Interior & Exterior Emulsions, Putty, Distemper & Primers',
      description:
        'Optima weather-proof exterior emulsions, Trendy washable interior matt, acrylic wall putty, and architectural wall systems.',
      icon: Paintbrush,
      accent: '#EC4899',
      badgeBg: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
      gradient: 'from-pink-950/70 via-[#14081c]/80 to-ink',
      borderGlow: 'hover:border-pink-500/50 hover:shadow-pink-500/20',
      bgImage: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      specStats: '7 Architectural Specs • Diagnostic Guide',
      subSystems: ['Optima Weather-Proof', 'Trendy Interior Matt', 'Acrylic Wall Putty', 'Acrylic Distemper', 'Masonry Primers'],
    },
  ];

  const handleDivisionClick = (divId: 'auto' | 'wood' | 'decorative', targetCategory: string) => {
    const el = document.getElementById('official-catalog');
    if (el) {
      if (onSelectDivision) onSelectDivision(divId);
      el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    navigate(`/specifications?division=${divId}`);
  };

  return (
    <>
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-20 px-4 md:px-8 bg-gradient-to-b from-[#060814] via-[#0E0B1A] to-[#0B0D17] border-b border-white/10 overflow-hidden">
        {/* Background ambient lighting with smooth floating animations */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[750px] h-[350px] bg-gradient-to-r from-magenta/25 via-purple-600/20 to-cyan/25 rounded-full filter blur-[120px] pointer-events-none animate-float-slow" />
        <div className="absolute top-1/2 -left-32 w-80 h-80 bg-red-500/15 rounded-full filter blur-[100px] pointer-events-none animate-float-reverse" />
        <div className="absolute top-1/2 -right-32 w-80 h-80 bg-amber-500/15 rounded-full filter blur-[100px] pointer-events-none animate-float-slow" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          {/* Header Title Block */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cyan/15 text-cyan text-[11px] font-extrabold uppercase tracking-widest border border-cyan/30 mb-3 shadow-lg shadow-cyan/10 hover:scale-105 transition-transform duration-300">
              <Layers className="w-3.5 h-3.5 animate-pulse" /> Official Visaka Mathulac Coating Divisions
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-tight tracking-tight">
              Precision Formulations for <em className="text-transparent bg-clip-text bg-gradient-to-r from-magenta via-pink-400 to-cyan">Every Surface</em>
            </h1>

            <p className="text-white/70 text-xs sm:text-sm md:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
              Official technical specifications across Automotive Refinishing, Timber Preservation, and Architectural Wall Systems — certified by Visaka QA Laboratory.
            </p>

            {/* Quick Sub-navigation Strip matching official divisions */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider mr-1">
                Official Divisions:
              </span>
              {divisions.map((d) => (
                <button
                  key={d.id}
                  onClick={() => handleDivisionClick(d.id, d.targetCategory)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer border ${d.badgeBg} hover:scale-110 shadow-sm hover:shadow-md`}
                >
                  <d.icon className="w-3 h-3" />
                  <span>{d.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3-Division Rich Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {divisions.map((div) => {
              const Icon = div.icon;
              return (
                <div
                  key={div.id}
                  className={`group relative rounded-2xl p-6 bg-gradient-to-b ${div.gradient} border border-white/10 ${div.borderGlow} card-3d-lift flex flex-col justify-between overflow-hidden shadow-2xl`}
                >
                  {/* Background Texture Image with Subtle Overlay */}
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity group-hover:scale-110 group-hover:opacity-35 transition-all duration-700 pointer-events-none"
                    style={{ backgroundImage: `url(${div.bgImage})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D17] via-[#0B0D17]/80 to-transparent pointer-events-none" />

                  {/* Card Top Content */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg border transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                        style={{ backgroundColor: `${div.accent}20`, borderColor: `${div.accent}50`, color: div.accent }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setModalDivision(div.id)}
                          className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all hover:scale-105 cursor-pointer"
                          title={`Quick View ${div.title} Datasheet Modal`}
                        >
                          <Eye className="w-3 h-3" />
                          <span>Quick View</span>
                        </button>

                        <button
                          onClick={() => navigate(div.internalPage)}
                          className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all hover:scale-105 cursor-pointer"
                          title={`Open Dedicated ${div.title} Hub`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/50">
                        {div.divisionCode}
                      </span>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md border bg-black/30"
                        style={{ borderColor: `${div.accent}40`, color: div.accent }}
                      >
                        {div.specStats}
                      </span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-cyan transition-colors mb-1.5 leading-snug">
                      <button
                        onClick={() => handleDivisionClick(div.id, div.targetCategory)}
                        className="hover:underline text-left cursor-pointer"
                      >
                        {div.title}
                      </button>
                    </h3>

                    <div className="text-[11px] font-bold uppercase tracking-wider mb-3 transition-colors" style={{ color: div.accent }}>
                      {div.tagline}
                    </div>

                    <p className="text-white/65 text-xs leading-relaxed mb-5">
                      {div.description}
                    </p>

                    {/* Sub-system Chips directly matching officialCatalog.ts */}
                    <div className="space-y-1.5 mb-6 pt-3 border-t border-white/10">
                      <span className="text-[9px] font-extrabold uppercase tracking-widest text-white/40 block mb-1">
                        Official Formulations
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {div.subSystems.map((item, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-[10px] text-white/85 font-medium hover:bg-white/15 hover:border-white/25 transition-colors cursor-default"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col gap-2">
                    <button
                      onClick={() => handleDivisionClick(div.id, div.targetCategory)}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.03] shadow-lg cursor-pointer text-center shimmer-button"
                      style={{ background: `linear-gradient(135deg, ${div.accent}, ${div.accent}cc)` }}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>View {div.title} Catalog</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </button>

                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => navigate(div.internalPage)}
                        className="py-1.5 px-2 rounded-lg text-[10px] font-semibold text-white/70 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-1 cursor-pointer border border-white/5"
                      >
                        <FileSpreadsheet className="w-3 h-3" />
                        <span>Dedicated Hub</span>
                      </button>

                      <button
                        onClick={() => {
                          if (onSelectCategory) onSelectCategory(div.targetCategory);
                          const el = document.getElementById('products');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="py-1.5 px-2 rounded-lg text-[10px] font-semibold text-white/60 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-1 cursor-pointer border border-white/5"
                      >
                        <span>12-System SKUs</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Official Division Modal for Instant Datasheet Inspection */}
      {modalDivision && (
        <OfficialDivisionModal
          divisionId={modalDivision}
          onClose={() => setModalDivision(null)}
        />
      )}
    </>
  );
}

export default ProductsPageHero;

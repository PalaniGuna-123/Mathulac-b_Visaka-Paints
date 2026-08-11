import { ColorPaletteSection, ColorScrollSection } from '../features/palette';
import { ContactSection } from '../features/contact';
import { Palette, Sparkles } from 'lucide-react';
import { Link } from '../routes/Router';

export function ColoursPage() {
  return (
    <div className="w-full pt-20">
      {/* Colour Header Banner */}
      <div className="relative py-16 md:py-24 px-5 md:px-8 bg-gradient-to-b from-ink via-[#1a0b2e] to-ink border-b border-white/10 text-center">
        <div className="max-w-[1400px] mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-magenta/20 text-magenta text-xs font-bold uppercase tracking-widest mb-4 border border-magenta/30">
            <Palette className="w-3.5 h-3.5" /> 1,000+ Shade Library
          </div>
          <h1 className="heading-hero text-white">The Mathulac Color Spectrum</h1>
          <p className="text-white/70 max-w-2xl mx-auto mt-6 text-base md:text-lg">
            Browse our full spectrum of pigments — from calming earthen neutrals to electrifying accent tones.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/studio"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-gradient-to-r from-magenta to-violet text-white shadow-xl hover:scale-105 transition-transform text-sm"
            >
              <Sparkles className="w-4 h-4" /> Test In Virtual Paint Studio
            </Link>
          </div>
        </div>
      </div>

      {/* Main Interactive Swatch Grid */}
      <ColorPaletteSection />

      {/* Cinematic Color Scroll Transition */}
      <ColorScrollSection />

      {/* Direct Contact Form */}
      <ContactSection />
    </div>
  );
}

export default ColoursPage;

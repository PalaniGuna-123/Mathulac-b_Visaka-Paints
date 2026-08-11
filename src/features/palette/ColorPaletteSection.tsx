import { useState } from 'react';
import { palette } from '../../data';
import colourFan from '../../../assets/colours.jpeg';
import { X, Copy, Check, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from '../../routes/Router';

export function ColorPaletteSection() {
  const [selected, setSelected] = useState<typeof palette[0] | null>(null);
  const families = [
    'All',
    'Reds',
    'Oranges',
    'Yellows',
    'Greens',
    'Blues',
    'Purples',
    'Pinks',
    'Browns',
    'Beiges',
    'Creams',
    'Whites',
    'Greys',
    'Blacks',
    'Neutrals',
  ];
  const [family, setFamily] = useState('All');
  const [copied, setCopied] = useState(false);

  const shown = family === 'All' ? palette : palette.filter((c) => c.family === family);

  const copyHex = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="palette" className="relative py-24 md:py-32 px-5 md:px-8 bg-ink">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{ backgroundImage: `url(${colourFan})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="text-center mb-10" data-reveal>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-magenta/20 text-magenta text-xs font-bold uppercase tracking-widest mb-3 border border-magenta/30">
            <Sparkles className="w-3.5 h-3.5" /> Color Library
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-white mt-2">Color Has No Limits</h2>
          <p className="text-white/70 max-w-xl mx-auto mt-4">
            Curated precision pigments designed to hold their emotional tone in direct sunlight and interior lamp warmth.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10" data-reveal>
          {families.map((f) => (
            <button
              key={f}
              onClick={() => setFamily(f)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                family === f ? 'bg-magenta text-white shadow-lg' : 'glass text-white/70 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Shade Swatch Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-3" data-reveal>
          {shown.map((c) => (
            <button
              key={`${c.name}-${c.hex}`}
              onClick={() => setSelected(c)}
              data-cursor="color"
              className="group relative aspect-square rounded-xl transition-transform hover:scale-110 hover:z-10 shadow-md border border-white/10"
              style={{ background: c.hex }}
              aria-label={c.name}
            >
              <span className="absolute inset-x-0 -bottom-6 text-center text-[10px] text-white/0 group-hover:text-white/90 transition-colors whitespace-nowrap font-bold pointer-events-none">
                {c.name}
              </span>
            </button>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            to="/colours"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold bg-white text-ink shadow-xl hover:bg-cream transition-all"
          >
            Explore Complete Palette Directory <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Selected Swatch Modal */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-5" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl bg-[#1a0b2e] border border-white/15 animate-menu-drop"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-64 relative" style={{ background: selected.hex }}>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-extrabold text-magenta tracking-widest">{selected.family}</span>
                  <div className="font-display text-3xl md:text-4xl text-white mt-1">{selected.name}</div>
                </div>
                <button
                  onClick={() => copyHex(selected.hex)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-white font-bold text-xs hover:bg-white/20"
                >
                  {copied ? <Check className="w-4 h-4 text-leaf" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied' : 'Copy HEX'}
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-white/50 text-[10px] uppercase font-bold tracking-wider">HEX</div>
                  <div className="text-white font-mono font-bold mt-1">{selected.hex}</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-white/50 text-[10px] uppercase font-bold tracking-wider">RGB</div>
                  <div className="text-white font-mono text-xs font-bold mt-1">
                    {parseInt(selected.hex.slice(1, 3), 16)}, {parseInt(selected.hex.slice(3, 5), 16)},{' '}
                    {parseInt(selected.hex.slice(5, 7), 16)}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Mood</div>
                  <div className="text-white font-semibold text-xs mt-1">{selected.mood}</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-white/50 text-[10px] uppercase font-bold tracking-wider">Best For</div>
                  <div className="text-white font-semibold text-xs mt-1 truncate">{selected.space}</div>
                </div>
              </div>

              <div className="mt-7 flex gap-3">
                <Link
                  to="/studio"
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-magenta to-violet text-white font-bold text-center hover:opacity-90 transition-opacity"
                >
                  Visualize in Room
                </Link>
                <button
                  onClick={() => setSelected(null)}
                  className="px-6 py-3.5 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ColorPaletteSection;

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Search,
  Share2,
  SlidersHorizontal,
  Sparkles,
  Sun,
  X,
  ArrowRight,
} from 'lucide-react';
import { paintShades, roomScenes, type PaintShade } from '../../data';
import { Link } from '../../routes/Router';

const families = [
  'All',
  'Whites',
  'Off Whites',
  'Neutrals',
  'Beige',
  'Cream',
  'Yellow',
  'Orange',
  'Red',
  'Pink',
  'Purple',
  'Blue',
  'Green',
  'Brown',
  'Grey',
  'Blacks',
];

const lightingOptions = ['Daylight', 'Warm Light', 'Evening', 'Natural'] as const;
const finishes = ['Matte', 'Silk', 'Satin', 'Gloss'] as const;
type Lighting = typeof lightingOptions[number];
type Finish = typeof finishes[number];

const lightingStyle: Record<Lighting, { filter: string; overlay: string }> = {
  Daylight: { filter: 'brightness(1.05) saturate(1.04)', overlay: 'rgba(207,231,255,.08)' },
  'Warm Light': { filter: 'brightness(1.03) sepia(.12) saturate(1.12)', overlay: 'rgba(255,178,78,.14)' },
  Evening: { filter: 'brightness(.72) saturate(.9)', overlay: 'rgba(26,42,94,.28)' },
  Natural: { filter: 'brightness(1) saturate(1)', overlay: 'transparent' },
};

interface PaintStudioProps {
  scrollTo?: (id: string) => void;
}

export function PaintStudio({ scrollTo }: PaintStudioProps) {
  const [shade, setShade] = useState<PaintShade>(paintShades[0]);
  const [roomIndex, setRoomIndex] = useState(0);
  const [family, setFamily] = useState('All');
  const [query, setQuery] = useState('');
  const [lighting, setLighting] = useState<Lighting>('Natural');
  const [finish, setFinish] = useState<Finish>('Matte');
  const [before, setBefore] = useState(45);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [showFavourites, setShowFavourites] = useState(false);
  const [toast, setToast] = useState('');
  const [paintPulse, setPaintPulse] = useState(0);
  const roomRef = useRef<HTMLDivElement>(null);
  const paletteRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const room = roomScenes[roomIndex];

  useEffect(() => {
    try {
      setFavourites(JSON.parse(localStorage.getItem('mathulac-favourite-shades') || '[]'));
    } catch {
      setFavourites([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mathulac-favourite-shades', JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    const timer = toast ? window.setTimeout(() => setToast(''), 2500) : undefined;
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [toast]);

  useEffect(() => {
    const el = roomRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(el, { opacity: 0.38, scale: 1.025 }, { opacity: 1, scale: 1, duration: 0.62, ease: 'power3.out', overwrite: true });
  }, [roomIndex]);

  useEffect(() => {
    const cards = paletteRef.current?.querySelectorAll('.studio-palette-card');
    if (!cards || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(cards, { opacity: 0, y: 12 }, { opacity: 1, y: 0, stagger: 0.035, duration: 0.42, ease: 'power2.out', overwrite: true });
  }, [family, query]);

  const filtered = useMemo(() => {
    return paintShades.filter((item) => {
      const term = query.trim().toLowerCase();
      return (
        (family === 'All' || item.family === family) &&
        (!term || [item.name, item.id, item.code, item.family, item.collection || ''].some((value) => value.toLowerCase().includes(term)))
      );
    });
  }, [family, query]);

  const favouriteShades = paintShades.filter((item) => favourites.includes(item.id));
  const isFavourite = favourites.includes(shade.id);

  const selectShade = (next: PaintShade) => {
    setShade(next);
    setPaintPulse((value) => value + 1);
    requestAnimationFrame(() => {
      const selected = paletteRef.current?.querySelector(`[data-shade-id="${next.id}"]`);
      selected?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
  };

  const toggleFavourite = (id: string) => {
    setFavourites((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const updateBefore = useCallback((clientX: number, rect: DOMRect) => {
    setBefore(Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  const share = async () => {
    const text = `${shade.name} (${shade.id}) — Mathulac by Visaka Paints`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Mathulac shade', text, url: window.location.href });
        return;
      } catch {
        return;
      }
    }
    await navigator.clipboard?.writeText(`${text}\n${window.location.href}`);
    setToast('Colour copied to your clipboard');
  };

  const handleContactClick = (e: React.MouseEvent) => {
    if (scrollTo) {
      e.preventDefault();
      scrollTo('contact');
    }
  };

  return (
    <section id="studio" className="studio-shell relative py-20 md:py-28 px-4 md:px-8 overflow-hidden">
      <div className="studio-blob studio-blob-one" />
      <div className="studio-blob studio-blob-two" />

      <div className="studio-intro text-center">
        <span className="studio-kicker">
          <Sparkles className="w-4 h-4 text-[#d43b7a]" /> Live Color Visualizer
        </span>
        <h2>
          Experience Paint <em>Live.</em>
        </h2>
        <p className="mx-auto">
          Test 100+ precision shades against real rooms, multiple daylight conditions, and signature finishes before opening a single can.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto mt-10 studio-grid">
        {/* Left: Virtual Room Screen */}
        <div className="space-y-4">
          <div className="studio-visual-card">
            {/* Visualizer Frame */}
            <div ref={roomRef} className="studio-room relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl">
              <img src={room.image} alt={room.name} className="w-full h-full object-cover" />

              {/* Dynamic Wall Mask & Tone */}
              <div
                key={paintPulse}
                className="studio-wall-paint"
                style={{
                  backgroundColor: shade.hex,
                  clipPath: room.mask,
                  mixBlendMode: 'multiply',
                }}
              />

              {/* Finish Texture Overlay */}
              <div className={`studio-finish studio-finish-${finish.toLowerCase()}`} />

              {/* Lighting Mood Simulation */}
              <div
                className="studio-light-overlay"
                style={{
                  filter: lightingStyle[lighting].filter,
                  background: lightingStyle[lighting].overlay,
                }}
              />

              {/* Top Room Toolbar */}
              <div className="studio-room-toolbar">
                <span className="flex items-center">
                  <span className="studio-live-dot" /> {room.name}
                </span>
                <span className="bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-md">{finish} Finish</span>
              </div>

              {/* Bottom Swatch Tag */}
              <div className="studio-room-caption">
                <span>{shade.id}</span>
                <strong>{shade.name}</strong>
                <small>{shade.family}</small>
              </div>
            </div>

            {/* Room Switcher Thumbnail Strip */}
            <div className="mt-4">
              <span className="studio-room-selector-label">Select Space Scene</span>
              <div className="studio-room-strip no-scrollbar">
                {roomScenes.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setRoomIndex(idx)}
                    className={idx === roomIndex ? 'is-active' : ''}
                    aria-label={`Switch to ${item.name}`}
                  >
                    <img src={item.image} alt="" />
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Split Comparison */}
          <div className="studio-visual-card p-5">
            <div className="studio-compare-label flex items-center justify-between">
              <span>Wall Transformation Comparison</span>
              <span className="text-xs text-black/50 font-normal">Drag slider to compare</span>
            </div>

            <div
              className="studio-compare-image cursor-ew-resize select-none relative h-40 rounded-xl overflow-hidden shadow-inner"
              onMouseDown={(e) => {
                dragging.current = true;
                updateBefore(e.clientX, e.currentTarget.getBoundingClientRect());
              }}
              onMouseMove={(e) => {
                if (dragging.current) updateBefore(e.clientX, e.currentTarget.getBoundingClientRect());
              }}
              onMouseUp={() => {
                dragging.current = false;
              }}
              onTouchStart={(e) => {
                dragging.current = true;
                updateBefore(e.touches[0].clientX, e.currentTarget.getBoundingClientRect());
              }}
              onTouchMove={(e) => {
                if (dragging.current) updateBefore(e.touches[0].clientX, e.currentTarget.getBoundingClientRect());
              }}
              onTouchEnd={() => {
                dragging.current = false;
              }}
            >
              <img src={room.image} alt="Original wall" />
              <div className="studio-before-label">Original</div>

              <div className="studio-compare-after" style={{ width: `${100 - before}%` }}>
                <img src={room.image} alt="Painted wall" />
                <div style={{ backgroundColor: shade.hex, mixBlendMode: 'multiply' }} />
                <div className="studio-after-label">Mathulac {shade.name}</div>
              </div>

              <div className="studio-compare-handle" style={{ left: `${before}%` }}>
                <ChevronLeft className="w-3 h-3 -mr-1" />
                <ChevronRight className="w-3 h-3 -ml-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Controls & Shade Details */}
        <div className="space-y-6">
          <div className="studio-controls">
            {/* Active Selected Swatch Card */}
            <div className="studio-selection-card">
              <div className="studio-swatch-large" style={{ backgroundColor: shade.hex }}>
                <span>{shade.id}</span>
              </div>
              <div>
                <span className="studio-overline">{shade.family} collection</span>
                <h3>{shade.name}</h3>
                <p>{shade.code} • {shade.space}</p>
              </div>
              <button
                onClick={() => toggleFavourite(shade.id)}
                className={`studio-heart ${isFavourite ? 'is-favourite' : ''}`}
                aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
              >
                <Heart className="w-5 h-5" fill={isFavourite ? 'currentColor' : 'none'} />
              </button>
            </div>

            <p className="studio-shade-description">{shade.description}</p>

            {/* Lighting Preset Options */}
            <div className="studio-control-group">
              <span className="studio-overline flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5" /> Ambient Lighting Simulation
              </span>
              <div className="studio-option-grid">
                {lightingOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setLighting(opt)}
                    className={lighting === opt ? 'is-active' : ''}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Sheen & Finish Options */}
            <div className="studio-control-group">
              <span className="studio-overline flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Surface Sheen
              </span>
              <div className="studio-finish-tabs">
                {finishes.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFinish(f)}
                    className={finish === f ? 'is-active' : ''}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Shade Specifications */}
            <div className="studio-info">
              <div>
                <span>HEX CODE</span>
                <strong>{shade.hex}</strong>
              </div>
              <div>
                <span>RECOMMENDED ROOM</span>
                <strong>{shade.space}</strong>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="studio-action-row mt-3">
              <Link
                to="/contact"
                onClick={handleContactClick}
                className="studio-primary flex-1"
              >
                Sample This Shade <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={share}
                className="studio-icon-button"
                aria-label="Share shade details"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Palette Explorer */}
          <div className="studio-explorer">
            <div className="studio-explorer-header">
              <div>
                <span className="studio-overline">Browse Shade Library</span>
                <h3>Palette Catalog</h3>
              </div>
              <button
                onClick={() => setShowFavourites(true)}
                className="studio-favourites-link"
              >
                <Heart className="w-4 h-4" /> Favourites ({favourites.length})
              </button>
            </div>

            {/* Search Input */}
            <div className="studio-search">
              <Search className="w-4 h-4" />
              <input
                type="text"
                placeholder="Search shades by name, code or tone..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button onClick={() => setQuery('')} aria-label="Clear search">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Family Category Pills */}
            <div className="studio-family-tabs no-scrollbar">
              {families.map((fam) => (
                <button
                  key={fam}
                  onClick={() => setFamily(fam)}
                  className={family === fam ? 'is-active' : ''}
                >
                  {fam}
                </button>
              ))}
            </div>

            {/* Mini Swatches Grid */}
            <div ref={paletteRef} className="studio-palette">
              {filtered.slice(0, 18).map((item) => (
                <button
                  key={item.id}
                  data-shade-id={item.id}
                  onClick={() => selectShade(item)}
                  className={`studio-palette-card ${item.id === shade.id ? 'is-selected' : ''}`}
                >
                  <div className="studio-card-swatch" style={{ backgroundColor: item.hex }} />
                  <div className="studio-card-copy">
                    <strong>{item.name}</strong>
                    <small>{item.id}</small>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 text-center">
              <Link
                to="/colours"
                className="text-xs font-extrabold uppercase tracking-widest text-[#d43b7a] hover:underline inline-flex items-center gap-1"
              >
                Open Full 1,000+ Shade Library <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Favourites Modal */}
      {showFavourites && (
        <div className="studio-modal-backdrop" onClick={() => setShowFavourites(false)}>
          <div className="studio-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="studio-modal-close"
              onClick={() => setShowFavourites(false)}
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <h3>Saved Favourites</h3>
            {favouriteShades.length === 0 ? (
              <p className="studio-modal-empty">You have not bookmarked any shades yet. Click the heart icon on any shade to save it here!</p>
            ) : (
              <div className="studio-favourite-grid">
                {favouriteShades.map((f) => (
                  <div key={f.id} className="studio-favourite-item">
                    <span style={{ backgroundColor: f.hex }} />
                    <div>
                      <strong>{f.name}</strong>
                      <small>{f.id} • {f.family}</small>
                    </div>
                    <button
                      onClick={() => {
                        selectShade(f);
                        setShowFavourites(false);
                      }}
                      className="text-xs font-bold text-[#d43b7a] hover:underline"
                    >
                      View Live
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Toast */}
      {toast && (
        <div className="studio-toast">
          <Check className="w-4 h-4" /> {toast}
        </div>
      )}
    </section>
  );
}

export default PaintStudio;

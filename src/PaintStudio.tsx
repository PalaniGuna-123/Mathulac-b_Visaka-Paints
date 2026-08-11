import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { Check, ChevronLeft, ChevronRight, Heart, MapPin, Search, Share2, SlidersHorizontal, Sparkles, Sun, X } from 'lucide-react';
import { paintShades, roomScenes, type PaintShade } from '@/data';

const families = ['All', 'Whites', 'Off Whites', 'Neutrals', 'Beige', 'Cream', 'Yellow', 'Orange', 'Red', 'Pink', 'Purple', 'Blue', 'Green', 'Brown', 'Grey', 'Blacks'];
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

export function PaintStudio({ scrollTo }: { scrollTo: (id: string) => void }) {
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
    try { setFavourites(JSON.parse(localStorage.getItem('mathulac-favourite-shades') || '[]')); } catch { setFavourites([]); }
  }, []);
  useEffect(() => { localStorage.setItem('mathulac-favourite-shades', JSON.stringify(favourites)); }, [favourites]);
  useEffect(() => {
    const timer = toast ? window.setTimeout(() => setToast(''), 2500) : undefined;
    return () => { if (timer) window.clearTimeout(timer); };
  }, [toast]);
  useEffect(() => {
    const el = roomRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(el, { opacity: 0.38, scale: 1.025 }, { opacity: 1, scale: 1, duration: .62, ease: 'power3.out', overwrite: true });
  }, [roomIndex]);
  useEffect(() => {
    const cards = paletteRef.current?.querySelectorAll('.studio-palette-card');
    if (!cards || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(cards, { opacity: 0, y: 12 }, { opacity: 1, y: 0, stagger: .035, duration: .42, ease: 'power2.out', overwrite: true });
  }, [family, query]);

  const filtered = useMemo(() => paintShades.filter((item) => {
    const term = query.trim().toLowerCase();
    return (family === 'All' || item.family === family) && (!term || [item.name, item.id, item.code, item.family, item.collection].some((value) => value.toLowerCase().includes(term)));
  }), [family, query]);
  const favouriteShades = paintShades.filter((item) => favourites.includes(item.id));
  const isFavourite = favourites.includes(shade.id);

  const selectShade = (next: PaintShade) => {
    setShade(next); setPaintPulse((value) => value + 1);
    requestAnimationFrame(() => {
      const selected = paletteRef.current?.querySelector(`[data-shade-id="${next.id}"]`);
      selected?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
  };
  const toggleFavourite = (id: string) => {
    setFavourites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };
  const updateBefore = useCallback((clientX: number, rect: DOMRect) => setBefore(Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100))), []);
  const share = async () => {
    const text = `${shade.name} (${shade.id}) — Mathulac by Visaka Paints`;
    if (navigator.share) {
      try { await navigator.share({ title: 'My Mathulac shade', text, url: window.location.href }); return; } catch { return; }
    }
    await navigator.clipboard?.writeText(`${text}\n${window.location.href}`);
    setToast('Colour copied to your clipboard');
  };
  const onPalettePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = paletteRef.current; if (!el) return;
    dragging.current = true; el.setPointerCapture(event.pointerId);
    el.dataset.x = String(event.clientX); el.dataset.scroll = String(el.scrollLeft);
  };
  const onPalettePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = paletteRef.current; if (!el || !dragging.current) return;
    el.scrollLeft = Number(el.dataset.scroll) - (event.clientX - Number(el.dataset.x));
  };

  return <section id="spaces" className="studio-shell relative overflow-hidden py-20 md:py-28">
    <div className="studio-blob studio-blob-one" /><div className="studio-blob studio-blob-two" />
    <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
      <div className="studio-intro" data-reveal>
        <div className="studio-kicker"><Sparkles className="h-4 w-4" /> Discover your perfect shade</div>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div><h2>Paint Your <em>World.</em></h2><p>Explore colours, visualize them in beautiful spaces, and find the shade that feels like home.</p></div>
          <button onClick={() => document.getElementById('studio-controls')?.scrollIntoView({ behavior: 'smooth', block: 'center' })} data-cursor="explore" className="studio-primary">Start exploring <ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="studio-grid mt-10" data-reveal>
        <div className="studio-visual-card">
          <div className="studio-room-toolbar"><span><span className="studio-live-dot" /> Live visualizer</span><span className="hidden sm:inline">{room.name}</span></div>
          <div
            ref={roomRef}
            className="studio-room"
            style={{ filter: lightingStyle[lighting].filter }}
            aria-label={`${room.name} visualized in ${shade.name}`}
          >
            <img src={room.image} alt={`Modern ${room.name.toLowerCase()} interior`} />
            <div className="studio-wall-paint" key={`${shade.id}-${paintPulse}`} style={{ backgroundColor: shade.hex, clipPath: room.mask, mixBlendMode: 'color' }} />
            <div className={`studio-finish studio-finish-${finish.toLowerCase()}`} style={{ clipPath: room.mask }} />
            <div className="studio-light-overlay" style={{ background: lightingStyle[lighting].overlay }} />
            <div className="studio-room-caption"><span>Visualizing</span><strong>{shade.name}</strong><small>{shade.id} · {finish}</small></div>
          </div>
          <div className="studio-room-selector-label">Choose your space</div>
          <div className="studio-room-strip no-scrollbar" aria-label="Select a room">
            {roomScenes.map((scene, index) => <button key={scene.id} onClick={() => setRoomIndex(index)} data-cursor="view" className={index === roomIndex ? 'is-active' : ''} aria-pressed={index === roomIndex}>
              <img src={scene.image} alt="" loading="lazy" /><span>{scene.name.replace('Luxury ', '').replace('Modern ', '').replace('Home ', '')}</span>
            </button>)}
          </div>
          <div className="studio-compare" onPointerMove={(event) => dragging.current && updateBefore(event.clientX, event.currentTarget.getBoundingClientRect())} onPointerUp={() => { dragging.current = false; }}>
            <div className="studio-compare-label">Compare your transformation</div>
            <div className="studio-compare-image">
              <img src={room.image} alt="" />
              <div className="studio-compare-after" style={{ width: `${100 - before}%` }}><img src={room.image} alt="" /><div style={{ backgroundColor: shade.hex, clipPath: room.mask, mixBlendMode: 'color' }} /></div>
              <span className="studio-before-label">Before</span><span className="studio-after-label">After</span>
              <button className="studio-compare-handle" style={{ left: `${before}%` }} onPointerDown={(event) => { dragging.current = true; event.currentTarget.setPointerCapture(event.pointerId); updateBefore(event.clientX, event.currentTarget.parentElement!.getBoundingClientRect()); }} data-cursor="drag" aria-label="Drag before and after comparison"><ChevronLeft /><ChevronRight /></button>
            </div>
          </div>
        </div>

        <aside id="studio-controls" className="studio-controls">
          <div className="studio-selection-card">
            <div className="studio-swatch-large" style={{ background: shade.hex }}><span>{shade.id}</span></div>
            <div className="min-w-0"><span className="studio-overline">Selected colour</span><h3>{shade.name}</h3><p>{shade.code} · {shade.collection}</p></div>
            <button onClick={() => toggleFavourite(shade.id)} className={`studio-heart ${isFavourite ? 'is-favourite' : ''}`} data-cursor="save" aria-label={`${isFavourite ? 'Remove' : 'Add'} ${shade.name} favourite`}><Heart /></button>
          </div>
          <div className="studio-control-group"><span className="studio-overline">Lighting</span><div className="studio-option-grid">{lightingOptions.map((option) => <button key={option} onClick={() => setLighting(option)} className={lighting === option ? 'is-active' : ''} aria-pressed={lighting === option}><Sun />{option}</button>)}</div></div>
          <div className="studio-control-group"><span className="studio-overline">Paint finish</span><div className="studio-finish-tabs">{finishes.map((option) => <button key={option} onClick={() => setFinish(option)} className={finish === option ? 'is-active' : ''} aria-pressed={finish === option}>{option}</button>)}</div></div>
          <p className="studio-shade-description">{shade.description}</p>
          <div className="studio-info"><div><span>Recommended for</span><strong>{shade.recommendedRooms.join(' · ')}</strong></div><div><span>Finish · Family</span><strong>{finish} · {shade.family}</strong></div><div><span>Shade code</span><strong>{shade.code} · {shade.hex}</strong></div></div>
          <div className="studio-action-row"><button className="studio-primary flex-1" onClick={() => setToast(`${shade.name} added to your project`)}><Check className="h-4 w-4" /> Use this colour</button><button onClick={() => toggleFavourite(shade.id)} data-cursor="save" className="studio-icon-button" aria-label="Add selected colour to favourites"><Heart fill={isFavourite ? 'currentColor' : 'none'} /></button><button onClick={share} data-cursor="share" className="studio-icon-button" aria-label="Share selected colour"><Share2 /></button></div>
        </aside>
      </div>

      <div className="studio-explorer mt-7" data-reveal>
        <div className="studio-explorer-header"><div><span className="studio-kicker"><SlidersHorizontal className="h-4 w-4" /> Explore Mathulac colours</span><h3>Find the colour that feels like you.</h3><small className="studio-drag-hint">Drag to explore · {paintShades.length} curated shades</small></div><button onClick={() => setShowFavourites(true)} className="studio-favourites-link"><Heart /> My favourite colours {favourites.length ? `(${favourites.length})` : ''}</button></div>
        <div className="studio-search"><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search colours, codes or families..." aria-label="Search paint shades" />{query && <button onClick={() => setQuery('')} aria-label="Clear search"><X /></button>}</div>
        <div className="studio-family-tabs no-scrollbar" role="tablist">{families.map((item) => <button role="tab" key={item} onClick={() => setFamily(item)} className={family === item ? 'is-active' : ''} aria-selected={family === item}>{item}</button>)}</div>
        <div ref={paletteRef} onPointerDown={onPalettePointerDown} onPointerMove={onPalettePointerMove} onPointerUp={() => { dragging.current = false; }} onPointerCancel={() => { dragging.current = false; }} className="studio-palette no-scrollbar" aria-label="Draggable shade palette">
          {filtered.length ? filtered.map((item) => <button key={item.id} data-shade-id={item.id} onClick={() => selectShade(item)} data-cursor="select" className={`studio-palette-card ${shade.id === item.id ? 'is-selected' : ''}`} aria-pressed={shade.id === item.id}>
            <span className="studio-card-swatch" style={{ background: item.hex }} /><span className="studio-card-copy"><strong>{item.name}</strong><small>{item.code} · {item.family}</small></span><Heart className={`studio-card-heart ${favourites.includes(item.id) ? 'is-favourite' : ''}`} fill={favourites.includes(item.id) ? 'currentColor' : 'none'} /></button>) : <div className="studio-empty">No shades found. Try a family or shade code.</div>}
        </div>
      </div>
      <div className="studio-cta" data-reveal><div><span>Love this colour?</span><h3>Bring {shade.name} home.</h3><p>Our colour team can help you find the right system and finish.</p></div><div><button onClick={() => scrollTo('contact')} className="studio-primary">Get a quote <ChevronRight /></button><button onClick={() => scrollTo('contact')} className="studio-ghost"><MapPin /> Find a dealer</button></div></div>
    </div>
    {showFavourites && <div className="studio-modal-backdrop" role="dialog" aria-modal="true" aria-label="Favourite colours"><div className="studio-modal"><button onClick={() => setShowFavourites(false)} className="studio-modal-close" aria-label="Close favourites"><X /></button><span className="studio-kicker"><Heart className="h-4 w-4" /> Saved shades</span><h3>My favourite colours</h3>{favouriteShades.length ? <div className="studio-favourite-grid">{favouriteShades.map((item) => <div key={item.id} className="studio-favourite-item"><span style={{ background: item.hex }} /><div><strong>{item.name}</strong><small>{item.id}</small></div><button onClick={() => toggleFavourite(item.id)} aria-label={`Remove ${item.name}`}><X /></button></div>)}</div> : <p className="studio-modal-empty">Tap the heart on any shade to build your own collection.</p>}</div></div>}
    {toast && <div className="studio-toast"><Check />{toast}</div>}
  </section>;
}

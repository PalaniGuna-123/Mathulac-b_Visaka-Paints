import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight, Phone, MapPin, Menu, X, ChevronRight, Sparkles, Check, Instagram, Facebook, Linkedin,
} from 'lucide-react';
import {
  categories, services, palette, heroSlides, surfaces, companyFacts,
  trustPillars, timeline, roomColors, navItems, featuredProducts, type Product,
} from '@/data';

gsap.registerPlugin(ScrollTrigger);

const phoneNumbers = ['+91 93631 14343', '+91 96009 09066'];

export default function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);
  const [productFilter, setProductFilter] = useState('All');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [activeColor, setActiveColor] = useState(palette[0]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [roomColor, setRoomColor] = useState(roomColors[0]);
  const [baPos, setBaPos] = useState(50);
  const baDragging = useRef(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Scroll header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Custom cursor
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    const dot = cursorRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    };
    let raf = 0;
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Cursor hover states
  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest('[data-cursor]');
      if (t) {
        ring.classList.add('is-hover');
        ring.setAttribute('data-label', t.getAttribute('data-cursor') || '');
      } else {
        ring.classList.remove('is-hover');
        ring.removeAttribute('data-label');
      }
    };
    document.addEventListener('mouseover', onOver);
    return () => document.removeEventListener('mouseover', onOver);
  }, []);

  // Hero autoplay
  useEffect(() => {
    const id = setInterval(() => setActiveSlide((s) => (s + 1) % heroSlides.length), 6000);
    return () => clearInterval(id);
  }, []);

  // GSAP scroll reveals
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });
      gsap.utils.toArray<HTMLElement>('[data-reveal-left]').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          x: -60,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });
      gsap.utils.toArray<HTMLElement>('[data-reveal-right]').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          x: 60,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });
      // Color scroll background
      const colorBg = document.getElementById('color-scroll');
      if (colorBg) {
        const colors = ['#FF1493', '#FF7A00', '#FFD400', '#67D600', '#00C8FF', '#7B2CFF'];
        gsap.to(colorBg, {
          backgroundColor: colors[colors.length - 1],
          ease: 'none',
          scrollTrigger: {
            trigger: colorBg,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
            onUpdate: (self) => {
              const seg = colors.length - 1;
              const i = Math.min(Math.floor(self.progress * seg), seg - 1);
              const local = self.progress * seg - i;
              const c1 = gsap.utils.interpolate(colors[i], colors[i + 1], local);
              colorBg.style.backgroundColor = c1 as string;
            },
          },
        });
      }
      // Decorative paint stroke path
      const stroke = document.getElementById('paint-stroke-path') as unknown as SVGPathElement | null;
      if (stroke && typeof stroke.getTotalLength === 'function') {
        const len = stroke.getTotalLength();
        gsap.set(stroke, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(stroke, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: { trigger: stroke.closest('section'), start: 'top 70%', end: 'bottom 60%', scrub: true },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const onBaMove = useCallback((clientX: number, rect: DOMRect) => {
    const x = ((clientX - rect.left) / rect.width) * 100;
    setBaPos(Math.max(2, Math.min(98, x)));
  }, []);

  return (
    <div className="relative">
      <div ref={cursorRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />

      <Header scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} scrollTo={scrollTo} />

      <Hero
        activeSlide={activeSlide}
        setActiveSlide={setActiveSlide}
        scrollTo={scrollTo}
      />

      <PaintYourWorld roomColor={roomColor} setRoomColor={setRoomColor} />

      <ColorVisualizer activeColor={activeColor} setActiveColor={setActiveColor} />

      <ProductShowcase
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        productFilter={productFilter}
        setProductFilter={setProductFilter}
        setActiveProduct={setActiveProduct}
        scrollTo={scrollTo}
      />

      <OneBrandManySurfaces />

      <WoodSection />

      <AutoSection />

      <DecorSection />

      <ServicesSection />

      <ColorPaletteSection />

      <ColorScrollSection />

      <BeforeAfter baPos={baPos} baDragging={baDragging} onBaMove={onBaMove} />

      <CompanyStory />

      <TrustSection />

      <ContactSection />

      <Footer scrollTo={scrollTo} />

      {menuOpen && <MobileMenu scrollTo={scrollTo} />}
      {activeProduct && <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} scrollTo={scrollTo} />}
    </div>
  );
}

/* ---------- Header ---------- */
function Header({ scrolled, menuOpen, setMenuOpen, scrollTo }: {
  scrolled: boolean; menuOpen: boolean; setMenuOpen: (v: boolean) => void; scrollTo: (id: string) => void;
}) {
  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass shadow-lg shadow-black/20' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
          <button onClick={() => scrollTo('top')} className="flex items-center gap-3" data-cursor="home">
            <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-magenta via-flame to-sun flex items-center justify-center font-display text-white text-lg md:text-xl shadow-lg shadow-magenta/40">
              M
            </div>
            <div className="text-left leading-tight">
              <div className="font-display text-lg md:text-xl text-white">Mathulac</div>
              <div className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-white/60">by Visaka Paints</div>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="brush-underline text-sm font-semibold text-white/80 hover:text-white transition-colors"
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-white/90">
              <Phone className="w-4 h-4 text-magenta" />
              <a href={`tel:${phoneNumbers[0].replace(/\s/g, '')}`} className="text-sm font-semibold hover:text-magenta transition-colors">
                {phoneNumbers[0]}
              </a>
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-white"
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>
      {menuOpen && <div className="fixed inset-0 z-40 bg-ink/80 lg:hidden" onClick={() => setMenuOpen(false)} />}
    </>
  );
}

function MobileMenu({ scrollTo }: { scrollTo: (id: string) => void }) {
  return (
    <div className="fixed top-16 left-0 right-0 z-50 lg:hidden glass border-t border-white/10 p-5">
      <div className="flex flex-col gap-1">
        {navItems.map((n) => (
          <button
            key={n.id}
            onClick={() => scrollTo(n.id)}
            className="text-left py-3 px-4 rounded-xl text-white font-semibold hover:bg-white/10 transition-colors"
          >
            {n.label}
          </button>
        ))}
        <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-2 text-white/90">
          {phoneNumbers.map((p) => (
            <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="flex items-center gap-2 py-2">
              <Phone className="w-4 h-4 text-magenta" /> {p}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Hero ---------- */
function Hero({ activeSlide, setActiveSlide, scrollTo }: {
  activeSlide: number; setActiveSlide: React.Dispatch<React.SetStateAction<number>>; scrollTo: (id: string) => void;
}) {
  const slide = heroSlides[activeSlide];
  const titleRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<number | null>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' },
      { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'power3.out' }
    );
  }, [activeSlide]);

  const go = (dir: number) => {
    setActiveSlide((s) => (s + dir + heroSlides.length) % heroSlides.length);
  };

  return (
    <section id="top" className="relative h-screen min-h-[700px] w-full overflow-hidden" onPointerDown={(e) => { dragStart.current = e.clientX; }} onPointerUp={(e) => { if (dragStart.current === null) return; const delta = e.clientX - dragStart.current; if (Math.abs(delta) > 48) go(delta > 0 ? -1 : 1); dragStart.current = null; }}>
      {/* Slides */}
      {heroSlides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === activeSlide ? 1 : 0 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out"
            style={{
              backgroundImage: `url(${s.image})`,
              transform: i === activeSlide ? 'scale(1.08)' : 'scale(1)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/30" />
          <div
            className="absolute inset-0 opacity-40 mix-blend-multiply"
            style={{ background: `radial-gradient(circle at 70% 30%, ${s.accent}40, transparent 60%)` }}
          />
          <div className="paint-orb paint-orb-one" style={{ background: s.accent }} />
          <div className="paint-orb paint-orb-two" style={{ background: '#FFD400' }} />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full max-w-[1400px] mx-auto px-5 md:px-8 flex flex-col justify-end pb-16 md:pb-24">
        <div ref={titleRef} key={activeSlide}>
          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white" style={{ background: slide.accent }}>
              {slide.category}
            </span>
            <span className="text-white/70 text-sm font-mono">
              {String(activeSlide + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
            </span>
          </div>
          <h1 className="font-display text-[2.9rem] sm:text-6xl md:text-7xl lg:text-[6.8rem] leading-[0.91] text-white max-w-5xl tracking-[-0.045em]">
            Transform your world.<br />
            <span className="gradient-text">Protect your assets.</span><br />
            Inspire with color.
          </h1>
          <p className="mt-6 text-base md:text-lg text-white/80 max-w-xl leading-relaxed">
            {slide.description} Premium performance, expressive colour and protection that holds its ground—every day.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo('palette')}
              data-cursor="explore"
              className="group relative overflow-hidden px-6 py-3.5 rounded-xl bg-magenta text-white font-bold flex items-center gap-2 shadow-lg shadow-magenta/40"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Colors <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-flame to-sun translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
            <button
              onClick={() => scrollTo('products')}
              data-cursor="view"
              className="group px-6 py-3.5 rounded-xl glass text-white font-bold flex items-center gap-2 hover:bg-white/15 transition-colors"
            >
              Explore Products <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 right-5 md:right-8 z-10 flex items-center gap-4">
        <button onClick={() => go(-1)} className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/20" aria-label="Previous">
          <ChevronRight className="w-5 h-5 rotate-180" />
        </button>
        <button onClick={() => go(1)} className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/20" aria-label="Next">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      {/* Progress dots */}
      <div className="absolute bottom-8 left-5 md:left-8 z-10 hidden xl:flex gap-2">
        {heroSlides.map((item, i) => (
          <button key={item.id} onClick={() => setActiveSlide(i)} className={`hero-thumb ${i === activeSlide ? 'is-active' : ''}`} aria-label={`Show ${item.title}`}>
            <img src={item.image} alt="" />
            <span>{item.category}</span>
          </button>
        ))}
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex gap-2 xl:hidden">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            className="h-1.5 rounded-full transition-all duration-500"
            style={{
              width: i === activeSlide ? 40 : 14,
              background: i === activeSlide ? slide.accent : 'rgba(255,255,255,0.4)',
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

/* ---------- Paint Your World ---------- */
function PaintYourWorld({ roomColor, setRoomColor }: { roomColor: typeof roomColors[0]; setRoomColor: (c: typeof roomColors[0]) => void }) {
  return (
    <section id="spaces" className="relative py-24 md:py-32 px-5 md:px-8 overflow-hidden bg-gradient-to-b from-ink to-[#1a0b2e]">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12" data-reveal>
          <span className="text-magenta font-bold uppercase tracking-widest text-sm">Interactive</span>
          <h2 className="font-display text-4xl md:text-6xl text-white mt-3">Paint Your World</h2>
          <p className="text-white/70 mt-4 max-w-xl mx-auto">Pick a colour and watch the room repaint itself. This is colour as an experience, not a swatch.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl" data-reveal-left>
            <div className="absolute inset-0 bg-gradient-to-br from-stone-700 to-stone-900" />
            {/* Room illustration */}
            <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
              {/* back wall */}
              <rect x="40" y="40" width="320" height="180" fill={roomColor.hex} style={{ transition: 'fill 0.8s cubic-bezier(0.16,1,0.3,1)' }} />
              {/* side wall shading */}
              <polygon points="0,0 40,40 40,220 0,300" fill="#000" opacity="0.25" />
              <polygon points="360,40 400,0 400,300 360,220" fill="#000" opacity="0.25" />
              {/* floor */}
              <polygon points="0,300 40,220 360,220 400,300" fill="#3a2a1a" />
              {/* window */}
              <rect x="120" y="80" width="80" height="60" fill="#a0d8ff" opacity="0.7" rx="2" />
              <line x1="160" y1="80" x2="160" y2="140" stroke="#fff" strokeWidth="2" opacity="0.6" />
              <line x1="120" y1="110" x2="200" y2="110" stroke="#fff" strokeWidth="2" opacity="0.6" />
              {/* sofa */}
              <rect x="240" y="150" width="100" height="50" rx="6" fill="#2a2a3a" />
              <rect x="240" y="140" width="100" height="20" rx="6" fill="#3a3a4a" />
              {/* painting */}
              <rect x="70" y="90" width="40" height="50" fill="#fff" opacity="0.85" rx="2" />
              <rect x="74" y="94" width="32" height="42" fill={roomColor.hex} opacity="0.6" rx="1" />
            </svg>
            <div className="absolute bottom-4 left-4 glass rounded-xl px-4 py-2 text-white">
              <div className="text-xs uppercase tracking-wider text-white/60">Current Colour</div>
              <div className="font-bold">{roomColor.name}</div>
            </div>
          </div>

          <div data-reveal-right>
            <h3 className="text-white font-bold text-xl mb-5">Choose a colour</h3>
            <div className="grid grid-cols-4 gap-3">
              {roomColors.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setRoomColor(c)}
                  data-cursor="color"
                  className={`group relative aspect-square rounded-xl transition-transform hover:scale-105 ${
                    roomColor.hex === c.hex ? 'ring-2 ring-white ring-offset-2 ring-offset-ink' : ''
                  }`}
                  style={{ background: c.hex }}
                  aria-label={c.name}
                >
                  <span className="absolute inset-x-0 -bottom-6 text-center text-xs text-white/70 opacity-0 group-hover:opacity-100 transition-opacity">
                    {c.name}
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-8 p-5 rounded-2xl glass">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl shadow-lg" style={{ background: roomColor.hex }} />
                <div>
                  <div className="text-white font-bold">{roomColor.name}</div>
                  <div className="text-white/60 text-sm font-mono">{roomColor.hex}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Color Visualizer ---------- */
function ColorVisualizer({ activeColor, setActiveColor }: {
  activeColor: typeof palette[0]; setActiveColor: (c: typeof palette[0]) => void;
}) {
  const [accent, setAccent] = useState(false);
  return (
    <section className="relative py-24 md:py-32 px-5 md:px-8 bg-gradient-to-b from-[#1a0b2e] to-ink overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12" data-reveal>
          <span className="text-cyan font-bold uppercase tracking-widest text-sm">Color Visualizer</span>
          <h2 className="font-display text-4xl md:text-6xl text-white mt-3">Find Your Perfect Color</h2>
        </div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8">
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl" data-reveal-left>
            <div className="absolute inset-0 bg-gradient-to-br from-stone-600 to-stone-800" />
            <svg viewBox="0 0 400 250" className="absolute inset-0 w-full h-full">
              {/* back wall */}
              <rect x="30" y="20" width="240" height="160" fill={activeColor.hex} style={{ transition: 'fill 0.8s cubic-bezier(0.16,1,0.3,1)' }} />
              {/* accent wall (right) */}
              <rect x="270" y="20" width="100" height="160" fill={accent ? activeColor.hex : '#3a3a4a'} style={{ transition: 'fill 0.8s cubic-bezier(0.16,1,0.3,1)' }} />
              {/* floor */}
              <polygon points="0,250 30,180 370,180 400,250" fill="#2a1a0a" />
              {/* sofa */}
              <rect x="80" y="120" width="120" height="50" rx="6" fill="#1a1a2a" />
              <rect x="80" y="110" width="120" height="20" rx="6" fill="#2a2a3a" />
              {/* cushions */}
              <rect x="95" y="125" width="25" height="20" rx="4" fill={activeColor.hex} opacity="0.7" />
              <rect x="130" y="125" width="25" height="20" rx="4" fill={activeColor.hex} opacity="0.5" />
              {/* lamp */}
              <line x1="280" y1="180" x2="280" y2="130" stroke="#fff" strokeWidth="2" opacity="0.4" />
              <circle cx="280" cy="125" r="12" fill="#ffe9a0" opacity="0.8" />
            </svg>
            <div className="absolute top-4 left-4 flex gap-2">
              <button onClick={() => setAccent(false)} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${!accent ? 'bg-white text-ink' : 'glass text-white'}`}>Wall</button>
              <button onClick={() => setAccent(true)} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${accent ? 'bg-white text-ink' : 'glass text-white'}`}>Accent Wall</button>
            </div>
          </div>

          <div data-reveal-right>
            <div className="p-5 rounded-2xl glass mb-5">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-xl shadow-lg" style={{ background: activeColor.hex }} />
                <div>
                  <div className="text-white font-bold text-lg">{activeColor.name}</div>
                  <div className="text-white/60 text-sm font-mono">{activeColor.hex}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-white/50 text-xs uppercase">Finish</div>
                  <div className="text-white font-semibold">Matt</div>
                </div>
                <div>
                  <div className="text-white/50 text-xs uppercase">Mood</div>
                  <div className="text-white font-semibold">{activeColor.mood}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-white/50 text-xs uppercase">Recommended Space</div>
                  <div className="text-white font-semibold">{activeColor.space}</div>
                </div>
              </div>
            </div>
            <h3 className="text-white font-bold mb-3">Pick a shade</h3>
            <div className="grid grid-cols-6 gap-2">
              {palette.slice(0, 18).map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setActiveColor(c)}
                  data-cursor="color"
                  className={`aspect-square rounded-lg transition-transform hover:scale-110 ${
                    activeColor.hex === c.hex ? 'ring-2 ring-white' : ''
                  }`}
                  style={{ background: c.hex }}
                  aria-label={c.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Product Showcase ---------- */
function ProductShowcase({ activeCategory, setActiveCategory, productFilter, setProductFilter, setActiveProduct, scrollTo }: {
  activeCategory: number; setActiveCategory: React.Dispatch<React.SetStateAction<number>>; productFilter: string; setProductFilter: (filter: string) => void; setActiveProduct: (product: Product) => void; scrollTo: (id: string) => void;
}) {
  // Kept as a display of the wider system; product cards below provide the focused catalogue interaction.
  const cat = categories[activeCategory];
  const Icon = cat.icon;
  const productGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!productGridRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(productGridRef.current.children, { opacity: 0, y: 18, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.52, stagger: 0.07, ease: 'power3.out', overwrite: true });
  }, [productFilter]);
  return (
    <section id="products" className="relative py-24 md:py-32 px-5 md:px-8 bg-gradient-to-b from-ink to-[#1a0b2e]">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12" data-reveal>
          <span className="font-bold uppercase tracking-widest text-sm" style={{ color: cat.accent }}>Products</span>
          <h2 className="font-display text-4xl md:text-6xl text-white mt-3">The Right Paint for Every Surface</h2>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" data-reveal>
          {categories.map((c, i) => {
            const TabIcon = c.icon;
            return (
              <button
                key={c.id}
                onClick={() => setActiveCategory(() => i)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  i === activeCategory ? 'text-white shadow-lg' : 'glass text-white/70 hover:text-white'
                }`}
                style={i === activeCategory ? { background: c.accent } : {}}
              >
                <TabIcon className="w-4 h-4" /> {c.name}
              </button>
            );
          })}
        </div>

        {/* Active category display */}
        <div key={cat.id} className="grid lg:grid-cols-2 gap-10 items-center">
          <div
            className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
            data-reveal-left
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient}`} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon className="w-32 h-32 text-white/80" strokeWidth={1} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <div className="text-xs uppercase tracking-widest opacity-70">{cat.surface}</div>
              <div className="font-display text-3xl">{cat.name}</div>
            </div>
          </div>
          <div data-reveal-right>
            <div className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: cat.accent }}>{cat.tagline}</div>
            <h3 className="font-display text-3xl md:text-4xl text-white mb-4">{cat.name}</h3>
            <p className="text-white/70 leading-relaxed mb-6">{cat.description}</p>
            <div className="space-y-2 mb-8">
              {cat.products.map((p) => (
                <div key={p} className="flex items-center gap-3 text-white/90">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: cat.accent }} />
                  <span className="font-semibold">{p}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => scrollTo('contact')}
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-white"
              style={{ background: cat.accent }}
            >
              View Products <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        <div className="mt-24" data-reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
            <div>
              <span className="text-cyan font-bold uppercase tracking-widest text-sm">Featured collection</span>
              <h3 className="font-display text-3xl md:text-5xl text-white mt-2">Finish with confidence.</h3>
            </div>
            <p className="max-w-sm text-sm text-white/60">Select a system for every surface—then open any product for its complete specification.</p>
          </div>
          <div className="flex flex-wrap gap-2 mb-7">
            {['All', 'Interior', 'Exterior', 'Wood', 'Metal', 'Decorative', 'Automotive'].map((filter) => (
              <button key={filter} onClick={() => setProductFilter(filter)} className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${productFilter === filter ? 'bg-white text-ink' : 'bg-white/5 border border-white/15 text-white/70 hover:bg-white/10 hover:text-white'}`}>{filter}</button>
            ))}
          </div>
          <div ref={productGridRef} className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {featuredProducts.filter((product) => productFilter === 'All' || product.category === productFilter).map((product) => (
              <article key={product.id} className="product-card group" style={{ '--product-color': product.color } as React.CSSProperties}>
                <div className="product-card-image">
                  <img src={product.image} alt="" loading="lazy" />
                  <div className="product-bucket" aria-hidden="true">
                    <div className="bucket-lid" />
                    <div className="bucket-label"><span>Mathulac</span><small>{product.category}</small></div>
                  </div>
                  <span className="product-category">{product.category}</span>
                </div>
                <div className="p-6 relative">
                  <h4 className="font-display text-3xl text-white leading-none">{product.name}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">{product.description}</p>
                  <div className="product-reveal mt-5 flex items-center justify-between gap-4">
                    <div className="text-xs text-white/55"><span className="text-white font-bold">{product.finish}</span><br />{product.surfaces}</div>
                    <button onClick={() => setActiveProduct(product)} className="product-open" data-cursor="view" aria-label={`View ${product.name}`}><ArrowRight className="w-4 h-4" /></button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductModal({ product, onClose, scrollTo }: { product: Product; onClose: () => void; scrollTo: (id: string) => void }) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', close);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', close); document.body.style.overflow = ''; };
  }, [onClose]);

  return <div className="fixed inset-0 z-[100] grid place-items-center p-4 md:p-8" role="dialog" aria-modal="true" aria-label={`${product.name} details`}>
    <button className="absolute inset-0 bg-ink/85 backdrop-blur-xl" onClick={onClose} aria-label="Close product details" />
    <div className="product-modal relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/15 bg-[#131a31] shadow-2xl">
      <button onClick={onClose} className="absolute right-5 top-5 z-10 w-10 h-10 rounded-full bg-black/30 text-white grid place-items-center hover:bg-black/50" aria-label="Close"><X className="w-5 h-5" /></button>
      <div className="grid md:grid-cols-2">
        <div className="relative min-h-[300px] md:min-h-[560px] overflow-hidden" style={{ backgroundColor: product.color }}>
          <img className="absolute inset-0 h-full w-full object-cover mix-blend-multiply opacity-70" src={product.image} alt="" />
          <div className="product-bucket product-bucket-large" aria-hidden="true"><div className="bucket-lid" /><div className="bucket-label"><span>Mathulac</span><small>{product.category}</small></div></div>
        </div>
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <span className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: product.color }}>{product.category} system</span>
          <h2 className="font-display text-4xl md:text-5xl leading-none text-white mt-4">{product.name}</h2>
          <p className="text-white/70 leading-relaxed mt-5">{product.description}</p>
          <div className="mt-7 space-y-3">{product.benefits.map((benefit) => <div className="flex items-center gap-3 text-white/90" key={benefit}><span className="grid place-items-center h-5 w-5 rounded-full" style={{ background: product.color }}><Check className="w-3 h-3" /></span>{benefit}</div>)}</div>
          <div className="mt-8 grid grid-cols-2 gap-3 text-sm"><div className="rounded-xl bg-white/5 p-4"><small className="text-white/45 uppercase">Finish</small><strong className="block text-white mt-1">{product.finish}</strong></div><div className="rounded-xl bg-white/5 p-4"><small className="text-white/45 uppercase">Suitable for</small><strong className="block text-white mt-1">{product.surfaces}</strong></div></div>
          <button onClick={() => { onClose(); scrollTo('contact'); }} className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl py-4 font-bold text-white" style={{ background: product.color }}>Request an enquiry <ArrowRight className="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  </div>;
}

/* ---------- One Brand Many Surfaces (horizontal) ---------- */
function OneBrandManySurfaces() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    const wrapEl = wrap.current;
    if (!el || !wrapEl) return;
    const ctx = gsap.context(() => {
      const total = el.scrollWidth - window.innerWidth;
      gsap.to(el, {
        x: -total,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapEl,
          start: 'top top',
          end: () => `+=${total}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrap} className="relative h-screen overflow-hidden bg-ink">
      <div ref={track} className="flex h-full items-center" style={{ width: 'max-content' }}>
        <div className="flex flex-col justify-center px-8 md:px-16 h-full w-[80vw] md:w-[50vw]">
          <span className="text-magenta font-bold uppercase tracking-widest text-sm">One Brand</span>
          <h2 className="font-display text-5xl md:text-7xl text-white leading-[0.95] mt-3">
            One Brand.<br />Many Surfaces.
          </h2>
          <p className="text-white/70 mt-6 max-w-md">From walls to wood, metal to automotive — one trusted name across every surface you paint.</p>
        </div>
        {surfaces.map((s, i) => (
          <div key={s.id} className="relative h-full w-[70vw] md:w-[42vw] flex-shrink-0 flex items-center px-6 md:px-10">
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${s.image})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute top-6 left-6 font-display text-7xl md:text-8xl text-white/30">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-xs uppercase tracking-widest mb-1" style={{ color: s.accent }}>Surface</div>
                <div className="font-display text-4xl md:text-5xl text-white">{s.name}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Wood Section ---------- */
function WoodSection() {
  const woodImages = [
    'https://images.pexels.com/photos/4705928/pexels-photo-4705928.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/911820/pexels-photo-911820.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/10900708/pexels-photo-10900708.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/37550783/pexels-photo-37550783.jpeg?auto=compress&cs=tinysrgb&w=1200',
  ];
  return (
    <section id="wood" className="relative py-24 md:py-32 px-5 md:px-8 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #2a1a0a, #4a2f10, #2a1a0a)' }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div data-reveal-left>
            <span className="text-amber-400 font-bold uppercase tracking-widest text-sm">Wood Finishes</span>
            <h2 className="font-display text-4xl md:text-6xl text-amber-50 mt-3">Bring Wood to Life</h2>
            <p className="text-amber-100/70 mt-5 leading-relaxed max-w-md">
              Coatings that protect and reveal the natural grain — matt, gloss and satin finishes for furniture, doors and architectural woodwork.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {['Matt', 'Gloss', 'Satin'].map((f) => (
                <div key={f} className="p-4 rounded-xl bg-amber-950/40 border border-amber-700/30 text-center">
                  <div className="text-amber-200 font-bold">{f}</div>
                  <div className="text-amber-100/50 text-xs mt-1">Finish</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4" data-reveal-right>
            {woodImages.map((src, i) => (
              <div key={i} className="flex-shrink-0 w-64 aspect-[3/4] rounded-2xl overflow-hidden group">
                <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${src})` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Auto Section ---------- */
function AutoSection() {
  return (
    <section id="auto" className="relative h-screen min-h-[600px] overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(https://images.pexels.com/photos/34042808/pexels-photo-34042808.jpeg?auto=compress&cs=tinysrgb&w=1920)` }} />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/50 to-transparent" />
      <div className="relative z-10 h-full max-w-[1400px] mx-auto px-5 md:px-8 flex items-center">
        <div className="max-w-xl" data-reveal-left>
          <span className="text-red-400 font-bold uppercase tracking-widest text-sm">Automotive</span>
          <h2 className="font-display text-5xl md:text-7xl text-white mt-3 leading-[0.95]">Built to Shine</h2>
          <p className="text-white/80 mt-5 leading-relaxed">
            Automotive refinishing systems engineered for gloss, durability and a mirror finish — primers, putties, enamels and clearcoats.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 max-w-md">
            {[
              { label: 'Gloss', value: 'Mirror' },
              { label: 'Durability', value: 'High' },
              { label: 'Finish', value: 'Smooth' },
              { label: 'Protection', value: 'UV Resistant' },
            ].map((t) => (
              <div key={t.label} className="p-4 rounded-xl glass">
                <div className="text-white/50 text-xs uppercase">{t.label}</div>
                <div className="text-white font-bold">{t.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Decor Section ---------- */
function DecorSection() {
  return (
    <section id="decor" className="relative py-24 md:py-32 px-5 md:px-8 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #2a0a3a, #3a0a2a, #1a0a3a)' }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12" data-reveal>
          <span className="text-fuchsia-400 font-bold uppercase tracking-widest text-sm">Decorative</span>
          <h2 className="font-display text-4xl md:text-6xl text-white mt-3">Walls Are Your Canvas</h2>
          <p className="text-white/70 mt-4 max-w-xl mx-auto">Textured, metallic and designer finishes that turn plain walls into expressive surfaces.</p>
        </div>

        {/* Animated paint stroke SVG */}
        <div className="relative h-40 md:h-56 mb-12" data-reveal>
          <svg viewBox="0 0 1200 200" className="w-full h-full">
            <path
              id="paint-stroke-path"
              d="M 20 100 Q 200 20, 400 100 T 800 100 T 1180 100"
              fill="none"
              stroke="url(#stroke-grad)"
              strokeWidth="24"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="stroke-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FF1493" />
                <stop offset="25%" stopColor="#FF7A00" />
                <stop offset="50%" stopColor="#FFD400" />
                <stop offset="75%" stopColor="#67D600" />
                <stop offset="100%" stopColor="#7B2CFF" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Texture Finish', color: '#FF1493' },
            { name: 'Metallic Finish', color: '#FFD400' },
            { name: 'Designer Stucco', color: '#7B2CFF' },
            { name: 'Crackle Finish', color: '#00C8FF' },
          ].map((d) => (
            <div key={d.name} className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer" data-cursor="explore" data-reveal>
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110" style={{ background: `radial-gradient(circle at 30% 30%, ${d.color}, ${d.color}40)` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-5 left-5 text-white font-bold text-lg">{d.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */
function ServicesSection() {
  return (
    <section id="services" className="relative py-24 md:py-32 px-5 md:px-8 bg-gradient-to-b from-[#1a0a3a] to-ink">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12" data-reveal>
          <span className="text-cyan font-bold uppercase tracking-widest text-sm">Services</span>
          <h2 className="font-display text-4xl md:text-6xl text-white mt-3">More Than Paint</h2>
          <p className="text-white/70 mt-4 max-w-xl mx-auto">From the first colour choice to the final coat — one partner, end to end.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                data-reveal
                className="group relative p-6 rounded-2xl glass hover:bg-white/10 transition-colors"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:rotate-6"
                  style={{ background: `${s.color}22`, border: `1px solid ${s.color}55` }}>
                  <Icon className="w-7 h-7" style={{ color: s.color }} />
                </div>
                <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: s.color }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-white font-bold text-xl mb-2">{s.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{s.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Color Palette ---------- */
function ColorPaletteSection() {
  const [selected, setSelected] = useState<typeof palette[0] | null>(null);
  const families = ['All', 'Reds', 'Oranges', 'Yellows', 'Greens', 'Blues', 'Purples', 'Pinks', 'Neutrals'];
  const [family, setFamily] = useState('All');
  const shown = family === 'All' ? palette : palette.filter((c) => c.family === family);

  return (
    <section id="palette" className="relative py-24 md:py-32 px-5 md:px-8 bg-ink">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-10" data-reveal>
          <span className="text-magenta font-bold uppercase tracking-widest text-sm">Color Library</span>
          <h2 className="font-display text-4xl md:text-6xl text-white mt-3">Color Has No Limits</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-10" data-reveal>
          {families.map((f) => (
            <button
              key={f}
              onClick={() => setFamily(f)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                family === f ? 'bg-magenta text-white' : 'glass text-white/70 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-11 gap-3" data-reveal>
          {shown.map((c) => (
            <button
              key={c.hex}
              onClick={() => setSelected(c)}
              data-cursor="color"
              className="group relative aspect-square rounded-xl transition-transform hover:scale-110 hover:z-10"
              style={{ background: c.hex }}
              aria-label={c.name}
            >
              <span className="absolute inset-x-0 -bottom-6 text-center text-[10px] text-white/0 group-hover:text-white/80 transition-colors whitespace-nowrap">
                {c.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Full screen preview */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-5" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" />
          <div className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="h-64" style={{ background: selected.hex }} />
            <div className="p-8 bg-[#1a0b2e]">
              <div className="font-display text-3xl text-white">{selected.name}</div>
              <div className="grid grid-cols-2 gap-4 mt-5">
                <div>
                  <div className="text-white/50 text-xs uppercase">HEX</div>
                  <div className="text-white font-mono">{selected.hex}</div>
                </div>
                <div>
                  <div className="text-white/50 text-xs uppercase">RGB</div>
                  <div className="text-white font-mono">
                    {parseInt(selected.hex.slice(1, 3), 16)}, {parseInt(selected.hex.slice(3, 5), 16)}, {parseInt(selected.hex.slice(5, 7), 16)}
                  </div>
                </div>
                <div>
                  <div className="text-white/50 text-xs uppercase">Mood</div>
                  <div className="text-white font-semibold">{selected.mood}</div>
                </div>
                <div>
                  <div className="text-white/50 text-xs uppercase">Recommended Space</div>
                  <div className="text-white font-semibold">{selected.space}</div>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="mt-6 w-full py-3 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------- Color Scroll ---------- */
function ColorScrollSection() {
  return (
    <section id="color-scroll" className="relative py-32 md:py-48 px-5 md:px-8 transition-colors duration-500" style={{ background: '#FF1493' }}>
      <div className="max-w-[1400px] mx-auto text-center">
        <h2 className="font-display text-5xl md:text-8xl text-white leading-[0.95] mix-blend-difference">
          Paint is not just<br />something you apply.
        </h2>
        <p className="font-display text-3xl md:text-5xl text-white mt-6 mix-blend-difference">
          It's something you experience.
        </p>
      </div>
    </section>
  );
}

/* ---------- Before / After ---------- */
function BeforeAfter({ baPos, baDragging, onBaMove }: {
  baPos: number; baDragging: React.MutableRefObject<boolean>; onBaMove: (x: number, rect: DOMRect) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <section className="relative py-24 md:py-32 px-5 md:px-8 bg-ink">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-10" data-reveal>
          <span className="text-leaf font-bold uppercase tracking-widest text-sm">Before / After</span>
          <h2 className="font-display text-4xl md:text-6xl text-white mt-3">See the Transformation</h2>
          <p className="text-white/70 mt-4">Drag the handle to reveal the difference a Mathulac coat makes.</p>
        </div>
        <div
          ref={ref}
          className="relative aspect-[16/9] rounded-2xl overflow-hidden select-none ba-handle shadow-2xl"
          data-reveal
          onMouseDown={(e) => { baDragging.current = true; onBaMove(e.clientX, e.currentTarget.getBoundingClientRect()); }}
          onMouseMove={(e) => { if (baDragging.current && ref.current) onBaMove(e.clientX, ref.current.getBoundingClientRect()); }}
          onMouseUp={() => { baDragging.current = false; }}
          onMouseLeave={() => { baDragging.current = false; }}
          onTouchStart={(e) => { baDragging.current = true; onBaMove(e.touches[0].clientX, e.currentTarget.getBoundingClientRect()); }}
          onTouchMove={(e) => { if (baDragging.current && ref.current) onBaMove(e.touches[0].clientX, ref.current.getBoundingClientRect()); }}
          onTouchEnd={() => { baDragging.current = false; }}
        >
          {/* After (full) */}
          <div className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(https://images.pexels.com/photos/271805/pexels-photo-271805.jpeg?auto=compress&cs=tinysrgb&w=1600)` }} />
          {/* Before (clipped) */}
          <div className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://images.pexels.com/photos/8146318/pexels-photo-8146318.jpeg?auto=compress&cs=tinysrgb&w=1600)`,
              clipPath: `inset(0 ${100 - baPos}% 0 0)`,
            }} />
          {/* Labels */}
          <div className="absolute top-4 left-4 px-3 py-1 rounded-lg glass text-white text-xs font-bold">BEFORE</div>
          <div className="absolute top-4 right-4 px-3 py-1 rounded-lg glass text-white text-xs font-bold">AFTER</div>
          {/* Handle */}
          <div className="absolute top-0 bottom-0 w-1 bg-white shadow-lg" style={{ left: `${baPos}%` }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-xl">
              <div className="flex gap-0.5">
                <ChevronRight className="w-4 h-4 text-ink rotate-180" />
                <ChevronRight className="w-4 h-4 text-ink" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Company Story ---------- */
function CompanyStory() {
  return (
    <section id="about" className="relative py-24 md:py-32 px-5 md:px-8 bg-gradient-to-b from-ink to-[#0a1525]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div data-reveal-left>
            <span className="text-cyan font-bold uppercase tracking-widest text-sm">Our Story</span>
            <h2 className="font-display text-4xl md:text-6xl text-white mt-3">Visaka Paints & Chemicals India</h2>
            <p className="text-white/70 mt-5 leading-relaxed">
              Established in 2004 in Coimbatore, India, Visaka Paints & Chemicals India manufactures a broad range of paints and chemical products under the Mathulac brand — serving homes, industries, vehicles, furniture and commercial spaces.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {companyFacts.map((f) => (
                <div key={f.label} className="p-4 rounded-xl glass">
                  <div className="text-white/50 text-xs uppercase">{f.label}</div>
                  <div className="text-white font-bold">{f.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div data-reveal-right>
            <h3 className="text-white font-bold text-xl mb-6">Our Journey</h3>
            <div className="relative pl-8 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-magenta before:via-cyan before:to-leaf">
              {timeline.map((t) => (
                <div key={t.year} className="relative">
                  <div className="absolute -left-[1.45rem] top-1.5 w-3 h-3 rounded-full bg-magenta ring-4 ring-ink" />
                  <div className="text-cyan font-bold text-sm">{t.year}</div>
                  <div className="text-white font-bold">{t.title}</div>
                  <div className="text-white/60 text-sm mt-1">{t.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Trust ---------- */
function TrustSection() {
  return (
    <section className="relative py-20 md:py-28 px-5 md:px-8 bg-[#0a1525]">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12" data-reveal>
          <h2 className="font-display text-3xl md:text-5xl text-white">Why Mathulac</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trustPillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={p.label} data-reveal className="group p-6 rounded-2xl glass text-center"
                style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ background: `${p.color}22`, border: `1px solid ${p.color}55` }}>
                  <Icon className="w-8 h-8" style={{ color: p.color }} />
                </div>
                <h3 className="text-white font-bold text-lg">{p.label}</h3>
                <p className="text-white/60 text-sm mt-2 leading-relaxed">{p.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function ContactSection() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative py-24 md:py-32 px-5 md:px-8 overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #E6007E, #7B2CFF, #146BFF)' }} />
      <div className="absolute inset-0 opacity-30"
        style={{ background: 'radial-gradient(circle at 20% 30%, #FFD400, transparent 40%), radial-gradient(circle at 80% 70%, #67D600, transparent 40%)' }} />
      <div className="relative z-10 max-w-[1200px] mx-auto">
        <div className="text-center mb-12" data-reveal>
          <h2 className="font-display text-4xl md:text-7xl text-white leading-[0.95]">Ready to Add<br />Color to Your World?</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {phoneNumbers.map((p) => (
              <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="flex items-center gap-2 px-5 py-3 rounded-xl glass text-white font-bold hover:bg-white/20">
                <Phone className="w-5 h-5" /> {p}
              </a>
            ))}
          </div>
        </div>
        <div className="max-w-xl mx-auto p-6 md:p-8 rounded-3xl glass" data-reveal>
          {sent ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-full bg-white/20 mx-auto flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display text-2xl text-white">Thank you!</h3>
              <p className="text-white/80 mt-2">We'll be in touch shortly to add some colour to your world.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input required placeholder="Your Name" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/60" />
                <input required type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/60" />
              </div>
              <input required type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/60" />
              <textarea required placeholder="Tell us about your project..." rows={4} className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/60 resize-none" />
              <button type="submit" className="w-full py-4 rounded-xl bg-white text-ink font-bold flex items-center justify-center gap-2 hover:bg-white/90 transition-colors">
                Send Inquiry <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer({ scrollTo }: { scrollTo: (id: string) => void }) {
  return (
    <footer className="relative pt-20 pb-10 px-5 md:px-8 bg-ink overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-magenta via-flame to-violet" />
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-magenta via-flame to-sun flex items-center justify-center font-display text-white text-xl">M</div>
              <div>
                <div className="font-display text-xl text-white">Mathulac</div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-white/60">by Visaka Paints</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">Color that inspires. Protection that lasts.</p>
            <div className="flex gap-2 mt-5">
              {[Instagram, Facebook, Linkedin].map((Social, index) => <a key={index} href="#top" aria-label="Mathulac social profile" className="w-9 h-9 grid place-items-center rounded-full border border-white/15 text-white/70 hover:text-white hover:border-magenta hover:bg-magenta/20 transition-colors"><Social className="w-4 h-4" /></a>)}
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {navItems.map((n) => (
                <button key={n.id} onClick={() => scrollTo(n.id)} className="text-white/60 text-sm hover:text-magenta transition-colors text-left">
                  {n.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Products</h4>
            <div className="flex flex-col gap-2">
              {categories.slice(0, 6).map((c) => (
                <button key={c.id} onClick={() => scrollTo('products')} className="text-white/60 text-sm hover:text-magenta transition-colors text-left">
                  {c.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <div className="flex flex-col gap-3">
              {phoneNumbers.map((p) => (
                <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="flex items-center gap-2 text-white/60 text-sm hover:text-magenta">
                  <Phone className="w-4 h-4" /> {p}
                </a>
              ))}
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <MapPin className="w-4 h-4" /> Coimbatore, India
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/50 text-xs">© {new Date().getFullYear()} Visaka Paints & Chemicals India. All rights reserved.</div>
          <div className="flex items-center gap-2 text-[10px] text-white/60 font-bold uppercase tracking-wider"><span className="rounded-full border border-cyan/50 px-2 py-1 text-cyan">Quality assured</span><span className="rounded-full border border-leaf/50 px-2 py-1 text-leaf">ISO process</span></div>
        </div>
      </div>
    </footer>
  );
}

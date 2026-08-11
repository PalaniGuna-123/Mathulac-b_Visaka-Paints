import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { heroSlides } from '@/data';
import visakaLogo from '../assets/logo.png';
import paintWall from '../assets/paintwall.png';

export default function Hero({ scrollTo }: { scrollTo: (id: string) => void }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = heroSlides[activeSlide];
  const rootRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const revealDone = useRef(false);
  const transitioning = useRef(false);
  const dragStart = useRef<number | null>(null);

  const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Cinematic brand reveal: Visaka -> Mathulac
  useEffect(() => {
    const root = rootRef.current;
    const content = contentRef.current;
    if (!root || !content) return;
    if (reducedMotion()) {
      gsap.set(root.querySelectorAll('#brand-reveal'), { autoAlpha: 0 });
      gsap.set(content, { autoAlpha: 1, y: 0 });
      revealDone.current = true;
      return;
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => { revealDone.current = true; },
      });
      const sweep = sweepRef.current;
      tl.set('#brand-reveal', { autoAlpha: 1 })
        .set(content, { autoAlpha: 0, y: 34 })
        .set(sweep, { xPercent: -115 })
        .set(['#brand-flow-path', '#brand-flow-path-2'], { strokeDasharray: 1700, strokeDashoffset: 1700 })
        .fromTo('#brand-flow-path', { strokeDashoffset: 1700 }, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' }, 0.2)
        .fromTo('#brand-flow-path-2', { strokeDashoffset: 1700 }, { strokeDashoffset: 0, duration: 2.1, ease: 'power2.inOut' }, 0.55)
        .fromTo('#brand-logo', { autoAlpha: 0, scale: 0.95, filter: 'blur(18px)' },
          { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 1.0 }, 0.9)
        .fromTo('#brand-name span', { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.05 }, 1.25)
        .to('#brand-visaka-block', { autoAlpha: 0, y: -24, scale: 0.97, duration: 0.5, ease: 'power2.in' }, 3.0)
        .fromTo('#reveal-sweep', { xPercent: -115 }, { xPercent: 0, duration: 0.4, ease: 'power2.inOut' }, 3.0)
        .fromTo('#brand-mathulac-block', { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.55 }, 3.35)
        .to('#reveal-sweep', { xPercent: 115, duration: 0.55, ease: 'power2.inOut' }, 3.9)
        .set('#reveal-sweep', { xPercent: -115 })
        .to('#brand-reveal', { autoAlpha: 0, duration: 0.65 }, 4.6)
        .to(content, { autoAlpha: 1, y: 0, duration: 0.9 }, 4.7);
    }, root);
    return () => ctx.revert();
  }, []);

  // Reveal hero content text whenever the category changes (post-reveal)
  useEffect(() => {
    if (!revealDone.current) return;
    const el = contentRef.current;
    if (!el || reducedMotion()) return;
    gsap.fromTo(el, { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.75, ease: 'power3.out', overwrite: 'auto' });
  }, [activeSlide]);

  // Autoplay
  useEffect(() => {
    const id = window.setInterval(() => {
      if (!revealDone.current) return;
      setActiveSlide((s) => (s + 1) % heroSlides.length);
    }, 6500);
    return () => window.clearInterval(id);
  }, []);

  const go = (i: number) => {
    const next = ((i % heroSlides.length) + heroSlides.length) % heroSlides.length;
    if (next === activeSlide || transitioning.current) return;
    const sweep = sweepRef.current;
    if (sweep && !reducedMotion()) {
      transitioning.current = true;
      gsap.fromTo(sweep, { xPercent: -115 }, {
        xPercent: 115,
        duration: 0.85,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.set(sweep, { xPercent: -115 });
          transitioning.current = false;
          setActiveSlide(next);
        },
      });
    } else {
      setActiveSlide(next);
    }
  };

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative h-screen min-h-[700px] w-full overflow-hidden bg-ink"
      onPointerDown={(e) => { dragStart.current = e.clientX; }}
      onPointerUp={(e) => {
        if (dragStart.current === null) return;
        const delta = e.clientX - dragStart.current;
        if (Math.abs(delta) > 48) go(activeSlide + (delta > 0 ? -1 : 1));
        dragStart.current = null;
      }}
    >
      {/* Slides */}
      {heroSlides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === activeSlide ? 1 : 0 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[2400ms] ease-out"
            style={{
              backgroundImage: `url(${s.image})`,
              transform: i === activeSlide ? 'scale(1.1)' : 'scale(1)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/35" />
          <div
            className="absolute inset-0 opacity-30 mix-blend-multiply"
            style={{ background: `radial-gradient(circle at 70% 30%, ${s.accent}45, transparent 60%)` }}
          />
        </div>
      ))}

      {/* Real paint-wall texture */}
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: `url(${paintWall})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />

      {/* Subtle paint droplets */}
      <div className="paint-drop paint-drop-1" style={{ background: slide.accent }} />
      <div className="paint-drop paint-drop-2" style={{ background: '#FFD400' }} />
      <div className="paint-drop paint-drop-3" style={{ background: '#00C8FF' }} />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full max-w-[1400px] mx-auto px-5 md:px-8 flex flex-col justify-end pb-28 md:pb-36"
      >
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span
              className="px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.18em] text-white"
              style={{ background: slide.accent }}
            >
              {slide.tagline}
            </span>
            <span className="text-white/70 text-sm font-mono">
              {String(activeSlide + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
            </span>
          </div>
          <h1 className="font-display text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[6.2rem] leading-[0.92] text-white max-w-4xl tracking-[-0.045em]">
            {slide.headline}
          </h1>
          <p className="mt-6 text-base md:text-lg text-white/80 max-w-xl leading-relaxed">
            {slide.statement}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo('spaces')}
              data-cursor="explore"
              className="group relative overflow-hidden px-7 py-4 rounded-xl bg-magenta text-white font-bold flex items-center gap-2 shadow-lg shadow-magenta/40"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Colours <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-flame to-sun translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
            <button
              onClick={() => scrollTo('products')}
              data-cursor="view"
              className="group px-7 py-4 rounded-xl glass text-white font-bold flex items-center gap-2 hover:bg-white/15 transition-colors"
            >
              Explore Products <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          <p className="mt-7 flex items-center gap-2.5 text-[10px] md:text-xs uppercase tracking-[0.22em] text-white/55">
            <img src={visakaLogo} alt="" className="h-4 w-auto object-contain opacity-90" />
            Powered by Visaka Paints &amp; Chemicals India
          </p>
        </div>
      </div>

      {/* Category rail (desktop) */}
      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col gap-2">
        {heroSlides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => go(i)}
            data-cursor="select"
            className={`group flex items-center gap-3 pl-4 pr-5 py-2.5 rounded-full text-left transition-all duration-500 ${
              i === activeSlide ? 'bg-white text-ink shadow-lg' : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
            aria-pressed={i === activeSlide}
          >
            <span className={`text-[10px] font-mono ${i === activeSlide ? 'opacity-70' : 'opacity-50'}`}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="text-sm font-bold uppercase tracking-wider">{s.category}</span>
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: s.accent, opacity: i === activeSlide ? 1 : 0.45 }}
            />
          </button>
        ))}
      </div>

      {/* Category pills (tablet / mobile) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex gap-2 max-w-[88vw] overflow-x-auto no-scrollbar xl:hidden px-2">
        {heroSlides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => go(i)}
            className={`whitespace-nowrap px-3.5 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-500 ${
              i === activeSlide ? 'bg-white text-ink shadow-lg' : 'bg-white/15 text-white/85 hover:bg-white/25'
            }`}
          >
            {s.category}
          </button>
        ))}
      </div>

      {/* Arrows */}
      <div className="absolute bottom-10 right-5 md:right-8 z-10 hidden sm:flex items-center gap-3">
        <button onClick={() => go(activeSlide - 1)} className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/20" aria-label="Previous category">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={() => go(activeSlide + 1)} className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/20" aria-label="Next category">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Paint sweep used for category transitions */}
      <div ref={sweepRef} className="absolute inset-0 z-30 pointer-events-none paint-sweep" />

      {/* Brand reveal overlay */}
      <div id="brand-reveal" className="fixed inset-0 z-[80] flex items-center justify-center overflow-hidden bg-[#0B1020]" aria-hidden="true">
        <svg
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full h-44 md:h-72"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient id="brand-flow-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#E6007E" />
              <stop offset="35%" stopColor="#FF7A00" />
              <stop offset="70%" stopColor="#00C8FF" />
              <stop offset="100%" stopColor="#7B2CFF" />
            </linearGradient>
          </defs>
          <path
            id="brand-flow-path"
            d="M-20 100 C 320 20, 520 180, 760 100 S 1220 20, 1460 100"
            stroke="url(#brand-flow-grad)"
            strokeWidth="30"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            id="brand-flow-path-2"
            d="M-20 124 C 340 62, 540 204, 780 124 S 1240 62, 1460 124"
            stroke="url(#brand-flow-grad)"
            strokeWidth="9"
            strokeLinecap="round"
            opacity="0.65"
          />
        </svg>

        <div id="brand-visaka-block" className="relative z-10 flex flex-col items-center px-6 text-center">
          <img
            id="brand-logo"
            src={visakaLogo}
            alt="Visaka Paints & Chemicals India"
            className="h-16 md:h-24 w-auto object-contain opacity-0 drop-shadow-[0_0_28px_rgba(230,0,126,0.35)]"
          />
          <div id="brand-name" className="mt-7 font-display text-2xl md:text-4xl text-white tracking-[0.08em] flex flex-wrap justify-center gap-x-3 gap-y-1">
            {'VISAKA PAINTS & CHEMICALS INDIA'.split(' ').map((word, i) => (
              <span key={i} className="opacity-0">{word}</span>
            ))}
          </div>
          <div className="mt-5 h-px w-40 md:w-56 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>

        <div id="brand-mathulac-block" className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center opacity-0">
          <div className="font-display text-5xl sm:text-7xl md:text-8xl text-white tracking-tight leading-none">MATHULAC</div>
          <div className="mt-5 font-display italic text-xl md:text-3xl text-white/90">Colour that transforms spaces.</div>
          <div className="mt-7 flex items-center gap-2.5 text-[10px] md:text-xs uppercase tracking-[0.24em] text-white/55">
            <img src={visakaLogo} alt="" className="h-4 w-auto object-contain opacity-90" />
            Powered by Visaka Paints &amp; Chemicals India
          </div>
        </div>

        <div id="reveal-sweep" className="absolute inset-0 z-20 pointer-events-none paint-sweep" />
      </div>
    </section>
  );
}

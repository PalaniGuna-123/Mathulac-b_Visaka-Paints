import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { heroSlides } from '../../data';
import { Link } from '../../routes/Router';
import visakaLogo from '../../../assets/logo.png';

interface HeroProps {
  scrollTo?: (id: string) => void;
}

export function Hero({ scrollTo }: HeroProps) {
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
        onComplete: () => {
          revealDone.current = true;
        },
      });
      const sweep = sweepRef.current;

      // Initialize all hidden
      tl.set('#brand-reveal', { autoAlpha: 1 })
        .set('#brand-visaka-block', { autoAlpha: 0, y: 28, scale: 0.97 })
        .set('#brand-mathulac-block', { autoAlpha: 0, y: 28, scale: 0.97 })
        .set('#brand-tagline', { autoAlpha: 0, y: 14 })
        .set('#brand-divider', { scaleX: 0 })
        .set('#brand-mathulac-tagline', { autoAlpha: 0, y: 14 })
        .set('#brand-mathulac-sub', { autoAlpha: 0 })
        .set(content, { autoAlpha: 0, y: 34 })
        .set(sweep, { xPercent: -115 })
        .set(['#brand-flow-path', '#brand-flow-path-2', '#brand-flow-path-3'],
             { strokeDasharray: 2200, strokeDashoffset: 2200 })

        // Phase 1 — Thin artful paint streams draw across
        .fromTo('#brand-flow-path',   { strokeDashoffset: 2200 }, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut' }, 0.05)
        .fromTo('#brand-flow-path-2', { strokeDashoffset: 2200 }, { strokeDashoffset: 0, duration: 1.7, ease: 'power2.inOut' }, 0.2)
        .fromTo('#brand-flow-path-3', { strokeDashoffset: 2200 }, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' }, 0.45)

        // Phase 2 — Visaka Paints emerges
        .to('#brand-visaka-block', { autoAlpha: 1, y: 0, scale: 1, duration: 0.9 }, 0.6)
        .fromTo('#brand-logo', { filter: 'blur(12px)', scale: 0.92 }, { filter: 'blur(0px)', scale: 1, duration: 0.9 }, 0.6)
        .to('#brand-tagline',   { autoAlpha: 1, y: 0, duration: 0.6 }, 1.1)
        .to('#brand-divider',   { scaleX: 1, duration: 0.6, ease: 'power2.inOut' }, 1.45)

        // Phase 3 — Visaka exits
        .to('#brand-visaka-block', { autoAlpha: 0, y: -22, scale: 0.96, duration: 0.5, ease: 'power2.in' }, 2.6)

        // Phase 4 — Paint wipe transition
        .fromTo('#reveal-sweep', { xPercent: -115 }, { xPercent: 115, duration: 0.8, ease: 'power2.inOut' }, 2.85)

        // Phase 5 — Mathulac appears
        .to('#brand-mathulac-block',    { autoAlpha: 1, y: 0, scale: 1, duration: 0.9 }, 3.45)
        .to('#brand-mathulac-tagline',  { autoAlpha: 1, y: 0, duration: 0.65 }, 3.9)
        .to('#brand-mathulac-sub',      { autoAlpha: 1, duration: 0.55 }, 4.15)

        // Phase 6 — Dissolve reveal
        .to('#brand-mathulac-block',  { autoAlpha: 0, y: -22, scale: 0.97, duration: 0.5, ease: 'power2.in' }, 5.0)
        .to('#brand-reveal',          { autoAlpha: 0, duration: 0.7, ease: 'power2.inOut' }, 5.4)

        // Phase 7 — Main hero content enters
        .to(content, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 5.5);
    }, root);
    return () => ctx.revert();
  }, []);

  // Reveal hero content text whenever slide changes
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
      gsap.fromTo(
        sweep,
        { xPercent: -115 },
        {
          xPercent: 115,
          duration: 0.85,
          ease: 'power2.inOut',
          onComplete: () => {
            gsap.set(sweep, { xPercent: -115 });
            transitioning.current = false;
            setActiveSlide(next);
          },
        }
      );
    } else {
      setActiveSlide(next);
    }
  };

  const handleCtaClick = (e: React.MouseEvent, target: string) => {
    if (scrollTo) {
      e.preventDefault();
      scrollTo(target);
    }
  };

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative h-screen min-h-[700px] w-full overflow-hidden bg-ink"
      onPointerDown={(e) => {
        dragStart.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (dragStart.current === null) return;
        const diff = e.clientX - dragStart.current;
        if (Math.abs(diff) > 50) go(diff > 0 ? activeSlide - 1 : activeSlide + 1);
        dragStart.current = null;
      }}
    >
      {/* Background slide imagery */}
      <div className="absolute inset-0">
        {heroSlides.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === activeSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${s.image})` }} />
          </div>
        ))}
      </div>

      {/* Decorative paint drops */}
      <div className="paint-orb paint-orb-one bg-magenta" />
      <div className="paint-orb paint-orb-two bg-cyan" />

      {/* Wet-paint sweep animation transition */}
      <div ref={sweepRef} className="paint-sweep" />

      {/* ── Cinematic Brand Reveal Overlay ── */}
      <div
        id="brand-reveal"
        className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg,#080c18 0%,#0e0820 50%,#080c18 100%)' }}
      >
        <div id="reveal-sweep" className="paint-sweep" />

        {/* ── Elegant thin paint ribbon strokes ── */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          style={{ opacity: 0.55 }}
        >
          <defs>
            <linearGradient id="flow-grad-1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#E6007E" stopOpacity="0.9" />
              <stop offset="45%"  stopColor="#FF7A00" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#FFD400" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="flow-grad-2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#00C8FF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#7B2CFF" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="flow-grad-3" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#7B2CFF" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#E6007E" stopOpacity="0.2" />
            </linearGradient>
            <filter id="glow-stroke">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Ribbon 1 — Magenta → Amber, sweeps upper half */}
          <path
            id="brand-flow-path"
            d="M -60 180 C 280 90, 700 540, 1500 260"
            fill="none"
            stroke="url(#flow-grad-1)"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#glow-stroke)"
          />
          {/* Ribbon 1 thick glow echo */}
          <path
            d="M -60 180 C 280 90, 700 540, 1500 260"
            fill="none"
            stroke="url(#flow-grad-1)"
            strokeWidth="18"
            strokeLinecap="round"
            opacity="0.18"
          />

          {/* Ribbon 2 — Cyan → Violet, sweeps lower half */}
          <path
            id="brand-flow-path-2"
            d="M -60 680 C 350 820, 950 200, 1500 640"
            fill="none"
            stroke="url(#flow-grad-2)"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#glow-stroke)"
          />
          <path
            d="M -60 680 C 350 820, 950 200, 1500 640"
            fill="none"
            stroke="url(#flow-grad-2)"
            strokeWidth="16"
            strokeLinecap="round"
            opacity="0.15"
          />

          {/* Ribbon 3 — Subtle accent, mid-screen */}
          <path
            id="brand-flow-path-3"
            d="M -60 440 C 500 350, 900 580, 1500 420"
            fill="none"
            stroke="url(#flow-grad-3)"
            strokeWidth="1.5"
            strokeLinecap="round"
            filter="url(#glow-stroke)"
          />
        </svg>

        {/* Ambient colour glows (static, behind text) */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle,rgba(230,0,126,0.12) 0%,transparent 70%)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle,rgba(0,200,255,0.10) 0%,transparent 70%)' }} />
        </div>

        {/* ── VISAKA PAINTS BLOCK ── */}
        <div
          id="brand-visaka-block"
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center opacity-0 pointer-events-none"
          style={{ zIndex: 2 }}
        >
          {/* Logo with subtle backdrop circle */}
          <div className="relative mb-5">
            <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle,rgba(230,0,126,0.15) 0%,transparent 65%)', transform: 'scale(2.4)' }} />
            <img
              id="brand-logo"
              src={visakaLogo}
              alt="Visaka"
              className="relative h-20 md:h-24 mx-auto object-contain drop-shadow-2xl"
              style={{ filter: 'drop-shadow(0 0 18px rgba(230,0,126,0.45))' }}
            />
          </div>

          {/* Eyebrow */}
          <p
            id="brand-tagline"
            className="opacity-0 text-[10px] font-extrabold uppercase tracking-[0.35em] mb-3"
            style={{ color: '#00c8ff', letterSpacing: '0.35em' }}
          >
            Established 2004 &nbsp;&bull;&nbsp; Coimbatore
          </p>

          {/* Brand name */}
          <h1
            className="font-display font-bold text-white tracking-tight leading-none"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', textShadow: '0 2px 40px rgba(230,0,126,0.3)' }}
          >
            Visaka Paints
          </h1>

          {/* Thin divider bar */}
          <div
            id="brand-divider"
            className="mt-4 h-px w-32 origin-left"
            style={{ background: 'linear-gradient(90deg,#e6007e,#00c8ff)', transform: 'scaleX(0)' }}
          />
        </div>

        {/* ── MATHULAC BLOCK ── */}
        <div
          id="brand-mathulac-block"
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center opacity-0 pointer-events-none"
          style={{ zIndex: 2 }}
        >
          {/* Presents eyebrow */}
          <p
            id="brand-mathulac-tagline"
            className="opacity-0 text-[10px] font-extrabold uppercase tracking-[0.4em] mb-3 text-magenta"
          >
            Visaka Paints&nbsp;&bull;&nbsp;Presents
          </p>

          {/* MATHULAC wordmark */}
          <h1
            className="font-display font-black text-white tracking-widest leading-none"
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
              textShadow: '0 0 60px rgba(230,0,126,0.35), 0 2px 30px rgba(0,0,0,0.8)',
              letterSpacing: '0.12em',
            }}
          >
            MATHULAC
          </h1>

          {/* Gradient underline */}
          <div
            className="mt-3 h-[2px] w-40"
            style={{ background: 'linear-gradient(90deg,transparent,#e6007e,#7b2cff,transparent)' }}
          />

          {/* Tagline */}
          <p
            id="brand-mathulac-sub"
            className="opacity-0 mt-4 font-display italic text-white/70 text-sm sm:text-base"
          >
            Colour Changes Everything
          </p>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-20 h-full max-w-[1400px] mx-auto px-5 md:px-8 flex items-center">
        <div ref={contentRef} className="max-w-2xl pt-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4">
            <span className="w-2 h-2 rounded-full animate-ping" style={{ background: slide.accent }} />
            <span className="text-[11px] font-bold uppercase tracking-widest text-white/90">{slide.tagline}</span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl text-white leading-tight tracking-tight drop-shadow-md">
            {slide.headline}
          </h2>

          <p className="text-white/90 text-sm sm:text-base mt-4 leading-relaxed max-w-xl drop-shadow">
            {slide.statement}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              to="/studio"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-white shadow-xl transition-transform hover:scale-105"
              style={{ background: slide.accent }}
            >
              Explore In Studio
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/products"
              onClick={(e) => handleCtaClick(e, 'products')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-white glass hover:bg-white/15 transition-all"
            >
              View Catalogue
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Slide Thumbnails Navigation (Bottom Right) */}
      <div className="absolute bottom-8 right-6 md:right-12 z-20 flex items-center gap-3">
        <button
          onClick={() => go(activeSlide - 1)}
          className="w-10 h-10 rounded-full glass text-white flex items-center justify-center hover:bg-white/20 transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex gap-2">
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => go(i)}
              className={`hero-thumb ${i === activeSlide ? 'is-active' : ''}`}
              aria-label={`Slide ${i + 1}: ${s.category}`}
            >
              <img src={s.image} alt="" />
              <span>{s.category.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => go(activeSlide + 1)}
          className="w-10 h-10 rounded-full glass text-white flex items-center justify-center hover:bg-white/20 transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}

export default Hero;

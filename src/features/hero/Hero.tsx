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
      tl.set('#brand-reveal', { autoAlpha: 1 })
        .set(content, { autoAlpha: 0, y: 34 })
        .set(sweep, { xPercent: -115 })
        .set(['#brand-flow-path', '#brand-flow-path-2'], { strokeDasharray: 1700, strokeDashoffset: 1700 })
        .fromTo('#brand-flow-path', { strokeDashoffset: 1700 }, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' }, 0.2)
        .fromTo('#brand-flow-path-2', { strokeDashoffset: 1700 }, { strokeDashoffset: 0, duration: 2.1, ease: 'power2.inOut' }, 0.55)
        .fromTo('#brand-logo', { autoAlpha: 0, scale: 0.95, filter: 'blur(18px)' }, { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 1.0 }, 0.9)
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
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/65 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
          </div>
        ))}
      </div>

      {/* Decorative paint drops */}
      <div className="paint-orb paint-orb-one bg-magenta" />
      <div className="paint-orb paint-orb-two bg-cyan" />

      {/* Wet-paint sweep animation transition */}
      <div ref={sweepRef} className="paint-sweep" />

      {/* Cinematic Brand Reveal Overlay (0-4.6s) */}
      <div
        id="brand-reveal"
        className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center bg-ink"
      >
        <div id="reveal-sweep" className="paint-sweep" />

        {/* Ambient background SVG path */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 1440 900" preserveAspectRatio="none">
          <path
            id="brand-flow-path"
            d="M -100 200 C 300 100, 600 700, 1540 400"
            fill="none"
            stroke="url(#flow-grad-1)"
            strokeWidth="120"
            strokeLinecap="round"
          />
          <path
            id="brand-flow-path-2"
            d="M -100 600 C 400 800, 900 200, 1540 700"
            fill="none"
            stroke="url(#flow-grad-2)"
            strokeWidth="70"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="flow-grad-1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#E6007E" />
              <stop offset="50%" stopColor="#FF7A00" />
              <stop offset="100%" stopColor="#FFD400" />
            </linearGradient>
            <linearGradient id="flow-grad-2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00C8FF" />
              <stop offset="100%" stopColor="#7B2CFF" />
            </linearGradient>
          </defs>
        </svg>

        {/* Visaka block */}
        <div id="brand-visaka-block" className="absolute text-center max-w-2xl px-6">
          <img id="brand-logo" src={visakaLogo} alt="Visaka" className="h-20 md:h-28 mx-auto mb-6 object-contain" />
          <h1 id="brand-name" className="font-display text-4xl md:text-6xl text-white tracking-tight">
            {'Visaka Paints'.split(' ').map((w, i) => (
              <span key={i} className="inline-block mr-3">
                {w}
              </span>
            ))}
          </h1>
          <p className="text-cyan font-bold uppercase tracking-[0.25em] text-xs md:text-sm mt-3">Established 2004 • Coimbatore</p>
        </div>

        {/* Mathulac block */}
        <div id="brand-mathulac-block" className="absolute text-center max-w-3xl px-6">
          <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-magenta mb-2 block">Presents</span>
          <h1 className="font-display text-5xl md:text-8xl text-white tracking-tight">MATHULAC</h1>
          <p className="text-white/80 font-display italic text-xl md:text-2xl mt-3">Colour Changes Everything</p>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-20 h-full max-w-[1400px] mx-auto px-5 md:px-8 flex items-center">
        <div ref={contentRef} className="max-w-2xl pt-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-6">
            <span className="w-2 h-2 rounded-full animate-ping" style={{ background: slide.accent }} />
            <span className="text-xs font-bold uppercase tracking-widest text-white/90">{slide.tagline}</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-white leading-[0.98] tracking-tight">
            {slide.headline}
          </h2>

          <p className="text-white/75 text-base sm:text-lg mt-6 leading-relaxed max-w-xl">
            {slide.statement}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/studio"
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-xl font-bold text-white shadow-xl transition-transform hover:scale-105"
              style={{ background: slide.accent }}
            >
              Explore In Studio
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/products"
              onClick={(e) => handleCtaClick(e, 'products')}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-bold text-white glass hover:bg-white/15 transition-all"
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

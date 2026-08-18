import { useLayoutEffect, useRef, type CSSProperties } from 'react';
import { surfaces } from '../../data/products';
import { FloatingPaintBubbles, PaintSplash, type PaintSplashSize, type PaintSplashVariant } from '../../components/paint';
import { gsap } from '../../lib/animation';

const surfaceSplashStyles: Array<{ size: PaintSplashSize; variant: PaintSplashVariant }> = [
  { size: 'medium', variant: 'impact' },
  { size: 'large', variant: 'wide' },
  { size: 'large', variant: 'brush' },
  { size: 'small', variant: 'compact' },
  { size: 'medium', variant: 'flow' },
];

export function OneBrandManySurfaces() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const images = Array.from(section.querySelectorAll<HTMLElement>('[data-surface-image]'));
      const copies = Array.from(section.querySelectorAll<HTMLElement>('[data-surface-copy]'));
      const progressBars = Array.from(section.querySelectorAll<HTMLElement>('[data-surface-progress]'));
      const coatingSweeps = Array.from(section.querySelectorAll<HTMLElement>('[data-surface-coating]'));
      const splashes = Array.from(section.querySelectorAll<HTMLElement>('[data-surface-splash]'));
      if (!images.length || !copies.length) return;

      gsap.set(images, {
        autoAlpha: 0,
        scale: 1.1,
        yPercent: 3,
        clipPath: 'inset(7% 4% 7% 4% round 2rem)',
      });
      gsap.set(images[0], {
        autoAlpha: 1,
        scale: 1.035,
        yPercent: 0,
        clipPath: 'inset(0% 0% 0% 0% round 0rem)',
      });
      gsap.set(copies, { autoAlpha: 0, y: 30 });
      gsap.set(copies[0], { autoAlpha: 1, y: 0 });
      gsap.set(progressBars, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(coatingSweeps, { autoAlpha: 0, scaleX: 0, transformOrigin: 'left center' });
      gsap.set(splashes, { autoAlpha: 0, scale: 0.08, transformOrigin: '50% 55%' });
      gsap.set(section.querySelectorAll('[data-surface-splash] [data-splash-drop]'), { autoAlpha: 0, scale: 0.1 });

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          id: 'one-brand-scroll-chapter',
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.round(section.clientHeight * surfaces.length)}`,
          pin: true,
          pinSpacing: true,
          scrub: window.matchMedia('(max-width: 767px)').matches ? 0.35 : 0.7,
          invalidateOnRefresh: true,
        },
      });

      surfaces.forEach((_, index) => {
        const sceneStart = index;
        const splash = splashes[index];
        const splashDrops = splash?.querySelectorAll('[data-splash-drop]') ?? [];
        const sceneProgressBars = Array.from(
          section.querySelectorAll<HTMLElement>(`[data-surface-progress="${index}"]`),
        );
        timeline.to(sceneProgressBars, { scaleX: 1, duration: 1 }, sceneStart);

        if (splash) {
          timeline
            .to(splash, {
              autoAlpha: index === 1 ? 0.5 : 0.62,
              scale: 1.025,
              duration: index === 1 ? 0.52 : 0.4,
              ease: 'expo.out',
            }, sceneStart + 0.08)
            .to(splash, { scale: 1, duration: 0.38, ease: 'power2.out' }, sceneStart + 0.46)
            .to(splashDrops, {
              autoAlpha: 0.86,
              scale: 1,
              duration: 0.52,
              stagger: 0.025,
              ease: 'power3.out',
            }, sceneStart + 0.14);
        }

        if (index === 0) return;

        timeline.to(splashes[index - 1], {
          autoAlpha: 0,
          duration: 0.18,
          ease: 'power2.out',
        }, sceneStart - 0.02);

        timeline
          .fromTo(coatingSweeps[index], {
            autoAlpha: 0.76,
            scaleX: 0,
            transformOrigin: index === 3 ? 'right center' : 'left center',
          }, {
            autoAlpha: 0.32,
            scaleX: 1,
            duration: index === 2 ? 0.58 : 0.4,
            ease: index === 4 ? 'power3.in' : 'power2.inOut',
          }, sceneStart - 0.04)
          .to(coatingSweeps[index], { autoAlpha: 0, duration: 0.3 }, sceneStart + 0.34)
          .to(images[index - 1], {
            autoAlpha: 0,
            scale: 0.985,
            yPercent: -3,
            duration: 0.46,
          }, sceneStart)
          .fromTo(images[index], {
            autoAlpha: 0,
            scale: 1.1,
            yPercent: 3,
            clipPath: 'inset(7% 4% 7% 4% round 2rem)',
          }, {
            autoAlpha: 1,
            scale: 1.035,
            yPercent: 0,
            clipPath: 'inset(0% 0% 0% 0% round 0rem)',
            duration: 0.72,
          }, sceneStart - 0.02)
          .to(copies[index - 1], {
            autoAlpha: 0,
            y: -18,
            duration: 0.28,
          }, sceneStart)
          .fromTo(copies[index], {
            autoAlpha: 0,
            y: 30,
          }, {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
          }, sceneStart + 0.2);
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="spaces"
      className="relative isolate h-[100svh] overflow-hidden bg-ink text-white"
      aria-label="One Brand. Many Surfaces."
    >
      <div className="absolute inset-0">
        {surfaces.map((surface, index) => (
          <div
            key={surface.id}
            data-surface-image
            className={`absolute inset-0 ${index === 0 ? 'opacity-100' : 'opacity-0'}`}
            style={{ zIndex: index + 1 }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${surface.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070A13]/95 via-[#070A13]/55 to-[#070A13]/15" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070A13]/80 via-transparent to-[#070A13]/45" />
            <div
              data-surface-coating
              data-surface-kind={surface.id}
              className="surface-coating-reveal"
              style={{ '--surface-accent': surface.accent } as CSSProperties}
            />
            <span data-surface-splash data-surface-kind={surface.id} className="surface-splash">
              <PaintSplash
                color={surface.accent}
                size={surfaceSplashStyles[index]?.size ?? 'medium'}
                variant={surfaceSplashStyles[index]?.variant ?? 'impact'}
                trigger="static"
              />
            </span>
          </div>
        ))}
      </div>

      <FloatingPaintBubbles
        count={12}
        mobileCount={4}
        tabletCount={8}
        placement="surfaces"
        accent="#ffd400"
        className="one-brand-bubbles"
      />

      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col px-5 pb-8 pt-24 sm:px-8 sm:pb-10 md:px-14 md:pt-28 lg:px-20">
        <header className="relative isolate max-w-2xl" data-splash-trigger>
          <PaintSplash
            color="#e6007e"
            size="medium"
            variant="wide"
            trigger="scroll"
            className="section-title-splash"
          />
          <div className="mb-3 inline-flex items-center rounded-full border border-magenta/40 bg-magenta/20 px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-pink-200 backdrop-blur-md">
            One Brand
          </div>
          <h2 data-paint-heading className="paint-heading font-display text-3xl leading-[0.98] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            One Brand. <em className="text-magenta">Many Surfaces.</em>
          </h2>
          <p className="mt-3 max-w-xl text-xs leading-relaxed text-white/72 sm:text-sm md:text-base">
            From walls to wood, structural steel to automotive refinishing — one trusted partner across every coat.
          </p>
        </header>

        <div className="relative mt-auto min-h-[150px] max-w-xl sm:min-h-[165px]">
          {surfaces.map((surface, index) => (
            <div
              key={surface.id}
              data-surface-copy
              className={`absolute bottom-0 left-0 ${index === 0 ? 'opacity-100' : 'opacity-0'}`}
            >
              <div className="mb-2 flex items-center gap-3">
                <span className="font-mono text-xs font-bold tracking-[0.22em]" style={{ color: surface.accent }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="h-px w-10" style={{ backgroundColor: surface.accent }} />
                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/60">
                  Surface Application
                </span>
              </div>
              <h3 className="font-display text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
                {surface.name}
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-white/78 sm:text-base">
                {surface.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-5 gap-2 lg:hidden" aria-hidden="true">
          {surfaces.map((surface, index) => (
            <span key={surface.id} className="h-px overflow-hidden bg-white/20">
              <span data-surface-progress={index} className="block h-full w-full" style={{ backgroundColor: surface.accent }} />
            </span>
          ))}
        </div>
      </div>

      <aside className="pointer-events-none absolute bottom-12 right-8 top-32 z-30 hidden w-56 flex-col justify-end gap-4 lg:flex xl:right-14" aria-hidden="true">
        {surfaces.map((surface, index) => (
          <div key={surface.id} className="grid grid-cols-[2rem_1fr] items-center gap-3">
            <span className="font-mono text-[10px] text-white/45">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/70">{surface.name}</div>
              <div className="h-px overflow-hidden bg-white/20">
                <span data-surface-progress={index} className="block h-full w-full" style={{ backgroundColor: surface.accent }} />
              </div>
            </div>
          </div>
        ))}
      </aside>
    </section>
  );
}

export default OneBrandManySurfaces;

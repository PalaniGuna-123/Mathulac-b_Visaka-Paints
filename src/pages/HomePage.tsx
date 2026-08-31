import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '../lib/animation';
import { Hero } from '../features/hero';
import { HomepageVisualizer } from '../features/paint-studio';
import { OneBrandManySurfaces, WoodSection, AutoSection, DecorSection } from '../features/surfaces';
import { ServicesSection } from '../features/services';
import { ColorPaletteSection, ColorScrollSection } from '../features/palette';
import { CompanyStory, TrustSection } from '../features/about';
import { ContactSection } from '../features/contact';
import { useSmoothScroll } from '../providers/smoothScrollContext';

export function HomePage() {
  const { scrollTo: smoothScrollTo } = useSmoothScroll();

  // GSAP scroll reveals
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Double-RAF: wait for Lenis to tick once + ScrollTrigger.refresh() to finish
    // before measuring element positions. Without this, reveals fire at wrong
    // scroll offsets because the hero pin hasn't been committed yet.
    let raf1 = 0;
    let raf2 = 0;
    let ctx: ReturnType<typeof gsap.context> | null = null;

    raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => {
        ctx = gsap.context(() => {
          // Common ScrollTrigger config shared by all reveal triggers.
          // refreshPriority: 10 ensures these are refreshed AFTER the hero pin
          // (which uses refreshPriority: 30), so measurements are correct.
          const revealDefaults = {
            once: true,
            refreshPriority: 10,
          };

          gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
            gsap.from(el, {
              opacity: 0,
              y: 32,
              duration: 0.75,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 88%', ...revealDefaults },
            });
          });

          gsap.utils.toArray<HTMLElement>('[data-reveal-left]').forEach((el) => {
            gsap.from(el, {
              opacity: 0,
              x: -45,
              duration: 0.75,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 88%', ...revealDefaults },
            });
          });

          gsap.utils.toArray<HTMLElement>('[data-reveal-right]').forEach((el) => {
            gsap.from(el, {
              opacity: 0,
              x: 45,
              duration: 0.75,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 88%', ...revealDefaults },
            });
          });

          gsap.utils.toArray<HTMLElement>('[data-paint-heading]').forEach((el) => {
            gsap.fromTo(
              el,
              { '--paint-progress': 0 },
              {
                '--paint-progress': 1,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 84%', ...revealDefaults },
              },
            );
          });

          // Decorative paint stroke path
          const stroke = document.getElementById('paint-stroke-path') as unknown as SVGPathElement | null;
          if (stroke && typeof stroke.getTotalLength === 'function') {
            const len = stroke.getTotalLength();
            gsap.set(stroke, { strokeDasharray: len, strokeDashoffset: len });
            gsap.to(stroke, {
              strokeDashoffset: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: stroke.closest('section'),
                start: 'top 70%',
                end: 'bottom 60%',
                scrub: true,
                refreshPriority: 10,
              },
            });
          }

          // Refresh after setting up all triggers so Lenis scroll positions
          // are baked into each trigger's start/end values.
          ScrollTrigger.refresh();
        });
      });
    });

    return () => {
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
      ctx?.revert();
    };
  }, []);

  const scrollTo = (id: string) => {
    smoothScrollTo(`#${id}`);
  };

  return (
    <div className="w-full">
      <Hero scrollTo={scrollTo} />
      <HomepageVisualizer />
      <div className="section-paint-divider section-paint-divider--coral" aria-hidden="true">
        <span data-paint-heading />
        <i />
      </div>
      <OneBrandManySurfaces />
      <WoodSection />
      <AutoSection />
      <DecorSection />
      <ServicesSection />
      <ColorPaletteSection />
      <ColorScrollSection />
      <CompanyStory />
      <TrustSection />
      <ContactSection />
    </div>
  );
}

export default HomePage;

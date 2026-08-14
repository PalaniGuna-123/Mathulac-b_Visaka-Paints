import { useEffect } from 'react';
import { gsap } from '../lib/animation';
import { Hero } from '../features/hero';
import { PaintStudio } from '../features/paint-studio';
import { HomepageVisualizer } from '../features/paint-studio';
import { ProductShowcase } from '../features/products';
import { OneBrandManySurfaces, WoodSection, AutoSection, DecorSection } from '../features/surfaces';
import { ServicesSection } from '../features/services';
import { ColorPaletteSection, ColorScrollSection } from '../features/palette';
import { BeforeAfter } from '../features/comparison';
import { CompanyStory, TrustSection } from '../features/about';
import { ContactSection } from '../features/contact';
import { useSmoothScroll } from '../providers/smoothScrollContext';

export function HomePage() {
  const { scrollTo: smoothScrollTo } = useSmoothScroll();
  // GSAP scroll reveals
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal-left]').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          x: -45,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal-right]').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          x: 45,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
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
            scrollTrigger: { trigger: el, start: 'top 84%', once: true },
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
          scrollTrigger: { trigger: stroke.closest('section'), start: 'top 70%', end: 'bottom 60%', scrub: true },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    smoothScrollTo(`#${id}`);
  };

  return (
    <div className="w-full">
      <Hero scrollTo={scrollTo} />
      <PaintStudio scrollTo={scrollTo} />
      <HomepageVisualizer />
      <div className="section-paint-divider section-paint-divider--blue" aria-hidden="true">
        <span data-paint-heading />
        <i />
        <i />
      </div>
      <ProductShowcase scrollTo={scrollTo} />
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
      <BeforeAfter />
      <CompanyStory />
      <TrustSection />
      <ContactSection />
    </div>
  );
}

export default HomePage;

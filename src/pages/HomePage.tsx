import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero } from '../features/hero';
import { PaintStudio } from '../features/paint-studio';
import { ProductShowcase } from '../features/products';
import { OneBrandManySurfaces, WoodSection, AutoSection, DecorSection } from '../features/surfaces';
import { ServicesSection } from '../features/services';
import { ColorPaletteSection, ColorScrollSection } from '../features/palette';
import { BeforeAfter } from '../features/comparison';
import { CompanyStory, TrustSection } from '../features/about';
import { ContactSection } from '../features/contact';

gsap.registerPlugin(ScrollTrigger);

export function HomePage() {
  // GSAP scroll reveals
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      <Hero scrollTo={scrollTo} />
      <PaintStudio scrollTo={scrollTo} />
      <ProductShowcase scrollTo={scrollTo} />
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

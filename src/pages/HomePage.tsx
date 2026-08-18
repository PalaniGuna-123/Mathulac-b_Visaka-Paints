import { lazy, Suspense, useEffect } from 'react';
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

const HomepageVisualizer = lazy(() => import('../features/paint-studio/HomepageVisualizer'));
const ProductShowcase = lazy(() => import('../features/products/ProductShowcase'));
const OneBrandManySurfaces = lazy(() => import('../features/surfaces/OneBrandManySurfaces'));
const WoodSection = lazy(() => import('../features/surfaces/WoodSection'));
const AutoSection = lazy(() => import('../features/surfaces/AutoSection'));
const DecorSection = lazy(() => import('../features/surfaces/DecorSection'));
const ServicesSection = lazy(() => import('../features/services/ServicesSection'));
const ColorPaletteSection = lazy(() => import('../features/palette/ColorPaletteSection'));
const ColorScrollSection = lazy(() => import('../features/palette/ColorScrollSection'));
const BeforeAfter = lazy(() => import('../features/comparison/BeforeAfter'));
const CompanyStory = lazy(() => import('../features/about/CompanyStory'));
const TrustSection = lazy(() => import('../features/about/TrustSection'));
const ContactSection = lazy(() => import('../features/contact/ContactSection'));

function SectionFallback() {
  return <div className="min-h-[200px]" />;
}

export function HomePage() {
  const { scrollTo: smoothScrollTo } = useSmoothScroll();

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
      <Suspense fallback={<SectionFallback />}>
        <HomepageVisualizer />
      </Suspense>
      <PaintStudio scrollTo={scrollTo} />
      <HomepageVisualizer />
      <div className="section-paint-divider section-paint-divider--blue" aria-hidden="true">
        <span data-paint-heading />
        <i />
        <i />
      </div>
      <Suspense fallback={<SectionFallback />}>
        <ProductShowcase scrollTo={scrollTo} />
      </Suspense>
      <div className="section-paint-divider section-paint-divider--coral" aria-hidden="true">
        <span data-paint-heading />
        <i />
      </div>
      <Suspense fallback={<SectionFallback />}>
        <OneBrandManySurfaces />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <WoodSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <AutoSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <DecorSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ServicesSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ColorPaletteSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ColorScrollSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <BeforeAfter />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <CompanyStory />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <TrustSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ContactSection />
      </Suspense>
    </div>
  );
}

export default HomePage;

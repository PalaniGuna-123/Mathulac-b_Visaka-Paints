import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { cinematicHero } from '../../data/brand';
import { createHeroMotionState, getHeroViewportProfile } from './heroMotion';
import { useHeroTimeline } from './useHeroTimeline';

const HeroScene = lazy(() => import('./HeroScene'));

const closedBucketUrl = '/assets/hero/bucket/muthulac-bucket-closed-CV8ODW7x.webp';
const houseUnpaintedUrl = '/assets/hero/house/house-00-unpainted.webp';
const housePaintStageOneUrl = '/assets/hero/house/house-01-base-painted.webp';
const housePaintStageTwoUrl = '/assets/hero/house/house-02-blue-painted.webp';
const housePaintStageThreeUrl = '/assets/hero/house/house-03-accent-painted.webp';
const housePaintStageFourUrl = '/assets/hero/house/house-04-details-painted.webp';
const housePaintStageFiveUrl = '/assets/hero/house/house-05-luxury-final.webp';
const paintFlowUrl = '/assets/hero/paint/blue-paint-splash.png';

const heroPreloadAssets = [
  houseUnpaintedUrl,
  housePaintStageOneUrl,
  housePaintStageTwoUrl,
  housePaintStageThreeUrl,
  housePaintStageFourUrl,
  housePaintStageFiveUrl,
  '/assets/hero/masks/wall-main-mask.png',
  '/assets/hero/masks/wall-secondary-mask.png',
  '/assets/hero/masks/accent-mask.png',
  '/assets/hero/masks/trims-mask.png',
  '/assets/hero/masks/facade-mask.png',
  '/assets/hero/environment/background-plants.webp',
  '/assets/hero/environment/foreground-plants.webp',
  '/assets/hero/environment/ground-shadow.webp',
];

const heroChapters = [
  {
    id: 'paint',
    eyebrow: 'Colour in Motion',
    headline: 'One Stroke. Endless Possibilities.',
    supporting: 'From expressive colour to lasting protection, every coat is designed to make surfaces stand apart.',
  },
  {
    id: 'canvas',
    eyebrow: 'The Canvas',
    headline: 'Every Surface Starts With Possibility.',
    supporting: 'See how thoughtful colour and protection can completely transform architecture.',
  },
  {
    id: 'base',
    eyebrow: 'Base Protection',
    headline: 'A Strong Foundation for Every Finish.',
    supporting: 'Build durability from the first layer with coatings designed for long-term surface performance.',
  },
  {
    id: 'blue',
    eyebrow: 'Signature Colour',
    headline: 'Bring Architecture to Life.',
    supporting: 'Rich Muthulac shades give surfaces character, depth, and a premium visual identity.',
  },
  {
    id: 'accent',
    eyebrow: 'Architectural Accents',
    headline: 'Designed to Make Every Detail Stand Out.',
    supporting: 'Carefully selected colours and finishes define architectural forms while protecting every surface.',
  },
  {
    id: 'details',
    eyebrow: 'Refined Finish',
    headline: 'Precision in Every Edge.',
    supporting: 'From trims and entrances to balconies, Muthulac creates a cleaner, more sophisticated exterior.',
    features: ['Smooth Finish', 'Weather Protection', 'Long-Lasting Colour'],
  },
] as const;

interface HeroProps {
  scrollTo?: (id: string) => void;
}

function canUseWebGL() {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!context) return false;
    context.getExtension('WEBGL_lose_context')?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export function Hero({ scrollTo }: HeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const chaptersRef = useRef<HTMLDivElement>(null);
  const finalRevealRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLSpanElement>(null);
  const motion = useRef(createHeroMotionState());
  const [webglAvailable] = useState(canUseWebGL);
  const [sceneReady, setSceneReady] = useState(!webglAvailable);
  const [sceneActive, setSceneActive] = useState(true);
  const [profile, setProfile] = useState(() => getHeroViewportProfile(window.innerWidth));
  const reducedMotion = useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  useEffect(() => {
    const handleResize = () => setProfile(getHeroViewportProfile(window.innerWidth));
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const preloaders = heroPreloadAssets.map((src) => {
      const image = new Image();
      image.decoding = 'async';
      image.src = src;
      return image;
    });
    return () => preloaders.forEach((image) => {
      image.src = '';
    });
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !webglAvailable) return;
    const observer = new IntersectionObserver(
      ([entry]) => setSceneActive(entry.isIntersecting),
      { rootMargin: '75% 0px' },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [webglAvailable]);

  // Keep the scroll story available even if WebGL initialisation is delayed or unavailable.
  // The static poster remains the entry fallback and the DOM house layers carry the rest.
  useEffect(() => {
    if (sceneReady) return;
    const fallbackTimer = window.setTimeout(() => setSceneReady(true), 1400);
    return () => window.clearTimeout(fallbackTimer);
  }, [sceneReady]);

  const timelineRefs = useMemo(
    () => ({
      root: rootRef,
      stage: stageRef,
      backdrop: backdropRef,
      poster: posterRef,
      story: storyRef,
      chapters: chaptersRef,
      finalReveal: finalRevealRef,
      content: contentRef,
      progressLine: progressLineRef,
    }),
    [],
  );

  useHeroTimeline({
    motion,
    profile,
    ready: sceneReady,
    useWebGL: webglAvailable,
    refs: timelineRefs,
  });

  const handleSceneReady = useCallback(() => setSceneReady(true), []);

  const handleCtaClick = () => {
    if (scrollTo) {
      scrollTo('studio');
      return;
    }
    document.getElementById('studio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFinalCtaClick = (id: 'palette' | 'products') => {
    if (scrollTo) {
      scrollTo(id);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="top"
      ref={rootRef}
      className="cinematic-hero"
      aria-labelledby="hero-heading"
      data-hero-profile={profile}
      data-hero-ready={sceneReady ? 'true' : 'false'}
    >
      <div ref={stageRef} className="cinematic-hero__stage">
        <div ref={backdropRef} className="cinematic-hero__backdrop" aria-hidden="true" />
        <div className="cinematic-hero__halo cinematic-hero__halo--blue" aria-hidden="true" />
        <div className="cinematic-hero__halo cinematic-hero__halo--magenta" aria-hidden="true" />

        <div ref={posterRef} className="cinematic-hero__poster" aria-hidden="true">
          <img src={closedBucketUrl} alt="" width="1280" height="853" />
        </div>

        <div className="cinematic-hero__webgl" aria-hidden="true">
          {webglAvailable && (
            <Suspense fallback={null}>
              <HeroScene
                motion={motion}
                profile={profile}
                reducedMotion={reducedMotion}
                active={sceneActive}
                onReady={handleSceneReady}
              />
            </Suspense>
          )}
        </div>

        <div ref={storyRef} className="cinematic-hero__story" aria-hidden="true">
          {!webglAvailable && (
            <>
              <div className="cinematic-hero__story-glow" />
              <img data-hero-house="base" src={houseUnpaintedUrl} alt="" width="1536" height="1024" />
              <img data-hero-house="stage-one" src={housePaintStageOneUrl} alt="" width="1536" height="1024" />
              <img data-hero-house="stage-two" src={housePaintStageTwoUrl} alt="" width="1536" height="1024" />
              <img data-hero-house="stage-three" src={housePaintStageThreeUrl} alt="" width="1536" height="1024" />
              <img data-hero-house="stage-four" src={housePaintStageFourUrl} alt="" width="1536" height="1024" />
              <img data-hero-house="stage-five" src={housePaintStageFiveUrl} alt="" width="1536" height="1024" />
              <img data-hero-paint-flow src={paintFlowUrl} alt="" width="1672" height="941" />
            </>
          )}
        </div>

        <div ref={chaptersRef} className="cinematic-hero__chapters" aria-hidden="true">
          {heroChapters.map((chapter) => (
            <article key={chapter.id} data-hero-chapter={chapter.id} className="cinematic-hero__chapter">
              <span>{chapter.eyebrow}</span>
              <h2>{chapter.headline}</h2>
              <p>{chapter.supporting}</p>
              {'features' in chapter && (
                <div className="cinematic-hero__chapter-features">
                  {chapter.features.map((feature) => <small key={feature}>{feature}</small>)}
                </div>
              )}
            </article>
          ))}
        </div>

        <div
          ref={finalRevealRef}
          className="cinematic-hero__final"
          role="group"
          aria-labelledby="hero-final-heading"
        >
          <span data-hero-final-copy>{cinematicHero.finalEyebrow}</span>
          <strong id="hero-final-heading" data-hero-final-copy>{cinematicHero.finalHeadline}</strong>
          <p data-hero-final-copy>{cinematicHero.finalSupporting}</p>
          <div data-hero-final-actions className="cinematic-hero__final-actions">
            <button className="paint-button" type="button" onClick={() => handleFinalCtaClick('palette')} data-cursor="explore">
              {cinematicHero.finalPrimaryCta}
              <ArrowRight aria-hidden="true" />
            </button>
            <button className="paint-button" type="button" onClick={() => handleFinalCtaClick('products')} data-cursor="explore">
              {cinematicHero.finalSecondaryCta}
            </button>
          </div>
          <small data-hero-final-copy className="cinematic-hero__final-trust">Beautiful finishes. Reliable protection. Built to last.</small>
        </div>

        <div ref={contentRef} className="cinematic-hero__content">
          <div data-hero-reveal data-hero-eyebrow className="cinematic-hero__eyebrow">
            <span>{cinematicHero.eyebrow}</span>
          </div>
          <span data-hero-rule className="cinematic-hero__rule" aria-hidden="true" />
          <h1 id="hero-heading" data-hero-reveal data-hero-heading>
            {cinematicHero.headline} <em>{cinematicHero.headlineAccent}</em>
          </h1>
          <p data-hero-reveal data-hero-copy>
            {cinematicHero.supportingText}
          </p>
          <button
            type="button"
            data-hero-reveal
            data-hero-cta
            className="paint-button cinematic-hero__cta"
            onClick={handleCtaClick}
            data-cursor="explore"
          >
            {cinematicHero.cta}
            <ArrowRight aria-hidden="true" />
          </button>
          <div data-hero-reveal data-hero-scroll className="cinematic-hero__scroll-cue" aria-hidden="true">
            <ArrowDown />
            <span>{cinematicHero.scrollCue}</span>
          </div>
        </div>

        <aside className="cinematic-hero__progress" aria-hidden="true">
          <span className="cinematic-hero__progress-number">{cinematicHero.chapter}</span>
          <span className="cinematic-hero__progress-track">
            <span ref={progressLineRef} />
          </span>
          <span className="cinematic-hero__progress-label">{cinematicHero.chapterLabel}</span>
        </aside>

        <div className="cinematic-hero__edition" aria-hidden="true">
          <span>{cinematicHero.edition}</span>
          <span>{cinematicHero.storyLabel}</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;

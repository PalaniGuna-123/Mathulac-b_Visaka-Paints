import { useLayoutEffect, type MutableRefObject, type RefObject } from 'react';
import { gsap } from '../../lib/animation';
import { heroNav } from '../../lib/heroPhase';
import { createHeroMotionState, type HeroMotionState, type HeroViewportProfile } from './heroMotion';

interface HeroTimelineRefs {
  root: RefObject<HTMLElement>;
  stage: RefObject<HTMLDivElement>;
  backdrop: RefObject<HTMLDivElement>;
  poster: RefObject<HTMLDivElement>;
  story: RefObject<HTMLDivElement>;
  chapters: RefObject<HTMLDivElement>;
  finalReveal: RefObject<HTMLDivElement>;
  content: RefObject<HTMLDivElement>;
  progressLine: RefObject<HTMLSpanElement>;
}

interface UseHeroTimelineOptions {
  motion: MutableRefObject<HeroMotionState>;
  profile: HeroViewportProfile;
  ready: boolean;
  useWebGL: boolean;
  refs: HeroTimelineRefs;
}

export function useHeroTimeline({ motion, profile, ready, useWebGL, refs }: UseHeroTimelineOptions) {
  useLayoutEffect(() => {
    if (!ready) return;

    const root = refs.root.current;
    const stage = refs.stage.current;
    const backdrop = refs.backdrop.current;
    const poster = refs.poster.current;
    const story = refs.story.current;
    const chapters = refs.chapters.current;
    const finalReveal = refs.finalReveal.current;
    const content = refs.content.current;
    const progressLine = refs.progressLine.current;
    if (!root || !stage || !backdrop || !story || !chapters || !finalReveal || !content || !progressLine) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scrollDistance = profile === 'mobile' ? 6.6 : profile === 'tablet' ? 7.6 : 9.2;
    const motionState = motion.current;
    const progressProperty = profile === 'mobile' ? 'scaleX' : 'scaleY';
    const houseStageOne = story.querySelector<HTMLElement>('[data-hero-house="stage-one"]');
    const houseStageTwo = story.querySelector<HTMLElement>('[data-hero-house="stage-two"]');
    const houseStageThree = story.querySelector<HTMLElement>('[data-hero-house="stage-three"]');
    const houseStageFour = story.querySelector<HTMLElement>('[data-hero-house="stage-four"]');
    const houseStageFive = story.querySelector<HTMLElement>('[data-hero-house="stage-five"]');
    const paintFlow = story.querySelector<HTMLElement>('[data-hero-paint-flow]');
    const fallbackHouseLayers = [
      houseStageOne,
      houseStageTwo,
      houseStageThree,
      houseStageFour,
      houseStageFive,
    ].filter(
      (element): element is HTMLElement => Boolean(element),
    );
    const chapterElements = gsap.utils.toArray<HTMLElement>('[data-hero-chapter]', chapters);
    const chapter = (id: string) => chapters.querySelector<HTMLElement>(`[data-hero-chapter="${id}"]`);
    const finalCopy = finalReveal.querySelectorAll<HTMLElement>('[data-hero-final-copy]');
    const finalActions = finalReveal.querySelector<HTMLElement>('[data-hero-final-actions]');
    const heroSplashes = Array.from(root.querySelectorAll<HTMLElement>('.cinematic-hero__splash'));
    const impactSplash = root.querySelector<HTMLElement>('.cinematic-hero__splash--impact');
    const accelerateSplash = root.querySelector<HTMLElement>('.cinematic-hero__splash--accelerate');

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        Object.assign(motionState, {
          master: 1,
          intro: 1,
          paintProgress: 1,
          bucketExit: 0.68,
          transition: 1,
          houseReveal: 1,
          housePaint: 1,
          houseBase: 1,
          houseBlue: 1,
          houseAccent: 1,
          houseDetails: 1,
          houseLuxury: 1,
          luxury: 1,
          finalHold: 1,
        });
        gsap.set(backdrop, { autoAlpha: 1 });
        gsap.set(content, { autoAlpha: 0 });
        gsap.set(chapterElements, { autoAlpha: 0 });
        gsap.set(poster, { autoAlpha: 0 });
        gsap.set(finalReveal, { autoAlpha: 1, y: 0 });
        gsap.set([finalCopy, finalActions], { autoAlpha: 1, y: 0 });
        gsap.set(heroSplashes, { autoAlpha: 0.34, scale: 1 });
        gsap.set(progressLine, { [progressProperty]: 1 });
        if (!useWebGL) {
          gsap.set(story, { autoAlpha: 1, scale: 1, xPercent: 0 });
          gsap.set(houseStageOne, { autoAlpha: 0 });
          gsap.set(houseStageTwo, { autoAlpha: 0 });
          gsap.set(houseStageThree, { autoAlpha: 0 });
          gsap.set(houseStageFour, { autoAlpha: 0 });
          gsap.set(houseStageFive, { autoAlpha: 1, clipPath: 'inset(0% 0% 0% 0%)' });
          gsap.set(paintFlow, { autoAlpha: 0 });
        }
        return;
      }

      Object.assign(motionState, createResetState());
      gsap.set(backdrop, { autoAlpha: 1 });
      gsap.set(content.querySelectorAll('[data-hero-reveal]'), { autoAlpha: 1, y: 0 });
      gsap.set(chapterElements, { autoAlpha: 0, y: 18, filter: 'blur(7px)' });
      gsap.set(content.querySelector('[data-hero-rule]'), { scaleX: 1, transformOrigin: 'left center' });
      gsap.set(progressLine, {
        [progressProperty]: 0,
        transformOrigin: profile === 'mobile' ? 'left center' : 'top center',
      });
      gsap.set(story, { autoAlpha: 0, scale: 1.18, xPercent: 7 });
      if (fallbackHouseLayers.length) {
        gsap.set(fallbackHouseLayers, {
          autoAlpha: 0,
          clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
        });
      }
      if (paintFlow) {
        gsap.set(paintFlow, { autoAlpha: 0, xPercent: -34, yPercent: -15, scale: 0.68, rotate: -7 });
      }
      gsap.set(finalReveal, { autoAlpha: 0, y: 28 });
      gsap.set(finalCopy, { autoAlpha: 0, y: 14 });
      gsap.set(finalActions, { autoAlpha: 0, y: 12 });
      gsap.set(heroSplashes, { autoAlpha: 0, scale: 0.08, transformOrigin: '50% 54%' });
      gsap.set(root.querySelectorAll('.cinematic-hero__splash [data-splash-drop]'), { autoAlpha: 0, scale: 0.1 });
      gsap.set(poster, { autoAlpha: useWebGL ? 0 : 1 });

      const heroTimeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: () => `+=${Math.round(window.innerHeight * scrollDistance)}`,
          pin: stage,
          pinSpacing: true,
          scrub: profile === 'mobile' ? 0.45 : 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 30,
          onUpdate(self) {
            heroNav.emit(self.progress >= 0.10 && self.progress < 0.35);
          },
        },
      });

      heroTimeline
        .addLabel('bucket', 0)
        .addLabel('paint', 10)
        .addLabel('bucketExit', 25)
        .addLabel('houseReveal', 35)
        .addLabel('houseBase', 45)
        .addLabel('houseBlue', 54)
        .addLabel('houseAccent', 63)
        .addLabel('houseDetails', 72)
        .addLabel('houseLuxury', 82)
        .addLabel('finalMessage', 93)
        .addLabel('brandHold', 98)
        .to(motionState, { master: 1, duration: 100 }, 0)
        .to(progressLine, { [progressProperty]: 1, duration: 100 }, 0)
        .to(poster, { autoAlpha: useWebGL ? 0 : 1, duration: 4, ease: 'power1.inOut' }, 0)
        .to(motionState, { intro: 1, duration: 10, ease: 'power2.out' }, 'bucket')
        .to(content.querySelector('[data-hero-scroll]'), { autoAlpha: 0, duration: 2.5 }, 5.5)
        .to(content, { autoAlpha: 0, y: -28, duration: 3, ease: 'power2.inOut' }, 7)
        .to(impactSplash, {
          autoAlpha: 0.78,
          scale: 1.04,
          rotation: -2,
          duration: 1.1,
          ease: 'expo.out',
        }, 10.15)
        .to(impactSplash?.querySelectorAll('[data-splash-drop]') ?? [], {
          autoAlpha: 1,
          scale: 1,
          duration: 1.3,
          stagger: 0.07,
          ease: 'power3.out',
        }, 10.28)
        .to(impactSplash, { autoAlpha: 0.45, scale: 1, duration: 2.5, ease: 'power2.out' }, 11.25)
        .to(accelerateSplash, {
          autoAlpha: 0.64,
          scale: 1.02,
          rotation: 1,
          duration: 1,
          ease: 'expo.out',
        }, 18.2)
        .to(accelerateSplash?.querySelectorAll('[data-splash-drop]') ?? [], {
          autoAlpha: 0.72,
          scale: 1,
          duration: 1.05,
          stagger: 0.055,
          ease: 'power3.out',
        }, 18.32)
        .to(accelerateSplash, { autoAlpha: 0.24, scale: 1, duration: 2.2, ease: 'power2.out' }, 19.2)
        // The first 48% of the Catmull-Rom curve is the product orbit.
        .to(motionState, { paintProgress: 0.48, duration: 15, ease: 'power1.inOut' }, 'paint')
        .to(motionState, { bucketExit: 1, duration: 10, ease: 'power2.inOut' }, 'bucketExit')
        .to(motionState, { transition: 1, duration: 15, ease: 'power2.inOut' }, 'bucketExit')
        .to(motionState, { paintProgress: 1, duration: 15, ease: 'power1.inOut' }, 'bucketExit')
        .to(motionState, { houseReveal: 1, duration: 10, ease: 'power2.inOut' }, 'houseReveal')
        .to(motionState, { housePaint: 1, duration: 48, ease: 'none' }, 'houseBase')
        .to(motionState, { houseBase: 1, duration: 9, ease: 'none' }, 'houseBase')
        .to(motionState, { houseBlue: 1, duration: 9, ease: 'none' }, 'houseBlue')
        .to(motionState, { houseAccent: 1, duration: 9, ease: 'none' }, 'houseAccent')
        .to(motionState, { houseDetails: 1, duration: 10, ease: 'none' }, 'houseDetails')
        .to(motionState, { houseLuxury: 1, duration: 11, ease: 'none' }, 'houseLuxury')
        .to(motionState, { luxury: 1, duration: 11, ease: 'power2.inOut' }, 'houseLuxury')
        .to(finalReveal, { autoAlpha: 1, y: 0, duration: 2.5, ease: 'power3.out' }, 'finalMessage')
        .to(finalCopy, { autoAlpha: 1, y: 0, duration: 2.4, stagger: 0.25, ease: 'power3.out' }, 93.3)
        .to(finalActions, { autoAlpha: 1, y: 0, duration: 2, ease: 'power3.out' }, 95)
        .to(motionState, { finalHold: 1, duration: 2 }, 'brandHold');

      const chapterWindows: Array<[string, number, number]> = [
        ['paint', 10.7, 23.2],
        ['canvas', 36, 43.6],
        ['base', 45.7, 52.8],
        ['blue', 54.7, 61.8],
        ['accent', 63.7, 70.8],
        ['details', 72.8, 80.8],
      ];
      chapterWindows.forEach(([id, enterAt, exitAt]) => {
        const element = chapter(id);
        if (!element) return;
        const children = element.querySelectorAll('span, h2, p, small');
        heroTimeline
          .to(element, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' }, enterAt)
          .fromTo(children, { y: 8, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 1.3, ease: 'power3.out' }, enterAt + 0.15)
          .to(element, { autoAlpha: 0, y: -10, filter: 'blur(3px)', duration: 1.25, ease: 'power2.inOut' }, exitAt);
      });

      if (!useWebGL) {
        // The fallback uses the same master timeline and only co-registered house assets.
        heroTimeline
          .to(poster, { rotate: -11, xPercent: 4, yPercent: 3, duration: 15, ease: 'power2.inOut' }, 10)
          .to(paintFlow, { autoAlpha: 1, xPercent: 3, yPercent: 0, scale: 1.16, rotate: 0, duration: 15 }, 10)
          .to(poster, { autoAlpha: 0, scale: 0.84, duration: 10 }, 25)
          .to(story, { autoAlpha: 1, scale: 1.02, xPercent: 0, duration: 10 }, 35)
          .to(paintFlow, { xPercent: 42, yPercent: 9, scale: 1.55, autoAlpha: 0.12, duration: 15 }, 25)
          .to(houseStageOne, {
            autoAlpha: 1,
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            duration: 9,
            ease: 'power1.inOut',
          }, 45)
          .to(houseStageTwo, {
            autoAlpha: 1,
            clipPath: 'polygon(0 0, 100% 4%, 100% 100%, 0 96%)',
            duration: 9,
            ease: 'power1.inOut',
          }, 54)
          .to(houseStageThree, {
            autoAlpha: 1,
            clipPath: 'polygon(0 5%, 100% 0, 100% 95%, 0 100%)',
            duration: 9,
            ease: 'power1.inOut',
          }, 63)
          .to(houseStageFour, {
            autoAlpha: 1,
            clipPath: 'polygon(0 0, 100% 6%, 100% 100%, 0 94%)',
            duration: 10,
            ease: 'power1.inOut',
          }, 72)
          .to(houseStageFive, {
            autoAlpha: 1,
            clipPath: 'polygon(0 4%, 100% 0, 100% 96%, 0 100%)',
            duration: 11,
            ease: 'power1.inOut',
          }, 82)
          .to(paintFlow, { autoAlpha: 0, duration: 7 }, 45);
      }
    }, root);

    return () => {
      ctx.revert();
      Object.assign(motionState, createResetState());
    };
  }, [motion, profile, ready, refs, useWebGL]);
}

function createResetState(): HeroMotionState {
  return createHeroMotionState();
}

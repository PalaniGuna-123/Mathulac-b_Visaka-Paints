import { useLayoutEffect, useMemo, useRef, type CSSProperties } from 'react';
import { gsap } from '../../lib/animation';

type BubblePlacement = 'ambient' | 'hero' | 'visualizer' | 'product' | 'surfaces' | 'cta';

interface FloatingPaintBubblesProps {
  accent?: string;
  className?: string;
  count?: number;
  cursor?: boolean;
  mobileCount?: number;
  parallax?: boolean;
  placement?: BubblePlacement;
  tabletCount?: number;
}

const placements: Record<BubblePlacement, Array<[number, number]>> = {
  ambient: [[5, 14], [92, 10], [7, 39], [96, 36], [15, 76], [88, 72], [34, 11], [68, 14], [3, 88], [97, 87], [26, 54], [79, 49], [42, 86], [61, 79], [17, 23], [83, 25], [34, 72], [73, 61]],
  hero: [[4, 18], [94, 15], [88, 35], [96, 66], [83, 81], [9, 88], [71, 11], [78, 57], [43, 8], [57, 90], [22, 92], [93, 89], [70, 74], [98, 48], [35, 89], [7, 64]],
  visualizer: [[3, 13], [94, 16], [7, 78], [90, 84], [35, 7], [66, 91], [98, 48], [2, 49], [77, 10], [22, 93], [92, 63], [11, 31], [83, 40], [50, 96]],
  product: [[4, 14], [95, 16], [7, 76], [91, 84], [32, 7], [69, 91], [98, 49], [2, 48], [82, 28], [18, 91], [88, 63], [14, 29], [75, 12], [45, 94]],
  surfaces: [[95, 14], [88, 31], [96, 53], [84, 72], [94, 88], [66, 9], [70, 87], [7, 90], [53, 94], [79, 18], [99, 40], [62, 77], [83, 58], [91, 76]],
  cta: [[4, 12], [95, 15], [8, 42], [93, 46], [5, 82], [91, 87], [27, 7], [72, 9], [20, 91], [79, 94], [98, 67], [2, 65]],
};

const pearlPalette = ['#fffdf6', '#f4f0e8', '#eef0f4', '#fff8e8'];

export function FloatingPaintBubbles({
  accent = '#0B67C9',
  className = '',
  count = 14,
  cursor = true,
  mobileCount = 5,
  parallax = true,
  placement = 'ambient',
  tabletCount = 10,
}: FloatingPaintBubblesProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const bubbles = useMemo(() => {
    const positions = placements[placement];
    return Array.from({ length: Math.min(count, positions.length) }, (_, index) => {
      const depth = (index % 3) + 1;
      const tone = index % 7 === 5 ? 'blue' : index % 11 === 7 ? 'accent' : 'pearl';
      const color = tone === 'blue' ? '#0b67c9' : tone === 'accent' ? accent : pearlPalette[index % pearlPalette.length];
      return {
        color,
        depth,
        form: index % 5,
        position: positions[index],
        size: 12 + ((index * 17) % 38) + depth * 3,
        tone,
      };
    });
  }, [accent, count, placement]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const slots = Array.from(root.querySelectorAll<HTMLElement>('[data-paint-bubble-slot]'));
    const orbits = Array.from(root.querySelectorAll<HTMLElement>('[data-paint-bubble-orbit]'));
    const bodies = Array.from(root.querySelectorAll<HTMLElement>('[data-paint-bubble-body]'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!slots.length || reducedMotion) return;

    const ctx = gsap.context(() => {
      orbits.forEach((orbit, index) => {
        const direction = index % 2 === 0 ? 1 : -1;
        const depth = Number(slots[index].dataset.depth ?? 2);
        gsap.to(orbit, {
          x: direction * (5 + depth * 2.2),
          y: -(8 + depth * 4),
          rotation: direction * (4 + (index % 4) * 2.5),
          scaleX: 1 + depth * 0.012,
          scaleY: 1 - depth * 0.009,
          duration: 9 + (index % 6) * 1.35,
          delay: -(index % 5) * 1.7,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      if (parallax) {
        const section = root.closest('section') ?? root.parentElement ?? root;
        gsap.to(slots, {
          y: (index) => -18 - Number(slots[index].dataset.depth ?? 2) * 22,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.85,
          },
        });
      }
    }, root);

    const finePointer = cursor && window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 769px)').matches;
    let cursorFrame = 0;
    let pointerX = -1000;
    let pointerY = -1000;
    const setters = finePointer
      ? bodies.map((body) => ({
          x: gsap.quickTo(body, 'x', { duration: 0.72, ease: 'power3.out' }),
          y: gsap.quickTo(body, 'y', { duration: 0.72, ease: 'power3.out' }),
          scale: gsap.quickTo(body, 'scale', { duration: 0.85, ease: 'power3.out' }),
        }))
      : [];

    const updateCursorResponse = () => {
      cursorFrame = 0;
      slots.forEach((slot, index) => {
        const rect = slot.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = centerX - pointerX;
        const deltaY = centerY - pointerY;
        const distance = Math.hypot(deltaX, deltaY);
        const influence = Math.max(0, 1 - distance / 145);
        const magnitude = distance > 0 ? (8 * influence) / distance : 0;
        setters[index].x(deltaX * magnitude);
        setters[index].y(deltaY * magnitude);
        setters[index].scale(1 + influence * 0.035);
      });
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!cursorFrame) cursorFrame = window.requestAnimationFrame(updateCursorResponse);
    };

    if (finePointer) window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.cancelAnimationFrame(cursorFrame);
      window.removeEventListener('pointermove', handlePointerMove);
      gsap.killTweensOf(bodies);
      ctx.revert();
    };
  }, [bubbles.length, cursor, parallax]);

  return (
    <div ref={rootRef} className={`paint-bubble-field paint-bubble-field--${placement} ${className}`} aria-hidden="true">
      {bubbles.map((bubble, index) => (
        <span
          key={`${placement}-${index}`}
          className={`paint-bubble-slot paint-bubble-slot--form-${bubble.form}`}
          data-paint-bubble-slot
          data-depth={bubble.depth}
          data-tone={bubble.tone}
          data-mobile-visible={index < mobileCount ? 'true' : 'false'}
          data-tablet-visible={index < tabletCount ? 'true' : 'false'}
          style={{
            '--bubble-colour': bubble.color,
            '--bubble-left': `${bubble.position[0]}%`,
            '--bubble-size': `${bubble.size}px`,
            '--bubble-top': `${bubble.position[1]}%`,
          } as CSSProperties}
        >
          <i className="paint-bubble-orbit" data-paint-bubble-orbit>
            <b className="paint-bubble" data-paint-bubble-body />
          </i>
        </span>
      ))}
    </div>
  );
}

export default FloatingPaintBubbles;

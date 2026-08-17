import { useId, useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/animation';

export type PaintSplashSize = 'small' | 'medium' | 'large';
export type PaintSplashVariant = 'impact' | 'wide' | 'brush' | 'compact' | 'flow';
export type PaintSplashTrigger = 'mount' | 'scroll' | 'static';

interface PaintSplashProps {
  className?: string;
  color?: string;
  size?: PaintSplashSize;
  variant?: PaintSplashVariant;
  trigger?: PaintSplashTrigger;
}

const splashPaths: Record<PaintSplashVariant, string> = {
  impact: 'M78 22C85 31 96 22 102 32L119 19L113 40C127 35 140 43 131 54L153 59L131 66C144 78 133 90 118 83L121 107L102 88C94 104 77 101 74 85L60 108L60 83C45 96 31 86 40 72L16 86L34 63C19 65 9 53 25 47L11 31L42 40C38 25 50 16 63 29L72 6Z',
  wide: 'M26 48C39 34 58 36 72 28C85 20 94 28 104 35C119 28 142 35 137 49C151 55 146 69 130 72C116 83 101 76 87 82C69 90 49 82 42 72C27 75 10 64 18 54C10 46 18 39 26 48Z',
  brush: 'M10 55C31 39 53 45 76 34C99 23 124 32 151 22L145 48C132 55 141 64 125 68C106 74 90 65 73 76C53 89 33 76 15 84C24 72 5 68 10 55Z',
  compact: 'M79 28C88 17 102 25 100 38C114 33 124 45 114 55C127 64 116 79 101 73C96 89 78 91 73 76C58 87 44 76 50 63C36 55 45 40 59 43C58 30 70 24 79 28Z',
  flow: 'M54 18C73 23 81 35 98 38C119 42 134 52 128 67C142 76 129 91 112 85C103 103 82 92 81 78C66 92 45 85 48 68C29 68 22 51 38 43C32 32 42 21 54 18Z',
};

export function PaintSplash({
  className = '',
  color = '#0B67C9',
  size = 'medium',
  variant = 'impact',
  trigger = 'scroll',
}: PaintSplashProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const rawId = useId().replace(/:/g, '');
  const paintGradientId = `paint-splash-${rawId}`;
  const sheenGradientId = `paint-sheen-${rawId}`;

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || trigger === 'static') return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targetOpacity = Number.parseFloat(window.getComputedStyle(root).opacity) || 1;
    const main = root.querySelector<SVGGraphicsElement>('[data-splash-main]');
    const drops = Array.from(root.querySelectorAll<SVGGraphicsElement>('[data-splash-drop]'));
    if (!main) return;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(root, { autoAlpha: Math.min(targetOpacity, 0.58) });
        gsap.set([main, drops], { clearProps: 'transform' });
        return;
      }

      gsap.set(root, { autoAlpha: 0 });
      gsap.set(main, {
        scale: 0.06,
        rotation: variant === 'brush' ? -5 : -12,
        transformOrigin: '50% 54%',
      });
      drops.forEach((drop) => {
        const box = drop.getBBox();
        gsap.set(drop, {
          x: 80 - (box.x + box.width / 2),
          y: 58 - (box.y + box.height / 2),
          scale: 0.08,
          autoAlpha: 0,
          transformOrigin: 'center center',
        });
      });

      const play = () => {
        const timeline = gsap.timeline();
        timeline
          .set(root, { autoAlpha: targetOpacity })
          .to(main, {
            scale: 1.035,
            rotation: variant === 'brush' ? -1 : 0.8,
            duration: 0.42,
            ease: 'expo.out',
          })
          .to(main, {
            scale: 1,
            rotation: 0,
            duration: 0.44,
            ease: 'power2.out',
          }, 0.42)
          .to(drops, {
            x: 0,
            y: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 0.68,
            stagger: 0.035,
            ease: 'power3.out',
          }, 0.08);
      };

      if (trigger === 'mount') {
        play();
        return;
      }

      ScrollTrigger.create({
        trigger: root.closest('[data-splash-trigger]') ?? root,
        start: 'top 84%',
        once: true,
        onEnter: play,
      });
    }, root);

    return () => ctx.revert();
  }, [trigger, variant]);

  return (
    <span
      ref={rootRef}
      className={`paint-splash paint-splash--${size} paint-splash--${variant} ${className}`}
      style={{ '--splash-colour': color } as React.CSSProperties}
      data-paint-splash
      data-splash-variant={variant}
      aria-hidden="true"
    >
      <svg viewBox="0 0 160 120" role="presentation">
        <defs>
          <linearGradient id={paintGradientId} x1="24" y1="18" x2="128" y2="101" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.72" />
            <stop offset="0.17" stopColor={color} />
            <stop offset="0.72" stopColor={color} />
            <stop offset="1" stopColor={color} stopOpacity="0.94" />
          </linearGradient>
          <radialGradient id={sheenGradientId} cx="0" cy="0" r="1" gradientTransform="translate(63 40) rotate(43) scale(52 32)" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.72" />
            <stop offset="0.34" stopColor="#ffffff" stopOpacity="0.18" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g data-splash-main className="paint-splash__main">
          <path d={splashPaths[variant]} fill={`url(#${paintGradientId})`} />
          <path d={splashPaths[variant]} fill={`url(#${sheenGradientId})`} />
          <path
            d="M52 42C67 28 91 29 105 42C89 35 70 36 56 48C49 54 43 51 52 42Z"
            className="paint-splash__wet-highlight"
          />
          <path
            d="M45 69C63 83 91 87 112 68C101 91 69 98 48 82C40 76 37 70 45 69Z"
            className="paint-splash__depth"
          />
        </g>

        <g className="paint-splash__droplets">
          <ellipse data-splash-drop cx="19" cy="29" rx="6.5" ry="4.3" transform="rotate(28 19 29)" fill={`url(#${paintGradientId})`} />
          <ellipse data-splash-drop cx="133" cy="24" rx="4.2" ry="7" transform="rotate(36 133 24)" fill={`url(#${paintGradientId})`} />
          <ellipse data-splash-drop cx="146" cy="91" rx="5.4" ry="3.8" transform="rotate(-18 146 91)" fill={`url(#${paintGradientId})`} />
          <path data-splash-drop d="M23 96C28 88 37 92 35 100C33 108 18 106 23 96Z" fill={`url(#${paintGradientId})`} />
          <path data-splash-drop d="M99 111C101 103 111 101 114 108C118 117 96 121 99 111Z" fill={`url(#${paintGradientId})`} />
        </g>

        <g className="paint-splash__specks" fill={color}>
          <circle cx="8" cy="61" r="1.8" />
          <circle cx="42" cy="14" r="1.35" />
          <circle cx="118" cy="8" r="1.65" />
          <circle cx="154" cy="52" r="1.25" />
          <circle cx="63" cy="110" r="1.45" />
          <circle cx="139" cy="109" r="0.9" />
        </g>
      </svg>
    </span>
  );
}

export default PaintSplash;

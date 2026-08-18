import { useEffect, useRef } from 'react';

interface LoaderProps {
  progress: number;
  onComplete: () => void;
}

const BUBBLE_COUNT = 5;

interface Bubble {
  size: number;
  baseX: number;
  baseY: number;
  speed: number;
  phase: number;
  opacity: number;
}

export function Loader({ progress, onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const clampedProgress = Math.min(100, Math.max(0, progress));

  useEffect(() => {
    if (clampedProgress >= 100 && !completedRef.current) {
      completedRef.current = true;
      const timer = setTimeout(() => onCompleteRef.current(), 850);
      return () => clearTimeout(timer);
    }
  }, [clampedProgress]);

  // Init bubbles once
  useEffect(() => {
    const bubbles: Bubble[] = [];
    for (let i = 0; i < BUBBLE_COUNT; i++) {
      bubbles.push({
        size: 4 + Math.random() * 8,
        baseX: 10 + Math.random() * 80,
        baseY: 10 + Math.random() * 80,
        speed: 0.12 + Math.random() * 0.2,
        phase: Math.random() * Math.PI * 2,
        opacity: 0.1 + Math.random() * 0.15,
      });
    }
    bubblesRef.current = bubbles;
  }, []);

  // Bubble animation — desktop only
  useEffect(() => {
    const isDesktop = window.matchMedia('(hover: hover) and (min-width: 769px)').matches;
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let t = 0;
    const tick = () => {
      t += 0.008;
      const el = containerRef.current;
      if (!el) { rafRef.current = requestAnimationFrame(tick); return; }

      const dots = el.querySelectorAll<HTMLDivElement>('.loader-bubble');
      const rect = el.getBoundingClientRect();

      bubblesRef.current.forEach((b, i) => {
        const dot = dots[i];
        if (!dot) return;

        const fx = Math.sin(t * b.speed + b.phase) * 3;
        const fy = Math.cos(t * b.speed * 0.7 + b.phase) * 4;

        let px = 0, py = 0;
        const sx = rect.left + (b.baseX / 100) * rect.width;
        const sy = rect.top + (b.baseY / 100) * rect.height;
        const dx = mouseRef.current.x - sx;
        const dy = mouseRef.current.y - sy;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 120 && d > 0) {
          const f = (1 - d / 120) * 5;
          px = -(dx / d) * f;
          py = -(dy / d) * f;
        }

        dot.style.transform = `translate(${fx + px}px, ${fy + py}px)`;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className={`loader-overlay${clampedProgress >= 100 ? ' loader-overlay--done' : ''}`}
      role="status"
      aria-live="polite"
      aria-label={`Loading: ${clampedProgress}%`}
    >
      <div className="loader-content" ref={containerRef}>
        {/* Floating bubbles (desktop only via CSS) */}
        {bubblesRef.current.map((b, i) => (
          <div
            key={i}
            className="loader-bubble"
            style={{
              left: `${b.baseX}%`,
              top: `${b.baseY}%`,
              width: b.size,
              height: b.size,
              opacity: b.opacity,
            }}
          />
        ))}

        {/* Brand logo */}
        <div className="loader-brand">
          <img
            src="/assets/brand/mathulac-logo-nav.webp"
            alt="Mathulac"
            className="loader-logo"
            draggable={false}
          />
        </div>

        {/* Tagline */}
        <p className="loader-tagline">Preparing Your Colours</p>

        {/* Percentage */}
        <div className="loader-percent">{Math.round(clampedProgress)}%</div>

        {/* Liquid paint progress */}
        <div className="loader-track">
          {/* Background groove */}
          <div className="loader-groove" />
          {/* Paint fill with organic SVG mask */}
          <div className="loader-fill" style={{ width: `${clampedProgress}%` }}>
            <svg
              className="loader-fill-svg"
              viewBox="0 0 100 8"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M0,4 Q5,1 10,4 T20,3.5 T30,4.5 T40,3.8 T50,4.2 T60,3.6 T70,4.4 T80,3.9 T90,4.1 T100,4 L100,8 L0,8 Z"
                fill="url(#loaderBlue)"
              />
              <defs>
                <linearGradient id="loaderBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1a7aff" />
                  <stop offset="100%" stopColor="#146BFF" />
                </linearGradient>
              </defs>
            </svg>
            {/* Gloss highlight */}
            <div className="loader-fill-gloss" />
          </div>

          {/* Droplet at leading edge */}
          {clampedProgress > 3 && clampedProgress < 100 && (
            <div
              className="loader-droplet"
              style={{ left: `${clampedProgress}%` }}
            />
          )}

          {/* Splash burst at 100% */}
          {clampedProgress >= 100 && <div className="loader-splash" />}
        </div>
      </div>
    </div>
  );
}

export default Loader;

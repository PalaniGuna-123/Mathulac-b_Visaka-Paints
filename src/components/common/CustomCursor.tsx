import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -100, my = -100, rx = -100, ry = -100;
    let isMoving = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!isMoving) {
        rx = mx;
        ry = my;
        isMoving = true;
      }
    };

    let raf = 0;
    const loop = () => {
      if (isMoving) {
        dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate3d(-50%, -50%, 0)`;
        rx += (mx - rx) * 0.22;
        ry += (my - ry) * 0.22;
        ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate3d(-50%, -50%, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    loop();
    window.addEventListener('mousemove', onMove, { passive: true });

    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest('[data-cursor]');
      if (t) {
        ring.classList.add('is-hover');
        ring.setAttribute('data-label', t.getAttribute('data-cursor') || '');
      } else {
        ring.classList.remove('is-hover');
        ring.removeAttribute('data-label');
      }
    };

    document.addEventListener('mouseover', onOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

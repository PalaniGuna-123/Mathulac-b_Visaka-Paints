import React, { useRef, useState, useCallback } from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';

export function BeforeAfter() {
  const [baPos, setBaPos] = useState(50);
  const baDragging = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  const onBaMove = useCallback((clientX: number, rect: DOMRect) => {
    const x = ((clientX - rect.left) / rect.width) * 100;
    setBaPos(Math.max(2, Math.min(98, x)));
  }, []);

  return (
    <section className="relative py-24 md:py-32 px-5 md:px-8 bg-ink">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-10" data-reveal>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-leaf/20 text-leaf text-xs font-bold uppercase tracking-widest mb-3 border border-leaf/30">
            <Sparkles className="w-3.5 h-3.5" /> Real-World Finish
          </div>
          <h2 className="font-display text-4xl md:text-6xl text-white mt-2">See the Transformation</h2>
          <p className="text-white/70 mt-4 max-w-lg mx-auto">
            Drag the handle to reveal the difference a single coat of Mathulac premium paint makes.
          </p>
        </div>

        <div
          ref={ref}
          className="relative aspect-[16/9] rounded-2xl overflow-hidden select-none ba-handle shadow-2xl border border-white/10"
          data-reveal
          onMouseDown={(e) => {
            baDragging.current = true;
            onBaMove(e.clientX, e.currentTarget.getBoundingClientRect());
          }}
          onMouseMove={(e) => {
            if (baDragging.current && ref.current) onBaMove(e.clientX, ref.current.getBoundingClientRect());
          }}
          onMouseUp={() => {
            baDragging.current = false;
          }}
          onMouseLeave={() => {
            baDragging.current = false;
          }}
          onTouchStart={(e) => {
            baDragging.current = true;
            onBaMove(e.touches[0].clientX, e.currentTarget.getBoundingClientRect());
          }}
          onTouchMove={(e) => {
            if (baDragging.current && ref.current) onBaMove(e.touches[0].clientX, ref.current.getBoundingClientRect());
          }}
          onTouchEnd={() => {
            baDragging.current = false;
          }}
        >
          {/* After (Full Image) */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://images.pexels.com/photos/271805/pexels-photo-271805.jpeg?auto=compress&cs=tinysrgb&w=1600)`,
            }}
          />

          {/* Before (Clipped Image) */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://images.pexels.com/photos/8146318/pexels-photo-8146318.jpeg?auto=compress&cs=tinysrgb&w=1600)`,
              clipPath: `inset(0 ${100 - baPos}% 0 0)`,
            }}
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-lg glass text-white text-xs font-extrabold uppercase tracking-wider">
            BEFORE
          </div>
          <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-lg glass text-white text-xs font-extrabold uppercase tracking-wider bg-magenta/30 border border-magenta/40">
            AFTER (MATHULAC)
          </div>

          {/* Drag Handle */}
          <div className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl" style={{ left: `${baPos}%` }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-2xl">
              <div className="flex gap-0.5">
                <ChevronRight className="w-4 h-4 text-ink rotate-180" />
                <ChevronRight className="w-4 h-4 text-ink" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BeforeAfter;

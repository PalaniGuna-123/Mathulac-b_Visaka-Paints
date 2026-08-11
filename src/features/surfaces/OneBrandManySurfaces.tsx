import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { surfaces } from '../../data';

gsap.registerPlugin(ScrollTrigger);

export function OneBrandManySurfaces() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    const wrapEl = wrap.current;
    if (!el || !wrapEl || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const total = el.scrollWidth - window.innerWidth;
      gsap.to(el, {
        x: -total,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapEl,
          start: 'top top',
          end: () => `+=${total}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrap} className="relative h-screen overflow-hidden bg-ink">
      <div ref={track} className="flex h-full items-center" style={{ width: 'max-content' }}>
        <div className="flex flex-col justify-center px-8 md:px-16 h-full w-[80vw] md:w-[50vw]">
          <span className="text-magenta font-bold uppercase tracking-widest text-sm">One Brand</span>
          <h2 className="font-display text-5xl md:text-7xl text-white leading-[0.95] mt-3">
            One Brand.
            <br />
            Many Surfaces.
          </h2>
          <p className="text-white/70 mt-6 max-w-md">
            From walls to wood, structural steel to automotive refinishing — one trusted partner across every coat you apply.
          </p>
        </div>

        {surfaces.map((s, i) => (
          <div key={s.id} className="relative h-full w-[70vw] md:w-[42vw] flex-shrink-0 flex items-center px-6 md:px-10">
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl group">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${s.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-6 left-6 font-display text-7xl md:text-8xl text-white/30">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-xs uppercase tracking-widest mb-1 font-bold" style={{ color: s.accent }}>
                  Surface Application
                </div>
                <div className="font-display text-4xl md:text-5xl text-white">{s.name}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OneBrandManySurfaces;

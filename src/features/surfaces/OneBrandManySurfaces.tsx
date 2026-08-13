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
      <div
        ref={track}
        className="flex h-full items-center"
        style={{ width: 'max-content', willChange: 'transform', transform: 'translate3d(0,0,0)' }}
      >
        <div className="flex flex-col justify-center px-8 md:px-16 h-full w-[80vw] md:w-[50vw]">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-magenta/20 text-magenta text-[11px] font-extrabold uppercase tracking-widest border border-magenta/30 mb-3 self-start">
            One Brand
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white leading-tight tracking-tight">
            One Brand.
            <br />
            Many Surfaces.
          </h2>
          <p className="text-white/70 text-xs sm:text-sm mt-2.5 max-w-md leading-relaxed">
            From walls to wood, structural steel to automotive refinishing — one trusted partner across every coat you apply.
          </p>
        </div>

        {surfaces.map((s, i) => (
          <div key={s.id} className="relative h-full w-[70vw] md:w-[42vw] flex-shrink-0 flex items-center px-6 md:px-10">
            <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-2xl group">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${s.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-6 left-6 font-display text-5xl md:text-6xl text-white/30">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-xs uppercase tracking-widest mb-1 font-bold" style={{ color: s.accent }}>
                  Surface Application
                </div>
                <div className="font-display text-2xl md:text-3xl text-white">{s.name}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OneBrandManySurfaces;

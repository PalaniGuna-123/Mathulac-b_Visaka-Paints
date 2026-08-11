import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ColorScrollSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const colors = ['#FF1493', '#FF7A00', '#FFD400', '#67D600', '#00C8FF', '#7B2CFF'];
    const ctx = gsap.context(() => {
      gsap.to(el, {
        backgroundColor: colors[colors.length - 1],
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
          onUpdate: (self) => {
            const seg = colors.length - 1;
            const i = Math.min(Math.floor(self.progress * seg), seg - 1);
            const local = self.progress * seg - i;
            const c1 = gsap.utils.interpolate(colors[i], colors[i + 1], local);
            el.style.backgroundColor = c1 as string;
          },
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="color-scroll"
      ref={sectionRef}
      className="relative py-32 md:py-48 px-5 md:px-8 transition-colors duration-500"
      style={{ background: '#FF1493' }}
    >
      <div className="max-w-[1400px] mx-auto text-center">
        <h2 className="font-display text-5xl md:text-8xl text-white leading-[0.95] mix-blend-difference">
          Paint is not just
          <br />
          something you apply.
        </h2>
        <p className="font-display text-3xl md:text-5xl text-white mt-6 mix-blend-difference">
          It's something you experience.
        </p>
      </div>
    </section>
  );
}

export default ColorScrollSection;

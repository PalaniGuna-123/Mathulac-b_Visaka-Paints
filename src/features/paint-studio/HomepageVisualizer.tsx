import { useLayoutEffect, useRef, type CSSProperties } from 'react';
import { ArrowRight, Library, Sparkles } from 'lucide-react';
import exteriorPreview from '../../assets/hero/house-unpainted-flat.webp';
import { homepageVisualizer } from '../../data';
import { gsap } from '../../lib/animation';
import { Link } from '../../routes/Router';

const shadeNames = homepageVisualizer.shades;

export function HomepageVisualizer() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wallSurfaces = Array.from(stage.querySelectorAll<SVGElement>('[data-viz-wall]'));
    const shadeLabels = Array.from(stage.querySelectorAll<HTMLElement>('[data-viz-shade]'));
    const swatches = Array.from(stage.querySelectorAll<HTMLElement>('[data-viz-swatch]'));
    const headingParts = Array.from(stage.querySelectorAll<HTMLElement>('[data-viz-heading]'));
    const preview = stage.querySelector<HTMLElement>('[data-viz-preview]');
    const surfacePreview = stage.querySelector<HTMLElement>('[data-viz-surface]');
    const palette = stage.querySelector<HTMLElement>('[data-viz-palette]');
    const actions = stage.querySelector<HTMLElement>('[data-viz-actions]');
    const exitVeil = stage.querySelector<HTMLElement>('[data-viz-exit]');
    const paintSpread = stage.querySelector<HTMLElement>('[data-viz-paint-spread]');
    if (!preview || !surfacePreview || !palette || !actions || !exitVeil || !paintSpread) return;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set([headingParts, preview, surfacePreview, palette, actions], { autoAlpha: 1, clearProps: 'transform' });
        gsap.set(shadeLabels, { autoAlpha: 0 });
        gsap.set(shadeLabels[shadeLabels.length - 1], { autoAlpha: 1 });
        gsap.set(wallSurfaces, { fill: shadeNames[shadeNames.length - 1].hex });
        gsap.set(paintSpread, { autoAlpha: 0 });
        return;
      }

      gsap.set(headingParts, { autoAlpha: 0, y: 34 });
      gsap.set(preview, {
        autoAlpha: 0.16,
        scale: 1.045,
        clipPath: 'inset(9% 7% 9% 7% round 2rem)',
      });
      gsap.set(surfacePreview, { autoAlpha: 0, y: 24, scale: 0.94 });
      gsap.set(palette, { autoAlpha: 0, y: 20 });
      gsap.set(swatches, { autoAlpha: 0, y: 12, scale: 0.82 });
      gsap.set(actions, { autoAlpha: 0, y: 22 });
      gsap.set(shadeLabels, { autoAlpha: 0, y: 8 });
      gsap.set(shadeLabels[0], { autoAlpha: 1, y: 0 });
      gsap.set(exitVeil, { yPercent: 100 });
      gsap.set(paintSpread, { autoAlpha: 0, scale: 0.08, xPercent: -50, yPercent: -50 });

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          id: 'visualizer-scroll-chapter',
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.round(window.innerHeight * (window.innerWidth < 768 ? 3.45 : 4.15))}`,
          pin: stage,
          pinSpacing: true,
          scrub: window.innerWidth < 768 ? 0.32 : 0.58,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 20,
        },
      });

      // 0–20%: introduce the Visualizer chapter and its promise.
      timeline
        .to(headingParts, { autoAlpha: 1, y: 0, duration: 1.8, stagger: 0.12, ease: 'power3.out' }, 0)
        // 20–40%: establish the neutral architectural scene.
        .to(preview, {
          autoAlpha: 1,
          scale: 1,
          clipPath: 'inset(0% 0% 0% 0% round 1.65rem)',
          duration: 1.8,
          ease: 'power3.inOut',
        }, 1.9)
        // 40–55%: recolour only the wall planes to Warm Beige.
        .fromTo(paintSpread, {
          autoAlpha: 0.72,
          scale: 0.08,
          backgroundColor: shadeNames[1].hex,
        }, {
          autoAlpha: 0.2,
          scale: 2.7,
          duration: 0.82,
          ease: 'power2.in',
        }, 3.82)
        .to(paintSpread, { autoAlpha: 0, duration: 0.35 }, 4.5)
        .to(wallSurfaces, { fill: shadeNames[1].hex, duration: 1.45, ease: 'sine.inOut' }, 3.85)
        .to(shadeLabels[0], { autoAlpha: 0, y: -8, duration: 0.32 }, 4.1)
        .to(shadeLabels[1], { autoAlpha: 1, y: 0, duration: 0.42 }, 4.34)
        // 55–70%: move to Mathulac Blue while retaining scene lighting and texture.
        .fromTo(paintSpread, {
          autoAlpha: 0.74,
          scale: 0.08,
          backgroundColor: shadeNames[2].hex,
        }, {
          autoAlpha: 0.2,
          scale: 2.75,
          duration: 0.86,
          ease: 'power2.in',
        }, 5.32)
        .to(paintSpread, { autoAlpha: 0, duration: 0.36 }, 6.04)
        .to(wallSurfaces, { fill: shadeNames[2].hex, duration: 1.5, ease: 'sine.inOut' }, 5.35)
        .to(shadeLabels[1], { autoAlpha: 0, y: -8, duration: 0.32 }, 5.55)
        .to(shadeLabels[2], { autoAlpha: 1, y: 0, duration: 0.42 }, 5.78)
        // 70–82%: show the same colour system applied to an exterior surface.
        .to(surfacePreview, { autoAlpha: 1, y: 0, scale: 1, duration: 1.1, ease: 'power3.out' }, 6.9)
        // 82–92%: reveal the shade system.
        .to(palette, { autoAlpha: 1, y: 0, duration: 0.5 }, 8.05)
        .to(swatches, { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.075, ease: 'back.out(1.7)' }, 8.16)
        // 92–100%: reveal the hand-off actions, hold, then cue Products.
        .to(actions, { autoAlpha: 1, y: 0, duration: 0.62, ease: 'power3.out' }, 9.08)
        .to({}, { duration: 0.56 }, 9.7)
        .to(stage.querySelector('[data-viz-content]'), { yPercent: -2.5, autoAlpha: 0.82, duration: 0.72, ease: 'power2.inOut' }, 10.08)
        .to(exitVeil, { yPercent: 78, duration: 0.72, ease: 'power3.inOut' }, 10.08);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="studio"
      className="visualizer-chapter"
      aria-labelledby="visualizer-heading"
    >
      <div ref={stageRef} className="visualizer-chapter__stage">
        <div className="visualizer-chapter__ambient visualizer-chapter__ambient--warm" aria-hidden="true" />
        <div className="visualizer-chapter__ambient visualizer-chapter__ambient--blue" aria-hidden="true" />
        <div className="visualizer-paint-bubbles" aria-hidden="true">
          <i style={{ '--bubble-colour': '#315a9b' } as CSSProperties} />
          <i style={{ '--bubble-colour': '#e7c35c' } as CSSProperties} />
          <i style={{ '--bubble-colour': '#d7658e' } as CSSProperties} />
          <i style={{ '--bubble-colour': '#78906f' } as CSSProperties} />
        </div>
        <span className="visualizer-chapter__index" aria-hidden="true">02</span>

        <div data-viz-content className="visualizer-chapter__content">
          <div className="visualizer-chapter__copy">
            <div data-viz-heading className="visualizer-chapter__eyebrow">
              <Sparkles aria-hidden="true" />
              {homepageVisualizer.eyebrow}
            </div>
            <h2 id="visualizer-heading" data-viz-heading data-paint-heading className="paint-heading">
              {homepageVisualizer.headline} <em>{homepageVisualizer.headlineAccent}</em>
            </h2>
            <p data-viz-heading>{homepageVisualizer.description}</p>

            <div data-viz-actions className="visualizer-chapter__actions">
              <Link to="/colours" className="paint-button visualizer-cta visualizer-cta--primary" data-cursor="visualize">
                {homepageVisualizer.primaryCta}
                <ArrowRight aria-hidden="true" />
              </Link>
              <Link to="/colours#palette" className="paint-button visualizer-cta visualizer-cta--secondary">
                <Library aria-hidden="true" />
                {homepageVisualizer.secondaryCta}
                <span className="visualizer-cta__dots" aria-hidden="true">
                  {shadeNames.map((item) => <i key={item.code} style={{ backgroundColor: item.hex }} />)}
                </span>
              </Link>
            </div>
          </div>

          <div data-viz-preview className="visualizer-preview" aria-label="Interactive living-room colour preview">
            <span data-viz-paint-spread className="visualizer-preview__paint-spread" aria-hidden="true" />
            <div className="visualizer-preview__bar">
              <span><i /> Live architectural preview</span>
              <span>Living room · Matte</span>
            </div>

            <svg
              className="visualizer-preview__scene"
              viewBox="0 0 960 640"
              preserveAspectRatio="xMidYMid slice"
              role="img"
              aria-label="Architectural living room with colour-changing walls"
            >
              <defs>
                <linearGradient id="viz-floor" x1="0" y1="0" x2="0.8" y2="1">
                  <stop offset="0" stopColor="#9a7657" />
                  <stop offset="1" stopColor="#5b4132" />
                </linearGradient>
                <linearGradient id="viz-window" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#a8d6e8" />
                  <stop offset="0.58" stopColor="#d8e5d6" />
                  <stop offset="1" stopColor="#76916f" />
                </linearGradient>
                <linearGradient id="viz-sofa" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#f2ede4" />
                  <stop offset="1" stopColor="#c9c0b5" />
                </linearGradient>
                <radialGradient id="viz-light" cx="50%" cy="20%" r="75%">
                  <stop offset="0" stopColor="#fff8dc" stopOpacity=".56" />
                  <stop offset="1" stopColor="#fff8dc" stopOpacity="0" />
                </radialGradient>
                <pattern id="viz-plaster" width="34" height="34" patternUnits="userSpaceOnUse">
                  <path d="M0 22 C8 17 13 28 22 20 S34 18 40 15" fill="none" stroke="#fff" strokeOpacity=".1" strokeWidth="1" />
                </pattern>
                <filter id="viz-shadow" x="-30%" y="-30%" width="160%" height="180%">
                  <feDropShadow dx="0" dy="14" stdDeviation="16" floodColor="#171119" floodOpacity=".26" />
                </filter>
              </defs>

              <rect data-viz-wall width="960" height="454" fill={shadeNames[0].hex} />
              <polygon data-viz-wall points="0,0 155,54 155,454 0,492" fill={shadeNames[0].hex} opacity=".78" />
              <rect width="960" height="454" fill="url(#viz-plaster)" />
              <rect width="960" height="454" fill="url(#viz-light)" />
              <polygon points="0,454 960,454 960,640 0,640" fill="url(#viz-floor)" />
              <path d="M0 454H960" stroke="#f7eee3" strokeWidth="15" opacity=".72" />
              <path d="M0 560L960 510M145 640L585 454M610 640L805 454" stroke="#d8b995" strokeOpacity=".18" strokeWidth="2" />

              <g filter="url(#viz-shadow)">
                <rect x="620" y="72" width="258" height="282" rx="4" fill="#302d31" />
                <rect x="633" y="85" width="232" height="256" fill="url(#viz-window)" />
                <path d="M749 85V341M633 218H865" stroke="#302d31" strokeWidth="12" />
                <path d="M650 333C690 265 706 266 751 333C788 285 819 284 853 333Z" fill="#657b5d" opacity=".7" />
                <path d="M607 52C634 86 637 316 604 376" fill="none" stroke="#d2c4af" strokeWidth="26" />
                <path d="M892 52C864 86 861 316 894 376" fill="none" stroke="#d2c4af" strokeWidth="26" />
              </g>

              <g opacity=".92">
                <ellipse cx="299" cy="483" rx="219" ry="32" fill="#241b1d" opacity=".18" />
                <path d="M89 379Q94 348 127 346H470Q505 349 510 379L495 509H104Z" fill="url(#viz-sofa)" filter="url(#viz-shadow)" />
                <rect x="114" y="365" width="175" height="93" rx="29" fill="#ded5c9" />
                <rect x="307" y="365" width="175" height="93" rx="29" fill="#d7cdc1" />
                <path d="M92 397Q65 403 73 465L104 504L128 488L120 418Z" fill="#bcb1a5" />
                <path d="M507 397Q534 403 526 465L495 504L471 488L479 418Z" fill="#bcb1a5" />
                <path d="M132 511L121 558M470 511L482 558" stroke="#342a2a" strokeWidth="12" />
                <rect x="164" y="383" width="105" height="72" rx="19" fill="#596e78" transform="rotate(-4 164 383)" />
                <rect x="334" y="384" width="93" height="70" rx="18" fill="#b27b64" transform="rotate(4 334 384)" />
              </g>

              <g filter="url(#viz-shadow)">
                <ellipse cx="675" cy="540" rx="151" ry="31" fill="#251c1f" opacity=".23" />
                <ellipse cx="675" cy="512" rx="131" ry="37" fill="#4b352b" />
                <ellipse cx="675" cy="502" rx="131" ry="37" fill="#aa8060" />
                <path d="M623 516L600 594M727 516L750 594" stroke="#4a3429" strokeWidth="13" />
                <ellipse cx="674" cy="493" rx="30" ry="9" fill="#eadcc8" />
                <path d="M667 487V447M680 487V438" stroke="#4f7d5d" strokeWidth="5" />
                <path d="M666 458C632 446 638 424 668 438M678 449C708 433 716 453 683 464" fill="#6d9872" />
              </g>

              <g transform="translate(825 372)">
                <path d="M50 126V27" stroke="#476953" strokeWidth="7" />
                <path d="M51 78C9 64 4 25 47 47M53 67C91 42 112 77 59 88M51 49C28 15 55 -4 67 39" fill="#557d61" />
                <path d="M16 118H84L74 179H27Z" fill="#bc8062" />
                <ellipse cx="50" cy="118" rx="34" ry="10" fill="#d49a76" />
              </g>

              <circle cx="420" cy="146" r="47" fill="#f3ead9" opacity=".2" />
              <circle cx="420" cy="146" r="31" fill="#f8e8b8" opacity=".84" />
              <path d="M420 0V107" stroke="#504544" strokeWidth="4" />
              <path d="M381 151H459" stroke="#645653" strokeWidth="3" opacity=".55" />
            </svg>

            <div className="visualizer-preview__shade">
              {shadeNames.map((shade, index) => (
                <span key={shade.code} data-viz-shade className={index === 0 ? 'is-active' : ''}>
                  <i style={{ backgroundColor: shade.hex }} />
                  <strong>{shade.name}</strong>
                  <small>{shade.code} · Premium Matte</small>
                </span>
              ))}
            </div>

            <div data-viz-surface className="visualizer-preview__surface">
              <img src={exteriorPreview} alt="Modern exterior facade preview" width="1672" height="941" />
              <div>
                <small>Another surface</small>
                <strong>Exterior facade</strong>
                <span>Weatherproof colour system</span>
              </div>
            </div>

            <div data-viz-palette className="visualizer-preview__palette" aria-label="Featured colour shades">
              <span>Curated shade system</span>
              <div>
                {['#eee9e1', '#cdb99f', '#315a9b', '#9eae91', '#d7658e', '#e7c35c'].map((hex, index) => (
                  <i key={hex} data-viz-swatch style={{ backgroundColor: hex }}>
                    {index === 2 && <b aria-label="Selected shade" />}
                  </i>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div data-viz-exit className="visualizer-chapter__exit" aria-hidden="true" />
      </div>
    </section>
  );
}

export default HomepageVisualizer;

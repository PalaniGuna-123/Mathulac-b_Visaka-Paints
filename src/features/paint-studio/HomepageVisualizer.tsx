import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Check, Eye, Layers3, Library, RotateCcw, Sparkles } from 'lucide-react';
import exteriorPreview from '../../../assets/hero/house-unpainted-flat.webp';
import { homepageVisualizer, paintShades, type PaintShade } from '../../data';
import { gsap } from '../../lib/animation';
import { Link } from '../../routes/Router';

type SurfaceId = 'main-wall' | 'accent-wall' | 'facade' | 'trim' | 'exterior';
type PaletteGroup = 'All' | 'Neutrals' | 'Warm' | 'Cool';

type SurfaceDefinition = {
  id: SurfaceId;
  label: string;
  shortLabel: string;
  origin: { x: number; y: number };
  paths: string[];
};

type PaintTransition = {
  surface: SurfaceId;
  shade: PaintShade;
  token: number;
};

const surfaces: SurfaceDefinition[] = [
  {
    id: 'main-wall',
    label: 'Main Wall',
    shortLabel: 'Main',
    origin: { x: 48, y: 53 },
    paths: [
      'M463 187 1057 242 1060 458 463 414ZM505 193 651 208 651 407 505 391ZM807 265 944 284 944 445 807 427Z',
      'M397 506 1071 561 1102 814 392 813 397 629 444 607ZM477 532 650 541 650 809 477 809ZM665 544 771 549 771 812 665 812ZM858 557 988 563 988 812 858 812Z',
    ],
  },
  {
    id: 'accent-wall',
    label: 'Accent Wall',
    shortLabel: 'Accent',
    origin: { x: 69, y: 32 },
    paths: [
      'M1097 84 1256 159 1254 522 1192 520 1180 328 1098 304ZM1162 245 1206 260 1206 497 1163 491Z',
      'M996 552 1135 562 1143 807 1005 808ZM1037 568 1107 570 1107 805 1038 805Z',
    ],
  },
  {
    id: 'facade',
    label: 'Facade',
    shortLabel: 'Facade',
    origin: { x: 23, y: 47 },
    paths: [
      'M166 291 463 187 464 565 403 589 397 808 167 704ZM202 307 279 280 279 569 202 594ZM333 258 462 215 462 520 333 554ZM194 589 310 570 310 753 194 721Z',
      'M1253 309 1353 337 1354 533 1251 523ZM1280 354 1332 365 1333 515 1280 507Z',
    ],
  },
  {
    id: 'trim',
    label: 'Trim',
    shortLabel: 'Trim',
    origin: { x: 53, y: 47 },
    paths: [
      'M166 291 555 29 1046 193 1045 252 554 101 166 330Z',
      'M279 394 560 432 1059 450 1058 527 553 484 280 449Z',
      'M1193 535 1450 524 1627 574 1624 629 1454 585 1190 596Z',
      'M474 479 514 486 515 815 477 814Z',
      'M1451 580 1482 584 1484 820 1452 817Z',
    ],
  },
  {
    id: 'exterior',
    label: 'Exterior',
    shortLabel: 'Exterior',
    origin: { x: 83, y: 62 },
    paths: [
      'M1252 521 1450 523 1627 574 1627 820 1451 819 1450 585 1252 596ZM1275 610 1376 601 1376 806 1275 811Z',
      'M1192 596 1252 593 1252 815 1192 816Z',
    ],
  },
];

const featuredShadeIds = [
  'MW-004', 'VOW-04', 'MB-101', 'MB-103', 'VC-301', 'MGY-01',
  'MGY-02', 'MBR-02', 'MR-501', 'VP-607', 'MO-402', 'MY-301',
  'MG-901', 'MG-902', 'VG-818', 'VBG-01', 'MB-801', 'VB-122',
  'VB-128', 'MV-701', 'MV-702', 'VP-718',
] as const;

const paletteGroups: Record<Exclude<PaletteGroup, 'All'>, string[]> = {
  Neutrals: ['WHITES', 'OFF WHITES', 'BEIGES', 'CREAMS', 'GREYS', 'BROWNS'],
  Warm: ['REDS', 'PINKS', 'ORANGES', 'YELLOWS'],
  Cool: ['YELLOW GREENS', 'GREENS', 'BLUE GREENS', 'BLUES', 'VIOLETS'],
};

const initialSurfaceColours: Record<SurfaceId, string> = {
  'main-wall': '#DCCBB5',
  'accent-wall': '#315A9B',
  facade: '#E9DDCA',
  trim: '#F6F1E8',
  exterior: '#9EAE91',
};

function SurfacePaths({ surface }: { surface: SurfaceDefinition }) {
  return (
    <>
      {surface.paths.map((path, index) => (
        <path key={`${surface.id}-${index}`} d={path} fillRule="evenodd" clipRule="evenodd" />
      ))}
    </>
  );
}

export function HomepageVisualizer() {
  const sectionRef = useRef<HTMLElement>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const revealCircleRef = useRef<SVGCircleElement>(null);
  const transitionCountRef = useRef(0);

  const featuredShades = useMemo(
    () => featuredShadeIds
      .map((id) => paintShades.find((shade) => shade.id === id))
      .filter((shade): shade is PaintShade => Boolean(shade)),
    [],
  );

  const defaultShade = featuredShades.find((item) => item.id === 'VB-122') ?? featuredShades[0];
  const [selectedSurface, setSelectedSurface] = useState<SurfaceId>('accent-wall');
  const [selectedShade, setSelectedShade] = useState<PaintShade>(defaultShade);
  const [surfaceColours, setSurfaceColours] = useState(initialSurfaceColours);
  const [paintTransition, setPaintTransition] = useState<PaintTransition | null>(null);
  const [paletteGroup, setPaletteGroup] = useState<PaletteGroup>('All');
  const [previewMode, setPreviewMode] = useState<'before' | 'after'>('after');

  const activeSurface = surfaces.find((surface) => surface.id === selectedSurface) ?? surfaces[0];
  const visibleShades = useMemo(() => {
    if (paletteGroup === 'All') return featuredShades;
    return featuredShades.filter((shade) => paletteGroups[paletteGroup].includes(shade.family));
  }, [featuredShades, paletteGroup]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      const revealItems = section.querySelectorAll('[data-architecture-reveal]');

      if (reducedMotion) {
        gsap.set(revealItems, { autoAlpha: 1, clearProps: 'transform' });
        return;
      }

      gsap.fromTo(
        revealItems,
        { autoAlpha: 0, y: 34 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          stagger: 0.11,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 72%',
            once: true,
          },
        },
      );

      gsap.to(section.querySelectorAll('.architecture-studio__bubble'), {
        y: (_, element) => (element as HTMLElement).dataset.drift === 'down' ? 16 : -18,
        x: (_, element) => (element as HTMLElement).dataset.drift === 'down' ? -8 : 10,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        stagger: 0.35,
        ease: 'sine.inOut',
      });
    }, section);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const circle = revealCircleRef.current;
    const transition = paintTransition;
    if (!circle || !transition) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setSurfaceColours((current) => ({ ...current, [transition.surface]: transition.shade.hex }));
      setPaintTransition(null);
      return;
    }

    const surface = surfaces.find((item) => item.id === transition.surface) ?? surfaces[0];
    const ctx = gsap.context(() => {
      gsap.set(circle, {
        attr: {
          cx: surface.origin.x * 16.72,
          cy: surface.origin.y * 9.41,
          r: 0,
        },
      });
      gsap.to(circle, {
        attr: { r: 1480 },
        duration: 0.92,
        ease: 'power3.inOut',
        onComplete: () => {
          setSurfaceColours((current) => ({ ...current, [transition.surface]: transition.shade.hex }));
          setPaintTransition((current) => current?.token === transition.token ? null : current);
        },
      });
    }, workspaceRef);

    return () => ctx.revert();
  }, [paintTransition]);

  const selectShade = useCallback((shade: PaintShade) => {
    setSelectedShade(shade);
    setPreviewMode('after');
    transitionCountRef.current += 1;
    setPaintTransition({
      surface: selectedSurface,
      shade,
      token: transitionCountRef.current,
    });
  }, [selectedSurface]);

  const resetPalette = () => {
    setPaintTransition(null);
    setSurfaceColours(initialSurfaceColours);
    setSelectedSurface('accent-wall');
    setSelectedShade(defaultShade);
    setPreviewMode('after');
  };

  const selectSurface = (surface: SurfaceDefinition) => {
    setPaintTransition(null);
    setSelectedSurface(surface.id);
    const appliedShade = paintShades.find(
      (item) => item.hex.toLowerCase() === surfaceColours[surface.id].toLowerCase(),
    );
    if (appliedShade) setSelectedShade(appliedShade);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!imageInnerRef.current || window.innerWidth < 900 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 1.4;
    const rotateX = -((event.clientY - rect.top) / rect.height - 0.5) * 1.1;
    gsap.to(imageInnerRef.current, { rotateX, rotateY, duration: 0.55, ease: 'power2.out', overwrite: 'auto' });
  };

  const resetPointerTilt = () => {
    if (!imageInnerRef.current) return;
    gsap.to(imageInnerRef.current, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'power3.out', overwrite: 'auto' });
  };

  return (
    <section
      ref={sectionRef}
      id="studio"
      className="architecture-studio"
      aria-labelledby="visualizer-heading"
      style={{ '--active-paint': selectedShade.hex } as React.CSSProperties}
    >
      <div className="architecture-studio__aurora architecture-studio__aurora--rose" aria-hidden="true" />
      <div className="architecture-studio__aurora architecture-studio__aurora--blue" aria-hidden="true" />
      <div className="architecture-studio__bubble architecture-studio__bubble--one" aria-hidden="true" />
      <div className="architecture-studio__bubble architecture-studio__bubble--two" data-drift="down" aria-hidden="true" />
      <div className="architecture-studio__bubble architecture-studio__bubble--three" aria-hidden="true" />
      <div className="architecture-studio__bubble architecture-studio__bubble--four" data-drift="down" aria-hidden="true" />
      <span className="architecture-studio__droplet architecture-studio__droplet--one" aria-hidden="true" />
      <span className="architecture-studio__droplet architecture-studio__droplet--two" aria-hidden="true" />

      <div className="architecture-studio__inner">
        <header className="architecture-studio__heading">
          <div data-architecture-reveal className="architecture-studio__eyebrow">
            <Sparkles aria-hidden="true" />
            {homepageVisualizer.eyebrow}
          </div>
          <h2 id="visualizer-heading" data-architecture-reveal data-paint-heading>
            {homepageVisualizer.headline} <em>{homepageVisualizer.headlineAccent}</em>
          </h2>
          <p data-architecture-reveal>{homepageVisualizer.description}</p>
        </header>

        <div ref={workspaceRef} data-architecture-reveal className="architecture-studio__workspace">
          <div className="architecture-studio__canvas-shell">
            <div className="architecture-studio__topbar">
              <div className="architecture-studio__live">
                <i />
                <span>Live preview</span>
                <strong>Modern Villa 01</strong>
              </div>

              <div className="architecture-studio__compare" aria-label="Before and after preview">
                <button
                  type="button"
                  className={previewMode === 'before' ? 'is-active' : ''}
                  onClick={() => setPreviewMode('before')}
                  aria-pressed={previewMode === 'before'}
                >
                  Before
                </button>
                <button
                  type="button"
                  className={previewMode === 'after' ? 'is-active' : ''}
                  onClick={() => setPreviewMode('after')}
                  aria-pressed={previewMode === 'after'}
                >
                  After
                </button>
              </div>
            </div>

            <div
              className="architecture-studio__media"
              onPointerMove={handlePointerMove}
              onPointerLeave={resetPointerTilt}
            >
              <div ref={imageInnerRef} className="architecture-studio__media-inner">
                <img
                  src={exteriorPreview}
                  alt="Premium modern villa with interactive paintable exterior surfaces"
                  width="1672"
                  height="940"
                />

                <svg
                  className={`architecture-studio__paint-map ${previewMode === 'before' ? 'is-before' : ''}`}
                  viewBox="0 0 1672 941"
                  preserveAspectRatio="xMidYMid slice"
                  aria-hidden="true"
                >
                  <defs>
                    <mask id="architecture-paint-reveal">
                      <rect width="1672" height="941" fill="black" />
                      <circle ref={revealCircleRef} cx="0" cy="0" r="0" fill="white" />
                    </mask>
                    <filter id="architecture-paint-soften" x="-5%" y="-5%" width="110%" height="110%">
                      <feGaussianBlur stdDeviation="0.35" />
                    </filter>
                  </defs>

                  <g className="architecture-studio__committed-paint" filter="url(#architecture-paint-soften)">
                    {surfaces.map((surface) => (
                      <g
                        key={surface.id}
                        fill={surfaceColours[surface.id]}
                        className={selectedSurface === surface.id ? 'is-selected' : ''}
                      >
                        <SurfacePaths surface={surface} />
                      </g>
                    ))}
                  </g>

                  {paintTransition && (
                    <g
                      key={paintTransition.token}
                      className="architecture-studio__fresh-paint"
                      fill={paintTransition.shade.hex}
                      mask="url(#architecture-paint-reveal)"
                      filter="url(#architecture-paint-soften)"
                    >
                      <SurfacePaths surface={surfaces.find((item) => item.id === paintTransition.surface) ?? surfaces[0]} />
                    </g>
                  )}
                </svg>

                <div className="architecture-studio__light-wash" aria-hidden="true" />

                {paintTransition && (
                  <span
                    key={paintTransition.token}
                    className="architecture-studio__splash"
                    style={{
                      left: `${activeSurface.origin.x}%`,
                      top: `${activeSurface.origin.y}%`,
                      '--splash-colour': paintTransition.shade.hex,
                    } as React.CSSProperties}
                    aria-hidden="true"
                  >
                    <i /><i /><i /><i /><i />
                  </span>
                )}

                <div className="architecture-studio__surface-marker" style={{ left: `${activeSurface.origin.x}%`, top: `${activeSurface.origin.y}%` }}>
                  <i style={{ backgroundColor: selectedShade.hex }} />
                  <span>{activeSurface.label}</span>
                </div>
              </div>
            </div>

            <div className="architecture-studio__surface-dock" aria-label="Select a paintable surface">
              <span><Layers3 aria-hidden="true" /> Select surface</span>
              <div>
                {surfaces.map((surface) => (
                  <button
                    key={surface.id}
                    type="button"
                    className={selectedSurface === surface.id ? 'is-active' : ''}
                    onClick={() => selectSurface(surface)}
                    aria-pressed={selectedSurface === surface.id}
                  >
                    <i style={{ backgroundColor: surfaceColours[surface.id] }} />
                    {surface.shortLabel}
                  </button>
                ))}
              </div>
            </div>

            <div className="architecture-studio__shade-readout" aria-live="polite">
              <i style={{ backgroundColor: selectedShade.hex }} />
              <span>
                <small>{activeSurface.label}</small>
                <strong>{selectedShade.name}</strong>
                <b>{selectedShade.id} · Premium Matte</b>
              </span>
            </div>
          </div>

          <aside className="architecture-studio__palette-card" aria-label="VISAKA colour palette">
            <div className="architecture-studio__palette-heading">
              <div>
                <small>VISAKA colour studio</small>
                <h3>Choose your shade</h3>
              </div>
              <button type="button" onClick={resetPalette} aria-label="Reset visualizer colours" title="Reset colours">
                <RotateCcw aria-hidden="true" />
              </button>
            </div>

            <div className="architecture-studio__selected-colour">
              <i style={{ backgroundColor: selectedShade.hex }} />
              <span>
                <small>Painting {activeSurface.label}</small>
                <strong>{selectedShade.name}</strong>
                <b>{selectedShade.id}</b>
              </span>
              <em>{selectedShade.hex}</em>
            </div>

            <div className="architecture-studio__groups" aria-label="Filter colour families">
              {(['All', 'Neutrals', 'Warm', 'Cool'] as PaletteGroup[]).map((group) => (
                <button
                  key={group}
                  type="button"
                  className={paletteGroup === group ? 'is-active' : ''}
                  onClick={() => setPaletteGroup(group)}
                  aria-pressed={paletteGroup === group}
                >
                  {group}
                </button>
              ))}
            </div>

            <div className="architecture-studio__swatches" aria-label={`${paletteGroup} VISAKA shades`}>
              {visibleShades.map((shade) => {
                const isSelected = selectedShade.id === shade.id;
                return (
                  <button
                    key={shade.id}
                    type="button"
                    className={isSelected ? 'is-selected' : ''}
                    style={{ '--swatch': shade.hex } as React.CSSProperties}
                    onClick={() => selectShade(shade)}
                    aria-label={`Apply ${shade.name}, shade ${shade.id}, to ${activeSurface.label}`}
                    aria-pressed={isSelected}
                    title={`${shade.name} · ${shade.id}`}
                  >
                    <span>{isSelected && <Check aria-hidden="true" />}</span>
                    <small>{shade.id.replace('-', ' ')}</small>
                  </button>
                );
              })}
            </div>

            <div className="architecture-studio__palette-note">
              <Eye aria-hidden="true" />
              <span><strong>True-colour preview</strong> Finish and lighting may vary on real surfaces.</span>
            </div>

            <div className="architecture-studio__actions">
              <Link to="/studio" className="architecture-studio__primary" data-cursor="visualize">
                Open full visualizer
                <ArrowRight aria-hidden="true" />
              </Link>
              <Link to="/colours#palette" className="architecture-studio__secondary">
                <Library aria-hidden="true" />
                Browse all shades
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default HomepageVisualizer;

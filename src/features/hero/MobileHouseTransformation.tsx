import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Sparkles, Sliders, ShieldCheck, Layers, ArrowRight, Play, Pause, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useNavigate } from '../../routes/Router';

const houseStages = [
  {
    id: 0,
    label: 'Raw Concrete',
    subtitle: 'Unpainted exposed structure & masonry',
    image: '/assets/hero/house/house-00-unpainted.webp',
    tag: 'Stage 1 · Foundation',
  },
  {
    id: 1,
    label: 'Base Primer',
    subtitle: 'Deep-penetrating moisture & damp barrier',
    image: '/assets/hero/house/house-01-base-painted.webp',
    tag: 'Stage 2 · Protection',
  },
  {
    id: 2,
    label: 'Muthulac Blue',
    subtitle: 'Vibrant signature exterior architectural coat',
    image: '/assets/hero/house/house-02-blue-painted.webp',
    tag: 'Stage 3 · Signature Tone',
  },
  {
    id: 3,
    label: 'Warm Accent',
    subtitle: 'Golden terracotta highlights & arch tones',
    image: '/assets/hero/house/house-03-accent-painted.webp',
    tag: 'Stage 4 · Warm Accents',
  },
  {
    id: 4,
    label: 'Detail Trims',
    subtitle: 'High-definition eaves, borders & balcony rims',
    image: '/assets/hero/house/house-04-details-painted.webp',
    tag: 'Stage 5 · Precision Trims',
  },
  {
    id: 5,
    label: 'Luxury Finish',
    subtitle: '100% weather-shield gloss & UV resistance',
    image: '/assets/hero/house/house-05-luxury-final.webp',
    tag: 'Stage 6 · Final Masterpiece',
  },
];

export function MobileHouseTransformation() {
  const [activeStage, setActiveStage] = useState(0);
  const [sliderPos, setSliderPos] = useState(30);
  const [mode, setMode] = useState<'slider' | 'stages'>('slider');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const isDragging = useRef(false);
  const animDirection = useRef<1 | -1>(1);
  const lastTimeRef = useRef<number>(0);
  const userInteractedTimeout = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Continuous Auto-Sweep Animation in Slider Mode
  useEffect(() => {
    if (mode !== 'slider' || !isPlaying || isInteracting) return;

    let animFrame: number;
    let pos = sliderPos;
    let dir = animDirection.current;

    const tick = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = time;

      // Speed: 24% per second -> smooth organic sweep
      pos += dir * 24 * dt;

      if (pos >= 95) {
        pos = 95;
        dir = -1;
        animDirection.current = -1;
      } else if (pos <= 5) {
        pos = 5;
        dir = 1;
        animDirection.current = 1;
      }

      setSliderPos(pos);
      animFrame = requestAnimationFrame(tick);
    };

    animFrame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animFrame);
      lastTimeRef.current = 0;
    };
  }, [mode, isPlaying, isInteracting, sliderPos]);

  // Auto-Cycle Paint Stages in Stages Mode
  useEffect(() => {
    if (mode !== 'stages' || !isPlaying || isInteracting) return;

    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % houseStages.length);
    }, 2400);

    return () => clearInterval(interval);
  }, [mode, isPlaying, isInteracting]);

  const updateSlider = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(2, Math.min(98, x)));
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    setIsInteracting(true);
    if (userInteractedTimeout.current) clearTimeout(userInteractedTimeout.current);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    updateSlider(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    updateSlider(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    // Resume auto-sweep after 3.5s of no user touch
    if (userInteractedTimeout.current) clearTimeout(userInteractedTimeout.current);
    userInteractedTimeout.current = window.setTimeout(() => {
      setIsInteracting(false);
    }, 3500);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
    setIsInteracting(false);
  };

  return (
    <div className="mobile-house-transformation w-full px-2 py-4 sm:px-4">
      {/* Header Badge & Title */}
      <div className="text-center mb-3.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-magenta/15 border border-magenta/30 text-magenta text-[10px] font-extrabold uppercase tracking-widest mb-1.5 shadow-sm">
          <Sparkles className="w-3 h-3 text-cyan" /> Exterior Transformation
        </div>
        <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight leading-tight">
          Unpainted to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] via-[#ff0080] to-[#ffd400]">Luxury Painted</span>
        </h3>
        <p className="text-white/65 text-[11px] sm:text-xs mt-1 max-w-sm mx-auto leading-relaxed">
          Watch Muthulac coatings transform raw unpainted architecture in real-time.
        </p>
      </div>

      {/* Control Bar: Mode Switcher & Auto-Play Status */}
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto mb-3 px-1">
        {/* Mode Switcher */}
        <div className="flex items-center gap-1 p-0.5 bg-white/10 border border-white/15 rounded-full">
          <button
            type="button"
            onClick={() => {
              setMode('slider');
              setIsInteracting(false);
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
              mode === 'slider'
                ? 'bg-magenta text-white shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Sliders className="w-2.5 h-2.5" /> Sweep Wipe
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('stages');
              setIsInteracting(false);
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
              mode === 'stages'
                ? 'bg-magenta text-white shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            <Layers className="w-2.5 h-2.5" /> 6 Paint Coats
          </button>
        </div>

        {/* Live Animation Status / Play-Pause Button */}
        <button
          type="button"
          onClick={togglePlay}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-bold text-white hover:bg-white/20 transition-all"
          title={isPlaying ? 'Pause Animation' : 'Play Animation'}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isPlaying && !isInteracting ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
          {isPlaying ? (
            <>
              <Pause className="w-2.5 h-2.5 text-white/80" />
              <span>{isInteracting ? 'Touch Mode' : 'Animating'}</span>
            </>
          ) : (
            <>
              <Play className="w-2.5 h-2.5 text-cyan" />
              <span>Paused</span>
            </>
          )}
        </button>
      </div>

      {/* Visual Animated Canvas Container */}
      {mode === 'slider' ? (
        /* ============================================================ */
        /* MODE 1: Continuous Animated Wipe Slider                      */
        /* ============================================================ */
        <div className="relative">
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 select-none touch-none cursor-ew-resize bg-[#070D1C]"
          >
            {/* AFTER LAYER: Full Luxury Finished House */}
            <img
              src="/assets/hero/house/house-05-luxury-final.webp"
              alt="Muthulac Luxury Painted House"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Top Right Label: Painted */}
            <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-magenta/90 backdrop-blur-md text-[9px] font-extrabold tracking-wider uppercase text-white border border-white/30 shadow-lg flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-cyan" /> Painted Finish
            </div>

            {/* BEFORE LAYER: Raw Unpainted House (Clipped dynamically by sliderPos) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src="/assets/hero/house/house-00-unpainted.webp"
                alt="Unpainted Raw Concrete House"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100vw' }}
              />
              {/* Top Left Label: Unpainted */}
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[9px] font-extrabold tracking-wider uppercase text-white/90 border border-white/20 shadow-lg">
                Raw Unpainted
              </div>
            </div>

            {/* Glowing Animated Paint Divider Beam */}
            <div
              className="absolute top-0 bottom-0 w-1 z-20 pointer-events-none transition-all duration-75"
              style={{
                left: `${sliderPos}%`,
                background: 'linear-gradient(180deg, #00e5ff 0%, #ffffff 50%, #e6007e 100%)',
                boxShadow: '0 0 16px rgba(0, 229, 255, 0.9), 0 0 24px rgba(230, 0, 126, 0.7)',
              }}
            >
              {/* Center Handle Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-ink shadow-[0_4px_16px_rgba(0,0,0,0.6)] border-2 border-magenta flex items-center justify-center">
                <Sliders className="w-3.5 h-3.5 text-ink rotate-90" />
              </div>
            </div>

            {/* Bottom Floating Hint Overlay */}
            <div className="absolute bottom-2 inset-x-2 flex items-center justify-between px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-white/90">
              <span className="font-semibold text-cyan">
                {sliderPos < 50 ? 'Painting in progress...' : 'Finished Luxury Protection'}
              </span>
              <span className="text-[9px] text-white/60">
                {isInteracting ? 'Touch Drag Active' : 'Auto-Wipe Active'}
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* ============================================================ */
        /* MODE 2: Multi-Stage Progressive House Coating Layers         */
        /* ============================================================ */
        <div className="space-y-2.5">
          {/* Main Visual Display */}
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-[#070D1C]">
            <img
              key={houseStages[activeStage].id}
              src={houseStages[activeStage].image}
              alt={houseStages[activeStage].label}
              className="w-full h-full object-cover transition-opacity duration-500 animate-fade-in"
            />

            {/* Stage Info Glass Banner */}
            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/95 via-black/70 to-transparent">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-cyan">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  {houseStages[activeStage].tag}
                </span>
                <span className="text-[10px] font-mono text-white/60">
                  0{activeStage + 1} / 06
                </span>
              </div>
              <h4 className="text-sm font-bold text-white mt-0.5">
                {houseStages[activeStage].label}
              </h4>
              <p className="text-[11px] text-white/75 line-clamp-1">
                {houseStages[activeStage].subtitle}
              </p>
            </div>

            {/* Top Right Live Stage Indicator */}
            <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-magenta/90 backdrop-blur-md text-[9px] font-extrabold uppercase text-white border border-white/30">
              Coating Step {activeStage + 1}
            </div>
          </div>

          {/* Step Pill Buttons Grid */}
          <div className="grid grid-cols-3 gap-1.5">
            {houseStages.map((stage) => (
              <button
                key={stage.id}
                type="button"
                onClick={() => {
                  setActiveStage(stage.id);
                  setIsInteracting(true);
                  if (userInteractedTimeout.current) clearTimeout(userInteractedTimeout.current);
                  userInteractedTimeout.current = window.setTimeout(() => setIsInteracting(false), 4000);
                }}
                className={`px-2 py-1.5 rounded-xl text-left border transition-all ${
                  activeStage === stage.id
                    ? 'bg-gradient-to-r from-magenta/30 to-cyan/20 border-magenta text-white shadow-lg ring-1 ring-magenta/50'
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between text-[9px] font-mono text-white/50">
                  <span>0{stage.id + 1}</span>
                  {activeStage === stage.id && <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />}
                </div>
                <div className="text-[10px] font-bold truncate text-white">{stage.label}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Trust Badges & Direct Action Link */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-white/85 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan" /> 10-Year Weatherproof Exterior Seal
        </div>
        <button
          type="button"
          onClick={() => navigate('/colours')}
          className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-extrabold text-magenta hover:text-white transition-colors"
        >
          Explore Colours <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

export default MobileHouseTransformation;

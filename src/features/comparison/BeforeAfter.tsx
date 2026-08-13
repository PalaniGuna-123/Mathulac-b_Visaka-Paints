import React, { useRef, useState, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Sliders,
  Check,
  RotateCcw,
  Palette,
} from 'lucide-react';
import { roomScenes } from '../../data';

interface TransformationColor {
  name: string;
  code: string;
  hex: string;
  family: string;
}

const transformationColors: TransformationColor[] = [
  { name: 'Royal Velvet Magenta', code: 'VP-102', hex: '#E6007E', family: 'Vibrant' },
  { name: 'Ocean Sapphire', code: 'VP-304', hex: '#1E40AF', family: 'Blues' },
  { name: 'Emerald Sanctuary', code: 'VP-508', hex: '#065F46', family: 'Greens' },
  { name: 'Tuscan Terracotta', code: 'VP-612', hex: '#C25E2E', family: 'Warm Terracotta' },
  { name: 'Warm Amber Sun', code: 'VP-714', hex: '#D97706', family: 'Yellows' },
  { name: 'Nordic Slate Indigo', code: 'VP-820', hex: '#312E81', family: 'Deep Violets' },
];

export function BeforeAfter() {
  const [baPos, setBaPos] = useState(50);
  const [selectedScene, setSelectedScene] = useState(roomScenes[0]);
  const [selectedColor, setSelectedColor] = useState(transformationColors[0]);
  const baDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setBaPos(Math.max(1, Math.min(99, x)));
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    baDragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!baDragging.current) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    baDragging.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  return (
    <section id="transformation" className="relative py-16 md:py-20 px-4 md:px-8 bg-ink text-white overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-magenta/15 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-32 w-80 h-80 bg-cyan/15 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10" data-reveal>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-magenta/15 text-magenta text-[11px] font-extrabold uppercase tracking-widest mb-3 border border-magenta/30">
            <Sparkles className="w-3.5 h-3.5" /> Real-World Finish
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white leading-tight tracking-tight">
            See the <em>Transformation</em>
          </h2>
          <p className="text-white/70 text-xs sm:text-sm mt-2.5 max-w-xl mx-auto leading-relaxed">
            Drag the handle horizontally across the exact same space to experience the rich depth, seamless opacity, and vibrant brilliance of Mathulac paints.
          </p>
        </div>

        {/* Scene & Color Preset Selector Bar */}
        <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-white/[0.04] p-3 md:p-4 rounded-xl border border-white/10 backdrop-blur-xl">
          {/* Room Scene Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-1 md:pb-0">
            <span className="text-xs font-bold uppercase tracking-wider text-white/50 flex items-center gap-1 mr-1 flex-shrink-0">
              <Sliders className="w-3.5 h-3.5 text-cyan" /> Space:
            </span>
            {roomScenes.slice(0, 5).map((scene) => (
              <button
                key={scene.id}
                onClick={() => setSelectedScene(scene)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  selectedScene.id === scene.id
                    ? 'bg-white text-ink shadow-md'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {scene.name}
              </button>
            ))}
          </div>

          {/* Color Palette Chips for Transformation */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-1 md:pb-0 justify-start md:justify-end">
            <span className="text-xs font-bold uppercase tracking-wider text-white/50 flex items-center gap-1 mr-1 flex-shrink-0">
              <Palette className="w-3.5 h-3.5 text-magenta" /> Shade:
            </span>
            {transformationColors.map((color) => {
              const isSelected = selectedColor.name === color.name;
              return (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`group relative w-8 h-8 rounded-full transition-transform hover:scale-110 flex items-center justify-center cursor-pointer ${
                    isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-ink scale-110' : 'opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={`${color.name} (${color.code})`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 text-white drop-shadow-md" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* The Exact Same Image Transformation Slider Container */}
        <div
          ref={containerRef}
          className="relative aspect-[16/9] sm:aspect-[16/10] md:aspect-[16/9] rounded-xl overflow-hidden select-none shadow-2xl border border-white/15 cursor-ew-resize touch-none"
          data-reveal
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* ============================================================ */}
          {/* AFTER LAYER (Full background: The exact same room with Mathulac paint) */}
          {/* ============================================================ */}
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${selectedScene.image})` }}>
            {/* Wall Paint Color Blend Layer on the exact same wall mask */}
            <div
              className="absolute inset-0 transition-colors duration-500"
              style={{
                clipPath: selectedScene.mask,
                backgroundColor: selectedColor.hex,
                mixBlendMode: 'multiply',
                opacity: 0.88,
              }}
            />
            {/* Satin/Silk Sheen Highlight Layer */}
            <div
              className="absolute inset-0 pointer-events-none transition-colors duration-500"
              style={{
                clipPath: selectedScene.mask,
                backgroundColor: selectedColor.hex,
                mixBlendMode: 'soft-light',
                opacity: 0.72,
              }}
            />
          </div>

          {/* ============================================================ */}
          {/* BEFORE LAYER (Clipped overlay: The exact same room in dull unpainted/faded state) */}
          {/* ============================================================ */}
          <div
            className="absolute inset-0 bg-cover bg-center overflow-hidden"
            style={{
              backgroundImage: `url(${selectedScene.image})`,
              filter: 'grayscale(0.7) contrast(0.92) brightness(0.95)',
              clipPath: `inset(0 ${100 - baPos}% 0 0)`,
            }}
          />

          {/* Floating Badges */}
          <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 text-white text-[11px] font-extrabold uppercase tracking-wider pointer-events-none shadow-lg flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white/40" />
            BEFORE (Faded / Unpainted)
          </div>

          <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-magenta via-pink-600 to-violet backdrop-blur-md text-white text-[11px] font-extrabold uppercase tracking-wider pointer-events-none shadow-lg shadow-magenta/25 border border-white/20 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            AFTER: Mathulac {selectedColor.name}
          </div>

          {/* Active Shade Info Badge at Bottom Right of After side */}
          <div className="absolute bottom-4 right-4 hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-ink/80 border border-white/15 backdrop-blur-md pointer-events-none">
            <span className="w-4 h-4 rounded-full border border-white/30" style={{ backgroundColor: selectedColor.hex }} />
            <div className="text-left leading-none">
              <strong className="text-xs font-bold text-white block">{selectedColor.name}</strong>
              <small className="text-[10px] text-white/60 font-semibold">{selectedColor.code} • Luxury Silk Finish</small>
            </div>
          </div>

          {/* Wipe Divider Line */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_15px_rgba(255,255,255,0.9)] pointer-events-none"
            style={{ left: `${baPos}%` }}
          >
            {/* Draggable Circle Handle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-ink flex items-center justify-center shadow-2xl border-2 border-magenta transition-transform hover:scale-110 active:scale-95">
              <div className="flex items-center justify-center -space-x-1">
                <ChevronLeft className="w-4 h-4 text-ink" />
                <ChevronRight className="w-4 h-4 text-ink" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Position Reset / Quick Snap Buttons */}
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            onClick={() => setBaPos(5)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              baPos <= 10 ? 'bg-white text-ink font-bold' : 'bg-white/10 hover:bg-white/20 text-white/80'
            }`}
          >
            Show Before
          </button>
          <button
            onClick={() => setBaPos(50)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
              baPos >= 45 && baPos <= 55 ? 'bg-white text-ink font-bold' : 'bg-white/10 hover:bg-white/20 text-white/80'
            }`}
          >
            <RotateCcw className="w-3 h-3" /> 50/50 Comparison
          </button>
          <button
            onClick={() => setBaPos(95)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              baPos >= 90 ? 'bg-white text-ink font-bold' : 'bg-white/10 hover:bg-white/20 text-white/80'
            }`}
          >
            Show After (Mathulac)
          </button>
        </div>
      </div>
    </section>
  );
}

export default BeforeAfter;

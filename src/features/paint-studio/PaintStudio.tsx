import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Search,
  Share2,
  SlidersHorizontal,
  Sparkles,
  Sun,
  X,
  ArrowRight,
  Upload,
  Image as ImageIcon,
  Palette,
  RotateCcw,
  Sliders,
  Info,
  Loader2,
} from 'lucide-react';
import { paintShades, roomScenes, familySwatches, colorFamilies, type PaintShade } from '../../data';
import { Link } from '../../routes/Router';
import {
  renderPaintedRoomCanvas,
  getComplementaryPalette,
  segmentWalls,
  type LightingMode,
  type FinishMode,
} from './canvasEngine';

const lightingOptions: LightingMode[] = ['Daylight', 'Warm Light', 'Evening', 'Natural'];
const finishes: FinishMode[] = ['Matte', 'Silk', 'Satin', 'Gloss'];

interface PaintStudioProps {
  scrollTo?: (id: string) => void;
  initialShadeId?: string;
}

export function PaintStudio({ scrollTo, initialShadeId }: PaintStudioProps) {
  const defaultShade = useMemo(() => {
    if (initialShadeId) {
      const found = paintShades.find((s) => s.id === initialShadeId || s.code === initialShadeId);
      if (found) return found;
    }
    return paintShades[0]; // Warm Beige MB-101
  }, [initialShadeId]);

  const [shade, setShade] = useState<PaintShade>(defaultShade);
  const [roomIndex, setRoomIndex] = useState(0);
  const [family, setFamily] = useState<string>('ALL');
  const [query, setQuery] = useState('');
  const [lighting, setLighting] = useState<LightingMode>('Natural');
  const [finish, setFinish] = useState<FinishMode>('Matte');
  const [before, setBefore] = useState(50);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [showFavourites, setShowFavourites] = useState(false);
  const [toast, setToast] = useState('');

  // User image upload state
  const [userImage, setUserImage] = useState<HTMLImageElement | null>(null);
  const [userMaskCanvas, setUserMaskCanvas] = useState<HTMLCanvasElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadDragOver, setUploadDragOver] = useState(false);
  const [segmentInfo, setSegmentInfo] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const beforeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const paletteRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dragging = useRef(false);

  const currentRoom = roomScenes[roomIndex];

  // Load Favourites from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('visaka-mathulac-favourite-shades');
      if (saved) setFavourites(JSON.parse(saved));
    } catch {
      setFavourites([]);
    }
  }, []);

  // Save Favourites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('visaka-mathulac-favourite-shades', JSON.stringify(favourites));
    } catch {
      // ignore
    }
  }, [favourites]);

  // Toast Auto-dismiss
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(''), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  // Animate Swatch Grid Changes
  useEffect(() => {
    const cards = paletteRef.current?.querySelectorAll('.studio-palette-card');
    if (!cards || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(cards, { opacity: 0, y: 12 }, { opacity: 1, y: 0, stagger: 0.03, duration: 0.35, ease: 'power2.out', overwrite: true });
  }, [family, query]);

  // Main Photorealistic Wall Canvas Render Loop
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (userImage) {
      // Render user uploaded photo
      renderPaintedRoomCanvas(canvas, {
        image: userImage,
        customMaskCanvas: userMaskCanvas,
        hex: shade.hex,
        finish,
        lighting,
      });
    } else {
      // Render selected preset room scene
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = currentRoom.image;
      img.onload = () => {
        renderPaintedRoomCanvas(canvas, {
          image: img,
          maskPolygon: currentRoom.mask,
          hex: shade.hex,
          finish,
          lighting,
        });
      };
    }
  }, [userImage, userMaskCanvas, shade.hex, finish, lighting, currentRoom]);

  // Render Before (Original) Canvas for Comparison
  const renderBeforeCanvas = useCallback(() => {
    const beforeCanvas = beforeCanvasRef.current;
    if (!beforeCanvas) return;
    const ctx = beforeCanvas.getContext('2d');
    if (!ctx) return;

    if (userImage) {
      beforeCanvas.width = userImage.naturalWidth || 1600;
      beforeCanvas.height = userImage.naturalHeight || 1000;
      ctx.drawImage(userImage, 0, 0, beforeCanvas.width, beforeCanvas.height);
    } else {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = currentRoom.image;
      img.onload = () => {
        beforeCanvas.width = img.naturalWidth || 1600;
        beforeCanvas.height = img.naturalHeight || 1000;
        ctx.drawImage(img, 0, 0, beforeCanvas.width, beforeCanvas.height);
      };
    }
  }, [userImage, currentRoom]);

  useEffect(() => {
    renderCanvas();
    renderBeforeCanvas();
  }, [renderCanvas, renderBeforeCanvas]);

  // Handle User File Upload
  const processUploadedFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setToast('Please upload a valid room image (JPG, PNG, WEBP)');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setUserImage(img);
        const seg = segmentWalls(img);
        setUserMaskCanvas(seg.maskCanvas);
        setSegmentInfo(seg.message);
        setIsUploading(false);
        setToast('Your room was loaded! Apply Visaka shades live below.');
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setUploadDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processUploadedFile(e.target.files[0]);
    }
  };

  const resetUserUpload = () => {
    setUserImage(null);
    setUserMaskCanvas(null);
    setSegmentInfo(null);
    setToast('Reset to default room scenes');
  };

  // Filter Shades
  const filteredShades = useMemo(() => {
    return paintShades.filter((item) => {
      const term = query.trim().toLowerCase();
      const matchesFamily = family === 'ALL' || item.family.toUpperCase() === family.toUpperCase();
      const matchesQuery =
        !term ||
        [item.name, item.id, item.code, item.family, item.collection || '', item.space || ''].some((val) =>
          val.toLowerCase().includes(term)
        );
      return matchesFamily && matchesQuery;
    });
  }, [family, query]);

  // Complementary Palette for currently selected shade
  const complementaryPalette = useMemo(() => {
    return getComplementaryPalette(shade, paintShades);
  }, [shade]);

  const isFavourite = favourites.includes(shade.id);

  const toggleFavourite = (id: string) => {
    setFavourites((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const selectShade = (next: PaintShade) => {
    setShade(next);
    requestAnimationFrame(() => {
      const el = paletteRef.current?.querySelector(`[data-shade-id="${next.id}"]`);
      el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
  };

  const updateBeforeSlider = useCallback((clientX: number, rect: DOMRect) => {
    setBefore(Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  const shareShade = async () => {
    const shareText = `VISAKA MATHULAC — ${shade.name} (${shade.id}) | ${shade.family} Collection`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Visaka Paint Shade', text: shareText, url: window.location.href });
        return;
      } catch {
        return;
      }
    }
    await navigator.clipboard?.writeText(`${shareText}\n${window.location.href}`);
    setToast('Shade code & link copied to clipboard!');
  };

  const handleContactClick = (e: React.MouseEvent) => {
    if (scrollTo) {
      e.preventDefault();
      scrollTo('contact');
    }
  };

  return (
    <section id="studio" className="studio-shell relative py-16 md:py-28 px-4 md:px-8 overflow-hidden">
      {/* Animated Liquid Paint Background */}
      <div className="liquid-paint-bg">
        <div className="liquid-paint-blob liquid-paint-blob-1" />
        <div className="liquid-paint-blob liquid-paint-blob-2" />
        <div className="liquid-paint-blob liquid-paint-blob-3" />
      </div>

      {/* Hero / Intro Section */}
      <div className="studio-intro text-center">
        <span className="studio-kicker">
          <Sparkles className="w-3.5 h-3.5" /> Visaka Architectural Visualizer
        </span>
        <h2>
          See Your Space in a <em>New Colour.</em>
        </h2>
        <p className="mx-auto">
          Explore thousands of VISAKA shades and experience how they transform your walls in real time with true ambient lighting, realistic surface finishes, and instant custom photo upload.
        </p>

        <div className="studio-hero-ctas">
          <button
            onClick={() => {
              document.getElementById('main-visualizer')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="studio-primary cursor-pointer"
          >
            <Palette className="w-4 h-4" /> Start Visualizing
          </button>

          <Link to="/colours" className="studio-secondary">
            Explore Shade Library <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* MAIN VISUALIZER WORKSPACE */}
      <div id="main-visualizer" className="max-w-[1400px] mx-auto mt-14 studio-grid">
        {/* Left Column: Photorealistic Canvas Room & Controls */}
        <div className="space-y-5">
          <div className="studio-visual-card">
            {/* Photorealistic Canvas Frame */}
            <div className="studio-room relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl">
              <canvas ref={canvasRef} className="w-full h-full object-cover" />

              {isUploading && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-20 flex items-center justify-center text-white gap-3">
                  <Loader2 className="w-6 h-6 animate-spin text-magenta" />
                  <span className="text-sm font-bold">Analyzing wall surfaces...</span>
                </div>
              )}

              {/* Room Top Toolbar */}
              <div className="studio-room-toolbar">
                <span className="flex items-center">
                  <span className="studio-live-dot" />
                  {userImage ? 'Uploaded Custom Photo' : currentRoom.name}
                </span>
                <div className="flex items-center gap-2">
                  <span className="bg-black/50 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                    {finish} Finish
                  </span>
                  <span className="bg-black/50 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                    {lighting}
                  </span>
                </div>
              </div>

              {/* Room Bottom Swatch Tag */}
              <div className="studio-room-caption">
                <span>{shade.id}</span>
                <strong>{shade.name}</strong>
                <small>{shade.family} Collection • {shade.hex}</small>
              </div>

              {userImage && (
                <button
                  onClick={resetUserUpload}
                  className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-md transition-colors z-10 cursor-pointer"
                  title="Reset to default scenes"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Room Selector Strip & Photo Upload Button */}
            <div className="mt-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="flex-1">
                <span className="studio-room-selector-label">Select Default Room Scene</span>
                <div className="studio-room-strip no-scrollbar">
                  {roomScenes.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setUserImage(null);
                        setRoomIndex(idx);
                      }}
                      className={!userImage && idx === roomIndex ? 'is-active cursor-pointer' : 'cursor-pointer'}
                      aria-label={`Switch to ${item.name}`}
                    >
                      <img src={item.image} alt={item.name} />
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload Button Trigger */}
              <div className="flex-shrink-0">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full md:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-magenta to-violet text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:opacity-95 transition-opacity cursor-pointer"
                >
                  <Upload className="w-4 h-4" /> + Upload Your Room
                </button>
              </div>
            </div>

            {/* Drag & Drop Zone when Dragging File */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setUploadDragOver(true);
              }}
              onDragLeave={() => setUploadDragOver(false)}
              onDrop={handleDrop}
              className={`upload-drop-zone mt-3 ${uploadDragOver ? 'is-dragging' : ''}`}
            >
              <div className="flex items-center justify-center gap-3 text-xs text-[#6d6471]">
                <ImageIcon className="w-4 h-4 text-[#d43b7a]" />
                <span>
                  <strong>Drag & drop your room photo here</strong> (JPG, PNG, WEBP) to test Visaka colours on your real wall.
                </span>
              </div>
            </div>

            {/* AI Segmentation Status Info */}
            {segmentInfo && (
              <div className="mt-3 p-3 rounded-xl bg-magenta/10 border border-magenta/20 text-xs text-[#252033] flex items-center gap-2">
                <Info className="w-4 h-4 text-[#d43b7a] flex-shrink-0" />
                <span>{segmentInfo}</span>
              </div>
            )}
          </div>

          {/* Interactive Before / After Split Comparison */}
          <div className="studio-visual-card p-5">
            <div className="studio-compare-label flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#252033]">
                <Sliders className="w-4 h-4 text-[#d43b7a]" /> Wall Transformation Comparison
              </span>
              <span className="text-xs text-black/50 font-normal">Drag handle left/right</span>
            </div>

            <div
              className="studio-compare-image cursor-ew-resize select-none relative h-44 rounded-xl overflow-hidden shadow-inner"
              onMouseDown={(e) => {
                dragging.current = true;
                updateBeforeSlider(e.clientX, e.currentTarget.getBoundingClientRect());
              }}
              onMouseMove={(e) => {
                if (dragging.current) updateBeforeSlider(e.clientX, e.currentTarget.getBoundingClientRect());
              }}
              onMouseUp={() => {
                dragging.current = false;
              }}
              onTouchStart={(e) => {
                dragging.current = true;
                updateBeforeSlider(e.touches[0].clientX, e.currentTarget.getBoundingClientRect());
              }}
              onTouchMove={(e) => {
                if (dragging.current) updateBeforeSlider(e.touches[0].clientX, e.currentTarget.getBoundingClientRect());
              }}
              onTouchEnd={() => {
                dragging.current = false;
              }}
            >
              {/* Original Unpainted Canvas */}
              <canvas ref={beforeCanvasRef} className="absolute inset-0 w-full h-full object-cover" />
              <div className="studio-before-label">Original Wall</div>

              {/* Painted Split Canvas Container */}
              <div className="studio-compare-after" style={{ width: `${100 - before}%` }}>
                <div style={{ backgroundColor: shade.hex, height: '100%', width: '100%', opacity: 0.85 }} />
                <div className="studio-after-label">VISAKA {shade.name}</div>
              </div>

              {/* Draggable Handle */}
              <div className="studio-compare-handle" style={{ left: `${before}%` }}>
                <ChevronLeft className="w-3.5 h-3.5 -mr-1 text-[#252033]" />
                <ChevronRight className="w-3.5 h-3.5 -ml-1 text-[#252033]" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Controls & Shade Details */}
        <div className="space-y-6">
          <div className="studio-controls">
            {/* Active Selected Swatch Card */}
            <div className="studio-selection-card">
              <div className="studio-swatch-large swatch-chip-organic" style={{ backgroundColor: shade.hex }}>
                <span>{shade.id}</span>
              </div>
              <div>
                <span className="studio-overline">{shade.family} Collection</span>
                <h3>{shade.name}</h3>
                <p>{shade.code} • Recommended: {shade.space}</p>
              </div>
              <button
                onClick={() => toggleFavourite(shade.id)}
                className={`studio-heart cursor-pointer ${isFavourite ? 'is-favourite' : ''}`}
                aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
              >
                <Heart className="w-5 h-5" fill={isFavourite ? 'currentColor' : 'none'} />
              </button>
            </div>

            <p className="studio-shade-description">{shade.description}</p>

            {/* Lighting Simulation Options */}
            <div className="studio-control-group">
              <span className="studio-overline flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-[#ff7a00]" /> Ambient Lighting Simulation
              </span>
              <div className="studio-option-grid">
                {lightingOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setLighting(opt)}
                    className={lighting === opt ? 'is-active cursor-pointer' : 'cursor-pointer'}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Surface Finish Sheen Options */}
            <div className="studio-control-group">
              <span className="studio-overline flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#00c8ff]" /> Surface Sheen & Finish
              </span>
              <div className="studio-finish-tabs">
                {finishes.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFinish(f)}
                    className={finish === f ? 'is-active cursor-pointer' : 'cursor-pointer'}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Palette Builder — Complementary Colour Engine */}
            <div className="studio-control-group">
              <span className="studio-overline flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-[#e6007e]" /> Build Your Palette (Color Harmony)
              </span>
              <div className="palette-builder-grid">
                <button
                  onClick={() => selectShade(complementaryPalette.complementary)}
                  className="palette-builder-chip cursor-pointer"
                  title={`Complementary: ${complementaryPalette.complementary.name}`}
                >
                  <div className="palette-builder-swatch" style={{ backgroundColor: complementaryPalette.complementary.hex }} />
                  <span>Comp</span>
                </button>
                <button
                  onClick={() => selectShade(complementaryPalette.similar)}
                  className="palette-builder-chip cursor-pointer"
                  title={`Similar: ${complementaryPalette.similar.name}`}
                >
                  <div className="palette-builder-swatch" style={{ backgroundColor: complementaryPalette.similar.hex }} />
                  <span>Similar</span>
                </button>
                <button
                  onClick={() => selectShade(complementaryPalette.lighter)}
                  className="palette-builder-chip cursor-pointer"
                  title={`Lighter: ${complementaryPalette.lighter.name}`}
                >
                  <div className="palette-builder-swatch" style={{ backgroundColor: complementaryPalette.lighter.hex }} />
                  <span>Lighter</span>
                </button>
                <button
                  onClick={() => selectShade(complementaryPalette.darker)}
                  className="palette-builder-chip cursor-pointer"
                  title={`Darker: ${complementaryPalette.darker.name}`}
                >
                  <div className="palette-builder-swatch" style={{ backgroundColor: complementaryPalette.darker.hex }} />
                  <span>Darker</span>
                </button>
                <button
                  onClick={() => selectShade(complementaryPalette.accent)}
                  className="palette-builder-chip cursor-pointer"
                  title={`Accent: ${complementaryPalette.accent.name}`}
                >
                  <div className="palette-builder-swatch" style={{ backgroundColor: complementaryPalette.accent.hex }} />
                  <span>Accent</span>
                </button>
              </div>
            </div>

            {/* Specifications Info */}
            <div className="studio-info">
              <div>
                <span>HEX CODE</span>
                <strong>{shade.hex}</strong>
              </div>
              <div>
                <span>BEST ROOM</span>
                <strong>{shade.space}</strong>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="studio-action-row mt-3">
              <Link
                to="/contact"
                onClick={handleContactClick}
                className="studio-primary flex-1"
              >
                Sample This Shade <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={shareShade}
                className="studio-icon-button cursor-pointer"
                aria-label="Share shade details"
                title="Share shade"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Palette Explorer */}
          <div className="studio-explorer">
            <div className="studio-explorer-header">
              <div>
                <span className="studio-overline">Browse Visaka Catalog</span>
                <h3>Shade Explorer</h3>
              </div>
              <button
                onClick={() => setShowFavourites(true)}
                className="studio-favourites-link cursor-pointer"
              >
                <Heart className="w-4 h-4" /> Favourites ({favourites.length})
              </button>
            </div>

            {/* Search Input */}
            <div className="studio-search">
              <Search className="w-4 h-4 text-black/40" />
              <input
                type="text"
                placeholder="Search shades by name, code or tone..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button onClick={() => setQuery('')} aria-label="Clear search" className="cursor-pointer">
                  <X className="w-4 h-4 text-black/40" />
                </button>
              )}
            </div>

            {/* Family Category Pills */}
            <div className="studio-family-tabs no-scrollbar">
              {colorFamilies.map((fam) => (
                <button
                  key={fam}
                  onClick={() => setFamily(fam)}
                  className={family === fam ? 'is-active cursor-pointer' : 'cursor-pointer'}
                >
                  {familySwatches[fam]?.name || fam}
                </button>
              ))}
            </div>

            {/* Mini Swatches Grid */}
            <div ref={paletteRef} className="studio-palette">
              {filteredShades.slice(0, 18).map((item) => (
                <button
                  key={item.id}
                  data-shade-id={item.id}
                  onClick={() => selectShade(item)}
                  className={`studio-palette-card cursor-pointer ${item.id === shade.id ? 'is-selected' : ''}`}
                >
                  <div className="studio-card-swatch" style={{ backgroundColor: item.hex }} />
                  <div className="studio-card-copy">
                    <strong>{item.name}</strong>
                    <small>{item.id}</small>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 text-center">
              <Link
                to="/colours"
                className="text-xs font-extrabold uppercase tracking-widest text-[#d43b7a] hover:underline inline-flex items-center gap-1"
              >
                OPEN FULL 1,000+ SHADE LIBRARY <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Favourites Modal */}
      {showFavourites && (
        <div className="studio-modal-backdrop" onClick={() => setShowFavourites(false)}>
          <div className="studio-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="studio-modal-close cursor-pointer"
              onClick={() => setShowFavourites(false)}
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <h3>Saved Favourites</h3>
            {favourites.length === 0 ? (
              <p className="studio-modal-empty">You have not favourited any shades yet. Click the heart icon on any shade card to save your favourite pigments here!</p>
            ) : (
              <div className="studio-favourite-grid">
                {paintShades
                  .filter((item) => favourites.includes(item.id))
                  .map((f) => (
                    <div key={f.id} className="studio-favourite-item">
                      <span style={{ backgroundColor: f.hex }} />
                      <div>
                        <strong>{f.name}</strong>
                        <small>{f.id} • {f.family}</small>
                      </div>
                      <button
                        onClick={() => {
                          selectShade(f);
                          setShowFavourites(false);
                        }}
                        className="text-xs font-bold text-[#d43b7a] hover:underline cursor-pointer"
                      >
                        Visualize
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Toast */}
      {toast && (
        <div className="studio-toast">
          <Check className="w-4 h-4" /> {toast}
        </div>
      )}
    </section>
  );
}

export default PaintStudio;

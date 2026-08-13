import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  Check,
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
  Info,
  Loader2,
  Filter,
  CheckCircle2,
} from 'lucide-react';
import {
  paintShades,
  familySwatches,
  colorFamilies,
  visualizationScenes,
  sceneCategoryTabs,
  type PaintShade,
  type VisualizationScene,
} from '../../data';
import { Link, useNavigate } from '../../routes/Router';
import {
  renderPaintedRoomCanvas,
  getComplementaryPalette,
  segmentWalls,
  type LightingMode,
  type FinishMode,
  type CoverageMode,
} from './canvasEngine';

const lightingOptions: LightingMode[] = ['Daylight', 'Warm Light', 'Evening', 'Natural'];
const finishes: FinishMode[] = ['Matte', 'Silk', 'Satin', 'Gloss'];

interface PaintStudioProps {
  scrollTo?: (id: string) => void;
  initialShadeId?: string;
}

export function PaintStudio({ scrollTo, initialShadeId }: PaintStudioProps) {
  const navigate = useNavigate();

  // URL Query Param state resolution e.g. /studio?shade=MB-101
  const queryShadeId = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const params = new URLSearchParams(window.location.search);
    return params.get('shade') || initialShadeId || null;
  }, [initialShadeId]);

  const defaultShade = useMemo(() => {
    if (queryShadeId) {
      const found = paintShades.find(
        (s) => s.id.toUpperCase() === queryShadeId.toUpperCase() || s.code.toUpperCase() === queryShadeId.toUpperCase()
      );
      if (found) return found;
    }
    return paintShades[0]; // Default: Warm Beige MB-101
  }, [queryShadeId]);

  const [shade, setShade] = useState<PaintShade>(defaultShade);
  const [activeScene, setActiveScene] = useState<VisualizationScene>(visualizationScenes[0]); // Default: Living Room
  const [selectedSceneTab, setSelectedSceneTab] = useState<string>('ALL');

  const [family, setFamily] = useState<string>('ALL');
  const [query, setQuery] = useState('');
  const [lighting, setLighting] = useState<LightingMode>('Natural');
  const [finish, setFinish] = useState<FinishMode>('Matte');
  const [coverageMode, setCoverageMode] = useState<CoverageMode>('smart');
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
  const paletteRef = useRef<HTMLDivElement | null>(null);
  const scenesGridRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync initial URL shade change
  useEffect(() => {
    if (defaultShade) setShade(defaultShade);
  }, [defaultShade]);

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

  // Animate Scene Grid Changes
  useEffect(() => {
    const cards = scenesGridRef.current?.querySelectorAll('.scene-card');
    if (!cards || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(cards, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, stagger: 0.02, duration: 0.3, ease: 'power2.out', overwrite: true });
  }, [selectedSceneTab]);

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
        coverageMode,
      });
    } else {
      // Render selected preset scene
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = activeScene.image;
      img.onload = () => {
        renderPaintedRoomCanvas(canvas, {
          image: img,
          maskPolygon: activeScene.mask,
          hex: shade.hex,
          finish,
          lighting,
          coverageMode: 'smart',
        });
      };
    }
  }, [userImage, userMaskCanvas, shade.hex, finish, lighting, coverageMode, activeScene]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

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
        setCoverageMode('smart');
        setIsUploading(false);
        setToast('Room photo loaded! Click any shade on the right to paint live.');
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

  // Filter Scenes by Category
  const filteredScenes = useMemo(() => {
    if (selectedSceneTab === 'ALL') return visualizationScenes;
    return visualizationScenes.filter(
      (s) => s.category === selectedSceneTab || s.subCategory === selectedSceneTab
    );
  }, [selectedSceneTab]);

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
    if (!next) return;
    setShade(next);
    requestAnimationFrame(() => {
      const el = paletteRef.current?.querySelector(`[data-shade-id="${next.id}"]`);
      el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
  };

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
    <section id="studio" className="studio-shell relative py-16 md:py-24 px-4 md:px-8 overflow-hidden">
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
          Explore thousands of VISAKA shades and experience how they transform your walls, facades, wood, and automotive surfaces in real time.
        </p>

        <div className="studio-hero-ctas">
          <button
            onClick={() => {
              document.getElementById('main-visualizer')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="studio-primary cursor-pointer group"
            data-cursor="visualize"
          >
            <Palette className="w-4 h-4 transition-transform group-hover:rotate-12" />
            <span>Start Visualizing</span>
          </button>

          <button
            onClick={() => navigate('/colours')}
            className="studio-secondary cursor-pointer group"
            data-cursor="explore"
          >
            <span>Explore Shade Library</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* MAIN VISUALIZER WORKSPACE */}
      <div id="main-visualizer" className="max-w-[1400px] mx-auto mt-14 studio-grid">
        {/* Left Column: Photorealistic Canvas Room & 25+ Scene Selector */}
        <div className="space-y-5">
          <div className="studio-visual-card">
            {/* Photorealistic Canvas Frame */}
            <div className="studio-room relative aspect-[16/10] rounded-xl overflow-hidden shadow-2xl">
              <canvas ref={canvasRef} className="w-full h-full object-cover" />

              {isUploading && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-20 flex items-center justify-center text-white gap-3">
                  <Loader2 className="w-6 h-6 animate-spin text-magenta" />
                  <span className="text-sm font-bold">Analyzing surface contours...</span>
                </div>
              )}

              {/* Room Top Toolbar */}
              <div className="studio-room-toolbar">
                <span className="flex items-center">
                  <span className="studio-live-dot" />
                  {userImage ? 'Custom Photo (Live Painted)' : activeScene.name}
                </span>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {userImage && (
                    <div className="flex items-center bg-black/60 p-0.5 rounded-full backdrop-blur-md border border-white/20">
                      <button
                        onClick={() => setCoverageMode('smart')}
                        className={`px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          coverageMode === 'smart'
                            ? 'bg-[#d43b7a] text-white shadow'
                            : 'text-white/70 hover:text-white'
                        }`}
                        title="Smart wall segmentation"
                      >
                        Smart Walls
                      </button>
                      <button
                        onClick={() => setCoverageMode('full')}
                        className={`px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          coverageMode === 'full'
                            ? 'bg-[#d43b7a] text-white shadow'
                            : 'text-white/70 hover:text-white'
                        }`}
                        title="Paint entire surface / facade"
                      >
                        Full Coat
                      </button>
                    </div>
                  )}
                  <span className="bg-black/50 px-2.5 sm:px-3 py-1 rounded-full backdrop-blur-md border border-white/10 text-[10px] sm:text-xs">
                    {finish}
                  </span>
                  <span className="bg-black/50 px-2.5 sm:px-3 py-1 rounded-full backdrop-blur-md border border-white/10 text-[10px] sm:text-xs">
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

            {/* CATEGORY-BASED SCENE NAVIGATION & 25+ SCENE CARDS */}
            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#252033] flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-[#d43b7a]" /> Select Visualization Scene ({filteredScenes.length})
                </span>
                <span className="text-xs text-black/50">{activeScene.name} Selected</span>
              </div>

              {/* Category Filter Pills */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {sceneCategoryTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedSceneTab(tab.id)}
                    className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${selectedSceneTab === tab.id
                        ? 'bg-[#272037] text-white shadow-md'
                        : 'bg-white/70 text-[#5c5364] hover:bg-white hover:text-[#272037] border border-black/5'
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Scene Cards Grid */}
              <div ref={scenesGridRef} className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2.5 max-h-64 overflow-y-auto no-scrollbar p-1">
                {filteredScenes.map((scene) => {
                  const isSelected = !userImage && activeScene.id === scene.id;
                  return (
                    <button
                      key={scene.id}
                      onClick={() => {
                        setUserImage(null);
                        setActiveScene(scene);
                      }}
                      className={`scene-card group relative aspect-[4/3] rounded-xl overflow-hidden border-2 text-left transition-all cursor-pointer ${isSelected ? 'border-[#d43b7a] shadow-lg scale-[1.02]' : 'border-transparent hover:scale-105'
                        }`}
                    >
                      <img src={scene.image} alt={scene.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <span className="absolute bottom-1.5 left-1.5 right-1.5 text-[10px] font-bold text-white leading-tight drop-shadow-md">
                        {scene.name}
                      </span>
                      {isSelected && (
                        <span className="absolute top-1.5 right-1.5 bg-[#d43b7a] text-white p-0.5 rounded-full shadow">
                          <CheckCircle2 className="w-3 h-3" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Photo Upload Trigger & Drag-and-Drop */}
            <div className="mt-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-3 border-t border-black/10">
              <div className="flex-1">
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setUploadDragOver(true);
                  }}
                  onDragLeave={() => setUploadDragOver(false)}
                  onDrop={handleDrop}
                  className={`upload-drop-zone ${uploadDragOver ? 'is-dragging' : ''}`}
                >
                  <div className="flex items-center justify-center gap-3 text-xs text-[#6d6471]">
                    <ImageIcon className="w-4 h-4 text-[#d43b7a]" />
                    <span>
                      <strong>Drag & drop your room/surface photo here</strong> (JPG, PNG, WEBP)
                    </span>
                  </div>
                </div>
              </div>

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
                  <Upload className="w-4 h-4" /> + Upload Custom Photo
                </button>
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
        </div>

        {/* Right Column: Shade Explorer & Active Shade Controls */}
        <div className="space-y-6">
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
              <button
                onClick={() => navigate('/colours')}
                className="text-xs font-extrabold uppercase tracking-widest text-[#d43b7a] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                OPEN FULL 1,000+ SHADE LIBRARY <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Active Selected Swatch Controls & Details */}
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

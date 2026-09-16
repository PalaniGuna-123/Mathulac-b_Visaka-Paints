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
  PenTool,
  Trash2,
  Eye,
  EyeOff,
  Undo2,
  Layers,
  MousePointerClick,
  Plus,
} from 'lucide-react';
import {
  paintShades,
  familySwatches,
  colorFamilies,
  visualizationScenes,
  sceneCategoryTabs,
  getSceneZones,
  type PaintShade,
  type VisualizationScene,
  type SceneZone,
} from '../../data';
import { Link, useNavigate } from '../../routes/Router';
import { FloatingPaintBubbles, PaintSplash } from '../../components/paint';
import {
  renderPaintedRoomCanvas,
  getComplementaryPalette,
  segmentWalls,
  parsePolygonPoints,
  pointsToPolygonString,
  isPointInsidePolygon,
  type LightingMode,
  type FinishMode,
  type CoverageMode,
  type PaintedZone,
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

  // Architectural preset zones for the active scene
  const availablePresetZones = useMemo(() => {
    return getSceneZones(activeScene);
  }, [activeScene]);

  // Selected active zone ID (defaults to first preset wall shape e.g. 'accent-left')
  const [activeZoneId, setActiveZoneId] = useState<string>(() => {
    return availablePresetZones[0]?.id || 'accent-left';
  });

  // Map of zoneId -> { hex: string, shade: PaintShade }
  // Only the active zone starts with a color; other zones are natural/unpainted until chosen!
  const [paintedZones, setPaintedZones] = useState<Record<string, { hex: string; shade: PaintShade }>>(() => {
    const initId = availablePresetZones[0]?.id || 'accent-left';
    return {
      [initId]: { hex: defaultShade.hex, shade: defaultShade },
    };
  });

  // Custom drawn shapes by user: { id: string, name: string, polygon: string, points: [number, number][] }
  const [customShapes, setCustomShapes] = useState<Array<{
    id: string;
    name: string;
    polygon: string;
    points: Array<[number, number]>;
  }>>([]);

  // Interactive drawing mode state
  const [isDrawingMode, setIsDrawingMode] = useState<boolean>(false);
  const [drawPoints, setDrawPoints] = useState<Array<[number, number]>>([]);
  const [showZoneOutlines, setShowZoneOutlines] = useState<boolean>(true);
  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null);

  // User image upload state
  const [userImage, setUserImage] = useState<HTMLImageElement | null>(null);
  const [userMaskCanvas, setUserMaskCanvas] = useState<HTMLCanvasElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadDragOver, setUploadDragOver] = useState(false);
  const [segmentInfo, setSegmentInfo] = useState<string | null>(null);

  // All zones combined for current view (presets + user custom drawn shapes)
  const allZones = useMemo(() => {
    if (userImage) {
      return customShapes.map((cs) => ({
        id: cs.id,
        name: cs.name,
        polygon: cs.polygon,
        points: cs.points,
        isCustom: true,
      }));
    }
    const presets = availablePresetZones.map((pz) => ({
      id: pz.id,
      name: pz.name,
      polygon: pz.polygon,
      points: parsePolygonPoints(pz.polygon),
      isCustom: false,
    }));
    const customs = customShapes.map((cs) => ({
      id: cs.id,
      name: cs.name,
      polygon: cs.polygon,
      points: cs.points,
      isCustom: true,
    }));
    return [...presets, ...customs];
  }, [userImage, availablePresetZones, customShapes]);

  const [family, setFamily] = useState<string>('ALL');
  const [query, setQuery] = useState('');
  const [lighting, setLighting] = useState<LightingMode>('Natural');
  const [finish, setFinish] = useState<FinishMode>('Matte');
  const [coverageMode, setCoverageMode] = useState<CoverageMode>('smart');
  const [favourites, setFavourites] = useState<string[]>([]);
  const [showFavourites, setShowFavourites] = useState(false);
  const [toast, setToast] = useState('');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const paletteRef = useRef<HTMLDivElement | null>(null);
  const scenesGridRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const shadeWashRef = useRef<HTMLSpanElement | null>(null);

  // Sync initial URL shade change
  useEffect(() => {
    if (defaultShade) setShade(defaultShade);
  }, [defaultShade]);

  // Listen for shade selection from the ShadeLibrary on the same page
  useEffect(() => {
    const handleCustomShadeSelect = (e: Event) => {
      const customEvent = e as CustomEvent<PaintShade>;
      if (customEvent.detail) {
        selectShade(customEvent.detail);
      }
    };
    window.addEventListener('visaka:select-shade', handleCustomShadeSelect);
    return () => {
      window.removeEventListener('visaka:select-shade', handleCustomShadeSelect);
    };
  }, []);

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
    const timer = setTimeout(() => setToast(''), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  // Animate Scene Grid Changes
  useEffect(() => {
    const cards = scenesGridRef.current?.querySelectorAll('.scene-card');
    if (!cards || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(cards, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, stagger: 0.02, duration: 0.3, ease: 'power2.out', overwrite: true });
  }, [selectedSceneTab]);

  // Main Photorealistic Wall Canvas Render Loop with Multi-Zone Painting
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (userImage) {
      if (customShapes.length > 0 && coverageMode !== 'full') {
        const paintedZoneList: PaintedZone[] = customShapes.map((cs) => ({
          id: cs.id,
          name: cs.name,
          polygon: cs.polygon,
          points: cs.points,
          hex: paintedZones[cs.id]?.hex,
          finish,
        }));
        renderPaintedRoomCanvas(canvas, {
          image: userImage,
          zones: paintedZoneList,
          hex: shade.hex,
          finish,
          lighting,
          coverageMode: 'smart',
        });
      } else {
        renderPaintedRoomCanvas(canvas, {
          image: userImage,
          customMaskCanvas: userMaskCanvas,
          hex: shade.hex,
          finish,
          lighting,
          coverageMode,
        });
      }
    } else {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = activeScene.image;
      img.onload = () => {
        // Build list of all painted zones
        const paintedZoneList: PaintedZone[] = allZones.map((z) => ({
          id: z.id,
          name: z.name,
          polygon: z.polygon,
          points: z.points,
          hex: paintedZones[z.id]?.hex,
          finish,
        }));

        renderPaintedRoomCanvas(canvas, {
          image: img,
          zones: paintedZoneList,
          maskPolygon: activeScene.mask,
          hex: shade.hex,
          finish,
          lighting,
          coverageMode: 'smart',
        });
      };
    }
  }, [userImage, userMaskCanvas, customShapes, paintedZones, allZones, shade.hex, finish, lighting, coverageMode, activeScene]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  useEffect(() => {
    const wash = shadeWashRef.current;
    if (!wash || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(wash, {
        autoAlpha: 0.42,
        scale: 0.08,
      }, {
        autoAlpha: 0,
        scale: 2.8,
        duration: 0.72,
        ease: 'power2.out',
        overwrite: true,
      });
    }, wash.parentElement ?? wash);
    return () => ctx.revert();
  }, [shade.id]);

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

    // Apply colour ONLY to the active place/shape!
    if (activeZoneId) {
      setPaintedZones((prev) => ({
        ...prev,
        [activeZoneId]: { hex: next.hex, shade: next },
      }));
      const activeZoneObj = allZones.find((z) => z.id === activeZoneId);
      const activeZoneName = activeZoneObj?.name || 'Selected Place';
      setToast(`${next.name} applied to ${activeZoneName}!`);
    } else if (allZones.length > 0) {
      const firstId = allZones[0].id;
      setActiveZoneId(firstId);
      setPaintedZones((prev) => ({
        ...prev,
        [firstId]: { hex: next.hex, shade: next },
      }));
    }

    requestAnimationFrame(() => {
      const el = paletteRef.current?.querySelector(`[data-shade-id="${next.id}"]`);
      el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
  };

  const finishCustomShape = () => {
    if (drawPoints.length < 3) {
      setToast('Please add at least 3 points on the image to create a shape.');
      return;
    }
    const shapeId = `custom-zone-${Date.now()}`;
    const shapeName = `Custom Shape ${customShapes.length + 1}`;
    const polyStr = pointsToPolygonString(drawPoints);
    const newShape = {
      id: shapeId,
      name: shapeName,
      polygon: polyStr,
      points: drawPoints,
    };
    setCustomShapes((prev) => [...prev, newShape]);
    setActiveZoneId(shapeId);
    // Apply current shade to this custom shape immediately!
    setPaintedZones((prev) => ({
      ...prev,
      [shapeId]: { hex: shade.hex, shade },
    }));
    setIsDrawingMode(false);
    setDrawPoints([]);
    setToast(`${shapeName} created and painted with ${shade.name}!`);
  };

  const clearCurrentZone = () => {
    if (!activeZoneId) return;
    setPaintedZones((prev) => {
      const next = { ...prev };
      delete next[activeZoneId];
      return next;
    });
    setToast('Reset selected place to natural unpainted wall.');
  };

  const paintAllZones = () => {
    const updated: Record<string, { hex: string; shade: PaintShade }> = {};
    for (const z of allZones) {
      updated[z.id] = { hex: shade.hex, shade };
    }
    setPaintedZones(updated);
    setToast(`Applied ${shade.name} to all places in the scene!`);
  };

  const deleteCustomShape = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCustomShapes((prev) => prev.filter((s) => s.id !== id));
    setPaintedZones((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    if (activeZoneId === id) {
      setActiveZoneId(availablePresetZones[0]?.id || 'accent-left');
    }
    setToast('Custom shape removed.');
  };

  const handleCanvasPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const yRatio = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

    if (isDrawingMode) {
      // If user clicks near the starting point after 3+ points, close the shape
      if (drawPoints.length >= 3) {
        const [firstX, firstY] = drawPoints[0];
        const dist = Math.hypot(xRatio - firstX, yRatio - firstY);
        if (dist < 0.05) {
          finishCustomShape();
          return;
        }
      }
      setDrawPoints((prev) => [...prev, [xRatio, yRatio]]);
    } else {
      // Ray-cast to see which shape/zone was clicked on the image
      const hitZone = [...allZones].reverse().find((zone) => {
        const points = zone.points || parsePolygonPoints(zone.polygon || '');
        return isPointInsidePolygon([xRatio, yRatio], points);
      });
      if (hitZone) {
        setActiveZoneId(hitZone.id);
        const paintedShade = paintedZones[hitZone.id];
        if (paintedShade) {
          setToast(`Selected: ${hitZone.name} (${paintedShade.shade.name})`);
        } else {
          setToast(`Selected: ${hitZone.name}. Pick any shade on the right to paint.`);
        }
      }
    }
  };

  const handleSceneSelect = (scene: VisualizationScene) => {
    setUserImage(null);
    setActiveScene(scene);
    const zones = getSceneZones(scene);
    const firstZone = zones[0]?.id || `${scene.id}-accent-left`;
    setActiveZoneId(firstZone);
    setPaintedZones({
      [firstZone]: { hex: shade.hex, shade },
    });
    setCustomShapes([]);
    setIsDrawingMode(false);
    setDrawPoints([]);
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

  const handleExploreShades = () => {
    const el = document.getElementById('shade-library');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/colours');
      setTimeout(() => {
        const target = document.getElementById('shade-library');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <section id="studio" className="w-full max-w-full studio-shell relative py-8 sm:py-16 md:py-24 px-2.5 sm:px-6 md:px-8 overflow-hidden">
      {/* Animated Liquid Paint Background */}
      <div className="liquid-paint-bg">
        <div className="liquid-paint-blob liquid-paint-blob-1" />
        <div className="liquid-paint-blob liquid-paint-blob-2" />
        <div className="liquid-paint-blob liquid-paint-blob-3" />
      </div>
      <FloatingPaintBubbles
        count={10}
        mobileCount={4}
        tabletCount={7}
        placement="visualizer"
        accent={shade.hex}
        className="studio-route-bubbles"
      />

      {/* Hero / Intro Section */}
      <div className="studio-intro text-center w-full max-w-full px-2 sm:px-0">
        <span className="studio-kicker">
          <Sparkles className="w-3.5 h-3.5" /> Visaka Architectural Visualizer
        </span>
        <h2 className="break-words">
          See Your Space in a <em>New Colour.</em>
        </h2>
        <p className="mx-auto">
          Explore thousands of VISAKA shades and experience how they transform your walls, facades, wood, and automotive surfaces in real time.
        </p>

        <div className="studio-hero-ctas w-full max-w-xs sm:max-w-none mx-auto">
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
            onClick={handleExploreShades}
            className="studio-secondary cursor-pointer group"
            data-cursor="explore"
          >
            <span>Explore Shade Library</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* MAIN VISUALIZER WORKSPACE */}
      <div id="main-visualizer" className="w-full max-w-[1400px] mx-auto mt-6 sm:mt-12 studio-grid min-w-0">
        {/* Left Column: Photorealistic Canvas Room & 25+ Scene Selector */}
        <div className="space-y-3.5 sm:space-y-4 w-full min-w-0">
          <div className="studio-visual-card p-2 sm:p-4 bg-[#0e1426]/90 border border-white/15 rounded-2xl backdrop-blur-xl shadow-2xl w-full min-w-0">
            {/* Photorealistic Canvas Frame with Interactive Particular Place & Shape Selection */}
            <div
              className={`studio-room relative aspect-[16/10] rounded-xl overflow-hidden shadow-2xl border border-white/15 bg-[#080d1a] select-none w-full ${
                isDrawingMode ? 'cursor-crosshair touch-none' : 'cursor-pointer'
              }`}
              onPointerDown={handleCanvasPointerDown}
            >
              <canvas ref={canvasRef} className="w-full h-full object-cover pointer-events-none block" />
              <span
                ref={shadeWashRef}
                className="studio-room__paint-wash pointer-events-none"
                style={{ backgroundColor: shade.hex }}
                aria-hidden="true"
              />
              <PaintSplash
                key={shade.id}
                color={shade.hex}
                size="small"
                variant="compact"
                trigger="mount"
                className="studio-room__shade-splash pointer-events-none"
              />

              {/* SVG Interactive Shape & Drawing Overlay */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                {/* Shapes outlines */}
                {showZoneOutlines &&
                  allZones.map((zone) => {
                    const isActive = zone.id === activeZoneId;
                    const isHovered = zone.id === hoveredZoneId;
                    const points = zone.points || parsePolygonPoints(zone.polygon || '');
                    const ptsStr = points.map(([x, y]) => `${(x * 100).toFixed(2)},${(y * 100).toFixed(2)}`).join(' ');

                    return (
                      <g key={zone.id}>
                        <polygon
                          points={ptsStr}
                          fill={isActive ? 'rgba(230, 0, 126, 0.08)' : isHovered ? 'rgba(255, 255, 255, 0.08)' : 'transparent'}
                          stroke={isActive ? '#e6007e' : isHovered ? 'rgba(255,255,255,0.7)' : 'rgba(255, 255, 255, 0.28)'}
                          strokeWidth={isActive ? '0.75' : '0.35'}
                          strokeDasharray={isActive ? '2,1.2' : '1.5,1.5'}
                        />
                      </g>
                    );
                  })}

                {/* Live In-Progress Drawing Shape */}
                {isDrawingMode && (
                  <g>
                    {drawPoints.length >= 2 && (
                      <polyline
                        points={drawPoints.map(([x, y]) => `${(x * 100).toFixed(2)},${(y * 100).toFixed(2)}`).join(' ')}
                        fill="none"
                        stroke="#00c8ff"
                        strokeWidth="0.8"
                        strokeDasharray="2,2"
                      />
                    )}
                    {drawPoints.length >= 3 && (
                      <polygon
                        points={drawPoints.map(([x, y]) => `${(x * 100).toFixed(2)},${(y * 100).toFixed(2)}`).join(' ')}
                        fill="rgba(0, 200, 255, 0.22)"
                        stroke="#00c8ff"
                        strokeWidth="0.6"
                      />
                    )}
                    {drawPoints.map(([x, y], idx) => (
                      <circle
                        key={idx}
                        cx={(x * 100).toFixed(2)}
                        cy={(y * 100).toFixed(2)}
                        r={idx === 0 ? '1.8' : '1.2'}
                        fill={idx === 0 ? '#ff1493' : '#00c8ff'}
                        stroke="#ffffff"
                        strokeWidth="0.4"
                      />
                    ))}
                  </g>
                )}
              </svg>

              {isUploading && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-20 flex items-center justify-center text-white gap-3">
                  <Loader2 className="w-6 h-6 animate-spin text-magenta" />
                  <span className="text-xs sm:text-sm font-bold">Analyzing surface contours...</span>
                </div>
              )}

              {/* Room Top Toolbar */}
              <div className="studio-room-toolbar absolute top-2 sm:top-3 left-2 sm:left-3 right-2 sm:right-3 z-10 flex items-center justify-between gap-1 sm:gap-1.5 text-white pointer-events-auto max-w-[calc(100%-1rem)]">
                <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[9px] sm:text-xs font-bold uppercase tracking-wider shadow shrink-0">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#67d600] animate-pulse" />
                  <span className="truncate max-w-[90px] sm:max-w-none">{userImage ? 'Custom Photo' : activeScene.name}</span>
                </span>
                <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                  {userImage && (
                    <div className="flex items-center bg-black/70 p-0.5 rounded-full backdrop-blur-md border border-white/20">
                      <button
                        onClick={() => setCoverageMode('smart')}
                        className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          coverageMode === 'smart'
                            ? 'bg-magenta text-white shadow'
                            : 'text-white/70 hover:text-white'
                        }`}
                        title="Smart wall segmentation"
                      >
                        Smart
                      </button>
                      <button
                        onClick={() => setCoverageMode('full')}
                        className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          coverageMode === 'full'
                            ? 'bg-magenta text-white shadow'
                            : 'text-white/70 hover:text-white'
                        }`}
                        title="Paint entire surface / facade"
                      >
                        Full
                      </button>
                    </div>
                  )}
                  <span className="bg-black/70 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full backdrop-blur-md border border-white/15 text-[8px] sm:text-xs font-bold uppercase tracking-wider">
                    {finish}
                  </span>
                  <span className="bg-black/70 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full backdrop-blur-md border border-white/15 text-[8px] sm:text-xs font-bold uppercase tracking-wider">
                    {lighting}
                  </span>
                </div>
              </div>

              {/* Room Bottom Swatch Tag */}
              <div className="studio-room-caption absolute bottom-2 sm:bottom-3 left-2 sm:left-3 z-10 px-2 sm:px-3 py-1 sm:py-2 rounded-xl bg-black/75 backdrop-blur-md border border-white/20 text-white min-w-0 max-w-[150px] sm:max-w-none shadow-lg pointer-events-auto">
                <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-cyan font-bold block leading-tight truncate">{shade.id}</span>
                <strong className="font-display text-xs sm:text-base text-white font-bold block leading-tight mt-0.5 truncate">{shade.name}</strong>
                <small className="text-[7px] sm:text-[9px] text-white/70 block uppercase tracking-wider mt-0.5 truncate">{shade.family} • {shade.hex}</small>
              </div>

              {userImage && (
                <button
                  onClick={resetUserUpload}
                  className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-black/70 hover:bg-black/90 text-white p-1.5 sm:p-2 rounded-full backdrop-blur-md transition-colors z-10 cursor-pointer border border-white/20 pointer-events-auto"
                  title="Reset to default scenes"
                >
                  <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              )}
            </div>

            {/* Drawing Mode Helper Banner */}
            {isDrawingMode && (
              <div className="mt-2.5 p-2.5 px-3 rounded-xl bg-cyan/15 border border-cyan/40 text-white flex flex-wrap items-center justify-between gap-2 text-xs animate-fadeIn">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan animate-spin flex-shrink-0" />
                  <span className="text-cyan-100">
                    <strong>Drawing Shape:</strong> Click or tap points on the room to outline your custom area ({drawPoints.length} points placed).
                  </span>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  {drawPoints.length >= 3 && (
                    <button
                      onClick={finishCustomShape}
                      className="px-3 py-1 rounded-lg bg-cyan text-black font-extrabold text-[11px] hover:bg-cyan/90 cursor-pointer shadow flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" /> Finish Shape
                    </button>
                  )}
                  {drawPoints.length > 0 && (
                    <button
                      onClick={() => setDrawPoints((prev) => prev.slice(0, -1))}
                      className="px-2.5 py-1 rounded-lg bg-white/10 text-white font-bold text-[11px] hover:bg-white/20 cursor-pointer flex items-center gap-1"
                    >
                      <Undo2 className="w-3 h-3" /> Undo
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setIsDrawingMode(false);
                      setDrawPoints([]);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white/10 text-white/70 font-bold text-[11px] hover:bg-white/20 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* PARTICULAR PLACE & SHAPE SELECTION TOOLBAR */}
            <div className="mt-3 p-2 sm:p-2.5 rounded-xl bg-black/50 border border-white/12 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 w-full min-w-0">
              <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap min-w-0 w-full sm:w-auto">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan flex items-center gap-1 shrink-0">
                  <Layers className="w-3.5 h-3.5" /> Place to Paint:
                </span>
                {allZones.map((zone) => {
                  const isSelected = zone.id === activeZoneId;
                  const zonePaint = paintedZones[zone.id];
                  return (
                    <div key={zone.id} className="relative flex items-center min-w-0">
                      <button
                        onClick={() => {
                          setActiveZoneId(zone.id);
                          if (isDrawingMode) setIsDrawingMode(false);
                        }}
                        onMouseEnter={() => setHoveredZoneId(zone.id)}
                        onMouseLeave={() => setHoveredZoneId(null)}
                        className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold transition-all cursor-pointer min-w-0 ${
                          isSelected
                            ? 'bg-gradient-to-r from-magenta to-violet text-white shadow-md shadow-magenta/30 border border-magenta'
                            : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white border border-white/15'
                        }`}
                      >
                        {zonePaint ? (
                          <span
                            className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full border border-white/40 flex-shrink-0"
                            style={{ backgroundColor: zonePaint.hex }}
                            title={`Painted: ${zonePaint.shade.name}`}
                          />
                        ) : (
                          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/30 flex-shrink-0" />
                        )}
                        <span className="truncate max-w-[90px] sm:max-w-[160px]">{zone.name}</span>
                      </button>
                      {zone.isCustom && (
                        <button
                          onClick={(e) => deleteCustomShape(zone.id, e)}
                          className="ml-0.5 p-1 rounded-full text-white/40 hover:text-white hover:bg-red-500/30 transition-colors"
                          title="Delete custom shape"
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap shrink-0 justify-between sm:justify-end w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                <button
                  onClick={() => {
                    setIsDrawingMode(!isDrawingMode);
                    setDrawPoints([]);
                  }}
                  className={`px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-1 cursor-pointer transition-all ${
                    isDrawingMode
                      ? 'bg-cyan text-black shadow-md shadow-cyan/40 font-extrabold animate-pulse'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
                  }`}
                  title="Draw a custom shape directly on the room image"
                >
                  <PenTool className="w-3 h-3" />
                  <span>{isDrawingMode ? 'Drawing...' : '+ Draw'}</span>
                </button>

                {paintedZones[activeZoneId] && (
                  <button
                    onClick={clearCurrentZone}
                    className="px-2 py-1 rounded-full text-[10px] font-bold bg-white/5 hover:bg-red-500/20 text-white/70 hover:text-red-300 border border-white/10 transition-all cursor-pointer"
                    title="Reset current place to natural unpainted wall"
                  >
                    Clear
                  </button>
                )}

                <button
                  onClick={paintAllZones}
                  className="px-2 py-1 rounded-full text-[10px] font-bold bg-white/5 hover:bg-magenta/20 text-white/70 hover:text-white border border-white/10 transition-all cursor-pointer"
                  title="Paint all places in this room with current shade"
                >
                  Paint All
                </button>

                <button
                  onClick={() => setShowZoneOutlines(!showZoneOutlines)}
                  className="p-1 sm:p-1.5 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 border border-white/10 transition-colors cursor-pointer"
                  title={showZoneOutlines ? 'Hide shape outlines' : 'Show shape outlines'}
                >
                  {showZoneOutlines ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* CATEGORY-BASED SCENE NAVIGATION & 25+ SCENE CARDS */}
            <div className="mt-4 space-y-2.5 w-full min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-widest text-white flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-magenta" /> Select Scene ({filteredScenes.length})
                </span>
                <span className="text-xs text-white/60">{activeScene.name} Selected</span>
              </div>

              {/* Category Filter Pills */}
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 w-full max-w-full">
                {sceneCategoryTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedSceneTab(tab.id)}
                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                      selectedSceneTab === tab.id
                        ? 'bg-magenta text-white shadow-md shadow-magenta/30 border border-magenta'
                        : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white border border-white/15'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Scene Cards Grid */}
              <div ref={scenesGridRef} className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 max-h-52 overflow-y-auto no-scrollbar p-0.5 w-full min-w-0">
                {filteredScenes.map((scene) => {
                  const isSelected = !userImage && activeScene.id === scene.id;
                  return (
                    <button
                      key={scene.id}
                      onClick={() => handleSceneSelect(scene)}
                      className={`scene-card group relative aspect-[4/3] rounded-xl overflow-hidden border-2 text-left transition-all cursor-pointer min-w-0 ${
                        isSelected ? 'border-magenta shadow-lg shadow-magenta/30 scale-[1.02]' : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <img src={scene.image} alt={scene.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <span className="absolute bottom-1 left-1 right-1 text-[9px] sm:text-[10px] font-bold text-white leading-tight drop-shadow-md truncate">
                        {scene.name}
                      </span>
                      {isSelected && (
                        <span className="absolute top-1 right-1 bg-magenta text-white p-0.5 rounded-full shadow">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Photo Upload Trigger */}
            <div className="mt-3.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-3 border-t border-white/10 w-full min-w-0">
              <div className="flex-1 hidden md:block">
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setUploadDragOver(true);
                  }}
                  onDragLeave={() => setUploadDragOver(false)}
                  onDrop={handleDrop}
                  className={`upload-drop-zone p-2.5 rounded-xl border-2 border-dashed border-white/20 bg-white/5 text-center transition-all ${uploadDragOver ? 'border-magenta bg-magenta/10' : ''}`}
                >
                  <div className="flex items-center justify-center gap-2 text-xs text-white/70">
                    <ImageIcon className="w-4 h-4 text-magenta" />
                    <span>
                      <strong>Drag & drop room photo here</strong> (JPG, PNG, WEBP)
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-auto flex-shrink-0">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-magenta to-violet text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:opacity-95 transition-opacity cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" /> + Upload Custom Room Photo
                </button>
              </div>
            </div>

            {/* AI Segmentation Status Info */}
            {segmentInfo && (
              <div className="mt-2.5 p-2.5 rounded-xl bg-magenta/15 border border-magenta/30 text-xs text-white/90 flex items-center gap-2 w-full min-w-0">
                <Info className="w-4 h-4 text-cyan flex-shrink-0" />
                <span>{segmentInfo}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Shade Explorer & Active Shade Controls */}
        <div className="space-y-4 sm:space-y-5 w-full min-w-0">
          {/* Quick Palette Explorer */}
          <div className="studio-explorer p-3 sm:p-4 bg-[#0e1426]/90 border border-white/15 rounded-2xl backdrop-blur-xl shadow-2xl w-full min-w-0">
            <div className="flex items-end justify-between gap-2 mb-1">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan block">Browse Visaka Catalog</span>
                <h3 className="font-display text-lg sm:text-xl text-white font-bold mt-0.5">Shade Explorer</h3>
              </div>
              <button
                onClick={() => setShowFavourites(true)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-magenta hover:text-white transition-colors cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5" /> Favourites ({favourites.length})
              </button>
            </div>

            {/* Active Target Place Indicator */}
            <div className="mt-2.5 mb-1 p-2 px-3 rounded-xl bg-gradient-to-r from-magenta/20 via-violet/20 to-transparent border border-magenta/30 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 min-w-0">
                <Layers className="w-3.5 h-3.5 text-magenta flex-shrink-0" />
                <span className="text-white/80 text-[11px] truncate">
                  Target place:{' '}
                  <strong className="text-white font-bold">
                    {allZones.find((z) => z.id === activeZoneId)?.name || 'Selected Place'}
                  </strong>
                </span>
              </div>
              {paintedZones[activeZoneId] ? (
                <span
                  className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-white/30 text-white flex-shrink-0 shadow"
                  style={{ backgroundColor: paintedZones[activeZoneId].hex }}
                >
                  {paintedZones[activeZoneId].shade.id}
                </span>
              ) : (
                <span className="text-[10px] text-white/50 flex-shrink-0">Unpainted</span>
              )}
            </div>

            {/* Search Input */}
            <div className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-xl mt-2.5 px-3 py-2 text-white focus-within:border-magenta focus-within:ring-1 focus-within:ring-magenta transition-all">
              <Search className="w-4 h-4 text-white/40 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search shades by name, code or tone..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-white placeholder-white/40 text-xs outline-none"
              />
              {query && (
                <button onClick={() => setQuery('')} aria-label="Clear search" className="text-white/40 hover:text-white cursor-pointer flex-shrink-0">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Family Category Pills */}
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-2.5 w-full max-w-full">
              {colorFamilies.map((fam) => (
                <button
                  key={fam}
                  onClick={() => setFamily(fam)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    family === fam
                      ? 'bg-magenta text-white shadow-md shadow-magenta/30 border border-magenta'
                      : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/10'
                  }`}
                >
                  {familySwatches[fam]?.name || fam}
                </button>
              ))}
            </div>
            <div className="text-[10px] text-white/40 font-medium mb-1.5">{filteredShades.length} shades displayed</div>

            {/* Mini Swatches Grid */}
            <div ref={paletteRef} className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-52 sm:max-h-60 overflow-y-auto no-scrollbar p-0.5 w-full min-w-0">
              {filteredShades.map((item) => (
                <button
                  key={item.id}
                  data-shade-id={item.id}
                  onClick={() => selectShade(item)}
                  className={`flex items-center gap-2 p-1.5 sm:p-2 rounded-xl border transition-all cursor-pointer text-left ${
                    item.id === shade.id
                      ? 'bg-magenta/25 border-magenta ring-1 ring-magenta shadow-md'
                      : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex-shrink-0 shadow border border-white/20" style={{ backgroundColor: item.hex }} />
                  <div className="min-w-0 flex-1">
                    <strong className="text-[11px] sm:text-xs font-bold text-white block truncate leading-tight">{item.name}</strong>
                    <small className="text-[9px] text-white/50 block truncate mt-0.5">{item.id}</small>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-2.5 text-center">
              <button
                onClick={handleExploreShades}
                className="text-[11px] font-extrabold uppercase tracking-widest text-magenta hover:text-white inline-flex items-center gap-1 cursor-pointer transition-colors"
              >
                OPEN FULL 1,000+ SHADE LIBRARY <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Active Selected Swatch Controls & Details */}
          <div className="studio-controls p-3 sm:p-5 bg-[#0e1426]/90 border border-white/15 rounded-2xl backdrop-blur-xl shadow-2xl space-y-3.5 w-full min-w-0">
            {/* Active Selected Swatch Card */}
            <div className="flex items-center gap-3 pb-3 border-b border-white/12">
              <div
                className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl flex-shrink-0 shadow-xl border border-white/25 flex items-end p-1.5 text-[9px] font-mono font-bold text-white drop-shadow-md"
                style={{ backgroundColor: shade.hex }}
              >
                {shade.id}
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan block">{shade.family} Collection</span>
                <h3 className="font-display text-lg sm:text-xl text-white font-bold truncate mt-0.5">{shade.name}</h3>
                <p className="text-[11px] sm:text-xs text-white/60 truncate mt-0.5">{shade.code} • Recommended: {shade.space}</p>
              </div>
              <button
                onClick={() => toggleFavourite(shade.id)}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border transition-all flex items-center justify-center cursor-pointer flex-shrink-0 ${
                  isFavourite
                    ? 'bg-magenta/25 text-magenta border-magenta shadow-md shadow-magenta/20'
                    : 'bg-white/10 text-white/60 border-white/15 hover:text-white hover:bg-white/15'
                }`}
                aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" fill={isFavourite ? 'currentColor' : 'none'} />
              </button>
            </div>

            <p className="text-xs text-white/80 leading-relaxed">{shade.description}</p>

            {/* Lighting Simulation Options */}
            <div className="pt-2 border-t border-white/10">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/60 flex items-center gap-1.5 mb-2">
                <Sun className="w-3.5 h-3.5 text-[#ff7a00]" /> Ambient Lighting Simulation
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
                {lightingOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setLighting(opt)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold transition-all border text-center cursor-pointer flex items-center justify-center ${
                      lighting === opt
                        ? 'bg-gradient-to-r from-magenta to-violet text-white border-magenta shadow-md shadow-magenta/30 scale-[1.02]'
                        : 'bg-white/5 hover:bg-white/10 text-white/80 border-white/15'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Surface Finish Sheen Options */}
            <div className="pt-2 border-t border-white/10">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/60 flex items-center gap-1.5 mb-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-cyan" /> Surface Sheen & Finish
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
                {finishes.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFinish(f)}
                    className={`py-1.5 sm:py-2 px-1 rounded-xl text-[10px] sm:text-xs font-bold transition-all border text-center cursor-pointer flex items-center justify-center ${
                      finish === f
                        ? 'bg-gradient-to-r from-magenta to-violet text-white border-magenta shadow-md shadow-magenta/30 scale-[1.02]'
                        : 'bg-white/5 hover:bg-white/10 text-white/80 border-white/15'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Palette Builder — Complementary Colour Engine */}
            <div className="pt-2 border-t border-white/10">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/60 flex items-center gap-1.5 mb-2">
                <Palette className="w-3.5 h-3.5 text-magenta" /> Build Your Palette (Color Harmony)
              </span>
              <div className="grid grid-cols-5 gap-1 sm:gap-2">
                <button
                  onClick={() => selectShade(complementaryPalette.complementary)}
                  className="flex flex-col items-center gap-1 p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/12 hover:border-magenta transition-all cursor-pointer group"
                  title={`Complementary: ${complementaryPalette.complementary.name}`}
                >
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg shadow-md border border-white/20 group-hover:scale-105 transition-transform" style={{ backgroundColor: complementaryPalette.complementary.hex }} />
                  <span className="text-[8px] sm:text-[9px] font-bold text-white/80 uppercase truncate max-w-full">Comp</span>
                </button>
                <button
                  onClick={() => selectShade(complementaryPalette.similar)}
                  className="flex flex-col items-center gap-1 p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/12 hover:border-magenta transition-all cursor-pointer group"
                  title={`Similar: ${complementaryPalette.similar.name}`}
                >
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg shadow-md border border-white/20 group-hover:scale-105 transition-transform" style={{ backgroundColor: complementaryPalette.similar.hex }} />
                  <span className="text-[8px] sm:text-[9px] font-bold text-white/80 uppercase truncate max-w-full">Similar</span>
                </button>
                <button
                  onClick={() => selectShade(complementaryPalette.lighter)}
                  className="flex flex-col items-center gap-1 p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/12 hover:border-magenta transition-all cursor-pointer group"
                  title={`Lighter: ${complementaryPalette.lighter.name}`}
                >
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg shadow-md border border-white/20 group-hover:scale-105 transition-transform" style={{ backgroundColor: complementaryPalette.lighter.hex }} />
                  <span className="text-[8px] sm:text-[9px] font-bold text-white/80 uppercase truncate max-w-full">Lighter</span>
                </button>
                <button
                  onClick={() => selectShade(complementaryPalette.darker)}
                  className="flex flex-col items-center gap-1 p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/12 hover:border-magenta transition-all cursor-pointer group"
                  title={`Darker: ${complementaryPalette.darker.name}`}
                >
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg shadow-md border border-white/20 group-hover:scale-105 transition-transform" style={{ backgroundColor: complementaryPalette.darker.hex }} />
                  <span className="text-[8px] sm:text-[9px] font-bold text-white/80 uppercase truncate max-w-full">Darker</span>
                </button>
                <button
                  onClick={() => selectShade(complementaryPalette.accent)}
                  className="flex flex-col items-center gap-1 p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/12 hover:border-magenta transition-all cursor-pointer group"
                  title={`Accent: ${complementaryPalette.accent.name}`}
                >
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg shadow-md border border-white/20 group-hover:scale-105 transition-transform" style={{ backgroundColor: complementaryPalette.accent.hex }} />
                  <span className="text-[8px] sm:text-[9px] font-bold text-white/80 uppercase truncate max-w-full">Accent</span>
                </button>
              </div>
            </div>

            {/* Specifications Info */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
              <div className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-white/40 block">HEX CODE</span>
                <strong className="font-mono text-xs sm:text-sm font-bold text-white mt-0.5 block">{shade.hex}</strong>
              </div>
              <div className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-white/40 block">BEST ROOM</span>
                <strong className="text-xs sm:text-sm font-bold text-white truncate mt-0.5 block">{shade.space || 'All Living Spaces'}</strong>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2 w-full">
              <Link
                to="/contact"
                onClick={handleContactClick}
                className="flex-1 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-magenta to-violet text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:opacity-95 transition-all text-center flex items-center justify-center gap-2"
              >
                Sample This Shade <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={shareShade}
                className="w-full sm:w-12 h-11 sm:h-12 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center cursor-pointer transition-all flex-shrink-0 gap-1.5"
                aria-label="Share shade details"
                title="Share shade"
              >
                <Share2 className="w-4 h-4" />
                <span className="sm:hidden text-xs font-bold uppercase tracking-wider">Share</span>
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

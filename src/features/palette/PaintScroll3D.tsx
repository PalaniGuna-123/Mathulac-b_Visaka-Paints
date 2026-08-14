import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from '../../routes/Router';
import { type ColorFamily } from '../../data';

gsap.registerPlugin(ScrollTrigger);

const splitStreams: Array<{ family: ColorFamily; label: string; hex: string; count: number }> = [
  { family: 'WHITES', label: 'Pure Whites', hex: '#FAF9F6', count: 42 },
  { family: 'BEIGES', label: 'Warm Beiges', hex: '#DCCBB5', count: 68 },
  { family: 'REDS', label: 'Rich Reds', hex: '#C53D42', count: 54 },
  { family: 'ORANGES', label: 'Vibrant Oranges', hex: '#FF7A00', count: 38 },
  { family: 'YELLOWS', label: 'Sunlit Yellows', hex: '#FFD400', count: 45 },
  { family: 'GREENS', label: 'Botanical Greens', hex: '#67D600', count: 72 },
  { family: 'BLUES', label: 'Ocean Blues', hex: '#146BFF', count: 85 },
  { family: 'VIOLETS', label: 'Royal Violets', hex: '#7B2CFF', count: 40 },
];

export function PaintScroll3D() {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredFamily, setHoveredFamily] = useState<ColorFamily | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let scrollProgress = 0;

    // Resize canvas
    const resize = () => {
      const rect = section.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };

    resize();
    window.addEventListener('resize', resize);

    // Particle system for 3D paint droplets
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: 2 + Math.random() * 6,
      speed: 0.2 + Math.random() * 0.8,
      color: splitStreams[Math.floor(Math.random() * splitStreams.length)].hex,
      offset: Math.random() * Math.PI * 2,
    }));

    // GSAP ScrollTrigger to interpolate scroll progress smoothly
    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: section,
      start: 'top top+=80',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        scrollProgress = self.progress;
      },
    });

    // 60FPS Canvas Render Loop for 3D Paint Pouring & Splitting
    let time = 0;
    const render = () => {
      time += 0.02;
      const w = section.clientWidth;
      const h = section.clientHeight;

      ctx.clearRect(0, 0, w, h);

      // --- 1. Draw Floating 3D Visaka Mathulac Paint Can at Top ---
      const canX = w * 0.5;
      const canY = 80 + Math.sin(time * 1.5) * 6;
      const pourStartX = canX;
      const pourStartY = canY + 45;

      // Draw stylized 3D paint container cylinder
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,0.35)';
      ctx.shadowBlur = 25;
      ctx.shadowOffsetY = 15;

      // Container body gradient
      const canGrad = ctx.createLinearGradient(canX - 60, canY, canX + 60, canY);
      canGrad.addColorStop(0, '#1f192b');
      canGrad.addColorStop(0.3, '#3b2f4c');
      canGrad.addColorStop(0.7, '#251e30');
      canGrad.addColorStop(1, '#15101d');

      ctx.fillStyle = canGrad;
      ctx.beginPath();
      ctx.roundRect(canX - 55, canY - 35, 110, 80, 12);
      ctx.fill();

      // Gold / Magenta metallic rim
      const rimGrad = ctx.createLinearGradient(canX - 55, canY - 35, canX + 55, canY - 35);
      rimGrad.addColorStop(0, '#e6007e');
      rimGrad.addColorStop(0.5, '#ffd400');
      rimGrad.addColorStop(1, '#00c8ff');
      ctx.fillStyle = rimGrad;
      ctx.fillRect(canX - 50, canY - 35, 100, 8);

      // VISAKA MATHULAC Branding Text on Can
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px Manrope, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('VISAKA MATHULAC', canX, canY + 5);
      ctx.font = '700 7px Inter, sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.fillText('ARCHITECTURAL COLOUR STUDIO', canX, canY + 18);
      ctx.restore();

      // --- 2. Main 3D Flowing Paint Pour Ribbon ---
      const pourLength = Math.max(10, (h - 180) * Math.min(1, scrollProgress * 1.3));
      const pourEndX = w * 0.5;
      const pourEndY = pourStartY + pourLength;

      // Draw fluid central pour stream
      ctx.save();
      const streamGrad = ctx.createLinearGradient(pourStartX, pourStartY, pourEndX, pourEndY);
      streamGrad.addColorStop(0, '#e8dcc8');
      streamGrad.addColorStop(0.3, '#e6007e');
      streamGrad.addColorStop(0.7, '#146bff');
      streamGrad.addColorStop(1, '#7b2cff');

      ctx.strokeStyle = streamGrad;
      ctx.lineWidth = 14 + Math.sin(time * 3) * 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.moveTo(pourStartX, pourStartY);
      const cp1x = pourStartX + Math.sin(time * 2) * 30;
      const cp1y = pourStartY + pourLength * 0.5;
      ctx.quadraticCurveTo(cp1x, cp1y, pourEndX, pourEndY);
      ctx.stroke();
      ctx.restore();

      // --- 3. Paint Splitting into 8 Colour Streams ---
      if (scrollProgress > 0.3) {
        const splitFactor = Math.min(1, (scrollProgress - 0.3) / 0.4);
        const splitY = pourStartY + (h - 280) * 0.45;

        splitStreams.forEach((stream, i) => {
          const angle = ((i - 3.5) / 3.5) * 0.75;
          const targetX = w * 0.5 + Math.sin(angle) * (w * 0.4) * splitFactor;
          const targetY = splitY + 180 + Math.cos(angle) * 80 * splitFactor;

          ctx.save();
          ctx.strokeStyle = stream.hex;
          ctx.lineWidth = 6 + (hoveredFamily === stream.family ? 6 : 0);
          ctx.globalAlpha = 0.85;

          ctx.beginPath();
          ctx.moveTo(w * 0.5, splitY);
          const controlX = w * 0.5 + Math.sin(angle) * (w * 0.2);
          const controlY = splitY + 90;
          ctx.quadraticCurveTo(controlX, controlY, targetX, targetY);
          ctx.stroke();

          // Flowing droplet tip
          ctx.fillStyle = stream.hex;
          ctx.beginPath();
          ctx.arc(targetX, targetY, 7 + Math.sin(time * 4 + i) * 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
      }

      // --- 4. Floating Ambient Paint Particles ---
      particles.forEach((p) => {
        p.y += p.speed * 0.002;
        if (p.y > 1) p.y = 0;

        const px = (p.x + Math.sin(time + p.offset) * 0.05) * w;
        const py = p.y * h;

        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      if (isVisible) {
        animFrameId = requestAnimationFrame(render);
      }
    };

    let isVisible = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            cancelAnimationFrame(animFrameId);
            animFrameId = requestAnimationFrame(render);
          } else {
            cancelAnimationFrame(animFrameId);
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameId);
      scrollTriggerInstance.kill();
    };
  }, [hoveredFamily]);

  const handleFamilyClick = (family: ColorFamily) => {
    navigate(`/colours?family=${family}`);
  };

  return (
    <section
      id="paint-scroll-3d"
      ref={sectionRef}
      className="relative min-h-[140vh] py-24 bg-gradient-to-b from-[#0b1020] via-[#160b29] to-[#0b1020] text-white overflow-hidden"
    >
      {/* Background Interactive 3D Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      <div className="max-w-[1400px] mx-auto px-5 md:px-8 relative z-10 text-center pointer-events-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-magenta/20 text-magenta text-[11px] font-extrabold uppercase tracking-widest border border-magenta/30 mb-3 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> 3D Liquid Paint Stream Experience
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white leading-tight tracking-tight">
            Colour in Motion
          </h2>
          <p className="text-white/70 text-xs sm:text-sm mt-2.5 max-w-xl mx-auto leading-relaxed">
            Scroll down to experience Visaka pigments poured live — splitting seamlessly into 8 precision colour families.
          </p>
        </div>

        {/* Floating Colour Family Interactive Nodes */}
        <div className="mt-72 md:mt-96 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 max-w-6xl mx-auto">
          {splitStreams.map((item) => (
            <button
              key={item.family}
              onClick={() => handleFamilyClick(item.family)}
              onMouseEnter={() => setHoveredFamily(item.family)}
              onMouseLeave={() => setHoveredFamily(null)}
              className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-2 cursor-pointer backdrop-blur-lg ${
                hoveredFamily === item.family
                  ? 'bg-white/20 border-magenta scale-110 shadow-2xl shadow-magenta/30 z-20'
                  : 'bg-white/5 border-white/15 hover:bg-white/10'
              }`}
            >
              <div
                className="w-10 h-10 rounded-full shadow-lg border border-white/20 transition-transform group-hover:scale-110"
                style={{ backgroundColor: item.hex }}
              />
              <span className="text-xs font-extrabold text-white tracking-wide">{item.label}</span>
              <span className="text-[10px] text-white/50">{item.count} Shades</span>
              <span className="text-[10px] font-bold text-magenta flex items-center gap-1 mt-1">
                Explore <ArrowRight className="w-3 h-3" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PaintScroll3D;

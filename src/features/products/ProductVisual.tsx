import React, { useState, useEffect, useRef } from 'react';
import type { MathulacProductItem } from '../../types';
import { productAssetMap } from '../../data/productAssets';

interface ProductVisualProps {
  product: MathulacProductItem;
  className?: string;
  showOverlay?: boolean;
  overrideColor?: string;
}

export function ProductVisual({
  product,
  className = '',
  overrideColor,
}: ProductVisualProps) {
  const [imgError, setImgError] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0, isHovered: false });
  const containerRef = useRef<HTMLDivElement>(null);

  const activeColor = overrideColor || product.color || '#00C8FF';
  const activeImageUrl = productAssetMap[product.id] || product.image;

  useEffect(() => {
    setImgError(false);
    setTilt({ x: 0, y: 0, isHovered: false });
  }, [product.id, activeImageUrl, overrideColor]);

  // Handle subtle, fluid 3D mouse tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg tilt
    const rotateY = ((x - centerX) / centerX) * 10;

    setTilt({ x: rotateX, y: rotateY, isHovered: true });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, isHovered: false });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full flex items-center justify-center select-none perspective-[1000px] ${className}`}
    >
      {/* Dynamic Ambient Radial Glow behind the product container */}
      <div
        className="absolute inset-0 m-auto w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] rounded-full pointer-events-none filter blur-[80px] transition-all duration-700 animate-halo-pulse"
        style={{
          background: `radial-gradient(circle, ${activeColor}99 0%, ${activeColor}35 45%, rgba(139, 92, 246, 0.25) 70%, transparent 80%)`,
        }}
      />

      {/* Genuine Mathulac Product Container Photo with Fluid Animation */}
      {!imgError && activeImageUrl ? (
        <div
          key={product.id}
          className="relative z-10 w-full h-full flex items-center justify-center p-2 group overflow-visible animate-product-enter"
        >
          {/* Levitation & 3D Tilt Wrapper */}
          <div
            className="relative flex items-center justify-center animate-product-float transition-transform duration-200 ease-out will-change-transform"
            style={{
              transform: tilt.isHovered
                ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.06, 1.06, 1.06)`
                : undefined,
            }}
          >
            {/* Gloss Shine Overlay */}
            <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/15 to-transparent rounded-3xl" />

            <img
              src={activeImageUrl}
              alt={product.name}
              onError={() => setImgError(true)}
              className="relative z-10 max-h-[300px] sm:max-h-[360px] md:max-h-[400px] w-auto h-auto max-w-full object-contain drop-shadow-[0_28px_50px_rgba(0,0,0,0.9)] filter brightness-105 transition-all duration-500"
            />
          </div>

          {/* Dynamic Color Hue Reflection Glow & Ground Shadow at Base */}
          <div
            className="absolute bottom-2 left-1/2 -translate-x-1/2 w-48 sm:w-56 h-7 rounded-full blur-xl pointer-events-none transition-all duration-500 animate-product-shadow"
            style={{
              background: `radial-gradient(ellipse at center, ${activeColor} 0%, rgba(0,0,0,0.85) 60%, transparent 80%)`,
            }}
          />
        </div>
      ) : (
        /* Fallback Container Render */
        <div
          key={product.id}
          className="relative z-10 w-full h-full flex items-center justify-center p-6 animate-product-enter"
        >
          <div className="text-center text-white p-8 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl animate-product-float">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-cyan block mb-1">
              VISAKA PAINTS &amp; CHEMICALS
            </span>
            <h4 className="font-display text-2xl font-bold text-white mb-2">
              MATHULAC
            </h4>
            <div
              className="w-16 h-1 rounded-full mx-auto mb-3"
              style={{ backgroundColor: activeColor }}
            />
            <p className="text-sm font-semibold text-white/80">{product.name}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductVisual;

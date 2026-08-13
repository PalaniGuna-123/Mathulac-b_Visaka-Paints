import React, { useState, useEffect } from 'react';
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

  const activeColor = overrideColor || product.color || '#00C8FF';

  // Direct local asset from map or product.image
  const activeImageUrl = productAssetMap[product.id] || product.image;

  useEffect(() => {
    setImgError(false);
  }, [product.id, activeImageUrl, overrideColor]);

  return (
    <div
      className={`relative w-full flex items-center justify-center select-none ${className}`}
    >
      {/* Dynamic Ambient Radial Glow behind the product container */}
      <div
        className="absolute inset-0 m-auto w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full pointer-events-none filter blur-[85px] transition-all duration-700 opacity-70"
        style={{
          background: `radial-gradient(circle, ${activeColor}99 0%, ${activeColor}35 45%, rgba(139, 92, 246, 0.2) 70%, transparent 80%)`,
        }}
      />

      {/* Genuine Mathulac Product Container Photo - Increased Scale and Clean Centering */}
      {!imgError && activeImageUrl ? (
        <div className="relative z-10 w-full h-full flex items-center justify-center p-1 group overflow-visible">
          <img
            src={activeImageUrl}
            alt={product.name}
            onError={() => setImgError(true)}
            className="relative z-10 max-h-[380px] sm:max-h-[440px] md:max-h-[480px] w-auto h-auto max-w-full scale-[1.5] sm:scale-[1.68] md:scale-[1.78] object-contain transition-transform duration-500 group-hover:scale-[1.85] drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)] filter brightness-105"
          />

          {/* Dynamic Color Hue Reflection Glow at Base */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-8 rounded-full blur-xl pointer-events-none transition-all duration-500 opacity-50"
            style={{ backgroundColor: activeColor }}
          />
        </div>
      ) : (
        /* Fallback Container Render */
        <div className="relative z-10 w-full h-full flex items-center justify-center p-6">
          <div className="text-center text-white">
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

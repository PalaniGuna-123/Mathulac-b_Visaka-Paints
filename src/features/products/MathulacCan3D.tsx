import React from 'react';
import type { MathulacProductItem } from '../../types';

interface MathulacCan3DProps {
  product: MathulacProductItem;
  className?: string;
  overrideColor?: string;   // if set, overrides product.color for the can accent/label
}

/**
 * MathulacCan3D
 * Precise reproduction of the Mathulac 3D Paint Can from reference design:
 * - Slim, elegant vertical metal paint bucket proportions
 * - Brushed chrome lid & rim with wire handle
 * - Dual-tone label: Crisp white upper with MATHULAC branding, charcoal lower with product specs
 * - Soft purple radial ambient glow centered behind the can
 */
export function MathulacCan3D({ product, className = '', overrideColor }: MathulacCan3DProps) {
  const baseColor = overrideColor || product?.color || '#00C8FF';

  const categoryName = (product?.categoryName || 'PREMIUM INTERIOR PAINT').toUpperCase();
  const productName = (product?.name || 'INTERIOR PRIMER').toUpperCase();
  const finish = product?.categoryKey === 'wood-coatings' ? 'GLOSS / MATT' : 'MATT FINISH';
  const sizes = product?.availableSizes?.slice(0, 3).join('  |  ') || '1 LTR  |  4 LTR  |  20 LTR';

  const uid = product?.id?.replace(/[^a-zA-Z0-9_-]/g, '') || 'can';

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Soft Ambient Radial Glow behind the Can that dynamically morphs with the selected shade */}
      <div
        className="absolute inset-0 m-auto w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] rounded-full pointer-events-none filter blur-[70px] transition-all duration-500 opacity-70"
        style={{
          background: `radial-gradient(circle, ${baseColor}77 0%, ${baseColor}30 40%, rgba(99, 102, 241, 0.05) 65%, transparent 78%)`,
        }}
      />

      <svg
        viewBox="0 0 300 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full max-w-[270px] sm:max-w-[310px] h-auto drop-shadow-[0_25px_45px_rgba(0,0,0,0.85)] transition-transform duration-500 hover:scale-[1.02]"
      >
        <defs>
          {/* Chrome / Metal Gradients */}
          <linearGradient id={`metalTop-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7E8896" />
            <stop offset="14%" stopColor="#D5DCE4" />
            <stop offset="35%" stopColor="#FFFFFF" />
            <stop offset="58%" stopColor="#B2BDC9" />
            <stop offset="82%" stopColor="#626D7B" />
            <stop offset="100%" stopColor="#3F4752" />
          </linearGradient>

          <linearGradient id={`metalRim-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#47505C" />
            <stop offset="18%" stopColor="#E2E8F0" />
            <stop offset="38%" stopColor="#FFFFFF" />
            <stop offset="62%" stopColor="#8E9CAB" />
            <stop offset="85%" stopColor="#414C59" />
            <stop offset="100%" stopColor="#2A303A" />
          </linearGradient>

          <linearGradient id={`wireHandle-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6C7785" />
            <stop offset="30%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#7F8C9D" />
            <stop offset="100%" stopColor="#373E47" />
          </linearGradient>

          {/* Body Cylindrical Lighting Layer */}
          <linearGradient id={`cylinderShade-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.4" />
            <stop offset="10%" stopColor="#000000" stopOpacity="0.06" />
            <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.22" />
            <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.0" />
            <stop offset="82%" stopColor="#000000" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.6" />
          </linearGradient>

          {/* White Label Cylinder Gradient */}
          <linearGradient id={`whiteLabel-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#CBD3DC" />
            <stop offset="16%" stopColor="#F8FAFC" />
            <stop offset="36%" stopColor="#FFFFFF" />
            <stop offset="65%" stopColor="#EDF2F7" />
            <stop offset="85%" stopColor="#BFC8D2" />
            <stop offset="100%" stopColor="#9AA4B0" />
          </linearGradient>

          {/* Dark Charcoal Lower Label Gradient */}
          <linearGradient id={`darkLabel-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1B202A" />
            <stop offset="20%" stopColor="#2E3442" />
            <stop offset="38%" stopColor="#3A4252" />
            <stop offset="65%" stopColor="#29303D" />
            <stop offset="88%" stopColor="#191E27" />
            <stop offset="100%" stopColor="#101319" />
          </linearGradient>

          {/* Floor Shadow */}
          <radialGradient id={`floorShadow-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#000000" stopOpacity="0.35" />
            <stop offset="80%" stopColor="#1E0B36" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Floor Shadow */}
        <ellipse cx="150" cy="396" rx="105" ry="14" fill={`url(#floorShadow-${uid})`} />
        <ellipse cx="150" cy="392" rx="80" ry="7" fill="#000000" opacity="0.55" />

        {/* 2. Wire Bail Handle */}
        <path
          d="M58 202 C46 118 72 38 150 38 C228 38 254 118 242 202"
          stroke={`url(#wireHandle-${uid})`}
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M58 202 C46 118 72 38 150 38 C228 38 254 118 242 202"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeOpacity="0.4"
          strokeLinecap="round"
          fill="none"
        />

        {/* 3. Handle Side Ears */}
        <rect x="50" y="192" width="8" height="20" rx="3" fill={`url(#metalRim-${uid})`} />
        <circle cx="54" cy="202" r="3" fill="#1C212B" />
        <rect x="242" y="192" width="8" height="20" rx="3" fill={`url(#metalRim-${uid})`} />
        <circle cx="246" cy="202" r="3" fill="#1C212B" />

        {/* 4. Can Body Base Layer */}
        <path
          d="M56 94 L56 364 Q56 384 150 384 Q244 384 244 364 L244 94 Z"
          fill={`url(#metalTop-${uid})`}
        />

        {/* 5. Upper White Label */}
        <path
          d="M56 104 L56 230 Q150 240 244 230 L244 104 Q150 114 56 104 Z"
          fill={`url(#whiteLabel-${uid})`}
        />

        {/* 6. Lower Charcoal Label */}
        <path
          d="M56 230 Q150 240 244 230 L244 354 Q150 370 56 354 Z"
          fill={`url(#darkLabel-${uid})`}
        />

        {/* Top Micro-Label */}
        <text
          x="150"
          y="130"
          textAnchor="middle"
          fill="#64748B"
          fontSize="6.5"
          fontFamily="'Inter', -apple-system, sans-serif"
          fontWeight="700"
          letterSpacing="2"
        >
          {categoryName.slice(0, 26)}
        </text>

        <line x1="110" y1="136" x2="190" y2="136" stroke="#CBD5E1" strokeWidth="0.6" strokeOpacity="0.8" />

        {/* Brand Name: MATHULAC */}
        <text
          x="150"
          y="168"
          textAnchor="middle"
          fill="#0F172A"
          fontSize="21"
          fontFamily="'Cinzel', 'Times New Roman', Georgia, serif"
          fontWeight="900"
          letterSpacing="3.5"
        >
          MATHULAC
        </text>

        {/* Sub-Brand: — VISAKA PAINTS — */}
        <text
          x="150"
          y="184"
          textAnchor="middle"
          fill="#475569"
          fontSize="7.5"
          fontFamily="'Inter', -apple-system, sans-serif"
          fontWeight="800"
          letterSpacing="2.5"
        >
          — VISAKA PAINTS —
        </text>

        {/* Brand Accent Bar */}
        <rect
          x="115"
          y="194"
          width="70"
          height="2.5"
          rx="1.2"
          fill={baseColor}
        />

        {/* Quality Seal */}
        <text
          x="150"
          y="210"
          textAnchor="middle"
          fill="#64748B"
          fontSize="6"
          fontFamily="'Inter', sans-serif"
          fontWeight="600"
          letterSpacing="1.2"
        >
          AN ISO 9001:2015 CERTIFIED FORMULATION
        </text>

        {/* Lower Charcoal Label Content */}
        <text
          x="150"
          y="254"
          textAnchor="middle"
          fill={baseColor}
          fontSize="7.5"
          fontFamily="'Inter', sans-serif"
          fontWeight="800"
          letterSpacing="1.5"
        >
          {finish}
        </text>

        <text
          x="150"
          y="274"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="12.5"
          fontFamily="'Inter', -apple-system, sans-serif"
          fontWeight="900"
          letterSpacing="1"
        >
          {productName.length > 20 ? productName.slice(0, 19) + '…' : productName}
        </text>

        {/* 3 Minimalist Badges */}
        <g transform="translate(80, 288)">
          {/* Badge 1 */}
          <circle cx="18" cy="12" r="8" stroke="#94A3B8" strokeWidth="0.7" fill="none" opacity="0.6" />
          <path d="M15 10 L18 8.5 L21 10 L21 13 Q18 15 18 15 Q15 15 15 13 Z" fill="#94A3B8" opacity="0.8" />
          <text x="18" y="26" textAnchor="middle" fill="#94A3B8" fontSize="4.2" fontWeight="600" letterSpacing="0.4">PROTECT</text>

          {/* Badge 2 */}
          <circle cx="70" cy="12" r="8" stroke="#94A3B8" strokeWidth="0.7" fill="none" opacity="0.6" />
          <path d="M67 14 C67 9.5 73 9.5 73 9.5 C73 14 67 14 67 14 Z" fill="#94A3B8" opacity="0.8" />
          <text x="70" y="26" textAnchor="middle" fill="#94A3B8" fontSize="4.2" fontWeight="600" letterSpacing="0.4">DURABLE</text>

          {/* Badge 3 */}
          <circle cx="122" cy="12" r="8" stroke="#94A3B8" strokeWidth="0.7" fill="none" opacity="0.6" />
          <path d="M120 9.5 H124 M121 9.5 V11 L118.5 15 H125.5 L123 11 V9.5" stroke="#94A3B8" strokeWidth="0.8" fill="none" opacity="0.8" />
          <text x="122" y="26" textAnchor="middle" fill="#94A3B8" fontSize="4.2" fontWeight="600" letterSpacing="0.4">PRO COAT</text>
        </g>

        {/* Packaging Sizes */}
        <text
          x="150"
          y="336"
          textAnchor="middle"
          fill="#94A3B8"
          fontSize="6.5"
          fontFamily="'Inter', monospace"
          fontWeight="700"
          letterSpacing="1.8"
        >
          {sizes}
        </text>

        {/* 7. Cylindrical Shading Overlay */}
        <path
          d="M56 94 L56 364 Q56 384 150 384 Q244 384 244 364 L244 94 Q244 74 150 74 Q56 74 56 94 Z"
          fill={`url(#cylinderShade-${uid})`}
          pointerEvents="none"
        />

        {/* 8. Top Chrome Rim & Lid */}
        <ellipse cx="150" cy="96" rx="96" ry="17" fill={`url(#metalRim-${uid})`} />
        <ellipse cx="150" cy="93" rx="94" ry="15" fill="#475569" />

        <ellipse cx="150" cy="90" rx="96" ry="17" fill={`url(#metalTop-${uid})`} />
        <ellipse cx="150" cy="90" rx="86" ry="14" fill={`url(#metalRim-${uid})`} />
        <ellipse cx="150" cy="88" rx="82" ry="12" fill={`url(#metalTop-${uid})`} />
        <ellipse cx="150" cy="87" rx="62" ry="9" fill={`url(#metalRim-${uid})`} />
        <ellipse cx="150" cy="86" rx="58" ry="8" fill={`url(#metalTop-${uid})`} />

        {/* Top Rim Highlight */}
        <path
          d="M80 86 Q115 93 150 93"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeOpacity="0.75"
          fill="none"
        />

        {/* 9. Bottom Chrome Rim */}
        <path
          d="M56 360 L56 368 Q56 386 150 386 Q244 386 244 368 L244 360 Q244 378 150 378 Q56 378 56 360 Z"
          fill={`url(#metalRim-${uid})`}
        />
      </svg>
    </div>
  );
}

export default MathulacCan3D;

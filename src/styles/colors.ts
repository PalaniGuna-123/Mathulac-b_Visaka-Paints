/**
 * ============================================================================
 * Mathulac Global Design System — Color Tokens & Palette Constants
 * ============================================================================
 * Single source of truth for all colors across CSS, Tailwind, GSAP and Canvas.
 */

export const BRAND_COLORS = {
  magenta: '#E6007E',
  hotpink: '#FF1493',
  electric: '#146BFF',
  cyan: '#00C8FF',
  leaf: '#67D600',
  sun: '#FFD400',
  flame: '#FF7A00',
  ember: '#F51B24',
  violet: '#7B2CFF',
  purple: '#9333EA',
  emerald: '#10B981',
} as const;

export const SURFACE_COLORS = {
  ink: '#0B1020',
  midnight: '#131A31',
  surfaceDark: '#1A0B2E',
  surfaceDeep: '#0A1525',
  surfaceCard: '#151B2E',
  surfacePanel: '#0B0F19',
  cream: '#FFF8F1',
} as const;

export const GRADIENTS = {
  brand: 'linear-gradient(135deg, #E6007E, #7B2CFF, #146BFF)',
  rainbow: 'linear-gradient(90deg, #FF1493, #FF7A00, #FFD400, #67D600, #00C8FF, #146BFF, #7B2CFF)',
  accent: 'linear-gradient(135deg, #E6007E, #00C8FF)',
  darkCard: 'linear-gradient(to bottom, rgba(230, 0, 126, 0.25), rgba(255, 255, 255, 0.08), rgba(123, 44, 255, 0.2))',
  glowCyan: 'radial-gradient(circle at 50% 0%, rgba(0, 200, 255, 0.18) 0%, transparent 70%)',
  glowMagenta: 'radial-gradient(circle at 50% 0%, rgba(230, 0, 126, 0.18) 0%, transparent 70%)',
} as const;

export const SCROLL_SPECTRUM = [
  '#FF1493', // hotpink
  '#FF7A00', // flame
  '#FFD400', // sun
  '#67D600', // leaf
  '#00C8FF', // cyan
  '#7B2CFF', // violet
] as const;

export type BrandColorKey = keyof typeof BRAND_COLORS;
export type SurfaceColorKey = keyof typeof SURFACE_COLORS;

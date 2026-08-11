import type { HeroSlide, PaintShade, RoomScene } from '../types';

export type ColorSwatch = {
  name: string;
  hex: string;
  family: string;
  mood: string;
  space: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: 'living',
    category: 'Living Spaces',
    tagline: 'Interior Living',
    headline: 'Colour that makes a house feel like home.',
    description: 'Premium interior emulsions crafted for walls that feel alive — soft, rich and enduring.',
    statement: 'Premium interior emulsions crafted for walls that feel alive — soft, rich and enduring.',
    image: 'https://images.pexels.com/photos/8146318/pexels-photo-8146318.jpeg?auto=compress&cs=tinysrgb&w=1920',
    accent: '#FF1493',
    bg: '#1A0B2E',
    tag: 'Interior',
  },
  {
    id: 'exterior',
    category: 'Exterior',
    tagline: 'Weatherproof Exterior',
    headline: 'Colour that weathers everything.',
    description: 'Exterior coatings engineered to hold their brilliance against sun, rain and time.',
    statement: 'Exterior coatings engineered to hold their brilliance against sun, rain and time.',
    image: 'https://images.pexels.com/photos/30667883/pexels-photo-30667883.jpeg?auto=compress&cs=tinysrgb&w=1920',
    accent: '#00C8FF',
    bg: '#0A1525',
    tag: 'Exterior',
  },
  {
    id: 'wood',
    category: 'Wood',
    tagline: 'Wood Finishes',
    headline: 'Bring natural beauty to every surface.',
    description: 'Coatings that protect and reveal the grain — from matt to mirror gloss.',
    statement: 'Coatings that protect and reveal the grain — from matt to mirror gloss.',
    image: 'https://images.pexels.com/photos/4705928/pexels-photo-4705928.jpeg?auto=compress&cs=tinysrgb&w=1920',
    accent: '#B45309',
    bg: '#2A1A0A',
    tag: 'Wood',
  },
  {
    id: 'auto',
    category: 'Automotive',
    tagline: 'Automotive Refinishing',
    headline: 'Transform your world. Protect your assets.',
    description: 'Automotive systems built for gloss, durability and a flawless mirror finish.',
    statement: 'Automotive systems built for gloss, durability and a flawless mirror finish.',
    image: 'https://images.pexels.com/photos/34042808/pexels-photo-34042808.jpeg?auto=compress&cs=tinysrgb&w=1920',
    accent: '#F51B24',
    bg: '#1A0808',
    tag: 'Automotive',
  },
  {
    id: 'decor',
    category: 'Decorative',
    tagline: 'Decorative Surfaces',
    headline: 'Walls are your canvas.',
    description: 'Textured, metallic and designer finishes that turn plain walls into expressions.',
    statement: 'Textured, metallic and designer finishes that turn plain walls into expressions.',
    image: 'https://images.pexels.com/photos/271805/pexels-photo-271805.jpeg?auto=compress&cs=tinysrgb&w=1920',
    accent: '#7B2CFF',
    bg: '#2A0A3A',
    tag: 'Decorative',
  },
];

export const colorFamilies = [
  'ALL',
  'WHITES',
  'OFF WHITES',
  'BEIGES',
  'CREAMS',
  'GREYS',
  'BROWNS',
  'REDS',
  'PINKS',
  'ORANGES',
  'YELLOWS',
  'YELLOW GREENS',
  'GREENS',
  'BLUE GREENS',
  'BLUES',
  'VIOLETS',
] as const;

export type ColorFamily = typeof colorFamilies[number];

export const familySwatches: Record<ColorFamily, { name: string; hex: string; bgGradient: string }> = {
  ALL: { name: 'All Shades', hex: '#E6007E', bgGradient: 'linear-gradient(135deg, #E6007E, #146BFF)' },
  WHITES: { name: 'Pure Whites', hex: '#FAF9F6', bgGradient: 'linear-gradient(135deg, #FFFFFF, #F0F4F8)' },
  'OFF WHITES': { name: 'Off Whites', hex: '#F5EFE6', bgGradient: 'linear-gradient(135deg, #F5EFE6, #E8DFD8)' },
  BEIGES: { name: 'Warm Beiges', hex: '#DCCBB5', bgGradient: 'linear-gradient(135deg, #E8DCC8, #CBB495)' },
  CREAMS: { name: 'Royal Creams', hex: '#F3E6BB', bgGradient: 'linear-gradient(135deg, #F9F1D8, #E7D9BA)' },
  GREYS: { name: 'Urban Greys', hex: '#9AA0A6', bgGradient: 'linear-gradient(135deg, #D0CECA, #687078)' },
  BROWNS: { name: 'Earthy Browns', hex: '#806052', bgGradient: 'linear-gradient(135deg, #A8785C, #5C3A2E)' },
  REDS: { name: 'Rich Reds', hex: '#C53D42', bgGradient: 'linear-gradient(135deg, #E53935, #822F41)' },
  PINKS: { name: 'Blush Pinks', hex: '#E8B7C2', bgGradient: 'linear-gradient(135deg, #F8BBD0, #D7658E)' },
  ORANGES: { name: 'Vibrant Oranges', hex: '#FF7A00', bgGradient: 'linear-gradient(135deg, #FF9800, #D6875B)' },
  YELLOWS: { name: 'Sunlit Yellows', hex: '#FFD400', bgGradient: 'linear-gradient(135deg, #FFEE58, #E7C35C)' },
  'YELLOW GREENS': { name: 'Yellow Greens', hex: '#B7C67B', bgGradient: 'linear-gradient(135deg, #CDDC39, #8BC34A)' },
  GREENS: { name: 'Botanical Greens', hex: '#67D600', bgGradient: 'linear-gradient(135deg, #67D600, #4CAF50)' },
  'BLUE GREENS': { name: 'Teal & Cyan', hex: '#58B7B1', bgGradient: 'linear-gradient(135deg, #00C8FF, #009688)' },
  BLUES: { name: 'Ocean Blues', hex: '#146BFF', bgGradient: 'linear-gradient(135deg, #42A5F5, #0B2447)' },
  VIOLETS: { name: 'Royal Violets', hex: '#7B2CFF', bgGradient: 'linear-gradient(135deg, #AB47BC, #4A148C)' },
};

export const palette: ColorSwatch[] = [
  { name: 'Mathulac Rose', hex: '#E6007E', family: 'PINKS', mood: 'Bold', space: 'Living Room / Accent' },
  { name: 'Hot Pink Pop', hex: '#FF1493', family: 'PINKS', mood: 'Energetic', space: 'Feature Wall' },
  { name: 'Coral Bloom', hex: '#FF6F61', family: 'REDS', mood: 'Warm', space: 'Dining / Hallway' },
  { name: 'Ember Red', hex: '#F51B24', family: 'REDS', mood: 'Dramatic', space: 'Accent / Front Door' },
  { name: 'Flame Orange', hex: '#FF7A00', family: 'ORANGES', mood: 'Vibrant', space: 'Kitchen / Kids Room' },
  { name: 'Amber Glow', hex: '#FFA500', family: 'ORANGES', mood: 'Welcoming', space: 'Hallway' },
  { name: 'Sunflower', hex: '#FFD400', family: 'YELLOWS', mood: 'Cheerful', space: 'Kitchen / Study' },
  { name: 'Honey Yellow', hex: '#F2C94C', family: 'YELLOWS', mood: 'Soft Warm', space: 'Bedroom' },
  { name: 'Leaf Green', hex: '#67D600', family: 'GREENS', mood: 'Fresh', space: 'Balcony / Study' },
  { name: 'Sage Whisper', hex: '#9CAF88', family: 'GREENS', mood: 'Calm', space: 'Bedroom / Living' },
  { name: 'Ocean Blue', hex: '#146BFF', family: 'BLUES', mood: 'Confident', space: 'Office / Living' },
  { name: 'Sky Tint', hex: '#4A90E2', family: 'BLUES', mood: 'Serene', space: 'Bedroom / Living' },
  { name: 'Cyan Wave', hex: '#00C8FF', family: 'BLUE GREENS', mood: 'Crisp', space: 'Bathroom / Kitchen' },
  { name: 'Deep Navy', hex: '#0B2447', family: 'BLUES', mood: 'Grounded', space: 'Office / Accent' },
  { name: 'Royal Violet', hex: '#7B2CFF', family: 'VIOLETS', mood: 'Creative', space: 'Feature Wall' },
  { name: 'Lilac Mist', hex: '#C8A2C8', family: 'VIOLETS', mood: 'Dreamy', space: 'Bedroom' },
  { name: 'Warm Beige', hex: '#E8DCC8', family: 'BEIGES', mood: 'Timeless', space: 'Living / Bedroom' },
  { name: 'Soft Pink', hex: '#F5D0CC', family: 'PINKS', mood: 'Gentle', space: 'Bedroom / Nursery' },
  { name: 'Terracotta', hex: '#C66B3D', family: 'ORANGES', mood: 'Earthy', space: 'Exterior / Living' },
  { name: 'Cloud White', hex: '#FBF7F0', family: 'WHITES', mood: 'Clean', space: 'Ceiling / All Rooms' },
  { name: 'Ink Black', hex: '#0B1020', family: 'GREYS', mood: 'Dramatic', space: 'Accent Wall' },
  { name: 'Stone Grey', hex: '#8E8E8E', family: 'GREYS', mood: 'Neutral', space: 'Office / Exterior' },
];

const basePaintShades = [
  // WHITES
  { id: 'MW-001', name: 'Ivory Light', family: 'WHITES', hex: '#F6F1E8', collection: 'Essential Whites', recommendedRooms: ['Kitchen', 'Living Room'] },
  { id: 'MW-002', name: 'Cloud White', family: 'WHITES', hex: '#FAF8F2', collection: 'Essential Whites', recommendedRooms: ['Bedroom', 'Kitchen', 'Office'] },
  { id: 'MW-003', name: 'Porcelain Pure', family: 'WHITES', hex: '#ECE9E0', collection: 'Essential Whites', recommendedRooms: ['Dining', 'Exterior'] },
  { id: 'MW-004', name: 'Chiffon White', family: 'WHITES', hex: '#FFFDF9', collection: 'Essential Whites', recommendedRooms: ['Living Room', 'Ceiling'] },
  { id: 'MW-005', name: 'Pearl Frost', family: 'WHITES', hex: '#F8F9FA', collection: 'Essential Whites', recommendedRooms: ['Bathroom', 'Bedroom'] },

  // OFF WHITES
  { id: 'VOW-01', name: 'Royal Ivory', family: 'OFF WHITES', hex: '#EEE4CF', collection: 'Classic Heritage', recommendedRooms: ['Kitchen', 'Living Room'] },
  { id: 'VOW-02', name: 'Off White Silk', family: 'OFF WHITES', hex: '#EDE9DE', collection: 'Classic Heritage', recommendedRooms: ['Bedroom', 'Dining'] },
  { id: 'VOW-03', name: 'Blue Bell White', family: 'OFF WHITES', hex: '#E8EEF0', collection: 'Classic Heritage', recommendedRooms: ['Kitchen', 'Bedroom'] },
  { id: 'VOW-04', name: 'Alabaster Whisper', family: 'OFF WHITES', hex: '#F3EFE0', collection: 'Classic Heritage', recommendedRooms: ['Living Room', 'Hallway'] },

  // BEIGES
  { id: 'MB-101', name: 'Warm Beige', family: 'BEIGES', hex: '#DCCBB5', collection: 'Warm Neutrals', recommendedRooms: ['Living Room', 'Bedroom', 'Dining'] },
  { id: 'MB-102', name: 'Linen Hush', family: 'BEIGES', hex: '#E9DDCA', collection: 'Warm Neutrals', recommendedRooms: ['Living Room', 'Bedroom'] },
  { id: 'MB-103', name: 'Sand Veil', family: 'BEIGES', hex: '#CBB495', collection: 'Warm Neutrals', recommendedRooms: ['Living Room', 'Exterior'] },
  { id: 'MB-104', name: 'Suede Touch', family: 'BEIGES', hex: '#B9A287', collection: 'Natural Material', recommendedRooms: ['Living Room', 'Office'] },
  { id: 'MB-105', name: 'Mid Buff', family: 'BEIGES', hex: '#C7A77C', collection: 'Natural Material', recommendedRooms: ['Living Room', 'Dining'] },

  // CREAMS
  { id: 'VC-301', name: 'Pale Cream', family: 'CREAMS', hex: '#F3E6BB', collection: 'Sunlit Days', recommendedRooms: ['Kitchen', 'Bedroom'] },
  { id: 'VC-302', name: 'Raw Silk', family: 'CREAMS', hex: '#E7D9BA', collection: 'Sunlit Days', recommendedRooms: ['Bedroom', 'Living Room'] },
  { id: 'VC-306', name: 'Light Cream Glow', family: 'CREAMS', hex: '#F1E1B7', collection: 'Sunlit Days', recommendedRooms: ['Kitchen', 'Living Room'] },
  { id: 'VC-310', name: 'Sandstone Warmth', family: 'CREAMS', hex: '#D8C29B', collection: 'Sunlit Days', recommendedRooms: ['Living Room', 'Dining'] },
  { id: 'VC-315', name: 'Dawn Cream', family: 'CREAMS', hex: '#E5D6AD', collection: 'Sunlit Days', recommendedRooms: ['Bedroom', 'Living Room'] },

  // GREYS
  { id: 'MGY-01', name: 'Silver Lining', family: 'GREYS', hex: '#B6B8B6', collection: 'Modern Balance', recommendedRooms: ['Kitchen', 'Office'] },
  { id: 'MGY-02', name: 'Slate Poem', family: 'GREYS', hex: '#687078', collection: 'Modern Balance', recommendedRooms: ['Office', 'Exterior'] },
  { id: 'MGY-03', name: 'Dove Shadow', family: 'GREYS', hex: '#D0CECA', collection: 'Modern Balance', recommendedRooms: ['Living Room', 'Bedroom'] },
  { id: 'MGY-04', name: 'Smoke Grey', family: 'GREYS', hex: '#8B8B8A', collection: 'Urban Neutrals', recommendedRooms: ['Office', 'Exterior'] },
  { id: 'MGY-05', name: 'Ad Grey', family: 'GREYS', hex: '#777D82', collection: 'Urban Neutrals', recommendedRooms: ['Office', 'Exterior'] },
  { id: 'MGY-06', name: 'Pebble Path', family: 'GREYS', hex: '#A79F95', collection: 'Quiet Earth', recommendedRooms: ['Office', 'Exterior'] },

  // BROWNS
  { id: 'MBR-01', name: 'Cocoa Nook', family: 'BROWNS', hex: '#806052', collection: 'Deep Earth', recommendedRooms: ['Office', 'Dining'] },
  { id: 'MBR-02', name: 'Clay Pot', family: 'BROWNS', hex: '#A8785C', collection: 'Deep Earth', recommendedRooms: ['Exterior', 'Living Room'] },
  { id: 'MBR-03', name: 'Teak Brown', family: 'BROWNS', hex: '#755348', collection: 'Natural Material', recommendedRooms: ['Office', 'Dining'] },
  { id: 'MBR-04', name: 'Sandal Wood', family: 'BROWNS', hex: '#A77B55', collection: 'Natural Material', recommendedRooms: ['Living Room', 'Exterior'] },
  { id: 'MBR-05', name: 'Golden Brown', family: 'BROWNS', hex: '#99693A', collection: 'Natural Material', recommendedRooms: ['Dining', 'Exterior'] },
  { id: 'MBR-06', name: 'Mahogany Rich', family: 'BROWNS', hex: '#693F35', collection: 'Deep Earth', recommendedRooms: ['Dining', 'Office'] },

  // REDS
  { id: 'MR-501', name: 'Ember Silk', family: 'REDS', hex: '#A94F4A', collection: 'Bold Expression', recommendedRooms: ['Dining', 'Exterior'] },
  { id: 'MR-502', name: 'Rosewood Red', family: 'REDS', hex: '#7F3C3F', collection: 'Bold Expression', recommendedRooms: ['Dining', 'Office'] },
  { id: 'VR-602', name: 'Mercedes Red', family: 'REDS', hex: '#9F3038', collection: 'Statement Collection', recommendedRooms: ['Dining', 'Exterior'] },
  { id: 'VR-604', name: 'Signal Red', family: 'REDS', hex: '#C53D42', collection: 'Statement Collection', recommendedRooms: ['Dining', 'Exterior'] },
  { id: 'VR-608', name: 'Pro Red', family: 'REDS', hex: '#A63138', collection: 'Statement Collection', recommendedRooms: ['Dining', 'Exterior'] },
  { id: 'VR-614', name: 'Imperial Crimson', family: 'REDS', hex: '#822F41', collection: 'Statement Collection', recommendedRooms: ['Dining', 'Exterior'] },

  // PINKS
  { id: 'MP-601', name: 'Blush Story', family: 'PINKS', hex: '#E7B7B0', collection: 'Soft Expression', recommendedRooms: ['Bedroom', 'Kids Room'] },
  { id: 'MP-602', name: 'Petal Dust', family: 'PINKS', hex: '#D8989B', collection: 'Soft Expression', recommendedRooms: ['Bedroom', 'Dining'] },
  { id: 'VP-607', name: 'Candy Pink', family: 'PINKS', hex: '#D7658E', collection: 'Soft Expression', recommendedRooms: ['Kids Room', 'Bedroom'] },
  { id: 'VP-612', name: 'Pale Rose', family: 'PINKS', hex: '#EBCACB', collection: 'Soft Expression', recommendedRooms: ['Bedroom', 'Dining'] },
  { id: 'VP-614', name: 'Petal Bloom', family: 'PINKS', hex: '#E8B7C2', collection: 'Soft Expression', recommendedRooms: ['Bedroom', 'Kids Room'] },

  // ORANGES
  { id: 'MO-401', name: 'Apricot Clay', family: 'ORANGES', hex: '#D6875B', collection: 'Earth Notes', recommendedRooms: ['Dining', 'Kids Room'] },
  { id: 'MO-402', name: 'Terracotta Muse', family: 'ORANGES', hex: '#B85F42', collection: 'Earth Notes', recommendedRooms: ['Living Room', 'Exterior'] },
  { id: 'VO-501', name: 'Dawn Glow Orange', family: 'ORANGES', hex: '#E49A65', collection: 'Earth Notes', recommendedRooms: ['Dining', 'Kids Room'] },
  { id: 'VO-503', name: 'Deep Orange', family: 'ORANGES', hex: '#C55A36', collection: 'Earth Notes', recommendedRooms: ['Dining', 'Exterior'] },

  // YELLOWS
  { id: 'MY-301', name: 'Morning Saffron', family: 'YELLOWS', hex: '#E7C35C', collection: 'Sunlit Days', recommendedRooms: ['Kitchen', 'Kids Room'] },
  { id: 'MY-302', name: 'Butter Glow', family: 'YELLOWS', hex: '#F4DC91', collection: 'Sunlit Days', recommendedRooms: ['Kitchen', 'Dining'] },
  { id: 'VY-201', name: 'Lemon Yellow', family: 'YELLOWS', hex: '#EACA42', collection: 'Sunlit Days', recommendedRooms: ['Kitchen', 'Kids Room'] },
  { id: 'VY-210', name: 'Golden Yellow', family: 'YELLOWS', hex: '#D9A62A', collection: 'Sunlit Days', recommendedRooms: ['Kitchen', 'Dining'] },

  // YELLOW GREENS
  { id: 'VYG-01', name: 'Pista Fresh', family: 'YELLOW GREENS', hex: '#B7C67B', collection: 'Fresh Living', recommendedRooms: ['Kitchen', 'Kids Room'] },
  { id: 'VYG-02', name: 'Lime Zest', family: 'YELLOW GREENS', hex: '#A3D900', collection: 'Fresh Living', recommendedRooms: ['Balcony', 'Kids Room'] },
  { id: 'VYG-03', name: 'Chartreuse Delight', family: 'YELLOW GREENS', hex: '#D4E157', collection: 'Fresh Living', recommendedRooms: ['Kitchen', 'Study'] },

  // GREENS
  { id: 'MG-901', name: 'Sage Retreat', family: 'GREENS', hex: '#9EAE91', collection: 'Botanical Calm', recommendedRooms: ['Living Room', 'Bedroom'] },
  { id: 'MG-902', name: 'Olive Grove', family: 'GREENS', hex: '#6F7D57', collection: 'Botanical Calm', recommendedRooms: ['Office', 'Dining'] },
  { id: 'MG-903', name: 'Eucalyptus Leaf', family: 'GREENS', hex: '#91B5A5', collection: 'Botanical Calm', recommendedRooms: ['Kitchen', 'Living Room'] },
  { id: 'VG-809', name: 'Bus Green', family: 'GREENS', hex: '#517A4B', collection: 'Fresh Living', recommendedRooms: ['Exterior', 'Office'] },
  { id: 'VG-812', name: 'Mint Green', family: 'GREENS', hex: '#9BC7B3', collection: 'Fresh Living', recommendedRooms: ['Kitchen', 'Bedroom'] },
  { id: 'VG-818', name: 'Cascade Green', family: 'GREENS', hex: '#5E9C7B', collection: 'Fresh Living', recommendedRooms: ['Living Room', 'Kitchen'] },

  // BLUE GREENS
  { id: 'VBG-01', name: 'Aquamarine', family: 'BLUE GREENS', hex: '#58B7B1', collection: 'Teal Sanctuary', recommendedRooms: ['Kitchen', 'Kids Room'] },
  { id: 'VBG-02', name: 'Phirozi Turquoise', family: 'BLUE GREENS', hex: '#53A8A8', collection: 'Teal Sanctuary', recommendedRooms: ['Kitchen', 'Bathroom'] },
  { id: 'VBG-03', name: 'Water Green', family: 'BLUE GREENS', hex: '#78B9A6', collection: 'Teal Sanctuary', recommendedRooms: ['Kitchen', 'Bedroom'] },
  { id: 'VBG-04', name: 'Cyan Wave', family: 'BLUE GREENS', hex: '#00C8FF', collection: 'Teal Sanctuary', recommendedRooms: ['Bathroom', 'Feature Wall'] },

  // BLUES
  { id: 'MB-801', name: 'Coastal Air', family: 'BLUES', hex: '#89B7CA', collection: 'Open Skies', recommendedRooms: ['Bedroom', 'Office'] },
  { id: 'MB-802', name: 'Indigo Hour', family: 'BLUES', hex: '#425D7D', collection: 'Open Skies', recommendedRooms: ['Office', 'Dining'] },
  { id: 'MB-803', name: 'Rainwashed Sky', family: 'BLUES', hex: '#B7D0D6', collection: 'Open Skies', recommendedRooms: ['Kitchen', 'Bedroom'] },
  { id: 'VB-122', name: 'Royal Blue', family: 'BLUES', hex: '#315A9B', collection: 'Open Skies', recommendedRooms: ['Office', 'Dining'] },
  { id: 'VB-125', name: 'Sky Blue Breeze', family: 'BLUES', hex: '#81B9D2', collection: 'Open Skies', recommendedRooms: ['Bedroom', 'Kids Room'] },
  { id: 'VB-128', name: 'French Blue', family: 'BLUES', hex: '#527DA9', collection: 'Open Skies', recommendedRooms: ['Bedroom', 'Office'] },
  { id: 'VB-131', name: 'Satin Blue', family: 'BLUES', hex: '#5F88B6', collection: 'Open Skies', recommendedRooms: ['Bedroom', 'Office'] },

  // VIOLETS
  { id: 'MV-701', name: 'Plum Whisper', family: 'VIOLETS', hex: '#8F719A', collection: 'Quiet Drama', recommendedRooms: ['Bedroom', 'Office'] },
  { id: 'MV-702', name: 'Lilac Haze', family: 'VIOLETS', hex: '#C1AFCC', collection: 'Quiet Drama', recommendedRooms: ['Kids Room', 'Bedroom'] },
  { id: 'VP-718', name: 'Wild Purple', family: 'VIOLETS', hex: '#7669A3', collection: 'Statement Collection', recommendedRooms: ['Bedroom', 'Living Room', 'Dining'] },
  { id: 'VP-719', name: 'Wild Lilac', family: 'VIOLETS', hex: '#AD9DC6', collection: 'Statement Collection', recommendedRooms: ['Bedroom', 'Kids Room'] },
];

export const paintShades: PaintShade[] = basePaintShades.map((shade) => ({
  code: shade.id.replace('-', ' '),
  finish: 'Premium Matte',
  description: `A carefully balanced ${shade.family.toLowerCase()} shade with rich, dependable colour depth.`,
  mood: 'Balanced',
  space: shade.recommendedRooms?.[0] || 'Living Room',
  finishes: ['Matte', 'Silk', 'Satin', 'Gloss'],
  ...shade,
}));

export const roomScenes: RoomScene[] = [
  { id: 'living', name: 'Living Room', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85', mask: 'polygon(0 0, 100% 0, 100% 69%, 0 72%)', original: '#D8D0C2' },
  { id: 'bedroom', name: 'Luxury Bedroom', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85', mask: 'polygon(0 0, 100% 0, 100% 67%, 0 70%)', original: '#D7D0C9' },
  { id: 'kitchen', name: 'Modern Kitchen', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85', mask: 'polygon(0 0, 100% 0, 100% 58%, 0 62%)', original: '#DED8CD' },
  { id: 'dining', name: 'Dining Room', image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=85', mask: 'polygon(0 0, 100% 0, 100% 72%, 0 73%)', original: '#D9D2C7' },
  { id: 'kids', name: 'Kids Room', image: 'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=85', mask: 'polygon(0 0, 100% 0, 100% 67%, 0 70%)', original: '#D6D8D1' },
  { id: 'office', name: 'Home Office', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85', mask: 'polygon(0 0, 100% 0, 100% 66%, 0 70%)', original: '#CDC9C1' },
  { id: 'exterior', name: 'Exterior House', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85', mask: 'polygon(10% 15%, 89% 7%, 92% 74%, 9% 82%)', original: '#D9D1BF' },
];

export const roomColors = [
  { name: 'Warm Beige', hex: '#E8DCC8' },
  { name: 'Soft Pink', hex: '#F5D0CC' },
  { name: 'Ocean Blue', hex: '#4A90E2' },
  { name: 'Sage Green', hex: '#9CAF88' },
  { name: 'Terracotta', hex: '#C66B3D' },
  { name: 'Deep Blue', hex: '#0B2447' },
  { name: 'Sunflower', hex: '#FFD400' },
  { name: 'Royal Violet', hex: '#7B2CFF' },
];

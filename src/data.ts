import type { LucideIcon } from 'lucide-react';
import {
  Home, TreePine, Car, Sparkles, Brush, ShieldCheck, FlaskConical, Layers, Hammer, Droplet, Leaf,
} from 'lucide-react';

export const brand = {
  company: 'Visaka Paints & Chemicals India',
  brand: 'Mathulac',
  website: 'Mathulac Paints',
  tagline: 'Colour that transforms spaces.',
  established: 2004,
};

export const phoneNumbers = ['+91 93631 14343', '+91 96009 09066'];

export type ProductCategory = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  surface: string;
  gradient: string;
  accent: string;
  icon: LucideIcon;
  products: string[];
};

export const categories: ProductCategory[] = [
  {
    id: 'interior',
    name: 'Interior Paints',
    tagline: 'Walls that feel alive',
    description: 'Premium interior emulsions for living rooms, bedrooms and ceilings — smooth matt, rich sheen and stain-resistant finishes.',
    surface: 'Walls & Ceilings',
    gradient: 'from-pink-300 via-rose-200 to-violet-200',
    accent: '#FF1493',
    icon: Home,
    products: ['Interior Primer', 'Interior Emulsion', 'Premium Matt Emulsion', 'Washable Emulsion'],
  },
  {
    id: 'exterior',
    name: 'Exterior Paints',
    tagline: 'Built for the monsoon',
    description: 'Weatherproof exterior emulsions engineered to resist sun, rain and humidity while keeping colour vivid for years.',
    surface: 'Exterior Walls',
    gradient: 'from-cyan-400 via-sky-400 to-emerald-400',
    accent: '#00C8FF',
    icon: ShieldCheck,
    products: ['Exterior Primer', 'Exterior Emulsion', 'Weatherproof Emulsion', 'Tile Coat'],
  },
  {
    id: 'primers',
    name: 'Primers',
    tagline: 'The first coat of confidence',
    description: 'Interior, exterior and auto primers that build adhesion, seal surfaces and create the foundation for a flawless finish.',
    surface: 'All Surfaces',
    gradient: 'from-amber-300 via-orange-300 to-red-300',
    accent: '#FF7A00',
    icon: Layers,
    products: ['Interior Primer', 'Exterior Primer', 'Auto Primer', 'Acrylic Primer'],
  },
  {
    id: 'wood',
    name: 'Wood Finishes',
    tagline: 'Bring wood to life',
    description: 'Premium wood coatings that protect and enhance natural grain — matt, gloss and satin finishes for furniture and doors.',
    surface: 'Wood & Furniture',
    gradient: 'from-amber-500 via-yellow-700 to-amber-900',
    accent: '#B45309',
    icon: TreePine,
    products: ['Wood Primer', 'Melamine Finish', 'PU Finish', 'Wood Stain'],
  },
  {
    id: 'auto',
    name: 'Auto Finishes',
    tagline: 'Built to shine',
    description: 'Automotive refinishing systems — primers, putties, enamels and clearcoats engineered for gloss, durability and fast turnaround.',
    surface: 'Automotive',
    gradient: 'from-red-500 via-rose-600 to-blue-700',
    accent: '#F51B24',
    icon: Car,
    products: ['Auto Primer', 'Auto Putty', 'Auto Enamel', 'Auto Clear Coat'],
  },
  {
    id: 'metal',
    name: 'Metal Coatings',
    tagline: 'Steel that stays strong',
    description: 'Synthetic and general-purpose enamels, aluminium paints and hammertone finishes for metal, machinery and structural steel.',
    surface: 'Metal & Steel',
    gradient: 'from-slate-400 via-zinc-500 to-slate-700',
    accent: '#146BFF',
    icon: Hammer,
    products: ['Synthetic Enamel', 'GP Enamel', 'Aluminium Paint', 'Hammertone'],
  },
  {
    id: 'decorative',
    name: 'Decorative Paints',
    tagline: 'Walls are your canvas',
    description: 'Textured, metallic and designer finishes that turn plain walls into expressive surfaces — from subtle stucco to bold statements.',
    surface: 'Feature Walls',
    gradient: 'from-fuchsia-500 via-violet-500 to-cyan-400',
    accent: '#7B2CFF',
    icon: Sparkles,
    products: ['Texture Finish', 'Metallic Finish', 'Designer Stucco', 'Crackle Finish'],
  },
  {
    id: 'putty',
    name: 'Putty',
    tagline: 'A smoother foundation',
    description: 'Acrylic and cement-based wall putties that fill, level and prepare surfaces for a flawless, long-lasting topcoat.',
    surface: 'Wall Preparation',
    gradient: 'from-stone-300 via-neutral-300 to-stone-400',
    accent: '#78716C',
    icon: Brush,
    products: ['Acrylic Putty', 'Cement Putty', 'Wall Filler'],
  },
  {
    id: 'enamels',
    name: 'Enamels',
    tagline: 'Colour that endures',
    description: 'Synthetic and general-purpose enamels for wood, metal and walls — high-gloss, durable colour with excellent coverage.',
    surface: 'Wood, Metal & Walls',
    gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
    accent: '#67D600',
    icon: Droplet,
    products: ['Synthetic Enamel', 'GP Enamel', 'High-Gloss Enamel'],
  },
  {
    id: 'thinners',
    name: 'Thinners',
    tagline: 'The right flow for every coat',
    description: 'Industrial and automotive thinners engineered to adjust viscosity and drying time without compromising the finish.',
    surface: 'Solvent System',
    gradient: 'from-indigo-300 via-blue-300 to-sky-300',
    accent: '#146BFF',
    icon: FlaskConical,
    products: ['Standard Thinner', 'Auto Thinner', 'Industrial Thinner'],
  },
];

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
};

export const services: Service[] = [
  { id: 'color', title: 'Color Consultation', description: 'Expert guidance to choose shades, finishes and palettes that suit your space and light.', icon: Sparkles, color: '#E6007E' },
  { id: 'surface', title: 'Surface Preparation', description: 'Proper cleaning, filling and priming so your finish lasts for years, not months.', icon: Brush, color: '#FF7A00' },
  { id: 'selection', title: 'Product Selection', description: 'We help you pick the right primer, putty and topcoat system for each surface.', icon: Layers, color: '#FFD400' },
  { id: 'application', title: 'Professional Application', description: 'Experienced, verified painters who deliver clean, even, beautiful results.', icon: Hammer, color: '#67D600' },
  { id: 'monitoring', title: 'Project Monitoring', description: 'We monitor progress at every stage so quality never slips and timelines stay honest.', icon: ShieldCheck, color: '#00C8FF' },
  { id: 'turnkey', title: 'Turnkey Painting Solutions', description: 'From understanding your requirement to the final coat — one partner, end to end.', icon: Home, color: '#7B2CFF' },
];

export type ColorSwatch = {
  name: string;
  hex: string;
  family: string;
  mood: string;
  space: string;
};

export const palette: ColorSwatch[] = [
  { name: 'Mathulac Rose', hex: '#E6007E', family: 'Pinks', mood: 'Bold', space: 'Living Room / Accent' },
  { name: 'Hot Pink Pop', hex: '#FF1493', family: 'Pinks', mood: 'Energetic', space: 'Feature Wall' },
  { name: 'Coral Bloom', hex: '#FF6F61', family: 'Reds', mood: 'Warm', space: 'Dining / Hallway' },
  { name: 'Ember Red', hex: '#F51B24', family: 'Reds', mood: 'Dramatic', space: 'Accent / Front Door' },
  { name: 'Flame Orange', hex: '#FF7A00', family: 'Oranges', mood: 'Vibrant', space: 'Kitchen / Kids Room' },
  { name: 'Amber Glow', hex: '#FFA500', family: 'Oranges', mood: 'Welcoming', space: 'Hallway' },
  { name: 'Sunflower', hex: '#FFD400', family: 'Yellows', mood: 'Cheerful', space: 'Kitchen / Study' },
  { name: 'Honey Yellow', hex: '#F2C94C', family: 'Yellows', mood: 'Soft Warm', space: 'Bedroom' },
  { name: 'Leaf Green', hex: '#67D600', family: 'Greens', mood: 'Fresh', space: 'Balcony / Study' },
  { name: 'Sage Whisper', hex: '#9CAF88', family: 'Greens', mood: 'Calm', space: 'Bedroom / Living' },
  { name: 'Ocean Blue', hex: '#146BFF', family: 'Blues', mood: 'Confident', space: 'Office / Living' },
  { name: 'Sky Tint', hex: '#4A90E2', family: 'Blues', mood: 'Serene', space: 'Bedroom / Living' },
  { name: 'Cyan Wave', hex: '#00C8FF', family: 'Blues', mood: 'Crisp', space: 'Bathroom / Kitchen' },
  { name: 'Deep Navy', hex: '#0B2447', family: 'Blues', mood: 'Grounded', space: 'Office / Accent' },
  { name: 'Royal Violet', hex: '#7B2CFF', family: 'Purples', mood: 'Creative', space: 'Feature Wall' },
  { name: 'Lilac Mist', hex: '#C8A2C8', family: 'Purples', mood: 'Dreamy', space: 'Bedroom' },
  { name: 'Warm Beige', hex: '#E8DCC8', family: 'Neutrals', mood: 'Timeless', space: 'Living / Bedroom' },
  { name: 'Soft Pink', hex: '#F5D0CC', family: 'Neutrals', mood: 'Gentle', space: 'Bedroom / Nursery' },
  { name: 'Terracotta', hex: '#C66B3D', family: 'Neutrals', mood: 'Earthy', space: 'Exterior / Living' },
  { name: 'Cloud White', hex: '#FBF7F0', family: 'Neutrals', mood: 'Clean', space: 'Ceiling / All Rooms' },
  { name: 'Ink Black', hex: '#0B1020', family: 'Blacks', mood: 'Dramatic', space: 'Accent Wall' },
  { name: 'Stone Grey', hex: '#8E8E8E', family: 'Greys', mood: 'Neutral', space: 'Office / Exterior' },
  { name: 'Ivory Light', hex: '#F6F1E8', family: 'Whites', mood: 'Clean', space: 'Living / Kitchen' },
  { name: 'Cloud White', hex: '#FAF8F2', family: 'Whites', mood: 'Pure', space: 'Ceilings / All Rooms' },
  { name: 'Blue Bell White', hex: '#E8EEF0', family: 'Whites', mood: 'Airy', space: 'Bedroom / Kitchen' },
  { name: 'Porcelain', hex: '#ECE9E0', family: 'Whites', mood: 'Soft', space: 'Dining / Ceiling' },
  { name: 'Royal Ivory', hex: '#EEE4CF', family: 'Creams', mood: 'Warm', space: 'Kitchen / Living' },
  { name: 'Light Cream', hex: '#F1E1B7', family: 'Creams', mood: 'Sunny', space: 'Kitchen / Bedroom' },
  { name: 'Raw Silk', hex: '#E7D9BA', family: 'Creams', mood: 'Elegant', space: 'Bedroom / Living' },
  { name: 'Sand Veil', hex: '#CBB495', family: 'Beiges', mood: 'Neutral', space: 'Living / Exterior' },
  { name: 'Suede', hex: '#B9A287', family: 'Beiges', mood: 'Refined', space: 'Living / Office' },
  { name: 'Mid Buff', hex: '#C7A77C', family: 'Beiges', mood: 'Earthy', space: 'Living / Dining' },
  { name: 'Cocoa Nook', hex: '#806052', family: 'Browns', mood: 'Cosy', space: 'Office / Dining' },
  { name: 'Teak Brown', hex: '#755348', family: 'Browns', mood: 'Rich', space: 'Office / Dining' },
  { name: 'Mahogany', hex: '#693F35', family: 'Browns', mood: 'Bold', space: 'Dining / Office' },
  { name: 'Silver Lining', hex: '#B6B8B6', family: 'Greys', mood: 'Modern', space: 'Kitchen / Office' },
  { name: 'Slate Poem', hex: '#687078', family: 'Greys', mood: 'Quiet', space: 'Office / Exterior' },
  { name: 'Smoke Grey', hex: '#8B8B8A', family: 'Greys', mood: 'Urban', space: 'Office / Exterior' },
  { name: 'Charcoal', hex: '#3E4347', family: 'Blacks', mood: 'Dramatic', space: 'Accent Wall' },
  { name: 'Midnight', hex: '#232A38', family: 'Blacks', mood: 'Sophisticated', space: 'Office / Accent' },
];

export const heroSlides = [
  {
    id: 'living',
    category: 'Living Spaces',
    tagline: 'Interior Living',
    headline: 'Colour that makes a house feel like home.',
    statement: 'Premium interior emulsions crafted for walls that feel alive — soft, rich and enduring.',
    image: 'https://images.pexels.com/photos/8146318/pexels-photo-8146318.jpeg?auto=compress&cs=tinysrgb&w=1920',
    accent: '#FF1493',
  },
  {
    id: 'exterior',
    category: 'Exterior',
    tagline: 'Weatherproof Exterior',
    headline: 'Colour that weathers everything.',
    statement: 'Exterior coatings engineered to hold their brilliance against sun, rain and time.',
    image: 'https://images.pexels.com/photos/30667883/pexels-photo-30667883.jpeg?auto=compress&cs=tinysrgb&w=1920',
    accent: '#00C8FF',
  },
  {
    id: 'wood',
    category: 'Wood',
    tagline: 'Wood Finishes',
    headline: 'Bring natural beauty to every surface.',
    statement: 'Coatings that protect and reveal the grain — from matt to mirror gloss.',
    image: 'https://images.pexels.com/photos/4705928/pexels-photo-4705928.jpeg?auto=compress&cs=tinysrgb&w=1920',
    accent: '#B45309',
  },
  {
    id: 'auto',
    category: 'Automotive',
    tagline: 'Automotive Refinishing',
    headline: 'Transform your world. Protect your assets.',
    statement: 'Automotive systems built for gloss, durability and a flawless mirror finish.',
    image: 'https://images.pexels.com/photos/34042808/pexels-photo-34042808.jpeg?auto=compress&cs=tinysrgb&w=1920',
    accent: '#F51B24',
  },
  {
    id: 'decor',
    category: 'Decorative',
    tagline: 'Decorative Surfaces',
    headline: 'Walls are your canvas.',
    statement: 'Textured, metallic and designer finishes that turn plain walls into expressions.',
    image: 'https://images.pexels.com/photos/271805/pexels-photo-271805.jpeg?auto=compress&cs=tinysrgb&w=1920',
    accent: '#7B2CFF',
  },
];

export const surfaces = [
  { id: 'walls', name: 'Walls', image: 'https://images.pexels.com/photos/8146318/pexels-photo-8146318.jpeg?auto=compress&cs=tinysrgb&w=1200', accent: '#FF1493' },
  { id: 'wood', name: 'Wood', image: 'https://images.pexels.com/photos/4705928/pexels-photo-4705928.jpeg?auto=compress&cs=tinysrgb&w=1200', accent: '#B45309' },
  { id: 'metal', name: 'Metal', image: 'https://images.pexels.com/photos/17977773/pexels-photo-17977773.jpeg?auto=closeup&cs=tinysrgb&w=1200', accent: '#146BFF' },
  { id: 'auto', name: 'Automotive', image: 'https://images.pexels.com/photos/34042808/pexels-photo-34042808.jpeg?auto=compress&cs=tinysrgb&w=1200', accent: '#F51B24' },
  { id: 'exterior', name: 'Exterior', image: 'https://images.pexels.com/photos/30667883/pexels-photo-30667883.jpeg?auto=compress&cs=tinysrgb&w=1200', accent: '#00C8FF' },
  { id: 'decor', name: 'Decor', image: 'https://images.pexels.com/photos/271805/pexels-photo-271805.jpeg?auto=compress&cs=tinysrgb&w=1200', accent: '#7B2CFF' },
];

export const companyFacts = [
  { label: 'Established', value: '2004' },
  { label: 'Location', value: 'Coimbatore, India' },
  { label: 'Parent', value: 'Visaka Paints & Chemicals India' },
  { label: 'Brand', value: 'Mathulac' },
  { label: 'Promise', value: 'Exceeds Expectation' },
];

export const trustPillars = [
  { label: 'Quality', description: 'Consistent, reliable formulations backed by a documented quality policy.', icon: ShieldCheck, color: '#E6007E' },
  { label: 'Experience', description: 'Two decades of manufacturing paints and chemicals from Coimbatore.', icon: Sparkles, color: '#FF7A00' },
  { label: 'Technology', description: 'Modern factory capability with expanding production capacity.', icon: FlaskConical, color: '#00C8FF' },
  { label: 'Responsible', description: 'No-added-lead, mercury, arsenic or chromium in decorative products.', icon: Leaf, color: '#67D600' },
];

export const timeline = [
  { year: '2004', title: 'Founded', description: 'Visaka Paints & Chemicals India is established in Coimbatore.' },
  { year: 'Early Years', title: 'Manufacturing', description: 'Builds out production for thinners, primers, enamels and putties.' },
  { year: 'Growth', title: 'Mathulac Brand', description: 'Expands into decorative, wood, automotive and industrial coatings.' },
  { year: 'Today', title: 'Turnkey Solutions', description: 'Offers end-to-end painting services — from colour consultation to final coat.' },
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

export type PaintShade = {
  id: string;
  code: string;
  name: string;
  family: string;
  hex: string;
  collection: string;
  recommendedRooms: string[];
  finish: string;
  description: string;
};

export const paintShades: PaintShade[] = [
  { id: 'MB-101', name: 'Warm Beige', family: 'Beige', hex: '#DCCBB5', collection: 'Warm Neutrals', recommendedRooms: ['Living Room', 'Bedroom', 'Dining'] },
  { id: 'MB-102', name: 'Linen Hush', family: 'Beige', hex: '#E9DDCA', collection: 'Warm Neutrals', recommendedRooms: ['Living Room', 'Bedroom'] },
  { id: 'MB-103', name: 'Sand Veil', family: 'Beige', hex: '#CBB495', collection: 'Warm Neutrals', recommendedRooms: ['Living Room', 'Exterior'] },
  { id: 'MW-001', name: 'Ivory Light', family: 'Whites', hex: '#F6F1E8', collection: 'Essential Whites', recommendedRooms: ['Kitchen', 'Living Room'] },
  { id: 'MW-002', name: 'Cloud White', family: 'Whites', hex: '#FAF8F2', collection: 'Essential Whites', recommendedRooms: ['Bedroom', 'Kitchen', 'Office'] },
  { id: 'MW-003', name: 'Porcelain', family: 'Whites', hex: '#ECE9E0', collection: 'Essential Whites', recommendedRooms: ['Dining', 'Exterior'] },
  { id: 'MN-201', name: 'Mushroom Mist', family: 'Neutrals', hex: '#B9ADA1', collection: 'Quiet Earth', recommendedRooms: ['Living Room', 'Office'] },
  { id: 'MN-202', name: 'Pebble Path', family: 'Neutrals', hex: '#A79F95', collection: 'Quiet Earth', recommendedRooms: ['Office', 'Exterior'] },
  { id: 'MN-203', name: 'Oat Comfort', family: 'Neutrals', hex: '#D8D0C2', collection: 'Quiet Earth', recommendedRooms: ['Bedroom', 'Dining'] },
  { id: 'MY-301', name: 'Morning Saffron', family: 'Yellow', hex: '#E7C35C', collection: 'Sunlit Days', recommendedRooms: ['Kitchen', 'Kids Room'] },
  { id: 'MY-302', name: 'Butter Glow', family: 'Yellow', hex: '#F4DC91', collection: 'Sunlit Days', recommendedRooms: ['Kitchen', 'Dining'] },
  { id: 'MO-401', name: 'Apricot Clay', family: 'Orange', hex: '#D6875B', collection: 'Earth Notes', recommendedRooms: ['Dining', 'Kids Room'] },
  { id: 'MO-402', name: 'Terracotta Muse', family: 'Orange', hex: '#B85F42', collection: 'Earth Notes', recommendedRooms: ['Living Room', 'Exterior'] },
  { id: 'MR-501', name: 'Ember Silk', family: 'Red', hex: '#A94F4A', collection: 'Bold Expression', recommendedRooms: ['Dining', 'Exterior'] },
  { id: 'MR-502', name: 'Rosewood', family: 'Red', hex: '#7F3C3F', collection: 'Bold Expression', recommendedRooms: ['Dining', 'Office'] },
  { id: 'MP-601', name: 'Blush Story', family: 'Pink', hex: '#E7B7B0', collection: 'Soft Expression', recommendedRooms: ['Bedroom', 'Kids Room'] },
  { id: 'MP-602', name: 'Petal Dust', family: 'Pink', hex: '#D8989B', collection: 'Soft Expression', recommendedRooms: ['Bedroom', 'Dining'] },
  { id: 'MV-701', name: 'Plum Whisper', family: 'Purple', hex: '#8F719A', collection: 'Quiet Drama', recommendedRooms: ['Bedroom', 'Office'] },
  { id: 'MV-702', name: 'Lilac Haze', family: 'Purple', hex: '#C1AFCC', collection: 'Quiet Drama', recommendedRooms: ['Kids Room', 'Bedroom'] },
  { id: 'MB-801', name: 'Coastal Air', family: 'Blue', hex: '#89B7CA', collection: 'Open Skies', recommendedRooms: ['Bedroom', 'Office'] },
  { id: 'MB-802', name: 'Indigo Hour', family: 'Blue', hex: '#425D7D', collection: 'Open Skies', recommendedRooms: ['Office', 'Dining'] },
  { id: 'MB-803', name: 'Rainwashed', family: 'Blue', hex: '#B7D0D6', collection: 'Open Skies', recommendedRooms: ['Kitchen', 'Bedroom'] },
  { id: 'MG-901', name: 'Sage Retreat', family: 'Green', hex: '#9EAE91', collection: 'Botanical Calm', recommendedRooms: ['Living Room', 'Bedroom'] },
  { id: 'MG-902', name: 'Olive Grove', family: 'Green', hex: '#6F7D57', collection: 'Botanical Calm', recommendedRooms: ['Office', 'Dining'] },
  { id: 'MG-903', name: 'Eucalyptus', family: 'Green', hex: '#91B5A5', collection: 'Botanical Calm', recommendedRooms: ['Kitchen', 'Living Room'] },
  { id: 'MBR-01', name: 'Cocoa Nook', family: 'Brown', hex: '#806052', collection: 'Deep Earth', recommendedRooms: ['Office', 'Dining'] },
  { id: 'MBR-02', name: 'Clay Pot', family: 'Brown', hex: '#A8785C', collection: 'Deep Earth', recommendedRooms: ['Exterior', 'Living Room'] },
  { id: 'MGY-01', name: 'Silver Lining', family: 'Grey', hex: '#B6B8B6', collection: 'Modern Balance', recommendedRooms: ['Kitchen', 'Office'] },
  { id: 'MGY-02', name: 'Slate Poem', family: 'Grey', hex: '#687078', collection: 'Modern Balance', recommendedRooms: ['Office', 'Exterior'] },
  { id: 'MGY-03', name: 'Dove Shadow', family: 'Grey', hex: '#D0CECA', collection: 'Modern Balance', recommendedRooms: ['Living Room', 'Bedroom'] },
  { id: 'VP-0718', name: 'Wild Purple', family: 'Purple', hex: '#7669A3', collection: 'Statement Collection', recommendedRooms: ['Bedroom', 'Living Room', 'Dining'] },
  { id: 'VP-0719', name: 'Wild Lilac', family: 'Purple', hex: '#AD9DC6', collection: 'Statement Collection', recommendedRooms: ['Bedroom', 'Kids Room'] },
  { id: 'VG-0821', name: 'WaterGreen', family: 'Green', hex: '#78B9A6', collection: 'Fresh Living', recommendedRooms: ['Kitchen', 'Bedroom'] },
  { id: 'VN-0416', name: 'Suede', family: 'Beige', hex: '#B9A287', collection: 'Natural Material', recommendedRooms: ['Living Room', 'Office'] },
  { id: 'VB-0908', name: 'TeakBrown', family: 'Brown', hex: '#755348', collection: 'Natural Material', recommendedRooms: ['Office', 'Dining'] },
  { id: 'VG-0509', name: 'SmokeGrey', family: 'Grey', hex: '#8B8B8A', collection: 'Urban Neutrals', recommendedRooms: ['Office', 'Exterior'] },
  { id: 'VB-0125', name: 'SkyBlue', family: 'Blue', hex: '#81B9D2', collection: 'Open Skies', recommendedRooms: ['Bedroom', 'Kids Room'] },
  { id: 'VR-0604', name: 'SignalRed', family: 'Red', hex: '#C53D42', collection: 'Statement Collection', recommendedRooms: ['Dining', 'Exterior'] },
  { id: 'VB-0131', name: 'SatingBlue', family: 'Blue', hex: '#5F88B6', collection: 'Open Skies', recommendedRooms: ['Bedroom', 'Office'] },
  { id: 'VC-0310', name: 'Sandstone', family: 'Cream', hex: '#D8C29B', collection: 'Sunlit Days', recommendedRooms: ['Living Room', 'Dining'] },
  { id: 'VB-0903', name: 'SandalWood', family: 'Brown', hex: '#A77B55', collection: 'Natural Material', recommendedRooms: ['Living Room', 'Exterior'] },
  { id: 'VW-0008', name: 'RoyalIvory', family: 'Off Whites', hex: '#EEE4CF', collection: 'Essential Whites', recommendedRooms: ['Kitchen', 'Living Room'] },
  { id: 'VB-0122', name: 'RoyalBlue', family: 'Blue', hex: '#315A9B', collection: 'Open Skies', recommendedRooms: ['Office', 'Dining'] },
  { id: 'VC-0302', name: 'RawSilk', family: 'Cream', hex: '#E7D9BA', collection: 'Sunlit Days', recommendedRooms: ['Bedroom', 'Living Room'] },
  { id: 'VG-0805', name: 'Pista', family: 'Green', hex: '#B7C67B', collection: 'Fresh Living', recommendedRooms: ['Kitchen', 'Kids Room'] },
  { id: 'VG-0825', name: 'Phirozi', family: 'Green', hex: '#53A8A8', collection: 'Fresh Living', recommendedRooms: ['Kitchen', 'Bathroom'] },
  { id: 'VP-0614', name: 'Petal', family: 'Pink', hex: '#E8B7C2', collection: 'Soft Expression', recommendedRooms: ['Bedroom', 'Kids Room'] },
  { id: 'VP-0612', name: 'PaleRose', family: 'Pink', hex: '#EBCACB', collection: 'Soft Expression', recommendedRooms: ['Bedroom', 'Dining'] },
  { id: 'VC-0301', name: 'PaleCream', family: 'Cream', hex: '#F3E6BB', collection: 'Sunlit Days', recommendedRooms: ['Kitchen', 'Bedroom'] },
  { id: 'VR-0608', name: 'ProRed', family: 'Red', hex: '#A63138', collection: 'Statement Collection', recommendedRooms: ['Dining', 'Exterior'] },
  { id: 'VB-0112', name: 'OxfordBlue',   family: 'Blacks', hex: '#273C61', collection: 'Deep Tones', recommendedRooms: ['Office', 'Dining'] },
  { id: 'VW-0004', name: 'OffWhite', family: 'Off Whites', hex: '#EDE9DE', collection: 'Essential Whites', recommendedRooms: ['Kitchen', 'Bedroom'] },
  { id: 'VN-0412', name: 'Mushroom', family: 'Neutrals', hex: '#A39486', collection: 'Quiet Earth', recommendedRooms: ['Living Room', 'Office'] },
  { id: 'VG-0812', name: 'MintGreen', family: 'Green', hex: '#9BC7B3', collection: 'Fresh Living', recommendedRooms: ['Kitchen', 'Bedroom'] },
  { id: 'VB-0408', name: 'MidBuff', family: 'Beige', hex: '#C7A77C', collection: 'Natural Material', recommendedRooms: ['Living Room', 'Dining'] },
  { id: 'VR-0602', name: 'MercedesRed', family: 'Red', hex: '#9F3038', collection: 'Statement Collection', recommendedRooms: ['Dining', 'Exterior'] },
  { id: 'VC-0306', name: 'LightCream', family: 'Cream', hex: '#F1E1B7', collection: 'Sunlit Days', recommendedRooms: ['Kitchen', 'Living Room'] },
  { id: 'VY-0201', name: 'LemonYellow', family: 'Yellow', hex: '#EACA42', collection: 'Sunlit Days', recommendedRooms: ['Kitchen', 'Kids Room'] },
  { id: 'VB-0901', name: 'LeafBrown', family: 'Brown', hex: '#8B6848', collection: 'Natural Material', recommendedRooms: ['Office', 'Exterior'] },
  { id: 'VY-0210', name: 'GoldenYellow', family: 'Yellow', hex: '#D9A62A', collection: 'Sunlit Days', recommendedRooms: ['Kitchen', 'Dining'] },
  { id: 'VB-0906', name: 'GoldenBrown', family: 'Brown', hex: '#99693A', collection: 'Natural Material', recommendedRooms: ['Dining', 'Exterior'] },
  { id: 'VB-0128', name: 'FrenchBlue', family: 'Blue', hex: '#527DA9', collection: 'Open Skies', recommendedRooms: ['Bedroom', 'Office'] },
  { id: 'VO-0503', name: 'DeepOrange', family: 'Orange', hex: '#C55A36', collection: 'Earth Notes', recommendedRooms: ['Dining', 'Exterior'] },
  { id: 'VO-0501', name: 'DawnGlow', family: 'Orange', hex: '#E49A65', collection: 'Earth Notes', recommendedRooms: ['Dining', 'Kids Room'] },
  { id: 'VC-0315', name: 'Dawn', family: 'Cream', hex: '#E5D6AD', collection: 'Sunlit Days', recommendedRooms: ['Bedroom', 'Living Room'] },
  { id: 'VG-0801', name: 'DarkGreen',   family: 'Blacks', hex: '#3D5B4A', collection: 'Deep Tones', recommendedRooms: ['Office', 'Dining'] },
  { id: 'VG-0818', name: 'CascadeGreen', family: 'Green', hex: '#5E9C7B', collection: 'Fresh Living', recommendedRooms: ['Living Room', 'Kitchen'] },
  { id: 'VP-0607', name: 'Candy', family: 'Pink', hex: '#D7658E', collection: 'Soft Expression', recommendedRooms: ['Kids Room', 'Bedroom'] },
  { id: 'VG-0809', name: 'BusGreen', family: 'Green', hex: '#517A4B', collection: 'Fresh Living', recommendedRooms: ['Exterior', 'Office'] },
  { id: 'VB-0912', name: 'Brown', family: 'Brown', hex: '#69483D', collection: 'Deep Earth', recommendedRooms: ['Office', 'Exterior'] },
  { id: 'VB-0915', name: 'Brandy', family: 'Brown', hex: '#8D5A3C', collection: 'Deep Earth', recommendedRooms: ['Dining', 'Living Room'] },
  { id: 'VG-0803', name: 'BottleGreen',   family: 'Blacks', hex: '#355746', collection: 'Deep Tones', recommendedRooms: ['Office', 'Exterior'] },
  { id: 'VW-0006', name: 'BlueBellWhite', family: 'Whites', hex: '#E8EEF0', collection: 'Essential Whites', recommendedRooms: ['Kitchen', 'Bedroom'] },
  { id: 'VB-0918', name: 'BayBrown', family: 'Brown', hex: '#7A5543', collection: 'Deep Earth', recommendedRooms: ['Exterior', 'Office'] },
  { id: 'VG-0828', name: 'Aquamarine', family: 'Green', hex: '#58B7B1', collection: 'Fresh Living', recommendedRooms: ['Kitchen', 'Kids Room'] },
  { id: 'VG-0511', name: 'AdGrey', family: 'Grey', hex: '#777D82', collection: 'Urban Neutrals', recommendedRooms: ['Office', 'Exterior'] },
  { id: 'VB-0922', name: 'Mahogany', family: 'Brown', hex: '#693F35', collection: 'Deep Earth', recommendedRooms: ['Dining', 'Office'] },
  { id: 'VR-0614', name: 'ImperialCrimson', family: 'Red', hex: '#822F41', collection: 'Statement Collection', recommendedRooms: ['Dining', 'Exterior'] },
].map((shade) => ({ code: shade.id.replace('-', ' '), finish: 'Premium Matte', description: `A carefully balanced ${shade.family.toLowerCase()} shade with rich, dependable colour depth.`, ...shade }));

export type RoomScene = { id: string; name: string; image: string; mask: string; original: string };
export const roomScenes: RoomScene[] = [
  { id: 'living', name: 'Living Room', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85', mask: 'polygon(0 0, 100% 0, 100% 69%, 0 72%)', original: '#D8D0C2' },
  { id: 'bedroom', name: 'Luxury Bedroom', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85', mask: 'polygon(0 0, 100% 0, 100% 67%, 0 70%)', original: '#D7D0C9' },
  { id: 'kitchen', name: 'Modern Kitchen', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85', mask: 'polygon(0 0, 100% 0, 100% 58%, 0 62%)', original: '#DED8CD' },
  { id: 'dining', name: 'Dining Room', image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=85', mask: 'polygon(0 0, 100% 0, 100% 72%, 0 73%)', original: '#D9D2C7' },
  { id: 'kids', name: 'Kids Room', image: 'https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1600&q=85', mask: 'polygon(0 0, 100% 0, 100% 67%, 0 70%)', original: '#D6D8D1' },
  { id: 'office', name: 'Home Office', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85', mask: 'polygon(0 0, 100% 0, 100% 66%, 0 70%)', original: '#CDC9C1' },
  { id: 'exterior', name: 'Exterior House', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85', mask: 'polygon(10% 15%, 89% 7%, 92% 74%, 9% 82%)', original: '#D9D1BF' },
];

export const navItems = [
  { id: 'top', label: 'Home' },
  { id: 'spaces', label: 'Spaces' },
  { id: 'auto', label: 'Auto' },
  { id: 'wood', label: 'Wood' },
  { id: 'decor', label: 'Decor' },
  { id: 'products', label: 'Products' },
  { id: 'palette', label: 'Colours' },
  { id: 'contact', label: 'Contact' },
];

export type Product = {
  id: string;
  name: string;
  category: 'Interior' | 'Exterior' | 'Wood' | 'Metal' | 'Decorative' | 'Automotive';
  description: string;
  benefits: string[];
  finish: string;
  surfaces: string;
  color: string;
  image: string;
};

export const featuredProducts: Product[] = [
  { id: 'velvet-matt', name: 'Velvet Matt Emulsion', category: 'Interior', description: 'A velvety, low-sheen interior coat with a rich depth of colour and everyday stain resistance.', benefits: ['Washable finish', 'Low odour', 'Deep colour retention'], finish: 'Luxury Matt', surfaces: 'Interior walls & ceilings', color: '#E6007E', image: 'https://images.pexels.com/photos/8146318/pexels-photo-8146318.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: 'weather-shield', name: 'Weather Shield+', category: 'Exterior', description: 'A resilient exterior shield engineered for intense sun, heavy rain and humid tropical conditions.', benefits: ['UV defence', 'Anti-algal', 'Crack bridging'], finish: 'Soft Sheen', surfaces: 'Exterior masonry', color: '#00C8FF', image: 'https://images.pexels.com/photos/30667883/pexels-photo-30667883.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: 'grain-lustre', name: 'Grain Lustre PU', category: 'Wood', description: 'A premium clear wood system that brings out character while guarding natural grain.', benefits: ['Hard wearing', 'Grain enhancing', 'Moisture resistant'], finish: 'Satin', surfaces: 'Furniture, doors & panels', color: '#B45309', image: 'https://images.pexels.com/photos/4705928/pexels-photo-4705928.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: 'ironclad', name: 'Ironclad Enamel', category: 'Metal', description: 'A high-build enamel made for clean coverage, high gloss and long service on metal.', benefits: ['Rust protection', 'High coverage', 'Fast drying'], finish: 'High Gloss', surfaces: 'Gates, grills & machinery', color: '#146BFF', image: 'https://images.pexels.com/photos/17977773/pexels-photo-17977773.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: 'artisan-stucco', name: 'Artisan Stucco', category: 'Decorative', description: 'A tactile decorative finish for feature walls that deserve a little theatre.', benefits: ['Handcrafted texture', 'Layerable depth', 'Designer finish'], finish: 'Textured', surfaces: 'Interior feature walls', color: '#7B2CFF', image: 'https://images.pexels.com/photos/271805/pexels-photo-271805.jpeg?auto=compress&cs=tinysrgb&w=900' },
  { id: 'mirror-clear', name: 'Mirror Clear Coat', category: 'Automotive', description: 'A showroom-grade clearcoat designed for brilliant depth, protection and polish.', benefits: ['Mirror clarity', 'UV resistant', 'Polishable'], finish: 'Ultra Gloss', surfaces: 'Automotive panels', color: '#F51B24', image: 'https://images.pexels.com/photos/34042808/pexels-photo-34042808.jpeg?auto=compress&cs=tinysrgb&w=900' },
];

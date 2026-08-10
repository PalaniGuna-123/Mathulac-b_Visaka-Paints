import type { LucideIcon } from 'lucide-react';
import {
  Home, TreePine, Car, Sparkles, Brush, ShieldCheck, FlaskConical, Layers, Hammer, Droplet, Leaf,
} from 'lucide-react';

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
  { name: 'Ink Black', hex: '#0B1020', family: 'Neutrals', mood: 'Dramatic', space: 'Accent Wall' },
  { name: 'Stone Grey', hex: '#8E8E8E', family: 'Neutrals', mood: 'Neutral', space: 'Office / Exterior' },
];

export const heroSlides = [
  {
    id: 'living',
    category: 'Living Spaces',
    title: 'Living Spaces',
    description: 'Premium interior emulsions that turn everyday rooms into warm, vivid experiences.',
    image: 'https://images.pexels.com/photos/8146318/pexels-photo-8146318.jpeg?auto=compress&cs=tinysrgb&w=1920',
    accent: '#FF1493',
  },
  {
    id: 'exterior',
    category: 'Exterior',
    title: 'Weatherproof Exterior',
    description: 'Exterior coatings engineered to hold their colour against sun, rain and time.',
    image: 'https://images.pexels.com/photos/30667883/pexels-photo-30667883.jpeg?auto=compress&cs=tinysrgb&w=1920',
    accent: '#00C8FF',
  },
  {
    id: 'wood',
    category: 'Wood',
    title: 'Wood Finishes',
    description: 'Coatings that protect and reveal the natural grain of every surface they touch.',
    image: 'https://images.pexels.com/photos/4705928/pexels-photo-4705928.jpeg?auto=compress&cs=tinysrgb&w=1920',
    accent: '#B45309',
  },
  {
    id: 'auto',
    category: 'Automotive',
    title: 'Built to Shine',
    description: 'Automotive refinishing systems for gloss, durability and a mirror finish.',
    image: 'https://images.pexels.com/photos/34042808/pexels-photo-34042808.jpeg?auto=compress&cs=tinysrgb&w=1920',
    accent: '#F51B24',
  },
  {
    id: 'decor',
    category: 'Decorative',
    title: 'Walls Are Your Canvas',
    description: 'Textured, metallic and designer finishes that turn plain walls into art.',
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

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'products', label: 'Products' },
  { id: 'spaces', label: 'Spaces' },
  { id: 'auto', label: 'Auto' },
  { id: 'wood', label: 'Wood' },
  { id: 'decor', label: 'Decor' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

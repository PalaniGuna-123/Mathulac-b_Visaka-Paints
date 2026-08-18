export interface AdvertisementItem {
  id: string;
  title: string;
  tagline: string;
  category: 'brand' | 'print' | 'outdoor' | 'commercial' | 'festive';
  categoryLabel: string;
  year: string;
  image: string;
  accentColor: string;
  description: string;
  mediaType: 'poster' | 'video' | 'billboard' | 'print-ad';
  dimensions?: string;
  headline: string;
  highlights: string[];
}

export const advertisementCategories = [
  { id: 'all', label: 'All Campaigns' },
  { id: 'brand', label: 'Brand Identity' },
  { id: 'print', label: 'Print & Posters' },
  { id: 'outdoor', label: 'Outdoor & Hoardings' },
  { id: 'commercial', label: 'Commercial Spots' },
  { id: 'festive', label: 'Festive Editions' },
];

export const advertisementItems: AdvertisementItem[] = [
  {
    id: 'exceeds-expectation-green',
    title: 'Exceeds Expectation — Green Heritage',
    tagline: 'Eco-Friendly Architectural Coatings & Spectrum Hues',
    category: 'brand',
    categoryLabel: 'Brand Campaign',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#10B981',
    description:
      'The iconic Mathulac signature painter mascot presenting the full spectrum circular chromatic fan. Engineered for zero VOC emissions, high opacity, and enduring exterior defense.',
    mediaType: 'poster',
    dimensions: '3000 x 4000 px (4K Print Ready)',
    headline: 'Mathulac — Exceeds Expectation',
    highlights: ['Iconic Painter Mascot', 'Full Color Wheel Spectrum', 'ISO 9001 Quality Assured', 'Tropical Climate Proof'],
  },
  {
    id: 'exceeds-expectation-red-splash',
    title: 'Pure Vibrancy — Red Motion Wave',
    tagline: 'High-Impact Pigments for Expressive Living',
    category: 'brand',
    categoryLabel: 'Brand Campaign',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#E6007E',
    description:
      'Dynamic liquid crimson paint flow emphasizing color depth, rich gloss, and smooth leveling across both concrete and wooden substrates.',
    mediaType: 'poster',
    dimensions: '2400 x 3200 px',
    headline: 'Unleash Real Depth & Gloss',
    highlights: ['Fluid Dynamic Flow', 'Deep Chromatic Saturation', 'Anti-Fade UV Shield', 'Ultra Washable Finish'],
  },
  {
    id: 'luxury-interior-wood',
    title: 'Sanctuary of Wood & Warmth',
    tagline: 'Timeless Melamine, Sanding Sealers & Table Top PU',
    category: 'print',
    categoryLabel: 'Print & Press',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#F59E0B',
    description:
      'Architectural magazine feature celebrating natural grain textures, soft interior lighting, and Mathulac premium wood polishes and PU lacquers.',
    mediaType: 'print-ad',
    dimensions: 'A4 Full Page Magazine Spread',
    headline: 'Wood Finishes That Breathe Life into Timber',
    highlights: ['Micro-Pore Grain Protection', 'Scratch Resistant PU', 'Natural Satin Sheen', 'Fast Drying Formula'],
  },
  {
    id: 'family-home-exceeds',
    title: 'Happy Homes, Vibrant Futures',
    tagline: 'Non-Toxic, Washable Family-Safe Wall Emulsions',
    category: 'brand',
    categoryLabel: 'Brand Campaign',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#3B82F6',
    description:
      'Featuring children discovering the joy of colours with certified lead-free, eco-safe washable emulsion buckets designed for modern residential spaces.',
    mediaType: 'poster',
    dimensions: '2000 x 2500 px',
    headline: 'Walls That Clean in a Single Wipe',
    highlights: ['100% Lead & Heavy Metal Free', 'Stain Guard Technology', 'Low Odour Curing', '2,000+ Custom Shades'],
  },
  {
    id: 'auto-refinish-billboard',
    title: 'Showroom Shine on the Fast Lane',
    tagline: '2K PU Mirror Clears & Bodyshop Primers',
    category: 'outdoor',
    categoryLabel: 'Outdoor & Hoarding',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#EF4444',
    description:
      'Highway billboard campaign celebrating automotive excellence, ultra-fast curing body fillers, and glass-like mirror topcoats for cars and commercial vehicles.',
    mediaType: 'billboard',
    dimensions: '40ft x 20ft Highway Unipole',
    headline: 'Mirror Polish. Unrivalled Durability.',
    highlights: ['OEM Paint Match', 'Speed Kote Fast Sanding', 'High Solid 2K Clear', 'Chemical & Salt Resistance'],
  },
  {
    id: 'festive-pongal-diwali',
    title: 'Colors of Celebration — Festive Edition',
    tagline: 'Brightening Homes Across South India Since 2004',
    category: 'festive',
    categoryLabel: 'Festive Special',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#8B5CF6',
    description:
      'Annual regional festive showcase greeting families with festive discounts, color harmony guides, and long-lasting exterior weatherproof coatings.',
    mediaType: 'poster',
    dimensions: 'Social & Print Double Spread',
    headline: 'Welcome Prosperity in Pure, Brilliant Shades',
    highlights: ['Festive Color Combos', 'Weather Guard Shield', 'Algae & Fungus Resistance', 'Special Dealer Offers'],
  },
  {
    id: 'commercial-reel-spot',
    title: 'The Mathulac Touch — Official Brand Reel',
    tagline: 'From Raw Surface to Masterpiece',
    category: 'commercial',
    categoryLabel: 'TV & Digital Spot',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#EC4899',
    description:
      'Cinematic brand film demonstrating the transformational journey of architectural facades, industrial steelwork, and luxury interiors under Mathulac coatings.',
    mediaType: 'video',
    dimensions: '4K Ultra HD 60fps Film',
    headline: 'One Brand. Endless Possibilities.',
    highlights: ['Cinematic Visuals', 'Live Surface Transformation', 'Architect & Painter Testimonials', 'National Broadcast'],
  },
  {
    id: 'outdoor-architectural-monolith',
    title: 'Defying Tropical Weather — Optima Series',
    tagline: 'Extreme Weatherproofing for Modern Architecture',
    category: 'outdoor',
    categoryLabel: 'Outdoor & Hoarding',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#06B6D4',
    description:
      'Metro city hoarding series showcasing multi-storey coastal villas protected with Optima elastomeric rain-resistant exterior coatings.',
    mediaType: 'billboard',
    dimensions: '60ft x 30ft Metro Gantry',
    headline: 'Weather Proofing That Stands the Test of Decades',
    highlights: ['Rain & UV Elastomeric Barrier', 'Anti-Carbonation Guard', 'Zero Efflorescence', '10-Year Performance Promise'],
  },
];

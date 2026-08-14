import {
  FlaskConical,
  Layers,
  Sparkles,
  TreePine,
  Droplet,
  Hammer,
  Wrench,
  Brush,
  PaintBucket,
  Home,
  ShieldCheck,
  Paintbrush,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ProductCategory, Surface, Product, MathulacProductItem } from '../types';
import { productAssetMap } from './productAssets';

export interface CatalogCategory {
  id: string;
  orderNumber: number;
  name: string;
  count: number;
  icon: LucideIcon;
  accent: string;
  folderName: string;
  description: string;
}

export const mathulacCategories: CatalogCategory[] = [
  {
    id: 'thinners',
    orderNumber: 1,
    name: 'Thinners',
    count: 3,
    icon: FlaskConical,
    accent: '#00C8FF',
    folderName: 'Thinners',
    description: 'Specially formulated Special PU, PU, and V106 Melamine thinners for excellent flow and minimal dust pickup.',
  },
  {
    id: 'primers-auto-putty',
    orderNumber: 2,
    name: 'Primers / Auto Primers / Putty',
    count: 3,
    icon: Layers,
    accent: '#FF7A00',
    folderName: 'PrimersAutoPutty',
    description: 'N.C Putty, OG Putty, and Q.D Primer Brown for industrial surface sealing and anti-corrosive protection.',
  },
  {
    id: 'aluminium-paints',
    orderNumber: 3,
    name: 'Aluminium Paints',
    count: 2,
    icon: Sparkles,
    accent: '#94A3B8',
    folderName: 'AluminiumPaints',
    description: 'N.C Aluminium and Aluminium Single Pack delivering flat metallic finishes and fast air-drying.',
  },
  {
    id: 'wood-coatings',
    orderNumber: 4,
    name: 'Wood Coatings',
    count: 3,
    icon: TreePine,
    accent: '#B45309',
    folderName: 'WoodCoatings',
    description: 'Wood / Cement Primer, NC Sanding Sealer, and NC SPL Table Top Clear for long-lasting mirror wood finishes.',
  },
  {
    id: 'synthetic-enamels',
    orderNumber: 5,
    name: 'Synthetic Enamels',
    count: 2,
    icon: Droplet,
    accent: '#E6007E',
    folderName: 'SyntheticEnamels',
    description: 'Aura Satin Enamel and SYN Enamels providing rich satin and high-gloss washable stain-resistant coats.',
  },
  {
    id: 'gp-enamels',
    orderNumber: 6,
    name: 'General Purpose Enamels',
    count: 2,
    icon: Hammer,
    accent: '#146BFF',
    folderName: 'GPEnamels',
    description: 'Varna GP Enamels and Black & Chassis Grey economical solvent-based all-surface paints.',
  },
  {
    id: 'hammertone-paints',
    orderNumber: 7,
    name: 'Hammertone Paints',
    count: 1,
    icon: Wrench,
    accent: '#8B5CF6',
    folderName: 'HammertonePaints',
    description: 'Hammer Tone enamel featuring distinctive hammered-metal pattern that conceals surface imperfections.',
  },
  {
    id: 'acrylic-cement-putty',
    orderNumber: 8,
    name: 'Acrylic / Cement Base Putty',
    count: 2,
    icon: Brush,
    accent: '#78716C',
    folderName: 'AcrylicCementPutty',
    description: 'Acrylic Wall Putty and Cement Base Wall Putty providing alkali, acid, and fungal resistance.',
  },
  {
    id: 'interior-exterior-primers',
    orderNumber: 9,
    name: 'Interior / Exterior Primers',
    count: 2,
    icon: PaintBucket,
    accent: '#10B981',
    folderName: 'InteriorExteriorPrimers',
    description: 'Cement Primer Interior and Weather Proof Exterior Primers for porous surface sealing and long-lasting hold.',
  },
  {
    id: 'trendy-interior-products',
    orderNumber: 10,
    name: 'Trendy Interior Products',
    count: 2,
    icon: Home,
    accent: '#EC4899',
    folderName: 'TrendyInteriorProducts',
    description: 'Trendy Acrylic Distemper paste and Trendy Interior Emulsion for smooth, pleasing matt finishes.',
  },
  {
    id: 'exterior-emulsion',
    orderNumber: 11,
    name: 'Exterior Emulsion',
    count: 2,
    icon: ShieldCheck,
    accent: '#06B6D4',
    folderName: 'ExteriorEmulsion',
    description: 'APT Exterior Emulsion and Optima Weather Proof Exterior Emulsion with self-cleaning gradual chalking.',
  },
  {
    id: 'tile-coat',
    orderNumber: 12,
    name: 'Tile Coat',
    count: 0,
    icon: Paintbrush,
    accent: '#84CC16',
    folderName: 'TileCoat',
    description: 'Specialized protective coating for cement tiles, interlocking pavers, and masonry walkways. (Under Development)',
  },
];

export const mathulacProductItems: MathulacProductItem[] = [
  // ============================================================
  // 1. THINNERS
  // ============================================================
  {
    id: 'special-pu-thinner',
    name: 'Special PU Thinner',
    categoryKey: 'thinners',
    categoryName: 'Thinners',
    description:
      'These specially formulated Special PU Thinners are designed for use with PU top-coat finishes and clears. Mathulac Special PU Thinners provide excellent flow properties to the thinned paint during spray application. Their unique drying properties help minimize dust pick-up while drying and reduce runs and sags.',
    availableSizes: ['500 ml', '1 Ltr', '5 Ltr', '20 Ltr', '200 Ltr'],
    image: productAssetMap['special-pu-thinner'],
    color: '#00C8FF',
  },
  {
    id: 'pu-thinner',
    name: 'PU Thinner',
    categoryKey: 'thinners',
    categoryName: 'Thinners',
    description:
      'PU Thinners are designed for use with low-range PU finishes and PU undercoats such as primers, fillers and putties. Mathulac PU Thinners provide excellent flow properties to the thinned paint during spray application. Their fast-drying properties help minimize dust pick-up while drying and reduce runs and sags.',
    availableSizes: ['500 ml', '1 Ltr', '5 Ltr', '20 Ltr', '200 Ltr'],
    image: productAssetMap['pu-thinner'],
    color: '#00C8FF',
  },
  {
    id: 'v106-melamine-thinner',
    name: 'V106 Melamine Thinner',
    categoryKey: 'thinners',
    categoryName: 'Thinners',
    description:
      'V106 Thinners are designed for use with melamine wood coatings. Mathulac V106 Thinners provide excellent flow properties to the thinned paint during brushing or spray application. Their slow-drying properties provide uniform brushability while drying and help reduce runs and sags.',
    availableSizes: ['500 ml', '1 Ltr', '5 Ltr', '20 Ltr', '200 Ltr'],
    image: productAssetMap['v106-melamine-thinner'],
    color: '#00C8FF',
  },

  // ============================================================
  // 2. PRIMERS / AUTO PRIMERS / PUTTY
  // ============================================================
  {
    id: 'nc-putty',
    name: 'N.C Putty',
    categoryKey: 'primers-auto-putty',
    categoryName: 'Primers / Auto Primers / Putty',
    description:
      'Fast-drying NC-based high-solid filler designed to seal micro dents and provide better adhesion to surfaces. Highly suitable for industrial purposes.',
    availableSizes: ['1/2 kg', '1 kg', '7 kg', '35 kg'],
    image: productAssetMap['nc-putty'],
    color: '#FF7A00',
  },
  {
    id: 'og-putty',
    name: 'OG Putty',
    categoryKey: 'primers-auto-putty',
    categoryName: 'Primers / Auto Primers / Putty',
    description:
      'Alkyd resin-based high-solid putty with medium drying properties. It provides good compatibility with air-dry and industrial-stoving applications.',
    availableSizes: ['1/2 kg', '1 kg', '7 kg', '35 kg'],
    image: productAssetMap['og-putty'],
    color: '#FF7A00',
  },
  {
    id: 'qd-primer-brown',
    name: 'Q.D Primer Brown',
    categoryKey: 'primers-auto-putty',
    categoryName: 'Primers / Auto Primers / Putty',
    description:
      'Single-pack, modified alkyd-based, air-drying, solvent-based anti-corrosive primer containing synthetic red oxide and zinc chrome pigments.',
    availableSizes: ['100 ml', '200 ml', '500 ml', '1 Ltr', '4 Ltr', '20 Ltr'],
    image: productAssetMap['qd-primer-brown'],
    color: '#B45309',
  },

  // ============================================================
  // 3. ALUMINIUM PAINTS
  // ============================================================
  {
    id: 'nc-aluminium',
    name: 'N.C Aluminium',
    categoryKey: 'aluminium-paints',
    categoryName: 'Aluminium Paints',
    description:
      'Nitrocellulose-based top-coat aluminium paint for automotive and general industrial purposes. Provides a flat metallic finish.',
    availableSizes: ['100 ml', '200 ml', '500 ml', '1 Ltr', '4 Ltr', '20 Ltr'],
    image: productAssetMap['nc-aluminium'],
    color: '#94A3B8',
  },
  {
    id: 'aluminium-single-pack',
    name: 'Aluminium Single Pack',
    categoryKey: 'aluminium-paints',
    categoryName: 'Aluminium Paints',
    description:
      'Single-pack, corrosion-resistant metal coating with a very fast air-drying mechanism. A flat metallic finish is available.',
    availableSizes: ['100 ml', '200 ml', '500 ml', '1 Ltr', '4 Ltr', '20 Ltr'],
    image: productAssetMap['aluminium-single-pack'],
    color: '#CBD5E1',
  },

  // ============================================================
  // 4. WOOD COATINGS
  // ============================================================
  {
    id: 'wood-cement-primer',
    name: 'Wood / Cement Primer White / Pink',
    categoryKey: 'wood-coatings',
    categoryName: 'Wood Coatings',
    description:
      'A versatile single-pack, high-build, air-drying primer with good adhesion to wood and cement surfaces.',
    availableSizes: ['500 ml', '1 Ltr', '4 Ltr', '20 Ltr'],
    image: productAssetMap['wood-cement-primer'],
    color: '#B45309',
  },
  {
    id: 'nc-sanding-sealer',
    name: 'NC Sanding Sealer Special / Matt',
    categoryKey: 'wood-coatings',
    categoryName: 'Wood Coatings',
    description:
      'A fast-drying sanding sealer with excellent properties for use as a topcoat sealer. It is suitable for wooden furniture and is compatible with different shades of topcoat.',
    availableSizes: ['500 ml', '1 Ltr', '4 Ltr', '20 Ltr'],
    image: productAssetMap['nc-sanding-sealer'],
    color: '#D97706',
  },
  {
    id: 'nc-spl-tt-clear',
    name: 'NC SPL TT Clear',
    categoryKey: 'wood-coatings',
    categoryName: 'Wood Coatings',
    description:
      'A superior protective coating for wooden surfaces. Mathulac Table Top Clear can be applied by hand, brushing or spray. It is specially formulated to provide a long-lasting finish and retain the freshly painted appearance. It provides a mirror-like finish on the product.',
    availableSizes: ['500 ml', '1 Ltr', '4 Ltr', '20 Ltr'],
    image: productAssetMap['nc-spl-tt-clear'],
    color: '#92400E',
  },

  // ============================================================
  // 5. SYNTHETIC ENAMELS
  // ============================================================
  {
    id: 'aura-satin-enamel',
    name: 'Aura Satin Enamel',
    categoryKey: 'synthetic-enamels',
    categoryName: 'Synthetic Enamels',
    description:
      'Mathulac AURA Satin Enamel is a solvent-based, all-surface enamel that provides a finish similar to the soft, rich sheen of satin fabric. It offers excellent, long-lasting protection and strong antifungal resistance. It is tough and durable and provides a long-lasting, washable finish.',
    features: [
      'Stain Guard: Helps with easy removal of stains.',
      'Anti-Fungal: Resists fungal growth and prevents the appearance of black spots.',
      'Coverage: Covers approximately 25% more area than regular enamels, helping reduce application costs.',
    ],
    availableSizes: ['1 Ltr', '4 Ltr', '20 Ltr'],
    image: productAssetMap['aura-satin-enamel'],
    color: '#E6007E',
  },
  {
    id: 'syn-enamels',
    name: 'SYN Enamels',
    categoryKey: 'synthetic-enamels',
    categoryName: 'Synthetic Enamels',
    description:
      'Mathulac Synthetic Enamel is a solvent-based, all-surface enamel that gives surfaces a shiny new appearance. It forms a tough, highly washable and stain-resistant film that lasts for a long time.',
    features: [
      'Tough & Durable: Provides long-lasting protection.',
      'High Gloss: Offers a mirror-like gloss and is suitable for doors, windows, grills and gates.',
      'Highly Washable & Stain Resistant: Household stains can be wiped away easily.',
    ],
    availableSizes: ['200 ml', '500 ml', '1 Ltr', '4 Ltr', '20 Ltr'],
    image: productAssetMap['syn-enamels'],
    color: '#DB2777',
  },

  // ============================================================
  // 6. GENERAL PURPOSE ENAMELS
  // ============================================================
  {
    id: 'varna-gp-enamels',
    name: 'Varna GP Enamels',
    categoryKey: 'gp-enamels',
    categoryName: 'General Purpose Enamels',
    description: 'VARNA GP Enamel is a solvent-based, all-surface economical paint.',
    availableSizes: ['500 ml', '1 Ltr', '4 Ltr', '20 Ltr'],
    image: productAssetMap['varna-gp-enamels'],
    color: '#146BFF',
  },
  {
    id: 'black-chassis-grey',
    name: 'Black & Chassis Grey',
    categoryKey: 'gp-enamels',
    categoryName: 'General Purpose Enamels',
    description:
      'VARNA GP Enamel is a solvent-based, all-surface economical paint suitable for general-purpose applications.',
    availableSizes: ['500 ml', '1 Ltr', '4 Ltr', '20 Ltr'],
    image: productAssetMap['black-chassis-grey'],
    color: '#2563EB',
  },

  // ============================================================
  // 7. HAMMERTONE PAINTS
  // ============================================================
  {
    id: 'hammer-tone',
    name: 'Hammer Tone',
    categoryKey: 'hammertone-paints',
    categoryName: 'Hammertone Paints',
    description:
      'An easy-to-use, quick-drying and durable enamel featuring a distinctive hammered-metal patterned finish. It is ideal for light industrial applications. The hammered finish helps hide surface imperfections and is popular for trailers, tool boxes and other metal surfaces.',
    features: [
      'Easy to use',
      'Quick drying',
      'Fantastic gloss finish',
      'Superb coverage',
      'Durable for exterior and interior applications',
    ],
    availableSizes: ['100 ml', '200 ml', '500 ml', '1 Ltr', '4 Ltr', '20 Ltr'],
    image: productAssetMap['hammer-tone'],
    color: '#8B5CF6',
  },

  // ============================================================
  // 8. ACRYLIC / CEMENT BASE PUTTY
  // ============================================================
  {
    id: 'acrylic-wall-putty',
    name: 'Acrylic Wall Putty',
    categoryKey: 'acrylic-cement-putty',
    categoryName: 'Acrylic / Cement Base Putty',
    description:
      'Provides excellent alkali and acid resistance along with resistance to fungal attack. It has good penetration power on porous concrete and cement bases and high adhesion on properly treated surfaces. It also provides good workability and easy application.',
    availableSizes: ['1 kg', '2 kg', '5 kg', '10 kg', '20 kg'],
    image: productAssetMap['acrylic-wall-putty'],
    color: '#78716C',
  },
  {
    id: 'cement-base-wall-putty',
    name: 'Cement Base Wall Putty',
    categoryKey: 'acrylic-cement-putty',
    categoryName: 'Acrylic / Cement Base Putty',
    description: 'Under development.',
    availableSizes: ['Not specified'],
    image: productAssetMap['cement-base-wall-putty'],
    color: '#57534E',
  },

  // ============================================================
  // 9. INTERIOR / EXTERIOR PRIMERS
  // ============================================================
  {
    id: 'cement-primer-interior',
    name: 'Cement Primer Interior',
    categoryKey: 'interior-exterior-primers',
    categoryName: 'Interior / Exterior Primers',
    description:
      'Designed to provide beautiful, long-lasting results on interior surfaces. It helps secure the primer finish coat, even out uneven areas, seal porous surfaces and provide a smooth finish.',
    availableSizes: ['1 Ltr', '4 Ltr', '10 Ltr', '20 Ltr'],
    image: productAssetMap['cement-primer-interior'],
    color: '#10B981',
  },
  {
    id: 'weather-proof-exterior-primers',
    name: 'Weather Proof Exterior Primers',
    categoryKey: 'interior-exterior-primers',
    categoryName: 'Interior / Exterior Primers',
    description:
      'Designed to provide beautiful, long-lasting results for exterior surfaces. It helps prepare uneven areas and seal porous surfaces before applying the finish coat.',
    availableSizes: ['1 Ltr', '4 Ltr', '10 Ltr', '20 Ltr'],
    image: productAssetMap['weather-proof-exterior-primers'],
    color: '#059669',
  },

  // ============================================================
  // 10. TRENDY INTERIOR PRODUCTS
  // ============================================================
  {
    id: 'trendy-acrylic-distemper',
    name: 'Trendy Acrylic Distemper',
    categoryKey: 'trendy-interior-products',
    categoryName: 'Trendy Interior Products',
    description:
      'Mathulac Acrylic Distemper is supplied in paste form and can be used for decorating concrete, brickwork, plaster and asbestos surfaces. It provides easy application, good washability and a smooth matt finish. It is recommended for interior applications and can be applied to wall surfaces.',
    availableSizes: ['1 kg', '2 kg', '5 kg', '10 kg', '20 kg'],
    image: productAssetMap['trendy-acrylic-distemper'],
    color: '#EC4899',
  },
  {
    id: 'trendy-interior-emulsion',
    name: 'Trendy Interior Emulsion',
    categoryKey: 'trendy-interior-products',
    categoryName: 'Trendy Interior Products',
    description:
      'Mathulac TRENDY Interior Emulsion is an economical paint that provides good performance while protecting and decorating interior walls. It is formulated using co-polymer emulsion technology to provide a smooth and pleasing matt finish.',
    availableSizes: ['1 Ltr', '4 Ltr', '10 Ltr', '20 Ltr'],
    image: productAssetMap['trendy-interior-emulsion'],
    color: '#F472B6',
  },

  // ============================================================
  // 11. EXTERIOR EMULSION
  // ============================================================
  {
    id: 'apt-exterior-emulsion',
    name: 'APT Exterior Emulsion',
    categoryKey: 'exterior-emulsion',
    categoryName: 'Exterior Emulsion',
    description:
      'An extremely versatile exterior paint designed to enhance the appearance of your home while providing durability and protection against extreme climatic conditions. Being an acrylic co-polymer emulsion paint, it provides excellent durability, alkali resistance and good colour retention. Mathulac APT Exterior Emulsion is formulated to chalk gradually, becoming self-cleaning and helping maintain attractive exteriors over time.',
    availableSizes: ['1 Ltr', '4 Ltr', '10 Ltr', '20 Ltr'],
    image: productAssetMap['apt-exterior-emulsion'],
    color: '#06B6D4',
  },
  {
    id: 'optima-weather-proof-exterior-emulsion',
    name: 'Optima Weather Proof Exterior Emulsion',
    categoryKey: 'exterior-emulsion',
    categoryName: 'Exterior Emulsion',
    description:
      'An extremely versatile exterior paint designed to enhance the appearance of your home while providing durability and protection against extreme climatic conditions. Being an acrylic co-polymer emulsion paint, it provides excellent durability, alkali resistance and good colour retention. Mathulac OPTIMA Weather Proof Exterior Emulsion is formulated to chalk gradually, becoming self-cleaning and helping maintain attractive exteriors over time.',
    availableSizes: ['1 Ltr', '4 Ltr', '10 Ltr', '20 Ltr'],
    image: productAssetMap['optima-weather-proof-exterior-emulsion'],
    color: '#F59E0B',
  },
];

export const categories: ProductCategory[] = [
  {
    id: 'interior',
    name: 'Interior Paints',
    tagline: 'Walls that feel alive',
    description: 'Trendy Acrylic Distemper and Trendy Interior Emulsion for smooth, pleasing and washable matt finishes.',
    surface: 'Walls & Ceilings',
    gradient: 'from-pink-300 via-rose-200 to-violet-200',
    accent: '#EC4899',
    icon: Home,
    products: ['Trendy Interior Emulsion', 'Trendy Acrylic Distemper', 'Cement Primer Interior', 'Acrylic Wall Putty'],
  },
  {
    id: 'exterior',
    name: 'Exterior Paints',
    tagline: 'Built for the monsoon',
    description: 'APT Exterior Emulsion and Optima Weather Proof Exterior Emulsion with self-cleaning gradual chalking.',
    surface: 'Exterior Walls',
    gradient: 'from-cyan-400 via-sky-400 to-emerald-400',
    accent: '#06B6D4',
    icon: ShieldCheck,
    products: ['Optima Weather Proof Exterior Emulsion', 'APT Exterior Emulsion', 'Weather Proof Exterior Primers'],
  },
  {
    id: 'primers',
    name: 'Primers & Undercoats',
    tagline: 'The first coat of confidence',
    description: 'Q.D Primer Brown, N.C Putty, OG Putty and Cement Primers that build strong adhesion and seal porosity.',
    surface: 'All Surfaces',
    gradient: 'from-amber-300 via-orange-300 to-red-300',
    accent: '#FF7A00',
    icon: Layers,
    products: ['Q.D Primer Brown', 'N.C Putty', 'OG Putty', 'Cement Primer Interior'],
  },
  {
    id: 'wood',
    name: 'Wood Finishes',
    tagline: 'Bring wood to life',
    description: 'NC SPL Table Top Clear, NC Sanding Sealer, and Wood / Cement Primers for mirror wood finishes.',
    surface: 'Wood & Furniture',
    gradient: 'from-amber-500 via-yellow-700 to-amber-900',
    accent: '#B45309',
    icon: TreePine,
    products: ['NC SPL TT Clear', 'NC Sanding Sealer', 'Wood / Cement Primer', 'V106 Melamine Thinner'],
  },
  {
    id: 'enamels',
    name: 'Synthetic Enamels',
    tagline: 'Colour that endures',
    description: 'Aura Satin Enamel and SYN Enamels providing rich satin and high-gloss washable stain-resistant coats.',
    surface: 'Wood, Metal & Walls',
    gradient: 'from-fuchsia-500 via-rose-500 to-purple-600',
    accent: '#E6007E',
    icon: Droplet,
    products: ['Aura Satin Enamel', 'SYN Enamels', 'Varna GP Enamels', 'Hammer Tone'],
  },
  {
    id: 'thinners',
    name: 'Thinners & Solvents',
    tagline: 'The right flow for every coat',
    description: 'Special PU Thinner, PU Thinner, and V106 Melamine Thinner for flow, leveling and dust-free drying.',
    surface: 'Solvent System',
    gradient: 'from-indigo-300 via-blue-300 to-sky-300',
    accent: '#00C8FF',
    icon: FlaskConical,
    products: ['Special PU Thinner', 'PU Thinner', 'V106 Melamine Thinner'],
  },
];

export const surfaces: Surface[] = [
  {
    id: 'interior',
    name: 'Interior Walls',
    description: 'Beautiful finishes for spaces that feel like home.',
    accent: '#EC4899',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920',
  },
  {
    id: 'exterior',
    name: 'Exterior Facades',
    description: 'Durable protection built for changing weather.',
    accent: '#06B6D4',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1920',
  },
  {
    id: 'wood',
    name: 'Wood Coatings',
    description: 'Protection and finish that preserve natural beauty.',
    accent: '#D97706',
    image: 'https://images.pexels.com/photos/4705928/pexels-photo-4705928.jpeg?auto=compress&cs=tinysrgb&w=1920',
  },
  {
    id: 'steel',
    name: 'Structural Steel',
    description: 'Protective coatings engineered for demanding environments.',
    accent: '#60A5FA',
    image: 'https://images.pexels.com/photos/17977773/pexels-photo-17977773.jpeg?auto=compress&cs=tinysrgb&w=1920',
  },
  {
    id: 'automotive',
    name: 'Automotive Refinishing',
    description: 'Precision colour and finish for every curve.',
    accent: '#F51B24',
    image: 'https://images.pexels.com/photos/34042808/pexels-photo-34042808.jpeg?auto=compress&cs=tinysrgb&w=1920',
  },
];

export const featuredProducts: Product[] = [
  {
    id: 'trendy-interior-emulsion',
    name: 'Trendy Interior Emulsion',
    category: 'Interior',
    description: 'Co-polymer emulsion paint providing an economical, smooth and pleasing matt finish for interior walls.',
    benefits: ['Smooth Matt Finish', 'Washable', 'Stain Resistant'],
    finish: 'Pleasing Matt',
    surfaces: 'Interior walls & ceilings',
    color: '#EC4899',
    image: productAssetMap['trendy-interior-emulsion'],
  },
  {
    id: 'optima-weather-proof-exterior-emulsion',
    name: 'Optima Weather Proof Exterior Emulsion',
    category: 'Exterior',
    description: 'Acrylic co-polymer exterior paint formulated to chalk gradually, becoming self-cleaning for long-lasting beauty.',
    benefits: ['Self-Cleaning Action', 'Alkali Resistant', 'UV & Rain Defence'],
    finish: 'Weather Shield',
    surfaces: 'Exterior masonry',
    color: '#F59E0B',
    image: productAssetMap['optima-weather-proof-exterior-emulsion'],
  },
  {
    id: 'aura-satin-enamel',
    name: 'Aura Satin Enamel',
    category: 'Enamels',
    description: 'Solvent-based enamel providing the soft rich sheen of satin fabric with built-in Stain Guard and Anti-Fungal defense.',
    benefits: ['Stain Guard', 'Anti-Fungal', 'Covers 25% More Area'],
    finish: 'Rich Satin Sheen',
    surfaces: 'Wood, Metal & Masonry',
    color: '#E6007E',
    image: productAssetMap['aura-satin-enamel'],
  },
  {
    id: 'nc-spl-tt-clear',
    name: 'NC SPL Table Top Clear',
    category: 'Wood',
    description: 'Superior protective clear wood coating formulated to retain the freshly painted appearance with mirror-like finish.',
    benefits: ['Mirror Clarity', 'Table Top Protection', 'Scratch Resistant'],
    finish: 'Mirror Clear',
    surfaces: 'Furniture & Table Tops',
    color: '#B45309',
    image: productAssetMap['nc-spl-tt-clear'],
  },
  {
    id: 'special-pu-thinner',
    name: 'Special PU Thinner',
    category: 'Thinners',
    description: 'Specially formulated for PU top-coat finishes to provide excellent flow and minimize dust pick-up.',
    benefits: ['Excellent Flow', 'Reduces Runs & Sags', 'Dust Pick-up Minimizer'],
    finish: 'Crystal Clear',
    surfaces: 'PU Finishes & Clears',
    color: '#00C8FF',
    image: productAssetMap['special-pu-thinner'],
  },
  {
    id: 'hammer-tone',
    name: 'Hammer Tone',
    category: 'Hammertone',
    description: 'Distinctive hammered-metal pattern enamel that helps conceal surface flaws on trailers and metal equipment.',
    benefits: ['Hides Imperfections', 'Quick Drying', 'Fantastic Gloss'],
    finish: 'Hammered Pattern',
    surfaces: 'Trailers, Tool Boxes & Metal',
    color: '#8B5CF6',
    image: productAssetMap['hammer-tone'],
  },
];

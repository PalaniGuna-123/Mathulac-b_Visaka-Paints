import {
  Sparkles,
  Brush,
  Layers,
  Hammer,
  ShieldCheck,
  Home,
  CheckCircle2,
  CalendarCheck,
  Building2,
  Palette,
  Award,
  Wrench,
  Droplets,
  HardHat,
  Compass,
  FileCheck,
  Paintbrush,
  Sparkle,
  type LucideIcon,
} from 'lucide-react';
import type { Service } from '../types';

export interface TurnkeyChecklistItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  badge: string;
  color: string;
}

export interface DetailedService {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  color: string;
  category: 'residential' | 'commercial' | 'industrial' | 'specialized';
  deliverables: string[];
  recommendedFor: string;
  popularFinishes: string[];
  bannerImage: string;
}

export interface ServiceProcessStep {
  step: number;
  title: string;
  phase: string;
  description: string;
  details: string[];
  icon: LucideIcon;
  color: string;
}

export interface ProjectReferenceItem {
  id: string;
  title: string;
  category: 'Residential Villas' | 'Commercial & Corporate' | 'Apartments & Complexes' | 'Industrial Facilities' | 'Automotive & Wood Studio';
  categoryKey: 'residential' | 'commercial' | 'apartments' | 'industrial' | 'specialized';
  location: string;
  year: string;
  scope: string;
  systemUsed: string;
  area: string;
  description: string;
  image: string;
  highlights: string[];
}

export interface ServiceGuarantee {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

// ---------------------------------------------------------------------------
// 1. LEGACY TURNKEY REQUISITES & PROMISES (From mathulac.com/services.html)
// ---------------------------------------------------------------------------
export const turnkeyChecklist: TurnkeyChecklistItem[] = [
  {
    id: 'visit',
    title: 'Site Visit & Requirement Analysis',
    description: 'We will visit and understand customers requirements directly on site before proposing any system.',
    icon: Compass,
    badge: 'Step 01',
    color: '#E6007E',
  },
  {
    id: 'guidance',
    title: 'Guidance on Suitable Paints',
    description: 'Guide suitable paints for customers home, office, villas, or apartment based on surface, exposure, and budget.',
    icon: Home,
    badge: 'Step 02',
    color: '#FF7A00',
  },
  {
    id: 'visualizer',
    title: 'Mathulac Color Visualizer Assistance',
    description: 'Help customer in making the right choice of colors using our digital Mathulac Color Visualizer tool.',
    icon: Palette,
    badge: 'Step 03',
    color: '#FFD400',
  },
  {
    id: 'design',
    title: 'Custom Design & Texture Assistance',
    description: 'Assist in choosing the best design, sheen, and specialized coating system to suit customer needs.',
    icon: Brush,
    badge: 'Step 04',
    color: '#67D600',
  },
  {
    id: 'monitoring',
    title: 'Daily Monitoring by Experienced People',
    description: 'Daily monitoring of work process by experienced technical supervisors to maintain ISO 9001 standards.',
    icon: ShieldCheck,
    badge: 'Step 05',
    color: '#00C8FF',
  },
  {
    id: 'schedule',
    title: 'Work Progress as per Schedule',
    description: 'Monitoring work progress as per strict schedule ensuring zero project delays and transparent milestone handovers.',
    icon: CalendarCheck,
    badge: 'Step 06',
    color: '#7B2CFF',
  },
];

export const legacyTurnkeyCopy = {
  headerBadge: 'Visaka Paints & Chemicals India — An ISO 9001 Certified Company',
  mainHeading: 'Our Services',
  tagline: 'Quality Product From VISAKA PAINT • Exceeds Expectation',
  infrastructureText:
    'We have all the technology and infrastructure to carry out the painting of the building in an organized and uninterrupted manner. Our capable painters are all verified and insured and they also possess complete mastery over all our latest equipment.',
  makeoverText:
    'We give your new/old building a wonderful make-over. We make it sparkling new and transform it into a beautiful landmark in your area.',
  projectReferenceIntro:
    'By monitoring our growth increasingly and rooting on the appearance and approval of knowledge-based market in the region, we strive to understand the varied needs of the respective cities and their unique customs through our established marketing network, commitment to service and product excellence. We will continue with creating a value and lasting impressions for our valued clients.',
};

// ---------------------------------------------------------------------------
// 2. CORE COMPACT SERVICES (Existing compatibility)
// ---------------------------------------------------------------------------
export const services: Service[] = [
  {
    id: 'color',
    title: 'Color Consultation & Visualizer',
    description: 'Expert guidance to choose shades, finishes and palettes using Mathulac Color Visualizer to match your lighting and aesthetic.',
    icon: Sparkles,
    color: '#E6007E',
  },
  {
    id: 'surface',
    title: 'Surface Preparation & Moisture Testing',
    description: 'Proper digital moisture testing, crack filling, sanding, and priming so your finish lasts for years, not months.',
    icon: Brush,
    color: '#FF7A00',
  },
  {
    id: 'selection',
    title: 'Product Selection & System Guidance',
    description: 'We help you pick the right primer, putty and topcoat system for interior, exterior, wood, metal, or automotive surfaces.',
    icon: Layers,
    color: '#FFD400',
  },
  {
    id: 'application',
    title: 'Professional Master Application',
    description: 'Experienced, verified and insured painters who deliver clean, uniform, beautiful results with zero mess.',
    icon: Hammer,
    color: '#67D600',
  },
  {
    id: 'monitoring',
    title: 'Daily Technical Project Monitoring',
    description: 'Daily supervisor checks at every stage ensure film thickness, adhesion, and timeline milestones never slip.',
    icon: ShieldCheck,
    color: '#00C8FF',
  },
  {
    id: 'turnkey',
    title: 'End-to-End Turnkey Painting Solutions',
    description: 'From understanding customer requirements to the final coat — one accountable partner, transforming buildings into landmarks.',
    icon: Home,
    color: '#7B2CFF',
  },
];

// ---------------------------------------------------------------------------
// 3. DETAILED SPECIALIZED SERVICES
// ---------------------------------------------------------------------------
export const detailedServices: DetailedService[] = [
  {
    id: 'residential-turnkey',
    title: 'Residential & Luxury Villa Painting',
    tagline: 'Transforming homes into sparkling architectural landmarks',
    description:
      'Complete interior and exterior painting solutions tailored for luxury villas, independent bungalows, and contemporary apartments. Combining scrub-resistant emulsions with weather-shield exterior coatings.',
    icon: Home,
    color: '#E6007E',
    category: 'residential',
    deliverables: [
      'Site moisture analysis & thermal mapping',
      'Mathulac Color Visualizer 3D preview',
      'Complete furniture masking & floor protection',
      '3-coat premium interior emulsion application',
      'Weather-resistant anti-fungal exterior system',
      'Deep cleanup and final supervisor audit',
    ],
    recommendedFor: 'Independent Villas, Duplexes, Row Houses, High-end Apartments',
    popularFinishes: ['Luxury Silk Sheen', 'Velvet Matte', 'Stucco Texture', 'Weather Guard Gloss'],
    bannerImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'commercial-corporate',
    title: 'Commercial & Office Facility Makeovers',
    tagline: 'High-speed, uninterrupted corporate coatings',
    description:
      'Engineered for corporate headquarters, retail showrooms, hospitals, and educational institutions. We operate flexible shifts to ensure zero operational downtime for your business.',
    icon: Building2,
    color: '#00C8FF',
    category: 'commercial',
    deliverables: [
      'Night-shift & weekend painting schedules',
      'Low-VOC, odorless paints for active workspaces',
      'High-traffic scuff-resistant wall coatings',
      'Accent brand wall styling & custom hues',
      'Fire-retardant & antibacterial coatings for clinics',
      'Timetable tracking with daily progress updates',
    ],
    recommendedFor: 'IT Parks, Corporate Offices, Retail Chains, Hospitals, Hotels',
    popularFinishes: ['Anti-Bacterial Matte', 'Low-VOC Satin', 'Epoxy High-Durability', 'Metallic Accents'],
    bannerImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'wood-lacquering',
    title: 'Architectural Wood Finishing & PU Lacquer',
    tagline: 'Elevating natural wood grains into timeless artistry',
    description:
      'Master finishing for teak doors, veneers, modular kitchens, wooden ceilings, and bespoke furniture using high-solids PU, melamine, and NC clear coats.',
    icon: Brush,
    color: '#FF7A00',
    category: 'specialized',
    deliverables: [
      'Timber grain filling & specialized sealer coat',
      'Non-yellowing Polyurethane (PU) 2K finishes',
      'Italian-style high gloss & open-pore matte',
      'Weather-proof exterior wood stainer & deck oil',
      'Anti-termite & anti-fungal barrier coats',
    ],
    recommendedFor: 'Main entrance doors, veneer panelling, kitchen cabinetry, heritage furniture',
    popularFinishes: ['High-Gloss PU 2K', 'Open-Pore Natural Matte', 'Melamine Clear', 'Walnut Wood Stains'],
    bannerImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'automotive-refinishing',
    title: 'Automotive & Industrial Refinishing',
    tagline: 'Showroom gloss and extreme chemical resistance',
    description:
      'Visaka Mathulac is legendary for high-performance 2K automotive coatings, chassis paints, quick-drying primers, and rapid scratch-repair systems.',
    icon: Wrench,
    color: '#7B2CFF',
    category: 'industrial',
    deliverables: [
      'High-solids 2K acrylic polyurethane topcoats',
      'Zinc-phosphate anti-rust priming system',
      'Dust-free spray booth application mastery',
      'Precision color matching for fleet vehicles',
      'High-gloss scratch-resistant clear coat',
    ],
    recommendedFor: 'Automotive workshops, commercial fleets, OEM machinery, specialized fabricated metal',
    popularFinishes: ['2K Mirror Gloss', 'Satin Black Chassis', 'High-Build Epoxy Primer', 'Metallic Pearl'],
    bannerImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'waterproofing-defense',
    title: 'Waterproofing & Moisture Defense',
    tagline: 'Permanent protection against seepage, dampness, and efflorescence',
    description:
      'Comprehensive scientific waterproofing for roofs, terraces, bathrooms, exterior parapets, and basements. Eliminate bubbling and peeling at the root cause.',
    icon: Droplets,
    color: '#67D600',
    category: 'specialized',
    deliverables: [
      'Digital pinless moisture diagnostic scanning',
      'Elastomeric crack-bridging membrane application',
      'Crystalline damp-proof base coat treatment',
      'UV-reflective solar cooling terrace barrier',
      '10-year waterproofing warranty certificate',
    ],
    recommendedFor: 'Terraces, exterior walls with wind-driven rain, sunken slabs, basements',
    popularFinishes: ['Elastomeric White Roof Coat', 'Damp-Proof Primer', 'Efflorescence Sealant'],
    bannerImage: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'color-visualizer-studio',
    title: 'Mathulac Color Visualizer & Shade Styling',
    tagline: 'See your colors on your actual walls before painting starts',
    description:
      'Take the guesswork out of color selection. Our colour consultants create realistic digital mockups and lighting simulations with over 78 curated Mathulac shades.',
    icon: Palette,
    color: '#FFD400',
    category: 'residential',
    deliverables: [
      'Digital 3D color mockups on client photos',
      'Daylight vs warm artificial light simulations',
      'Harmonious 60-30-10 palette formulation',
      'Full-size shade sampling swatch boards on site',
      'Color psychology tailored to room functions',
    ],
    recommendedFor: 'New construction planning, full house renovations, designer projects',
    popularFinishes: ['78 Curated Mathulac Heritage Shades', 'Monochrome & Triad Palettes'],
    bannerImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'industrial-anti-corrosion',
    title: 'Industrial & Heavy-Duty Protective Systems',
    tagline: 'ISO 9001 certified coating systems for harsh factory environments',
    description:
      'Specialized coatings for steel structures, chemical storage vessels, factory floors, pipelines, and warehouses requiring resistance to fumes, abrasion, and oil.',
    icon: HardHat,
    color: '#F51B24',
    category: 'industrial',
    deliverables: [
      'Surface grit blasting & chemical degreasing',
      'Heavy-duty solvent-free epoxy floor screeds',
      'Polyurethane UV-resistant external tank coatings',
      'Chlorinated rubber chemical-resistant liners',
      'DFT (Dry Film Thickness) gauge certified reports',
    ],
    recommendedFor: 'Textile mills, engineering factories, food processing units, warehouses',
    popularFinishes: ['High-Gloss Epoxy Flooring', 'Anti-Corrosive Red Oxide', 'Chemical Resistant PU'],
    bannerImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'decorative-textures',
    title: 'Designer Textures & Heritage Stucco Finishes',
    tagline: 'Artisanal feature walls that capture attention and create luxury',
    description:
      'Handcrafted Italian lime plaster, rustic sandstone textures, metallic swirls, and concrete effects created by master artisans for statement living rooms and foyers.',
    icon: Sparkle,
    color: '#E6007E',
    category: 'residential',
    deliverables: [
      'Custom trowel, spatula, and comb patterns',
      'Metallic gold, bronze, and copper glaze washes',
      'Breathable mineral-based lime plasters',
      'Durable washable protective clear glaze coat',
      'Seamless application on feature walls and niches',
    ],
    recommendedFor: 'TV accent walls, reception lobbies, luxury bedroom backdrops, dining focal points',
    popularFinishes: ['Rustic Travertine', 'Italian Stucco Polished Plaster', 'Metallic Dune', 'Exposed Concrete'],
    bannerImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
  },
];

// ---------------------------------------------------------------------------
// 4. STEP-BY-STEP SERVICE EXECUTION JOURNEY
// ---------------------------------------------------------------------------
export const serviceProcessSteps: ServiceProcessStep[] = [
  {
    step: 1,
    title: 'Free Site Visit & Assessment',
    phase: 'Discovery',
    description: 'Our senior technical consultant visits your site with moisture meters and diagnostic equipment to understand your requirements.',
    details: [
      'Scientific surface moisture testing',
      'Substrate stability and crack inspection',
      'Detailed measurement of carpet and wall areas',
      'Understanding client aesthetic and timeline goals',
    ],
    icon: Compass,
    color: '#E6007E',
  },
  {
    step: 2,
    title: 'Color Visualizer & Scheme Selection',
    phase: 'Design',
    description: 'We generate digital color visualizer mockups of your building so you can see shades, finishes, and combinations before opening a can.',
    details: [
      'Interactive Mathulac Color Visualizer previews',
      'Lighting adjustment tests (warm/cool/daylight)',
      'Complimentary on-site shade swatches',
      'Design advice for textures and focal walls',
    ],
    icon: Palette,
    color: '#FF7A00',
  },
  {
    step: 3,
    title: 'Transparent Estimation & Scheduling',
    phase: 'Planning',
    description: 'Receive an itemized, clear proposal detailing paint quantities, primers, labor costs, and a day-by-day project schedule.',
    details: [
      '100% transparent pricing — zero hidden charges',
      'Guaranteed schedule with agreed completion date',
      'Material batch assurance directly from Visaka factory',
      'Detailed scope document signed by both parties',
    ],
    icon: FileCheck,
    color: '#FFD400',
  },
  {
    step: 4,
    title: 'Masking & Surface Preparation',
    phase: 'Preparation',
    description: 'We protect your furniture, floors, switches, and windows with premium drop sheets and masking tape before prepping surfaces.',
    details: [
      'Comprehensive floor and furniture protective wrapping',
      'Plaster peeling, wire brushing, and deep sanding',
      'Anti-fungal wash and structural crack filling',
      'High-adhesion Mathulac deep penetrating primer',
    ],
    icon: Brush,
    color: '#67D600',
  },
  {
    step: 5,
    title: 'Master Application by Verified Painters',
    phase: 'Execution',
    description: 'Our verified, insured, and certified master painters execute uniform coats using professional rollers, airless sprayers, and brushes.',
    details: [
      'Application by verified, insured, and vetted painters',
      'Strict adherence to recoat drying intervals',
      'Laser-straight edge cut-ins and seamless corners',
      'Use of modern mechanized equipment for superior finish',
    ],
    icon: Paintbrush,
    color: '#00C8FF',
  },
  {
    step: 6,
    title: 'Daily Monitoring & Quality Audits',
    phase: 'Supervision',
    description: 'Dedicated site supervisors conduct daily inspections on film thickness, opacity, and progress against the agreed schedule.',
    details: [
      'Daily work progress updates sent to customer',
      'Dry Film Thickness (DFT) verification',
      'Adhesion and smooth touch inspection',
      'Immediate resolution of any client suggestions',
    ],
    icon: ShieldCheck,
    color: '#7B2CFF',
  },
  {
    step: 7,
    title: 'Site Deep Clean & Handover with Warranty',
    phase: 'Handover',
    description: 'We perform complete cleanup, remove all masking, leave your space sparkling clean, and hand over the official warranty.',
    details: [
      'Complete removal of masking and paint debris',
      'Detailed joint walkthrough with client',
      'Touch-up kit provided for future maintenance',
      'Official Visaka Mathulac warranty certificate issued',
    ],
    icon: Award,
    color: '#E6007E',
  },
];

// ---------------------------------------------------------------------------
// 5. PROJECT REFERENCES (From mathulac.com/services.html - Click to View our Project)
// ---------------------------------------------------------------------------
export const projectReferences: ProjectReferenceItem[] = [
  {
    id: 'proj-1',
    title: 'Ananya Palm Grove Luxury Villa',
    category: 'Residential Villas',
    categoryKey: 'residential',
    location: 'Coimbatore, Tamil Nadu',
    year: '2023',
    scope: 'Full Interior & Exterior Turnkey Painting + PU Woodwork',
    systemUsed: 'Mathulac WeatherShield Exterior + Velvet Emulsion + 2K PU Wood Finish',
    area: '6,400 sq. ft',
    description:
      'Complete makeover of a contemporary 5-bedroom luxury villa. Required custom Italian stucco accent walls, moisture sealing, and rich satin PU coating on solid teak doors.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80',
    highlights: ['Zero-mess execution in 14 days', 'Custom visualizer-approved palette', '100% moisture sealed'],
  },
  {
    id: 'proj-2',
    title: 'Nexus Tech Park Corporate Campus',
    category: 'Commercial & Corporate',
    categoryKey: 'commercial',
    location: 'Avinashi Road, Coimbatore',
    year: '2024',
    scope: 'Commercial Repainting & Low-VOC Interior Upgrade',
    systemUsed: 'Mathulac EcoPure Low-VOC Emulsion + Scuff-Resistant Satin',
    area: '48,000 sq. ft',
    description:
      'Night-shift phased execution across 4 office floors without interrupting 800+ employees. Anti-microbial coatings applied in cafeterias and boardrooms.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
    highlights: ['Zero business disruption', 'Eco-safe air quality verified', 'Delivered 3 days ahead of schedule'],
  },
  {
    id: 'proj-3',
    title: 'Green Valley Enclave Towers',
    category: 'Apartments & Complexes',
    categoryKey: 'apartments',
    location: 'Saravanampatti, Coimbatore',
    year: '2023',
    scope: 'Complete Exterior Facade Restoration & Water Barrier',
    systemUsed: 'Mathulac Heavy-Duty Anti-Fungal Exterior Shield + Crack Bridging Base',
    area: '120,000 sq. ft',
    description:
      'Transformed an 8-year-old weathering residential apartment complex into a vibrant, sparkling landmark with extreme UV and monsoon resistance.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
    highlights: ['Transformed into regional landmark', '10-year exterior warranty', '100% verified & insured crew'],
  },
  {
    id: 'proj-4',
    title: 'Texmaco Precision Engineering Works',
    category: 'Industrial Facilities',
    categoryKey: 'industrial',
    location: 'Pollachi Industrial Estate',
    year: '2023',
    scope: 'Epoxy High-Traffic Flooring & Steel Anti-Corrosive System',
    systemUsed: 'Mathulac Industrial Epoxy Screed 2mm + Polyurethane Topcoat',
    area: '28,000 sq. ft',
    description:
      'Heavy-duty chemical and forklift abrasion-resistant floor coating combined with zinc-phosphate anti-rust priming for overhead gantry cranes.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
    highlights: ['ISO 9001 certified coating system', 'High chemical & oil resistance', 'Forklift traffic ready in 72 hrs'],
  },
  {
    id: 'proj-5',
    title: 'Apex Motosports Finishing Studio',
    category: 'Automotive & Wood Studio',
    categoryKey: 'specialized',
    location: 'Trichy Road, Coimbatore',
    year: '2024',
    scope: '2K Automotive Refinishing Line & Wood Panelling',
    systemUsed: 'Mathulac 2K Acrylic Auto Finish + Fast-Dry Polyurethane',
    area: '12,500 sq. ft',
    description:
      'Full setup of custom automotive refinishing bays paired with bespoke teak veneer lounge lacquering for a premier automotive detailing studio.',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80',
    highlights: ['Showroom 2K mirror finish', 'Scratch-resistant clear coat', 'Bespoke custom stain formulation'],
  },
  {
    id: 'proj-6',
    title: 'Heritage Chettinad Courtyard Residence',
    category: 'Residential Villas',
    categoryKey: 'residential',
    location: 'Karaikudi / Coimbatore',
    year: '2022',
    scope: 'Heritage Lime Texture Restoration & Deep Wood Preservation',
    systemUsed: 'Mathulac Artisanal Mineral Plaster + Deep Penetrating Wood Stain',
    area: '8,200 sq. ft',
    description:
      'Meticulous restoration of 60-year-old carved wooden pillars and textured lime walls preserving antique character with modern weathering durability.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
    highlights: ['Traditional artisanal technique', 'Deep grain preservation', 'Voted Architectural Revival 2022'],
  },
];

// ---------------------------------------------------------------------------
// 6. SERVICE GUARANTEES & TRUST PILLARS
// ---------------------------------------------------------------------------
export const serviceGuarantees: ServiceGuarantee[] = [
  {
    title: 'ISO 9001 Certified Processes',
    description: 'Every phase follows strict standardized quality benchmarks, from substrate testing to final coat thickness verification.',
    icon: Award,
    color: '#E6007E',
  },
  {
    title: '100% Verified & Insured Painters',
    description: 'Our painters are background-verified, insured, trained in safety protocols, and hold complete mastery over modern equipment.',
    icon: ShieldCheck,
    color: '#00C8FF',
  },
  {
    title: 'Strict On-Time Schedule Guarantee',
    description: 'We commit to a clear day-by-day calendar with daily supervisor check-ins to ensure handover happens on the promised date.',
    icon: CalendarCheck,
    color: '#FF7A00',
  },
  {
    title: 'Zero-Mess Furniture & Floor Protection',
    description: 'Complete heavy-duty drop sheeting and masking for floors, electricals, and furniture ensures your home stays spotless.',
    icon: Sparkles,
    color: '#67D600',
  },
  {
    title: 'Direct Factory Batches (No Dilution)',
    description: 'Paints come fresh from the Visaka factory with seal authenticity — never diluted with excessive thinner or adulterants.',
    icon: CheckCircle2,
    color: '#7B2CFF',
  },
  {
    title: 'Dedicated Daily Site Supervisor',
    description: 'You get a single accountable point of contact who monitors daily progress, conducts inspections, and provides WhatsApp updates.',
    icon: HardHat,
    color: '#FFD400',
  },
];

// ---------------------------------------------------------------------------
// 7. INTERACTIVE SCOPE ESTIMATOR PRESETS
// ---------------------------------------------------------------------------
export interface PropertyPreset {
  id: string;
  name: string;
  defaultArea: number;
  baseDays: number;
  icon: LucideIcon;
  system: string;
  description: string;
}

export const propertyPresets: PropertyPreset[] = [
  {
    id: 'independent-villa',
    name: 'Luxury Independent Villa',
    defaultArea: 4000,
    baseDays: 12,
    icon: Home,
    system: 'Mathulac Velvet Emulsion + WeatherShield Exterior + PU Woodwork',
    description: 'Interior rooms, exterior facades, terrace waterproofing & wood finishes',
  },
  {
    id: 'apartment',
    name: 'Modern Apartment (2BHK / 3BHK)',
    defaultArea: 1600,
    baseDays: 6,
    icon: Building2,
    system: 'Mathulac Silk Sheen Interior + Anti-Bacterial Kitchen & Bath',
    description: 'Living room, bedrooms, kitchen ceiling, and door trims with zero mess',
  },
  {
    id: 'commercial-office',
    name: 'Commercial Office / Showroom',
    defaultArea: 5000,
    baseDays: 8,
    icon: Building2,
    system: 'Mathulac EcoPure Low-VOC Scuff Resistant System',
    description: 'Fast-track night & weekend application for corporate workspaces',
  },
  {
    id: 'exterior-makeover',
    name: 'Old Building Exterior Makeover',
    defaultArea: 8000,
    baseDays: 15,
    icon: Brush,
    system: 'Mathulac Heavy-Duty Anti-Fungal WeatherShield + Crack Bridging',
    description: 'Restoring weathered facades into sparkling, landmark appearances',
  },
  {
    id: 'industrial-plant',
    name: 'Industrial / Factory Facility',
    defaultArea: 15000,
    baseDays: 18,
    icon: HardHat,
    system: 'Mathulac Industrial Epoxy Flooring + Anti-Corrosive Red Oxide Steel',
    description: 'Chemical resistant, heavy abrasion forklift flooring and structural coatings',
  },
];

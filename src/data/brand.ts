import { ShieldCheck, Award, Sparkles, Clock } from 'lucide-react';
import type { BrandInfo, CompanyFact, TrustPillar, TimelineItem } from '../types';

export const brand: BrandInfo = {
  company: 'Visaka Paints & Chemicals India',
  brand: 'Mathulac',
  website: 'Mathulac Paints',
  tagline: 'Colour that transforms spaces.',
  established: 2004,
};

export const cinematicHero = {
  eyebrow: 'Muthulac Paints',
  headline: 'Colour That Shapes',
  headlineAccent: 'Every Possibility.',
  supportingText: 'Premium coatings crafted to bring character, protection, and lasting beauty to every surface.',
  cta: 'Explore Our Colours',
  scrollCue: 'Scroll to set colour in motion',
  chapter: '01',
  chapterLabel: 'Stroke ready',
  edition: 'Premium finish',
  storyLabel: 'Product story / Scroll controlled',
  finalEyebrow: 'Muthulac Premium Finish',
  finalHeadline: 'Transform Every Surface Into Something Exceptional.',
  finalSupporting: 'Premium colours, reliable protection, and refined finishes designed to elevate homes, buildings, and architectural spaces.',
  finalPrimaryCta: 'Explore Colours',
  finalSecondaryCta: 'Discover Products',
  colourLabels: ['Ocean Depth', 'Golden Dawn', 'Coral Warmth'],
} as const;

export const homepageVisualizer = {
  eyebrow: 'Visaka Architectural Visualizer',
  headline: 'See Your Space in a',
  headlineAccent: 'New Colour.',
  description:
    'Explore thousands of VISAKA shades and experience how they transform your walls, facades, wood, and automotive surfaces in real time.',
  primaryCta: 'Start Visualizing',
  secondaryCta: 'Explore Shade Library',
  chapter: '02',
  shades: [
    { name: 'Neutral White', code: 'MW 002', hex: '#eee9e1' },
    { name: 'Warm Beige', code: 'MB 101', hex: '#cdb99f' },
    { name: 'Mathulac Blue', code: 'VB 122', hex: '#315a9b' },
  ],
} as const;

export const phoneNumbers: string[] = ['+91 93631 14313', '+91 96009 09056', '+91 96009 09077'];

export const companyContact = {
  companyName: 'VISAKA PAINTS & CHEMICALS INDIA',
  certification: 'An ISO 9001 Certified Company',
  brandName: 'MATHULAC PAINT',
  locationName: 'MATHULAC PAINT kariampalayam',
  addressLines: [
    'S.F.No.127/2A2, Kariampalayam,',
    'Ellapalayam ( P.O.) Pogalur (Via),',
    'Coimbatore - 641 697. TamilNadu, INDIA',
  ],
  fullAddress: 'S.F.No.127/2A2, Kariampalayam, Ellapalayam (P.O.) Pogalur (Via), Coimbatore - 641 697. TamilNadu, INDIA',
  shortAddress: 'Kariampalayam, Pogalur Via, Coimbatore, Tamil Nadu 641697',
  phones: ['+91 93631 14313', '+91 96009 09056', '+91 96009 09077'],
  emails: ['visaka_cbe@yahoo.co.in', 'mathulac.cbe@gmail.com'],
  website: 'www.mathulac.com',
  workingHours: 'Mon – Sat: 9:00 AM – 6:00 PM (Sunday Closed)',
  rating: {
    score: 4.1,
    reviews: 26,
  },
  googleMapsEmbedUrl: 'https://maps.google.com/maps?q=MATHULAC%20PAINT%20kariampalayam%20Coimbatore&t=&z=15&ie=UTF8&iwloc=&output=embed',
  googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=MATHULAC+PAINT+kariampalayam+Coimbatore+641697',
  googleMapsSearchUrl: 'https://www.google.com/maps/search/?api=1&query=MATHULAC+PAINT+kariampalayam+Coimbatore+641697',
};

export const companyFacts: CompanyFact[] = [
  { label: 'Established', value: '2004' },
  { label: 'Headquarters', value: 'Coimbatore, India' },
  { label: 'Product Range', value: '10+ Categories' },
  { label: 'Shade Library', value: '1,000+ Colors' },
];

export const trustPillars: TrustPillar[] = [
  {
    label: '20+ Years of Quality',
    description: 'Two decades of paint innovation and trusted performance across South India.',
    icon: Award,
    color: '#E6007E',
  },
  {
    label: 'Weather Resilient',
    description: 'Formulated to withstand high UV, heavy monsoon rains, and coastal humidity.',
    icon: ShieldCheck,
    color: '#00C8FF',
  },
  {
    label: 'Eco-Conscious Formula',
    description: 'Low-VOC emulsions and lead-free recipes that are safe for your family and pets.',
    icon: Sparkles,
    color: '#67D600',
  },
  {
    label: 'Long-Lasting Sheen',
    description: 'Advanced acrylic polymer bonds that keep walls vivid year after year.',
    icon: Clock,
    color: '#FFD400',
  },
];

export const timeline: TimelineItem[] = [
  {
    year: '2004',
    title: 'Inception in Coimbatore',
    description: 'Visaka Paints & Chemicals was founded with a vision to deliver premium quality decorative and industrial coatings.',
  },
  {
    year: '2009',
    title: 'Mathulac Brand Launch',
    description: 'Expanded retail operations with the signature Mathulac consumer line of emulsions, enamels, and wood finishes.',
  },
  {
    year: '2015',
    title: 'Automotive & Industrial Surge',
    description: 'Engineered specialized rapid-dry automotive putties, primers, and clearcoats for auto workshops.',
  },
  {
    year: '2020',
    title: 'Next-Gen Weather Shield',
    description: 'Launched high-durability exterior wall systems with elastomeric crack-bridging technology.',
  },
  {
    year: 'Today',
    title: 'Transforming Spaces Across India',
    description: 'Over 1,000+ shades across 8 specialized surface categories, trusted by architects, painters, and homeowners.',
  },
];

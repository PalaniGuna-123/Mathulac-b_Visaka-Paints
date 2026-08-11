import { ShieldCheck, Award, Sparkles, Clock } from 'lucide-react';
import type { BrandInfo, CompanyFact, TrustPillar, TimelineItem } from '../types';

export const brand: BrandInfo = {
  company: 'Visaka Paints & Chemicals India',
  brand: 'Mathulac',
  website: 'Mathulac Paints',
  tagline: 'Colour that transforms spaces.',
  established: 2004,
};

export const phoneNumbers: string[] = ['+91 93631 14343', '+91 96009 09066'];

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

import { Sparkles, Brush, Layers, Hammer, ShieldCheck, Home } from 'lucide-react';
import type { Service } from '../types';

export const services: Service[] = [
  {
    id: 'color',
    title: 'Color Consultation',
    description: 'Expert guidance to choose shades, finishes and palettes that suit your space, light, and aesthetic goals.',
    icon: Sparkles,
    color: '#E6007E',
  },
  {
    id: 'surface',
    title: 'Surface Preparation',
    description: 'Proper cleaning, filling and priming so your finish lasts for years, not months.',
    icon: Brush,
    color: '#FF7A00',
  },
  {
    id: 'selection',
    title: 'Product Selection',
    description: 'We help you pick the right primer, putty and topcoat system for interior, exterior, wood, or metal.',
    icon: Layers,
    color: '#FFD400',
  },
  {
    id: 'application',
    title: 'Professional Application',
    description: 'Experienced, verified painters who deliver clean, even, beautiful results with zero mess.',
    icon: Hammer,
    color: '#67D600',
  },
  {
    id: 'monitoring',
    title: 'Project Monitoring',
    description: 'We monitor progress at every stage so quality never slips and timelines stay honest.',
    icon: ShieldCheck,
    color: '#00C8FF',
  },
  {
    id: 'turnkey',
    title: 'Turnkey Painting Solutions',
    description: 'From understanding your requirement to the final coat — one partner, end to end.',
    icon: Home,
    color: '#7B2CFF',
  },
];

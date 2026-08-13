import type { LucideIcon } from 'lucide-react';

export type BrandInfo = {
  company: string;
  brand: string;
  website: string;
  tagline: string;
  established: number;
};

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

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
};

export type Surface = {
  id: string;
  name: string;
  accent: string;
  image: string;
};

export type CompanyFact = {
  label: string;
  value: string;
};

export type TrustPillar = {
  label: string;
  description: string;
  icon: LucideIcon;
  color: string;
};

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

export type HeroSlide = {
  id: string;
  category: string;
  tagline: string;
  headline: string;
  statement: string;
  description?: string;
  title?: string;
  subtitle?: string;
  accent: string;
  bg?: string;
  image: string;
  tag?: string;
};

export type PaintShade = {
  id: string;
  name: string;
  hex: string;
  family: string;
  mood?: string;
  space?: string;
  code: string;
  finish: string;
  description: string;
  collection?: string;
  recommendedRooms?: string[];
};

export type RoomScene = {
  id: string;
  name: string;
  image: string;
  mask: string;
  original: string;
};

export type NavItem = {
  id: string;
  label: string;
  path: string;
  anchor?: string;
};

export type Product = {
  id: string;
  name: string;
  category: 'Interior' | 'Exterior' | 'Wood' | 'Metal' | 'Decorative' | 'Automotive' | string;
  description: string;
  benefits: string[];
  finish: string;
  surfaces: string;
  color: string;
  image: string;
};

export type MathulacProductItem = {
  id: string;
  name: string;
  categoryKey: string;
  categoryName: string;
  description: string;
  features?: string[];
  availableSizes: string[];
  image: string;
  color?: string;
  tagline?: string;
};


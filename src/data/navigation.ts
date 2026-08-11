import type { NavItem } from '../types';

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home', path: '/', anchor: 'top' },
  { id: 'spaces', label: 'Spaces', path: '/studio', anchor: 'studio' },
  { id: 'products', label: 'Products', path: '/products', anchor: 'products' },
  { id: 'wood', label: 'Wood', path: '/wood', anchor: 'wood' },
  { id: 'auto', label: 'Auto', path: '/auto', anchor: 'auto' },
  { id: 'decor', label: 'Decor', path: '/decor', anchor: 'decor' },
  { id: 'palette', label: 'Colours', path: '/colours', anchor: 'palette' },
  { id: 'about', label: 'About', path: '/about', anchor: 'about' },
  { id: 'contact', label: 'Contact', path: '/contact', anchor: 'contact' },
];

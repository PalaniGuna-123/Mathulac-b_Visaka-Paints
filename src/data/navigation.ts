import type { NavItem } from '../types';

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home', path: '/', anchor: 'top' },
  { id: 'about', label: 'About', path: '/about' },
  { id: 'services', label: 'Services', path: '/services' },
  { id: 'products', label: 'Products', path: '/products', anchor: 'products' },
  { id: 'specifications', label: 'Specifications', path: '/specifications', anchor: 'official-catalog' },
  { id: 'palette', label: 'Colours', path: '/colours', anchor: 'palette' },
  { id: 'advertisement', label: 'Advertisement', path: '/advertisement', anchor: 'advertisement' },
  { id: 'contact', label: 'Contact', path: '/contact', anchor: 'contact' },
];


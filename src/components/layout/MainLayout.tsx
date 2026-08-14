import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CustomCursor } from '../common/CustomCursor';
import { ScrollToTop } from '../common/ScrollToTop';
import { FloatingWhatsApp } from '../common/FloatingWhatsApp';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col bg-ink text-cream">
      <CustomCursor />
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}

export default MainLayout;

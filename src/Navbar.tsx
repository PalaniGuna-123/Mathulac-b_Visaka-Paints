import { useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { navItems, phoneNumbers } from '@/data';
import visakaLogo from '../assets/logo.png';

export default function Navbar({ scrolled, scrollTo }: { scrolled: boolean; scrollTo: (id: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const text = scrolled ? 'text-[#322b3b]' : 'text-white/92';
  const muted = scrolled ? 'text-[#322b3b]/70' : 'text-white/60';

  const go = (id: string) => {
    setMenuOpen(false);
    scrollTo(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-white/95 shadow-lg shadow-ink/10 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div
          className={`max-w-[1400px] mx-auto px-4 md:px-7 flex items-center justify-between transition-all duration-500 ${
            scrolled ? 'h-16' : 'h-[76px] md:h-[84px]'
          }`}
        >
          <button onClick={() => go('top')} className="flex items-center gap-2.5 min-w-0" data-cursor="home" aria-label="Mathulac home">
            <img src={visakaLogo} alt="Visaka Paints & Chemicals India" className="h-9 w-auto md:h-10 object-contain" />
            <div className="text-left leading-tight min-w-0">
              <div className={`font-display text-xl md:text-2xl tracking-tight transition-colors ${scrolled ? 'text-[#d7194a]' : 'text-white'}`}>MATHULAC</div>
              <div className={`text-[8px] md:text-[9px] tracking-[0.16em] uppercase font-extrabold transition-colors ${muted}`}>by Visaka Paints &amp; Chemicals</div>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className={`nav-link text-sm font-bold transition-colors ${text}`}
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className={`hidden md:flex items-center gap-2 transition-colors ${text}`}>
              <Phone className={`w-4 h-4 transition-colors ${scrolled ? 'text-[#d43b7a]' : 'text-[#ffd5e8]'}`} />
              <a href={`tel:${phoneNumbers[0].replace(/\s/g, '')}`} className={`text-sm font-bold transition-colors ${text}`}>
                {phoneNumbers[0]}
              </a>
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden w-10 h-10 flex items-center justify-center transition-colors ${text}`}
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-ink/50 backdrop-blur-sm lg:hidden" onClick={() => setMenuOpen(false)} />
          <div className={`fixed left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-xl border-t border-black/5 p-5 shadow-xl animate-menu-drop ${scrolled ? 'top-16' : 'top-[76px] md:top-[84px]'}`}>
            <div className="flex flex-col gap-1">
              {navItems.map((n) => (
                <button
                  key={n.id}
                  onClick={() => go(n.id)}
                  className="text-left py-3 px-4 rounded-xl text-[#322b3b] font-bold hover:bg-[#fff0f6] transition-colors"
                >
                  {n.label}
                </button>
              ))}
              <div className="mt-3 pt-3 border-t border-black/10 flex flex-col gap-2 text-[#322b3b]">
                {phoneNumbers.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="flex items-center gap-2 py-2">
                    <Phone className="w-4 h-4 text-[#d43b7a]" /> {p}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

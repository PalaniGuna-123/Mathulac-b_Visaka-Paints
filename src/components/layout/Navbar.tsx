import { useState, useEffect } from 'react';
import { Menu, Phone, X, Sparkles } from 'lucide-react';
import { navItems, phoneNumbers } from '../../data';
import { NavLink, Link, useLocation, useNavigate } from '../../routes/Router';
import visakaLogo from '../../../assets/logo.png';

interface NavbarProps {
  scrolled?: boolean;
}

export function Navbar({ scrolled: externalScrolled }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [internalScrolled, setInternalScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isScrolled = externalScrolled !== undefined ? externalScrolled : internalScrolled;

  useEffect(() => {
    const onScroll = () => setInternalScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const text = isScrolled ? 'text-[#322b3b]' : 'text-white/95';
  const muted = isScrolled ? 'text-[#322b3b]/70' : 'text-white/60';

  const handleNavClick = (path: string, anchor?: string) => {
    setMenuOpen(false);
    if (location.pathname === '/' && anchor) {
      const el = document.getElementById(anchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigate(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-white/95 shadow-lg shadow-ink/10 backdrop-blur-xl' : 'bg-gradient-to-b from-ink/90 via-ink/40 to-transparent'
        }`}
      >
        <div
          className={`max-w-[1400px] mx-auto px-4 md:px-7 flex items-center justify-between transition-all duration-500 ${
            isScrolled ? 'h-16' : 'h-[76px] md:h-[84px]'
          }`}
        >
          {/* Logo / Brand */}
          <Link
            to="/"
            className="flex items-center gap-2.5 min-w-0 group"
            data-cursor="home"
            aria-label="Mathulac home"
            onClick={() => setMenuOpen(false)}
          >
            <img
              src={visakaLogo}
              alt="Visaka Paints & Chemicals India"
              className="h-9 w-auto md:h-10 object-contain transition-transform group-hover:scale-105"
            />
            <div className="text-left leading-tight min-w-0">
              <div className={`font-display text-xl md:text-2xl tracking-tight transition-colors ${isScrolled ? 'text-[#d7194a]' : 'text-white'}`}>
                MATHULAC
              </div>
              <div className={`text-[8px] md:text-[9px] tracking-[0.16em] uppercase font-extrabold transition-colors ${muted}`}>
                by Visaka Paints &amp; Chemicals
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((n) => (
              <NavLink
                key={n.id}
                to={n.path}
                onClick={(e) => {
                  if (location.pathname === '/' && n.anchor && n.path === '/') {
                    e.preventDefault();
                    handleNavClick(n.path, n.anchor);
                  }
                }}
                className={({ isActive }) =>
                  `nav-link text-sm font-bold transition-all px-1 py-1 ${text} ${
                    isActive ? (isScrolled ? 'text-[#d43b7a]' : 'text-white') : 'opacity-85 hover:opacity-100'
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          {/* Action & Contact Buttons */}
          <div className="flex items-center gap-3">
            <div className={`hidden md:flex items-center gap-2 transition-colors ${text}`}>
              <Phone className={`w-4 h-4 transition-colors ${isScrolled ? 'text-[#d43b7a]' : 'text-[#ffd5e8]'}`} />
              <a
                href={`tel:${phoneNumbers[0].replace(/\s/g, '')}`}
                className={`text-sm font-bold transition-colors hover:text-magenta ${text}`}
              >
                {phoneNumbers[0]}
              </a>
            </div>

            <Link
              to="/studio"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-gradient-to-r from-magenta to-violet text-white shadow-md hover:scale-105 transition-transform"
            >
              <Sparkles className="w-3.5 h-3.5" /> Studio
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden w-10 h-10 flex items-center justify-center transition-colors rounded-lg hover:bg-white/10 ${text}`}
              aria-label="Toggle Navigation Menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-ink/70 backdrop-blur-sm lg:hidden transition-opacity"
            onClick={() => setMenuOpen(false)}
          />
          <div
            className={`fixed left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-xl border-t border-black/5 p-5 shadow-2xl animate-menu-drop ${
              isScrolled ? 'top-16' : 'top-[76px] md:top-[84px]'
            }`}
          >
            <div className="flex flex-col gap-1.5">
              {navItems.map((n) => (
                <button
                  key={n.id}
                  onClick={() => handleNavClick(n.path, n.anchor)}
                  className="text-left py-3 px-4 rounded-xl text-[#322b3b] font-bold hover:bg-[#fff0f6] hover:text-[#d43b7a] transition-colors flex items-center justify-between"
                >
                  <span>{n.label}</span>
                  <span className="text-xs uppercase tracking-widest text-[#322b3b]/40 font-semibold">{n.path}</span>
                </button>
              ))}

              <div className="mt-3 pt-3 border-t border-black/10 flex flex-col gap-2 text-[#322b3b]">
                <div className="text-xs font-bold uppercase tracking-wider text-black/50 px-4">Contact Helpline</div>
                {phoneNumbers.map((p) => (
                  <a
                    key={p}
                    href={`tel:${p.replace(/\s/g, '')}`}
                    className="flex items-center gap-2.5 py-2 px-4 rounded-lg hover:bg-[#fff0f6] font-semibold text-sm"
                  >
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

export default Navbar;

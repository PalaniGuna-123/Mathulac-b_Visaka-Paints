import { useState, useEffect, useRef } from 'react';
import { Menu, Phone, X, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { navItems, phoneNumbers } from '../../data';
import { NavLink, Link, useLocation, useNavigate } from '../../routes/Router';
const mathulacLogo = '/assets/brand/mathulac-logo-nav.webp';

interface NavbarProps {
  scrolled?: boolean;
}

export function Navbar({ scrolled: externalScrolled }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [internalScrolled, setInternalScrolled] = useState(false);
  const logoRef = useRef<HTMLImageElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isScrolled = externalScrolled !== undefined ? externalScrolled : internalScrolled;

  useEffect(() => {
    const onScroll = () => setInternalScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!logoRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        logoRef.current,
        { autoAlpha: 0, y: -12, scale: 0.92 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out', clearProps: 'transform,opacity,visibility' },
      );
    }, logoRef);

    return () => ctx.revert();
  }, []);

  const text = 'text-white/95';

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

  const handleEnquiryClick = () => {
    setMenuOpen(false);
    if (location.pathname === '/contact') {
      const form = document.getElementById('inquiry') || document.getElementById('contact-form');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigate('/contact');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${
          isScrolled
            ? 'bg-ink/90 backdrop-blur-xl border-white/10 shadow-2xl py-3'
            : 'bg-gradient-to-b from-ink/90 via-ink/40 to-transparent border-transparent py-4'
        }`}
      >
        <div className="max-w-[1720px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <Link
            to="/"
            className="site-logo-link flex items-center gap-2 group shrink-0 min-w-0"
            aria-label="Mathulac Paints Home"
          >
            <img
              ref={logoRef}
              src={mathulacLogo}
              alt="Visaka Mathulac Paints Logo"
              className="h-9 sm:h-11 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="site-logo-paint-dot" aria-hidden="true" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center justify-center gap-2 xl:gap-3.5 2xl:gap-5 min-w-0">
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
                  `nav-link paint-nav-link text-xs xl:text-[13px] 2xl:text-sm font-bold transition-all px-1.5 py-1 whitespace-nowrap ${
                    isActive 
                      ? 'active text-white font-extrabold drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]' 
                      : 'text-white/75 hover:text-white hover:opacity-100'
                  }`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          {/* Action & Contact Buttons */}
          <div className="flex shrink-0 items-center gap-2 xl:gap-3">
            <div className={`hidden 2xl:flex items-center gap-2 transition-colors ${text}`}>
              <Phone className="w-4 h-4 text-[#ffd5e8]" />
              <a
                href={`tel:${phoneNumbers[0].replace(/\s/g, '')}`}
                className={`text-sm font-bold whitespace-nowrap transition-colors hover:text-magenta ${text}`}
              >
                {phoneNumbers[0]}
              </a>
            </div>

            <button
              onClick={handleEnquiryClick}
              className="paint-button paint-button--nav hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider bg-gradient-to-r from-magenta via-pink-500 to-violet text-white shadow-lg hover:shadow-magenta/30 hover:scale-105 transition-all duration-300 shimmer-button cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> ENQUIRY NOW
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden w-10 h-10 flex items-center justify-center transition-colors rounded-lg hover:bg-white/10 ${text}`}
              aria-label="Toggle Navigation Menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
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
            id="mobile-navigation"
            className={`fixed left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-xl border-t border-black/5 p-5 shadow-2xl animate-menu-drop ${
              isScrolled ? 'top-[68px] md:top-[72px]' : 'top-[76px] md:top-[82px]'
            }`}
          >
            <div className="flex flex-col gap-1.5">
              {navItems.map((n) => {
                const currentPath = location.pathname.toLowerCase().replace(/\/$/, '') || '/';
                const cleanTo = (n.path.split('#')[0] || '').toLowerCase().replace(/\/$/, '') || '/';
                const isItemActive = currentPath === cleanTo;

                return (
                  <button
                    key={n.id}
                    onClick={() => handleNavClick(n.path, n.anchor)}
                    className={`text-left py-3 px-4 rounded-xl font-bold transition-all flex items-center justify-between ${
                      isItemActive
                        ? 'bg-gradient-to-r from-magenta/15 via-pink-500/10 to-violet/10 text-magenta font-extrabold border-l-4 border-magenta pl-3 shadow-sm'
                        : 'text-[#322b3b] hover:bg-[#fff0f6] hover:text-[#d43b7a]'
                    }`}
                  >
                    <span>{n.label}</span>
                    <span className={`text-xs uppercase tracking-widest font-semibold ${isItemActive ? 'text-magenta/80' : 'text-[#322b3b]/40'}`}>
                      {n.path}
                    </span>
                  </button>
                );
              })}

              <button
                onClick={handleEnquiryClick}
                className="mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-magenta via-pink-500 to-violet text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" /> ENQUIRY NOW
              </button>

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

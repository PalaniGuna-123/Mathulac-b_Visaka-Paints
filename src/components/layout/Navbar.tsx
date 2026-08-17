import { useState, useEffect, useRef } from 'react';
import { Menu, Phone, X, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { navItems, phoneNumbers } from '../../data';
import { NavLink, Link, useLocation, useNavigate } from '../../routes/Router';
import { MATHULAC_NAV_LOGO_URL } from '../../lib/criticalAssets';
import { heroNav } from '../../lib/heroPhase';

interface NavbarProps {
  scrolled?: boolean;
}

export function Navbar({ scrolled: externalScrolled }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [internalScrolled, setInternalScrolled] = useState(false);
  const [heroHidden, setHeroHidden] = useState(false);
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
    heroNav.on(setHeroHidden);
    return () => heroNav.off(setHeroHidden);
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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${
          isScrolled
            ? 'bg-[#080c19]/95 border-white/10 shadow-xl shadow-black/25 backdrop-blur-2xl'
            : 'bg-[#080c19]/75 border-white/[0.07] shadow-lg shadow-black/10 backdrop-blur-lg'
        }`}
        style={{
          opacity: heroHidden ? 0 : 1,
          transform: heroHidden ? 'translateY(-20px)' : 'translateY(0)',
          pointerEvents: heroHidden ? 'none' : 'auto',
          transition: 'opacity 0.4s cubic-bezier(0.4,0,0.2,1), transform 0.4s cubic-bezier(0.4,0,0.2,1), pointer-events 0s',
        }}
      >
        <div
          className={`max-w-[1500px] mx-auto px-4 md:px-6 xl:px-8 flex items-center justify-between gap-3 xl:gap-6 transition-all duration-500 ${
            isScrolled ? 'h-[68px] md:h-[72px]' : 'h-[76px] md:h-[82px]'
          }`}
        >
          {/* Logo / Brand */}
          <Link
            to="/"
            className="site-logo-lockup flex shrink-0 items-center min-w-0 group py-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            data-cursor="home"
            aria-label="Mathulac by Visaka Paints — Home"
            onClick={() => setMenuOpen(false)}
          >
            <img
              ref={logoRef}
              src={MATHULAC_NAV_LOGO_URL}
              alt="Mathulac by Visaka Paints"
              width="660"
              height="220"
              decoding="async"
              fetchPriority="high"
              className="w-[135px] sm:w-[150px] md:w-[175px] lg:w-[190px] xl:w-[220px] h-auto object-contain drop-shadow-[0_3px_7px_rgba(0,0,0,0.48)] transition-[transform,filter] duration-300 ease-out motion-safe:group-hover:scale-[1.03] group-hover:drop-shadow-[0_5px_10px_rgba(0,0,0,0.65)]"
            />
            <span className="site-logo-paint-dot" aria-hidden="true" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center justify-center gap-3 xl:gap-5 2xl:gap-7 min-w-0">
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
                  `nav-link paint-nav-link text-[13px] xl:text-sm font-bold transition-all px-0.5 py-1 whitespace-nowrap ${text} ${
                    isActive ? 'text-white' : 'opacity-80 hover:opacity-100'
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

            <Link
              to="/studio"
              className="paint-button paint-button--nav hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-gradient-to-r from-magenta to-violet text-white shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5" /> Studio
            </Link>

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

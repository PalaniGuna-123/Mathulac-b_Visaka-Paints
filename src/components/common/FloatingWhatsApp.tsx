interface FloatingWhatsAppProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export function FloatingWhatsApp({
  phoneNumber = '919363114343',
  defaultMessage = 'Hi Visaka Mathulac Paints, I would like to inquire about your paint products and color consultation.',
}: FloatingWhatsAppProps) {
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMsg}`;

  return (
    <aside
      aria-label="WhatsApp Support"
      className="fixed z-50 select-none flex items-center pointer-events-auto"
      style={{
        right: 'max(1.25rem, env(safe-area-inset-right, 1.25rem))',
        bottom: 'max(1.25rem, env(safe-area-inset-bottom, 1.25rem))',
      }}
    >
      {/* Floating WhatsApp Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Visaka Mathulac Paints on WhatsApp (+91 93631 14343)"
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#25D366] text-white shadow-xl shadow-emerald-600/35 hover:shadow-2xl hover:shadow-emerald-500/60 hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
      >
        {/* Radar Pulse Glow Rings */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none group-hover:opacity-50" />
        <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 opacity-40 blur-sm pointer-events-none group-hover:opacity-75 transition-opacity" />

        {/* Official crisp WhatsApp SVG Icon */}
        <svg
          viewBox="0 0 32 32"
          className="w-7 h-7 sm:w-8 sm:h-8 fill-current relative z-10 transition-transform duration-300 group-hover:scale-110"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 2a13.9 13.9 0 0 0-12 20.89L2 30l7.35-1.92A13.94 13.94 0 1 0 16 2zm0 25.56a11.58 11.58 0 0 1-5.91-1.61l-.42-.25-4.38 1.15 1.17-4.27-.27-.44A11.62 11.62 0 1 1 16 27.56zm6.38-8.7c-.35-.18-2.07-1-2.4-1.12s-.56-.17-.8.18-.92 1.12-1.13 1.35-.42.26-.77.09a9.7 9.7 0 0 1-2.86-1.77 10.74 10.74 0 0 1-2-2.46c-.21-.35 0-.54.16-.72.16-.16.35-.42.53-.63a2.38 2.38 0 0 0 .35-.59.66.66 0 0 0 0-.63c-.09-.17-.8-1.92-1.09-2.63s-.58-.6-.8-.61h-.68a1.31 1.31 0 0 0-.95.44 4 4 0 0 0-1.25 3 7 7 0 0 0 1.47 3.71 16 16 0 0 0 6.13 5.41 21 21 0 0 0 2.05.76 4.92 4.92 0 0 0 2.26.14 3.7 3.7 0 0 0 2.43-1.7 3 3 0 0 0 .21-1.71c-.08-.16-.32-.26-.67-.44z" />
        </svg>

        {/* Online Status Dot Indicator */}
        <span className="absolute bottom-1 right-1 sm:bottom-1.5 sm:right-1.5 z-20 w-3.5 h-3.5 rounded-full bg-emerald-300 border-2 border-[#0B1020] shadow-sm" />
      </a>
    </aside>
  );
}

export default FloatingWhatsApp;


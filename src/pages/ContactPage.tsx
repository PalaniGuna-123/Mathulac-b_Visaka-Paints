import { ContactSection } from '../features/contact';
import { phoneNumbers } from '../data';
import { MapPin, Phone, Clock, Sparkles } from 'lucide-react';

export function ContactPage() {
  return (
    <div className="w-full pt-20">
      {/* Contact Header */}
      <div className="relative py-16 md:py-20 px-4 md:px-8 bg-gradient-to-b from-ink via-[#1a0b2e] to-ink border-b border-white/10 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-leaf/20 text-leaf text-[11px] font-extrabold uppercase tracking-widest mb-3 border border-leaf/30">
            <Sparkles className="w-3.5 h-3.5" /> Direct Support &amp; Enquiries
          </div>
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl text-white leading-tight tracking-tight">
            We're Here To Help You Paint
          </h1>
          <p className="text-white/70 text-xs sm:text-sm mt-2.5 max-w-xl mx-auto leading-relaxed">
            Speak directly with our technical coatings team in Coimbatore for color advice, dealer inquiries, or bulk contractor orders.
          </p>

          {/* Quick Contact Info Cards */}
          <div className="grid sm:grid-cols-3 gap-5 mt-12 max-w-3xl mx-auto">
            <div className="p-6 rounded-xl glass border border-white/10 text-left">
              <Phone className="w-6 h-6 text-magenta mb-3" />
              <div className="text-xs uppercase font-bold text-white/50 tracking-wider">Direct Hotline</div>
              <div className="text-white font-bold text-sm mt-1">{phoneNumbers[0]}</div>
              <div className="text-white/70 text-xs mt-0.5">{phoneNumbers[1]}</div>
            </div>

            <div className="p-6 rounded-xl glass border border-white/10 text-left">
              <MapPin className="w-6 h-6 text-cyan mb-3" />
              <div className="text-xs uppercase font-bold text-white/50 tracking-wider">Manufacturing Plant &amp; HQ</div>
              <div className="text-white font-bold text-sm mt-1">Kariampalayam, Pogalur Via</div>
              <div className="text-white/70 text-xs mt-0.5">Coimbatore, Tamil Nadu 641697</div>
            </div>

            <div className="p-6 rounded-xl glass border border-white/10 text-left">
              <Clock className="w-6 h-6 text-sun mb-3" />
              <div className="text-xs uppercase font-bold text-white/50 tracking-wider">Working Hours</div>
              <div className="text-white font-bold text-sm mt-1">Mon – Sat: 9am – 6pm</div>
              <div className="text-white/70 text-xs mt-0.5">Sunday Closed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Contact Form */}
      <ContactSection />
    </div>
  );
}

export default ContactPage;

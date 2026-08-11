import { ContactSection } from '../features/contact';
import { phoneNumbers } from '../data';
import { MapPin, Phone, Clock, Sparkles } from 'lucide-react';

export function ContactPage() {
  return (
    <div className="w-full pt-20">
      {/* Contact Header */}
      <div className="relative py-16 md:py-24 px-5 md:px-8 bg-gradient-to-b from-ink via-[#1a0b2e] to-ink border-b border-white/10 text-center">
        <div className="max-w-[1200px] mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-leaf/20 text-leaf text-xs font-bold uppercase tracking-widest mb-4 border border-leaf/30">
            <Sparkles className="w-3.5 h-3.5" /> Direct Support &amp; Enquiries
          </div>
          <h1 className="heading-hero text-white">We're Here To Help You Paint</h1>
          <p className="text-white/70 max-w-xl mx-auto mt-6 text-base md:text-lg">
            Speak directly with our technical coatings team in Coimbatore for color advice, dealer inquiries, or bulk contractor orders.
          </p>

          {/* Quick Contact Info Cards */}
          <div className="grid sm:grid-cols-3 gap-5 mt-12 max-w-3xl mx-auto">
            <div className="p-6 rounded-2xl glass border border-white/10 text-left">
              <Phone className="w-6 h-6 text-magenta mb-3" />
              <div className="text-xs uppercase font-bold text-white/50 tracking-wider">Direct Hotline</div>
              <div className="text-white font-bold text-sm mt-1">{phoneNumbers[0]}</div>
              <div className="text-white/70 text-xs mt-0.5">{phoneNumbers[1]}</div>
            </div>

            <div className="p-6 rounded-2xl glass border border-white/10 text-left">
              <MapPin className="w-6 h-6 text-cyan mb-3" />
              <div className="text-xs uppercase font-bold text-white/50 tracking-wider">Manufacturing HQ</div>
              <div className="text-white font-bold text-sm mt-1">Coimbatore, Tamil Nadu</div>
              <div className="text-white/70 text-xs mt-0.5">India</div>
            </div>

            <div className="p-6 rounded-2xl glass border border-white/10 text-left">
              <Clock className="w-6 h-6 text-sun mb-3" />
              <div className="text-xs uppercase font-bold text-white/50 tracking-wider">Working Hours</div>
              <div className="text-white font-bold text-sm mt-1">Mon – Sat: 9am – 7pm</div>
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

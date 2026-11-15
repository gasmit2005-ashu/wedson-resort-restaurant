import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import Logo from './Logo';

const Footer = ({ onOpenReserveTable, onOpenResortInquiry }) => {
  return (
    <footer className="bg-forest-950 text-cream-100 border-t border-gold-500/30 pt-16 pb-8 relative overflow-hidden">
      {/* Decorative Gold Glow Circles */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-forest-800/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-gold-500/20">
          {/* Column 1: Brand & Philosophy */}
          <div className="space-y-4">
            <Logo light={true} />
            <p className="text-sm text-cream-200/80 leading-relaxed font-light mt-3">
              Where memorable celebrations, delightful gourmet dining, and royal hospitality harmonize. Nestled in Ghatampur, Kanpur Nagar, Wedson is your premier destination for luxury resort stays, grand wedding banquets, and authentic family dining.
            </p>
            <div className="pt-2 flex items-center space-x-3">
              <span className="text-xs uppercase tracking-widest text-gold-400 font-medium">Hotel & Resorts</span>
              <span className="text-gold-500/50">•</span>
              <span className="text-xs uppercase tracking-widest text-gold-400 font-medium">Fine Dining</span>
              <span className="text-gold-500/50">•</span>
              <span className="text-xs uppercase tracking-widest text-gold-400 font-medium">Grand Lawns</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-base font-serif font-bold text-gold-400 uppercase tracking-wider mb-5">
              Explore Wedson
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-cream-200/80 hover:text-gold-300 transition-colors flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500/50 group-hover:bg-gold-400 transition-colors" />
                  <span>Home Experience</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-cream-200/80 hover:text-gold-300 transition-colors flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500/50 group-hover:bg-gold-400 transition-colors" />
                  <span>About Our Property</span>
                </Link>
              </li>
              <li>
                <Link to="/restaurant" className="text-cream-200/80 hover:text-gold-300 transition-colors flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500/50 group-hover:bg-gold-400 transition-colors" />
                  <span>Fine Dining Restaurant</span>
                </Link>
              </li>
              <li>
                <Link to="/resort" className="text-cream-200/80 hover:text-gold-300 transition-colors flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500/50 group-hover:bg-gold-400 transition-colors" />
                  <span>Suites, Lawns & Banquets</span>
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-cream-200/80 hover:text-gold-300 transition-colors flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500/50 group-hover:bg-gold-400 transition-colors" />
                  <span>Chef's Culinary Menu</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-cream-200/80 hover:text-gold-300 transition-colors flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500/50 group-hover:bg-gold-400 transition-colors" />
                  <span>Verified Photo Gallery</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-cream-200/80 hover:text-gold-300 transition-colors flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500/50 group-hover:bg-gold-400 transition-colors" />
                  <span>Contact & Location</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Operating Hours & Direct Booking */}
          <div>
            <h4 className="text-base font-serif font-bold text-gold-400 uppercase tracking-wider mb-5">
              Hospitality Hours
            </h4>
            <div className="space-y-4 text-sm text-cream-200/80">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Restaurant Dining</p>
                  <p className="text-xs text-cream-200/70">11:00 AM – 11:30 PM (Daily)</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Resort & Front Desk</p>
                  <p className="text-xs text-cream-200/70">24 Hours / 7 Days Open</p>
                  <p className="text-[11px] text-gold-400/80">Check-in: 12:00 PM | Check-out: 11:00 AM</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenReserveTable}
                  className="w-full py-2 px-3 text-xs font-semibold uppercase tracking-wider rounded-lg bg-gold-500/15 border border-gold-400/40 text-gold-300 hover:bg-gold-500 hover:text-forest-950 transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <span>Book Dining Table</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Column 4: Contact & Location */}
          <div>
            <h4 className="text-base font-serif font-bold text-gold-400 uppercase tracking-wider mb-5">
              Kanpur Nagar Estate
            </h4>
            <ul className="space-y-3.5 text-sm text-cream-200/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-400 mt-1 flex-shrink-0" />
                <span>Wedson Resorts, Main Highway, Ghatampur, Kanpur Nagar, Uttar Pradesh - 209206</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href="tel:+919839000000" className="hover:text-gold-300 transition-colors">
                  +91 98390 00000 / Front Desk
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href="mailto:info@wedsonresort.com" className="hover:text-gold-300 transition-colors">
                  info@wedsonresort.com
                </a>
              </li>
            </ul>

            <div className="mt-5 p-3 rounded-lg bg-forest-900/60 border border-gold-500/20 text-xs text-cream-200/70">
              <p className="font-semibold text-gold-300 mb-1">Kanpur Nagar Destination</p>
              <p>Easily accessible from Kanpur, Hamirpur, and Lucknow corridors with ample secured valet parking.</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Admin Entry */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-200/60 gap-4">
          <p>© {new Date().getFullYear()} Wedson Resort & Restaurant. All Rights Reserved.</p>
          
          <div className="flex items-center space-x-6">
            <span className="text-cream-200/40">Ghatampur, Kanpur Nagar</span>
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1.5 text-gold-400/70 hover:text-gold-300 transition-colors py-1 px-2.5 rounded border border-gold-500/20 hover:border-gold-500/40"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
              <span>Admin Management</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

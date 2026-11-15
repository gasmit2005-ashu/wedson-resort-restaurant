import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Utensils, Calendar, Shield } from 'lucide-react';
import Logo from './Logo';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Restaurant', path: '/restaurant' },
  { name: 'Resort', path: '/resort' },
  { name: 'Food Menu', path: '/menu' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = ({ onOpenReserveTable, onOpenResortInquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navBackground = isScrolled || !isHome
    ? 'bg-forest-950/95 backdrop-blur-md shadow-xl py-3 border-b border-gold-500/20'
    : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${navBackground}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Logo light={true} />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-1.5 text-sm font-medium tracking-wide uppercase transition-colors duration-200 relative ${
                      isActive
                        ? 'text-gold-400 font-semibold'
                        : 'text-cream-100/90 hover:text-gold-300'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeNavIndicator"
                          className="absolute bottom-0 left-3 right-3 h-0.5 bg-gold-400 rounded-full"
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <button
                onClick={onOpenReserveTable}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-gradient-to-r from-gold-500 to-gold-600 text-forest-950 shadow-md hover:shadow-gold-glow hover:brightness-110 active:scale-95 transition-all duration-200"
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>Reserve Table</span>
              </button>

              <button
                onClick={onOpenResortInquiry}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-gold-400/60 text-gold-300 hover:bg-gold-500/10 active:scale-95 transition-all duration-200"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Resort Stay</span>
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex items-center space-x-2 lg:hidden">
              <button
                onClick={onOpenReserveTable}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase bg-gold-500 text-forest-950"
              >
                <Utensils className="w-3 h-3" />
                <span>Book</span>
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gold-400 hover:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-50 bg-forest-950/98 backdrop-blur-xl lg:hidden flex flex-col p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-6 border-b border-gold-500/20">
              <Logo light={true} />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gold-400 hover:text-white rounded-lg"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            <nav className="flex flex-col space-y-4 my-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-lg font-serif tracking-wide py-2 px-3 rounded-lg transition-colors ${
                      isActive
                        ? 'text-gold-400 bg-gold-500/10 font-bold border-l-4 border-gold-400'
                        : 'text-cream-100 hover:text-gold-300'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            <div className="mt-auto space-y-3 pt-6 border-t border-gold-500/20">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReserveTable();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold uppercase bg-gradient-to-r from-gold-500 to-gold-600 text-forest-950 shadow-lg"
              >
                <Utensils className="w-4 h-4" />
                <span>Reserve a Table</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResortInquiry();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold uppercase border border-gold-400/50 text-gold-300 hover:bg-gold-500/10"
              >
                <Calendar className="w-4 h-4" />
                <span>Resort Accommodation & Lawns</span>
              </button>

              <div className="pt-4 flex items-center justify-between text-xs text-cream-200/60">
                <span>Ghatampur, Kanpur Nagar</span>
                <Link to="/admin/login" className="flex items-center gap-1 text-gold-400/70 hover:text-gold-300">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

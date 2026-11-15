import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Utensils, 
  Hotel, 
  MapPin, 
  Star, 
  Sparkles, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Award, 
  Car, 
  Wifi, 
  Zap, 
  Wine, 
  ChevronRight,
  ChevronLeft,
  Coffee
} from 'lucide-react';
import { menuService, galleryService, settingsService } from '../services/api';
import Lightbox from '../components/Lightbox';

const Home = ({ onOpenReserveTable, onOpenResortInquiry }) => {
  const [featuredDishes, setFeaturedDishes] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [settings, setSettings] = useState(null);
  const [selectedLightboxImage, setSelectedLightboxImage] = useState(null);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  const heroSlides = [
    {
      image: '/images/resort-facade-day.jpg',
      subtitle: 'Welcome to Wedson Resorts • Ghatampur, Kanpur Nagar',
      title: 'Experience Comfort. Discover Flavours.',
      description: 'A palatial sanctuary where neoclassical grandeur meets extraordinary culinary creations and warm Uttar Pradesh hospitality.'
    },
    {
      image: '/images/restaurant-interior.jpg',
      subtitle: 'Wedson Fine Dining & Luxury Hall',
      title: 'Artisanal Flavours & Royal Ambience',
      description: 'Immerse in golden pendant lighting, plush velvet seating, and authentic multi-cuisine delicacies curated by master chefs.'
    },
    {
      image: '/images/resort-lawns-night.jpg',
      subtitle: 'Destination Celebrations & Wedding Lawns',
      title: 'Grand Lawns for Unforgettable Milestones',
      description: 'Vast illuminated green party grounds, royal banquets, and magical night celebrations beneath the open starlit sky.'
    }
  ];

  useEffect(() => {
    // Auto-advance hero slides
    const timer = setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menuRes, galRes, setRes] = await Promise.all([
          menuService.getAll({}),
          galleryService.getAll({}),
          settingsService.get()
        ]);
        if (menuRes.success) {
          const featured = menuRes.data.filter((item) => item.isFeatured).slice(0, 6);
          setFeaturedDishes(featured.length > 0 ? featured : menuRes.data.slice(0, 6));
        }
        if (galRes.success) {
          setGalleryImages(galRes.data.slice(0, 5));
        }
        if (setRes.success) {
          setSettings(setRes.data);
        }
      } catch (err) {
        console.error('Error fetching home data:', err);
      }
    };
    fetchData();
  }, []);

  const verifiedFacilities = [
    { icon: Utensils, title: 'Fine Dining Restaurant', desc: 'Air-conditioned luxury dining hall with Indian, Tandoori & Chinese cuisines.' },
    { icon: Hotel, title: 'Boutique Suites', desc: 'Designer rooms with plush tufted headboards, ambient lighting & king beds.' },
    { icon: Sparkles, title: 'Grand Wedding Lawns', desc: 'Sprawling night-illuminated celebration lawns for weddings, receptions & gala events.' },
    { icon: Car, title: 'Valet & Secure Parking', desc: 'Ample on-premises secured parking for over 250+ vehicles.' },
    { icon: Zap, title: '100% Power Backup', desc: 'Round-the-clock uninterrupted power infrastructure for flawless functions.' },
    { icon: Wifi, title: 'High-Speed Wi-Fi', desc: 'Complimentary high-speed internet throughout guest rooms and restaurant.' }
  ];

  const testimonials = [
    {
      name: 'Dr. Vivek Saxena',
      location: 'Kanpur',
      rating: 5,
      comment: 'Wedson Resort is an absolute gem in Ghatampur! The neoclassical palace facade looks magnificent, and the restaurant ambiance with its golden lighting is world-class. The Dal Makhani and Paneer Tikka are top tier.'
    },
    {
      name: 'Er. Ritu & Prashant Mishra',
      location: 'Lucknow Highway',
      rating: 5,
      comment: 'We hosted my sister’s engagement reception on the grand lawn. The night illumination looked like a royal fairytale. Outstanding staff coordination, spotless rooms, and mouthwatering food that our guests still talk about.'
    },
    {
      name: 'Adv. S. K. Awasthi',
      location: 'Kanpur Nagar',
      rating: 5,
      comment: 'Finally a true luxury dining and stay destination on the highway. Super clean executive rooms with modern tufted interiors, comfortable mattresses, and attentive service. A must-visit with family.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* 1. CINEMATIC FULLSCREEN HERO */}
      <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden bg-forest-950">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === activeHeroSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover transform duration-1000"
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-forest-950/95 via-forest-950/70 to-forest-950/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-black/60" />
          </div>
        ))}

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left w-full pt-16">
          <div className="max-w-3xl">
            {/* Subtitle Badge */}
            <motion.div
              key={`badge-${activeHeroSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-900/80 border border-gold-400/50 backdrop-blur-md text-xs sm:text-sm font-semibold tracking-wider text-gold-300 uppercase mb-6 shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
              <span>{heroSlides[activeHeroSlide].subtitle}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              key={`h1-${activeHeroSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.1] mb-6 drop-shadow-md"
            >
              {heroSlides[activeHeroSlide].title}
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              key={`desc-${activeHeroSlide}`}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-xl text-cream-100/90 font-light leading-relaxed mb-10 max-w-2xl drop-shadow"
            >
              {heroSlides[activeHeroSlide].description}
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Link
                to="/resort"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-gold-500 to-gold-600 text-forest-950 shadow-xl hover:shadow-gold-glow hover:brightness-110 active:scale-95 transition-all text-center flex items-center justify-center gap-2"
              >
                <Hotel className="w-4 h-4" />
                <span>Explore Our Resort</span>
              </Link>

              <button
                onClick={onOpenReserveTable}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-forest-900/90 border border-gold-400/60 text-gold-300 hover:bg-forest-800 hover:text-white backdrop-blur-md active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Utensils className="w-4 h-4 text-gold-400" />
                <span>Reserve a Table</span>
              </button>

              <Link
                to="/contact"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-cream-100/80 hover:text-white transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 right-8 z-20 hidden sm:flex items-center space-x-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveHeroSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeHeroSlide ? 'w-8 bg-gold-400' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. ABOUT WEDSON SECTION */}
      <section className="py-20 lg:py-28 bg-[#FAF7F2] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual Collage of Authentic Property Photos */}
            <div className="lg:col-span-6 relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-2 border-gold-500/30">
                <img
                  src="/images/resort-facade-day.jpg"
                  alt="Wedson Resorts Neoclassical Facade"
                  className="w-full h-[400px] sm:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold">Ghatampur, Kanpur Nagar</span>
                  <p className="text-xl font-serif font-bold text-white">Grand Neoclassical Architecture</p>
                </div>
              </div>

              {/* Overlapping Secondary Card: Actual Restaurant Photo */}
              <div className="hidden sm:block absolute -bottom-10 -right-8 z-20 w-64 rounded-xl overflow-hidden shadow-2xl border-2 border-gold-400 bg-forest-950 p-1">
                <img
                  src="/images/restaurant-interior.jpg"
                  alt="Wedson Restaurant Hall"
                  className="w-full h-40 object-cover rounded-lg"
                />
                <div className="p-2 text-center">
                  <p className="text-xs font-serif font-bold text-gold-300">Fine Dining Hall</p>
                  <p className="text-[10px] text-cream-200/70">Golden Light Ambience</p>
                </div>
              </div>

              {/* Decorative Gold Leaf Badge */}
              <div className="absolute -top-6 -left-6 z-20 w-24 h-24 rounded-full bg-forest-950 border border-gold-400 flex flex-col items-center justify-center text-center p-2 shadow-xl">
                <Award className="w-6 h-6 text-gold-400 mb-0.5" />
                <span className="text-[10px] uppercase font-bold text-gold-300 tracking-wider">Premium</span>
                <span className="text-[8px] text-cream-100/70">Hospitality</span>
              </div>
            </div>

            {/* Narrative Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-900/10 border border-forest-900/20 text-xs font-semibold uppercase tracking-widest text-forest-800">
                <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                <span>Our Heritage & Experience</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-forest-950 leading-tight">
                A Regal Haven of Hospitality in Kanpur Nagar
              </h2>

              <p className="text-base text-charcoal-700 leading-relaxed font-light">
                Welcome to <strong>Wedson Resort & Restaurant</strong>, an architectural masterpiece established in Ghatampur, Kanpur Nagar. Designed with timeless neoclassical pillars and grand portals, Wedson offers a peaceful escape from the bustling city while providing unparalleled elegance.
              </p>

              <p className="text-base text-charcoal-700 leading-relaxed font-light">
                Whether you are joining us for an intimate family dinner in our golden-hued fine dining hall, hosting an extravagant wedding on our expansive illuminated lawns, or relaxing in our boutique executive suites, every moment at Wedson is crafted with personalized warmth and care.
              </p>

              {/* Feature Bullet Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-forest-900 text-gold-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-forest-950">Verified Property</h4>
                    <p className="text-xs text-charcoal-600">Authentic architecture and real facilities.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-forest-900 text-gold-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-forest-950">Master Chef Kitchen</h4>
                    <p className="text-xs text-charcoal-600">Artisanal Indian, Tandoori & Chinese recipes.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-forest-900 text-gold-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-forest-950">Grand Wedding Lawns</h4>
                    <p className="text-xs text-charcoal-600">Spacious landscaped grounds with banquet stages.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-forest-900 text-gold-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-forest-950">Luxury Accommodations</h4>
                    <p className="text-xs text-charcoal-600">Ambient LED tufted suites with modern amenities.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-forest-950 text-gold-300 hover:bg-forest-900 transition-colors shadow-md"
                >
                  <span>Read Full Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/gallery"
                  className="text-xs font-bold uppercase tracking-wider text-forest-900 hover:text-gold-600 underline underline-offset-4"
                >
                  View Property Photos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RESORT HIGHLIGHTS & ARCHITECTURE SHOWCASE */}
      <section className="py-20 bg-forest-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
              Verified Property Highlights
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mt-2 mb-4">
              Architectural Splendor & Resort Grounds
            </h2>
            <p className="text-sm sm:text-base text-cream-200/80 font-light leading-relaxed">
              Every photograph presented is an authentic view of Wedson Resort & Restaurant in Ghatampur, Kanpur Nagar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Neoclassical Facade */}
            <div className="group rounded-2xl overflow-hidden bg-forest-900/60 border border-gold-500/20 shadow-xl hover:border-gold-400 transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="/images/resort-facade-day.jpg"
                  alt="Neoclassical Resort Facade"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-forest-950/80 border border-gold-400/40 text-[10px] font-bold uppercase tracking-wider text-gold-300">
                  Palace Architecture
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-white group-hover:text-gold-300 transition-colors">
                  Neoclassical Palace Entrance
                </h3>
                <p className="text-xs sm:text-sm text-cream-200/70 mt-2 leading-relaxed">
                  Monumental fluted columns, ornate architraves, carved cornices, and grand semi-circular stone steps welcoming guests to royalty.
                </p>
                <div className="mt-4 pt-4 border-t border-gold-500/10 flex items-center justify-between text-xs text-gold-400">
                  <span>Daytime Grandeur</span>
                  <Link to="/resort" className="inline-flex items-center gap-1 hover:text-white">
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2: Night Lawns & Banquets */}
            <div className="group rounded-2xl overflow-hidden bg-forest-900/60 border border-gold-500/20 shadow-xl hover:border-gold-400 transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="/images/resort-lawns-night.jpg"
                  alt="Night Event Lawns"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-forest-950/80 border border-gold-400/40 text-[10px] font-bold uppercase tracking-wider text-gold-300">
                  Wedding & Lawns
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-white group-hover:text-gold-300 transition-colors">
                  Panoramic Illuminated Lawns
                </h3>
                <p className="text-xs sm:text-sm text-cream-200/70 mt-2 leading-relaxed">
                  Lush open-air grounds with ambient fairy lights, spotlight illuminations, and full catering pavilions for up to 1,500+ guests.
                </p>
                <div className="mt-4 pt-4 border-t border-gold-500/10 flex items-center justify-between text-xs text-gold-400">
                  <span>Weddings & Galas</span>
                  <button onClick={onOpenResortInquiry} className="inline-flex items-center gap-1 hover:text-white">
                    <span>Inquire Banquet</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3: Luxury King Suites */}
            <div className="group rounded-2xl overflow-hidden bg-forest-900/60 border border-gold-500/20 shadow-xl hover:border-gold-400 transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="/images/room-luxury-suite.jpg"
                  alt="Luxury Bedroom Suite"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-forest-950/80 border border-gold-400/40 text-[10px] font-bold uppercase tracking-wider text-gold-300">
                  Stay & Rooms
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-white group-hover:text-gold-300 transition-colors">
                  Executive Luxury Suites
                </h3>
                <p className="text-xs sm:text-sm text-cream-200/70 mt-2 leading-relaxed">
                  Floor-to-ceiling padded charcoal headboards, ambient vertical lighting, plush white duvets, air conditioning, and peaceful comfort.
                </p>
                <div className="mt-4 pt-4 border-t border-gold-500/10 flex items-center justify-between text-xs text-gold-400">
                  <span>King Bed Comfort</span>
                  <button onClick={onOpenResortInquiry} className="inline-flex items-center gap-1 hover:text-white">
                    <span>Book Suite</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. RESTAURANT EXPERIENCE (FEATURING ACTUAL RESTAURANT PHOTO) */}
      <section className="py-20 lg:py-28 bg-[#FAF7F2] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-forest-950 rounded-3xl overflow-hidden border border-gold-500/30 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column: Authentic Photo */}
              <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[520px]">
                <img
                  src="/images/restaurant-interior.jpg"
                  alt="Wedson Fine Dining Restaurant Hall"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-forest-950" />
                <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-forest-900/90 border border-gold-400/50 backdrop-blur-md text-xs font-bold text-gold-300 uppercase tracking-widest">
                  Actual Dining Hall Photograph
                </div>
              </div>

              {/* Right Column: Culinary Narrative */}
              <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 flex flex-col justify-center space-y-6 text-white">
                <span className="text-xs font-semibold uppercase tracking-widest text-gold-400 flex items-center gap-1.5">
                  <Utensils className="w-4 h-4" />
                  <span>The Wedson Dining Room</span>
                </span>

                <h3 className="text-3xl sm:text-4xl font-serif font-bold leading-tight">
                  A Symphony of Warm Light & Exquisite Flavours
                </h3>

                <p className="text-sm text-cream-200/80 leading-relaxed font-light">
                  Step into our signature dining room adorned with the official <strong>Wedson Hotel & Resorts</strong> crest, custom geometric coffered ceiling, amber pendant drops, and comfortable velvet armchair dining.
                </p>

                <p className="text-sm text-cream-200/80 leading-relaxed font-light">
                  From slow-simmered Awadhi handi biryanis and clay-oven tandoori platters to sizzling Indo-Chinese appetizers and artisanal mocktails, our culinary offerings cater to discerning palates.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={onOpenReserveTable}
                    className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-gold-500 to-gold-600 text-forest-950 hover:brightness-110 active:scale-95 transition-all text-center shadow-lg"
                  >
                    Reserve Dining Table
                  </button>
                  <Link
                    to="/menu"
                    className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider border border-gold-400/50 text-gold-300 hover:bg-gold-500/10 text-center transition-colors"
                  >
                    Browse Full Menu
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED FOOD & DELICACIES */}
      <section className="py-20 bg-cream-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-600">
                Chef's Handcrafted Specialties
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest-950 mt-1">
                Featured Gourmet Creations
              </h2>
            </div>
            <Link
              to="/menu"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest-900 hover:text-gold-600 group"
            >
              <span>Explore All Categories</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredDishes.map((dish) => (
              <div
                key={dish._id}
                className="bg-white rounded-2xl overflow-hidden border border-cream-300 shadow-md hover:shadow-xl hover:border-gold-400 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-48 overflow-hidden bg-forest-950">
                  <img
                    src={dish.image || '/images/restaurant-interior.jpg'}
                    alt={dish.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-forest-950/80 text-gold-300 border border-gold-500/30">
                      {dish.category}
                    </span>
                    {dish.dietaryTag === 'veg' && (
                      <span className="w-5 h-5 rounded bg-white flex items-center justify-center border border-green-600" title="100% Pure Vegetarian">
                        <span className="w-2.5 h-2.5 rounded-full bg-green-600" />
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-forest-950/90 text-gold-400 font-serif font-bold text-sm border border-gold-400/40">
                    ₹{dish.price}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-forest-950 hover:text-gold-600 transition-colors">
                      {dish.name}
                    </h3>
                    <p className="text-xs text-charcoal-600 mt-2 line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] text-charcoal-500">Spice: <strong>{dish.spiceLevel || 'Medium'}</strong></span>
                    <button
                      onClick={onOpenReserveTable}
                      className="text-xs font-bold uppercase tracking-wider text-gold-600 hover:text-forest-950 transition-colors"
                    >
                      Dine In & Taste →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. VERIFIED FACILITIES */}
      <section className="py-20 bg-forest-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
              World-Class Amenities
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">
              Thoughtfully Curated For Your Comfort
            </h2>
            <p className="text-xs sm:text-sm text-cream-200/70 mt-2">
              Only verified amenities present on the Wedson Resort & Restaurant premises.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {verifiedFacilities.map((fac, idx) => {
              const Icon = fac.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-forest-950/60 border border-gold-500/20 hover:border-gold-400/60 transition-all duration-300 flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-forest-900 text-gold-400 flex items-center justify-center flex-shrink-0 border border-gold-500/30">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-serif font-bold text-white">{fac.title}</h3>
                    <p className="text-xs text-cream-200/70 mt-1 leading-relaxed">{fac.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. IMAGE GALLERY PREVIEW */}
      <section className="py-20 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-600">
              Photographic Tour
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest-950 mt-1">
              Moments & Property Views
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-2">
              Click any photograph to view high-resolution details in full-screen.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {galleryImages.map((img, idx) => (
              <div
                key={img._id || idx}
                onClick={() => setSelectedLightboxImage(img)}
                className="group relative h-48 sm:h-64 rounded-xl overflow-hidden cursor-pointer shadow-md border border-cream-300"
              >
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-forest-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-white">
                  <span className="text-[10px] uppercase font-bold text-gold-400">{img.category}</span>
                  <p className="text-xs font-serif font-bold line-clamp-1">{img.title}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-forest-950 text-gold-300 hover:bg-forest-900 transition-colors shadow-md"
            >
              <span>Explore Complete Gallery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="py-20 bg-cream-100/70 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-600">
              Guest Impressions
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest-950 mt-1">
              Stories of Delight & Hospitality
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-cream-200 shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-1 text-gold-500 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-500" />
                    ))}
                  </div>
                  <p className="text-sm text-charcoal-700 font-light leading-relaxed italic">
                    "{t.comment}"
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-bold text-forest-950">{t.name}</h4>
                  <span className="text-xs text-charcoal-500">{t.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. LOCATION & HOW TO REACH */}
      <section className="py-16 bg-white border-t border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-600">
                Strategic Location
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-forest-950">
                Convenient Highway Destination
              </h3>
              <p className="text-sm text-charcoal-600 leading-relaxed font-light">
                Wedson Resort & Restaurant is conveniently positioned on the main highway at Ghatampur, Kanpur Nagar. Easily accessible for travelers between Kanpur, Hamirpur, Fatehpur, and Lucknow.
              </p>
              <div className="pt-2 text-xs text-charcoal-700 space-y-2">
                <p>📍 <strong>Address:</strong> Wedson Resorts, Main Highway, Ghatampur, Kanpur Nagar, UP - 209206</p>
                <p>⏱️ <strong>Operating Hours:</strong> 11:00 AM – 11:30 PM (Dining) | 24 Hours (Front Desk)</p>
                <p>📞 <strong>Direct Helpdesk:</strong> +91 98390 00000</p>
              </div>
            </div>

            <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-cream-300 shadow-md h-64 sm:h-80 bg-gray-100 relative">
              {/* Interactive Map Embed */}
              <iframe
                title="Wedson Resort Ghatampur Location"
                src="https://maps.google.com/maps?q=Ghatampur,Kanpur+Nagar,Uttar+Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 10. RESERVATION CALL TO ACTION BANNER */}
      <section className="py-20 bg-forest-950 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="/images/restaurant-interior.jpg" alt="Dining Hall Ambiance" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
            Celebrate With Us
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Ready to Experience Royalty at Wedson?
          </h2>
          <p className="text-sm sm:text-base text-cream-200/80 font-light max-w-2xl mx-auto leading-relaxed">
            Reserve your table for an evening of handcrafted dining or plan your next wedding milestone on our magnificent grounds.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenReserveTable}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-gold-500 to-gold-600 text-forest-950 shadow-xl hover:shadow-gold-glow hover:brightness-110 active:scale-95 transition-all"
            >
              Reserve a Dining Table
            </button>
            <button
              onClick={onOpenResortInquiry}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider border border-gold-400/60 text-gold-300 hover:bg-gold-500/10 active:scale-95 transition-all"
            >
              Inquire Resort & Lawns
            </button>
          </div>
        </div>
      </section>

      {/* Lightbox for gallery viewing */}
      {selectedLightboxImage && (
        <Lightbox
          image={selectedLightboxImage}
          onClose={() => setSelectedLightboxImage(null)}
        />
      )}
    </div>
  );
};

export default Home;

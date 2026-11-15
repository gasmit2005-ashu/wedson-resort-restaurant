import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Award, ShieldCheck, Heart, MapPin, Utensils, Hotel, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = ({ onOpenReserveTable, onOpenResortInquiry }) => {
  return (
    <div className="pt-24 min-h-screen bg-[#FAF7F2]">
      {/* Header Banner */}
      <section className="relative py-20 bg-forest-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img
            src="/images/resort-facade-day.jpg"
            alt="Wedson Resorts Architecture"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/70 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
            About Wedson Resort & Restaurant
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white mt-3 mb-6">
            Timeless Architecture. Heartfelt Hospitality.
          </h1>
          <p className="text-base sm:text-lg text-cream-200/80 max-w-2xl mx-auto font-light leading-relaxed">
            Discover the sanctuary where classical elegance, culinary passion, and warm Uttar Pradesh traditions converge in Ghatampur, Kanpur Nagar.
          </p>
        </div>
      </section>

      {/* Brand Story & Philosophy */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-600">
                Our Foundation
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest-950 leading-tight">
                Designed to Celebrate Every Special Moment
              </h2>
              <p className="text-base text-charcoal-700 leading-relaxed font-light">
                <strong>Wedson Resort & Restaurant</strong> was envisioned to fulfill the need for a truly premium, dignified hospitality property in Ghatampur and the wider Kanpur Nagar district.
              </p>
              <p className="text-base text-charcoal-700 leading-relaxed font-light">
                Our neoclassical architecture—distinguished by soaring pillars, carved friezes, and grand semi-circular stone steps—evokes a sense of palatial wonder. Inside, our spaces are intentionally curated to provide tranquility, refined comfort, and authentic gourmet experiences.
              </p>

              <div className="p-5 rounded-xl bg-cream-100 border border-gold-500/20 text-sm text-charcoal-800 leading-relaxed">
                <p className="font-serif font-bold text-forest-950 mb-1">Our Hospitality Philosophy:</p>
                <em>"Every guest entering our doors is welcomed with utmost warmth and reverence, ensuring their stay and dining experience becomes an enduring treasured memory."</em>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-gold-500/30 relative">
                <img
                  src="/images/restaurant-interior.jpg"
                  alt="Wedson Restaurant Dining Room"
                  className="w-full h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold">The Dining Room</span>
                  <p className="text-xl font-serif font-bold">Wedson Hotel & Resorts Signature Interior</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Verticals: The Resort & The Restaurant */}
      <section className="py-20 bg-forest-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* The Resort Experience */}
            <div className="p-8 sm:p-10 rounded-3xl bg-forest-900/60 border border-gold-500/30 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-forest-950 text-gold-400 flex items-center justify-center border border-gold-500/30">
                  <Hotel className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white">The Resort Experience</h3>
                <p className="text-sm text-cream-200/80 leading-relaxed font-light">
                  Sprawling landscaped green lawns bathed in night illumination, bespoke banquet setups, and boutique accommodations. Our suites feature luxurious tall tufted velvet headboards, ambient LED lighting, king bedding, and uninterrupted air-conditioned comfort.
                </p>
                <ul className="space-y-2 text-xs text-cream-200/80 pt-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-gold-400" />
                    <span>Lush Open-air Wedding & Reception Lawns</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-gold-400" />
                    <span>Luxury Executive & Deluxe Guest Rooms</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-gold-400" />
                    <span>24/7 Front Desk, Valet Parking & Power Backup</span>
                  </li>
                </ul>
              </div>
              <div className="pt-8">
                <button
                  onClick={onOpenResortInquiry}
                  className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-500 text-forest-950 hover:bg-gold-400 transition-colors"
                >
                  Inquire Resort Stay
                </button>
              </div>
            </div>

            {/* The Restaurant Experience */}
            <div className="p-8 sm:p-10 rounded-3xl bg-forest-900/60 border border-gold-500/30 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-forest-950 text-gold-400 flex items-center justify-center border border-gold-500/30">
                  <Utensils className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white">The Restaurant Experience</h3>
                <p className="text-sm text-cream-200/80 leading-relaxed font-light">
                  A grand dining hall characterized by warm golden pendant glow, plush caramel armchairs, and the official Wedson crest. Our culinary artisans specialize in slow-simmered Awadhi gravies, charcoal-roasted tandoori delicacies, oriental Chinese stir-fries, and decadent sweets.
                </p>
                <ul className="space-y-2 text-xs text-cream-200/80 pt-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-gold-400" />
                    <span>Multi-Cuisine Vegetarian & Non-Vegetarian Delicacies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-gold-400" />
                    <span>Family Dining Tables & Cozy Semi-Private Booths</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-gold-400" />
                    <span>Handcrafted Refreshments, Mocktails & Desserts</span>
                  </li>
                </ul>
              </div>
              <div className="pt-8">
                <button
                  onClick={onOpenReserveTable}
                  className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-gold-500 to-gold-600 text-forest-950 hover:brightness-110 transition-all"
                >
                  Book Dining Table
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Stats */}
      <section className="py-16 bg-cream-50 border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl sm:text-5xl font-serif font-bold text-forest-950">25,000+</p>
              <p className="text-xs uppercase tracking-wider text-charcoal-600 mt-1 font-semibold">Delighted Guests</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-serif font-bold text-forest-950">350+</p>
              <p className="text-xs uppercase tracking-wider text-charcoal-600 mt-1 font-semibold">Weddings & Milestones</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-serif font-bold text-forest-950">120+</p>
              <p className="text-xs uppercase tracking-wider text-charcoal-600 mt-1 font-semibold">Gourmet Recipes</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-serif font-bold text-gold-600">4.9 ★</p>
              <p className="text-xs uppercase tracking-wider text-charcoal-600 mt-1 font-semibold">Verified Guest Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Photo Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-600">
            Real Property Imagery
          </span>
          <h2 className="text-3xl font-serif font-bold text-forest-950 mt-1 mb-10">
            Glimpses of Wedson Resort & Restaurant
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="h-60 rounded-xl overflow-hidden shadow-md">
              <img src="/images/resort-facade-day.jpg" alt="Neoclassical Facade" className="w-full h-full object-cover" />
            </div>
            <div className="h-60 rounded-xl overflow-hidden shadow-md">
              <img src="/images/restaurant-interior.jpg" alt="Dining Hall" className="w-full h-full object-cover" />
            </div>
            <div className="h-60 rounded-xl overflow-hidden shadow-md">
              <img src="/images/room-luxury-suite.jpg" alt="Executive Suite" className="w-full h-full object-cover" />
            </div>
            <div className="h-60 rounded-xl overflow-hidden shadow-md">
              <img src="/images/resort-lawns-night.jpg" alt="Night Lawns" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

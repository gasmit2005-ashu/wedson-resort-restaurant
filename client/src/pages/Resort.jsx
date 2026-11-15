import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Hotel, Sparkles, Calendar, Users, MapPin, Check, Car, Zap, Wifi, Shield, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { resortService } from '../services/api';
import { useToast } from '../context/ToastContext';

const Resort = ({ onOpenResortInquiry }) => {
  const { success, error } = useToast();
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    checkIn: today,
    checkOut: tomorrow,
    guests: 2,
    roomPreference: 'Deluxe Luxury Suite',
    specialRequests: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone || !formData.checkIn || !formData.checkOut) {
      error('Please complete all mandatory inquiry details');
      return;
    }
    setLoading(true);
    try {
      const res = await resortService.createInquiry(formData);
      if (res.success) {
        setSubmitted(true);
        success('Resort stay / banquet inquiry received!');
      } else {
        error(res.message || 'Error submitting inquiry');
      }
    } catch (err) {
      error(err.response?.data?.message || 'Server error submitting inquiry');
    } finally {
      setLoading(false);
    }
  };

  const propertySpaces = [
    {
      title: 'Neoclassical Palace Venue',
      subtitle: 'The Grand Entrance & Reception',
      image: '/images/resort-facade-day.jpg',
      desc: 'Featuring magnificent classical pillars, carved pediments, arched tall glass panels, and expansive stone staircases. Perfect for regal arrival photography and monumental entry moments.'
    },
    {
      title: 'Expansive Wedding & Celebration Lawns',
      subtitle: 'Night Celebration Grounds',
      image: '/images/resort-lawns-night.jpg',
      desc: 'Sprawling natural green lawns equipped with extensive nighttime ambient lighting, illuminated gazebos, dedicated stage setups, and banquet dining pavilions accommodating up to 1,500 guests.'
    },
    {
      title: 'Executive Luxury Suites',
      subtitle: 'Boutique Room Accommodations',
      image: '/images/room-luxury-suite.jpg',
      desc: 'Boutique suites boasting ceiling-height padded velvet headboards, vertical warm LED light ribbons, plush king-size bedding with duvets, air conditioning, and peaceful sanctuary comfort.'
    },
    {
      title: 'Contemporary Entrance Tower',
      subtitle: 'Modern Architecture Lounge',
      image: '/images/resort-entrance-tower.jpg',
      desc: 'Towering multi-story architectural portal adorned with golden perimeter accents, structural grey louvers, glass foyer, and artistic vertical lighting tubes.'
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-[#FAF7F2]">
      {/* Hero Banner */}
      <section className="relative py-24 bg-forest-950 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/resort-facade-day.jpg"
            alt="Wedson Resorts Neoclassical Estate"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/70 to-black/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-forest-900/80 border border-gold-400/50 text-xs font-semibold uppercase tracking-widest text-gold-300 mb-4">
            <Hotel className="w-3.5 h-3.5 text-gold-400" />
            <span>Wedson Resorts • Ghatampur Kanpur Nagar</span>
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight mb-4">
            Palatial Stays & Royal Celebrations
          </h1>
          <p className="text-base sm:text-lg text-cream-200/90 max-w-2xl mx-auto font-light leading-relaxed">
            From serene boutique suites to vast illuminated party grounds, experience hospitality designed on a majestic scale.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href="#resort-inquiry-section"
              className="px-8 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-gold-500 to-gold-600 text-forest-950 shadow-xl hover:brightness-110 transition-all"
            >
              Inquire Room Stay / Lawn
            </a>
          </div>
        </div>
      </section>

      {/* Property Spaces Showcase */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-600">
              Verified Real Property
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest-950 mt-1">
              Spaces Designed For Grandeur & Comfort
            </h2>
            <p className="text-sm text-charcoal-600 mt-2 font-light">
              Explore the authentic grounds of Wedson Resorts in Ghatampur, Kanpur Nagar.
            </p>
          </div>

          <div className="space-y-16">
            {propertySpaces.map((space, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-gold-500/20 group">
                      <img
                        src={space.image}
                        alt={space.title}
                        className="w-full h-[360px] sm:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6 text-white">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gold-300 bg-forest-900/90 px-3 py-1 rounded border border-gold-400/40">
                          {space.subtitle}
                        </span>
                        <h4 className="text-2xl font-serif font-bold mt-2">{space.title}</h4>
                      </div>
                    </div>
                  </div>

                  <div className={`lg:col-span-5 space-y-4 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <span className="text-xs font-semibold uppercase tracking-widest text-gold-600">
                      Property Highlight #{idx + 1}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-forest-950">
                      {space.title}
                    </h3>
                    <p className="text-sm text-charcoal-700 leading-relaxed font-light">
                      {space.desc}
                    </p>
                    <div className="pt-2">
                      <a
                        href="#resort-inquiry-section"
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-forest-950 hover:text-gold-600 transition-colors"
                      >
                        <span>Check Availability For This Space</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-20 bg-forest-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
              Complete Hospitality Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">
              Verified Resort Infrastructure
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-forest-900/70 border border-gold-500/20 text-center space-y-2">
              <Car className="w-8 h-8 text-gold-400 mx-auto" />
              <h4 className="text-base font-serif font-bold text-white">250+ Valet Parking</h4>
              <p className="text-xs text-cream-200/70">Secure, paved on-site parking for heavy wedding crowds.</p>
            </div>

            <div className="p-6 rounded-2xl bg-forest-900/70 border border-gold-500/20 text-center space-y-2">
              <Zap className="w-8 h-8 text-gold-400 mx-auto" />
              <h4 className="text-base font-serif font-bold text-white">100% Dual Power Backup</h4>
              <p className="text-xs text-cream-200/70">Uninterrupted heavy generators for zero interruption.</p>
            </div>

            <div className="p-6 rounded-2xl bg-forest-900/70 border border-gold-500/20 text-center space-y-2">
              <Sparkles className="w-8 h-8 text-gold-400 mx-auto" />
              <h4 className="text-base font-serif font-bold text-white">Event Decoration & Audio</h4>
              <p className="text-xs text-cream-200/70">Catering stages, lighting truss, sound system support.</p>
            </div>

            <div className="p-6 rounded-2xl bg-forest-900/70 border border-gold-500/20 text-center space-y-2">
              <Shield className="w-8 h-8 text-gold-400 mx-auto" />
              <h4 className="text-base font-serif font-bold text-white">24/7 Security & Desk</h4>
              <p className="text-xs text-cream-200/70">CCTV surveillance, guard posts, and 24-hr guest helpdesk.</p>
            </div>
          </div>
        </div>
      </section>

      {/* EMBEDDED RESORT INQUIRY SECTION */}
      <section id="resort-inquiry-section" className="py-20 bg-cream-50 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-cream-300 shadow-xl relative overflow-hidden">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs uppercase tracking-widest text-gold-600 font-semibold flex items-center justify-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Custom Tariffs & Dates</span>
              </span>
              <h2 className="text-3xl font-serif font-bold text-forest-950 mt-1">
                Resort Stay & Event Inquiry
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-600 mt-2 font-light">
                Submit your inquiry directly to our resort manager. We will check live inventory and respond with tailored offers.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-forest-100 text-forest-800 mx-auto flex items-center justify-center border-2 border-gold-500">
                  <CheckCircle2 className="w-9 h-9 text-forest-700" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-forest-950">
                  Stay / Event Inquiry Received!
                </h3>
                <p className="text-sm text-charcoal-700 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.customerName}</strong>. Your stay inquiry for <strong>{formData.roomPreference}</strong> ({formData.checkIn} to {formData.checkOut}) has been dispatched to the reception team.
                </p>
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 text-left max-w-md mx-auto flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                  <span>
                    Your inquiry is currently in <em>Pending</em> review status. Our coordinator will contact you at <strong>{formData.phone}</strong>.
                  </span>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-forest-950 text-gold-300 hover:bg-forest-900 transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      required
                      value={formData.customerName}
                      onChange={handleChange}
                      placeholder="e.g. Rakesh Tripathi"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-1.5">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98390 XXXXX"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-1.5">
                      Check-In Date *
                    </label>
                    <input
                      type="date"
                      name="checkIn"
                      required
                      value={formData.checkIn}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-1.5">
                      Check-Out Date *
                    </label>
                    <input
                      type="date"
                      name="checkOut"
                      required
                      value={formData.checkOut}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-1.5">
                      Total Guests *
                    </label>
                    <input
                      type="number"
                      min="1"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-1.5">
                      Select Space / Room Type
                    </label>
                    <select
                      name="roomPreference"
                      value={formData.roomPreference}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500 bg-white"
                    >
                      <option value="Deluxe Luxury Suite">Deluxe Luxury Suite (King Bed)</option>
                      <option value="Executive Family Suite">Executive Family Suite</option>
                      <option value="Grand Wedding Lawn & Banquet">Grand Wedding Lawn & Banquet</option>
                      <option value="Celebration / Party Event">Celebration / Party Event</option>
                      <option value="Corporate Retreat / Conference">Corporate Retreat / Conference</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="yourname@gmail.com"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-1.5">
                    Special Inquiries or Function Details
                  </label>
                  <textarea
                    name="specialRequests"
                    rows="2"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    placeholder="e.g. Expected wedding attendee count, stage requirement, room count..."
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-forest-950 text-gold-300 hover:bg-forest-900 border border-gold-500/40 shadow-lg transition-all"
                  >
                    {loading ? 'Transmitting Details...' : 'Submit Resort Inquiry'}
                  </button>
                  <p className="text-[11px] text-center text-charcoal-500 mt-2">
                    Inquiries are handled directly by Wedson Resort Front Desk.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resort;

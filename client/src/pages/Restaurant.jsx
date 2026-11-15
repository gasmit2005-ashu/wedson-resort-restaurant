import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Clock, Users, Wine, Calendar, CheckCircle2, ShieldAlert, Award, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';
import { reservationService } from '../services/api';
import { useToast } from '../context/ToastContext';

const Restaurant = ({ onOpenReserveTable }) => {
  const { success, error } = useToast();
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    time: '20:00',
    guests: 4,
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
    if (!formData.customerName || !formData.phone || !formData.date || !formData.time) {
      error('Please complete all required fields');
      return;
    }
    setLoading(true);
    try {
      const res = await reservationService.create(formData);
      if (res.success) {
        setSubmitted(true);
        success('Table reservation request sent successfully!');
      } else {
        error(res.message || 'Error booking table');
      }
    } catch (err) {
      error(err.response?.data?.message || 'Server error submitting reservation');
    } finally {
      setLoading(false);
    }
  };

  const diningFeatures = [
    { title: 'Signature Multi-Cuisine', desc: 'Awadhi specialties, North Indian gravies, authentic clay-oven tandoor & oriental Chinese.' },
    { title: 'Golden Ambient Lighting', desc: 'Custom amber pendant drops and cozy recessed coves creating an inviting, royal atmosphere.' },
    { title: 'Plush Velvet Seating', desc: 'High-comfort armchairs and spacious dining tables designed for relaxed family celebrations.' },
    { title: 'Fresh Artisanal Ingredients', desc: 'Daily handpicked farm-fresh produce and slow-simmered whole spices ground in-house.' }
  ];

  const menuCategoriesPreview = [
    { name: 'Starters', desc: 'Smoky Paneer Tikka, Crispy Corn, Hara Bhara Kebab', count: '14 Dishes' },
    { name: 'Main Course', desc: 'Slow-simmered Dal Makhani, Paneer Butter Masala, Koftas', count: '18 Dishes' },
    { name: 'Indian & Breads', desc: 'Dum Biryani Handi, Garlic Naan, Laccha Paratha', count: '12 Dishes' },
    { name: 'Chinese Special', desc: 'Chilli Paneer, Hakka Noodles, Manchurian, Rolls', count: '10 Dishes' },
    { name: 'Beverages', desc: 'Blue Lagoon, Virgin Mojito, Fresh Shakes, Masala Tea', count: '8 Dishes' },
    { name: 'Desserts', desc: 'Hot Gulab Jamun, Saffron Kulfi, Ice Cream Sundaes', count: '6 Dishes' }
  ];

  return (
    <div className="pt-24 min-h-screen bg-[#FAF7F2]">
      {/* Hero Banner with Actual Restaurant Interior */}
      <section className="relative py-24 bg-forest-950 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/restaurant-interior.jpg"
            alt="Wedson Restaurant Fine Dining Interior"
            className="w-full h-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/70 to-black/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-forest-900/80 border border-gold-400/50 text-xs font-semibold uppercase tracking-widest text-gold-300 mb-4">
            <Utensils className="w-3.5 h-3.5 text-gold-400" />
            <span>Wedson Hotel & Resorts • Fine Dining</span>
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight mb-4">
            An Exquisite Culinary Haven
          </h1>
          <p className="text-base sm:text-lg text-cream-200/90 max-w-2xl mx-auto font-light leading-relaxed">
            Where rich Awadhi heritage meets masterfully roasted spices, warm glowing chandeliers, and impeccable table service.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href="#book-table-section"
              className="px-8 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-gold-500 to-gold-600 text-forest-950 shadow-xl hover:brightness-110 transition-all"
            >
              Book a Dining Table
            </a>
            <Link
              to="/menu"
              className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider border border-gold-400/50 text-gold-300 hover:bg-gold-500/10 transition-colors"
            >
              Explore Full Food Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Verified Interior Photography & Ambiance Showcase */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-gold-500/30 group">
                <img
                  src="/images/restaurant-interior.jpg"
                  alt="Wedson Restaurant Interior with Brand Crest"
                  className="w-full h-[450px] sm:h-[550px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="inline-block px-3 py-1 rounded bg-forest-900/90 border border-gold-400/40 text-[10px] uppercase font-bold text-gold-300 mb-2">
                    Verified Interior Photography
                  </div>
                  <h3 className="text-2xl font-serif font-bold">The Main Dining Hall</h3>
                  <p className="text-xs text-cream-200/80 mt-1">
                    Featuring the Royal Wedson Crest, hanging warm lamps, mirrored niches, and comfortable plush caramel dining armchairs.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-600">
                Atmosphere & Ambiance
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest-950 leading-tight">
                Designed for Family Gatherings & Memorable Dinners
              </h2>
              <p className="text-sm text-charcoal-700 leading-relaxed font-light">
                Dining at Wedson is more than a meal—it is an ambiance carefully crafted to slow down time. Soft ambient yellow pendant lights illuminate your table, while the gentle aroma of char-grilled tandoori kebabs and slow-simmered handi gravies fills the room.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {diningFeatures.map((f, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white border border-cream-200 shadow-sm">
                    <h4 className="text-sm font-bold text-forest-950">{f.title}</h4>
                    <p className="text-xs text-charcoal-600 mt-1 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-forest-950 text-white flex items-center justify-between">
                <div>
                  <p className="text-xs text-gold-400 font-semibold uppercase">Dining Timing</p>
                  <p className="text-sm font-serif font-bold">11:00 AM – 11:30 PM (Daily)</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gold-400 font-semibold uppercase">Direct Orders</p>
                  <p className="text-sm font-serif font-bold">+91 98390 00000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Categories Highlight */}
      <section className="py-20 bg-cream-50 border-t border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-600">
              Gastronomic Variety
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-forest-950 mt-1">
              Curated Menu Categories
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-2">
              Every dish is freshly crafted upon order using authentic regional recipes and premium ingredients.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuCategoriesPreview.map((cat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-cream-300 shadow-sm hover:shadow-md hover:border-gold-400 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-serif font-bold text-forest-950">{cat.name}</h3>
                    <span className="text-[11px] font-semibold text-gold-600 bg-gold-50 px-2.5 py-0.5 rounded-full border border-gold-200">
                      {cat.count}
                    </span>
                  </div>
                  <p className="text-xs text-charcoal-600 leading-relaxed">{cat.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <Link
                    to="/menu"
                    className="text-xs font-bold uppercase tracking-wider text-forest-900 hover:text-gold-600 transition-colors"
                  >
                    View Dishes →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMBEDDED TABLE RESERVATION SECTION */}
      <section id="book-table-section" className="py-20 bg-forest-950 text-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-forest-900/90 rounded-3xl p-8 sm:p-12 border border-gold-500/40 shadow-2xl relative overflow-hidden">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold flex items-center justify-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Seamless Experience</span>
              </span>
              <h2 className="text-3xl font-serif font-bold text-white mt-1">
                Reserve Your Dining Table
              </h2>
              <p className="text-xs sm:text-sm text-cream-200/80 mt-2 font-light">
                Guarantee your table in advance for birthdays, anniversaries, corporate luncheons, or quiet family dinners.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-forest-950 text-gold-400 mx-auto flex items-center justify-center border-2 border-gold-500">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white">
                  Table Booking Request Received!
                </h3>
                <p className="text-sm text-cream-200/80 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.customerName}</strong>. Your inquiry for <strong>{formData.guests} guests</strong> on <strong>{formData.date} at {formData.time}</strong> is saved in our system.
                </p>
                <div className="p-4 rounded-xl bg-forest-950 border border-gold-500/30 text-xs text-gold-300 text-left max-w-md mx-auto flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                  <span>
                    Your reservation status is <em>Pending</em> until verified by our dining supervisor. We will call you at <strong>{formData.phone}</strong>.
                  </span>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold-500 text-forest-950 hover:bg-gold-400 transition-colors"
                >
                  Book Another Table
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-cream-200 uppercase tracking-wider mb-1.5">
                      Guest Name *
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      required
                      value={formData.customerName}
                      onChange={handleChange}
                      placeholder="e.g. Anand Sharma"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-forest-950 border border-gold-500/30 text-white placeholder-cream-200/40 focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-cream-200 uppercase tracking-wider mb-1.5">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98390 XXXXX"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-forest-950 border border-gold-500/30 text-white placeholder-cream-200/40 focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-cream-200 uppercase tracking-wider mb-1.5">
                      Reservation Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-forest-950 border border-gold-500/30 text-white focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-cream-200 uppercase tracking-wider mb-1.5">
                      Preferred Time *
                    </label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-forest-950 border border-gold-500/30 text-white focus:outline-none focus:border-gold-400"
                    >
                      <option value="12:30 PM">12:30 PM (Lunch)</option>
                      <option value="01:30 PM">01:30 PM (Lunch)</option>
                      <option value="02:30 PM">02:30 PM (Lunch)</option>
                      <option value="07:30 PM">07:30 PM (Dinner)</option>
                      <option value="08:00 PM">08:00 PM (Dinner)</option>
                      <option value="08:30 PM">08:30 PM (Dinner)</option>
                      <option value="09:00 PM">09:00 PM (Dinner)</option>
                      <option value="09:30 PM">09:30 PM (Dinner)</option>
                      <option value="10:00 PM">10:00 PM (Dinner)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-cream-200 uppercase tracking-wider mb-1.5">
                      Guests Count *
                    </label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-forest-950 border border-gold-500/30 text-white focus:outline-none focus:border-gold-400"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20].map((num) => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-cream-200 uppercase tracking-wider mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="yourname@gmail.com"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-forest-950 border border-gold-500/30 text-white placeholder-cream-200/40 focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-cream-200 uppercase tracking-wider mb-1.5">
                    Special Seating or Dietary Requests
                  </label>
                  <textarea
                    name="specialRequests"
                    rows="2"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    placeholder="e.g. Jain food options, birthday cake arrangement, quiet table..."
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-forest-950 border border-gold-500/30 text-white placeholder-cream-200/40 focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-gold-500 to-gold-600 text-forest-950 hover:brightness-110 shadow-xl transition-all"
                  >
                    {loading ? 'Submitting Reservation...' : 'Submit Table Reservation Inquiry'}
                  </button>
                  <p className="text-[11px] text-center text-cream-200/60 mt-2">
                    Reservations are confirmed upon manager review. No payment needed online.
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

export default Restaurant;

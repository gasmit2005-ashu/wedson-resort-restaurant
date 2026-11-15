import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Utensils, Sparkles, Filter, Check, Flame, Clock } from 'lucide-react';
import { menuService } from '../services/api';

const Menu = ({ onOpenReserveTable }) => {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState('all'); // all, veg, non-veg
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const [catsRes, itemsRes] = await Promise.all([
          menuService.getCategories(),
          menuService.getAll({})
        ]);
        if (catsRes.success) {
          setCategories(catsRes.data);
        }
        if (itemsRes.success) {
          setMenuItems(itemsRes.data);
        }
      } catch (err) {
        console.error('Error fetching menu:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenuData();
  }, []);

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      activeCategory === 'All' || item.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiet =
      dietaryFilter === 'all' || item.dietaryTag === dietaryFilter;

    return matchesCategory && matchesSearch && matchesDiet;
  });

  return (
    <div className="pt-24 min-h-screen bg-[#FAF7F2]">
      {/* Header Banner */}
      <section className="relative py-20 bg-forest-950 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/restaurant-interior.jpg"
            alt="Wedson Dining Room"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/70 to-black/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-forest-900/80 border border-gold-400/50 text-xs font-semibold uppercase tracking-widest text-gold-300 mb-4">
            <Utensils className="w-3.5 h-3.5 text-gold-400" />
            <span>Master Chef Selection</span>
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight mb-4">
            Our Culinary Repertoire
          </h1>
          <p className="text-base sm:text-lg text-cream-200/90 max-w-2xl mx-auto font-light leading-relaxed">
            Freshly prepared with authentic whole spices, slow-cooking Awadhi traditions, and clay-oven roasting.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="py-8 bg-white border-b border-cream-200 sticky top-16 z-30 shadow-sm backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-gold-600 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search dishes or ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-full border border-cream-300 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500 bg-cream-50/50"
              />
            </div>

            {/* Category Pills Slider */}
            <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              <button
                onClick={() => setActiveCategory('All')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                  activeCategory === 'All'
                    ? 'bg-forest-950 text-gold-300 shadow-sm'
                    : 'bg-cream-100 text-charcoal-700 hover:bg-cream-200'
                }`}
              >
                All Dishes
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                    activeCategory === cat.name
                      ? 'bg-forest-950 text-gold-300 shadow-sm'
                      : 'bg-cream-100 text-charcoal-700 hover:bg-cream-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Veg / Non-Veg Toggle */}
            <div className="flex items-center space-x-1.5 bg-cream-100 p-1 rounded-full text-xs font-medium">
              <button
                onClick={() => setDietaryFilter('all')}
                className={`px-3 py-1 rounded-full transition-all ${
                  dietaryFilter === 'all' ? 'bg-white text-forest-950 shadow-sm font-semibold' : 'text-charcoal-600'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setDietaryFilter('veg')}
                className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all ${
                  dietaryFilter === 'veg' ? 'bg-green-700 text-white shadow-sm font-semibold' : 'text-charcoal-600'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-white" />
                <span>Veg</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dishes Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-24">
              <div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm font-serif text-forest-950">Loading Chef's Menu...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-cream-300 max-w-lg mx-auto p-8 shadow-sm">
              <Utensils className="w-12 h-12 text-gold-500 mx-auto mb-3" />
              <h3 className="text-xl font-serif font-bold text-forest-950">No Dishes Found</h3>
              <p className="text-xs text-charcoal-600 mt-2">
                We couldn't find any dishes matching "{searchQuery}". Try selecting another category or clear your search filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                  setDietaryFilter('all');
                }}
                className="mt-4 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-forest-950 text-gold-300"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((dish) => (
                <motion.div
                  layout
                  key={dish._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-2xl overflow-hidden border border-cream-300 shadow-sm hover:shadow-xl hover:border-gold-400 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Dish Photo */}
                    <div className="relative h-48 overflow-hidden bg-forest-950">
                      <img
                        src={dish.image || '/images/restaurant-interior.jpg'}
                        alt={dish.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-forest-950/85 text-gold-300 border border-gold-500/30">
                          {dish.category}
                        </span>
                        {dish.dietaryTag === 'veg' && (
                          <span className="w-5 h-5 rounded bg-white flex items-center justify-center border border-green-600" title="Pure Veg">
                            <span className="w-2.5 h-2.5 rounded-full bg-green-600" />
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-forest-950/90 text-gold-400 font-serif font-bold text-sm border border-gold-400/40">
                        ₹{dish.price}
                      </div>
                    </div>

                    {/* Dish Details */}
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-lg font-serif font-bold text-forest-950 group-hover:text-gold-600 transition-colors">
                          {dish.name}
                        </h3>
                      </div>
                      <p className="text-xs text-charcoal-600 mt-2 leading-relaxed">
                        {dish.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] text-charcoal-500">
                      <Flame className="w-3.5 h-3.5 text-amber-600" />
                      <span>{dish.spiceLevel || 'Medium'} Spice</span>
                    </div>

                    <button
                      onClick={onOpenReserveTable}
                      className="px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-forest-950 text-gold-300 hover:bg-forest-900 transition-colors"
                    >
                      Dine In & Taste
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Reservation Sticky Callout */}
      <section className="py-12 bg-forest-950 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-serif font-bold text-white mb-2">
            Wish to Savor These Delicacies Today?
          </h3>
          <p className="text-xs sm:text-sm text-cream-200/80 mb-6 font-light">
            Book your table in our warm glowing dining hall. Walk-ins and table reservations are warmly welcomed.
          </p>
          <button
            onClick={onOpenReserveTable}
            className="px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-gold-500 to-gold-600 text-forest-950 shadow-lg hover:brightness-110 transition-all"
          >
            Reserve Your Dining Table
          </button>
        </div>
      </section>
    </div>
  );
};

export default Menu;

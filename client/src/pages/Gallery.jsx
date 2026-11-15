import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Maximize2, Tag } from 'lucide-react';
import { galleryService } from '../services/api';
import Lightbox from '../components/Lightbox';

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const categories = [
    'All',
    'Resort Exterior',
    'Restaurant & Dining',
    'Rooms & Suites',
    'Banquet & Lawns',
    'Architecture'
  ];

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await galleryService.getAll({});
        if (res.success) {
          setItems(res.data);
        }
      } catch (err) {
        console.error('Error fetching gallery:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filteredItems = items.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category.toLowerCase() === activeCategory.toLowerCase();
  });

  const currentIndex = selectedImage
    ? filteredItems.findIndex((i) => (i._id || i.imageUrl) === (selectedImage._id || selectedImage.imageUrl))
    : -1;

  const handleNext = () => {
    if (currentIndex < filteredItems.length - 1) {
      setSelectedImage(filteredItems[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedImage(filteredItems[currentIndex - 1]);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-[#FAF7F2]">
      {/* Hero Banner */}
      <section className="relative py-20 bg-forest-950 text-white overflow-hidden text-center">
        <div className="absolute inset-0 opacity-30">
          <img
            src="/images/resort-lawns-night.jpg"
            alt="Wedson Night Lawn Panorama"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/70 to-black/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-forest-900/80 border border-gold-400/50 text-xs font-semibold uppercase tracking-widest text-gold-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Visual Tour</span>
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight mb-4">
            Verified Property Gallery
          </h1>
          <p className="text-base sm:text-lg text-cream-200/90 max-w-2xl mx-auto font-light leading-relaxed">
            Every photograph is an authentic representation of Wedson Resort & Restaurant in Ghatampur, Kanpur Nagar.
          </p>
        </div>
      </section>

      {/* Category Filter Bar */}
      <section className="py-6 bg-white border-b border-cream-200 sticky top-16 z-30 shadow-sm backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-forest-950 text-gold-300 shadow-md scale-105'
                    : 'bg-cream-100 text-charcoal-700 hover:bg-cream-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry / Grid Gallery */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-24">
              <div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm font-serif text-forest-950">Loading Gallery Images...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-cream-300 max-w-md mx-auto p-8 shadow-sm">
              <h3 className="text-xl font-serif font-bold text-forest-950">No Images Found</h3>
              <p className="text-xs text-charcoal-600 mt-2">No photos in this category yet.</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {filteredItems.map((item, idx) => (
                <motion.div
                  layout
                  key={item._id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setSelectedImage(item)}
                  className="group relative break-inside-avoid rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-cream-300 bg-forest-950 cursor-pointer"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-gold-400 mb-1">
                      <Tag className="w-3 h-3" />
                      <span>{item.category}</span>
                    </span>
                    <h3 className="text-lg font-serif font-bold leading-snug">{item.title}</h3>
                    {item.caption && (
                      <p className="text-xs text-cream-200/80 mt-1 line-clamp-2 font-light">
                        {item.caption}
                      </p>
                    )}
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-gold-300 font-semibold">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Click to view full screen</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <Lightbox
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onNext={handleNext}
          onPrev={handlePrev}
          hasNext={currentIndex < filteredItems.length - 1}
          hasPrev={currentIndex > 0}
        />
      )}
    </div>
  );
};

export default Gallery;

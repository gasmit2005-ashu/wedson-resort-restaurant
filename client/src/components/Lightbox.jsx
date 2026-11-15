import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Tag } from 'lucide-react';

const Lightbox = ({ image, onClose, onNext, onPrev, hasNext, hasPrev }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!image) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/95 backdrop-blur-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 w-11 h-11 rounded-full bg-forest-900/80 border border-gold-500/40 text-gold-300 hover:text-white hover:bg-forest-800 flex items-center justify-center shadow-2xl transition-colors"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Previous Button */}
        {hasPrev && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-forest-900/80 border border-gold-500/40 text-gold-300 hover:text-white hover:bg-forest-800 flex items-center justify-center shadow-2xl transition-colors"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
        )}

        {/* Next Button */}
        {hasNext && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-forest-900/80 border border-gold-500/40 text-gold-300 hover:text-white hover:bg-forest-800 flex items-center justify-center shadow-2xl transition-colors"
            aria-label="Next Image"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        )}

        {/* Main Image Container */}
        <motion.div
          key={image.imageUrl || image._id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="relative max-w-5xl max-h-[85vh] flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative rounded-2xl overflow-hidden border border-gold-500/30 shadow-2xl bg-black">
            <img
              src={image.imageUrl}
              alt={image.title}
              className="max-h-[70vh] w-auto object-contain mx-auto select-none"
            />
          </div>

          <div className="mt-4 text-center max-w-2xl px-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-400/40 text-[11px] font-semibold uppercase tracking-wider text-gold-300 mb-2">
              <Tag className="w-3 h-3" />
              <span>{image.category}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
              {image.title}
            </h3>
            {image.caption && (
              <p className="text-sm text-cream-200/80 mt-1 font-light leading-relaxed">
                {image.caption}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Lightbox;

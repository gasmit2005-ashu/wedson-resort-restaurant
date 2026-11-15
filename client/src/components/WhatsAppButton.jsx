import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

const WhatsAppButton = ({ phoneNumber = '919839000000', defaultMessage = 'Hello Wedson Resort & Restaurant, I would like to inquire about reservation and booking details.' }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3">
      {/* Tooltip bubble */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.95 }}
            className="hidden sm:flex items-center bg-forest-950 text-white text-xs py-2 px-3.5 rounded-xl border border-gold-400/40 shadow-2xl space-x-2"
          >
            <span>Chat on WhatsApp with Wedson Desk</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="text-white/60 hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="relative group w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform duration-200 focus:outline-none"
        aria-label="Chat on WhatsApp"
        whileHover={{ rotate: 10 }}
      >
        {/* Radar ping rings */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none" />
        <MessageCircle className="w-7 h-7 fill-white stroke-none relative z-10" />

        {/* Small badge */}
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-gold-400 border-2 border-forest-950 rounded-full" />
      </motion.a>
    </div>
  );
};

export default WhatsAppButton;

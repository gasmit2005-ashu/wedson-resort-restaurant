import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ light = false, compact = false }) => {
  return (
    <Link to="/" className="flex items-center gap-3 group focus:outline-none">
      {/* Royal Crest Monogram Icon */}
      <div className="relative flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-xl bg-forest-900 border border-gold-500/50 shadow-md transition-transform duration-300 group-hover:scale-105">
        <svg viewBox="0 0 100 100" className="w-8 h-8" fill="none">
          {/* Subtle Outer Ring */}
          <circle cx="50" cy="50" r="44" stroke="#C8A45D" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          {/* Crown */}
          <path d="M35 34 L42 26 L50 32 L58 26 L65 34 Z" fill="#C8A45D" />
          <circle cx="50" cy="22" r="3" fill="#E8CF94" />
          <circle cx="41" cy="24" r="2.2" fill="#E8CF94" />
          <circle cx="59" cy="24" r="2.2" fill="#E8CF94" />
          {/* Oval W */}
          <ellipse cx="50" cy="54" rx="23" ry="21" stroke="#C8A45D" strokeWidth="1.8" />
          <text
            x="50"
            y="62"
            fontFamily="'Playfair Display', Georgia, serif"
            fontSize="24"
            fontWeight="700"
            fill="#E8CF94"
            textAnchor="middle"
          >
            W
          </text>
        </svg>
      </div>

      {!compact && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className={`font-serif text-xl sm:text-2xl font-bold tracking-wider uppercase transition-colors ${
              light ? 'text-white group-hover:text-gold-300' : 'text-forest-950 group-hover:text-gold-600'
            }`}>
              WEDSON
            </span>
          </div>
          <span className={`text-[10px] uppercase tracking-[0.25em] font-medium ${
            light ? 'text-gold-400' : 'text-gold-600'
          }`}>
            Hotel & Resorts • Restaurant
          </span>
        </div>
      )}
    </Link>
  );
};

export default Logo;

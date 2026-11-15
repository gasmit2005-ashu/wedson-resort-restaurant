const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Wedson Resort & Restaurant'
  },
  headline: {
    type: String,
    default: 'Experience Comfort. Discover Flavours.'
  },
  subheadline: {
    type: String,
    default: 'Welcome to Wedson Resort & Restaurant, where memorable experiences, delightful dining, and warm hospitality come together.'
  },
  address: {
    type: String,
    default: 'Ghatampur, Kanpur Nagar, Uttar Pradesh - 209206'
  },
  phone: {
    type: String,
    default: '+91 98765 43210'
  },
  whatsapp: {
    type: String,
    default: '+91 98765 43210'
  },
  email: {
    type: String,
    default: 'info@wedsonresort.com'
  },
  operatingHours: {
    restaurant: {
      type: String,
      default: '11:00 AM – 11:30 PM (Daily)'
    },
    resortCheckIn: {
      type: String,
      default: 'Check-in: 12:00 PM | Check-out: 11:00 AM'
    },
    frontDesk: {
      type: String,
      default: '24 Hours Open'
    }
  },
  socialLinks: {
    facebook: { type: String, default: 'https://facebook.com' },
    instagram: { type: String, default: 'https://instagram.com' },
    youtube: { type: String, default: 'https://youtube.com' },
    maps: { type: String, default: 'https://maps.google.com' }
  },
  stats: {
    happyGuests: { type: String, default: '25,000+' },
    eventsHosted: { type: String, default: '350+' },
    delicaciesServed: { type: String, default: '120+' },
    guestRating: { type: String, default: '4.9 ★' }
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);

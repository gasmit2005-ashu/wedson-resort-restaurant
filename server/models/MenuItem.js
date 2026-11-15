const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    trim: true,
    enum: ['Starters', 'Main Course', 'Chinese', 'Indian', 'Snacks', 'Beverages', 'Desserts', 'Tandoori Special']
  },
  image: {
    type: String,
    default: '/images/restaurant-interior.jpg'
  },
  dietaryTag: {
    type: String,
    enum: ['veg', 'non-veg', 'jain'],
    default: 'veg'
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  spiceLevel: {
    type: String,
    enum: ['Mild', 'Medium', 'Spicy'],
    default: 'Medium'
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('MenuItem', menuItemSchema);

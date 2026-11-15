const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  caption: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: true,
    enum: ['Resort Exterior', 'Restaurant & Dining', 'Rooms & Suites', 'Banquet & Lawns', 'Architecture', 'Night Illumination']
  },
  imageUrl: {
    type: String,
    required: true
  },
  isFeatured: {
    type: Boolean,
    default: false
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

module.exports = mongoose.model('GalleryItem', galleryItemSchema);

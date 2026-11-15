const mongoose = require('mongoose');
const GalleryItem = require('../models/GalleryItem');
const { getStore, updateStore } = require('../config/store');

// GET all gallery items
const getGalleryItems = async (req, res) => {
  try {
    const { category } = req.query;

    if (mongoose.connection.readyState === 1) {
      let query = {};
      if (category && category !== 'All') {
        query.category = category;
      }
      const items = await GalleryItem.find(query).sort({ displayOrder: 1, createdAt: -1 });
      return res.json({ success: true, count: items.length, data: items });
    }

    const store = getStore();
    let list = [...store.gallery];
    if (category && category !== 'All') {
      list = list.filter(g => g.category.toLowerCase() === category.toLowerCase());
    }
    return res.json({ success: true, count: list.length, data: list });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ADD gallery image (Admin)
const createGalleryItem = async (req, res) => {
  try {
    const { title, caption, category, imageUrl, isFeatured } = req.body;

    if (!title || !imageUrl || !category) {
      return res.status(400).json({ success: false, message: 'Title, category and image URL are required' });
    }

    if (mongoose.connection.readyState === 1) {
      const item = await GalleryItem.create({
        title,
        caption: caption || '',
        category,
        imageUrl,
        isFeatured: Boolean(isFeatured)
      });
      return res.status(201).json({ success: true, data: item });
    }

    const newItem = {
      _id: 'gal_' + Date.now(),
      title,
      caption: caption || '',
      category,
      imageUrl,
      isFeatured: Boolean(isFeatured),
      displayOrder: 99,
      createdAt: new Date().toISOString()
    };

    updateStore(s => s.gallery.unshift(newItem));
    return res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE gallery item (Admin)
const updateGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      const item = await GalleryItem.findByIdAndUpdate(id, req.body, { new: true });
      if (!item) return res.status(404).json({ success: false, message: 'Gallery item not found' });
      return res.json({ success: true, data: item });
    }

    let updated = null;
    updateStore(s => {
      const idx = s.gallery.findIndex(g => String(g._id) === String(id));
      if (idx !== -1) {
        s.gallery[idx] = { ...s.gallery[idx], ...req.body };
        updated = s.gallery[idx];
      }
    });

    if (!updated) return res.status(404).json({ success: false, message: 'Gallery item not found' });
    return res.json({ success: true, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE gallery item (Admin)
const deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      const item = await GalleryItem.findByIdAndDelete(id);
      if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
      return res.json({ success: true, message: 'Gallery photo deleted' });
    }

    let found = false;
    updateStore(s => {
      const initLen = s.gallery.length;
      s.gallery = s.gallery.filter(g => String(g._id) !== String(id));
      if (s.gallery.length !== initLen) found = true;
    });

    if (!found) return res.status(404).json({ success: false, message: 'Item not found' });
    return res.json({ success: true, message: 'Gallery photo deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
};

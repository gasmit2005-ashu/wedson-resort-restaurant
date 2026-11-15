const mongoose = require('mongoose');
const MenuItem = require('../models/MenuItem');
const MenuCategory = require('../models/MenuCategory');
const { getStore, updateStore } = require('../config/store');

// GET all menu items
const getMenuItems = async (req, res) => {
  try {
    const { category, search, dietaryTag } = req.query;

    if (mongoose.connection.readyState === 1) {
      let query = {};
      if (category && category !== 'All') {
        query.category = category;
      }
      if (dietaryTag) {
        query.dietaryTag = dietaryTag;
      }
      if (search) {
        query.name = { $regex: search, $options: 'i' };
      }
      const items = await MenuItem.find(query).sort({ displayOrder: 1, createdAt: -1 });
      return res.json({ success: true, count: items.length, data: items });
    }

    // Fallback store
    const store = getStore();
    let items = [...store.menuItems];
    if (category && category !== 'All') {
      items = items.filter(i => i.category.toLowerCase() === category.toLowerCase());
    }
    if (dietaryTag) {
      items = items.filter(i => i.dietaryTag === dietaryTag);
    }
    if (search) {
      items = items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.description.toLowerCase().includes(search.toLowerCase()));
    }
    return res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET categories
const getCategories = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const categories = await MenuCategory.find({ isActive: true }).sort({ displayOrder: 1 });
      return res.json({ success: true, count: categories.length, data: categories });
    }
    const store = getStore();
    return res.json({ success: true, count: store.categories.length, data: store.categories.filter(c => c.isActive) });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// CREATE menu item (Admin)
const createMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, dietaryTag, isAvailable, isFeatured, spiceLevel, image } = req.body;
    if (!name || !price || !category) {
      return res.status(400).json({ success: false, message: 'Name, price, and category are required' });
    }

    if (mongoose.connection.readyState === 1) {
      const item = await MenuItem.create({
        name,
        description: description || '',
        price: Number(price),
        category,
        dietaryTag: dietaryTag || 'veg',
        isAvailable: isAvailable !== undefined ? isAvailable : true,
        isFeatured: Boolean(isFeatured),
        spiceLevel: spiceLevel || 'Medium',
        image: image || '/images/restaurant-interior.jpg'
      });
      return res.status(201).json({ success: true, data: item });
    }

    const newItem = {
      _id: 'menu_' + Date.now(),
      name,
      description: description || '',
      price: Number(price),
      category,
      dietaryTag: dietaryTag || 'veg',
      isAvailable: isAvailable !== undefined ? isAvailable : true,
      isFeatured: Boolean(isFeatured),
      spiceLevel: spiceLevel || 'Medium',
      image: image || '/images/restaurant-interior.jpg',
      createdAt: new Date().toISOString()
    };

    updateStore((s) => {
      s.menuItems.unshift(newItem);
    });

    return res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE menu item (Admin)
const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      const item = await MenuItem.findByIdAndUpdate(id, req.body, { new: true });
      if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
      return res.json({ success: true, data: item });
    }

    let updatedItem = null;
    updateStore((s) => {
      const idx = s.menuItems.findIndex(i => String(i._id) === String(id));
      if (idx !== -1) {
        s.menuItems[idx] = { ...s.menuItems[idx], ...req.body };
        updatedItem = s.menuItems[idx];
      }
    });

    if (!updatedItem) return res.status(404).json({ success: false, message: 'Item not found' });
    return res.json({ success: true, data: updatedItem });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE menu item (Admin)
const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      const item = await MenuItem.findByIdAndDelete(id);
      if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
      return res.json({ success: true, message: 'Menu item deleted successfully' });
    }

    let found = false;
    updateStore((s) => {
      const initLen = s.menuItems.length;
      s.menuItems = s.menuItems.filter(i => String(i._id) !== String(id));
      if (s.menuItems.length !== initLen) found = true;
    });

    if (!found) return res.status(404).json({ success: false, message: 'Item not found' });
    return res.json({ success: true, message: 'Menu item deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// CREATE category (Admin)
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Category name is required' });
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (mongoose.connection.readyState === 1) {
      const cat = await MenuCategory.create({ name, slug, description: description || '' });
      return res.status(201).json({ success: true, data: cat });
    }

    const newCat = {
      _id: 'cat_' + Date.now(),
      name,
      slug,
      description: description || '',
      displayOrder: 99,
      isActive: true,
      createdAt: new Date().toISOString()
    };
    updateStore(s => s.categories.push(newCat));
    return res.status(201).json({ success: true, data: newCat });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getMenuItems,
  getCategories,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  createCategory
};

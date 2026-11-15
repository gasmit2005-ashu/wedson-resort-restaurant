const mongoose = require('mongoose');
const SiteSettings = require('../models/SiteSettings');
const { getStore, updateStore } = require('../config/store');

// GET settings (Public)
const getSettings = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      let settings = await SiteSettings.findOne();
      if (!settings) {
        settings = await SiteSettings.create({});
      }
      return res.json({ success: true, data: settings });
    }
    const store = getStore();
    return res.json({ success: true, data: store.settings });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE settings (Admin)
const updateSettings = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      let settings = await SiteSettings.findOne();
      if (!settings) {
        settings = await SiteSettings.create(req.body);
      } else {
        Object.assign(settings, req.body);
        settings.updatedAt = Date.now();
        await settings.save();
      }
      return res.json({ success: true, data: settings });
    }

    let updated = null;
    updateStore(s => {
      s.settings = { ...s.settings, ...req.body };
      updated = s.settings;
    });

    return res.json({ success: true, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getSettings, updateSettings };

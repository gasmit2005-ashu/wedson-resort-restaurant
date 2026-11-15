const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/User');
const { getStore, updateStore } = require('../config/store');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'wedson_luxury_hospitality_jwt_secret_key_2026_super_secure', {
    expiresIn: '30d'
  });
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check Mongoose if connected
    if (mongoose.connection.readyState === 1) {
      const user = await User.findOne({ email: cleanEmail });
      if (user && (await user.matchPassword(password))) {
        return res.json({
          success: true,
          token: generateToken(user._id),
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        });
      }
    }

    // Fallback store
    const store = getStore();
    const storeUser = store.users.find(u => u.email.toLowerCase() === cleanEmail);
    
    // Default admin fallback credential check
    if (cleanEmail === (process.env.ADMIN_EMAIL || 'admin@wedsonresort.com').toLowerCase()) {
      if (password === (process.env.ADMIN_PASSWORD || 'admin@wedson2026')) {
        return res.json({
          success: true,
          token: generateToken(storeUser ? storeUser._id : 'usr_admin_default'),
          user: {
            id: storeUser ? storeUser._id : 'usr_admin_default',
            name: storeUser ? storeUser.name : 'Wedson Administrator',
            email: cleanEmail,
            role: 'admin'
          }
        });
      }
    }

    if (storeUser) {
      const isMatch = await bcrypt.compare(password, storeUser.password);
      if (isMatch) {
        return res.json({
          success: true,
          token: generateToken(storeUser._id),
          user: {
            id: storeUser._id,
            name: storeUser.name,
            email: storeUser.email,
            role: storeUser.role
          }
        });
      }
    }

    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Server error during authentication' });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    if (req.user) {
      return res.json({ success: true, user: req.user });
    }
    const store = getStore();
    return res.json({ success: true, user: store.users[0] });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { login, getMe };

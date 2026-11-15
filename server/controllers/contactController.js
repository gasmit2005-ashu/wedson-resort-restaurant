const mongoose = require('mongoose');
const ContactMessage = require('../models/ContactMessage');
const { getStore, updateStore } = require('../config/store');

// CREATE contact message (Public)
const createContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email and message are required' });
    }

    if (mongoose.connection.readyState === 1) {
      const contact = await ContactMessage.create({
        name,
        email,
        phone: phone || '',
        subject: subject || 'General Inquiry',
        message,
        status: 'Unread'
      });
      return res.status(201).json({
        success: true,
        message: 'Your message has been sent successfully! Our executive will contact you shortly.',
        data: contact
      });
    }

    const newContact = {
      _id: 'cnt_' + Date.now(),
      name,
      email,
      phone: phone || '',
      subject: subject || 'General Inquiry',
      message,
      status: 'Unread',
      createdAt: new Date().toISOString()
    };

    updateStore(s => s.contacts.unshift(newContact));

    return res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully! Our executive will contact you shortly.',
      data: newContact
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET contact messages (Admin)
const getContacts = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const messages = await ContactMessage.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: messages.length, data: messages });
    }
    const store = getStore();
    return res.json({ success: true, count: store.contacts.length, data: store.contacts });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE contact status (Admin)
const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (mongoose.connection.readyState === 1) {
      const item = await ContactMessage.findByIdAndUpdate(id, { status }, { new: true });
      if (!item) return res.status(404).json({ success: false, message: 'Message not found' });
      return res.json({ success: true, data: item });
    }

    let updated = null;
    updateStore(s => {
      const idx = s.contacts.findIndex(c => String(c._id) === String(id));
      if (idx !== -1) {
        s.contacts[idx].status = status;
        updated = s.contacts[idx];
      }
    });

    if (!updated) return res.status(404).json({ success: false, message: 'Message not found' });
    return res.json({ success: true, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE contact message (Admin)
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      const item = await ContactMessage.findByIdAndDelete(id);
      if (!item) return res.status(404).json({ success: false, message: 'Message not found' });
      return res.json({ success: true, message: 'Message removed' });
    }

    let found = false;
    updateStore(s => {
      const initLen = s.contacts.length;
      s.contacts = s.contacts.filter(c => String(c._id) !== String(id));
      if (s.contacts.length !== initLen) found = true;
    });

    if (!found) return res.status(404).json({ success: false, message: 'Message not found' });
    return res.json({ success: true, message: 'Message removed' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createContact,
  getContacts,
  updateContactStatus,
  deleteContact
};

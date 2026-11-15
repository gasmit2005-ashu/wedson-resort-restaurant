const mongoose = require('mongoose');
const ResortInquiry = require('../models/ResortInquiry');
const { getStore, updateStore } = require('../config/store');

// CREATE resort inquiry (Public)
const createResortInquiry = async (req, res) => {
  try {
    const { customerName, phone, email, checkIn, checkOut, guests, roomPreference, specialRequests } = req.body;

    if (!customerName || !phone || !checkIn || !checkOut || !guests) {
      return res.status(400).json({ success: false, message: 'Please fill in all mandatory inquiry details' });
    }

    if (mongoose.connection.readyState === 1) {
      const inquiry = await ResortInquiry.create({
        customerName,
        phone,
        email: email || '',
        checkIn,
        checkOut,
        guests: Number(guests),
        roomPreference: roomPreference || 'Deluxe Luxury Room',
        specialRequests: specialRequests || '',
        status: 'Pending'
      });
      return res.status(201).json({
        success: true,
        message: 'Resort stay / event inquiry submitted! Our manager will connect with you with custom packages.',
        data: inquiry
      });
    }

    const newInq = {
      _id: 'inq_' + Date.now(),
      customerName,
      phone,
      email: email || '',
      checkIn,
      checkOut,
      guests: Number(guests),
      roomPreference: roomPreference || 'Deluxe Luxury Room',
      specialRequests: specialRequests || '',
      status: 'Pending',
      adminNotes: '',
      createdAt: new Date().toISOString()
    };

    updateStore(s => s.resortInquiries.unshift(newInq));

    return res.status(201).json({
      success: true,
      message: 'Resort stay / event inquiry submitted! Our manager will connect with you with custom packages.',
      data: newInq
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET all resort inquiries (Admin)
const getResortInquiries = async (req, res) => {
  try {
    const { status } = req.query;

    if (mongoose.connection.readyState === 1) {
      let query = {};
      if (status && status !== 'All') query.status = status;
      const inquiries = await ResortInquiry.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, count: inquiries.length, data: inquiries });
    }

    const store = getStore();
    let list = [...store.resortInquiries];
    if (status && status !== 'All') {
      list = list.filter(r => r.status.toLowerCase() === status.toLowerCase());
    }
    return res.json({ success: true, count: list.length, data: list });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE status (Admin)
const updateResortInquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    if (mongoose.connection.readyState === 1) {
      const updateData = {};
      if (status) updateData.status = status;
      if (adminNotes !== undefined) updateData.adminNotes = adminNotes;

      const item = await ResortInquiry.findByIdAndUpdate(id, updateData, { new: true });
      if (!item) return res.status(404).json({ success: false, message: 'Inquiry not found' });
      return res.json({ success: true, data: item });
    }

    let updated = null;
    updateStore(s => {
      const idx = s.resortInquiries.findIndex(r => String(r._id) === String(id));
      if (idx !== -1) {
        if (status) s.resortInquiries[idx].status = status;
        if (adminNotes !== undefined) s.resortInquiries[idx].adminNotes = adminNotes;
        updated = s.resortInquiries[idx];
      }
    });

    if (!updated) return res.status(404).json({ success: false, message: 'Inquiry not found' });
    return res.json({ success: true, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE inquiry (Admin)
const deleteResortInquiry = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      const item = await ResortInquiry.findByIdAndDelete(id);
      if (!item) return res.status(404).json({ success: false, message: 'Inquiry not found' });
      return res.json({ success: true, message: 'Inquiry removed' });
    }

    let found = false;
    updateStore(s => {
      const initLen = s.resortInquiries.length;
      s.resortInquiries = s.resortInquiries.filter(r => String(r._id) !== String(id));
      if (s.resortInquiries.length !== initLen) found = true;
    });

    if (!found) return res.status(404).json({ success: false, message: 'Inquiry not found' });
    return res.json({ success: true, message: 'Inquiry removed' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createResortInquiry,
  getResortInquiries,
  updateResortInquiryStatus,
  deleteResortInquiry
};

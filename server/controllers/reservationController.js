const mongoose = require('mongoose');
const Reservation = require('../models/Reservation');
const { getStore, updateStore } = require('../config/store');

// CREATE reservation (Public)
const createReservation = async (req, res) => {
  try {
    const { customerName, phone, email, date, time, guests, specialRequests } = req.body;

    if (!customerName || !phone || !date || !time || !guests) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    if (mongoose.connection.readyState === 1) {
      const reservation = await Reservation.create({
        customerName,
        phone,
        email: email || '',
        date,
        time,
        guests: Number(guests),
        specialRequests: specialRequests || '',
        status: 'Pending'
      });
      return res.status(201).json({
        success: true,
        message: 'Table reservation request received! Our guest relations team will confirm shortly.',
        data: reservation
      });
    }

    const newRes = {
      _id: 'res_' + Date.now(),
      customerName,
      phone,
      email: email || '',
      date,
      time,
      guests: Number(guests),
      specialRequests: specialRequests || '',
      status: 'Pending',
      tableNumber: '',
      adminNotes: '',
      createdAt: new Date().toISOString()
    };

    updateStore(s => s.reservations.unshift(newRes));

    return res.status(201).json({
      success: true,
      message: 'Table reservation request received! Our guest relations team will confirm shortly.',
      data: newRes
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET all reservations (Admin)
const getReservations = async (req, res) => {
  try {
    const { status } = req.query;

    if (mongoose.connection.readyState === 1) {
      let query = {};
      if (status && status !== 'All') query.status = status;
      const list = await Reservation.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, count: list.length, data: list });
    }

    const store = getStore();
    let list = [...store.reservations];
    if (status && status !== 'All') {
      list = list.filter(r => r.status.toLowerCase() === status.toLowerCase());
    }
    return res.json({ success: true, count: list.length, data: list });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE status (Admin)
const updateReservationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, tableNumber, adminNotes } = req.body;

    if (mongoose.connection.readyState === 1) {
      const updateData = {};
      if (status) updateData.status = status;
      if (tableNumber !== undefined) updateData.tableNumber = tableNumber;
      if (adminNotes !== undefined) updateData.adminNotes = adminNotes;

      const item = await Reservation.findByIdAndUpdate(id, updateData, { new: true });
      if (!item) return res.status(404).json({ success: false, message: 'Reservation not found' });
      return res.json({ success: true, data: item });
    }

    let updated = null;
    updateStore(s => {
      const idx = s.reservations.findIndex(r => String(r._id) === String(id));
      if (idx !== -1) {
        if (status) s.reservations[idx].status = status;
        if (tableNumber !== undefined) s.reservations[idx].tableNumber = tableNumber;
        if (adminNotes !== undefined) s.reservations[idx].adminNotes = adminNotes;
        updated = s.reservations[idx];
      }
    });

    if (!updated) return res.status(404).json({ success: false, message: 'Reservation not found' });
    return res.json({ success: true, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE reservation (Admin)
const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      const item = await Reservation.findByIdAndDelete(id);
      if (!item) return res.status(404).json({ success: false, message: 'Reservation not found' });
      return res.json({ success: true, message: 'Reservation removed' });
    }

    let found = false;
    updateStore(s => {
      const initial = s.reservations.length;
      s.reservations = s.reservations.filter(r => String(r._id) !== String(id));
      if (s.reservations.length !== initial) found = true;
    });

    if (!found) return res.status(404).json({ success: false, message: 'Reservation not found' });
    return res.json({ success: true, message: 'Reservation removed' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createReservation,
  getReservations,
  updateReservationStatus,
  deleteReservation
};

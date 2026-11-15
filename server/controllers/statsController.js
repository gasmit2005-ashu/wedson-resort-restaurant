const mongoose = require('mongoose');
const Reservation = require('../models/Reservation');
const ResortInquiry = require('../models/ResortInquiry');
const MenuItem = require('../models/MenuItem');
const GalleryItem = require('../models/GalleryItem');
const ContactMessage = require('../models/ContactMessage');
const { getStore } = require('../config/store');

const getDashboardStats = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const [totalReservations, pendingReservations, totalResortInquiries, pendingResortInquiries, totalMenuItems, totalGallery, unreadContacts] = await Promise.all([
        Reservation.countDocuments(),
        Reservation.countDocuments({ status: 'Pending' }),
        ResortInquiry.countDocuments(),
        ResortInquiry.countDocuments({ status: 'Pending' }),
        MenuItem.countDocuments(),
        GalleryItem.countDocuments(),
        ContactMessage.countDocuments({ status: 'Unread' })
      ]);

      const recentReservations = await Reservation.find().sort({ createdAt: -1 }).limit(5);
      const recentResortInquiries = await ResortInquiry.find().sort({ createdAt: -1 }).limit(5);

      return res.json({
        success: true,
        data: {
          totalReservations,
          pendingReservations,
          totalResortInquiries,
          pendingResortInquiries,
          totalInquiries: totalReservations + totalResortInquiries,
          totalMenuItems,
          totalGallery,
          unreadContacts,
          recentReservations,
          recentResortInquiries
        }
      });
    }

    const store = getStore();
    const totalReservations = store.reservations.length;
    const pendingReservations = store.reservations.filter(r => r.status === 'Pending').length;
    const totalResortInquiries = store.resortInquiries.length;
    const pendingResortInquiries = store.resortInquiries.filter(i => i.status === 'Pending').length;
    const totalMenuItems = store.menuItems.length;
    const totalGallery = store.gallery.length;
    const unreadContacts = store.contacts.filter(c => c.status === 'Unread').length;

    return res.json({
      success: true,
      data: {
        totalReservations,
        pendingReservations,
        totalResortInquiries,
        pendingResortInquiries,
        totalInquiries: totalReservations + totalResortInquiries,
        totalMenuItems,
        totalGallery,
        unreadContacts,
        recentReservations: store.reservations.slice(0, 5),
        recentResortInquiries: store.resortInquiries.slice(0, 5)
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getDashboardStats };

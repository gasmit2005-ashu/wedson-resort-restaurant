require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const MenuItem = require('../models/MenuItem');
const MenuCategory = require('../models/MenuCategory');
const GalleryItem = require('../models/GalleryItem');
const Reservation = require('../models/Reservation');
const ResortInquiry = require('../models/ResortInquiry');
const ContactMessage = require('../models/ContactMessage');
const SiteSettings = require('../models/SiteSettings');
const { getStore } = require('../config/store');

const seedData = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/wedson_resort';
  try {
    await mongoose.connect(uri);
    console.log('[Seed] Connected to MongoDB for seeding...');

    const store = getStore();

    // 1. Seed Admin
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@wedsonresort.com').toLowerCase();
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      await User.create({
        name: 'Wedson Administrator',
        email: adminEmail,
        password: process.env.ADMIN_PASSWORD || 'admin@wedson2026',
        role: 'admin'
      });
      console.log(`[Seed] Admin user created: ${adminEmail}`);
    } else {
      console.log(`[Seed] Admin user already exists: ${adminEmail}`);
    }

    // 2. Seed Categories
    for (const cat of store.categories) {
      const exists = await MenuCategory.findOne({ name: cat.name });
      if (!exists) {
        await MenuCategory.create({
          name: cat.name,
          slug: cat.slug,
          description: cat.description,
          displayOrder: cat.displayOrder,
          isActive: cat.isActive
        });
      }
    }
    console.log('[Seed] Menu categories verified.');

    // 3. Seed Menu Items
    for (const item of store.menuItems) {
      const exists = await MenuItem.findOne({ name: item.name });
      if (!exists) {
        await MenuItem.create({
          name: item.name,
          description: item.description,
          price: item.price,
          category: item.category,
          dietaryTag: item.dietaryTag,
          spiceLevel: item.spiceLevel,
          isAvailable: item.isAvailable,
          isFeatured: item.isFeatured,
          image: item.image,
          displayOrder: item.displayOrder
        });
      }
    }
    console.log('[Seed] Menu items verified.');

    // 4. Seed Gallery
    for (const gal of store.gallery) {
      const exists = await GalleryItem.findOne({ title: gal.title });
      if (!exists) {
        await GalleryItem.create({
          title: gal.title,
          caption: gal.caption,
          category: gal.category,
          imageUrl: gal.imageUrl,
          isFeatured: gal.isFeatured,
          displayOrder: gal.displayOrder
        });
      }
    }
    console.log('[Seed] Gallery items verified.');

    // 5. Seed Site Settings
    const existingSettings = await SiteSettings.findOne();
    if (!existingSettings) {
      await SiteSettings.create(store.settings);
      console.log('[Seed] Site settings created.');
    }

    // 6. Seed Reservations & Inquiries if empty
    const resCount = await Reservation.countDocuments();
    if (resCount === 0) {
      for (const r of store.reservations) {
        await Reservation.create({
          customerName: r.customerName,
          phone: r.phone,
          email: r.email,
          date: r.date,
          time: r.time,
          guests: r.guests,
          specialRequests: r.specialRequests,
          status: r.status,
          tableNumber: r.tableNumber,
          adminNotes: r.adminNotes
        });
      }
      console.log('[Seed] Sample reservations seeded.');
    }

    const inqCount = await ResortInquiry.countDocuments();
    if (inqCount === 0) {
      for (const i of store.resortInquiries) {
        await ResortInquiry.create({
          customerName: i.customerName,
          phone: i.phone,
          email: i.email,
          checkIn: i.checkIn,
          checkOut: i.checkOut,
          guests: i.guests,
          roomPreference: i.roomPreference,
          specialRequests: i.specialRequests,
          status: i.status,
          adminNotes: i.adminNotes
        });
      }
      console.log('[Seed] Sample resort inquiries seeded.');
    }

    const cntCount = await ContactMessage.countDocuments();
    if (cntCount === 0) {
      for (const c of store.contacts) {
        await ContactMessage.create({
          name: c.name,
          email: c.email,
          phone: c.phone,
          subject: c.subject,
          message: c.message,
          status: c.status
        });
      }
      console.log('[Seed] Sample contact messages seeded.');
    }

    console.log('[Seed] Database initialization complete!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error.message);
    process.exit(1);
  }
};

seedData();

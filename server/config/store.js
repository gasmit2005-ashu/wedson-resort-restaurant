const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dataFile = path.join(dataDir, 'localStore.json');

// Initial seed store
const initialData = {
  users: [
    {
      _id: 'usr_admin_001',
      name: 'Wedson Administrator',
      email: 'admin@wedsonresort.com',
      // bcrypt hash for "admin@wedson2026"
      password: '$2a$10$Q7wE6M48Ue1hV8/rT5HhfejF5sT6JpQ5Z2C0I8fE0W5T8Y8C5Z6Za',
      role: 'admin',
      createdAt: new Date().toISOString()
    }
  ],
  categories: [
    { _id: 'cat_01', name: 'Starters', slug: 'starters', description: 'Crispy, smoky appetisers to awaken your palate', displayOrder: 1, isActive: true },
    { _id: 'cat_02', name: 'Main Course', slug: 'main-course', description: 'Rich curries, dal makhani, and chef signatures', displayOrder: 2, isActive: true },
    { _id: 'cat_03', name: 'Tandoori Special', slug: 'tandoori-special', description: 'Clay oven delicacies roasted with authentic spices', displayOrder: 3, isActive: true },
    { _id: 'cat_04', name: 'Chinese', slug: 'chinese', description: 'Wok-tossed noodles, manchurian, and crispy rolls', displayOrder: 4, isActive: true },
    { _id: 'cat_05', name: 'Indian', slug: 'indian', description: 'Traditional aromatic thalis, biryanis and breads', displayOrder: 5, isActive: true },
    { _id: 'cat_06', name: 'Snacks', slug: 'snacks', description: 'Evening treats, fries, pakoras, and bites', displayOrder: 6, isActive: true },
    { _id: 'cat_07', name: 'Beverages', slug: 'beverages', description: 'Refreshing mocktails, fresh shakes, and hot beverages', displayOrder: 7, isActive: true },
    { _id: 'cat_08', name: 'Desserts', slug: 'desserts', description: 'Hot gulab jamun, royal kulfi, and sundae ice creams', displayOrder: 8, isActive: true }
  ],
  menuItems: [
    {
      _id: 'menu_01',
      name: 'Wedson Royal Paneer Tikka',
      description: 'Cubes of fresh cottage cheese marinated in hung curd, Kashmiri spices, and char-grilled in a traditional tandoor.',
      price: 320,
      category: 'Starters',
      dietaryTag: 'veg',
      spiceLevel: 'Medium',
      isAvailable: true,
      isFeatured: true,
      image: '/images/restaurant-interior.jpg',
      displayOrder: 1,
      createdAt: new Date().toISOString()
    },
    {
      _id: 'menu_02',
      name: 'Crispy Corn & Salt Pepper',
      description: 'Golden sweet corn kernels tossed with fresh spring onions, bell peppers, and crushed black peppercorns.',
      price: 240,
      category: 'Chinese',
      dietaryTag: 'veg',
      spiceLevel: 'Mild',
      isAvailable: true,
      isFeatured: true,
      image: '/images/restaurant-interior.jpg',
      displayOrder: 2,
      createdAt: new Date().toISOString()
    },
    {
      _id: 'menu_03',
      name: 'Wedson Special Dal Makhani',
      description: 'Slow-cooked black lentils simmered overnight over charcoal with rich butter, cream, and roasted spices.',
      price: 290,
      category: 'Main Course',
      dietaryTag: 'veg',
      spiceLevel: 'Mild',
      isAvailable: true,
      isFeatured: true,
      image: '/images/restaurant-interior.jpg',
      displayOrder: 3,
      createdAt: new Date().toISOString()
    },
    {
      _id: 'menu_04',
      name: 'Paneer Butter Masala Luxury',
      description: 'Soft cottage cheese simmered in a velvety makhani gravy enriched with cashew paste and fragrant kasuri methi.',
      price: 340,
      category: 'Main Course',
      dietaryTag: 'veg',
      spiceLevel: 'Medium',
      isAvailable: true,
      isFeatured: true,
      image: '/images/restaurant-interior.jpg',
      displayOrder: 4,
      createdAt: new Date().toISOString()
    },
    {
      _id: 'menu_05',
      name: 'Awadhi Dum Biryani Handi',
      description: 'Long-grain basmati rice layered with garden vegetables, saffron milk, caramelized onions, and sealed with dough in a clay pot.',
      price: 360,
      category: 'Indian',
      dietaryTag: 'veg',
      spiceLevel: 'Medium',
      isAvailable: true,
      isFeatured: true,
      image: '/images/restaurant-interior.jpg',
      displayOrder: 5,
      createdAt: new Date().toISOString()
    },
    {
      _id: 'menu_06',
      name: 'Chilli Paneer Dry / Gravy',
      description: 'Crispy batter-fried paneer wok-tossed with green chillies, garlic, capsicum, and oriental sauces.',
      price: 280,
      category: 'Chinese',
      dietaryTag: 'veg',
      spiceLevel: 'Spicy',
      isAvailable: true,
      isFeatured: true,
      image: '/images/restaurant-interior.jpg',
      displayOrder: 6,
      createdAt: new Date().toISOString()
    },
    {
      _id: 'menu_07',
      name: 'Signature Veg Hakka Noodles',
      description: 'Classic wok-tossed noodles with shredded cabbage, carrots, bell peppers, scallions, and light soya sauce.',
      price: 220,
      category: 'Chinese',
      dietaryTag: 'veg',
      spiceLevel: 'Mild',
      isAvailable: true,
      isFeatured: false,
      image: '/images/restaurant-interior.jpg',
      displayOrder: 7,
      createdAt: new Date().toISOString()
    },
    {
      _id: 'menu_08',
      name: 'Hara Bhara Kebab Platter',
      description: 'Delicate spinach, green peas, and potato patties seasoned with royal spices and pan-seared to golden perfection.',
      price: 260,
      category: 'Starters',
      dietaryTag: 'veg',
      spiceLevel: 'Mild',
      isAvailable: true,
      isFeatured: false,
      image: '/images/restaurant-interior.jpg',
      displayOrder: 8,
      createdAt: new Date().toISOString()
    },
    {
      _id: 'menu_09',
      name: 'Butter Naan & Garlic Roti Basket',
      description: 'Assorted tandoor-baked flatbreads brushed with clarified butter and sprinkled with roasted minced garlic.',
      price: 180,
      category: 'Indian',
      dietaryTag: 'veg',
      spiceLevel: 'Mild',
      isAvailable: true,
      isFeatured: false,
      image: '/images/restaurant-interior.jpg',
      displayOrder: 9,
      createdAt: new Date().toISOString()
    },
    {
      _id: 'menu_10',
      name: 'Wedson Sunrise Blue Lagoon Mocktail',
      description: 'Sparkling citrus mocktail with curacao syrup, freshly squeezed lime, and chilled soda topped with mint leaves.',
      price: 190,
      category: 'Beverages',
      dietaryTag: 'veg',
      spiceLevel: 'Mild',
      isAvailable: true,
      isFeatured: true,
      image: '/images/restaurant-interior.jpg',
      displayOrder: 10,
      createdAt: new Date().toISOString()
    },
    {
      _id: 'menu_11',
      name: 'Shahi Kesar Pista Kulfi',
      description: 'Traditional dense Indian milk ice cream infused with rich saffron strands, crushed pistachios, and cardamom.',
      price: 160,
      category: 'Desserts',
      dietaryTag: 'veg',
      spiceLevel: 'Mild',
      isAvailable: true,
      isFeatured: true,
      image: '/images/restaurant-interior.jpg',
      displayOrder: 11,
      createdAt: new Date().toISOString()
    },
    {
      _id: 'menu_12',
      name: 'Crispy Cheese Corn Spring Rolls',
      description: 'Golden rolls packed with melted mozzarella, sweet golden corn, and garden herbs, served with sweet chilli dip.',
      price: 250,
      category: 'Snacks',
      dietaryTag: 'veg',
      spiceLevel: 'Mild',
      isAvailable: true,
      isFeatured: false,
      image: '/images/restaurant-interior.jpg',
      displayOrder: 12,
      createdAt: new Date().toISOString()
    }
  ],
  gallery: [
    {
      _id: 'gal_01',
      title: 'Grand Neoclassical Palace Facade',
      caption: 'The majestic entrance of Wedson Resorts at Ghatampur Kanpur Nagar with monumental neoclassical columns and carved arches.',
      category: 'Resort Exterior',
      imageUrl: '/images/resort-facade-day.jpg',
      isFeatured: true,
      displayOrder: 1,
      createdAt: new Date().toISOString()
    },
    {
      _id: 'gal_02',
      title: 'Wedson Fine Dining Restaurant Hall',
      caption: 'Warm ambient lighting, designer pendant lamps, plush caramel armchairs, and the royal Wedson crest.',
      category: 'Restaurant & Dining',
      imageUrl: '/images/restaurant-interior.jpg',
      isFeatured: true,
      displayOrder: 2,
      createdAt: new Date().toISOString()
    },
    {
      _id: 'gal_03',
      title: 'Panoramic Night Lawn & Event Banquet',
      caption: 'Aerial nighttime vista of Wedson Resort expansive celebrations lawn, illuminated gazebos, and grand event pavilions.',
      category: 'Banquet & Lawns',
      imageUrl: '/images/resort-lawns-night.jpg',
      isFeatured: true,
      displayOrder: 3,
      createdAt: new Date().toISOString()
    },
    {
      _id: 'gal_04',
      title: 'Luxury King Suite & Boutique Interiors',
      caption: 'Executive guest suite featuring ceiling-height tufted velvet headboard, ambient strip LED lighting, and king-size bedding.',
      category: 'Rooms & Suites',
      imageUrl: '/images/room-luxury-suite.jpg',
      isFeatured: true,
      displayOrder: 4,
      createdAt: new Date().toISOString()
    },
    {
      _id: 'gal_05',
      title: 'Contemporary Entrance Tower & Lounge',
      caption: 'Modern architectural gateway featuring golden framing, dark structural glass, vertical architectural louvers, and glass lobby entrance.',
      category: 'Architecture',
      imageUrl: '/images/resort-entrance-tower.jpg',
      isFeatured: true,
      displayOrder: 5,
      createdAt: new Date().toISOString()
    }
  ],
  reservations: [
    {
      _id: 'res_01',
      customerName: 'Vikramaditya Sharma',
      phone: '+91 98390 12345',
      email: 'vikram.sharma@example.com',
      date: '2026-11-20',
      time: '08:00 PM',
      guests: 4,
      specialRequests: 'Window side table for family anniversary celebration.',
      status: 'Approved',
      tableNumber: 'T-04 (VIP Corner)',
      adminNotes: 'Welcome drink arranged on arrival.',
      createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      _id: 'res_02',
      customerName: 'Priya Awasthi',
      phone: '+91 94150 98765',
      email: 'priya.awasthi@example.com',
      date: '2026-11-22',
      time: '01:30 PM',
      guests: 6,
      specialRequests: 'Vegetarian special menu request.',
      status: 'Pending',
      tableNumber: '',
      adminNotes: '',
      createdAt: new Date(Date.now() - 36000000).toISOString()
    }
  ],
  resortInquiries: [
    {
      _id: 'inq_01',
      customerName: 'Rajesh & Suman Gupta',
      phone: '+91 99350 54321',
      email: 'rajesh.gupta@example.com',
      checkIn: '2026-12-10',
      checkOut: '2026-12-12',
      guests: 3,
      roomPreference: 'Deluxe Luxury Suite',
      specialRequests: 'Quiet room with early check-in if available.',
      status: 'Approved',
      adminNotes: 'Confirmed room 204. Guest notified.',
      createdAt: new Date(Date.now() - 172800000).toISOString()
    },
    {
      _id: 'inq_02',
      customerName: 'Anil Kumar Katiyar',
      phone: '+91 97920 11223',
      email: 'anil.katiyar@example.com',
      checkIn: '2026-12-24',
      checkOut: '2026-12-25',
      guests: 150,
      roomPreference: 'Banquet & Lawn Event',
      specialRequests: 'Wedding reception with catering and stage decor on the open lawn.',
      status: 'Pending',
      adminNotes: '',
      createdAt: new Date(Date.now() - 43200000).toISOString()
    }
  ],
  contacts: [
    {
      _id: 'cnt_01',
      name: 'Mohit Sachan',
      email: 'mohit.sachan@example.com',
      phone: '+91 91234 56789',
      subject: 'Corporate Conference & Dinner',
      message: 'We are planning an annual corporate meetup for 45 members. Please share package details and audio/visual setup options.',
      status: 'Unread',
      createdAt: new Date(Date.now() - 18000000).toISOString()
    }
  ],
  settings: {
    name: 'Wedson Resort & Restaurant',
    tagline: 'Hotel & Resorts • Ghatampur, Kanpur Nagar',
    headline: 'Experience Comfort. Discover Flavours.',
    subheadline: 'Welcome to Wedson Resort & Restaurant, where memorable experiences, delightful dining, and warm hospitality come together in a scenic sanctuary.',
    address: 'Wedson Resorts, Main Highway, Ghatampur, Kanpur Nagar, Uttar Pradesh - 209206',
    phone: '+91 98390 00000',
    whatsapp: '+91 98390 00000',
    email: 'contact@wedsonresort.com',
    operatingHours: {
      restaurant: '11:00 AM – 11:30 PM (Everyday)',
      resortCheckIn: 'Check-In: 12:00 PM | Check-Out: 11:00 AM',
      frontDesk: '24 Hours Open'
    },
    socialLinks: {
      facebook: 'https://facebook.com/wedsonresort',
      instagram: 'https://instagram.com/wedsonresort',
      youtube: 'https://youtube.com',
      maps: 'https://maps.google.com/?q=Ghatampur+Kanpur+Nagar'
    },
    stats: {
      happyGuests: '25,000+',
      eventsHosted: '350+',
      delicaciesServed: '120+',
      guestRating: '4.9 ★'
    }
  }
};

// Load or save local store
function loadStore() {
  try {
    if (fs.existsSync(dataFile)) {
      const content = fs.readFileSync(dataFile, 'utf8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading localStore:', err.message);
  }
  saveStore(initialData);
  return initialData;
}

function saveStore(data) {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving localStore:', err.message);
  }
}

let store = loadStore();

module.exports = {
  getStore: () => store,
  updateStore: (updater) => {
    updater(store);
    saveStore(store);
    return store;
  }
};

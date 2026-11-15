# WEDSON RESORT & RESTAURANT
### Autonomous Full-Stack MERN Hospitality Platform

A production-ready, luxury full-stack MERN website developed for **WEDSON RESORT & RESTAURANT** located at Ghatampur, Kanpur Nagar, Uttar Pradesh.

---

## 🏛️ Authentic Property Asset Mapping

All visuals in the platform are mapped directly from the authentic photographs of the client property:

| Photograph | Property Space | Platform Role & Usage |
| :--- | :--- | :--- |
| **media_1794556863824_19da8910.jpg** | Neoclassical Palace Facade with Grand Pillars | Hero Slide 1, Resort Architecture Showcase, About Us Heritage |
| **media_1794556863816_b039b5e6.jpg** | Main Dining Hall with official "WEDSON HOTEL & RESORTS" Crest | Restaurant Page Hero, Dining Hall Ambience, Table Reservation |
| **media_1794556863820_4ad73b1a.jpg** | Aerial Panoramic Night Wedding Grounds | Hero Slide 3, Grand Celebration Lawns & Banquets Showcase |
| **media_1794556863786_941a2a65.jpg** | Modern Glass & Gold Tower Portal | Architectural Lounge Showcase, Contemporary Entrance Feature |
| **media_1794556863101_b679c677.avif** | Executive King Suite with Tufted Headboard & LED Strips | Resort Accommodations, Boutique Suite Gallery & Booking |

---

## 🚀 Key Features

### 1. Guest-Facing Pages
- **Home (`/`)**: Cinematic multi-slide hero, verified resort highlights, dining room preview, featured dishes, property facilities, authentic guest testimonials, and interactive location map.
- **About Us (`/about`)**: Brand narrative, hospitality philosophy, verified property statistics (25k+ guests, 350+ weddings, 4.9★ rating).
- **Restaurant (`/restaurant`)**: Fine dining gallery showcasing the warm amber pendant lights, velvet armchair seating, dining features, and embedded table booking form.
- **Resort (`/resort`)**: Palatial neoclassical facade, executive suites, expansive wedding lawns for up to 1,500 guests, facilities list, and stay inquiry form.
- **Food Menu (`/menu`)**: Multi-category filterable culinary menu (Starters, Main Course, Tandoori Special, Chinese, Indian, Snacks, Beverages, Desserts), search bar, and veg/non-veg toggle.
- **Gallery (`/gallery`)**: Masonry layout with category filtering and interactive full-screen lightbox with keyboard and touch navigation.
- **Contact Us (`/contact`)**: Property address at Ghatampur Kanpur Nagar, phone/WhatsApp integration, operational hours, embedded Google Maps, and contact message submission.

### 2. Interactive Systems
- **Dining Table Reservation**: Submits directly to MongoDB with instant validation and a status workflow (`Pending` → `Approved` → `Completed` / `Rejected`).
- **Resort Stay & Lawn Inquiry**: Accommodation and event inquiries saved to MongoDB.
- **Floating WhatsApp Quick Chat**: One-click direct messaging to Wedson front desk.
- **Toast Notifications**: Luxury feedback alerts on every user interaction.

### 3. Secure Admin Dashboard (`/admin/dashboard`)
- **Dashboard Overview**: Metrics on total inquiries, pending reservations, active dishes, and recent activity.
- **Restaurant Management**: Add, edit, delete menu items, update prices, toggle availability ("In Stock" / "Sold Out"), and manage categories.
- **Resort Management**: Track and update accommodation inquiries and lawn bookings.
- **Gallery Management**: Upload photographs via Multer, assign categories, and toggle featured status.
- **Reservation Management**: Approve or reject table bookings, assign table numbers, and record notes.
- **Customer Queries**: Read, reply, and archive inquiries.
- **Website Settings**: Configure contact numbers, address, homepage headlines, and hours.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, Lucide React, Axios, React Router DOM.
- **Backend**: Node.js, Express.js, MongoDB / Mongoose, JSON Web Tokens (JWT), bcryptjs, Multer.
- **Database**: MongoDB with automatic seeding and dual-mode memory/local fallback store.

---

## 🔐 Admin Credentials (Pre-seeded)

- **Portal URL**: `/admin/login`
- **Email**: `admin@wedsonresort.com`
- **Password**: `admin@wedson2026`

---

## 🏁 Quick Start Instructions

### 1. Install & Seed
```bash
# Backend dependencies
cd server && npm install
npm run seed

# Frontend dependencies
cd ../client && npm install
```

### 2. Start Servers
```bash
# Start Backend (Port 5000)
cd server
npm start

# Start Frontend (Port 5173)
cd client
npm run dev
```

Visit `http://localhost:5173` to experience the website.

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Utensils, 
  Hotel, 
  Image as ImageIcon, 
  Calendar, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Clock, 
  Search, 
  Upload, 
  AlertCircle, 
  CheckCircle,
  Eye,
  RefreshCw,
  Phone,
  Mail,
  User,
  Shield,
  FileText
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { 
  statsService, 
  menuService, 
  reservationService, 
  resortService, 
  galleryService, 
  contactService, 
  settingsService,
  uploadService 
} from '../services/api';
import Logo from '../components/Logo';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { success, error, info } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview'); // overview, menu, reservations, resortInquiries, gallery, contacts, settings
  const [loading, setLoading] = useState(true);

  // Data states
  const [stats, setStats] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [resortInquiries, setResortInquiries] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [siteSettings, setSiteSettings] = useState(null);

  // Modals & form states
  const [showAddMenuModal, setShowAddMenuModal] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState(null);
  const [menuForm, setMenuForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Starters',
    dietaryTag: 'veg',
    spiceLevel: 'Medium',
    isAvailable: true,
    isFeatured: false,
    image: '/images/restaurant-interior.jpg'
  });

  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const [showAddGalleryModal, setShowAddGalleryModal] = useState(false);
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    caption: '',
    category: 'Resort Exterior',
    imageUrl: '',
    isFeatured: false
  });

  const [uploadingImage, setUploadingImage] = useState(false);

  // Status Filter for reservations
  const [resFilter, setResFilter] = useState('All');
  const [inqFilter, setInqFilter] = useState('All');

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [stRes, mnRes, catRes, rvRes, inqRes, galRes, cntRes, setRes] = await Promise.all([
        statsService.getDashboardStats(),
        menuService.getAll({}),
        menuService.getCategories(),
        reservationService.getAll({}),
        resortService.getAllInquiries({}),
        galleryService.getAll({}),
        contactService.getAll(),
        settingsService.get()
      ]);

      if (stRes.success) setStats(stRes.data);
      if (mnRes.success) setMenuItems(mnRes.data);
      if (catRes.success) setCategories(catRes.data);
      if (rvRes.success) setReservations(rvRes.data);
      if (inqRes.success) setResortInquiries(inqRes.data);
      if (galRes.success) setGalleryItems(galRes.data);
      if (cntRes.success) setContacts(cntRes.data);
      if (setRes.success) setSiteSettings(setRes.data);
    } catch (err) {
      console.error('Error fetching admin data:', err);
      error('Failed to sync latest administrative data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleLogout = () => {
    logout();
    info('Logged out from Admin Portal');
    navigate('/admin/login');
  };

  // Image Upload Handler
  const handleFileUpload = async (e, targetField) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploadingImage(true);
    try {
      const res = await uploadService.uploadImage(formData);
      if (res.success) {
        success('Image uploaded successfully!');
        if (targetField === 'menu') {
          setMenuForm((prev) => ({ ...prev, image: res.url }));
        } else if (targetField === 'gallery') {
          setGalleryForm((prev) => ({ ...prev, imageUrl: res.url }));
        }
      }
    } catch (err) {
      error(err.response?.data?.message || 'Failed to upload image file');
    } finally {
      setUploadingImage(false);
    }
  };

  // Menu Handlers
  const handleSaveMenuItem = async (e) => {
    e.preventDefault();
    try {
      if (editingMenuItem) {
        const res = await menuService.update(editingMenuItem._id, menuForm);
        if (res.success) {
          success('Menu item updated');
          setEditingMenuItem(null);
        }
      } else {
        const res = await menuService.create(menuForm);
        if (res.success) {
          success('New menu dish created');
        }
      }
      setShowAddMenuModal(false);
      resetMenuForm();
      const mnRes = await menuService.getAll({});
      if (mnRes.success) setMenuItems(mnRes.data);
    } catch (err) {
      error(err.response?.data?.message || 'Error saving menu item');
    }
  };

  const handleDeleteMenuItem = async (id) => {
    if (!window.confirm('Delete this menu item?')) return;
    try {
      const res = await menuService.delete(id);
      if (res.success) {
        success('Menu item deleted');
        setMenuItems((prev) => prev.filter((i) => i._id !== id));
      }
    } catch (err) {
      error('Could not delete item');
    }
  };

  const handleToggleMenuAvailability = async (item) => {
    try {
      const res = await menuService.update(item._id, { isAvailable: !item.isAvailable });
      if (res.success) {
        setMenuItems((prev) =>
          prev.map((i) => (i._id === item._id ? { ...i, isAvailable: !i.isAvailable } : i))
        );
        info(`Dish availability set to ${!item.isAvailable ? 'Available' : 'Unavailable'}`);
      }
    } catch (err) {
      error('Failed to update availability');
    }
  };

  const resetMenuForm = () => {
    setMenuForm({
      name: '',
      description: '',
      price: '',
      category: 'Starters',
      dietaryTag: 'veg',
      spiceLevel: 'Medium',
      isAvailable: true,
      isFeatured: false,
      image: '/images/restaurant-interior.jpg'
    });
    setEditingMenuItem(null);
  };

  // Add Category Handler
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    try {
      const res = await menuService.createCategory({ name: newCategoryName.trim() });
      if (res.success) {
        success(`Category '${newCategoryName}' added`);
        setNewCategoryName('');
        setShowAddCategoryModal(false);
        const catRes = await menuService.getCategories();
        if (catRes.success) setCategories(catRes.data);
      }
    } catch (err) {
      error(err.response?.data?.message || 'Error adding category');
    }
  };

  // Reservation Status Handler
  const handleUpdateReservation = async (id, status, tableNumber = '') => {
    try {
      const res = await reservationService.updateStatus(id, { status, tableNumber });
      if (res.success) {
        success(`Reservation marked as ${status}`);
        setReservations((prev) =>
          prev.map((r) => (r._id === id ? { ...r, status, tableNumber: tableNumber || r.tableNumber } : r))
        );
      }
    } catch (err) {
      error('Failed to update reservation');
    }
  };

  const handleDeleteReservation = async (id) => {
    if (!window.confirm('Remove this reservation record?')) return;
    try {
      const res = await reservationService.delete(id);
      if (res.success) {
        success('Reservation removed');
        setReservations((prev) => prev.filter((r) => r._id !== id));
      }
    } catch (err) {
      error('Error deleting reservation');
    }
  };

  // Resort Inquiry Status Handler
  const handleUpdateResortInquiry = async (id, status) => {
    try {
      const res = await resortService.updateInquiryStatus(id, { status });
      if (res.success) {
        success(`Inquiry status updated to ${status}`);
        setResortInquiries((prev) =>
          prev.map((inq) => (inq._id === id ? { ...inq, status } : inq))
        );
      }
    } catch (err) {
      error('Failed to update status');
    }
  };

  const handleDeleteResortInquiry = async (id) => {
    if (!window.confirm('Delete this resort inquiry?')) return;
    try {
      const res = await resortService.deleteInquiry(id);
      if (res.success) {
        success('Inquiry deleted');
        setResortInquiries((prev) => prev.filter((i) => i._id !== id));
      }
    } catch (err) {
      error('Error deleting inquiry');
    }
  };

  // Gallery Handlers
  const handleSaveGalleryItem = async (e) => {
    e.preventDefault();
    if (!galleryForm.title || !galleryForm.imageUrl) {
      error('Title and image URL are required');
      return;
    }
    try {
      const res = await galleryService.create(galleryForm);
      if (res.success) {
        success('Photo added to gallery');
        setShowAddGalleryModal(false);
        setGalleryForm({
          title: '',
          caption: '',
          category: 'Resort Exterior',
          imageUrl: '',
          isFeatured: false
        });
        const galRes = await galleryService.getAll({});
        if (galRes.success) setGalleryItems(galRes.data);
      }
    } catch (err) {
      error('Error adding gallery image');
    }
  };

  const handleDeleteGalleryItem = async (id) => {
    if (!window.confirm('Delete this photo from gallery?')) return;
    try {
      const res = await galleryService.delete(id);
      if (res.success) {
        success('Photo deleted');
        setGalleryItems((prev) => prev.filter((g) => g._id !== id));
      }
    } catch (err) {
      error('Error deleting photo');
    }
  };

  // Contact status & delete
  const handleUpdateContactStatus = async (id, status) => {
    try {
      const res = await contactService.updateStatus(id, { status });
      if (res.success) {
        setContacts((prev) => prev.map((c) => (c._id === id ? { ...c, status } : c)));
        success(`Message marked as ${status}`);
      }
    } catch (err) {
      error('Error updating status');
    }
  };

  const handleDeleteContact = async (id) => {
    if (!window.confirm('Delete message?')) return;
    try {
      const res = await contactService.delete(id);
      if (res.success) {
        setContacts((prev) => prev.filter((c) => c._id !== id));
        success('Message deleted');
      }
    } catch (err) {
      error('Error deleting message');
    }
  };

  // Settings Save Handler
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      const res = await settingsService.update(siteSettings);
      if (res.success) {
        success('Website settings updated successfully');
      }
    } catch (err) {
      error('Failed to update website settings');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-72 bg-forest-950 text-white flex-shrink-0 border-r border-gold-500/20 p-6 flex flex-col justify-between">
        <div>
          <div className="pb-6 border-b border-gold-500/20">
            <Logo light={true} />
            <div className="mt-4 px-3 py-2 rounded-xl bg-forest-900 border border-gold-500/30 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gold-300">{user?.name || 'Administrator'}</p>
                <p className="text-[10px] text-cream-200/60 uppercase tracking-widest">{user?.role || 'Admin'} Access</p>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="System Online" />
            </div>
          </div>

          <nav className="mt-6 space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'overview'
                  ? 'bg-gold-500 text-forest-950 font-bold shadow-md'
                  : 'text-cream-100 hover:bg-forest-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('reservations')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'reservations'
                  ? 'bg-gold-500 text-forest-950 font-bold shadow-md'
                  : 'text-cream-100 hover:bg-forest-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Utensils className="w-4 h-4" />
                <span>Dining Bookings</span>
              </div>
              {reservations.filter((r) => r.status === 'Pending').length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500 text-forest-950 font-bold">
                  {reservations.filter((r) => r.status === 'Pending').length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('resortInquiries')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'resortInquiries'
                  ? 'bg-gold-500 text-forest-950 font-bold shadow-md'
                  : 'text-cream-100 hover:bg-forest-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Hotel className="w-4 h-4" />
                <span>Resort & Lawns</span>
              </div>
              {resortInquiries.filter((i) => i.status === 'Pending').length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500 text-forest-950 font-bold">
                  {resortInquiries.filter((i) => i.status === 'Pending').length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('menu')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'menu'
                  ? 'bg-gold-500 text-forest-950 font-bold shadow-md'
                  : 'text-cream-100 hover:bg-forest-900'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Menu Dishes</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'gallery'
                  ? 'bg-gold-500 text-forest-950 font-bold shadow-md'
                  : 'text-cream-100 hover:bg-forest-900'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Gallery Photos</span>
            </button>

            <button
              onClick={() => setActiveTab('contacts')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'contacts'
                  ? 'bg-gold-500 text-forest-950 font-bold shadow-md'
                  : 'text-cream-100 hover:bg-forest-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4" />
                <span>Customer Queries</span>
              </div>
              {contacts.filter((c) => c.status === 'Unread').length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-500 text-white font-bold">
                  {contacts.filter((c) => c.status === 'Unread').length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'settings'
                  ? 'bg-gold-500 text-forest-950 font-bold shadow-md'
                  : 'text-cream-100 hover:bg-forest-900'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Site Settings</span>
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-gold-500/20 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold border border-gold-500/40 text-gold-300 hover:bg-gold-500/10 transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>Open Public Website</span>
          </a>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-red-950/60 text-red-300 hover:bg-red-900 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-gray-200 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-forest-950 capitalize">
              {activeTab === 'overview' && 'Executive Overview'}
              {activeTab === 'reservations' && 'Dining Table Reservations'}
              {activeTab === 'resortInquiries' && 'Resort Stay & Wedding Inquiries'}
              {activeTab === 'menu' && 'Restaurant Menu Management'}
              {activeTab === 'gallery' && 'Property Photo Gallery'}
              {activeTab === 'contacts' && 'Customer Inquiries & Messages'}
              {activeTab === 'settings' && 'Website Content & Configuration'}
            </h1>
            <p className="text-xs text-charcoal-600 mt-1">
              Wedson Resort & Restaurant • Live Database Control Center
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadAllData}
              disabled={loading}
              className="p-2.5 rounded-xl bg-white border border-gray-200 text-charcoal-700 hover:bg-gray-100 transition-colors shadow-sm"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-gold-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="mt-8 space-y-8">
            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-charcoal-500">Total Inquiries</p>
                  <p className="text-3xl font-serif font-bold text-forest-950 mt-1">
                    {(reservations.length || 0) + (resortInquiries.length || 0)}
                  </p>
                  <p className="text-[11px] text-charcoal-400 mt-1">Dining + Resort Stays</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-forest-900 text-gold-400 flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-charcoal-500">Pending Dining</p>
                  <p className="text-3xl font-serif font-bold text-amber-600 mt-1">
                    {reservations.filter((r) => r.status === 'Pending').length}
                  </p>
                  <p className="text-[11px] text-charcoal-400 mt-1">Awaiting confirmation</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Utensils className="w-6 h-6" />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-charcoal-500">Resort & Lawns</p>
                  <p className="text-3xl font-serif font-bold text-forest-800 mt-1">
                    {resortInquiries.filter((i) => i.status === 'Pending').length}
                  </p>
                  <p className="text-[11px] text-charcoal-400 mt-1">Pending stay inquiries</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center">
                  <Hotel className="w-6 h-6" />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-charcoal-500">Active Menu Items</p>
                  <p className="text-3xl font-serif font-bold text-forest-950 mt-1">
                    {menuItems.length}
                  </p>
                  <p className="text-[11px] text-charcoal-400 mt-1">Across {categories.length} categories</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gold-100 text-gold-700 flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Recent Reservations & Inquiries Split */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Dining Bookings */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                  <h3 className="font-serif font-bold text-forest-950 flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-gold-600" />
                    <span>Recent Table Reservations</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('reservations')}
                    className="text-xs font-semibold text-gold-600 hover:text-forest-950"
                  >
                    View All →
                  </button>
                </div>

                <div className="space-y-3">
                  {reservations.slice(0, 5).map((r) => (
                    <div
                      key={r._id}
                      className="p-3 rounded-xl bg-gray-50 border border-gray-200/60 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm font-bold text-forest-950">{r.customerName}</p>
                        <p className="text-xs text-charcoal-500">
                          {r.date} at {r.time} • {r.guests} Guests • {r.phone}
                        </p>
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          r.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : r.status === 'Pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-gray-200 text-charcoal-700'
                        }`}
                      >
                        {r.status}
                      </span>
                    </div>
                  ))}
                  {reservations.length === 0 && (
                    <p className="text-xs text-charcoal-400 text-center py-4">No reservations logged yet.</p>
                  )}
                </div>
              </div>

              {/* Recent Stay / Lawn Inquiries */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                  <h3 className="font-serif font-bold text-forest-950 flex items-center gap-2">
                    <Hotel className="w-4 h-4 text-gold-600" />
                    <span>Recent Stay & Event Inquiries</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('resortInquiries')}
                    className="text-xs font-semibold text-gold-600 hover:text-forest-950"
                  >
                    View All →
                  </button>
                </div>

                <div className="space-y-3">
                  {resortInquiries.slice(0, 5).map((inq) => (
                    <div
                      key={inq._id}
                      className="p-3 rounded-xl bg-gray-50 border border-gray-200/60 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm font-bold text-forest-950">{inq.customerName}</p>
                        <p className="text-xs text-charcoal-500">
                          {inq.roomPreference} • {inq.checkIn} to {inq.checkOut}
                        </p>
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          inq.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : inq.status === 'Pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-gray-200 text-charcoal-700'
                        }`}
                      >
                        {inq.status}
                      </span>
                    </div>
                  ))}
                  {resortInquiries.length === 0 && (
                    <p className="text-xs text-charcoal-400 text-center py-4">No resort inquiries logged yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DINING TABLE RESERVATIONS */}
        {activeTab === 'reservations' && (
          <div className="mt-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                {['All', 'Pending', 'Approved', 'Completed', 'Rejected'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setResFilter(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                      resFilter === status
                        ? 'bg-forest-950 text-gold-300 shadow-sm'
                        : 'bg-white border border-gray-200 text-charcoal-700 hover:bg-gray-50'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-charcoal-600 uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Date & Time</th>
                      <th className="px-6 py-4">Guests</th>
                      <th className="px-6 py-4">Requests</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {reservations
                      .filter((r) => resFilter === 'All' || r.status === resFilter)
                      .map((r) => (
                        <tr key={r._id} className="hover:bg-gray-50/80 transition-colors">
                          <td className="px-6 py-4">
                            <p className="font-bold text-forest-950">{r.customerName}</p>
                            <p className="text-xs text-charcoal-500">{r.phone}</p>
                            {r.email && <p className="text-[11px] text-charcoal-400">{r.email}</p>}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <p className="font-semibold text-charcoal-800">{r.date}</p>
                            <p className="text-xs text-charcoal-500">{r.time}</p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="font-bold text-forest-950">{r.guests} Guests</span>
                          </td>
                          <td className="px-6 py-4 max-w-xs">
                            <p className="text-xs text-charcoal-600 truncate">{r.specialRequests || '—'}</p>
                            {r.tableNumber && (
                              <p className="text-[11px] text-gold-700 font-semibold mt-0.5">Table: {r.tableNumber}</p>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                r.status === 'Approved'
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                  : r.status === 'Pending'
                                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                  : r.status === 'Completed'
                                  ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                  : 'bg-red-100 text-red-800 border border-red-300'
                              }`}
                            >
                              {r.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap space-x-2">
                            {r.status === 'Pending' && (
                              <button
                                onClick={() => handleUpdateReservation(r._id, 'Approved', 'Table Assigned')}
                                className="px-2.5 py-1 rounded bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700"
                              >
                                Approve
                              </button>
                            )}
                            {r.status === 'Approved' && (
                              <button
                                onClick={() => handleUpdateReservation(r._id, 'Completed')}
                                className="px-2.5 py-1 rounded bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
                              >
                                Mark Done
                              </button>
                            )}
                            {r.status === 'Pending' && (
                              <button
                                onClick={() => handleUpdateReservation(r._id, 'Rejected')}
                                className="px-2.5 py-1 rounded bg-gray-200 text-charcoal-700 text-xs font-semibold hover:bg-gray-300"
                              >
                                Decline
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteReservation(r._id)}
                              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                              title="Delete Record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    {reservations.length === 0 && (
                      <tr>
                        <td colSpan="6" className="px-6 py-8 text-center text-charcoal-400">
                          No table reservations found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: RESORT STAY & EVENT INQUIRIES */}
        {activeTab === 'resortInquiries' && (
          <div className="mt-8 space-y-6">
            <div className="flex items-center space-x-2">
              {['All', 'Pending', 'Approved', 'Completed', 'Rejected'].map((status) => (
                <button
                  key={status}
                  onClick={() => setInqFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                    inqFilter === status
                      ? 'bg-forest-950 text-gold-300 shadow-sm'
                      : 'bg-white border border-gray-200 text-charcoal-700 hover:bg-gray-50'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-charcoal-600 uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Guest</th>
                      <th className="px-6 py-4">Preference</th>
                      <th className="px-6 py-4">Stay Dates</th>
                      <th className="px-6 py-4">Guests</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {resortInquiries
                      .filter((i) => inqFilter === 'All' || i.status === inqFilter)
                      .map((inq) => (
                        <tr key={inq._id} className="hover:bg-gray-50/80 transition-colors">
                          <td className="px-6 py-4">
                            <p className="font-bold text-forest-950">{inq.customerName}</p>
                            <p className="text-xs text-charcoal-500">{inq.phone}</p>
                            {inq.email && <p className="text-[11px] text-charcoal-400">{inq.email}</p>}
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-semibold text-forest-950">{inq.roomPreference}</p>
                            {inq.specialRequests && (
                              <p className="text-xs text-charcoal-500 line-clamp-1">{inq.specialRequests}</p>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <p className="text-xs text-charcoal-800">In: <strong>{inq.checkIn}</strong></p>
                            <p className="text-xs text-charcoal-800">Out: <strong>{inq.checkOut}</strong></p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="font-bold text-forest-950">{inq.guests} Guests</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                inq.status === 'Approved'
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                  : inq.status === 'Pending'
                                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                  : inq.status === 'Completed'
                                  ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                  : 'bg-red-100 text-red-800 border border-red-300'
                              }`}
                            >
                              {inq.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap space-x-2">
                            {inq.status === 'Pending' && (
                              <button
                                onClick={() => handleUpdateResortInquiry(inq._id, 'Approved')}
                                className="px-2.5 py-1 rounded bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700"
                              >
                                Approve
                              </button>
                            )}
                            {inq.status === 'Approved' && (
                              <button
                                onClick={() => handleUpdateResortInquiry(inq._id, 'Completed')}
                                className="px-2.5 py-1 rounded bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
                              >
                                Done
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteResortInquiry(inq._id)}
                              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                              title="Delete Record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    {resortInquiries.length === 0 && (
                      <tr>
                        <td colSpan="6" className="px-6 py-8 text-center text-charcoal-400">
                          No resort inquiries logged yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MENU ITEMS MANAGEMENT */}
        {activeTab === 'menu' && (
          <div className="mt-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    resetMenuForm();
                    setShowAddMenuModal(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest-950 text-gold-300 text-xs font-bold uppercase tracking-wider hover:bg-forest-900 transition-all shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Food Dish</span>
                </button>

                <button
                  onClick={() => setShowAddCategoryModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-300 text-charcoal-800 text-xs font-semibold uppercase tracking-wider hover:bg-gray-50 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Category</span>
                </button>
              </div>

              <div className="text-xs text-charcoal-500">
                Total Dishes: <strong>{menuItems.length}</strong>
              </div>
            </div>

            {/* Menu Items Table */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-charcoal-600 uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Dish</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4">Diet & Spice</th>
                      <th className="px-6 py-4">Availability</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {menuItems.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="px-6 py-4 flex items-center gap-3">
                          <img
                            src={item.image || '/images/restaurant-interior.jpg'}
                            alt={item.name}
                            className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                          />
                          <div>
                            <p className="font-bold text-forest-950">{item.name}</p>
                            <p className="text-xs text-charcoal-500 line-clamp-1">{item.description}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-charcoal-800">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-serif font-bold text-forest-950">₹{item.price}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-4 h-4 rounded flex items-center justify-center border ${
                                item.dietaryTag === 'veg' ? 'border-green-600' : 'border-red-600'
                              }`}
                            >
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  item.dietaryTag === 'veg' ? 'bg-green-600' : 'bg-red-600'
                                }`}
                              />
                            </span>
                            <span className="text-xs text-charcoal-600">{item.spiceLevel || 'Medium'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleToggleMenuAvailability(item)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                              item.isAvailable
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                            }`}
                          >
                            {item.isAvailable ? 'In Stock' : 'Sold Out'}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap space-x-2">
                          <button
                            onClick={() => {
                              setEditingMenuItem(item);
                              setMenuForm({
                                name: item.name,
                                description: item.description,
                                price: item.price,
                                category: item.category,
                                dietaryTag: item.dietaryTag || 'veg',
                                spiceLevel: item.spiceLevel || 'Medium',
                                isAvailable: item.isAvailable,
                                isFeatured: item.isFeatured,
                                image: item.image || '/images/restaurant-interior.jpg'
                              });
                              setShowAddMenuModal(true);
                            }}
                            className="p-1.5 text-gray-500 hover:text-gold-600 transition-colors"
                            title="Edit Dish"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteMenuItem(item._id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete Dish"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: GALLERY MANAGEMENT */}
        {activeTab === 'gallery' && (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowAddGalleryModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest-950 text-gold-300 text-xs font-bold uppercase tracking-wider hover:bg-forest-900 transition-all shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Upload Property Photograph</span>
              </button>
              <span className="text-xs text-charcoal-500">
                {galleryItems.length} Photographs Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div className="relative h-48 bg-black">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-forest-950/80 text-gold-300">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-forest-950 text-sm">{item.title}</h4>
                      {item.caption && (
                        <p className="text-xs text-charcoal-600 mt-1 line-clamp-2">{item.caption}</p>
                      )}
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[11px] text-charcoal-400">
                        {item.isFeatured ? '⭐ Featured' : 'Standard'}
                      </span>
                      <button
                        onClick={() => handleDeleteGalleryItem(item._id)}
                        className="text-red-600 hover:text-red-700 text-xs font-semibold flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: CUSTOMER INQUIRIES */}
        {activeTab === 'contacts' && (
          <div className="mt-8 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-100">
                {contacts.map((c) => (
                  <div key={c._id} className="p-6 hover:bg-gray-50 transition-colors space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h4 className="font-serif font-bold text-forest-950 text-base">{c.name}</h4>
                        <p className="text-xs text-charcoal-500">
                          {c.email} • {c.phone}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                            c.status === 'Unread'
                              ? 'bg-blue-100 text-blue-800'
                              : c.status === 'Read'
                              ? 'bg-gray-100 text-charcoal-700'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {c.status}
                        </span>
                        <button
                          onClick={() => handleUpdateContactStatus(c._id, 'Replied')}
                          className="px-2.5 py-1 text-xs font-semibold rounded bg-emerald-600 text-white hover:bg-emerald-700"
                        >
                          Mark Replied
                        </button>
                        <button
                          onClick={() => handleDeleteContact(c._id)}
                          className="p-1 text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs text-charcoal-700">
                      <p className="font-bold text-forest-950 mb-1">{c.subject}</p>
                      <p className="leading-relaxed">{c.message}</p>
                    </div>
                  </div>
                ))}
                {contacts.length === 0 && (
                  <div className="py-12 text-center text-charcoal-400 text-sm">
                    No customer contact messages received yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: SITE SETTINGS */}
        {activeTab === 'settings' && siteSettings && (
          <div className="mt-8 max-w-3xl">
            <form onSubmit={handleSaveSettings} className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm space-y-6">
              <h3 className="font-serif font-bold text-xl text-forest-950 pb-3 border-b border-gray-100">
                Core Website Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal-700 mb-1">
                    Property Name
                  </label>
                  <input
                    type="text"
                    value={siteSettings.name || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal-700 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    value={siteSettings.phone || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, phone: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal-700 mb-1">
                    WhatsApp Desk
                  </label>
                  <input
                    type="text"
                    value={siteSettings.whatsapp || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, whatsapp: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={siteSettings.email || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, email: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-charcoal-700 mb-1">
                  Full Physical Address
                </label>
                <input
                  type="text"
                  value={siteSettings.address || ''}
                  onChange={(e) => setSiteSettings({ ...siteSettings, address: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-charcoal-700 mb-1">
                  Homepage Main Headline
                </label>
                <input
                  type="text"
                  value={siteSettings.headline || ''}
                  onChange={(e) => setSiteSettings({ ...siteSettings, headline: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-charcoal-700 mb-1">
                  Homepage Supporting Text
                </label>
                <textarea
                  rows="3"
                  value={siteSettings.subheadline || ''}
                  onChange={(e) => setSiteSettings({ ...siteSettings, subheadline: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300"
                />
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-forest-950 text-gold-300 text-xs font-bold uppercase tracking-wider hover:bg-forest-900 transition-colors shadow-md"
                >
                  Save Website Configuration
                </button>
              </div>
            </form>
          </div>
        )}

        {/* MODAL: ADD / EDIT MENU ITEM */}
        {showAddMenuModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-200 my-8">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                <h3 className="font-serif font-bold text-lg text-forest-950">
                  {editingMenuItem ? 'Edit Menu Dish' : 'Create New Menu Dish'}
                </h3>
                <button onClick={() => setShowAddMenuModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveMenuItem} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal-700 mb-1">
                    Dish Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={menuForm.name}
                    onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
                    placeholder="e.g. Awadhi Paneer Tikka"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-charcoal-700 mb-1">
                      Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={menuForm.price}
                      onChange={(e) => setMenuForm({ ...menuForm, price: e.target.value })}
                      placeholder="280"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-charcoal-700 mb-1">
                      Category *
                    </label>
                    <select
                      value={menuForm.category}
                      onChange={(e) => setMenuForm({ ...menuForm, category: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white"
                    >
                      {categories.map((c) => (
                        <option key={c._id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-charcoal-700 mb-1">
                      Dietary Type
                    </label>
                    <select
                      value={menuForm.dietaryTag}
                      onChange={(e) => setMenuForm({ ...menuForm, dietaryTag: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white"
                    >
                      <option value="veg">Vegetarian</option>
                      <option value="non-veg">Non-Vegetarian</option>
                      <option value="jain">Jain Special</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-charcoal-700 mb-1">
                      Spice Level
                    </label>
                    <select
                      value={menuForm.spiceLevel}
                      onChange={(e) => setMenuForm({ ...menuForm, spiceLevel: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white"
                    >
                      <option value="Mild">Mild</option>
                      <option value="Medium">Medium</option>
                      <option value="Spicy">Spicy</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal-700 mb-1">
                    Description & Preparation
                  </label>
                  <textarea
                    rows="2"
                    value={menuForm.description}
                    onChange={(e) => setMenuForm({ ...menuForm, description: e.target.value })}
                    placeholder="Short description of ingredients and spices..."
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal-700 mb-1">
                    Image File / URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={menuForm.image}
                      onChange={(e) => setMenuForm({ ...menuForm, image: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300"
                    />
                    <label className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-semibold cursor-pointer border border-gray-300 flex items-center gap-1">
                      <Upload className="w-4 h-4" />
                      <span>{uploadingImage ? '...' : 'Upload'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'menu')}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 text-xs font-semibold text-charcoal-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={menuForm.isAvailable}
                      onChange={(e) => setMenuForm({ ...menuForm, isAvailable: e.target.checked })}
                      className="rounded text-forest-900"
                    />
                    <span>Available to order</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-semibold text-charcoal-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={menuForm.isFeatured}
                      onChange={(e) => setMenuForm({ ...menuForm, isFeatured: e.target.checked })}
                      className="rounded text-gold-600"
                    />
                    <span>Highlight as Chef's Special</span>
                  </label>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setShowAddMenuModal(false)}
                    className="px-4 py-2 text-xs font-semibold uppercase text-charcoal-600 hover:text-charcoal-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-forest-950 text-gold-300 text-xs font-bold uppercase tracking-wider hover:bg-forest-900"
                  >
                    Save Dish
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ADD CATEGORY */}
        {showAddCategoryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-200">
              <h3 className="font-serif font-bold text-base text-forest-950 mb-3">Add Menu Category</h3>
              <form onSubmit={handleAddCategory} className="space-y-4">
                <input
                  type="text"
                  required
                  placeholder="e.g. Sizzlers & Grills"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddCategoryModal(false)}
                    className="px-3 py-1.5 text-xs text-charcoal-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-forest-950 text-gold-300 text-xs font-bold uppercase"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ADD GALLERY PHOTO */}
        {showAddGalleryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-200">
              <h3 className="font-serif font-bold text-lg text-forest-950 mb-4">Add Gallery Photograph</h3>
              <form onSubmit={handleSaveGalleryItem} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal-700 mb-1">
                    Photo Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={galleryForm.title}
                    onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                    placeholder="e.g. Neoclassical Entrance Pillars"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={galleryForm.category}
                    onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white"
                  >
                    <option value="Resort Exterior">Resort Exterior</option>
                    <option value="Restaurant & Dining">Restaurant & Dining</option>
                    <option value="Rooms & Suites">Rooms & Suites</option>
                    <option value="Banquet & Lawns">Banquet & Lawns</option>
                    <option value="Architecture">Architecture</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal-700 mb-1">
                    Image Source / Upload *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={galleryForm.imageUrl}
                      onChange={(e) => setGalleryForm({ ...galleryForm, imageUrl: e.target.value })}
                      placeholder="/images/resort-facade-day.jpg or upload"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300"
                    />
                    <label className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-semibold cursor-pointer border border-gray-300 flex items-center gap-1">
                      <Upload className="w-4 h-4" />
                      <span>{uploadingImage ? '...' : 'Upload'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'gallery')}
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-charcoal-700 mb-1">
                    Caption (Optional)
                  </label>
                  <textarea
                    rows="2"
                    value={galleryForm.caption}
                    onChange={(e) => setGalleryForm({ ...galleryForm, caption: e.target.value })}
                    placeholder="Description of the photographed space..."
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setShowAddGalleryModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-charcoal-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-forest-950 text-gold-300 text-xs font-bold uppercase tracking-wider"
                  >
                    Save Photo
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;

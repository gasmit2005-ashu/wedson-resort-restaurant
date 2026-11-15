import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, User, Phone, Mail, Hotel, CheckCircle, ShieldAlert } from 'lucide-react';
import { resortService } from '../services/api';
import { useToast } from '../context/ToastContext';

const ResortInquiryModal = ({ isOpen, onClose }) => {
  const { success, error } = useToast();
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    checkIn: today,
    checkOut: tomorrow,
    guests: 2,
    roomPreference: 'Deluxe Luxury Suite',
    specialRequests: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone || !formData.checkIn || !formData.checkOut) {
      error('Please fill in all mandatory inquiry details');
      return;
    }

    setLoading(true);
    try {
      const res = await resortService.createInquiry(formData);
      if (res.success) {
        setSubmitted(true);
        success('Resort stay / banquet inquiry submitted!');
      } else {
        error(res.message || 'Could not submit inquiry');
      }
    } catch (err) {
      error(err.response?.data?.message || 'Error communicating with server');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-forest-950/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-gold-500/30 overflow-hidden my-8"
        >
          {/* Header Banner with Real Neoclassical Facade */}
          <div className="relative h-32 bg-forest-900 overflow-hidden">
            <img
              src="/images/resort-facade-day.jpg"
              alt="Wedson Resorts Facade"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/70 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold flex items-center gap-1.5">
                  <Hotel className="w-3.5 h-3.5" />
                  <span>Wedson Luxury Resort</span>
                </span>
                <h3 className="text-2xl font-serif font-bold text-white tracking-wide">
                  Stay & Banquet Inquiry
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-forest-900/80 border border-gold-500/40 text-gold-300 hover:text-white hover:bg-forest-800 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {submitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-forest-100 text-forest-800 mx-auto flex items-center justify-center border-2 border-gold-500/50">
                  <CheckCircle className="w-9 h-9 text-forest-700" />
                </div>
                <h4 className="text-2xl font-serif font-bold text-forest-950">
                  Inquiry Successfully Received
                </h4>
                <p className="text-sm text-charcoal-700 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.customerName}</strong>. Your inquiry for <strong>{formData.roomPreference}</strong> ({formData.checkIn} to {formData.checkOut}) has been sent to our resort desk.
                </p>
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 text-left flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                  <span>
                    Our guest relations manager will review accommodation availability and contact you directly at <strong>{formData.phone}</strong> with tailored tariff packages.
                  </span>
                </div>
                <button
                  onClick={handleReset}
                  className="mt-4 px-8 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-forest-900 text-gold-300 hover:bg-forest-800 transition-colors shadow-md"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gold-600 absolute left-3 top-3" />
                      <input
                        type="text"
                        name="customerName"
                        required
                        value={formData.customerName}
                        onChange={handleChange}
                        placeholder="e.g. Alok Verma"
                        className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gold-600 absolute left-3 top-3" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98390 XXXXX"
                        className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500"
                      />
                    </div>
                  </div>

                  {/* Check-In */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-1.5">
                      Check-In Date *
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-gold-600 absolute left-3 top-3" />
                      <input
                        type="date"
                        name="checkIn"
                        required
                        value={formData.checkIn}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500"
                      />
                    </div>
                  </div>

                  {/* Check-Out */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-1.5">
                      Check-Out Date *
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-gold-600 absolute left-3 top-3" />
                      <input
                        type="date"
                        name="checkOut"
                        required
                        value={formData.checkOut}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500"
                      />
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-1.5">
                      Total Guests *
                    </label>
                    <div className="relative">
                      <Users className="w-4 h-4 text-gold-600 absolute left-3 top-3" />
                      <input
                        type="number"
                        min="1"
                        max="1000"
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500"
                      />
                    </div>
                  </div>

                  {/* Preference */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-1.5">
                      Accommodation / Event Type
                    </label>
                    <div className="relative">
                      <Hotel className="w-4 h-4 text-gold-600 absolute left-3 top-3" />
                      <select
                        name="roomPreference"
                        value={formData.roomPreference}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500 bg-white"
                      >
                        <option value="Deluxe Luxury Suite">Deluxe Luxury Suite (King Bed)</option>
                        <option value="Executive Family Suite">Executive Family Suite</option>
                        <option value="Grand Wedding Lawn & Banquet">Grand Wedding Lawn & Banquet</option>
                        <option value="Celebration / Birthday Party">Celebration / Birthday Party</option>
                        <option value="Corporate Retreat / Conference">Corporate Retreat / Conference</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gold-600 absolute left-3 top-3" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="yourname@gmail.com"
                      className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500"
                    />
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-1.5">
                    Special Inquiries & Requirements
                  </label>
                  <textarea
                    name="specialRequests"
                    rows="2"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    placeholder="e.g. Lawn capacity, catering preference, extra beds, arrival timing..."
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-forest-900 to-forest-800 text-gold-300 hover:text-white border border-gold-500/40 shadow-lg hover:shadow-gold-glow active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span>Sending Inquiry...</span>
                    ) : (
                      <>
                        <Hotel className="w-4 h-4 text-gold-400" />
                        <span>Submit Resort Inquiry</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-charcoal-500 mt-2">
                    Inquiries are managed by Wedson Resort Desk. We guarantee best direct rates and personalized event coordination.
                  </p>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ResortInquiryModal;

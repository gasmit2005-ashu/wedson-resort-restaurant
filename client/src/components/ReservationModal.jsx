import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Users, User, Phone, Mail, Utensils, CheckCircle, ShieldAlert } from 'lucide-react';
import { reservationService } from '../services/api';
import { useToast } from '../context/ToastContext';

const ReservationModal = ({ isOpen, onClose }) => {
  const { success, error } = useToast();
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    time: '19:30',
    guests: 2,
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
    if (!formData.customerName || !formData.phone || !formData.date || !formData.time) {
      error('Please fill in all mandatory fields');
      return;
    }

    setLoading(true);
    try {
      const res = await reservationService.create(formData);
      if (res.success) {
        setSubmitted(true);
        success('Reservation request submitted successfully!');
      } else {
        error(res.message || 'Could not submit reservation');
      }
    } catch (err) {
      error(err.response?.data?.message || 'Error communicating with server');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      customerName: '',
      phone: '',
      email: '',
      date: new Date().toISOString().split('T')[0],
      time: '19:30',
      guests: 2,
      specialRequests: ''
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-forest-950/80 backdrop-blur-sm"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-gold-500/30 overflow-hidden my-8"
        >
          {/* Header Banner with Real Restaurant Interior */}
          <div className="relative h-32 bg-forest-900 overflow-hidden">
            <img
              src="/images/restaurant-interior.jpg"
              alt="Wedson Restaurant Interior"
              className="w-full h-full object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/70 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5" />
                  <span>Wedson Fine Dining</span>
                </span>
                <h3 className="text-2xl font-serif font-bold text-white tracking-wide">
                  Reserve a Table
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
                  Reservation Request Received!
                </h4>
                <p className="text-sm text-charcoal-700 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.customerName}</strong>. Your table booking request for <strong>{formData.guests} guest(s)</strong> on <strong>{formData.date} at {formData.time}</strong> has been logged into our system.
                </p>
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 text-left flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Important Note:</strong> Your booking is currently <em>Pending</em> and will be confirmed once reviewed by our dining reservation manager. We will contact you at <strong>{formData.phone}</strong>.
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
                        placeholder="e.g. Ramesh Chandra"
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

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-1.5">
                      Email Address (Optional)
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

                  {/* Number of Guests */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-1.5">
                      Number of Guests *
                    </label>
                    <div className="relative">
                      <Users className="w-4 h-4 text-gold-600 absolute left-3 top-3" />
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500 bg-white"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-1.5">
                      Date *
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-gold-600 absolute left-3 top-3" />
                      <input
                        type="date"
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500"
                      />
                    </div>
                  </div>

                  {/* Time */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-1.5">
                      Preferred Time *
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-gold-600 absolute left-3 top-3" />
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500 bg-white"
                      >
                        <option value="12:00 PM">12:00 PM (Lunch)</option>
                        <option value="01:00 PM">01:00 PM (Lunch)</option>
                        <option value="02:00 PM">02:00 PM (Lunch)</option>
                        <option value="03:00 PM">03:00 PM (Late Lunch)</option>
                        <option value="07:00 PM">07:00 PM (Dinner)</option>
                        <option value="07:30 PM">07:30 PM (Dinner)</option>
                        <option value="08:00 PM">08:00 PM (Dinner)</option>
                        <option value="08:30 PM">08:30 PM (Dinner)</option>
                        <option value="09:00 PM">09:00 PM (Dinner)</option>
                        <option value="09:30 PM">09:30 PM (Dinner)</option>
                        <option value="10:00 PM">10:00 PM (Dinner)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-1.5">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    name="specialRequests"
                    rows="2"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    placeholder="e.g. Birthday decoration, quiet corner, high chair for infant, Jain food..."
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
                      <span>Submitting Request...</span>
                    ) : (
                      <>
                        <Utensils className="w-4 h-4 text-gold-400" />
                        <span>Confirm Reservation Inquiry</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-center text-charcoal-500 mt-2">
                    Reservations are confirmed only upon review by the dining team. No immediate prepayment required.
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

export default ReservationModal;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, CheckCircle, ShieldAlert } from 'lucide-react';
import { contactService } from '../services/api';
import { useToast } from '../context/ToastContext';

const Contact = () => {
  const { success, error } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      error('Please complete all required fields');
      return;
    }
    setLoading(true);
    try {
      const res = await contactService.create(formData);
      if (res.success) {
        setSubmitted(true);
        success('Your message has been sent successfully!');
      } else {
        error(res.message || 'Error sending message');
      }
    } catch (err) {
      error(err.response?.data?.message || 'Server error sending message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-[#FAF7F2]">
      {/* Header Banner */}
      <section className="relative py-20 bg-forest-950 text-white overflow-hidden text-center">
        <div className="absolute inset-0 opacity-30">
          <img
            src="/images/resort-facade-day.jpg"
            alt="Wedson Resorts Entrance"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/70 to-black/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-forest-900/80 border border-gold-400/50 text-xs font-semibold uppercase tracking-widest text-gold-300 mb-4">
            <MapPin className="w-3.5 h-3.5 text-gold-400" />
            <span>Kanpur Nagar, Uttar Pradesh</span>
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight mb-4">
            Connect With Wedson
          </h1>
          <p className="text-base sm:text-lg text-cream-200/90 max-w-2xl mx-auto font-light leading-relaxed">
            We are here to assist with dining reservations, resort accommodation queries, wedding event planning, and private banquet bookings.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Information & Channels */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-gold-600">
                  Direct Assistance
                </span>
                <h2 className="text-3xl font-serif font-bold text-forest-950 mt-1">
                  Our Resort & Restaurant Desk
                </h2>
                <p className="text-sm text-charcoal-600 mt-2 font-light leading-relaxed">
                  Located right on the main highway at Ghatampur, our front desk and dining team are available to assist you.
                </p>
              </div>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-cream-200 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-forest-950 text-gold-400 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-forest-950">Property Address</h3>
                    <p className="text-xs text-charcoal-700 mt-1 leading-relaxed">
                      Wedson Resorts, Main Highway, Ghatampur, Kanpur Nagar, Uttar Pradesh - 209206
                    </p>
                    <a
                      href="https://maps.google.com/?q=Ghatampur,Kanpur+Nagar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-xs font-bold text-gold-600 hover:text-forest-950 underline"
                    >
                      Open Google Maps →
                    </a>
                  </div>
                </div>

                {/* Telephone & WhatsApp */}
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-cream-200 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-forest-950 text-gold-400 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-forest-950">Phone & WhatsApp</h3>
                    <p className="text-xs text-charcoal-700 mt-1">
                      Front Desk: <a href="tel:+919839000000" className="font-semibold text-forest-950 hover:text-gold-600">+91 98390 00000</a>
                    </p>
                    <p className="text-xs text-charcoal-700 mt-1">
                      WhatsApp: <a href="https://wa.me/919839000000" target="_blank" rel="noopener noreferrer" className="font-semibold text-green-700 hover:underline">+91 98390 00000 (Click to Chat)</a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-cream-200 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-forest-950 text-gold-400 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-forest-950">Email Correspondence</h3>
                    <p className="text-xs text-charcoal-700 mt-1">
                      <a href="mailto:info@wedsonresort.com" className="hover:text-gold-600">info@wedsonresort.com</a>
                    </p>
                    <p className="text-xs text-charcoal-700 mt-0.5">
                      <a href="mailto:contact@wedsonresort.com" className="hover:text-gold-600">contact@wedsonresort.com</a>
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-cream-200 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-forest-950 text-gold-400 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-forest-950">Operating Hours</h3>
                    <p className="text-xs text-charcoal-700 mt-1">Restaurant: <strong>11:00 AM – 11:30 PM (Daily)</strong></p>
                    <p className="text-xs text-charcoal-700 mt-0.5">Resort Desk: <strong>24 Hours Open</strong></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-cream-300 shadow-xl">
                <div className="mb-8">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gold-600">
                    Send a Message
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-forest-950 mt-1">
                    How Can We Assist You?
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-600 mt-1 font-light">
                    Fill in your details below and our guest coordinator will get in touch with you shortly.
                  </p>
                </div>

                {submitted ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-forest-100 text-forest-800 mx-auto flex items-center justify-center border-2 border-gold-500">
                      <CheckCircle className="w-9 h-9 text-forest-700" />
                    </div>
                    <h4 className="text-2xl font-serif font-bold text-forest-950">
                      Message Received!
                    </h4>
                    <p className="text-sm text-charcoal-700 max-w-md mx-auto leading-relaxed">
                      Thank you for contacting Wedson Resort & Restaurant. We have registered your message and will respond via email (<strong>{formData.email}</strong>) or phone.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          subject: 'General Inquiry',
                          message: ''
                        });
                      }}
                      className="mt-4 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-forest-950 text-gold-300 hover:bg-forest-900 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-1.5">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Vikas Pandey"
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="vikas@gmail.com"
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98390 XXXXX"
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-1.5">
                          Subject
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500 bg-white"
                        >
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Table Reservation Query">Table Reservation Query</option>
                          <option value="Wedding / Lawn Banquet Booking">Wedding / Lawn Banquet Booking</option>
                          <option value="Corporate Retreat">Corporate Retreat</option>
                          <option value="Feedback / Suggestion">Feedback / Suggestion</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-charcoal-800 uppercase tracking-wider mb-1.5">
                        Your Message *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your requirements, dates, or questions..."
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-forest-950 text-gold-300 hover:bg-forest-900 border border-gold-500/40 shadow-lg flex items-center justify-center gap-2 transition-all"
                      >
                        {loading ? (
                          <span>Sending Message...</span>
                        ) : (
                          <>
                            <Send className="w-4 h-4 text-gold-400" />
                            <span>Deliver Message to Wedson</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map Full Width Section */}
      <section className="h-96 w-full bg-gray-200 border-t border-cream-300 relative">
        <iframe
          title="Wedson Resort Ghatampur Full Map"
          src="https://maps.google.com/maps?q=Ghatampur,Kanpur+Nagar,Uttar+Pradesh&t=&z=14&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </div>
  );
};

export default Contact;

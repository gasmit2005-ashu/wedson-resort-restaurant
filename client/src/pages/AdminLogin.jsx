import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, Shield, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Logo from '../components/Logo';

const AdminLogin = () => {
  const { login } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@wedsonresort.com');
  const [password, setPassword] = useState('admin@wedson2026');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      error('Please provide admin credentials');
      return;
    }

    setLoading(true);
    try {
      const res = await login(email, password);
      if (res.success) {
        success(`Welcome, ${res.user.name}`);
        navigate('/admin/dashboard');
      } else {
        error(res.message || 'Authentication failed');
      }
    } catch (err) {
      error(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-forest-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-20">
        <img
          src="/images/restaurant-interior.jpg"
          alt="Wedson Interior"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/80 to-black/80" />

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <Logo light={true} />
        </div>

        <div className="bg-forest-900/90 backdrop-blur-xl border border-gold-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-forest-950 border border-gold-400/40 text-gold-400 flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-white tracking-wide">
              Management Portal
            </h2>
            <p className="text-xs text-cream-200/70 mt-1">
              Sign in to manage reservations, menu dishes, resort inquiries & settings.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-cream-200 uppercase tracking-wider mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gold-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@wedsonresort.com"
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-forest-950 border border-gold-500/30 text-white placeholder-cream-200/40 focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-cream-200 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gold-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl bg-forest-950 border border-gold-500/30 text-white placeholder-cream-200/40 focus:outline-none focus:border-gold-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-cream-200/60 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-gold-500 to-gold-600 text-forest-950 hover:brightness-110 shadow-xl transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Enter Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Demo Info Box */}
          <div className="mt-6 pt-5 border-t border-gold-500/20 text-center">
            <p className="text-[11px] text-gold-300/80">
              Default administrator credentials pre-filled for direct review:
            </p>
            <p className="text-[11px] text-cream-100/90 font-mono mt-1">
              admin@wedsonresort.com / admin@wedson2026
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link to="/" className="text-xs text-cream-200/60 hover:text-gold-300 transition-colors">
              ← Return to Wedson Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

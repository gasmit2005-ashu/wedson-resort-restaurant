import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ReservationModal from './components/ReservationModal';
import ResortInquiryModal from './components/ResortInquiryModal';

import Home from './pages/Home';
import About from './pages/About';
import Restaurant from './pages/Restaurant';
import Resort from './pages/Resort';
import Menu from './pages/Menu';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// Auto scroll to top on page navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Protected Admin Route Guard
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-forest-950 flex items-center justify-center text-gold-400">
        <div className="w-8 h-8 border-4 border-gold-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const [reserveModalOpen, setReserveModalOpen] = useState(false);
  const [resortModalOpen, setResortModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF7F2] text-charcoal-900 selection:bg-gold-500 selection:text-white">
      <ScrollToTop />

      {/* Public Navbar (Hidden on Admin routes) */}
      {!isAdminRoute && (
        <Navbar
          onOpenReserveTable={() => setReserveModalOpen(true)}
          onOpenResortInquiry={() => setResortModalOpen(true)}
        />
      )}

      {/* Main Page View */}
      <div className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onOpenReserveTable={() => setReserveModalOpen(true)}
                onOpenResortInquiry={() => setResortModalOpen(true)}
              />
            }
          />
          <Route
            path="/about"
            element={
              <About
                onOpenReserveTable={() => setReserveModalOpen(true)}
                onOpenResortInquiry={() => setResortModalOpen(true)}
              />
            }
          />
          <Route
            path="/restaurant"
            element={
              <Restaurant
                onOpenReserveTable={() => setReserveModalOpen(true)}
              />
            }
          />
          <Route
            path="/resort"
            element={
              <Resort
                onOpenResortInquiry={() => setResortModalOpen(true)}
              />
            }
          />
          <Route
            path="/menu"
            element={
              <Menu
                onOpenReserveTable={() => setReserveModalOpen(true)}
              />
            }
          />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* Public Footer (Hidden on Admin routes) */}
      {!isAdminRoute && (
        <Footer
          onOpenReserveTable={() => setReserveModalOpen(true)}
          onOpenResortInquiry={() => setResortModalOpen(true)}
        />
      )}

      {/* Floating WhatsApp Quick Connect Button */}
      {!isAdminRoute && (
        <WhatsAppButton
          phoneNumber="919839000000"
          defaultMessage="Hello Wedson Resort & Restaurant, I would like to inquire about booking details."
        />
      )}

      {/* Global Interactive Modals */}
      <ReservationModal
        isOpen={reserveModalOpen}
        onClose={() => setReserveModalOpen(false)}
      />
      <ResortInquiryModal
        isOpen={resortModalOpen}
        onClose={() => setResortModalOpen(false)}
      />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

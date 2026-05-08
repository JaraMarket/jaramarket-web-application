import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './components/Notification';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import VendorDashboard from './pages/vendor/Dashboard';
import VendorProducts from './pages/vendor/Products';
import VendorOrders from './pages/vendor/Orders';
import VendorWallet from './pages/vendor/Wallet';
import PrivateRoute from './components/PrivateRoute';

function AppContent() {
  const location = useLocation();
  
  return (
    <div className="app-container">
      <ScrollToTop />
      <Navbar />
      
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/marketplace" element={<PageTransition><Marketplace /></PageTransition>} />
            <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
            <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
            <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
            <Route 
              path="/vendor/dashboard" 
              element={
                <PrivateRoute role="vendor">
                  <PageTransition><VendorDashboard /></PageTransition>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/vendor/products" 
              element={
                <PrivateRoute role="vendor">
                  <PageTransition><VendorProducts /></PageTransition>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/vendor/orders" 
              element={
                <PrivateRoute role="vendor">
                  <PageTransition><VendorOrders /></PageTransition>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/vendor/wallet" 
              element={
                <PrivateRoute role="vendor">
                  <PageTransition><VendorWallet /></PageTransition>
                </PrivateRoute>
              } 
            />
          </Routes>
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <NotificationProvider>
          <Router>
            <AppContent />
          </Router>
        </NotificationProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

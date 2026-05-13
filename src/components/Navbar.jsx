import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, User, LogOut, LayoutDashboard, Wallet, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <nav className="glass" style={{ 
      height: '80px', 
      position: 'fixed', 
      top: 0, 
      width: '100%', 
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="container" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        width: '100%'
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', zIndex: 1001 }} onClick={() => setMobileMenuOpen(false)}>
          <img 
            src="/logo.jpg" 
            alt="JaraMarket" 
            style={{ height: '40px', objectFit: 'contain' }} 
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link to="/marketplace" style={{ fontWeight: '500', color: 'var(--text-secondary)' }}>Marketplace</Link>
          <Link to="/support" style={{ fontWeight: '500', color: 'var(--text-secondary)' }}>Support</Link>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginLeft: '16px' }}>
            <Link to="/cart" style={{ position: 'relative', color: 'var(--text-primary)' }}>
              <ShoppingCart size={22} />
              <span style={{ 
                position: 'absolute', 
                top: '-8px', 
                right: '-8px', 
                background: 'var(--primary)', 
                color: 'var(--btn-text)', 
                fontSize: '10px', 
                padding: '2px 6px', 
                borderRadius: '10px',
                fontWeight: '700'
              }}>{cartCount}</span>
            </Link>

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Link to={user.role === 'vendor' ? "/vendor/wallet" : "/wallet"} style={{ color: 'var(--text-primary)' }}>
                  <Wallet size={20} />
                </Link>

                {user.role === 'vendor' && (
                  <Link to="/vendor/dashboard" className="btn-primary" style={{ padding: '8px 16px', fontSize: '14px' }}>
                    <LayoutDashboard size={18} /> Dashboard
                  </Link>
                )}
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '1px solid var(--card-border)', paddingLeft: '16px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '14px', fontWeight: '600' }}>{user.firstname || user.name}</p>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{user.role}</p>
                  </div>
                  <button onClick={handleLogout} style={{ color: 'var(--text-secondary)', background: 'none' }}>
                    <LogOut size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="btn-primary">
                Get Started
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Header Actions */}
        <div className="flex-mobile" style={{ alignItems: 'center', gap: '16px', zIndex: 1001 }}>
          <Link to="/cart" style={{ position: 'relative', color: 'var(--text-primary)' }} onClick={() => setMobileMenuOpen(false)}>
            <ShoppingCart size={24} />
            <span style={{ 
              position: 'absolute', 
              top: '-8px', 
              right: '-8px', 
              background: 'var(--primary)', 
              color: 'var(--btn-text)', 
              fontSize: '10px', 
              padding: '2px 6px', 
              borderRadius: '10px',
              fontWeight: '700'
            }}>{cartCount}</span>
          </Link>
          <button onClick={toggleMobileMenu} style={{ background: 'none', color: 'var(--text-primary)' }}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="glass animate-fade" style={{
          position: 'fixed',
          top: '80px',
          left: 0,
          width: '100%',
          height: 'calc(100vh - 80px)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          zIndex: 1000,
          overflowY: 'auto'
        }}>
          <Link to="/marketplace" style={{ fontSize: '20px', fontWeight: '600' }} onClick={() => setMobileMenuOpen(false)}>Marketplace</Link>
          <Link to="/support" style={{ fontSize: '20px', fontWeight: '600' }} onClick={() => setMobileMenuOpen(false)}>Support</Link>
          
          <div style={{ borderTop: '1px solid var(--card-border)', paddingTop: '24px', marginTop: 'auto' }}>
            {user ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={24} color="var(--primary)" />
                  </div>
                  <div>
                    <p style={{ fontWeight: '700' }}>{user.firstname || user.name}</p>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{user.role}</p>
                  </div>
                </div>

                <Link to={user.role === 'vendor' ? "/vendor/wallet" : "/wallet"} className="glass" style={{ padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }} onClick={() => setMobileMenuOpen(false)}>
                  <Wallet size={20} /> Wallet
                </Link>

                {user.role === 'vendor' && (
                  <Link to="/vendor/dashboard" className="btn-primary" style={{ justifyContent: 'center' }} onClick={() => setMobileMenuOpen(false)}>
                    <LayoutDashboard size={18} /> Dashboard
                  </Link>
                )}

                <button onClick={handleLogout} className="glass" style={{ padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', color: '#ff4b2b', justifyContent: 'center' }}>
                  <LogOut size={20} /> Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setMobileMenuOpen(false)}>
                Get Started
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

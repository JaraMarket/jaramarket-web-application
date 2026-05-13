import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, User, LogOut, LayoutDashboard, Wallet } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

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
        justifyContent: 'space-between' 
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', marginRight: '40px' }}>
          <img 
            src="/logo.jpg" 
            alt="JaraMarket" 
            style={{ height: '48px', objectFit: 'contain' }} 
          />
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
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
      </div>
    </nav>
  );
};

export default Navbar;

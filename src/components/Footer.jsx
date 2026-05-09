import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ 
      padding: '80px 0 40px', 
      background: 'var(--bg-secondary)', 
      borderTop: '1px solid var(--card-border)',
      marginTop: '100px'
    }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '40px',
          marginBottom: '60px'
        }}>
          <div style={{ gridColumn: 'span 2' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <img 
                src="/logo.jpg" 
                alt="JaraMarket" 
                style={{ height: '40px', objectFit: 'contain' }} 
              />
            </Link>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '300px' }}>
              The premium destination for quality products and verified local vendors.
            </p>
          </div>

          <div>
            <h4 style={{ marginBottom: '20px' }}>Marketplace</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link to="/" style={{ color: 'var(--text-secondary)' }}>All Products</Link></li>
              <li><Link to="/" style={{ color: 'var(--text-secondary)' }}>Top Vendors</Link></li>
              <li><Link to="/" style={{ color: 'var(--text-secondary)' }}>Special Offers</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ marginBottom: '20px' }}>Support</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link to="/contact" style={{ color: 'var(--text-secondary)' }}>Contact Us</Link></li>
              <li><Link to="/privacy" style={{ color: 'var(--text-secondary)' }}>Privacy Policy</Link></li>
              <li><Link to="/terms" style={{ color: 'var(--text-secondary)' }}>Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ marginBottom: '20px' }}>Connect</h4>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              <SocialIcon icon={<Facebook size={20} />} />
              <SocialIcon icon={<Twitter size={20} />} />
              <SocialIcon icon={<Instagram size={20} />} />
              <SocialIcon icon={<Mail size={20} />} />
            </div>
            
            <h4 style={{ marginBottom: '20px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Get the App</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <StoreLink store="apple" />
              <StoreLink store="google" />
            </div>
          </div>
        </div>

        <div style={{ 
          paddingTop: '40px', 
          borderTop: '1px solid var(--card-border)', 
          textAlign: 'center',
          color: 'var(--text-secondary)',
          fontSize: '14px'
        }}>
          <p>&copy; 2026 JaraMarket. All rights reserved. Built with ❤️ for your convenience.</p>
        </div>
      </div>
    </footer>
  );
};

const StoreLink = ({ store }) => (
  <a href="#" className="glass" style={{ 
    padding: '8px 16px', 
    borderRadius: '10px', 
    display: 'flex', 
    alignItems: 'center', 
    gap: '10px',
    background: '#000',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.1)'
  }}>
    {store === 'apple' ? (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.05,20.28c-0.96,1.39-1.96,2.77-3.48,2.79c-1.49,0.02-1.97-0.89-3.68-0.89c-1.71,0-2.24,0.87-3.66,0.92 c-1.47,0.05-2.61-1.51-3.58-2.9c-1.98-2.85-3.49-8.05-1.46-11.58c1.01-1.75,2.81-2.86,4.78-2.89c1.5-0.02,2.91,1.01,3.83,1.01 c0.92,0,2.65-1.24,4.45-1.05c0.75,0.03,2.86,0.3,4.22,2.3c-0.11,0.07-2.52,1.47-2.5,4.39c0.02,3.48,3.03,4.64,3.07,4.66 C19.01,17.06,18.01,18.89,17.05,20.28z M12.04,5.19c-0.03-2.5,2.06-4.63,4.52-4.69c0.23,2.78-2.57,4.99-4.52,4.69V5.19z" />
      </svg>
    ) : (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5h.39c.28 0 .54.11.73.3l12.8 12.8c.39.39.39 1.02 0 1.41L5.62 22.2c-.19.19-.45.3-.73.3h-.39c-.83 0-1.5-.67-1.5-1.5z" opacity=".3"/>
        <path d="M17.5 12L4.5 21V3l13 9z" fill="#fff"/>
      </svg>
    )}
    <span style={{ fontSize: '13px', fontWeight: '600' }}>
      {store === 'apple' ? 'App Store' : 'Google Play'}
    </span>
  </a>
);

const SocialIcon = ({ icon }) => (
  <a href="#" className="glass" style={{ 
    width: '40px', 
    height: '40px', 
    borderRadius: '10px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    color: 'var(--text-primary)'
  }}>
    {icon}
  </a>
);

export default Footer;

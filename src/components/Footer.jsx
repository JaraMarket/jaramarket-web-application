import React from 'react';
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
              <li><Link to="/" style={{ color: 'var(--text-secondary)' }}>Help Center</Link></li>
              <li><Link to="/" style={{ color: 'var(--text-secondary)' }}>Privacy Policy</Link></li>
              <li><Link to="/" style={{ color: 'var(--text-secondary)' }}>Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ marginBottom: '20px' }}>Connect</h4>
            <div style={{ display: 'flex', gap: '16px' }}>
              <SocialIcon icon={<Facebook size={20} />} />
              <SocialIcon icon={<Twitter size={20} />} />
              <SocialIcon icon={<Instagram size={20} />} />
              <SocialIcon icon={<Mail size={20} />} />
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

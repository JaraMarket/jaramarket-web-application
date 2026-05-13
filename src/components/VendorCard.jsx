import { MapPin, Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const VendorCard = ({ vendor }) => {
  return (
    <Link to={`/vendor/${vendor.id}`} className="card glass animate-fade" style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '20px', 
      padding: '16px',
      textDecoration: 'none'
    }}>
      <div style={{ 
        width: '80px', 
        height: '80px', 
        borderRadius: '16px', 
        overflow: 'hidden',
        background: 'var(--bg-secondary)',
        flexShrink: 0
      }}>
        <img 
          src={vendor.logo || 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=150&q=80'} 
          alt={vendor.business_name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: '18px', marginBottom: '4px' }}>{vendor.business_name}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: 'var(--accent)' }}>
            <Star size={14} fill="currentColor" />
            <span>{vendor.rating || 'New'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            <MapPin size={14} />
            <span>{vendor.location || 'Online'}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {vendor.categories?.slice(0, 2).map((cat, i) => (
            <span key={i} style={{ 
              fontSize: '10px', 
              background: 'var(--bg-secondary)', 
              padding: '2px 8px', 
              borderRadius: '4px',
              color: 'var(--text-secondary)'
            }}>
              {cat}
            </span>
          ))}
        </div>
      </div>

      <div style={{ color: 'var(--text-secondary)' }}>
        <ChevronRight size={24} />
      </div>
    </Link>
  );
};

export default VendorCard;

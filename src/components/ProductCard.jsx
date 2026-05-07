import React from 'react';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNotification } from '../components/Notification';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addNotification } = useNotification();

  const handleAddToCart = () => {
    addToCart(product);
    addNotification(`${product.name} added to cart!`, 'success');
  };

  return (
    <div className="card glass animate-fade" style={{ padding: '0', overflow: 'hidden', position: 'relative' }}>
      <button style={{ 
        position: 'absolute', 
        top: '12px', 
        right: '12px', 
        background: 'var(--glass-bg)', 
        backdropFilter: 'blur(4px)',
        padding: '8px', 
        borderRadius: '50%',
        color: 'var(--text-secondary)',
        zIndex: 2
      }}>
        <Heart size={18} />
      </button>

      <div style={{ height: '200px', background: 'var(--bg-secondary)', overflow: 'hidden' }}>
        <img 
          src={product.image || 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=500&q=80'} 
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        />
      </div>

      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <span style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '600', textTransform: 'uppercase' }}>
            {product.category || 'General'}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--accent)' }}>
            <Star size={14} fill="currentColor" />
            <span>{product.rating || '4.5'}</span>
          </div>
        </div>

        <h3 style={{ fontSize: '18px', marginBottom: '12px', fontWeight: '600' }}>{product.name}</h3>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)' }}>
              ₦{product.price?.toLocaleString()}
            </span>
          </div>
          <button 
            className="btn-primary" 
            style={{ padding: '8px', borderRadius: '10px' }}
            onClick={handleAddToCart}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

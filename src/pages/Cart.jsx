import { Trash2, Plus, Minus, ArrowLeft, CreditCard, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SEO from '../components/SEO';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="container animate-fade" style={{ paddingTop: '160px', textAlign: 'center', paddingBottom: '100px' }}>
        <SEO title="Empty Cart" />
        <div style={{ marginBottom: '32px', color: 'var(--text-secondary)' }}>
          <ShoppingBag size={80} style={{ opacity: 0.2, marginBottom: '24px' }} />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything yet.</p>
        </div>
        <Link to="/marketplace" className="btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container animate-fade" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <SEO title="Your Cart" description="Review your selected food items and proceed to secure checkout." />
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', color: 'var(--text-secondary)' }}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ fontSize: '32px' }}>Your Shopping Cart</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '40px', alignItems: 'start' }}>
        {/* Cart Items List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {cart.map(item => (
            <div key={item.id} className="card glass" style={{ display: 'flex', gap: '20px', padding: '16px' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '12px', overflow: 'hidden' }}>
                <img src={item.image || 'https://via.placeholder.com/100'} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '18px' }}>{item.name}</h3>
                  <button onClick={() => removeFromCart(item.id)} style={{ color: '#ff4b4b', background: 'none' }}>
                    <Trash2 size={18} />
                  </button>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>
                  {item.category || 'General'}
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--bg-secondary)', padding: '4px 12px', borderRadius: '8px' }}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ background: 'none' }}><Minus size={16} /></button>
                    <span style={{ fontWeight: '600' }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ background: 'none' }}><Plus size={16} /></button>
                  </div>
                  <span style={{ fontWeight: '700', fontSize: '18px' }}>₦{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="card glass" style={{ position: 'sticky', top: '100px' }}>
          <h2 style={{ fontSize: '22px', marginBottom: '24px' }}>Order Summary</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
              <span style={{ fontWeight: '600' }}>₦{cartTotal.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Delivery Fee</span>
              <span style={{ fontWeight: '600' }}>₦1,000</span>
            </div>
            <div style={{ height: '1px', background: 'var(--card-border)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px' }}>
              <span style={{ fontWeight: '700' }}>Total</span>
              <span style={{ fontWeight: '700', color: 'var(--primary)' }}>₦{(cartTotal + 1000).toLocaleString()}</span>
            </div>
          </div>

          <button 
            onClick={() => navigate('/checkout')}
            className="btn-primary" 
            style={{ width: '100%', justifyContent: 'center', padding: '16px' }}
          >
            Proceed to Checkout <CreditCard size={20} />
          </button>
          
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '12px', marginTop: '16px' }}>
            Secure payment powered by JaraMarket
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;

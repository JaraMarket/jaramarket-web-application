import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { placeOrder } from '../api/orders';
import { useNotification } from '../components/Notification';
import { ArrowLeft, CreditCard, Wallet, ShieldCheck, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { addNotification } = useNotification();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('wallet');

  if (cart.length === 0) {
    navigate('/marketplace');
    return null;
  }

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const orderData = {
        items: cart.map(item => ({
          product_id: item.id,
          quantity: item.quantity
        })),
        payment_method: paymentMethod
      };

      await placeOrder(orderData);
      addNotification('Order placed successfully!', 'success');
      clearCart();
      navigate('/');
    } catch (err) {
      console.error('Checkout error:', err);
      addNotification(err.response?.data?.message || 'Failed to place order. Check your balance.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const deliveryFee = 1000;
  const total = cartTotal + deliveryFee;

  return (
    <div className="container animate-fade" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <SEO title="Checkout" />
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', color: 'var(--text-secondary)' }}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ fontSize: '32px' }}>Secure Checkout</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '40px', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Payment Method Selection */}
          <div className="card glass">
            <h2 style={{ fontSize: '20px', marginBottom: '24px' }}>Choose Payment Method</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <PaymentOption 
                selected={paymentMethod === 'wallet'}
                onClick={() => setPaymentMethod('wallet')}
                icon={<Wallet size={20} />}
                title="Jara Wallet"
                desc="Pay instantly using your JaraMarket wallet balance"
              />
              <PaymentOption 
                selected={paymentMethod === 'card'}
                onClick={() => setPaymentMethod('card')}
                icon={<CreditCard size={20} />}
                title="Credit/Debit Card"
                desc="Pay with Visa, Mastercard, or Verve"
              />
            </div>
          </div>

          {/* Delivery Information */}
          <div className="card glass">
            <h2 style={{ fontSize: '20px', marginBottom: '24px' }}>Delivery Address</h2>
            <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
              <p style={{ fontWeight: '600', marginBottom: '4px' }}>Default Address</p>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>123 Premium Way, Victoria Island, Lagos</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="card glass" style={{ position: 'sticky', top: '100px' }}>
          <h2 style={{ fontSize: '22px', marginBottom: '24px' }}>Order Summary</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{item.quantity}x {item.name}</span>
                <span style={{ fontWeight: '600' }}>₦{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div style={{ height: '1px', background: 'var(--card-border)', margin: '8px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
              <span style={{ fontWeight: '600' }}>₦{cartTotal.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Delivery Fee</span>
              <span style={{ fontWeight: '600' }}>₦{deliveryFee.toLocaleString()}</span>
            </div>
            <div style={{ height: '1px', background: 'var(--card-border)', margin: '8px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px' }}>
              <span style={{ fontWeight: '700' }}>Total</span>
              <span style={{ fontWeight: '700', color: 'var(--primary)' }}>₦{total.toLocaleString()}</span>
            </div>
          </div>

          <button 
            onClick={handlePlaceOrder}
            className="btn-primary" 
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', padding: '16px' }}
          >
            {loading ? <Loader2 className="animate-spin" /> : (
              <>
                Confirm & Pay ₦{total.toLocaleString()}
              </>
            )}
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginTop: '20px', color: '#10b981', fontSize: '13px' }}>
            <ShieldCheck size={16} />
            Secure Encrypted Transaction
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentOption = ({ selected, onClick, icon, title, desc }) => (
  <div 
    onClick={onClick}
    style={{
      padding: '16px',
      borderRadius: '12px',
      border: `2px solid ${selected ? 'var(--primary)' : 'var(--card-border)'}`,
      background: selected ? 'var(--primary-glow)' : 'transparent',
      cursor: 'pointer',
      display: 'flex',
      gap: '16px',
      transition: 'all 0.2s'
    }}
  >
    <div style={{ 
      width: '40px', 
      height: '40px', 
      borderRadius: '10px', 
      background: selected ? 'var(--primary)' : 'var(--bg-secondary)',
      color: selected ? 'white' : 'var(--text-secondary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {icon}
    </div>
    <div style={{ flex: 1 }}>
      <p style={{ fontWeight: '700', marginBottom: '2px', color: selected ? 'var(--primary)' : 'var(--text-primary)' }}>{title}</p>
      <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{desc}</p>
    </div>
    <div style={{ 
      width: '20px', 
      height: '20px', 
      borderRadius: '50%', 
      border: `2px solid ${selected ? 'var(--primary)' : 'var(--card-border)'}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {selected && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--primary)' }} />}
    </div>
  </div>
);

export default Checkout;

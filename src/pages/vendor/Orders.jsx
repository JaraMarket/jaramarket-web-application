import React, { useState, useEffect } from 'react';
import { getVendorOrders, updateOrderStatus } from '../../api/vendor';
import { Package, Clock, CheckCircle, XCircle, Search, Loader2 } from 'lucide-react';

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getVendorOrders();
      setOrders(response.data || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      alert('Failed to update order status');
    }
  };

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(o => o.status === activeTab);

  return (
    <div className="container animate-fade" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Order Fulfillment</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Track and manage your customer orders.</p>
      </div>

      {/* Status Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        marginBottom: '32px',
        overflowX: 'auto',
        paddingBottom: '8px'
      }}>
        <TabButton active={activeTab === 'all'} label="All Orders" onClick={() => setActiveTab('all')} count={orders.length} />
        <TabButton active={activeTab === 'pending'} label="Pending" onClick={() => setActiveTab('pending')} count={orders.filter(o => o.status === 'pending').length} />
        <TabButton active={activeTab === 'accepted'} label="Accepted" onClick={() => setActiveTab('accepted')} count={orders.filter(o => o.status === 'accepted').length} />
        <TabButton active={activeTab === 'delivered'} label="Delivered" onClick={() => setActiveTab('delivered')} count={orders.filter(o => o.status === 'delivered').length} />
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
          <Loader2 className="animate-spin" size={40} color="var(--primary)" />
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredOrders.map(order => (
            <div key={order.id} className="card glass" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '18px' }}>Order #{order.id}</h3>
                    <span style={{ 
                      padding: '4px 12px', 
                      borderRadius: '20px', 
                      fontSize: '12px', 
                      fontWeight: '600',
                      background: getStatusBg(order.status),
                      color: getStatusColor(order.status)
                    }}>
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                    Customer: <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{order.customer?.name || 'Test User'}</span>
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Total Amount</p>
                  <p style={{ fontSize: '20px', fontWeight: '700', color: 'var(--primary)' }}>₦{order.total_amount?.toLocaleString()}</p>
                </div>
              </div>

              <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
                <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: 'var(--text-secondary)' }}>ITEMS</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {order.items?.map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                      <span>{item.quantity}x {item.product?.name || 'Product'}</span>
                      <span style={{ fontWeight: '500' }}>₦{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                  {!order.items && <p style={{ fontSize: '14px' }}>1x Sample Product (₦5,000)</p>}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                {order.status === 'pending' && (
                  <>
                    <button 
                      onClick={() => handleStatusUpdate(order.id, 'cancelled')}
                      className="glass" 
                      style={{ color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}
                    >
                      <XCircle size={18} /> Reject
                    </button>
                    <button 
                      onClick={() => handleStatusUpdate(order.id, 'accepted')}
                      className="btn-primary"
                    >
                      <CheckCircle size={18} /> Accept Order
                    </button>
                  </>
                )}
                {order.status === 'accepted' && (
                  <button 
                    onClick={() => handleStatusUpdate(order.id, 'delivered')}
                    className="btn-primary"
                  >
                    <Package size={18} /> Mark as Delivered
                  </button>
                )}
              </div>
            </div>
          ))}
          {filteredOrders.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-secondary)' }}>
              <Clock size={48} style={{ opacity: 0.2, marginBottom: '16px' }} />
              <h3>No orders found in this category</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const TabButton = ({ active, label, onClick, count }) => (
  <button 
    onClick={onClick}
    className="glass"
    style={{ 
      padding: '10px 20px', 
      borderRadius: '12px', 
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      background: active ? 'var(--primary-glow)' : 'transparent',
      borderColor: active ? 'var(--primary)' : 'var(--card-border)',
      color: active ? 'var(--primary)' : 'var(--text-secondary)',
      flexShrink: 0
    }}
  >
    {label} <span style={{ 
      fontSize: '11px', 
      background: active ? 'var(--primary)' : 'var(--bg-secondary)', 
      color: active ? 'white' : 'var(--text-secondary)',
      padding: '2px 8px',
      borderRadius: '10px'
    }}>{count}</span>
  </button>
);

const getStatusBg = (status) => {
  switch (status) {
    case 'pending': return 'rgba(255, 140, 0, 0.1)';
    case 'accepted': return 'rgba(59, 130, 246, 0.1)';
    case 'delivered': return 'rgba(16, 185, 129, 0.1)';
    case 'cancelled': return 'rgba(239, 68, 68, 0.1)';
    default: return 'var(--bg-secondary)';
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'pending': return '#ff8c00';
    case 'accepted': return '#3b82f6';
    case 'delivered': return '#10b981';
    case 'cancelled': return '#ef4444';
    default: return 'var(--text-secondary)';
  }
};

export default VendorOrders;

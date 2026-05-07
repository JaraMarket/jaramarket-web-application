import React, { useState, useEffect } from 'react';
import { getVendorEarnings, getVendorOrders } from '../../api/vendor';
import { TrendingUp, Package, DollarSign, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import SEO from '../../components/SEO';

const VendorDashboard = () => {
  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalOrders: 0,
    pendingOrders: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [earningsData, ordersData] = await Promise.all([
          getVendorEarnings(),
          getVendorOrders()
        ]);
        setStats({
          totalEarnings: earningsData.data?.total_earnings || 0,
          totalOrders: ordersData.data?.length || 0,
          pendingOrders: ordersData.data?.filter(o => o.status === 'pending').length || 0
        });
        setRecentOrders(ordersData.data?.slice(0, 5) || []);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container animate-fade" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <SEO title="Vendor Dashboard" />
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Vendor Dashboard</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Welcome back! Here's what's happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '24px',
        marginBottom: '40px'
      }}>
        <StatCard 
          icon={<DollarSign size={24} />} 
          label="Total Revenue" 
          value={`₦${stats.totalEarnings.toLocaleString()}`} 
          trend="+12.5%" 
          positive={true} 
        />
        <StatCard 
          icon={<Package size={24} />} 
          label="Total Orders" 
          value={stats.totalOrders} 
          trend="+5.2%" 
          positive={true} 
        />
        <StatCard 
          icon={<Clock size={24} />} 
          label="Pending Orders" 
          value={stats.pendingOrders} 
          trend="-2.1%" 
          positive={false} 
        />
        <StatCard 
          icon={<TrendingUp size={24} />} 
          label="Store Rating" 
          value="4.8" 
          trend="+0.1" 
          positive={true} 
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        {/* Recent Orders Table */}
        <div className="card glass">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px' }}>Recent Orders</h2>
            <button style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '14px' }}>View All</button>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--card-border)', color: 'var(--text-secondary)', fontSize: '14px' }}>
                  <th style={{ padding: '12px 0' }}>Order ID</th>
                  <th style={{ padding: '12px 0' }}>Customer</th>
                  <th style={{ padding: '12px 0' }}>Amount</th>
                  <th style={{ padding: '12px 0' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id} style={{ borderBottom: '1px solid var(--card-border)', fontSize: '15px' }}>
                    <td style={{ padding: '16px 0' }}>#{order.id}</td>
                    <td style={{ padding: '16px 0' }}>{order.customer?.name || 'Customer'}</td>
                    <td style={{ padding: '16px 0' }}>₦{order.total_amount?.toLocaleString()}</td>
                    <td style={{ padding: '16px 0' }}>
                      <span style={{ 
                        padding: '4px 12px', 
                        borderRadius: '20px', 
                        fontSize: '12px', 
                        fontWeight: '600',
                        background: getStatusBg(order.status),
                        color: getStatusColor(order.status)
                      }}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {recentOrders.length === 0 && (
                  <tr>
                    <td colSpan="4" style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-secondary)' }}>
                      No orders found yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card glass" style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', color: 'var(--btn-text)' }}>
            <h3 style={{ marginBottom: '12px', color: 'var(--btn-text)' }}>New Product</h3>
            <p style={{ fontSize: '14px', marginBottom: '20px', opacity: 0.9 }}>Add a new item to your store catalog and start selling.</p>
            <button className="glass" style={{ width: '100%', color: 'var(--btn-text)', border: '1px solid rgba(0,0,0,0.1)' }}>
              Add Product
            </button>
          </div>

          <div className="card glass">
            <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Payout Status</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Pending Payout</span>
              <span style={{ fontWeight: '700' }}>₦45,000</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'var(--bg-secondary)', borderRadius: '3px', marginBottom: '20px' }}>
              <div style={{ width: '70%', height: '100%', background: 'var(--primary)', borderRadius: '3px' }} />
            </div>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Request Payout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, trend, positive }) => (
  <div className="card glass">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
      <div style={{ 
        width: '40px', 
        height: '40px', 
        background: 'var(--bg-secondary)', 
        borderRadius: '10px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: 'var(--primary)'
      }}>
        {icon}
      </div>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '4px', 
        fontSize: '12px', 
        fontWeight: '600',
        color: positive ? '#10b981' : '#ef4444'
      }}>
        {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {trend}
      </div>
    </div>
    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '4px' }}>{label}</p>
    <h3 style={{ fontSize: '24px' }}>{value}</h3>
  </div>
);

const getStatusBg = (status) => {
  switch (status) {
    case 'pending': return 'rgba(255, 140, 0, 0.1)';
    case 'delivered': return 'rgba(16, 185, 129, 0.1)';
    case 'cancelled': return 'rgba(239, 68, 68, 0.1)';
    default: return 'var(--bg-secondary)';
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'pending': return '#ff8c00';
    case 'delivered': return '#10b981';
    case 'cancelled': return '#ef4444';
    default: return 'var(--text-secondary)';
  }
};

export default VendorDashboard;

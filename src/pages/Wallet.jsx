import React, { useState, useEffect } from 'react';
import { getWalletStatus, initiateWalletFunding } from '../api/orders';
import { useNotification } from '../components/Notification';
import { Wallet as WalletIcon, Plus, History, ArrowRight, Loader2, Info } from 'lucide-react';
import SEO from '../components/SEO';

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [funding, setFunding] = useState(false);
  const [amount, setAmount] = useState('');
  const [showFundModal, setShowFundModal] = useState(false);
  const { addNotification } = useNotification();

  useEffect(() => {
    fetchWalletBalance();
  }, []);

  const fetchWalletBalance = async () => {
    try {
      const response = await getWalletStatus();
      setBalance(response.data?.balance || 0);
    } catch (err) {
      console.error('Error fetching wallet:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFundWallet = async (e) => {
    e.preventDefault();
    setFunding(true);
    try {
      const response = await initiateWalletFunding(parseFloat(amount));
      // In a real app, you'd redirect to payment gateway (Paystack/Flutterwave)
      addNotification(`Funding initiated! In a real scenario, you would be redirected to the payment gateway.`, 'success');
      setShowFundModal(false);
      setAmount('');
      // Simulation: refresh balance after short delay
      setTimeout(fetchWalletBalance, 2000);
    } catch (err) {
      addNotification('Failed to initiate funding.', 'error');
    } finally {
      setFunding(false);
    }
  };

  return (
    <div className="container animate-fade" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <SEO title="My Wallet" />
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Personal Wallet</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Manage your funds for seamless shopping.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
        {/* Balance Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card glass" style={{ 
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))', 
            color: 'var(--btn-text)',
            padding: '40px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px' }}>
                <WalletIcon size={32} color="white" />
              </div>
              <span style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)' }}>Available Balance</span>
            </div>
            {loading ? <Loader2 className="animate-spin" /> : (
              <h2 style={{ fontSize: '48px', color: 'var(--btn-text)', marginBottom: '8px' }}>₦{balance.toLocaleString()}</h2>
            )}
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>Ready for your next purchase</p>
          </div>

          <button 
            onClick={() => setShowFundModal(true)}
            className="btn-primary" 
            style={{ width: '100%', justifyContent: 'center', padding: '18px', fontSize: '18px' }}
          >
            <Plus size={24} /> Fund My Wallet
          </button>
        </div>

        {/* Transaction History */}
        <div className="card glass">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <History size={24} color="var(--primary)" />
            <h3 style={{ fontSize: '20px' }}>Recent Activity</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Simulation of history */}
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
              <Info size={40} style={{ opacity: 0.2, marginBottom: '16px' }} />
              <p>No recent transactions found.</p>
              <p style={{ fontSize: '12px' }}>Fund your wallet to start shopping!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fund Wallet Modal */}
      {showFundModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(5px)'
        }}>
          <div className="card glass animate-fade" style={{ width: '90%', maxWidth: '400px', padding: '40px' }}>
            <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>Fund Wallet</h2>
            <form onSubmit={handleFundWallet}>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: 'var(--text-secondary)' }}>Amount (₦)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 5000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    border: '1px solid var(--card-border)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    fontSize: '18px',
                    fontWeight: '700',
                    outline: 'none'
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  type="button" 
                  className="glass" 
                  onClick={() => setShowFundModal(false)}
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary" 
                  disabled={funding}
                  style={{ flex: 2, justifyContent: 'center' }}
                >
                  {funding ? <Loader2 className="animate-spin" /> : 'Proceed'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;

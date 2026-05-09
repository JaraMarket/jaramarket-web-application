import React, { useState, useEffect } from 'react';
import { getVendorEarnings, getVendorPayouts, requestPayout } from '../../api/vendor';
import { getBanks } from '../../api/orders';
import { Wallet, ArrowUpCircle, History, Landmark, Loader2, Info, ChevronDown } from 'lucide-react';
import { useNotification } from '../../components/Notification';

const VendorWallet = () => {
  const [balance, setBalance] = useState(0);
  const [payouts, setPayouts] = useState([]);
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState('');
  const [selectedBankId, setSelectedBankId] = useState('');
  const [requesting, setRequesting] = useState(false);
  const { addNotification } = useNotification();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [earningsData, payoutsData, banksData] = await Promise.all([
        getVendorEarnings(),
        getVendorPayouts(),
        getBanks()
      ]);
      setBalance(earningsData.data?.total_earnings || 0);
      setPayouts(payoutsData.data || []);
      setBanks(banksData.data || []);
      if (banksData.data?.length > 0) {
        setSelectedBankId(banksData.data[0].id);
      }
    } catch (err) {
      console.error('Error fetching wallet data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePayoutRequest = async (e) => {
    e.preventDefault();
    if (parseFloat(amount) > balance) {
      addNotification('Insufficient balance', 'error');
      return;
    }
    setRequesting(true);
    try {
      await requestPayout({ 
        amount: parseFloat(amount), 
        bank_id: selectedBankId, 
        remark: 'Vendor payout' 
      });
      addNotification('Payout request submitted successfully', 'success');
      setAmount('');
      fetchData();
    } catch (err) {
      addNotification('Failed to submit payout request', 'error');
    } finally {
      setRequesting(false);
    }
  };

  return (
    <div className="container animate-fade" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Store Wallet</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Track your earnings and request payouts to your bank account.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
        {/* Wallet Balance Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card glass" style={{ 
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))', 
            color: 'var(--btn-text)',
            padding: '40px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px' }}>
                <Wallet size={32} color="white" />
              </div>
              <span style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)' }}>Current Balance</span>
            </div>
            <h2 style={{ fontSize: '48px', color: 'var(--btn-text)', marginBottom: '8px' }}>₦{balance.toLocaleString()}</h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>Updated real-time from your sales</p>
          </div>

          <div className="card glass">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <ArrowUpCircle size={24} color="var(--primary)" />
              <h3 style={{ fontSize: '20px' }}>Request Payout</h3>
            </div>
            
            <form onSubmit={handlePayoutRequest}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: 'var(--text-secondary)' }}>Amount to Withdraw (₦)</label>
                <input 
                  type="number" 
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
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

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: 'var(--text-secondary)' }}>Destination Bank Account</label>
                <div style={{ position: 'relative' }}>
                  <select 
                    value={selectedBankId}
                    onChange={(e) => setSelectedBankId(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '14px 40px 14px 48px',
                      borderRadius: '12px',
                      border: '1px solid var(--card-border)',
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      fontSize: '15px',
                      outline: 'none',
                      appearance: 'none'
                    }}
                  >
                    {banks.map(bank => (
                      <option key={bank.id} value={bank.id}>
                        {bank.bank_name} • {bank.account_number}
                      </option>
                    ))}
                    {banks.length === 0 && <option value="">No banks linked</option>}
                  </select>
                  <Landmark size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                  <ChevronDown size={20} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', pointerEvents: 'none' }} />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                disabled={requesting || !amount || parseFloat(amount) <= 0 || !selectedBankId}
                style={{ width: '100%', justifyContent: 'center', padding: '16px' }}
              >
                {requesting ? <Loader2 className="animate-spin" /> : 'Withdraw Funds'}
              </button>
            </form>
          </div>
        </div>

        {/* Payout History */}
        <div className="card glass">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <History size={24} color="var(--primary)" />
            <h3 style={{ fontSize: '20px' }}>Payout History</h3>
          </div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {payouts.map(payout => (
                <div key={payout.id} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '16px',
                  borderBottom: '1px solid var(--card-border)'
                }}>
                  <div>
                    <p style={{ fontWeight: '600', marginBottom: '4px' }}>₦{payout.amount?.toLocaleString()}</p>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{new Date(payout.created_at).toLocaleDateString()}</p>
                  </div>
                  <span style={{ 
                    padding: '4px 12px', 
                    borderRadius: '20px', 
                    fontSize: '11px', 
                    fontWeight: '700',
                    background: payout.status === 'completed' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 140, 0, 0.1)',
                    color: payout.status === 'completed' ? '#10b981' : '#ff8c00'
                  }}>
                    {payout.status.toUpperCase()}
                  </span>
                </div>
              ))}
              {payouts.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
                  <Info size={32} style={{ opacity: 0.2, marginBottom: '12px' }} />
                  <p>No payout history found.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorWallet;

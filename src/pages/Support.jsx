import React, { useState } from 'react';
import { createSupportTicket } from '../api/orders';
import { useNotification } from '../components/Notification';
import { MessageSquare, Send, Loader2, LifeBuoy, Mail, Phone, HelpCircle } from 'lucide-react';
import SEO from '../components/SEO';

const Support = () => {
  const [formData, setFormData] = useState({
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const { addNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createSupportTicket(formData);
      addNotification('Support ticket created successfully. We will get back to you soon!', 'success');
      setFormData({ subject: '', message: '' });
    } catch (err) {
      addNotification('Failed to create support ticket. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container animate-fade" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <SEO title="Support Center" />
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '40px', marginBottom: '16px' }}>How can we <span className="gradient-text">help</span>?</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
          Our premium support team is available 24/7 to ensure your JaraMarket experience is flawless.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
        {/* Support Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <SupportCard 
            icon={<HelpCircle size={24} />}
            title="Knowledge Base"
            desc="Find quick answers in our comprehensive documentation and FAQs."
          />
          <SupportCard 
            icon={<Phone size={24} />}
            title="Direct Line"
            desc="Speak with a dedicated support specialist: +234 800 JARAMARKET"
          />
          <SupportCard 
            icon={<Mail size={24} />}
            title="Email Support"
            desc="Send us an email at support@jaramarket.com for complex inquiries."
          />
        </div>

        {/* Contact Form */}
        <div className="card glass" style={{ padding: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <LifeBuoy size={28} color="var(--primary)" />
            <h2 style={{ fontSize: '24px' }}>Submit a Ticket</h2>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: 'var(--text-secondary)' }}>Subject</label>
              <input 
                type="text" 
                placeholder="What do you need help with?"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '12px',
                  border: '1px solid var(--card-border)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '16px',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', color: 'var(--text-secondary)' }}>Message</label>
              <textarea 
                placeholder="Please describe your issue in detail..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '12px',
                  border: '1px solid var(--card-border)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '16px',
                  outline: 'none',
                  resize: 'none'
                }}
              />
            </div>

            <button 
              type="submit" 
              className="btn-primary" 
              disabled={loading}
              style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '16px' }}
            >
              {loading ? <Loader2 className="animate-spin" /> : (
                <>
                  Send Message <Send size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const SupportCard = ({ icon, title, desc }) => (
  <div className="card glass" style={{ display: 'flex', gap: '20px', alignItems: 'center', padding: '24px' }}>
    <div style={{ 
      width: '50px', 
      height: '50px', 
      background: 'var(--primary-glow)', 
      borderRadius: '12px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      color: 'var(--primary)'
    }}>
      {icon}
    </div>
    <div>
      <h3 style={{ fontSize: '18px', marginBottom: '4px' }}>{title}</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{desc}</p>
    </div>
  </div>
);

export default Support;

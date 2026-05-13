import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import { useNotification } from '../components/Notification';

const Contact = () => {
  const { addNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulating API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real scenario, we would POST to an endpoint that sends the email
      console.log('Form submitted to support@jaramarket.com.ng:', formData);
      
      setSubmitted(true);
      addNotification('Message sent successfully!', 'success');
    } catch (err) {
      addNotification('Failed to send message. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <SEO 
        title="Contact Us" 
        description="Have questions? Get in touch with the JaraMarket support team. We're here to help." 
      />
      
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ marginBottom: '16px' }}>Get in <span className="gradient-text">Touch</span></h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
            Have a question about our services or need help with an order? 
            Our team is available to assist you.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '40px',
          alignItems: 'start'
        }}>
          {/* Contact Information */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="card glass" style={{ padding: '32px' }}>
              <h3 style={{ marginBottom: '24px' }}>Contact Information</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <ContactItem 
                  icon={<Mail size={20} />} 
                  label="Email Us" 
                  value="support@jaramarket.com.ng" 
                  href="mailto:support@jaramarket.com.ng"
                />
                <ContactItem 
                  icon={<Phone size={20} />} 
                  label="Call Us" 
                  value="+234 (0) 800 JARAMKT" 
                  href="tel:+234800000000"
                />
                <ContactItem 
                  icon={<MapPin size={20} />} 
                  label="Office" 
                  value="Lagos, Nigeria" 
                />
              </div>

              <div style={{ marginTop: '40px' }}>
                <h4 style={{ marginBottom: '16px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Hours</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card glass" style={{ padding: '40px' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ 
                  width: '80px', 
                  height: '80px', 
                  background: 'var(--primary-glow)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  color: 'var(--primary)'
                }}>
                  <CheckCircle size={40} />
                </div>
                <h2 style={{ marginBottom: '16px' }}>Message Sent!</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
                  Thank you for reaching out. We've received your message and will get back to you 
                  at <strong>{formData.email}</strong> as soon as possible.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="btn-primary"
                  style={{ padding: '12px 32px' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="grid-2-mobile" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>Subject</label>
                  <input 
                    type="text" 
                    name="subject"
                    required
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>Message</label>
                  <textarea 
                    name="message"
                    required
                    placeholder="Your message here..."
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    style={{ ...inputStyle, resize: 'none', minHeight: '120px' }}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn-primary" 
                  disabled={loading}
                  style={{ 
                    padding: '16px', 
                    marginTop: '10px', 
                    justifyContent: 'center',
                    fontSize: '16px'
                  }}
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>Send Message <Send size={18} /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactItem = ({ icon, label, value, href }) => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
    <div style={{ 
      width: '44px', 
      height: '44px', 
      background: 'var(--bg-secondary)', 
      borderRadius: '10px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      color: 'var(--primary)',
      border: '1px solid var(--card-border)'
    }}>
      {icon}
    </div>
    <div>
      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500', marginBottom: '2px' }}>{label}</p>
      {href ? (
        <a href={href} style={{ fontWeight: '600', color: 'var(--text-primary)', textDecoration: 'none' }}>{value}</a>
      ) : (
        <p style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{value}</p>
      )}
    </div>
  </div>
);

const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  borderRadius: '12px',
  border: '1px solid var(--card-border)',
  background: 'var(--bg-secondary)',
  color: 'var(--text-primary)',
  fontSize: '16px',
  outline: 'none',
  transition: 'border-color 0.2s ease',
  '&:focus': {
    borderColor: 'var(--primary)'
  }
};

export default Contact;

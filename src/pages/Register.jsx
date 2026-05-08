import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Loader2, UserCircle, Phone, Ticket } from 'lucide-react';
import { register as apiRegister } from '../api/auth';
import SEO from '../components/SEO';

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone_number: '',
    email: '',
    password: '',
    password_confirmation: '',
    referral_code: '',
    role: 'customer'
  });
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await apiRegister(formData);
      setIsOtpSent(true);
      // We don't navigate yet because user needs to verify OTP
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container animate-fade" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      paddingTop: '80px',
      paddingBottom: '40px'
    }}>
      <SEO title="Create Account" description="Join JaraMarket today to start shopping or selling quality food and groceries." />
      <div className="card glass" style={{ 
        width: '100%', 
        maxWidth: '500px', 
        padding: '40px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Join JaraMarket</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Start your journey as a customer or vendor</p>
        </div>

        {error && (
          <div style={{ 
            background: 'rgba(255, 75, 43, 0.1)', 
            color: 'var(--primary)', 
            padding: '12px', 
            borderRadius: '8px', 
            marginBottom: '20px',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'customer' })}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '12px',
                border: `1px solid ${formData.role === 'customer' ? 'var(--primary)' : 'var(--card-border)'}`,
                background: formData.role === 'customer' ? 'var(--primary-glow)' : 'transparent',
                color: formData.role === 'customer' ? 'var(--primary)' : 'var(--text-secondary)',
                fontWeight: '600'
              }}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'vendor' })}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '12px',
                border: `1px solid ${formData.role === 'vendor' ? 'var(--primary)' : 'var(--card-border)'}`,
                background: formData.role === 'vendor' ? 'var(--primary-glow)' : 'transparent',
                color: formData.role === 'vendor' ? 'var(--primary)' : 'var(--text-secondary)',
                fontWeight: '600'
              }}
            >
              Vendor
            </button>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <UserCircle size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input
                name="firstname"
                type="text"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '14px 14px 14px 48px',
                  borderRadius: '12px',
                  border: '1px solid var(--card-border)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '16px',
                  outline: 'none'
                }}
              />
            </div>
            <div style={{ position: 'relative', flex: 1 }}>
              <UserCircle size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input
                name="lastname"
                type="text"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '14px 14px 14px 48px',
                  borderRadius: '12px',
                  border: '1px solid var(--card-border)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '16px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <Phone size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input
              name="phone_number"
              type="tel"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '14px 14px 14px 48px',
                borderRadius: '12px',
                border: '1px solid var(--card-border)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontSize: '16px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '14px 14px 14px 48px',
                borderRadius: '12px',
                border: '1px solid var(--card-border)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontSize: '16px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '14px 14px 14px 48px',
                borderRadius: '12px',
                border: '1px solid var(--card-border)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontSize: '16px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input
              name="password_confirmation"
              type="password"
              placeholder="Confirm Password"
              value={formData.password_confirmation}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '14px 14px 14px 48px',
                borderRadius: '12px',
                border: '1px solid var(--card-border)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontSize: '16px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Ticket size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input
              name="referral_code"
              type="text"
              placeholder="Referral Code (Optional)"
              value={formData.referral_code}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '14px 14px 14px 48px',
                borderRadius: '12px',
                border: '1px solid var(--card-border)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontSize: '16px',
                outline: 'none'
              }}
            />
          </div>

          {isOtpSent ? (
            <div style={{ textAlign: 'center', padding: '20px', background: 'var(--primary-glow)', borderRadius: '12px' }}>
              <p style={{ color: 'var(--primary)', fontWeight: '600', marginBottom: '10px' }}>OTP Sent!</p>
              <p style={{ fontSize: '14px' }}>Please check your email for the verification code.</p>
              <button 
                type="button" 
                onClick={() => navigate('/login')}
                className="btn-primary"
                style={{ marginTop: '16px', width: '100%' }}
              >
                Go to Login
              </button>
            </div>
          ) : (
            <button 
              type="submit" 
              className="btn-primary" 
              disabled={loading}
              style={{ width: '100%', justifyContent: 'center', padding: '16px', marginTop: '10px' }}
            >
              {loading ? <Loader2 className="animate-spin" /> : (
                <>
                  Create Account <ArrowRight size={18} />
                </>
              )}
            </button>
          )}
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px' }}>
          <p style={{ color: 'var(--text-secondary)' }}>
            Already have an account? {' '}
            <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

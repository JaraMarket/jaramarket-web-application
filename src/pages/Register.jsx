import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, Loader2, UserCircle, Phone, Ticket, ShieldCheck, RefreshCw } from 'lucide-react';
import { register as apiRegister, validateOtp, resendOtp } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../components/Notification';
import GoogleSignInButton from '../components/GoogleSignInButton';
import SEO from '../components/SEO';

const Register = () => {
  const { checkAuth } = useAuth();
  const { addNotification } = useNotification();
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
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const otpInputs = React.useRef([]);

  useEffect(() => {
    let interval;
    if (isOtpSent && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [isOtpSent, resendTimer]);

  useEffect(() => {
    if (isOtpSent && otpInputs.current[0]) {
      otpInputs.current[0].focus();
    }
  }, [isOtpSent]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.value !== '' && index < 5) {
      otpInputs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await apiRegister(formData);
      setIsOtpSent(true);
      setResendTimer(60);
      setCanResend(false);
      setSuccess('Account created! Verification code sent to your email.');
    } catch (err) {
      console.error('Registration error:', err);
      if (err.response) {
        const message = err.response.data.message;
        const errors = err.response.data.errors;
        
        if (message === 'All transports failed.') {
          setError('We created your account, but could not send the verification email. Please try "Resend Code" in a moment or contact support.');
          setIsOtpSent(true); // Still move to OTP screen so they can try resending
        } else if (errors) {
          // Display the first validation error found
          const firstError = Object.values(errors)[0][0];
          setError(firstError);
        } else {
          setError(message || 'Registration failed. Please try again.');
        }
      } else if (err.request) {
        setError('No response from server. Please check your internet connection.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length < 6) {
      setError('Please enter the full 6-digit code.');
      return;
    }

    setIsVerifying(true);
    setError(null);
    setSuccess(null);
    try {
      await validateOtp({ email: formData.email, otp: otpValue });
      setSuccess('Email verified successfully! Welcome to JaraMarket.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid verification code. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;

    setIsResending(true);
    setError(null);
    setSuccess(null);
    try {
      await resendOtp(formData.email);
      setSuccess('A fresh verification code has been sent.');
      setResendTimer(60);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      otpInputs.current[0].focus();
    } catch (err) {
      if (err.response?.data?.message === 'All transports failed.') {
        setError('Still unable to send email. Please check if your email address is correct or try again later.');
      } else {
        setError(err.response?.data?.message || 'Failed to resend code. Please try again.');
      }
    } finally {
      setIsResending(false);
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
          <p style={{ color: 'var(--text-secondary)' }}>Experience premium commerce starting today</p>
        </div>

        {error && (
          <div style={{ 
            background: 'rgba(255, 75, 43, 0.1)', 
            color: '#ff4b2b', 
            padding: '12px', 
            borderRadius: '8px', 
            marginBottom: '20px',
            fontSize: '14px',
            textAlign: 'center',
            fontWeight: '500',
            border: '1px solid rgba(255, 75, 43, 0.2)'
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ 
            background: 'rgba(34, 197, 94, 0.1)', 
            color: '#22c55e', 
            padding: '12px', 
            borderRadius: '8px', 
            marginBottom: '20px',
            fontSize: '14px',
            textAlign: 'center',
            fontWeight: '500',
            border: '1px solid rgba(34, 197, 94, 0.2)'
          }}>
            {success}
          </div>
        )}

        {isOtpSent ? (
          <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                We've sent a 6-digit verification code to <br />
                <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}>{formData.email}</span>
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  ref={(el) => (otpInputs.current[index] = el)}
                  value={data}
                  onChange={(e) => handleOtpChange(e.target, index)}
                  onKeyDown={(e) => handleOtpKeyDown(e, index)}
                  style={{
                    width: '45px',
                    height: '55px',
                    borderRadius: '12px',
                    border: `2px solid ${otp[index] ? 'var(--primary)' : 'var(--card-border)'}`,
                    background: 'var(--bg-secondary)',
                    textAlign: 'center',
                    fontSize: '20px',
                    fontWeight: '700',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    transition: 'var(--transition)'
                  }}
                />
              ))}
            </div>

            <button 
              type="submit" 
              className="btn-primary" 
              disabled={isVerifying}
              style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '16px' }}
            >
              {isVerifying ? <Loader2 className="animate-spin" /> : 'Complete Verification'}
            </button>

            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                Didn't receive the code?
              </p>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={!canResend || isResending}
                style={{
                  background: 'none',
                  border: 'none',
                  color: canResend ? 'var(--primary)' : 'var(--text-secondary)',
                  cursor: canResend ? 'pointer' : 'not-allowed',
                  fontSize: '14px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  opacity: canResend ? 1 : 0.7
                }}
              >
                {isResending ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <RefreshCw size={16} className={isResending ? 'animate-spin' : ''} style={{ display: canResend ? 'block' : 'none' }} />
                )}
                {canResend ? 'Resend Verification Code' : `Resend available in ${Math.floor(resendTimer / 60)}:${(resendTimer % 60).toString().padStart(2, '0')}`}
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsOtpSent(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                textDecoration: 'underline',
                marginTop: '8px'
              }}
            >
              Entered wrong email? Edit email address
            </button>
          </form>
        ) : (
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
          </form>
        )}

        {!isOtpSent && (
          <>
            <div style={{ margin: '24px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--card-border)' }}></div>
              <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>or continue with</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--card-border)' }}></div>
            </div>

            <GoogleSignInButton 
              role={formData.role}
              onSuccess={(userData) => {
                checkAuth();
                addNotification(`Welcome, ${userData.firstname || userData.name}!`, 'success');
                if (userData.role === 'vendor') {
                  navigate('/vendor/dashboard');
                } else {
                  navigate('/');
                }
              }} 
              onError={(msg) => addNotification(msg, 'error')}
            />
          </>
        )}

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

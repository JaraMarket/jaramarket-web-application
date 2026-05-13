import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

/**
 * GoogleSignInButton
 *
 * Props:
 * - role: 'customer' | 'vendor' (defaults to 'customer')
 * - onSuccess: function(userData) — called after successful login, receives user object
 * - onError: function(errorMessage) — called if login fails
 */
const GoogleSignInButton = ({ role = 'customer', onSuccess, onError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { socialLogin } = useAuth();

  const handleGoogleSuccess = async (tokenResponse) => {
    setIsLoading(true);
    try {
      // FIX: The backend specifically expects the key 'token'
      // not 'access_token'.
      const userData = await socialLogin({
        token: tokenResponse.access_token, 
        role: role
      });

      if (onSuccess) onSuccess(userData);

    } catch (error) {
      console.error('Google Sign-In Error:', error);
      const errorMsg = error.response?.data?.message || 'Google sign-in failed. Please try again.';
      if (onError) onError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    const msg = 'Google sign-in was cancelled or failed. Please try again.';
    console.error(msg);
    if (onError) onError(msg);
  };

  const login = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleError,
  });

  return (
    <button
      onClick={() => login()}
      disabled={isLoading}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 20px',
        border: '1px solid var(--card-border)',
        borderRadius: '12px',
        backgroundColor: 'var(--bg-secondary)',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        fontSize: '16px',
        fontWeight: '600',
        color: 'var(--text-primary)',
        width: '100%',
        justifyContent: 'center',
        transition: 'all 0.2s ease',
        marginTop: '10px'
      }}
      onMouseOver={(e) => e.currentTarget.style.background = 'var(--primary-glow)'}
      onMouseOut={(e) => e.currentTarget.style.background = 'var(--bg-secondary)'}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" size={20} />
      ) : (
        <>
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </>
      )}
    </button>
  );
};

export default GoogleSignInButton;

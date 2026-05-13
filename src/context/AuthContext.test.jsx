import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { AuthProvider, useAuth } from './AuthContext';

describe('AuthContext', () => {
  it('provides authentication state', () => {
    const TestComponent = () => {
      const { isAuthenticated } = useAuth();
      return <div data-testid="auth-status">{isAuthenticated ? 'Yes' : 'No'}</div>;
    };

    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Default state should be unauthenticated (or whatever logic exists in the context)
    expect(getByTestId('auth-status')).toHaveTextContent('No');
  });
});

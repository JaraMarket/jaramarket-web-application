import { useEffect } from 'react';
import SEO from '../components/SEO';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container animate-fade" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <SEO 
        title="Privacy Policy" 
        description="Learn how JaraMarket collects, uses, and protects your personal information."
      />
      
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>Privacy Policy</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>Effective Date: May 8, 2026</p>

        <section style={{ marginBottom: '32px' }}>
          <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px' }}>
            Welcome to JaraMarket. Your privacy is important to us. This Privacy Policy explains how JaraMarket collects, uses, stores, protects, and shares your information when you use our website, mobile applications, vendor platforms, delivery systems, wallet services, and related products and services.
          </p>
          <p style={{ fontSize: '18px', lineHeight: '1.8' }}>
            By using JaraMarket, you agree to the practices described in this Privacy Policy.
          </p>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid var(--card-border)', margin: '40px 0' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <section>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>1. Information We Collect</h2>
            <p style={{ marginBottom: '16px' }}>We collect information to provide efficient grocery, recipe, logistics, payment, and marketplace services.</p>
            
            <h3 style={{ fontSize: '18px', marginBottom: '12px', marginTop: '20px' }}>A. Personal Information</h3>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>Full name, Phone number, Email address</li>
              <li>Residential or delivery address</li>
              <li>Profile photograph</li>
              <li>Date of birth & Gender (optional)</li>
              <li>Government-issued identification where required</li>
              <li>Business registration & Bank details for vendors and riders</li>
            </ul>

            <h3 style={{ fontSize: '18px', marginBottom: '12px', marginTop: '20px' }}>B. Account & Wallet Information</h3>
            <p style={{ marginBottom: '12px' }}>When you use the JaraMarket wallet or payment services, we may collect transaction records, payment references, and top-up history.</p>
            <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px', fontSize: '14px', borderLeft: '4px solid var(--primary)' }}>
              <strong>Important:</strong> JaraMarket does not store your full debit/credit card details on its servers. Card processing is handled securely by licensed third-party payment processors.
            </div>
          </section>

          <section>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>2. How We Use Your Information</h2>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>Create and manage your account</li>
              <li>Process orders and deliveries</li>
              <li>Facilitate wallet transactions</li>
              <li>Match orders with vendors and dispatch riders</li>
              <li>Improve recipe recommendations and personalize meal suggestions</li>
              <li>Provide customer support</li>
              <li>Prevent fraud and comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>3. Location Information</h2>
            <p style={{ lineHeight: '1.8' }}>
              JaraMarket may collect real-time location data to improve delivery accuracy, match nearby vendors and dispatch riders, and prevent fraudulent transactions. You may disable location permissions through your device settings.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>4. Data Security</h2>
            <p style={{ lineHeight: '1.8' }}>
              We implement reasonable administrative, technical, and physical safeguards to protect your information, including encrypted communications, secure payment gateways, and authentication controls. However, no digital platform can guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>5. How We Share Information</h2>
            <p style={{ marginBottom: '12px' }}>We do not sell personal information to third parties. We may share information with:</p>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
              <li><strong>Vendors & Delivery Partners:</strong> To fulfill orders and deliveries.</li>
              <li><strong>Payment Service Providers:</strong> To securely process transactions.</li>
              <li><strong>Legal Authorities:</strong> Where required by law or fraud investigation.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>6. Your Rights</h2>
            <p style={{ lineHeight: '1.8' }}>
              Depending on applicable laws, users may have rights to access, correct, or request deletion of their personal data. Requests may be submitted through JaraMarket support channels.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>7. Contact Us</h2>
            <p style={{ lineHeight: '1.8' }}>
              For questions, complaints, or privacy-related requests, contact:<br />
              <strong>JaraMarket Support Team</strong><br />
              Email: support@jaramarket.com.ng<br />
              Website: jaramarket.com.ng
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

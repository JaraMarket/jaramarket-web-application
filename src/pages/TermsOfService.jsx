import { useEffect } from 'react';
import SEO from '../components/SEO';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container animate-fade" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <SEO 
        title="Terms of Service" 
        description="Read the terms and conditions for using JaraMarket services."
      />
      
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>Terms of Service</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>Effective Date: May 8, 2026</p>

        <section style={{ marginBottom: '32px' }}>
          <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '24px' }}>
            Welcome to JaraMarket. By accessing or using our website, mobile applications, wallet services, vendor systems, delivery network, or related services, you agree to comply with these Terms of Service.
          </p>
          <p style={{ fontSize: '18px', lineHeight: '1.8' }}>
            If you do not agree with these terms, please do not use the platform.
          </p>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid var(--card-border)', margin: '40px 0' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <section>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>1. Eligibility</h2>
            <p style={{ lineHeight: '1.8' }}>
              You must be legally capable of entering into binding agreements under applicable laws to use JaraMarket services. By using the platform, you confirm that the information you provide is accurate, you will use the platform lawfully, and you are responsible for activities under your account.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>2. Services Provided</h2>
            <p style={{ marginBottom: '12px' }}>JaraMarket provides:</p>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>Recipe and grocery marketplace services</li>
              <li>Ingredient sourcing and delivery</li>
              <li>Vendor marketplace access</li>
              <li>Wallet and payment support</li>
              <li>Dispatch and logistics coordination</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>3. User Accounts</h2>
            <p style={{ lineHeight: '1.8' }}>
              Users are responsible for maintaining account confidentiality and all activities conducted through their account. JaraMarket reserves the right to suspend or terminate accounts involved in fraud, abuse, or violation of these Terms.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>4. Orders & Deliveries</h2>
            <p style={{ lineHeight: '1.8' }}>
              Orders are subject to vendor availability. Delivery timelines are estimates and may vary. Users must provide accurate delivery information. Failed deliveries caused by incorrect information may attract additional charges.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>5. Wallet & Payments</h2>
            <p style={{ lineHeight: '1.8' }}>
              Wallet balances may only be used within approved JaraMarket services. Users are responsible for verifying transactions. JaraMarket does not store full debit or credit card details on its servers.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>6. Intellectual Property</h2>
            <p style={{ lineHeight: '1.8' }}>
              All platform content including logos, branding, software, designs, recipes, and graphics remain the property of JaraMarket or its licensors and may not be copied or distributed without permission.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>7. Limitation of Liability</h2>
            <p style={{ lineHeight: '1.8' }}>
              To the maximum extent permitted by law, JaraMarket shall not be liable for indirect damages, delivery delays, vendor stock shortages, or third-party payment failures. Services are provided on an "as available" basis.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>8. Governing Law</h2>
            <p style={{ lineHeight: '1.8' }}>
              These Terms shall be governed by the laws of the Federal Republic of Nigeria.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>9. Contact Information</h2>
            <p style={{ lineHeight: '1.8' }}>
              For support or legal inquiries:<br />
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

export default TermsOfService;

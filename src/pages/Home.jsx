import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Store, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

const Home = () => {
  return (
    <div className="animate-fade">
      <SEO title="Home" description="Connect with verified food vendors and enjoy quality meals." />
      {/* Hero Section */}
      <section style={{ 
        padding: '160px 0 100px', 
        background: 'radial-gradient(circle at top right, var(--primary-glow), transparent 40%)',
        textAlign: 'center'
      }}>
        <div className="container">
          <span style={{ 
            background: 'var(--primary-glow)', 
            color: 'var(--primary)', 
            padding: '8px 20px', 
            borderRadius: '20px', 
            fontSize: '14px', 
            fontWeight: '600',
            marginBottom: '24px',
            display: 'inline-block'
          }}>
            The Future of Local Commerce
          </span>
          <h1 style={{ fontSize: 'clamp(40px, 8vw, 72px)', lineHeight: '1.1', marginBottom: '24px' }}>
            Experience the <span className="gradient-text">Premium</span> <br /> 
            Marketplace
          </h1>
          <p style={{ 
            fontSize: '20px', 
            color: 'var(--text-secondary)', 
            maxWidth: '600px', 
            margin: '0 auto 40px',
            lineHeight: '1.6'
          }}>
            Connect with verified vendors, discover quality products, and enjoy 
            seamless deliveries—all in one elegant platform.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <Link to="/register" className="btn-primary" style={{ padding: '16px 32px', fontSize: '18px' }}>
              Get Started Now <ArrowRight size={20} />
            </Link>
            <Link to="/marketplace" className="glass" style={{ 
              padding: '16px 32px', 
              borderRadius: '12px', 
              fontWeight: '600',
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center'
            }}>
              Browse Market
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '32px' 
          }}>
            <FeatureCard 
              icon={<ShoppingBag size={24} />} 
              title="Swift Shopping" 
              desc="Intuitive interface designed for the fastest shopping experience."
            />
            <FeatureCard 
              icon={<Store size={24} />} 
              title="Verified Vendors" 
              desc="We only partner with the most reliable local businesses."
            />
            <FeatureCard 
              icon={<ShieldCheck size={24} />} 
              title="Secure Payments" 
              desc="Your transactions are protected by industry-leading security."
            />
            <FeatureCard 
              icon={<Zap size={24} />} 
              title="Instant Updates" 
              desc="Real-time tracking and notifications for every order status."
            />
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section style={{ padding: '60px 0', borderTop: '1px solid var(--card-border)', borderBottom: '1px solid var(--card-border)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '40px' }}>
            <StatItem value="150+" label="Local Vendors" />
            <StatItem value="12k+" label="Happy Customers" />
            <StatItem value="45k+" label="Orders Delivered" />
            <StatItem value="4.9/5" label="Average Rating" />
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section style={{ padding: '100px 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '40px', marginBottom: '24px' }}>Marketplace in your pocket</h2>
              <p style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: '1.6' }}>
                Our mobile-first design ensures that whether you're a vendor managing orders 
                or a customer looking for the best deals, the experience is always smooth, 
                fast, and beautiful.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <CheckItem text="Real-time order tracking" />
                <CheckItem text="Instant vendor-customer chat" />
                <CheckItem text="Secure one-click payments" />
                <CheckItem text="Personalized recommendations" />
              </ul>
            </div>
            <div className="glass" style={{ 
              height: '500px', 
              borderRadius: '40px', 
              padding: '20px', 
              border: '8px solid var(--card-border)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=800&q=80" 
                alt="App Preview" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const StatItem = ({ value, label }) => (
  <div style={{ textAlign: 'center' }}>
    <h3 style={{ fontSize: '36px', color: 'var(--primary)', marginBottom: '4px' }}>{value}</h3>
    <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>{label}</p>
  </div>
);

const CheckItem = ({ text }) => (
  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '500' }}>
    <div style={{ color: 'var(--primary)', background: 'var(--primary-glow)', padding: '4px', borderRadius: '50%', display: 'flex' }}>
      <ShieldCheck size={16} />
    </div>
    {text}
  </li>
);

const FeatureCard = ({ icon, title, desc }) => (
  <div className="card glass" style={{ textAlign: 'left' }}>
    <div style={{ 
      width: '48px', 
      height: '48px', 
      background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--btn-text)',
      marginBottom: '20px'
    }}>
      {icon}
    </div>
    <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>{title}</h3>
    <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>{desc}</p>
  </div>
);

export default Home;

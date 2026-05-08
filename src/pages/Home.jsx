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
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                <CheckItem text="Real-time order tracking" />
                <CheckItem text="Instant vendor-customer chat" />
                <CheckItem text="Secure one-click payments" />
                <CheckItem text="Personalized recommendations" />
              </ul>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <AppStoreButton 
                  store="apple" 
                  url="#" 
                  title="App Store" 
                  subtitle="Download on the"
                />
                <AppStoreButton 
                  store="google" 
                  url="#" 
                  title="Google Play" 
                  subtitle="GET IT ON"
                />
              </div>
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

const AppStoreButton = ({ store, url, title, subtitle }) => (
  <a href={url} className="glass" style={{
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 20px',
    borderRadius: '12px',
    background: '#000',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.1)',
    minWidth: '170px',
    transition: 'transform 0.2s ease',
  }}
  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
  >
    {store === 'apple' ? (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.05,20.28c-0.96,1.39-1.96,2.77-3.48,2.79c-1.49,0.02-1.97-0.89-3.68-0.89c-1.71,0-2.24,0.87-3.66,0.92 c-1.47,0.05-2.61-1.51-3.58-2.9c-1.98-2.85-3.49-8.05-1.46-11.58c1.01-1.75,2.81-2.86,4.78-2.89c1.5-0.02,2.91,1.01,3.83,1.01 c0.92,0,2.65-1.24,4.45-1.05c0.75,0.03,2.86,0.3,4.22,2.3c-0.11,0.07-2.52,1.47-2.5,4.39c0.02,3.48,3.03,4.64,3.07,4.66 C19.01,17.06,18.01,18.89,17.05,20.28z M12.04,5.19c-0.03-2.5,2.06-4.63,4.52-4.69c0.23,2.78-2.57,4.99-4.52,4.69V5.19z" />
      </svg>
    ) : (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5h.39c.28 0 .54.11.73.3l12.8 12.8c.39.39.39 1.02 0 1.41L5.62 22.2c-.19.19-.45.3-.73.3h-.39c-.83 0-1.5-.67-1.5-1.5z" opacity=".3"/>
        <path d="M17.5 12L4.5 21V3l13 9z" fill="#fff"/>
        <path d="M17.5 12L4.5 21V3l13 9z" fill="url(#google-play-gradient)"/>
        <defs>
          <linearGradient id="google-play-gradient" x1="4.5" y1="3" x2="17.5" y2="21" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00f0ff"/>
            <stop offset="1" stopColor="#00ff94"/>
          </linearGradient>
        </defs>
      </svg>
    )}
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: '1.2' }}>
      <span style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.8 }}>{subtitle}</span>
      <span style={{ fontSize: '18px', fontWeight: '700' }}>{title}</span>
    </div>
  </a>
);

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

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag, Store, ShieldCheck, Zap, ArrowRight,
  Leaf, Truck, Wallet, ChefHat, Heart, Globe, Loader2
} from 'lucide-react';
import SEO from '../components/SEO';
import { getCategories } from '../api/categories';

const BASE_URL = 'https://jara-market-laravel-backend-production.up.railway.app';


const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="animate-fade">
      <SEO
        title="Home"
        description="JaraMarket — Nigeria's recipe-first grocery marketplace. Select your meal, we source the freshest ingredients from trusted local vendors and deliver to your door."
      />

      {/* ── Hero ── */}
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
            Nigeria's Recipe-First Grocery Marketplace
          </span>

          <h1 style={{ fontSize: 'clamp(40px, 8vw, 72px)', lineHeight: '1.1', marginBottom: '24px' }}>
            From Recipe to <span className="gradient-text">Doorstep</span> <br />
            — Fresh, Fast & Cultural
          </h1>

          <p style={{
            fontSize: '20px',
            color: 'var(--text-secondary)',
            maxWidth: '640px',
            margin: '0 auto 40px',
            lineHeight: '1.7'
          }}>
            Choose your favourite African or continental meal, and we'll source the freshest
            ingredients from trusted local vendors — packaged hygienically and delivered right to you.
          </p>

          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn-primary" style={{ padding: '16px 32px', fontSize: '18px' }}>
              Get Started <ArrowRight size={20} />
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

      {/* ── Philosophy Quote ── */}
      <section style={{
        padding: '70px 0',
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
        textAlign: 'center'
      }}>
        <div className="container">
          <p style={{
            fontSize: 'clamp(22px, 4vw, 36px)',
            fontWeight: '700',
            color: '#fff',
            fontStyle: 'italic',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.5'
          }}>
            "Food is not just fuel — it's culture, health, and community."
          </p>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginTop: '16px', fontWeight: '500' }}>
            — The JaraMarket Philosophy
          </p>
        </div>
      </section>

      {/* ── Core Features ── */}
      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 44px)', marginBottom: '16px' }}>
              Everything You Need to Eat <span className="gradient-text">Better</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '560px', margin: '0 auto' }}>
              JaraMarket combines recipes, vendors, logistics, and payments into one seamless experience.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '32px'
          }}>
            <FeatureCard
              icon={<ChefHat size={24} />}
              title="Recipe-Based Shopping"
              desc="Select a meal, we build the shopping list. Ingredient sourcing made intelligent."
            />
            <FeatureCard
              icon={<Globe size={24} />}
              title="African & Continental Meals"
              desc="From jollof rice to continental salads — hundreds of authentic meal categories."
            />
            <FeatureCard
              icon={<Heart size={24} />}
              title="Smart Health Prediction"
              desc="Personalised, health-conscious meal suggestions powered by smart algorithms."
            />
            <FeatureCard
              icon={<Store size={24} />}
              title="Verified Local Vendors"
              desc="We digitize and partner with trusted neighbourhood markets and food vendors."
            />
            <FeatureCard
              icon={<Truck size={24} />}
              title="Ryda Dispatch Delivery"
              desc="Doorstep ingredient delivery powered by our integrated Ryda logistics network."
            />
            <FeatureCard
              icon={<Wallet size={24} />}
              title="Wallet & Payments"
              desc="Seamless, secure payments with a built-in wallet ecosystem for every transaction."
            />
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{
        padding: '60px 0',
        borderTop: '1px solid var(--card-border)',
        borderBottom: '1px solid var(--card-border)'
      }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '40px' }}>
            <StatItem value="150+" label="Local Vendors" />
            <StatItem value="12k+" label="Happy Customers" />
            <StatItem value="45k+" label="Orders Delivered" />
            <StatItem value="4.9/5" label="Average Rating" />
          </div>
        </div>
      </section>

      {/* ── Meal Categories ── */}
      <section style={{ padding: '100px 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 44px)', marginBottom: '16px' }}>
              Explore Our <span className="gradient-text">Meal Categories</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>
              From hearty tribal soups to modern keto options — we've got every taste covered.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '24px'
          }}>
            {loading ? (
              <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
                <Loader2 className="animate-spin" size={40} color="var(--primary)" />
              </div>
            ) : (
              categories.map((cat) => (
                <CategoryCard 
                  key={cat.id} 
                  name={cat.name} 
                  image={cat.image ? `${BASE_URL}/storage/${cat.image}` : null} 
                />
              ))
            )}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/marketplace" className="btn-primary" style={{ padding: '14px 36px', fontSize: '17px' }}>
              See All Meals <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why JaraMarket ── */}
      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '80px',
            alignItems: 'center'
          }}>
            <div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', marginBottom: '20px' }}>
                Why JaraMarket is <span className="gradient-text">Different</span>
              </h2>
              <p style={{
                fontSize: '17px',
                color: 'var(--text-secondary)',
                marginBottom: '32px',
                lineHeight: '1.7'
              }}>
                Unlike typical food delivery apps, JaraMarket specialises in <strong>ingredient sourcing</strong> — 
                giving you the flexibility to cook fresh, eat healthy, and stay connected to your culinary roots.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                <CheckItem text="Recipe-first ordering — not just ready-made meals" />
                <CheckItem text="Personalized recipe experiences tailored to you" />
                <CheckItem text="Health-based meal recommendations" />
                <CheckItem text="Vendor ecosystem that empowers local markets" />
                <CheckItem text="African traditional meals, not just fast food" />
              </ul>
              <Link to="/register" className="btn-primary" style={{ padding: '14px 30px' }}>
                Join JaraMarket <ArrowRight size={18} />
              </Link>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px'
            }}>
              {[
                { icon: <ChefHat size={28} />, label: 'Recipe Intelligence' },
                { icon: <Truck size={28} />, label: 'Logistics Network' },
                { icon: <Leaf size={28} />, label: 'Healthy Eating' },
                { icon: <Store size={28} />, label: 'Vendor Digitization' },
              ].map(({ icon, label }) => (
                <div key={label} className="card glass" style={{ textAlign: 'center', padding: '32px 20px' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--btn-text)',
                    margin: '0 auto 16px'
                  }}>
                    {icon}
                  </div>
                  <p style={{ fontWeight: '600', fontSize: '15px' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision Banner ── */}
      <section style={{
        padding: '80px 0',
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--card-border)'
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', marginBottom: '20px' }}>
            Building Africa's <span className="gradient-text">Food Future</span>
          </h2>
          <p style={{
            fontSize: '18px',
            color: 'var(--text-secondary)',
            maxWidth: '700px',
            margin: '0 auto 40px',
            lineHeight: '1.7'
          }}>
            JaraMarket is evolving into a full African food commerce ecosystem — a recipe intelligence
            platform, smart nutrition marketplace, vendor digitization network, and logistics-driven
            food infrastructure company across Africa.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn-primary" style={{ padding: '14px 32px', fontSize: '17px' }}>
              Start Your Journey <ArrowRight size={18} />
            </Link>
            <a
              href="mailto:support@jaramarket.com.ng"
              className="glass"
              style={{
                padding: '14px 32px',
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: '17px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ── Sub-components ── */

const CategoryCard = ({ emoji, name, image }) => (
  <div
    className="card glass"
    style={{
      textAlign: 'center',
      padding: '28px 16px',
      cursor: 'pointer',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-6px)';
      e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '';
    }}
  >
    {image ? (
      <img 
        src={image} 
        alt={name} 
        style={{ 
          width: '60px', 
          height: '60px', 
          borderRadius: '50%', 
          objectFit: 'cover', 
          marginBottom: '12px',
          margin: '0 auto 12px',
          display: 'block'
        }} 
      />
    ) : (
      <span style={{ fontSize: '40px', display: 'block', marginBottom: '12px' }}>{emoji || '📦'}</span>
    )}
    <p style={{ fontWeight: '600', fontSize: '14px' }}>{name}</p>
  </div>
);

const StatItem = ({ value, label }) => (
  <div style={{ textAlign: 'center' }}>
    <h3 style={{ fontSize: '36px', color: 'var(--primary)', marginBottom: '4px' }}>{value}</h3>
    <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>{label}</p>
  </div>
);

const CheckItem = ({ text }) => (
  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '500' }}>
    <div style={{
      color: 'var(--primary)',
      background: 'var(--primary-glow)',
      padding: '4px',
      borderRadius: '50%',
      display: 'flex',
      flexShrink: 0
    }}>
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

import React, { useState, useEffect, useMemo } from 'react';
import { getProducts, searchAdvertisements } from '../api/products';
import { getVendors, getCategories } from '../api/vendors';
import ProductCard from '../components/ProductCard';
import VendorCard from '../components/VendorCard';
import { Search, SlidersHorizontal, Loader2, LayoutGrid, AlertCircle, Tag } from 'lucide-react';
import SEO from '../components/SEO';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://jara-market-laravel-backend-production.up.railway.app';
// Strip /api if present for storage paths
const STORAGE_BASE_URL = API_BASE_URL.replace(/\/api$/, '');

const Marketplace = () => {
  const { loading: authLoading } = useAuth();
  const [products, setProducts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCat, setActiveCat] = useState(null); // null = "All"
  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (authLoading) return; // Wait for auth to initialize

      try {
        setLoading(true);
        setError(null);
        const [prodData, vendData, catData, adsData] = await Promise.all([
          getProducts(),
          getVendors(),
          getCategories(),
          searchAdvertisements()
        ]);
        setProducts(prodData.data || []);
        setVendors(vendData.data || []);
        setCategories(catData.data || []);
        setAds(adsData.data || []);
      } catch (err) {
        console.error('Marketplace fetch error:', err);
        setError('Could not load marketplace data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [authLoading]);

  useEffect(() => {
    if (ads.length > 1) {
      const interval = setInterval(() => {
        setCurrentAd((prev) => (prev + 1) % ads.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [ads]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCat = activeCat === null || p.category_id === activeCat;
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || (
        p.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      );
      return matchesCat && matchesSearch;
    });
  }, [products, activeCat, searchQuery]);

  return (
    <div className="animate-fade section-padding" style={{ paddingTop: '120px' }}>
      <SEO 
        title="Marketplace" 
        description="Browse quality food products and verified vendors in our premium marketplace." 
      />
      
      {/* ── Page Header ── */}
      <div className="container" style={{ marginBottom: '48px' }}>
        <h1 style={{ marginBottom: '12px' }}>
          Explore the <span className="gradient-text">Market</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>
          Fresh ingredients from trusted local vendors, delivered to your door.
        </p>
      </div>

      {/* ── Search & Filter ── */}
      <div className="container" style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
            <Search 
              size={20} 
              style={{ 
                position: 'absolute', left: '20px', 
                top: '50%', transform: 'translateY(-50%)', 
                color: 'var(--text-secondary)' 
              }} 
            />
            <input 
              type="text" 
              placeholder="Search products, vendors, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '18px 20px 18px 56px',
                borderRadius: '16px',
                border: '1px solid var(--card-border)',
                background: 'var(--bg-secondary)',
                fontSize: '16px',
                outline: 'none',
                boxShadow: 'var(--shadow-md)',
                color: 'var(--text-primary)',
              }}
            />
          </div>
          <button className="glass" style={{ 
            padding: '0 24px', 
            borderRadius: '16px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            fontWeight: '600',
            height: '58px'
          }}>
            <SlidersHorizontal size={20} /> Filters
          </button>
        </div>
      </div>

      {/* ── Advertisements Section ── */}
      {!loading && ads.length > 0 && (
        <div className="container" style={{ marginBottom: '60px' }}>
          <div style={{ 
            position: 'relative', 
            height: '300px', 
            borderRadius: '24px', 
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
            background: 'var(--primary-glow)'
          }}>
            {ads.map((ad, index) => (
              <div 
                key={ad.id}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: index === currentAd ? 1 : 0,
                  transition: 'opacity 1s ease-in-out',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 60px',
                  background: `linear-gradient(90deg, rgba(0,0,0,0.7) 0%, transparent 60%), url(${ad.image_url || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80'})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  color: 'white'
                }}
              >
                <div style={{ maxWidth: '500px' }}>
                  <span style={{ 
                    background: 'var(--primary)', 
                    padding: '4px 12px', 
                    borderRadius: '20px', 
                    fontSize: '12px', 
                    fontWeight: '700',
                    marginBottom: '16px',
                    display: 'inline-block'
                  }}>
                    FEATURED DEAL
                  </span>
                  <h2 style={{ fontSize: '36px', marginBottom: '12px', color: 'white' }}>{ad.title || 'Exclusive Market Offers'}</h2>
                  <p style={{ fontSize: '18px', opacity: 0.9, marginBottom: '24px' }}>{ad.description || 'Discover incredible savings on fresh groceries today.'}</p>
                  <button className="btn-primary">Shop This Deal</button>
                </div>
              </div>
            ))}
            
            {ads.length > 1 && (
              <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
                {ads.map((_, i) => (
                  <div 
                    key={i} 
                    onClick={() => setCurrentAd(i)}
                    style={{ 
                      width: '12px', 
                      height: '12px', 
                      borderRadius: '50%', 
                      background: i === currentAd ? 'var(--primary)' : 'rgba(255,255,255,0.5)',
                      cursor: 'pointer'
                    }} 
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Category Tabs ── */}
      {!loading && !error && (
        <div className="container" style={{ marginBottom: '60px' }}>
          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            flexWrap: 'nowrap',
            overflowX: 'auto', 
            paddingBottom: '12px',
            scrollbarWidth: 'none'
          }}>
            <CategoryTab 
              label="All" 
              icon={<LayoutGrid size={16} />}
              active={activeCat === null} 
              onClick={() => setActiveCat(null)} 
            />
            {categories.map(cat => (
              <CategoryTab 
                key={cat.id}
                label={cat.name} 
                active={activeCat === cat.id} 
                onClick={() => setActiveCat(cat.id)} 
                image={cat.image ? `${STORAGE_BASE_URL}/storage/${cat.image}` : null}
              />
            ))}
          </div>
        </div>
      )}

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
          <Loader2 className="animate-spin" size={48} color="var(--primary)" />
        </div>
      ) : error ? (
        <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <AlertCircle size={48} color="var(--primary)" style={{ marginBottom: '16px' }} />
          <h3 style={{ marginBottom: '16px' }}>Oops! Something went wrong.</h3>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>{error}</p>
          <button 
            className="btn-primary" 
            style={{ marginTop: '24px' }}
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
          
          {/* Featured Vendors Section */}
          {activeCat === null && vendors.length > 0 && (
            <section>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
                <div>
                  <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>Top Vendors</h2>
                  <p style={{ color: 'var(--text-secondary)' }}>Quality assured local businesses</p>
                </div>
                <button style={{ color: 'var(--primary)', fontWeight: '600' }}>View All</button>
              </div>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
                gap: '24px' 
              }}>
                {vendors.slice(0, 3).map(vendor => (
                  <VendorCard key={vendor.id} vendor={vendor} />
                ))}
              </div>
            </section>
          )}

          {/* Products Section */}
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px' }}>
              <div>
                <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>
                  {activeCat === null ? 'Latest Arrivals' : categories.find(c => c.id === activeCat)?.name}
                </h2>
                <p style={{ color: 'var(--text-secondary)' }}>
                  {filteredProducts.length} item{filteredProducts.length !== 1 ? 's' : ''} curated for you
                </p>
              </div>
              {activeCat !== null && (
                <button onClick={() => setActiveCat(null)} style={{ color: 'var(--primary)', fontWeight: '600' }}>
                  Clear Filter
                </button>
              )}
            </div>
            
            {filteredProducts.length > 0 ? (
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                gap: '32px' 
              }}>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <EmptyState searchQuery={searchQuery} />
            )}
          </section>
        </div>
      )}
    </div>
  );
};

/* ── Sub-components ── */

const CategoryTab = ({ label, icon, active, onClick, image }) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 24px',
      borderRadius: '40px',
      fontWeight: '600',
      fontSize: '14px',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      border: active ? '2px solid var(--primary)' : '1px solid var(--card-border)',
      background: active
        ? 'linear-gradient(135deg, var(--primary), var(--secondary))'
        : 'var(--bg-secondary)',
      color: active ? 'var(--btn-text)' : 'var(--text-secondary)',
      transition: 'all 0.2s ease',
      boxShadow: active ? 'var(--shadow-md)' : 'none',
    }}
  >
    {icon && icon}
    {image && (
      <img
        src={image}
        alt={label}
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          objectFit: 'cover',
        }}
        onError={(e) => { e.target.style.display = 'none'; }}
      />
    )}
    {label}
  </button>
);

const EmptyState = ({ searchQuery }) => (
  <div style={{ textAlign: 'center', padding: '80px 0' }}>
    <span style={{ fontSize: '64px', display: 'block', marginBottom: '20px' }}>🍽️</span>
    <h3 style={{ fontSize: '22px', marginBottom: '12px' }}>No products found</h3>
    <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
      {searchQuery
        ? `No results for "${searchQuery}". Try a different search.`
        : 'No products in this category yet. Check back soon!'}
    </p>
  </div>
);

export default Marketplace;

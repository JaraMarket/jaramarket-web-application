import React, { useState, useEffect } from 'react';
import { getProducts, searchAdvertisements } from '../api/products';
import { getVendors, getCategories } from '../api/vendors';
import ProductCard from '../components/ProductCard';
import VendorCard from '../components/VendorCard';
import { Search, SlidersHorizontal, Loader2, Tag } from 'lucide-react';
import SEO from '../components/SEO';

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
        console.error('Error fetching marketplace data:', err);
        setError('Failed to load marketplace data. Please check your connection and try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (ads.length > 1) {
      const interval = setInterval(() => {
        setCurrentAd((prev) => (prev + 1) % ads.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [ads]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category_id === parseInt(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container animate-fade" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <SEO title="Marketplace" description="Browse quality food products and verified vendors in our premium marketplace." />
      
      {/* Search & Filter Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ marginBottom: '32px' }}>Explore the <span className="gradient-text">Market</span></h1>
        
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
            <Search size={20} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
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
                boxShadow: 'var(--shadow-md)'
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

      {/* Advertisements Section */}
      {!loading && ads.length > 0 && (
        <div style={{ 
          marginBottom: '60px', 
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
      )}

      {/* Categories Horizontal Scroll */}
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        marginBottom: '60px', 
        overflowX: 'auto', 
        paddingBottom: '12px',
        scrollbarWidth: 'none'
      }}>
        <CategoryTab 
          active={selectedCategory === 'all'} 
          label="All Items" 
          onClick={() => setSelectedCategory('all')} 
        />
        {categories.map(cat => (
          <CategoryTab 
            key={cat.id}
            active={selectedCategory === cat.id.toString()} 
            label={cat.name} 
            onClick={() => setSelectedCategory(cat.id.toString())} 
          />
        ))}
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
          <Loader2 className="animate-spin" size={40} color="var(--primary)" />
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '100px 0', color: '#ff4b2b' }}>
          <h3 style={{ marginBottom: '16px' }}>Oops! Something went wrong.</h3>
          <p>{error}</p>
          <button 
            className="btn-primary" 
            style={{ marginTop: '24px' }}
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
          
          {/* Featured Vendors Section (Only show on 'all' or if vendors match) */}
          {selectedCategory === 'all' && (
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
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
                gap: '24px' 
              }}>
                {vendors.slice(0, 3).map(vendor => (
                  <VendorCard key={vendor.id} vendor={vendor} />
                ))}
                {vendors.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No vendors found yet.</p>}
              </div>
            </section>
          )}

          {/* Products Section */}
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
              <div>
                <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>
                  {selectedCategory === 'all' ? 'Latest Arrivals' : categories.find(c => c.id.toString() === selectedCategory)?.name}
                </h2>
                <p style={{ color: 'var(--text-secondary)' }}>Curated for you</p>
              </div>
              {selectedCategory !== 'all' && (
                <button onClick={() => setSelectedCategory('all')} style={{ color: 'var(--primary)', fontWeight: '600' }}>
                  Clear Filter
                </button>
              )}
            </div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '32px' 
            }}>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
              {filteredProducts.length === 0 && (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
                  <p>No products found matching your criteria.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

const CategoryTab = ({ active, label, onClick }) => (
  <button 
    onClick={onClick}
    className="glass"
    style={{ 
      padding: '12px 24px', 
      borderRadius: '12px', 
      fontWeight: '600',
      whiteSpace: 'nowrap',
      background: active ? 'var(--primary)' : 'transparent',
      color: active ? 'white' : 'var(--text-secondary)',
      border: active ? '1px solid var(--primary)' : '1px solid var(--card-border)',
      transition: 'all 0.3s ease'
    }}
  >
    {label}
  </button>
);

export default Marketplace;

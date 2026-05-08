import React, { useState, useEffect } from 'react';
import { getProducts } from '../api/products';
import { getVendors } from '../api/vendors';
import ProductCard from '../components/ProductCard';
import VendorCard from '../components/VendorCard';
import { Search, SlidersHorizontal, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const [prodData, vendData] = await Promise.all([
          getProducts(),
          getVendors()
        ]);
        // The API returns { status: true, data: [...] }
        setProducts(prodData.data || []);
        setVendors(vendData.data || []);
      } catch (err) {
        console.error('Error fetching marketplace data:', err);
        setError('Failed to load marketplace data. Please check your connection and try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container animate-fade" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <SEO title="Marketplace" description="Browse quality food products and verified vendors in our premium marketplace." />
      {/* Search & Filter Header */}
      <div style={{ marginBottom: '60px' }}>
        <h1 style={{ marginBottom: '32px' }}>Explore the <span className="gradient-text">Market</span></h1>
        
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
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
            fontWeight: '600'
          }}>
            <SlidersHorizontal size={20} /> Filters
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
          <Loader2 className="animate-spin" size={40} color="var(--primary)" />
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '100px 0', color: 'red' }}>
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
          
          {/* Featured Vendors Section */}
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

          {/* All Products Section */}
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
              <div>
                <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>Latest Arrivals</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Curated for you</p>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <span style={{ color: 'var(--primary)', fontWeight: '600', cursor: 'pointer' }}>All Products</span>
              </div>
            </div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '32px' 
            }}>
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
              {products.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No products listed yet.</p>}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Marketplace;

import { useState, useEffect, useMemo } from 'react';
import { getProducts } from '../api/products';
import { getCategories } from '../api/categories';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal, Loader2, LayoutGrid, AlertCircle } from 'lucide-react';
import SEO from '../components/SEO';

const BASE_URL = 'https://jara-market-laravel-backend-production.up.railway.app';

const Marketplace = () => {
  const [products, setProducts]     = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]        = useState(true);
  const [error, setError]            = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCat, setActiveCat]    = useState(null); // null = "All"

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [catRes, prodRes] = await Promise.all([
          getCategories(),
          getProducts(),
        ]);
        setCategories(catRes.data || []);
        setProducts(prodRes.data   || []);
      } catch (err) {
        console.error('Marketplace fetch error:', err);
        setError('Could not load marketplace data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter products by active category AND search query
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCat  = activeCat === null || p.category_id === activeCat;
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || (
        p.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      );
      return matchesCat && matchesSearch;
    });
  }, [products, activeCat, searchQuery]);

  return (
    <div className="animate-fade" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <SEO
        title="Marketplace"
        description="Browse fresh ingredients and food products by category — sourced from trusted local vendors across Nigeria."
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

      {/* ── Search Bar ── */}
      <div className="container" style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search
              size={20}
              style={{
                position: 'absolute', left: '20px',
                top: '50%', transform: 'translateY(-50%)',
                color: 'var(--text-secondary)'
              }}
            />
            <input
              id="marketplace-search"
              type="text"
              placeholder="Search products or categories..."
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
          <button
            className="glass"
            style={{
              padding: '0 24px',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontWeight: '600'
            }}
          >
            <SlidersHorizontal size={20} /> Filters
          </button>
        </div>
      </div>

      {/* ── Loading ── */}
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
          <Loader2 className="animate-spin" size={48} color="var(--primary)" />
        </div>
      )}

      {/* ── Error ── */}
      {!loading && error && (
        <div className="container" style={{ textAlign: 'center', padding: '80px 0' }}>
          <AlertCircle size={48} color="var(--primary)" style={{ marginBottom: '16px' }} />
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>{error}</p>
          <button
            className="btn-primary"
            style={{ marginTop: '24px' }}
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      )}

      {/* ── Main Content ── */}
      {!loading && !error && (
        <>
          {/* ── Category Tabs ── */}
          <div className="container" style={{ marginBottom: '40px' }}>
            <div
              style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              {/* "All" tab */}
              <CategoryTab
                label="All"
                icon={<LayoutGrid size={16} />}
                active={activeCat === null}
                onClick={() => setActiveCat(null)}
              />
              {categories.map((cat) => (
                <CategoryTab
                  key={cat.id}
                  label={cat.name}
                  active={activeCat === cat.id}
                  onClick={() => setActiveCat(cat.id)}
                  image={cat.image ? `${BASE_URL}/storage/${cat.image}` : null}
                />
              ))}
            </div>
          </div>

          {/* ── Active Category title ── */}
          <div className="container" style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
              <h2 style={{ fontSize: '24px' }}>
                {activeCat === null
                  ? 'All Products'
                  : categories.find((c) => c.id === activeCat)?.name ?? 'Products'}
              </h2>
              <span style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
                {filtered.length} item{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* ── Product Grid ── */}
          <div className="container">
            {filtered.length > 0 ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '28px',
                }}
              >
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <EmptyState searchQuery={searchQuery} />
            )}
          </div>
        </>
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
      padding: '10px 20px',
      borderRadius: '40px',
      fontWeight: '600',
      fontSize: '14px',
      cursor: 'pointer',
      border: active ? '2px solid var(--primary)' : '2px solid var(--card-border)',
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

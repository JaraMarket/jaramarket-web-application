import React, { useState, useEffect } from 'react';
import { getVendorProducts, deleteProduct } from '../../api/vendor';
import { Plus, Search, Edit2, Trash2, Loader2, MoreVertical } from 'lucide-react';

const VendorProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getVendorProducts();
      setProducts(response.data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        setProducts(products.filter(p => p.id !== id));
      } catch (err) {
        alert('Failed to delete product');
      }
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container animate-fade" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Product Catalog</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage your inventory and store listings.</p>
        </div>
        <button className="btn-primary" style={{ padding: '12px 24px' }}>
          <Plus size={20} /> Add New Product
        </button>
      </div>

      <div className="card glass" style={{ padding: '0' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid var(--card-border)', display: 'flex', gap: '16px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 12px 12px 44px',
                borderRadius: '10px',
                border: '1px solid var(--card-border)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
            <Loader2 className="animate-spin" size={40} color="var(--primary)" />
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--card-border)', color: 'var(--text-secondary)', fontSize: '14px' }}>
                  <th style={{ padding: '16px 24px' }}>Product</th>
                  <th style={{ padding: '16px 24px' }}>Category</th>
                  <th style={{ padding: '16px 24px' }}>Price</th>
                  <th style={{ padding: '16px 24px' }}>Stock</th>
                  <th style={{ padding: '16px 24px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id} style={{ borderBottom: '1px solid var(--card-border)', transition: 'background 0.2s' }}>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '8px', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
                          <img 
                            src={product.image || 'https://via.placeholder.com/48'} 
                            alt={product.name} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <span style={{ fontWeight: '600' }}>{product.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>
                      {product.category || 'General'}
                    </td>
                    <td style={{ padding: '16px 24px', fontWeight: '700' }}>
                      ₦{product.price?.toLocaleString()}
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <span style={{ 
                        padding: '4px 8px', 
                        borderRadius: '6px', 
                        fontSize: '12px', 
                        fontWeight: '600',
                        background: 'rgba(16, 185, 129, 0.1)',
                        color: '#10b981'
                      }}>
                        In Stock
                      </span>
                    </td>
                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button className="glass" style={{ padding: '8px', borderRadius: '8px' }}>
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          style={{ padding: '8px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ padding: '60px 0', textAlign: 'center', color: 'var(--text-secondary)' }}>
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorProducts;

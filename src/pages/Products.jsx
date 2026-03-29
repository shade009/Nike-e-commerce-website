import { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ShoppingBag, SlidersHorizontal } from 'lucide-react';
import products from '../data/products';
import './Products.css';

const CATEGORIES = ['all', 'shoes', 'bags', 'accessories'];
const GENDERS = ['All', 'Men', 'Women', 'Unisex'];
const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest' },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryParam = searchParams.get('category') || 'all';

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(categoryParam);
  const [gender, setGender] = useState('All');
  const [sort, setSort] = useState('featured');
  const [showCount, setShowCount] = useState(12);

  const filtered = useMemo(() => {
    let result = [...products];

    if (category !== 'all') {
      result = result.filter(p => p.category === category);
    }
    if (gender !== 'All') {
      result = result.filter(p => p.gender === gender || p.gender === 'Unisex');
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => b.id - a.id); break;
      default: break;
    }

    return result;
  }, [category, gender, search, sort]);

  const displayed = filtered.slice(0, showCount);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    if (cat === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  return (
    <div className="products-page">
      <div className="products-layout">
        {/* Sidebar */}
        <motion.aside
          className="filters-sidebar"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="filters-header">
            <h3><SlidersHorizontal size={18} style={{ marginRight: 8 }} /> Filters</h3>
            <button className="filters-clear" onClick={() => { setCategory('all'); setGender('All'); setSearch(''); setSearchParams({}); }}>
              Clear All
            </button>
          </div>

          <div className="filter-group">
            <h4>Category</h4>
            <div className="filter-options">
              {CATEGORIES.map(cat => (
                <label
                  key={cat}
                  className={`filter-option ${category === cat ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(cat)}
                >
                  <input
                    type="radio"
                    name="category"
                    checked={category === cat}
                    onChange={() => handleCategoryChange(cat)}
                  />
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4>Gender</h4>
            <div className="filter-options">
              {GENDERS.map(g => (
                <label
                  key={g}
                  className={`filter-option ${gender === g ? 'active' : ''}`}
                  onClick={() => setGender(g)}
                >
                  <input
                    type="radio"
                    name="gender"
                    checked={gender === g}
                    onChange={() => setGender(g)}
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4>Price Range</h4>
            <div className="filter-colors">
              {['Under $50', '$50-$100', '$100-$200', '$200+'].map(range => (
                <span
                  key={range}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--gray-100)',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {range}
                </span>
              ))}
            </div>
          </div>
        </motion.aside>

        {/* Products Area */}
        <div className="products-area">
          <div className="products-search">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="products-top-bar">
            <p className="products-count">
              Showing <strong>{displayed.length}</strong> of <strong>{filtered.length}</strong> products
            </p>
            <div className="products-sort">
              <select value={sort} onChange={e => setSort(e.target.value)}>
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="products-list">
            {displayed.length === 0 ? (
              <div className="no-results">
                <h3>No products found</h3>
                <p>Try adjusting your filters or search term</p>
              </div>
            ) : (
              displayed.map((product, i) => (
                <motion.div
                  key={product.id}
                  className="product-card"
                  onClick={() => navigate(`/product/${product.id}`)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <div className="product-card-image">
                    <img src={product.images[0]} alt={product.name} onError={(e) => {
                      e.target.src = 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect fill="#f0f0f0" width="400" height="400"/><text x="200" y="200" font-family="Arial" font-size="18" fill="#aaa" text-anchor="middle" dy=".35em">${product.name}</text></svg>`);
                    }} />
                    {product.badge && <span className="product-badge">{product.badge}</span>}
                    <div className="product-card-quick-add">
                      <ShoppingBag size={18} />
                    </div>
                  </div>
                  <div className="product-card-info">
                    <h4>{product.name}</h4>
                    <p className="product-card-category">{product.category}</p>
                    <div className="product-card-price">
                      <span className="current">${product.price}</span>
                      {product.originalPrice && <span className="original">${product.originalPrice}</span>}
                    </div>
                  </div>
                </motion.div>
              ))
            )}

            {showCount < filtered.length && (
              <div className="load-more-wrapper">
                <motion.button
                  className="btn btn-outline"
                  onClick={() => setShowCount(prev => prev + 8)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Load More Products
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingBag, Check, Truck, RotateCcw, Shield, ChevronRight } from 'lucide-react';
import products from '../data/products';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, setIsOpen } = useCart();
  const product = products.find(p => p.id === parseInt(id));

  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="product-detail" style={{ textAlign: 'center', paddingTop: 200 }}>
        <h2>Product not found</h2>
        <Link to="/products" className="btn btn-primary" style={{ marginTop: 24 }}>Back to Shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart(product, selectedSize, product.colors[selectedColor], 1);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setIsOpen(true);
    }, 1200);
  };

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-detail">
      <div className="product-detail-grid">
        {/* Gallery */}
        <motion.div
          className="product-gallery"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="product-main-image">
            <img
              src={product.images[0]}
              alt={product.name}
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><rect fill="#f0f0f0" width="600" height="600" rx="16"/><text x="300" y="280" font-family="Arial" font-size="32" fill="#999" text-anchor="middle">${product.name}</text><text x="300" y="325" font-family="Arial" font-size="18" fill="#bbb" text-anchor="middle">Nike ${product.category}</text></svg>`);
              }}
            />
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          className="product-info"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="product-breadcrumb">
            <Link to="/">Home</Link> <ChevronRight size={12} />
            <Link to="/products">Shop</Link> <ChevronRight size={12} />
            <Link to={`/products?category=${product.category}`}>{product.category}</Link> <ChevronRight size={12} />
            <span>{product.name}</span>
          </div>

          <h1>{product.name}</h1>
          <p className="product-gender">{product.gender}'s {product.category}</p>

          <div className="product-rating">
            <div className="stars">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={16} fill={i <= Math.round(product.rating) ? '#f59e0b' : 'none'} />
              ))}
            </div>
            <span>{product.rating} ({product.reviews.toLocaleString()} reviews)</span>
          </div>

          <div className="product-price-section">
            <span className="current-price">${product.price}</span>
            {product.originalPrice && (
              <>
                <span className="original-price">${product.originalPrice}</span>
                <span className="discount-badge">{discount}% OFF</span>
              </>
            )}
          </div>

          <p className="product-description">{product.description}</p>

          {/* Color */}
          <span className="product-selector-label">
            Color — {['Black', 'White', 'Orange', 'Red', 'Blue', 'Green', 'Purple'][selectedColor] || 'Selected'}
          </span>
          <div className="color-swatches">
            {product.colors.map((color, i) => (
              <motion.button
                key={i}
                className={`color-swatch ${selectedColor === i ? 'active' : ''}`}
                style={{ background: color }}
                onClick={() => setSelectedColor(i)}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* Size */}
          <span className="product-selector-label">
            Select Size {selectedSize && `— ${selectedSize}`}
          </span>
          <div className="size-grid">
            {product.sizes.map(size => (
              <motion.button
                key={size}
                className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                onClick={() => setSelectedSize(size)}
                whileTap={{ scale: 0.95 }}
              >
                {size}
              </motion.button>
            ))}
          </div>

          {/* Add to Cart */}
          <div className="add-to-cart-section">
            <motion.button
              className={`add-to-cart-btn ${added ? 'added' : ''}`}
              onClick={handleAddToCart}
              whileTap={{ scale: 0.97 }}
              disabled={!selectedSize}
              style={{ opacity: selectedSize ? 1 : 0.5 }}
            >
              {added ? (
                <><Check size={20} /> Added to Bag</>
              ) : (
                <><ShoppingBag size={20} /> {selectedSize ? 'Add to Bag' : 'Select a Size'}</>
              )}
            </motion.button>
            <motion.button
              className="wishlist-btn"
              whileTap={{ scale: 0.9 }}
            >
              <Heart size={22} />
            </motion.button>
          </div>

          {/* Features */}
          <div className="product-features">
            <div className="product-feature">
              <Truck size={18} /> Free shipping on orders over $100
            </div>
            <div className="product-feature">
              <RotateCcw size={18} /> Free 30-day returns
            </div>
            <div className="product-feature">
              <Shield size={18} /> 2-year warranty included
            </div>
          </div>
        </motion.div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="related-section">
          <h2>You Might Also Like</h2>
          <div className="products-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {related.map((p, i) => (
              <motion.div
                key={p.id}
                className="product-card"
                onClick={() => navigate(`/product/${p.id}`)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="product-card-image">
                  <img src={p.images[0]} alt={p.name} onError={(e) => {
                    e.target.src = 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect fill="#f0f0f0" width="400" height="400"/><text x="200" y="200" font-family="Arial" font-size="18" fill="#aaa" text-anchor="middle" dy=".35em">${p.name}</text></svg>`);
                  }} />
                  {p.badge && <span className="product-badge">{p.badge}</span>}
                </div>
                <div className="product-card-info">
                  <h4>{p.name}</h4>
                  <p className="product-card-category">{p.category}</p>
                  <div className="product-card-price">
                    <span className="current">${p.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

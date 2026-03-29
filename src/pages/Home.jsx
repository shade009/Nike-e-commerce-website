import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Star, Zap, ShoppingBag, TrendingUp } from 'lucide-react';
import products, { categories } from '../data/products';
import './Home.css';

function AnimatedSection({ children, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const featured = products.filter(p => p.badge).slice(0, 8);
  const trending = products.slice(0, 6);

  return (
    <div className="home">
      {/* Hero */}
      <section className="home-hero">
        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="hero-tag"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Zap size={14} /> Just Dropped — Spring 2026 Collection
            </motion.div>
            <h1 className="hero-title">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                JUST
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                style={{ color: 'var(--black)', WebkitTextFillColor: 'var(--black)' }}
              >
                DO IT.
              </motion.span>
            </h1>
            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Unleash your potential with Nike's latest collection. 
              Performance meets style in every step, every stride, every moment.
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link to="/products" className="btn btn-accent btn-lg">
                Shop Now <ArrowRight size={18} />
              </Link>
              <Link to="/products?category=shoes" className="btn btn-outline btn-lg">
                Explore Shoes
              </Link>
            </motion.div>
            <motion.div
              className="hero-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="hero-stat">
                <h4>30K+</h4>
                <p>Active Members</p>
              </div>
              <div className="hero-stat">
                <h4>500+</h4>
                <p>Products</p>
              </div>
              <div className="hero-stat">
                <h4>4.9★</h4>
                <p>Avg Rating</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-image-wrapper"
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div className="hero-image-bg" />
            <motion.img
              src="/images/shoe1.jpg"
              alt="Nike Air Max"
              className="hero-shoe-img"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500"><rect fill="#f0f0f0" width="500" height="500" rx="20"/><text x="250" y="250" font-family="Arial" font-size="48" fill="#999" text-anchor="middle" dy=".35em">NIKE</text></svg>`);
              }}
            />
            <motion.div
              className="hero-floating-card top-right"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="card-label">Top Rated</div>
              <div className="card-value" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Star size={16} fill="#FA5400" color="#FA5400" /> 4.9/5.0
              </div>
            </motion.div>
            <motion.div
              className="hero-floating-card bottom-left"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 }}
            >
              <div className="card-label">This Week</div>
              <div className="card-value" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <TrendingUp size={16} color="#22c55e" /> +28% Sales
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <AnimatedSection className="section container">
        <div className="section-header">
          <div>
            <h2>Shop by Category</h2>
            <p>Find exactly what you&apos;re looking for</p>
          </div>
          <Link to="/products">View All <ArrowRight size={16} /></Link>
        </div>
        <div className="categories-grid">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              className="category-card"
              onClick={() => navigate(`/products?category=${cat.id}`)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
            >
              <div className="category-card-bg">
                <img src={cat.image} alt={cat.name} onError={(e) => { e.target.style.display = 'none' }} />
              </div>
              <div className="category-card-overlay" />
              <div className="category-card-content">
                <h3>{cat.name}</h3>
                <p>{cat.description}</p>
                <span className="card-count">{cat.count} Products</span>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      {/* Featured Products */}
      <AnimatedSection className="section container">
        <div className="section-header">
          <div>
            <h2>Featured Products</h2>
            <p>Handpicked for you</p>
          </div>
          <Link to="/products">See All <ArrowRight size={16} /></Link>
        </div>
        <div className="products-grid">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              className="product-card"
              onClick={() => navigate(`/product/${product.id}`)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
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
          ))}
        </div>
      </AnimatedSection>

      {/* Promo Banner */}
      <AnimatedSection>
        <section className="promo-banner">
          <div className="promo-banner-bg" />
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            MOVE. PLAY. WIN.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Get 20% off your first order. Use code <strong style={{ color: 'var(--accent)' }}>JUSTDOIT</strong>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/products" className="btn btn-accent btn-lg">
              Claim Offer <ArrowRight size={18} />
            </Link>
          </motion.div>
        </section>
      </AnimatedSection>

      {/* Trending */}
      <AnimatedSection className="section container">
        <div className="section-header">
          <div>
            <h2>Trending Now</h2>
            <p>What everyone&apos;s wearing</p>
          </div>
        </div>
        <div className="trending-scroll">
          {trending.map((product, i) => (
            <motion.div
              key={product.id}
              className="product-card trending-card"
              onClick={() => navigate(`/product/${product.id}`)}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="product-card-image">
                <img src={product.images[0]} alt={product.name} onError={(e) => {
                  e.target.src = 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect fill="#f0f0f0" width="400" height="400"/><text x="200" y="200" font-family="Arial" font-size="18" fill="#aaa" text-anchor="middle" dy=".35em">${product.name}</text></svg>`);
                }} />
                {product.badge && <span className="product-badge">{product.badge}</span>}
              </div>
              <div className="product-card-info">
                <h4>{product.name}</h4>
                <p className="product-card-category">{product.category}</p>
                <div className="product-card-price">
                  <span className="current">${product.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}

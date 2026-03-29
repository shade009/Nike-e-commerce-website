import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { totalItems, setIsOpen } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  if (isAuthPage) return null;

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <Link to="/" className="nav-logo">
          <svg viewBox="0 0 69 32" fill="currentColor">
            <path d="M68.56 4.05c-0.28-0.12-3.2-1.24-4.83 0.99-0.53 0.73-7.94 14.36-24.38 23.19-4.03 2.16-7.64 3.07-10.06 3.47-2.76 0.46-5.47 0.28-5.47 0.28s0.87-0.19 2.29-0.61c4.85-1.43 14.81-5.79 25.26-17.3 3.77-4.16 6.64-7.63 6.64-7.63l-14.63 8.31c-6.53 3.53-10.95 4.63-13.68 4.98-1.96 0.25-3.78 0.01-5.29-0.66-2.06-0.91-3.63-2.71-4.05-5.08-0.73-4.12 1.84-8.28 5.78-10.43 5.93-3.24 14.47-2.74 19.17 3.18l4.39-2.51c-4.21-7.15-14.38-10.5-23.7-6.14C14.93 2.47 9.16 9.38 10.98 16.13c1.05 3.89 3.94 6.13 6.62 7.19 2 0.79 3.91 0.98 5.37 0.98h0.34c12.91-0.43 30.4-11.55 39.58-17.63 1.52-1.01 3.38-1.15 4.48-1.06 0.52 0.04 0.97 0.15 1.19 0.24z"/>
          </svg>
        </Link>

        <div className="nav-links">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
          <Link to="/products" className={`nav-link ${isActive('/products') ? 'active' : ''}`}>Shop</Link>
          <Link to="/products?category=shoes" className={`nav-link ${location.search.includes('shoes') ? 'active' : ''}`}>Shoes</Link>
          <Link to="/products?category=bags" className={`nav-link ${location.search.includes('bags') ? 'active' : ''}`}>Bags</Link>
          <Link to="/products?category=accessories" className={`nav-link ${location.search.includes('accessories') ? 'active' : ''}`}>Accessories</Link>
        </div>

        <div className="nav-actions">
          <button className="nav-action-btn" onClick={() => navigate('/products')}>
            <Search size={20} />
          </button>
          <button className="nav-action-btn" onClick={() => setIsOpen(true)}>
            <ShoppingBag size={20} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>
          {user ? (
            <>
              <button className="nav-user-btn" onClick={() => navigate('/profile')}>
                <User size={16} /> {user.name.split(' ')[0]}
              </button>
              <button className="nav-action-btn" onClick={logout} title="Logout">
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-user-btn">
              <User size={16} /> Sign In
            </Link>
          )}
          <button className="nav-mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className={`nav-mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/products" className="nav-link">Shop All</Link>
        <Link to="/products?category=shoes" className="nav-link">Shoes</Link>
        <Link to="/products?category=bags" className="nav-link">Bags</Link>
        <Link to="/products?category=accessories" className="nav-link">Accessories</Link>
        <Link to="/cart" className="nav-link">Cart ({totalItems})</Link>
        {user ? (
          <button className="nav-link" onClick={logout}>Logout</button>
        ) : (
          <Link to="/login" className="nav-link">Sign In</Link>
        )}
      </div>
    </nav>
  );
}

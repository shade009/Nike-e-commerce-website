import { Link } from 'react-router-dom';
import { Camera, Globe, MessageCircle, Play } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link to="/" className="nav-logo">
            <svg viewBox="0 0 69 32" fill="currentColor" height="28">
              <path d="M68.56 4.05c-0.28-0.12-3.2-1.24-4.83 0.99-0.53 0.73-7.94 14.36-24.38 23.19-4.03 2.16-7.64 3.07-10.06 3.47-2.76 0.46-5.47 0.28-5.47 0.28s0.87-0.19 2.29-0.61c4.85-1.43 14.81-5.79 25.26-17.3 3.77-4.16 6.64-7.63 6.64-7.63l-14.63 8.31c-6.53 3.53-10.95 4.63-13.68 4.98-1.96 0.25-3.78 0.01-5.29-0.66-2.06-0.91-3.63-2.71-4.05-5.08-0.73-4.12 1.84-8.28 5.78-10.43 5.93-3.24 14.47-2.74 19.17 3.18l4.39-2.51c-4.21-7.15-14.38-10.5-23.7-6.14C14.93 2.47 9.16 9.38 10.98 16.13c1.05 3.89 3.94 6.13 6.62 7.19 2 0.79 3.91 0.98 5.37 0.98h0.34c12.91-0.43 30.4-11.55 39.58-17.63 1.52-1.01 3.38-1.15 4.48-1.06 0.52 0.04 0.97 0.15 1.19 0.24z"/>
            </svg>
          </Link>
          <p>Bringing inspiration and innovation to every athlete in the world. If you have a body, you are an athlete.</p>
        </div>

        <div className="footer-col">
          <h4>Shop</h4>
          <Link to="/products?category=shoes">Shoes</Link>
          <Link to="/products?category=bags">Bags</Link>
          <Link to="/products?category=accessories">Accessories</Link>
          <Link to="/products">New Arrivals</Link>
          <Link to="/products">Sale</Link>
        </div>

        <div className="footer-col">
          <h4>Help</h4>
          <a href="#">Order Status</a>
          <a href="#">Shipping & Delivery</a>
          <a href="#">Returns</a>
          <a href="#">Size Guide</a>
          <a href="#">Contact Us</a>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <a href="#">About Nike</a>
          <a href="#">Careers</a>
          <a href="#">News</a>
          <a href="#">Sustainability</a>
          <a href="#">Investors</a>
        </div>

        <div className="footer-newsletter">
          <h4>Stay Updated</h4>
          <p>Sign up for emails to get the scoop on new arrivals, special offers, and more.</p>
          <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="your@email.com" />
            <button type="submit">Join</button>
          </form>
          <div className="footer-socials">
            <a href="#" className="footer-social-link"><Camera size={18} /></a>
            <a href="#" className="footer-social-link"><MessageCircle size={18} /></a>
            <a href="#" className="footer-social-link"><Globe size={18} /></a>
            <a href="#" className="footer-social-link"><Play size={18} /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Nike, Inc. All Rights Reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Sale</a>
          <a href="#">Terms of Use</a>
          <a href="#">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
}

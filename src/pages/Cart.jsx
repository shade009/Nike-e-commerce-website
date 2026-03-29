import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Trash2, Plus, Minus, Lock, Truck, CreditCard, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Cart.css';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <motion.div
          className="cart-empty-page"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ShoppingBag size={64} strokeWidth={1} color="var(--gray-300)" />
          <h2>Your Bag is Empty</h2>
          <p>Looks like you haven't added anything to your bag yet.</p>
          <Link to="/products" className="btn btn-primary btn-lg">
            Start Shopping <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    );
  }

  const shipping = totalPrice >= 100 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const grandTotal = totalPrice + shipping + tax;

  return (
    <div className="cart-page">
      <motion.div
        className="cart-page-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Shopping Bag</h1>
        <p>{totalItems} item{totalItems > 1 ? 's' : ''} in your bag</p>
      </motion.div>

      <div className="cart-page-layout">
        <div className="cart-page-items">
          <AnimatePresence>
            {items.map(item => (
              <motion.div
                key={item.cartId}
                className="cart-page-item"
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0 }}
              >
                <div className="cart-page-item-image">
                  <img src={item.images[0]} alt={item.name} onError={(e) => { e.target.style.display = 'none' }} />
                </div>
                <div className="cart-page-item-details">
                  <h3>{item.name}</h3>
                  <p className="cart-page-item-meta">
                    Size: {item.size} &nbsp;|&nbsp; {item.category}
                  </p>
                  <div className="quantity-control" style={{ marginBottom: 8 }}>
                    <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)}>
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)}>
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="cart-page-item-bottom">
                    <span className="cart-page-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                    <button className="cart-page-item-remove" onClick={() => removeFromCart(item.cartId)}>
                      <Trash2 size={16} /> Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          className="cart-summary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3>Order Summary</h3>
          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="cart-summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? <span style={{ color: 'var(--success)' }}>FREE</span> : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="cart-summary-row">
            <span>Estimated Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="promo-input">
            <input type="text" placeholder="Promo code" />
            <button>Apply</button>
          </div>

          <div className="cart-summary-row total">
            <span>Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>

          <button className="checkout-btn">
            <Lock size={18} /> Checkout
          </button>

          <div className="trust-badges">
            <div className="trust-badge">
              <Truck size={20} />
              Free Shipping
            </div>
            <div className="trust-badge">
              <CreditCard size={20} />
              Secure Payment
            </div>
            <div className="trust-badge">
              <Lock size={20} />
              SSL Encrypted
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

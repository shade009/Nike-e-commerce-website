import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './CartDrawer.css';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            className="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="cart-header">
              <h3>
                <ShoppingBag size={20} /> Your Bag ({totalItems})
              </h3>
              <button className="cart-close" onClick={() => setIsOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="cart-items">
              {items.length === 0 ? (
                <div className="cart-empty">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p>Your bag is empty</p>
                  <button className="btn btn-primary" onClick={() => { setIsOpen(false); navigate('/products'); }}>
                    Shop Now
                  </button>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map(item => (
                    <motion.div
                      key={item.cartId}
                      className="cart-item"
                      layout
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30, height: 0 }}
                    >
                      <div className="cart-item-image" style={{ background: `linear-gradient(135deg, #f5f5f5, #e0e0e0)` }}>
                        <img src={item.images[0]} alt={item.name} onError={(e) => { e.target.style.display = 'none' }} />
                      </div>
                      <div className="cart-item-details">
                        <h4>{item.name}</h4>
                        <p className="cart-item-meta">Size: {item.size}</p>
                        <p className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</p>
                        <div className="cart-item-actions">
                          <div className="quantity-control">
                            <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)}>
                              <Minus size={14} />
                            </button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)}>
                              <Plus size={14} />
                            </button>
                          </div>
                          <button className="cart-item-remove" onClick={() => removeFromCart(item.cartId)}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {items.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <p className="cart-shipping">Shipping calculated at checkout</p>
                <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={() => { setIsOpen(false); navigate('/cart'); }}>
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, AlertCircle, Check, ArrowRight, ArrowLeft, Truck, Shield, Percent } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

function getPasswordStrength(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const strengthClasses = ['', 'weak', 'fair', 'good', 'strong'];

export default function Register() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [terms, setTerms] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const strength = getPasswordStrength(password);

  const nextStep = () => {
    setError('');
    if (step === 1) {
      if (!name.trim() || !email.trim()) {
        setError('Please fill in all fields');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError('Please enter a valid email');
        return;
      }
    }
    setStep(step + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!terms) {
      setError('You must agree to the terms');
      return;
    }
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -100 : 100, opacity: 0 })
  };

  return (
    <div className="auth-page">
      <motion.div
        className="auth-brand"
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="auth-brand-bg" />
        <div className="auth-brand-content">
          <svg viewBox="0 0 69 32" fill="currentColor">
            <path d="M68.56 4.05c-0.28-0.12-3.2-1.24-4.83 0.99-0.53 0.73-7.94 14.36-24.38 23.19-4.03 2.16-7.64 3.07-10.06 3.47-2.76 0.46-5.47 0.28-5.47 0.28s0.87-0.19 2.29-0.61c4.85-1.43 14.81-5.79 25.26-17.3 3.77-4.16 6.64-7.63 6.64-7.63l-14.63 8.31c-6.53 3.53-10.95 4.63-13.68 4.98-1.96 0.25-3.78 0.01-5.29-0.66-2.06-0.91-3.63-2.71-4.05-5.08-0.73-4.12 1.84-8.28 5.78-10.43 5.93-3.24 14.47-2.74 19.17 3.18l4.39-2.51c-4.21-7.15-14.38-10.5-23.7-6.14C14.93 2.47 9.16 9.38 10.98 16.13c1.05 3.89 3.94 6.13 6.62 7.19 2 0.79 3.91 0.98 5.37 0.98h0.34c12.91-0.43 30.4-11.55 39.58-17.63 1.52-1.01 3.38-1.15 4.48-1.06 0.52 0.04 0.97 0.15 1.19 0.24z"/>
          </svg>
          <h2>Join <span>Nike</span></h2>
          <p>Create your account and become a Nike Member for the best products, inspiration and stories.</p>
          <div className="auth-brand-features">
            <div className="auth-brand-feature">
              <div className="feature-icon"><Truck size={18} /></div>
              Free shipping on first order
            </div>
            <div className="auth-brand-feature">
              <div className="feature-icon"><Shield size={18} /></div>
              Member-only products & offers
            </div>
            <div className="auth-brand-feature">
              <div className="feature-icon"><Percent size={18} /></div>
              Birthday discounts & rewards
            </div>
          </div>
        </div>
      </motion.div>

      <div className="auth-form-side">
        <motion.div
          className="auth-form-container"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div className="auth-form-header" variants={itemVariants}>
            <h1>Create Account</h1>
            <p>Already have an account? <Link to="/login">Sign in</Link></p>
          </motion.div>

          <motion.div className="auth-steps" variants={itemVariants}>
            <div className={`auth-step ${step >= 1 ? (step > 1 ? 'completed' : 'active') : ''}`} />
            <div className={`auth-step ${step >= 2 ? 'active' : ''}`} />
          </motion.div>

          {error && (
            <motion.div
              className="form-error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle size={16} /> {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait" custom={step}>
              {step === 1 && (
                <motion.div
                  key="step1"
                  variants={slideVariants}
                  custom={1}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <div className="form-input-wrapper">
                      <User size={18} className="form-input-icon" />
                      <input
                        className="form-input"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <div className="form-input-wrapper">
                      <Mail size={18} className="form-input-icon" />
                      <input
                        className="form-input"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <button type="button" className="auth-submit-btn" onClick={nextStep}>
                    Continue <ArrowRight size={18} style={{ marginLeft: 8 }} />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  variants={slideVariants}
                  custom={1}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <div className="form-input-wrapper">
                      <Lock size={18} className="form-input-icon" />
                      <input
                        className="form-input"
                        type={showPass ? 'text' : 'password'}
                        placeholder="Min 6 characters"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="form-input-action"
                        onClick={() => setShowPass(!showPass)}
                      >
                        {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {password && (
                      <>
                        <div className="password-strength">
                          {[1,2,3,4].map(i => (
                            <div
                              key={i}
                              className={`strength-bar ${i <= strength ? `active ${strengthClasses[strength]}` : ''}`}
                            />
                          ))}
                        </div>
                        <div className="strength-label">{strengthLabels[strength]}</div>
                      </>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Confirm Password</label>
                    <div className="form-input-wrapper">
                      <Lock size={18} className="form-input-icon" />
                      <input
                        className="form-input"
                        type={showPass ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                      />
                      {confirmPassword && password === confirmPassword && (
                        <span className="form-input-action" style={{ color: 'var(--success)' }}>
                          <Check size={18} />
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-checkbox">
                      <input type="checkbox" checked={terms} onChange={e => setTerms(e.target.checked)} />
                      I agree to Nike&apos;s Terms of Service and Privacy Policy
                    </label>
                  </div>

                  <div style={{ display: 'flex', gap: 12 }}>
                    <button type="button" className="auth-submit-btn" style={{ background: 'var(--gray-200)', color: 'var(--black)', flex: '0 0 auto', padding: '16px 24px' }} onClick={() => setStep(1)}>
                      <ArrowLeft size={18} />
                    </button>
                    <button className="auth-submit-btn" type="submit" disabled={loading} style={{ flex: 1 }}>
                      {loading ? <div className="spinner" style={{ margin: '0 auto' }} /> : 'Create Account'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          <motion.div className="auth-divider" variants={itemVariants}>or continue with</motion.div>

          <motion.div className="social-logins" variants={itemVariants}>
            <button className="social-btn" onClick={() => {}}>
              <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Google
            </button>
            <button className="social-btn" onClick={() => {}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              Apple
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('nike_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('nike_users') || '[]');
        const found = users.find(u => u.email === email && u.password === password);
        if (found) {
          const userData = { id: found.id, name: found.name, email: found.email };
          setUser(userData);
          localStorage.setItem('nike_user', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 800);
    });
  };

  const register = (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('nike_users') || '[]');
        if (users.find(u => u.email === email)) {
          reject(new Error('Email already exists'));
          return;
        }
        const newUser = {
          id: Date.now().toString(),
          name,
          email,
          password
        };
        users.push(newUser);
        localStorage.setItem('nike_users', JSON.stringify(users));
        const userData = { id: newUser.id, name: newUser.name, email: newUser.email };
        setUser(userData);
        localStorage.setItem('nike_user', JSON.stringify(userData));
        resolve(userData);
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nike_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

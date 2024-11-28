
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // AKA isLoggedIn
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [showShoppingCart, setShowShoppingCart] = useState(false);
  const [loading, setLoading] = useState(true);
  // Simulate loading user data from local storage or an API on mount
  useEffect(() => {
    const loadUserData = async () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
      }
      setLoading(false);
    };
    loadUserData();
  }, []);
  // Function to handle user login
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData)); // Persist user data in local storage
  };
  // Function to handle user logout
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user'); // Remove user data from local storage
  };
  // Context value to pass down to components
  const authContextValue = {
    user,
    setUser,
    isAuthenticated,
    showUserDetail,
    setShowUserDetail,
    showShoppingCart,
    setShowShoppingCart,
    login,
    logout,
    loading,
  };
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initially no user logged in

  // Example login function
  const login = (userData) => {
    setUser(userData); // Set user after successful login
  };

  // Example logout function
  const logout = () => {
    setUser(null); // Clear user on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import React, { createContext, useState, useContext } from "react";

// Create a context
const AuthContext = createContext();

// Create a context provider
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const login = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, username, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

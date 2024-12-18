import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (storedUser && token) {
        const parsedUser = JSON.parse(storedUser);
        // Make sure the token is attached to the user object
        if (!parsedUser.token) {
          parsedUser.token = token;
        }
        setUser(parsedUser);
        console.log('Restored user session:', parsedUser); // Debug log
      }
    } catch (error) {
      console.error('Error parsing stored user:', error);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    if (!userData || !userData._id || !userData.username || !userData.email) {
      console.error('Invalid user data provided to login:', userData);
      return false; // Return false to indicate failure
    }
  
    console.log('Logging in with user data:', userData);
  
    const userToStore = {
      _id: userData._id,
      username: userData.username,
      email: userData.email,
      token: userData.token || localStorage.getItem('token')
    };
  
    setUser(userToStore);
    localStorage.setItem('user', JSON.stringify(userToStore));
    if (userData.token) {
      localStorage.setItem('token', userData.token);
    }
    return true; // Return true to indicate success
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
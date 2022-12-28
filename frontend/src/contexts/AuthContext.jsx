/* eslint-disable react/jsx-no-constructed-context-values */
import {
  React, createContext, useContext, useState, useCallback, useEffect,
} from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loggedIn, setLoggedIn] = useState(userData ? { username: userData.username } : null);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem('userId'));
      setUserData(data);
      setLoggedIn({ username: data.username });
    } catch {
      setLoggedIn(null);
    }
  }, []);

  const logIn = (data) => {
    localStorage.setItem('userId', JSON.stringify(data));
    setLoggedIn({ username: data.username });
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(null);
  };

  const getUserName = () => {
    if (userData) {
      return userData.username;
    }
    return null;
  };

  const getAuthToken = useCallback(() => {
    if (userData && userData.token) {
      return { Authorization: `Bearer ${userData.token}` };
    }
    return {};
  }, [userData]);

  return (
    <AuthContext.Provider value={{
      loggedIn, logIn, logOut, getUserName, getAuthToken, userData,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

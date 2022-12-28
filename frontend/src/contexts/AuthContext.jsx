/* eslint-disable react/jsx-no-constructed-context-values */
import {
  React, createContext, useContext, useState,
} from 'react';

const AuthContext = createContext({});

const getUserData = () => {
  try {
    return JSON.parse(localStorage.getItem('userId'));
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const userData = getUserData();
  const [loggedIn, setLoggedIn] = useState(userData);

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

  const getAuthToken = () => {
    if (userData && userData.token) {
      return { Authorization: `Bearer ${userData.token}` };
    }
    return {};
  };

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

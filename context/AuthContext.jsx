import React, { createContext, useState, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); 

  useEffect(() => {
    const loadData = async () => {
      const storedToken = await SecureStore.getItemAsync('userToken');
      const storedUsername = await SecureStore.getItemAsync('username');
      const storedEmail = await SecureStore.getItemAsync('email');
      const storedAssetModel = await SecureStore.getItemAsync('asset_model');
      const storedFirstAccess = await SecureStore.getItemAsync('first_access');

      if (storedToken && storedUsername && storedEmail && storedAssetModel && storedFirstAccess) {
        setToken(storedToken);
        setUser({ username: storedUsername, email: storedEmail, asset_model: storedAssetModel, first_access: storedFirstAccess });
      }
    };

    loadData();
  }, []);

  const login = (authToken, userData) => {
    setToken(authToken);
    setUser(userData);
    SecureStore.setItemAsync('userToken', authToken);
    SecureStore.setItemAsync('username', userData.username);
    SecureStore.setItemAsync('email', userData.email);
    SecureStore.setItemAsync('asset_model', userData.asset_model);
    SecureStore.setItemAsync('first_access', userData.first_access);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    SecureStore.deleteItemAsync('userToken');
    SecureStore.deleteItemAsync('username');
    SecureStore.deleteItemAsync('email');
    SecureStore.deleteItemAsync('asset_model');
    SecureStore.deleteItemAsync('first_access');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

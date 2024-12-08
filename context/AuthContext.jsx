import React, { createContext, useState, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

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
      const storedUserId = await SecureStore.getItemAsync('_id');
      const storedUsername = await SecureStore.getItemAsync('username');
      const storedEmail = await SecureStore.getItemAsync('email');
      const storedAssetModel = await SecureStore.getItemAsync('asset_model');
      const storedFirstAccess = await SecureStore.getItemAsync('first_access');

      if (storedToken && storedUserId && storedUsername && storedEmail && storedAssetModel && storedFirstAccess) {
        setToken(storedToken);
        setUser({ _id: storedUserId ,username: storedUsername, email: storedEmail, asset_model: storedAssetModel, first_access: storedFirstAccess });
      }
    };

    loadData();
  }, []);

  const login = (authToken, userData) => {
    setToken(authToken);
    setUser(userData);
    SecureStore.setItemAsync('userToken', authToken);
    SecureStore.setItemAsync('_id', userData._id);
    SecureStore.setItemAsync('username', userData.username);
    SecureStore.setItemAsync('email', userData.email);
    SecureStore.setItemAsync('asset_model', userData.asset_model);
    SecureStore.setItemAsync('first_access', userData.first_access);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    SecureStore.deleteItemAsync('userToken');
    SecureStore.deleteItemAsync('_id');
    SecureStore.deleteItemAsync('username');
    SecureStore.deleteItemAsync('email');
    SecureStore.deleteItemAsync('asset_model');
    SecureStore.deleteItemAsync('first_access');

    // Redirect the user to the login screen
    console.log("User logged out");
    router.replace('loginScreen');
  };

  const renderUserData = async (renderUser) => {
    setUser(renderUser);

    await SecureStore.setItemAsync('userToken', updatedUser.token || token);
    await SecureStore.setItemAsync('_id', updatedUser._id || user._id);
    await SecureStore.setItemAsync('username', updatedUser.username || user.username);
    await SecureStore.setItemAsync('email', updatedUser.email || user.email);
    await SecureStore.setItemAsync('asset_model', updatedUser.asset_model || user.asset_model);
    await SecureStore.setItemAsync('first_access', updatedUser.first_access || user.first_access);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, renderUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

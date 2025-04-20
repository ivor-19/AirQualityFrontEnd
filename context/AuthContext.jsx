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
      const [
          storedToken,
          storedUserId,
          storedAccountId,
          storedUsername,
          storedEmail,
          storedRole,
          storedStatus,
          storedAssetModel,
          storedFirstAccess,
          storedDeviceNotif,
          storedAvatarPath,
        ] = await Promise.all([
          SecureStore.getItemAsync('userToken'),
          SecureStore.getItemAsync('_id'),
          SecureStore.getItemAsync('account_id'),
          SecureStore.getItemAsync('username'),
          SecureStore.getItemAsync('email'),
          SecureStore.getItemAsync('role'),
          SecureStore.getItemAsync('status'),
          SecureStore.getItemAsync('asset_model'),
          SecureStore.getItemAsync('first_access'),
          SecureStore.getItemAsync('device_notif'),
          SecureStore.getItemAsync('avatarPath'),
        ]);

      if (storedToken && storedUserId && storedAccountId && storedUsername && storedEmail && storedRole && storedStatus && storedAssetModel && storedFirstAccess && storedDeviceNotif && storedAvatarPath) {
        setToken(storedToken);
        setUser({
          _id: storedUserId,
          account_id: storedAccountId,
          username: storedUsername,
          email: storedEmail,
          role: storedRole,
          status: storedStatus,
          asset_model: storedAssetModel,
          first_access: storedFirstAccess,
          device_notif: storedDeviceNotif,
          avatarPath: storedAvatarPath
        });

        if(storedToken !== ''){
          if (storedFirstAccess === "No") {
            if(storedRole === "Admin"){
              router.replace('home');
            }
            else{
              router.replace('studentHome');
            }
          }
        }
      } else {
        router.replace('landingPage');
      }
    };

    loadData();
  }, []);

  const login = (authToken, userData) => {
    setToken(authToken);
    setUser(userData);
    SecureStore.setItemAsync('userToken', authToken);
    SecureStore.setItemAsync('_id', userData._id);
    SecureStore.setItemAsync('account_id', userData.account_id);
    SecureStore.setItemAsync('username', userData.username);
    SecureStore.setItemAsync('email', userData.email);
    SecureStore.setItemAsync('role', userData.role);
    SecureStore.setItemAsync('status', userData.status);
    SecureStore.setItemAsync('asset_model', userData.asset_model);
    SecureStore.setItemAsync('first_access', userData.first_access);
    SecureStore.setItemAsync('device_notif', userData.device_notif);
    SecureStore.setItemAsync('avatarPath', userData.avatarPath);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    SecureStore.deleteItemAsync('userToken');
    SecureStore.deleteItemAsync('_id');
    SecureStore.deleteItemAsync('account_id');
    SecureStore.deleteItemAsync('username');
    SecureStore.deleteItemAsync('email');
    SecureStore.deleteItemAsync('role');
    SecureStore.deleteItemAsync('status');
    SecureStore.deleteItemAsync('asset_model');
    SecureStore.deleteItemAsync('first_access');
    SecureStore.deleteItemAsync('device_notif');
    SecureStore.deleteItemAsync('avatarPath');
    router.replace('loginScreen');
  };

  const renderUserData = async (updatedUser) => {
    setUser(updatedUser);
    await SecureStore.setItemAsync('_id', updatedUser._id);
    await SecureStore.setItemAsync('account_id', updatedUser.account_id);
    await SecureStore.setItemAsync('username', updatedUser.username);
    await SecureStore.setItemAsync('email', updatedUser.email);
    await SecureStore.setItemAsync('role', updatedUser.role);
    await SecureStore.setItemAsync('status', updatedUser.status);
    await SecureStore.setItemAsync('asset_model', updatedUser.asset_model);
    await SecureStore.setItemAsync('first_access', updatedUser.first_access);
    await SecureStore.setItemAsync('device_notif', updatedUser.device_notif);
    await SecureStore.setItemAsync('avatarPath', updatedUser.avatarPath);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, renderUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
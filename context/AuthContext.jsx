import React, { createContext, useState, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
// import jwt_decode from 'jwt-decode'; // Import jwt-decode
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
          storedDeviceNotif
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
          SecureStore.getItemAsync('device_notif')
        ]);

      if (storedToken && storedUserId && storedAccountId && storedUsername && storedEmail && storedRole && storedStatus && storedAssetModel && storedFirstAccess && storedDeviceNotif) {
        // if (checkTokenExpiry(storedToken)) {
        //   console.log('Token expired, logging out...');
        //   logout(); // Log out the user if the token is expired
        //   router.replace('loginScreen'); // Redirect to the login screen
        //   return;
        // }
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
          device_notif: storedDeviceNotif
        });

        if(storedToken !== ''){
          if (storedFirstAccess === "No") {
            console.log("User is returning, redirecting to home");
            console.log("Stored Token: ", storedToken);
            if(storedRole === "Admin"){
              router.replace('home');
            }
            else{
              router.replace('studentHome');
            }
          }
        }
      } else {
        console.log("No user token or user data found, redirecting to login screen");
        router.replace('landingPage');
      }
    };

    loadData();
  }, []);

  const login = (authToken, userData) => {
    setToken(authToken);
    setUser(userData);
    SecureStore.setItemAsync('userToken', String(authToken));
    SecureStore.setItemAsync('_id', String(userData._id));
    SecureStore.setItemAsync('account_id', String(userData.account_id));
    SecureStore.setItemAsync('username', String(userData.username));
    SecureStore.setItemAsync('email', String(userData.email || ''));
    SecureStore.setItemAsync('role', String(userData.role));
    SecureStore.setItemAsync('status', String(userData.status));
    SecureStore.setItemAsync('asset_model', String(userData.asset_model || ''));
    SecureStore.setItemAsync('first_access', String(userData.first_access));
    SecureStore.setItemAsync('device_notif', String(userData.device_notif || ''));
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

    // Redirect the user to the login screen
    console.log("User logged out");
    router.replace('loginScreen');
  };

  const renderUserData = async (renderUser) => {
    setUser(renderUser);

    await SecureStore.setItemAsync('userToken', updatedUser.token || token);
    await SecureStore.setItemAsync('_id', updatedUser._id || user._id);
    await SecureStore.setItemAsync('account_id', updatedUser.account_id || user.account_id);
    await SecureStore.setItemAsync('username', updatedUser.username || user.username);
    await SecureStore.setItemAsync('email', updatedUser.email || user.email);
    await SecureStore.setItemAsync('role', updatedUser.role || user.role);
    await SecureStore.setItemAsync('status', updatedUser.status || user.status);
    await SecureStore.setItemAsync('asset_model', updatedUser.asset_model || user.asset_model);
    await SecureStore.setItemAsync('first_access', updatedUser.first_access || user.first_access);
    await SecureStore.setItemAsync('device_notif', updatedUser.device_notif || user.device_notif);
  };

  const checkTokenExpiry = (token) => {
    if (!token) {
      console.error('Token is missing or invalid');
      return true;  // Treat missing token as expired
    }

    // try {
    //   const decoded = jwt_decode(token);  // Decode the JWT token
    //   const currentTime = Date.now() / 1000;  // Current time in seconds
    //   const remainingTime = decoded.exp - currentTime;  // Remaining time before expiration in seconds

    //   // Convert remaining time to a more readable format (minutes, hours)
    //   const remainingMinutes = Math.floor(remainingTime / 60);
    //   const remainingHours = Math.floor(remainingTime / 3600);

    //   // Log the remaining time
    //   console.log(`Token expires in ${remainingMinutes} minutes`);

    //   return decoded.exp < currentTime; // Check if the token is expired
    // } catch (error) {
    //   console.error('Error decoding tokens', error);
    //   return true;  // Return expired if there's an error decoding
    // }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, renderUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

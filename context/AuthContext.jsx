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
          storedUsername,
          storedEmail,
          storedAssetModel,
          storedFirstAccess
        ] = await Promise.all([
          SecureStore.getItemAsync('userToken'),
          SecureStore.getItemAsync('_id'),
          SecureStore.getItemAsync('username'),
          SecureStore.getItemAsync('email'),
          SecureStore.getItemAsync('asset_model'),
          SecureStore.getItemAsync('first_access')
        ]);

      if (storedToken && storedUserId && storedUsername && storedEmail && storedAssetModel && storedFirstAccess) {
        // if (checkTokenExpiry(storedToken)) {
        //   console.log('Token expired, logging out...');
        //   logout(); // Log out the user if the token is expired
        //   router.replace('loginScreen'); // Redirect to the login screen
        //   return;
        // }
        setToken(storedToken);
        setUser({
          _id: storedUserId,
          username: storedUsername,
          email: storedEmail,
          asset_model: storedAssetModel,
          first_access: storedFirstAccess
        });

        if(storedToken !== ''){
          if (storedFirstAccess === "No") {
            console.log("User is returning, redirecting to home");
            router.replace('home');
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

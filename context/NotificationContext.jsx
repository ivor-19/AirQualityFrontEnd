import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api'
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();

  const [notifTokens, setNotifTokens] = useState([]);
  const [userNotifToken, setUserNotifToken] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      if(!user) return;

      try {
        const response = await api.get('/expoToken');
        const tokenList = response.data.tokens.map(item => item.token_notif);

        const getUserNotifToken = await api.get(`/users/${user._id}`);
        console.log("Fetched tokens:", tokenList); // Log tokens to verify
        setNotifTokens(tokenList);
        
        setUserNotifToken(getUserNotifToken.data.user.token_notif);
      } catch (error) {
        console.error("Error getting notification token:", error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <NotificationContext.Provider value={{ notifTokens, userNotifToken }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);

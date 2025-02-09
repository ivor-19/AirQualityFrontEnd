// components/NotificationButton.js
import React from 'react';
import { Button } from 'react-native';
import { scheduleNotification, requestNotificationPermissions } from '../services/notificationService';

const NotificationButton = () => {
  const handlePress = async () => {
    const hasPermission = await requestNotificationPermissions();
    if (hasPermission) {
      await scheduleNotification('Test Notification', 'This is a test notification!', 5);
    }
  };

  return <Button title="Schedule Notification" onPress={handlePress} />;
};

export default NotificationButton;
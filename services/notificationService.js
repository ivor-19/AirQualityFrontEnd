// services/notificationService.js
import * as Notifications from 'expo-notifications';

// Set up notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Function to request permissions
export const requestNotificationPermissions = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Permission to display notifications was denied!');
    return false;
  }
  return true;
};

// Function to schedule a notification
export const scheduleNotification = async (title, body, seconds) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger: {
      seconds,
    },
  });
};
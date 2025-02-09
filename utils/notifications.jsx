import * as Notifications from 'expo-notifications';

// Function to trigger a local notification
export const triggerNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Hello, World!",
      body: "This is a test notification",
    },
    trigger: { seconds: 2 },  // Trigger the notification after 2 seconds
  });
};

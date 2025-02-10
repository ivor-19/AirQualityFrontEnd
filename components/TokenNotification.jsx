// App.tsx
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Platform } from "react-native";
import { usePushNotifications } from "../usePushNotifications";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";

// Configure notification handler behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function TokenNotification() {
  const { expoPushToken, notification, registerForPushNotifications } = usePushNotifications();

  useEffect(() => {
    registerForPushNotifications();
  }, []);

  useEffect(() => {
    if (expoPushToken) {
      console.log("Production Push Token:", expoPushToken);
      // Here you should send this token to your backend server
    }
  }, [expoPushToken]);

  return (
    <View style={styles.container} className="absolute flex-1 top-0 bottom-0 z-50">
      <Text style={styles.title}>Push Notification Demo</Text>
      <Text style={styles.tokenText}>Your push token:</Text>
      <Text style={styles.token}>{expoPushToken?.data || "No token yet"}</Text>
      {notification && (
        <View style={styles.notificationContainer}>
          <Text style={styles.notificationTitle}>Last Notification:</Text>
          <Text style={styles.notificationText}>
            {JSON.stringify(notification.request.content, null, 2)}
          </Text>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  tokenText: {
    fontSize: 16,
    marginBottom: 10,
  },
  token: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  notificationContainer: {
    width: "100%",
    padding: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    marginTop: 20,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  notificationText: {
    fontSize: 14,
    color: "#333",
  },
});
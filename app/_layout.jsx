import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { AQIProvider } from "../context/AQIContext";
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { View } from "react-native";
import { AuthProvider } from "../context/AuthContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "PoppinsBlack": require("../assets/fonts/Poppins-Black.ttf"),
    "PoppinsBold": require("../assets/fonts/Poppins-Bold.ttf"),
    "PoppinsExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "PoppinsExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "PoppinsLight": require("../assets/fonts/Poppins-Light.ttf"),
    "PoppinsMedium" : require("../assets/fonts/Poppins-Medium.ttf"),
    "PoppinsRegular" : require("../assets/fonts/Poppins-Regular.ttf"),
    "PoppinsSemiBold" : require("../assets/fonts/Poppins-SemiBold.ttf"),
    "PoppinsThin" : require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    <>
      <AlertNotificationRoot
        theme="light"
        colors={[
          // Light theme colors
          {
            label: '#000', // Text color
            card: '#f3f4f6', // Card background color
            overlay: '#00000080', // Overlay color (for darkening the background)
            success: '#b8d8be', // Success color
            danger: '#dc3545', // Danger color
            warning: '#ffc107', // Warning color
          },
          // Dark theme colors
          {
            label: '#fff', // Text color
            card: '#333', // Card background color
            overlay: '#00000090', // Overlay color
            success: '#d2e7d6', // Success color
            danger: '#dc3545', // Danger color
            warning: '#ffc107', // Warning color
          },
        ]}
      >
        <AuthProvider>
          <AQIProvider>
            <Stack>
              <Stack.Screen name="index"  options={{headerShown: false,}}/>
              <Stack.Screen name="onboarding"  options={{headerShown: false,}}/>
              <Stack.Screen name="(tabs)"  options={{headerShown: false,}}/>
              <Stack.Screen name="(auth)"  options={{headerShown: false,}}/>
              {/* <Stack.Screen name="scanning"  options={{headerShown: false,}}/> */}
            </Stack>
          </AQIProvider>
        </AuthProvider>
      </AlertNotificationRoot>
    </>
  );
}
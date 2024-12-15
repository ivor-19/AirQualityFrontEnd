import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { AQIProvider } from "../context/AQIContext";
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { View } from "react-native";
import { AuthProvider } from "../context/AuthContext";
import { darkThemeColors, lightThemeColors } from "../utils/alertColorUtils";

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
        colors={[lightThemeColors, darkThemeColors]}
      >
        <AuthProvider>
          <AQIProvider>
            <Stack>
              <Stack.Screen name="index"  options={{headerShown: false,}}/>
              <Stack.Screen name="landingPage"  options={{headerShown: false,}}/>
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
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack } from 'expo-router'
import { AlertNotificationRoot } from 'react-native-alert-notification'
import NetInfo from '@react-native-community/netinfo'; // Import NetInfo
import { Image } from 'expo-image';
import { scale } from 'react-native-size-matters';
import NoInternetChecker from '../../components/NoInternetChecker';

const AuthLayout = () => {
  const [noConnection, setNoConnection] = useState(false);
  const [isConnectedToWifi, setIsConnectedToWifi] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnectedToWifi(state.isConnected && state.type === 'wifi');
    });
    
    if (isConnectedToWifi) {
      setNoConnection(false);
      console.log('connected')
    }

    if (!isConnectedToWifi) {
      setNoConnection(true);
      console.log('no connection')
    }

    return () => {
      unsubscribe();
    };
  }, [isConnectedToWifi]);

  return (
    <>
     <NoInternetChecker/>
     
      <AlertNotificationRoot 
        theme='light'
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
        <Stack>
            <Stack.Screen name='loginScreen' options={{headerShown: false,}}/>
            <Stack.Screen name='signUpScreen' options={{headerShown: false,}}/>
        </Stack>
      </AlertNotificationRoot>
    </>
  )
}

export default AuthLayout

const styles = StyleSheet.create({})
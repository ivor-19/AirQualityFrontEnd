import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { AlertNotificationRoot } from 'react-native-alert-notification'

const AuthLayout = () => {
  return (
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
  )
}

export default AuthLayout

const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { AlertNotificationRoot } from 'react-native-alert-notification'

const SettingsLayout = () => {
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
        <Stack.Screen name='settings' options={{title: 'Settings',headerTitleAlign: 'center' , headerShown: true, headerTitleStyle: {fontFamily: 'PoppinsBold', color: '#1d1c1a'}}}/>
      </Stack>
    </AlertNotificationRoot>
  )
}

export default SettingsLayout

const styles = StyleSheet.create({})
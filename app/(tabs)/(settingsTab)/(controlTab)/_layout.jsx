import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { AlertNotificationRoot } from 'react-native-alert-notification'
import { darkThemeColors, lightThemeColors } from '../../../../utils/alertColorUtils'

const ControlLayout = () => {
  return (
    <AlertNotificationRoot 
      theme='light'
      colors={[lightThemeColors, darkThemeColors]}
    >
      <Stack>
          <Stack.Screen name='profile' options={{headerShown: false,}}/>
      </Stack>
    </AlertNotificationRoot>
  )
}

export default ControlLayout

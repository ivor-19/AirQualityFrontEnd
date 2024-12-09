import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { AlertNotificationRoot } from 'react-native-alert-notification'

const SettingsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='settings' options={{title: 'Settings',headerTitleAlign: 'center' , headerShown: false, headerTitleStyle: {fontFamily: 'PoppinsBold', color: '#1d1c1a'}}}/>
      <Stack.Screen name='(controlTab)' options={{headerShown: false, }}/>
    </Stack>
  )
}

export default SettingsLayout

const styles = StyleSheet.create({})
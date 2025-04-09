import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { AlertNotificationRoot } from 'react-native-alert-notification'

const StudentSettingsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='sSettings' options={{title: 'Settings',headerTitleAlign: 'center' , headerShown: false, headerTitleStyle: {fontFamily: 'PoppinsBold', color: '#1d1c1a'}}}/>
      <Stack.Screen name='(sControlTab)' options={{headerShown: false, tabBarStyle: { display: 'none' },}}/>
      <Stack.Screen name="sAbout" options={{headerShown: false, tabBarStyle: { display: 'none' },}}/>
      <Stack.Screen name="sContactUs" options={{headerShown: false, tabBarStyle: { display: 'none' },}}/>
    </Stack>
  )
}

export default StudentSettingsLayout

const styles = StyleSheet.create({})
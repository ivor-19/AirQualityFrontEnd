import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const SettingsLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='settings' options={{title: 'Settings',headerTitleAlign: 'center' , headerShown: true, headerTitleStyle: {fontFamily: 'PoppinsBold', color: '#1d1c1a'}}}/>
    </Stack>
  )
}

export default SettingsLayout

const styles = StyleSheet.create({})
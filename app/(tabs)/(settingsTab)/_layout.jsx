import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const SettingsLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='settings' options={{title: 'Settings',headerTitleAlign: 'center' , headerShown: true,}}/>
    </Stack>
  )
}

export default SettingsLayout

const styles = StyleSheet.create({})
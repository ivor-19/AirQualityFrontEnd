import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='loginScreen' options={{headerShown: false,}}/>
        <Stack.Screen name='signUpScreen' options={{headerShown: false,}}/>
    </Stack>
  )
}

export default AuthLayout

const styles = StyleSheet.create({})
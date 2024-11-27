import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const HomeLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='home' options={{headerShown: false,}}/>
        <Stack.Screen name='statistics' options={{headerShown: false,}}/>
    </Stack>
  )
}

export default HomeLayout

const styles = StyleSheet.create({})
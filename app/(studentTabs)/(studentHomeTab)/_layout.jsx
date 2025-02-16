import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const StudentHomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='studentHome' options={{headerShown: false,}}/>
      <Stack.Screen name='studentStatistics' options={{headerShown: false,}}/>
    </Stack>
  )
}

export default StudentHomeLayout


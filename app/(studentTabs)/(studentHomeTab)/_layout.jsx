import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const StudnetHomeLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='studentHome' options={{headerShown: false,}}/>
    </Stack>
  )
}

export default StudnetHomeLayout

const styles = StyleSheet.create({})
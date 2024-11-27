import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AboutLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='about' options={{headerShown: false,}}/>
    </Stack>
  )
}

export default AboutLayout

const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const HistoryLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='history' options={{title: 'History',headerTitleAlign: 'center' , headerShown: false,}}/>
    </Stack>
  )
}

export default HistoryLayout

const styles = StyleSheet.create({})
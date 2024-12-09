import { View, Text } from 'react-native'
import React from 'react'
import CustomHeader from '../../../../components/CustomHeader'
import { router } from 'expo-router'

const profile = () => {
  return (
    <View className='bg-white h-full w-full'>
      <CustomHeader title={'Profile'} showBack={true} onPressBack={() => router.push('settings')}/>
    </View>
  )
}

export default profile
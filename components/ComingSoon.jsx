import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'expo-image';
import { scale } from 'react-native-size-matters';
import { router } from 'expo-router';
import RemixIcon from 'react-native-remix-icon';

const ComingSoon = ({pageName}) => {
  return (
    <SafeAreaView className='h-full w-full'>
      <View className='h-full bg-white items-center w-full p-6 justify-center z-50' style={{ gap: 20 }}>  
        <Image source={require('../assets/images/coming-soon.png')} style={{height: scale(100), width: scale(100)}}></Image>
        <Text className='font-pRegular text-center' style={{fontSize: scale(10)}}>{pageName} Page is still in development.</Text>
        <TouchableOpacity activeOpacity={0.6} onPress={() => router.replace('home')} className='flex-row space-x-2 items-center'>
          <RemixIcon name='ri-arrow-left-line' size={16}></RemixIcon>
          <Text className='font-pRegular text-center' style={{fontSize: scale(10)}}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ComingSoon
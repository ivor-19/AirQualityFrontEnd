import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'expo-image'

const SplashScreen = () => {
  const [noConnection, setNoConnection] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setNoConnection(true);
    }, 6000)
  }, [])

  return (
    <View className='bg-white flex-1 items-center justify-center'>
      <Image source={require('../assets/icons/leaf.png')} className='h-20 w-20' contentFit='contain'></Image>
      {noConnection ? (
        <Text className='font-pRegular text-[10px] text-end absolute bottom-10 text-gray-400'>Taking too long? Check your internet connection</Text>
      ): null}
    </View>
    
  )
}

export default SplashScreen
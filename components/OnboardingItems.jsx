import { View, Text, TouchableOpacity, useWindowDimensions, Image } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton';
import { router } from 'expo-router';

const OnboardingItems = ({customStyle, title, image, customImageStyle, description, showButton}) => {
  const {width} = useWindowDimensions();
  return (
    <View className={`flex-1 bg-white items-center justify-center ${customStyle}`}>
        <Image source={image} style={{width}} className={`flex-[0.5] ${customImageStyle}`}></Image>
        <View className={`flex-[0.3] w-80`} style={{gap: 20}}>
            <Text className='text-center text-pastel-black text-2xl font-semibold font-pBold'>{title}</Text>
            <Text className='text-center text-gray-500 font-pRegular'>{description}</Text> 
        </View>
        {showButton && (
          <CustomButton
            title={'Get started'}
            customButtomStyle={'bg-pastel-green w-[50%]'}
            customTitleStyle={'text-pastel-black'}
            onPress={() => router.push('home')}
          />
        )}

    </View>
  )
}

export default OnboardingItems
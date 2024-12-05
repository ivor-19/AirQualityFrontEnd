import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomButton from '../components/CustomButton';
import { router } from 'expo-router';
import Onboarding from '../components/Onboarding';
import { Image } from 'expo-image'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const Index = () => {
    return (
      <SafeAreaView className="h-screen bg-white">
          <View className='h-full w-full p-4 items-center'>
            <Text className='font-pBold text-center' style={{fontSize: scale(20)}}>AIR GUARD</Text>
            <View className='my-6'>
              <Image source={require('../assets/images/bird.png')} style={{height: scale(300), width: scale(300)}} resizeMode='contain'></Image>
            </View>
            <View className='flex-[0.8] w-[90%]'>
              <Text className='font-pBold text-center' style={{fontSize: scale(22)}}>
                  Detect and Protect with 
              <Text className='font-pBold text-pastel-green-v2'> Air Guard</Text></Text>
              <Text className='font-pRegular text-gray-500 text-center' style={{fontSize: scale(10)}}>
                Detect air quality issues with Air Guard. Understand the environmental factors affecting your health 
                and take action to ensure cleaner, safer air.
              </Text>
            </View>
          <CustomButton
            title={'Continue with email'}
            customButtomStyle={'w-full'}
            onPress={() => router.push('loginScreen')}
          />
        </View>
      </SafeAreaView>
    );
};

export default Index;

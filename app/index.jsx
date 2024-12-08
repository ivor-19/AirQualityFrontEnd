import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomButton from '../components/CustomButton';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { scale } from 'react-native-size-matters';
import SplashScreen from '../components/SplashScreen';
import NetInfo from '@react-native-community/netinfo'; // Import NetInfo

const Index = () => {
    const [showSplashScreen, setShowSplashScreen] = useState(true);
    const [isConnectedToWifi, setIsConnectedToWifi] = useState(false);

    useEffect(() => {
      // Check network status using NetInfo
      const unsubscribe = NetInfo.addEventListener(state => {
        setIsConnectedToWifi(state.isConnected && state.type === 'wifi');
      });

      
      if (isConnectedToWifi) {
        setTimeout(() => {
          setShowSplashScreen(false);
        }, 2000); // If connected to Wi-Fi, show for 2 seconds
      }

      if (!isConnectedToWifi) {
        setShowSplashScreen(true);
      }

      return () => {
        unsubscribe(); // Cleanup the NetInfo listener when the component unmounts
      };
    }, [isConnectedToWifi]); // Re-run whenever the connection status changes

    return (
        <>
        {showSplashScreen ? (
          <SplashScreen/>
        ) : (
          <SafeAreaView className="h-screen bg-white">
            <View className='h-full w-full p-4 items-center'>
              <View className='flex-row items-center justify-center' style={{gap: 8}}> 
                <Image source={require('../assets/icons/leaf.png')} className='h-8 w-8' contentFit='contain'></Image>
                <Text className='font-pBold text-center' style={{fontSize: scale(20)}}>AIR GUARD</Text>
              </View>
              <View className='my-6'>
                <Image source={require('../assets/images/bird.png')} style={{height: scale(300), width: scale(300)}} contentFit='contain'></Image>
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
                onPress={() => router.replace('loginScreen')}
              />
            </View>
          </SafeAreaView>
        )}
        </>
    );
};

export default Index;

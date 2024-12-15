import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomButton from '../components/CustomButton';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { scale } from 'react-native-size-matters';
import SplashScreen from '../components/SplashScreen';
import NetInfo from '@react-native-community/netinfo'; // Import NetInfo

const landingPage = () => {
    const [showSplashScreen, setShowSplashScreen] = useState(true);
    const [isConnectedToWifi, setIsConnectedToWifi] = useState(false);

    useEffect(() => {
      // Check network status using NetInfo
      const unsubscribe = NetInfo.addEventListener(state => {
        if (state.isConnected && (state.type === 'wifi' || state.type === 'cellular')) {
          setIsConnectedToWifi(true);
        } else {
          setIsConnectedToWifi(false);
        }
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
        unsubscribe();
      };
    }, [isConnectedToWifi]); // Re-run whenever the connection status changes

    return (
        <>
        {showSplashScreen ? (
          <SplashScreen/>
        ) : (
          <SafeAreaView className="h-screen bg-white">
            <View className='h-full w-full px-4 py-8 items-center'>
              <View className='flex-1 w-[90%] justify-center items-center'>
                <Image source={require('../assets/icons/leaf.png')} style={{height: scale(160), width: scale(160), marginBottom: scale(30)}} contentFit='contain'></Image>
                <View>
                  <Text className='font-pBold text-center' style={{fontSize: scale(22)}}>
                      Detect and Protect with 
                  <Text className='font-pBold text-pastel-green-v2'> Air Guard</Text></Text>
                  <Text className='font-pRegular text-gray-500 text-center' style={{fontSize: scale(10)}}>
                    Detect air quality issues with Air Guard. Understand the environmental factors affecting your health 
                    and take action to ensure cleaner, safer air.
                  </Text>
                </View>
              </View>
              <CustomButton
                title={'Continue'}
                customButtomStyle={'w-full'}
                onPress={() => router.replace('loginScreen')}
              />
            </View>
          </SafeAreaView>
        )}
        </>
    );
};

export default landingPage;

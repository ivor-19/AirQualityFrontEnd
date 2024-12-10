import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import NetInfo from '@react-native-community/netinfo'; // Import NetInfo
import { scale } from 'react-native-size-matters';
import { Image } from 'expo-image';

const NoInternetChecker = () => {
  const [noConnection, setNoConnection] = useState(false);
  const [isConnectedToWifi, setIsConnectedToWifi] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected && (state.type === 'wifi' || state.type === 'cellular')) {
        setIsConnectedToWifi(true);
      } else {
        setIsConnectedToWifi(false);
      }
    });
    
    if (isConnectedToWifi) {
      setNoConnection(false);
      console.log('connected to wifi or cellular')
    }

    if (!isConnectedToWifi) {
      setNoConnection(true);
      console.log('no connection')
    }

    return () => {
      unsubscribe();
    };
  }, [isConnectedToWifi]);

  return (
    <>
      {noConnection ? (
        <View className='h-full bg-white items-center w-full p-6 justify-center z-50' style={{ gap: 20 }}>  
          <Image source={require('../assets/images/ghost.png')} style={{height: scale(100), width: scale(100)}}></Image>
          <Text className='font-pBold' style={{fontSize: scale(18)}}>Oops!</Text>
          <Text className='font-pRegular text-center' style={{fontSize: scale(10)}}>No internet connection was found. Check your internet connection. ss</Text>
        </View>
      ) : null}
    </>
  )
}

export default NoInternetChecker
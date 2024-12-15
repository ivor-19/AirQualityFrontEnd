import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useAQI } from '../../context/AQIContext';
import axios from 'axios';
import { router } from 'expo-router';
import { MotiView } from '@motify/components';
import { Easing } from 'react-native-reanimated';
import { useAuth } from '../../context/AuthContext';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import RemixIcon from 'react-native-remix-icon';
import { Image } from 'expo-image';
import { scale } from 'react-native-size-matters';

const Scanning = () => {
  const { user, renderUserData } = useAuth(); // Ensure you are getting the latest user object
  const { aqi, pm2_5, co, no2, timestamp, date, scanned_by, setAqi, setPm2_5, setC0, setN02, setTimestamp, setDate, setScannedBy, setScannedUsingModel } = useAQI(); 
  const navigation = useNavigation();
  const [animationKey, setAnimationKey] = useState(0);

  useFocusEffect(
    React.useCallback(() => {

    }, [user.asset_model])
  );

  useEffect(() => {
    const handleTimeOut = () => {
      setTimeout(() => {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Sending Complete!',
          textBody: `All your emails have been successfully sent. Thank you for your patience.`,
          autoClose: 4000,
          closeOnOverlayTap: true,
        })

        router.push('home');
        
      }, 4000);
    };

    const reset = navigation.addListener('focus', () => {
      setAnimationKey((prevKey) => prevKey + 1);
      handleTimeOut();
    });

    return () => {
      reset();
    };
  }, [navigation, user.asset_model, setAqi, setPm2_5, setC0, setN02, setTimestamp, setScannedBy, setScannedUsingModel]);

  return (
    <View className='flex-1 items-center justify-center bg-white'>
      <Image source={require('../../assets/animated/direct.gif')} style={{height: scale(160), width: scale(160)}}></Image>
      {/* {[...Array(3).keys()].map((index) => {
        return (
          <MotiView
            from={{ opacity: 0.7, scale: 1.5 }}
            animate={{ opacity: 0, scale: 4 }}
            transition={{
              loop: true,
              type: 'timing',
              duration: 2000,
              easing: Easing.inOut(Easing.ease),
              delay: index * 400,
              repeatReverse: false,
            }}
            key={`${animationKey}-${index}`}
            style={{
              width: 80,
              height: 80,
              borderRadius: 50,
              backgroundColor: '#699571',
              position: 'absolute',
            }}
          />
        );
      })}
      <View className='absolute items-center justify-center bottom-28'>
        <Text className='font-pRegular text-[10px] text-gray-500'>Conducting scans with the {user.asset_model}</Text>
      </View> */}
      <View className='absolute items-center justify-center bottom-28'>
        <Text className='font-pRegular text-[10px] text-gray-500'>Your message is being delivered...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Scanning;

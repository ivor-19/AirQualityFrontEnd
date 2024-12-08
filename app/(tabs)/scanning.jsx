import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useAQI } from '../../context/AQIContext';
import axios from 'axios';
import { router } from 'expo-router';
import { MotiView } from '@motify/components';
import { Easing } from 'react-native-reanimated';
import { useAuth } from '../../context/AuthContext';

const Scanning = () => {
  const { user, renderUserData } = useAuth(); // Ensure you are getting the latest user object

  const [loading, setLoading] = useState(true);
  const { setAqi, setPm2_5, setC0, setN02, setTimestamp, setDate, setScannedBy, setScannedUsingModel } = useAQI();
  const navigation = useNavigation();
  const [animationKey, setAnimationKey] = useState(0);

  const getCurrentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const getCurrentTime = () => {
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
    return new Date().toLocaleTimeString([], options);
  };

  useFocusEffect(
    React.useCallback(() => {
      // No need to set model state, just use user.asset_model directly when saving data
      // You can remove `model` state if it's redundant
    }, [user.asset_model])
  );

  useEffect(() => {
    const handleTimeOut = () => {
      setTimeout(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`https://air-quality-back-end-v2.vercel.app/aqReadings/${user.asset_model}`);
            const data = response.data[0];

            console.log("API Response Data:", response.data);
            const currentDate = getCurrentDate();
            const currentTimestamp = getCurrentTime();

            setDate(currentDate);
            setTimestamp(currentTimestamp);
            setAqi(data.aqi);
            setPm2_5(data.pm2_5);
            setC0(data.co);
            setN02(data.no2);
            setScannedBy(user.username);  // Ensure username is correct
            setScannedUsingModel(user.asset_model);  // Use user.asset_model directly here

            const newHistoryData = {
              date: currentDate,
              timestamp: currentTimestamp,
              aqi: data.aqi,
              pm2_5: data.pm2_5,
              co: data.co,
              no2: data.no2,
              scanned_by: user.username,
              scanned_using_model: user.asset_model, // Make sure this is the correct model
            };

            console.log('Saving data with model:', user.asset_model); // Debug log to confirm model

            await axios.post('https://air-quality-back-end-v2.vercel.app/history', newHistoryData);
            console.log('History data is saved:', newHistoryData);

            router.push('home');
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };

        fetchData();
      }, 3000);
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
      {[...Array(3).keys()].map((index) => {
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

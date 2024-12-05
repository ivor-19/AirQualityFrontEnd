import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAQI } from '../../context/AQIContext'; // Correct import path
import axios from 'axios';
import { router } from 'expo-router';
import { MotiView } from '@motify/components'
import { Easing } from 'react-native-reanimated';

const Scanning = () => {
  const [loading, setLoading] = useState(true);
  const { aqi, setAqi, pm2_5, setPm2_5, co, setC0, no2, setN02, timestamp, setTimestamp, date, setDate} = useAQI();
  const navigation = useNavigation();
  const [animationKey, setAnimationKey] = useState(0);

  const getCurrentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`
  }
  const getCurrentTime = () => new Date().toLocaleTimeString();

  useEffect(() => {
    const handleTimeOut = () => {
      setTimeout(() => {
       const fetchData = async () => {
        try {
          const response = await axios.get('https://air-quality-back-end-v2.vercel.app/api/latestaq');
          const data = response.data[0];
          const currentDate = getCurrentDate();
          const currentTimestamp = getCurrentTime();

          setDate(currentDate);
          setTimestamp(currentTimestamp);
          setAqi(data.aqi);
          setPm2_5(data.pm2_5);
          setC0(data.co);
          setN02(data.no2);

          const newHistoryData = {date: currentDate, timestamp: currentTimestamp, aqi: data.aqi, pm2_5: data.pm2_5, co: data.co, no2: data.no2};
          await axios.post('https://air-quality-back-end-v2.vercel.app/api/history', newHistoryData);
          console.log('History data is saved: ', newHistoryData)

          router.push('home');
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
       }
       fetchData();
      }, 3000);
    }
    const reset = navigation.addListener('focus', () => {
      setAnimationKey(prevKey => prevKey + 1);
      handleTimeOut();
    })

    return () => {
      reset();
    }
  }, [navigation, setAqi, setPm2_5, setC0, setN02, setTimestamp])

  // useEffect(() => {
  //   fetchAQIData();
  //   console.log('Updated aqi: ', aqi)
  // }, [aqi]);

  return (
    <View className='flex-1 items-center justify-center bg-white'>
    {[...Array(3).keys()].map(index => {
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
        
      )
    })}
    <View className='bg-primary-OP w-28 h-28 rounded-full z-50' style={{shadowColor:'#699571', elevation: 40, justifyContent: 'center', alignItems: 'center'}}></View>
    
    {/* Optionally, you can add a button to manually navigate to home */}
    {/* <TouchableOpacity className='bg-slate-200 h-6 px-2' onPress={() => router.push('home')}>
      <Text>Go Back</Text>
    </TouchableOpacity> */}
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

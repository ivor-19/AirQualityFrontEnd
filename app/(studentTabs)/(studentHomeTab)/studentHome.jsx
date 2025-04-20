import { View, Text, SafeAreaView, TouchableOpacity, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import RemixIcon from 'react-native-remix-icon'
import { router } from 'expo-router'
import { Image } from 'expo-image'
import Svg, { Circle } from 'react-native-svg';
import { useAQI } from '../../../context/AQIContext'
import Weather from '../../../components/Weather'
import { useAuth } from '../../../context/AuthContext'
import { scale } from 'react-native-size-matters'
import api from '../../../utils/api';
import { useFocusEffect } from '@react-navigation/native'
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

const StudentHome = () => {
  const { user, renderUserData, token } = useAuth();
  const { aqi, pm2_5, pm10, co, no2, aqiIC, aqiIL, aqiCon, timestamp, date, scanned_by, setAqi, setPm2_5, setPm10, setC0, setN02, setTimestamp, setDate, setScannedBy, setScannedUsingModel } = useAQI(); 

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

  useEffect(() => {
    if(token !== ''){
     const fetchData = async () => {
      try {
        const response = await api.get(
          `/aqReadings/${user.asset_model}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        );
        const data = response.data.aqReadings[0];
        console.log("API Response Data:", response.data); // para makita yung response sa terminal log
        const currentDate = getCurrentDate();
        const currentTimestamp = getCurrentTime();

        setDate(currentDate);
        setTimestamp(currentTimestamp);
        setAqi(data.aqi);
        setPm2_5(data.pm2_5);
        setPm10(data.pm10);
        setC0(data.co);
        setN02(data.no2);

        // const highestValue = Math.max(data.pm2_5, data.co, data.no2);
        // setAqi(highestValue);
        setScannedBy(user._id);  // Ensure username is correct
        setScannedUsingModel(user.asset_model);  // Use user.asset_model directly here

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 2000);

    return () => clearInterval(interval);
    }
    else{
      console.log('empty token')
    }
  }, []); 


  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className='p-4 h-full w-full' style={{gap: 12}}>
        {/* Weather */}
        <Weather />
        
        {/* Quality Level */}
        <View className='w-full flex flex-row space-x-2 h-28'>
          <View className='bg-pastel-green h-full flex-1 rounded-custom' style={{shadowColor: 'gray', elevation: 4}}>
            <View className='flex-1 p-2' style={{gap: 20}}>
              <Text className='font-pSemiBold text-center text-pastel-black' style={{fontSize: scale(8)}}>PM 2.5</Text>
              <View className='flex-1 items-center justify-center'>
                <View className='bg-pastel-black h-14 w-14 rounded-full items-center justify-center'>
                  <MaterialIcons name="blur-on" size={scale(28)} color="#fff" />
                </View>
              </View>
              <Text className='font-pSemiBold text-center text-pastel-black' style={{fontSize: scale(8)}}>{pm2_5}</Text>
            </View>
          </View>
          <View className='bg-pastel-green h-full flex-1 rounded-custom' style={{shadowColor: 'gray', elevation: 4}}>
            <View className='flex-1 p-2' style={{gap: 20}}>
              <Text className='font-pSemiBold text-center text-pastel-black' style={{fontSize: scale(8)}}>PM 10</Text>
              <View className='flex-1 items-center justify-center'>
                <View className='bg-pastel-black h-14 w-14 rounded-full items-center justify-center'>
                  {/* <Image source={require('../../../assets/icons/pm10.png')} className='h-10 w-10'/> */}
                  <MaterialCommunityIcons name="dots-hexagon" size={scale(28)} color="#fff" />
                </View>
              </View>
              <Text className='font-pSemiBold text-center text-pastel-black' style={{fontSize: scale(8)}}>{pm10}</Text>
            </View>
          </View>
          <View className='bg-pastel-green h-full flex-1 rounded-custom' style={{shadowColor: 'gray', elevation: 4}}>
            <View className='flex-1 p-2' style={{gap: 20}}>
              <Text className='font-pSemiBold text-center text-pastel-black' style={{fontSize: scale(8)}}>CO</Text>
              <View className='flex-1 items-center justify-center'>
                <View className='bg-pastel-black h-14 w-14 rounded-full items-center justify-center'>
                  <Image source={require('../../../assets/icons/smoke-white.png')} className='h-10 w-10'/>
                </View>
              </View>
              <Text className='font-pSemiBold text-center text-pastel-black' style={{fontSize: scale(8)}}>{co}</Text>
            </View>
          </View>
          <View className='bg-pastel-green h-full flex-1 rounded-custom' style={{shadowColor: 'gray', elevation: 4}}>
            <View className='flex-1 p-2' style={{gap: 20}}>
              <Text className='font-pSemiBold text-center text-pastel-black' style={{fontSize: scale(8)}}>NO2</Text>
              <View className='flex-1 items-center justify-center'>
                <View className='bg-pastel-black h-14 w-14 rounded-full items-center justify-center'>
                 <FontAwesome5 name="wind" size={scale(28)} color="#fff" />
                </View>
              </View>
              <Text className='font-pSemiBold text-center text-pastel-black' style={{fontSize: scale(8)}}>{no2}</Text>
            </View>
          </View>
        </View>
        {/* Graph */}
        <View className='flex-[0.9] bg-white rounded-custom py-4 px-8 border-2 border-gray-100' style={{shadowColor: 'gray', elevation: 4}}>
          <View className='h-[10%] justify-center'>
            {/* <Text className='text-center font-pRegular' style={{fontSize: scale(14)}}>Statistics</Text> */}
          </View>
          <View className='flex-1 items-center justify-center'>
            <Svg height="300" width="300">
              {/* Outer Circle */}
              <Circle cx="150" cy="150" r="120" stroke="gray" strokeWidth="16" fill="none" strokeDasharray="2,5" />
              {/* Inner Circle */}
              <Circle cx="150" cy="150" r="90" stroke="gray" strokeWidth="2" fill="none" strokeDasharray="2,5" />
            </Svg>
            <View className='absolute items-center justify-center h-14'>
              <Text className='font-pBold text-pastel-black' style={{fontSize: scale(36)}}>{aqi}</Text>
              <Text className='font-pRegular' style={{fontSize: scale(8)}}>AQI score</Text>
              {timestamp && <Text className='font-pRegular text-gray-400' style={{fontSize: scale(8)}}>Timestamp: {timestamp}</Text>}
            </View>
          </View>
          <View className='h-[10%] flex-row justify-between items-center'>
            <View className='flex-row flex-1 items-center' style={{gap: 6}}>
              <Text className='font-pRegular text-pastel-black' style={{fontSize: scale(8)}}>Risk Percentage:</Text>
              <View className={`rounded-full`} style={{height: scale(6), width: scale(6), backgroundColor: aqiIC}}></View>
              <Text className='font-pRegular text-pastel-black' style={{fontSize: scale(8)}}>{aqiIL}</Text>
            </View>
            {aqi !== 0 && (
              <TouchableOpacity className='bg-gray-100 px-3 items-center rounded-xl flex-row justify-between' style={{height: scale(24), width: scale(110)}} onPress={() => router.push('studentStatistics')} activeOpacity={0.5}>
                <Text className='font-pRegular text-pastel-black' style={{fontSize: scale(8)}}>View Statistics</Text>
                <RemixIcon name='ri-arrow-right-up-line' size={16}></RemixIcon>
              </TouchableOpacity>
              
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default StudentHome

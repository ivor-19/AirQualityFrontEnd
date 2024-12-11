import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import RemixIcon from 'react-native-remix-icon'
import { router } from 'expo-router'
import { Image } from 'expo-image'
import Svg, { Circle } from 'react-native-svg';
import { useAQI } from '../../../context/AQIContext'
import Weather from '../../../components/Weather'
import { useAuth } from '../../../context/AuthContext'
import axios from 'axios'
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

const Home = () => {
  const { user, renderUserData } = useAuth();
  const { aqi, pm2_5, co, no2, aqiIC, aqiIL, aqiCon, timestamp, date, scanned_by, setAqi, setPm2_5, setC0, setN02, setTimestamp, setDate, setScannedBy, setScannedUsingModel } = useAQI(); 
  const [to, setTo] = useState('ivorcruz19@gmail.com');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [qualityMessage, setQualityMessage] = useState('');

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
        setScannedBy(user._id);  // Ensure username is correct
        setScannedUsingModel(user.asset_model);  // Use user.asset_model directly here

        setQualityMessage(
          `
           AQI: ${data.aqi}
           PM 2.5: ${data.pm2_5}
           CO: ${data.co}
           NO2: ${data.no2}
           Timestamp: ${currentTimestamp}
           Date: ${currentDate}
           Risk Percentage: ${aqiIL}
           Condition: ${aqiCon}
          `
          )

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 2000);

    return () => clearInterval(interval);
  }, []); 

  useEffect(() => {
    if (qualityMessage) {

    }
  }, [qualityMessage]);  // Send alert whenever qualityMessage changes

  const sendAlert = async () => {
    const to = 'ivorcruz19@gmail.com';
    const subject = 'AIR GUARD ALERT';
    const message = `
      Immediate notice: AQI index is too high. We highly recommend that students stay home.
      ${qualityMessage}
    `;

    const emailData = { to, subject, message };
    // console.log(emailData);

    // Uncomment to send the email
    try {
      const response = await axios.post('https://air-quality-back-end-v2.vercel.app/email/send', emailData);
      console.log('Send Message', response.data.message);
    } catch (error) {
      console.error('Error sending email', error);
    }
  };
  



  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className='p-4 h-full w-full' style={{gap: 12}}>
        {/* Weather */}
        <Weather />
        
        {/* Quality Level */}
        <View className='w-full flex flex-row space-x-2 h-28'>
          <View className='bg-pastel-green h-full flex-1 rounded-custom' style={{shadowColor: 'gray', elevation: 4}}>
            <View className='flex-1 p-2' style={{gap: 20}}>
              <Text className='font-pSemiBold text-[10px] text-center text-pastel-black'>PM 2.5</Text>
              <View className='flex-1 items-center justify-center'>
                <View className='bg-pastel-black h-14 w-14 rounded-full items-center justify-center'>
                  <Image source={require('../../../assets/icons/pm2.5.png')} className='h-10 w-10'/>
                </View>
              </View>
              <Text className='font-pSemiBold text-[10px] text-center text-pastel-black'>{pm2_5}</Text>
            </View>
          </View>
          <View className='bg-pastel-green h-full flex-1 rounded-custom' style={{shadowColor: 'gray', elevation: 4}}>
            <View className='flex-1 p-2' style={{gap: 20}}>
              <Text className='font-pSemiBold text-[10px] text-center text-pastel-black'>CO</Text>
              <View className='flex-1 items-center justify-center'>
                <View className='bg-pastel-black h-14 w-14 rounded-full items-center justify-center'>
                  <Image source={require('../../../assets/icons/smoke-white.png')} className='h-10 w-10'/>
                </View>
              </View>
              <Text className='font-pSemiBold text-[10px] text-center text-pastel-black'>{co}</Text>
            </View>
          </View>
          <View className='bg-pastel-green h-full flex-1 rounded-custom' style={{shadowColor: 'gray', elevation: 4}}>
            <View className='flex-1 p-2' style={{gap: 20}}>
              <Text className='font-pSemiBold text-[10px] text-center text-pastel-black'>NO2</Text>
              <View className='flex-1 items-center justify-center'>
                <View className='bg-pastel-black h-14 w-14 rounded-full items-center justify-center'>
                  <Image source={require('../../../assets/icons/nitrogen.png')} className='h-10 w-10'/>
                </View>
              </View>
              <Text className='font-pSemiBold text-[10px] text-center text-pastel-black'>{no2}</Text>
            </View>
          </View>
          <View className='bg-pastel-green h-full flex-1 rounded-custom' style={{shadowColor: 'gray', elevation: 4}}>
            <View className='flex-1 p-2' style={{gap: 20}}>
              <Text className='font-pSemiBold text-[10px] text-center text-pastel-black'>???</Text>
              <View className='flex-1 items-center justify-center'>
                <View className='bg-pastel-black h-14 w-14 rounded-full items-center justify-center'>
                  <RemixIcon name='ri-bubble-chart-fill' color='white'/>
                </View>
              </View>
              <Text className='font-pSemiBold text-[10px] text-center text-pastel-black'>???</Text>
            </View>
          </View>
        </View>
        {/* Graph */}
        <View className='flex-[0.9] bg-white rounded-custom py-4 px-8 border-2 border-gray-100' style={{shadowColor: 'gray', elevation: 4}}>
          <View className='h-[10%] justify-center'>
            <Text className='text-center font-pRegular text-[16px]'>Statistics</Text>
          </View>
          <View className='flex-1 items-center justify-center'>
            <Svg height="300" width="300">
              {/* Outer Circle */}
              <Circle cx="150" cy="150" r="120" stroke="gray" strokeWidth="16" fill="none" strokeDasharray="2,5" />
              {/* Inner Circle */}
              <Circle cx="150" cy="150" r="90" stroke="gray" strokeWidth="2" fill="none" strokeDasharray="2,5" />
            </Svg>
            <View className='absolute items-center justify-center h-14'>
              <Text className='font-pBold text-[42px] text-pastel-black'>{aqi}</Text>
              <Text className='font-pRegular text-[10px]'>AQI score</Text>
              {timestamp && <Text className='font-pRegular text-[10px] text-gray-400'>Timestamp: {timestamp}</Text>}
            </View>
          </View>
          <View className='h-[10%] flex-row justify-between items-center'>
            <View className='flex-row flex-1 items-center' style={{gap: 6}}>
              <Text className='font-pRegular text-[10px] text-pastel-black'>Risk Percentage:</Text>
              <View className={`h-2 w-2 rounded-full`} style={{backgroundColor: aqiIC}}></View>
              <Text className='font-pRegular text-[10px] text-pastel-black'>{aqiIL}</Text>
            </View>
            {aqi !== 0 && (
              <TouchableOpacity className='bg-gray-100 px-3 w-32 h-8 items-center rounded-xl flex-row justify-between' onPress={() => router.push('statistics')} activeOpacity={0.5}>
                <Text className='font-pRegular text-[12px] text-pastel-black'>All Statistics</Text>
                <RemixIcon name='ri-arrow-right-up-line' size={16}></RemixIcon>
              </TouchableOpacity>
              
            )}
            <TouchableOpacity className='bg-gray-100 px-3 w-32 h-8 items-center rounded-xl flex-row justify-between' onPress={sendAlert} activeOpacity={0.5}>
              <Text className='font-pRegular text-[12px] text-pastel-black'>Send</Text>
              <RemixIcon name='ri-arrow-right-up-line' size={16}></RemixIcon>
            </TouchableOpacity>
          </View>
        </View>
        </View>
    </SafeAreaView>
  )
}

export default Home

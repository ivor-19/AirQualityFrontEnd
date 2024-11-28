import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import RemixIcon from 'react-native-remix-icon'
import { router } from 'expo-router'
import { Image } from 'expo-image'
import axios from 'axios'

const history = () => {
  const [pressed, setPressed] = useState(null);

  const togglePressed = (id) => {
    setPressed(prevState => prevState === id ? null : id)
  }
  
  const [dataHistory, setDataHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://air-quality-back-end.vercel.app/api/history');
        setDataHistory(response.data);
      } catch (error) {
        console.log('Error fetching data: ', error)
      }
    }
    fetchData();

      // Set an interval to fetch data every 10 seconds (or your preferred interval)
    const interval = setInterval(fetchData, 10000);

    // Cleanup the interval on unmount
    return () => clearInterval(interval);
  }, [])
  
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='h-16 justify-center relative border-b-[1px] border-gray-100 px-4 '>
        <Text className='text-left font-pBold text-[20px] text-pastel-black'>Data History</Text>
      </View>
      <View className='h-16 justify-center relative border-b-[1px] border-gray-100 px-4 items-center'>
        <View className='h-6 bg-gray-100 rounded-[20px] w-[100%]'></View>
      </View>
      <ScrollView>
        <View className='flex-1 w-full p-4' style={{gap: 12}}>
          {dataHistory.map((data, index) => {
            return(
              <TouchableOpacity key={index} onPress={() => togglePressed(data.id)} className={`bg-white rounded-custom border-2 border-gray-100 'h-24'`} activeOpacity={0.7} style={{shadowColor: 'gray', elevation: 4}}>
                <View className='rounded-custom p-4 flex-row items-center'>
                  <View className='w-[20%] h-10 items-center justify-center'>
                      <Text className='text-pastel-black font-pBold text-[30px]'>{data.aqi}</Text>
                      <Text className='text-pastel-black font-pRegular text-[10px]'>AQI score</Text>
                  </View>
                  <View className='flex-1 h-full px-2'>
                      <Text className='font-pBold text-pastel-black text-[16px]'>{data.date}</Text>
                      <Text className='font-pRegular text-pastel-black text-[10px]'>Timestamp: {data.timestamp}</Text>
                      <Text className='font-pRegular text-pastel-black text-[10px]'>Risk Indicator: --</Text>
                  </View> 
                </View>
                {pressed === data._id ? (
                  <View className='bg-white rounded-custom h-24'></View>
                ): null}
                
            </TouchableOpacity>
            )
          })}   
          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default history
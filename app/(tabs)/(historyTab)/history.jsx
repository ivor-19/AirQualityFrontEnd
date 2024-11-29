import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import RemixIcon from 'react-native-remix-icon'
import { router } from 'expo-router'
import { Image } from 'expo-image'
import axios from 'axios'

const history = () => {
  const [pressed, setPressed] = useState(null);
  const [loading, setLoading] = useState(true);

  const togglePressed = (id) => {
    setPressed(prevState => prevState === id ? null : id)
  }
  
  const [dataHistory, setDataHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://air-quality-back-end.vercel.app/api/history');
        setDataHistory(response.data.reverse());
        setLoading(false);
      } catch (error) {
        console.log('Error fetching data: ', error)
        setLoading(false);
      }
    }
    fetchData();

      // Set an interval to fetch data every 2 seconds
    const interval = setInterval(fetchData, 2000);

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
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View className='flex-1 w-full p-4' style={{gap: 12}}>
          {loading ? (
            <View className='h-full items-center justify-start'>
              <Image source={require('../../../assets/animated/loading.gif')} className='h-[40%] w-[40%]'/>
              <Text className='font-pRegular text-gray-500 text-[12px]'>Wait a minute...fetching data</Text>
            </View>
          ) : dataHistory.length === 0 ? (
            <View className='h-full items-center justify-start' style={{gap: 12}}>
              <Image source={require('../../../assets/images/oops_empty.png')} className='h-[50%] w-[50%]'/>
              <Text className='font-pRegular text-gray-500 text-[12px]'>Oops, it seems you don't have any history data.</Text>
            </View>
          ) : (
            dataHistory.map((data, index) => {
              return(
                <TouchableOpacity key={index} onPress={() => togglePressed(data._id)} className={`bg-white rounded-custom border-2 border-gray-100 'h-24'`} activeOpacity={0.7} style={{shadowColor: 'gray', elevation: 4}}>
                  <View className='rounded-custom p-4 flex-row items-center'>
                    <View className='w-[20%] h-10 items-center justify-center'>
                        <Text className='text-pastel-black font-pBold text-[30px]'>{data.aqi}</Text>
                        <Text className='text-pastel-black font-pRegular text-[10px]'>AQI score</Text>
                    </View>
                    <View className='flex-1 h-full px-2'>
                        <Text className='font-pBold text-pastel-black text-[16px]'>{data.date}</Text>
                        <Text className='font-pRegular text-pastel-black text-[10px]'>Timestamp: {data.timestamp}</Text>
                        <View className='flex-row items-center' style={{gap: 3}}>
                          <Text className='font-pRegular text-pastel-black text-[10px]'>Risk Indicator:</Text>
                          <View className={`h-[6px] w-[6px] rounded-full 
                            ${
                              data.aqi <= 50 ? 'bg-[#DAF7A6]' : 
                              data.aqi <= 100 ? 'bg-[#FFC300]' : 
                              data.aqi <= 150 ? 'bg-[#FF5733]' :
                              data.aqi <= 200 ? 'bg-[#C70039]' :
                              data.aqi <= 300 ? 'bg-[#900C3F]' :
                              'bg-[#581845]' 
                            
                            }`}>
                          </View> 
                          <Text className='font-pRegular text-pastel-black text-[10px]'>
                            {
                              data.aqi <= 50 ? 'Very Low' :
                              data.aqi <= 100 ? 'Low' : 
                              data.aqi <= 150 ? 'Moderate' :
                              data.aqi <= 200 ? 'High' :
                              data.aqi <= 300 ? 'Very High' :
                              'Extremely High' 

                            }
                          </Text>
                        </View>
                    </View> 
                  </View>
                  {pressed === data._id ? (
                    <View className='bg-white rounded-custom h-24 p-4 w-full flex-row'>
                      <View className='w-[50%]'>
                        <Text className='font-pRegular'>PM2.5: <Text className='font-pBold'>{data.pm2_5}</Text></Text>
                        <Text className='font-pRegular'>CO: <Text className='font-pBold'>{data.co}</Text></Text>
                      </View>
                      <View className='w-[50%]'>
                        <Text className='font-pRegular'>NO2: <Text className='font-pBold'>{data.no2}</Text></Text>
                        <Text className='font-pRegular'>???: <Text className='font-pBold'>???</Text></Text>
                      </View>
                    </View>
                  ): null}
                  
              </TouchableOpacity>
              )
            }
          ))}   
          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default history
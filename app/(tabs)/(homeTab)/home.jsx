import { View, Text, SafeAreaView, TouchableOpacity, FlatList, useWindowDimensions, ScrollView, } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import QualityLevel from '../../../components/QualityLevel'
import RemixIcon from 'react-native-remix-icon'
import { router } from 'expo-router'
import { Image } from 'expo-image'
import Svg, { Circle } from 'react-native-svg';
import { useAQI } from '../../../context/AQIContext'
import Weather from '../../../components/Weather'

const Home = () => {
  const [quality, setQuality] = useState([])
  const [level, setLevel] = useState([])
  const [categoryPressed, setCategoryPressed] = useState(1);

  const { aqi, pm2_5, co, no2, aqiIC, aqiIL, timestamp} = useAQI();


  // const statuses = [
  //   {id: 1, label: 'C02', barLevel: level[0]?.co2Bar, ppmNum: level[0]?.co2PPM},
  //   {id: 2, label: 'C04', barLevel: level[1]?.co3Bar, ppmNum: level[1]?.co3PPM},
  //   {id: 3, label: 'C07', barLevel: level[2]?.co7Bar, ppmNum: level[2]?.co7PPM},
  // ]
  const statuses = [
       {id: 1, label: 'C02',},
       {id: 2, label: 'C04',},
       {id: 3, label: 'C07',},
       {id: 4, label: 'C02',},
       {id: 5, label: 'C04',},
       {id: 6, label: 'C07',},
  ]

  const renderStatuses = ({ item }) =>{
    return(
       <QualityLevel
          label={item.label}
       />
    )
 }
 const { width: windowWidth } = useWindowDimensions();

  const toggleCategory = (index) => {
    setCategoryPressed(index);
  }


  return (
    <SafeAreaView className="flex-1 p-4 bg-white" style={{gap: 12}}>
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
            <Text className='text-center font-pRegular text-[16px]'>Particulate Matter Statistics</Text>
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
              <Text className='font-pRegular text-[10px] text-gray-400'>Timestamp: {timestamp}</Text>
            </View>
          </View>
          <View className='h-[10%] flex-row justify-between items-center'>
            <View className='flex-row flex-1 items-center' style={{gap: 6}}>
              <Text className='font-pRegular text-[10px] text-pastel-black'>Risk Percentage:</Text>
              <View className={`h-2 w-2 rounded-full`} style={{backgroundColor: aqiIC}}></View>
              <Text className='font-pRegular text-[10px] text-pastel-black'>{aqiIL}</Text>
            </View>
            <TouchableOpacity className='bg-gray-100 px-3 w-32 h-8 items-center rounded-xl flex-row justify-between' onPress={() => router.push('statistics')} activeOpacity={0.5}>
              <Text className='font-pRegular text-[12px] text-pastel-black'>All Statistics</Text>
              <RemixIcon name='ri-arrow-right-up-line' size={16}></RemixIcon>
            </TouchableOpacity>
          </View>
        </View>

       
    
    </SafeAreaView>
  )
}

export default Home

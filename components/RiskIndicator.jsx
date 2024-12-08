import { View, Text } from 'react-native'
import React from 'react'
import { useAQI } from '../context/AQIContext';

const RiskIndicator = () => {
  const { aqi, pm2_5, co, no2, aqiIC, aqiIL, coIC, coIL, no2IC, no2IL, timestamp } = useAQI();

  // AQI
  if(aqi <= 50){
    aqiIC= '#DAF7A6';
    aqiIL= 'Very Low';
  }
  else if(aqi <= 100) {
    aqiIC= '#008000';
    aqiIL= 'Low';
  }
  else if(aqi <= 150) {
    aqiIC= '#FFC300';
    aqiIL= 'Moderate';
  }
  else if(aqi <= 200) {
    aqiIC= '#C70039';
    aqiIL= 'High';
  }
  else if(aqi <= 300) {
    aqiIC= '#900C3F';
    aqiIL= 'Very High';
  }
  else{
    aqiIC= '#581845';
    aqiIL= 'Extremely High';
  }

  // CO
  if(co <= 9){
    coIC= '#DAF7A6';
    coIL= 'Very Low';
  }
  else if(co <= 35) {
    coIC= '#008000';
    coIL= 'Low';
  }
  else if(co <= 50) {
    coIC= '#FFC300';
    coIL= 'Moderate';
  }
  else if(co <= 100) {
    coIC= '#C70039';
    coIL= 'High';
  }
  else if(co <= 200) {
    coIC= '#900C3F';
    coIL= 'Very High';
  }
  else{
    coIC= '#581845';
    coIL= 'Extremely High';
  }

  // NO2
  if(no2 <= 53){
    no2IC= '#DAF7A6';
    no2IL= 'Very Low';
  }
  else if(no2 <= 100) {
    no2IC= '#008000';
    no2IL= 'Low';
  }
  else if(no2 <= 200) {
    no2IC= '#FFC300';
    no2IL= 'Moderate';
  }
  else if(no2 <= 300) {
    no2IC= '#C70039';
    no2IL= 'High';
  }
  else if(no2 <= 400) {
    no2IC= '#900C3F';
    no2IL= 'Very High';
  }
  else{
    no2IC= '#581845';
    no2IL= 'Extremely High';
  }

  return (
    <View className='flex-row flex-1 items-center' style={{gap: 6}}>
      <Text className='font-pRegular text-[10px] text-pastel-black'>Risk Percentage:</Text>
        <View className={`h-2 w-2 rounded-full`} ></View>
      <Text className='font-pRegular text-[10px] text-pastel-black'></Text>
    </View>
  )
}

export default RiskIndicator
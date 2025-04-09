import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import CustomHeader from '../../../components/CustomHeader'
import { router } from 'expo-router'
import { scale } from 'react-native-size-matters'

const sAbout = () => {
  return (
    <View className='bg-gray-50 h-full w-full'>
      <CustomHeader title={'About'} showBack={true} onPressBack={() => router.push('sSettings')}/>
      
      <ScrollView contentContainerStyle={{padding: scale(15)}} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View className="bg-green-50 p-6 rounded-xl shadow-sm mb-6">
          <Text className="font-pBold text-green-800 text-center" style={{fontSize: scale(14)}}>Air Guard</Text>
          <Text className="text-green-800 mt-2 font-pRegular text-center" style={{fontSize: scale(10)}}>
            Helping you breathe healthier with real-time air quality data
          </Text>
        </View>

        {/* Features Section */}
        <View className="mb-6">
          <Text className="font-pBold text-gray-800 mb-3" style={{fontSize: scale(13)}}>Key Features</Text>
          
          <View className="bg-blue-100 rounded-xl p-4 shadow-sm mb-3">
            <Text className="font-pSemiBold text-blue-800" style={{fontSize: scale(13)}}>Real-Time Air Quality Monitoring</Text>
            <Text className="text-gray-700 mt-2 font-pRegular" style={{fontSize: scale(10)}}>
              Our **Air Quality Monitoring App** is designed to provide real-time data on indoor air conditions. Using advanced **ESP32** microcontrollers and **high-precision sensors** like the **MQ series and PMS5003**, the app delivers accurate air quality measurements, including **PM2.5, PM10, CO2, and other harmful pollutants**.
            </Text>
          </View>

          <View className="bg-blue-50 rounded-xl p-4 shadow-sm mb-3">
            <Text className="font-pSemiBold text-blue-800" style={{fontSize: scale(13)}}>Seamless Connectivity</Text>
            <Text className="text-gray-700 mt-2 font-pRegular" style={{fontSize: scale(10)}}>
              The system operates over **Wi-Fi**, ensuring a **continuous and reliable data stream** between the sensors and the mobile app. Users can monitor air quality from anywhere with an internet connection.
            </Text>
          </View>

          <View className="bg-blue-100 rounded-xl p-4 shadow-sm mb-3">
            <Text className="font-pSemiBold text-blue-800" style={{fontSize: scale(13)}}>Smart Alerts & Notifications</Text>
            <Text className="text-gray-700 mt-2 font-pRegular" style={{fontSize: scale(10)}}>
              The app integrates **Firebase Notifications** to alert users when air quality reaches unsafe levels, enabling them to take necessary actions to improve their environment.
            </Text>
          </View>

          <View className="bg-blue-50 rounded-xl p-4 shadow-sm mb-3">
            <Text className="font-pSemiBold text-blue-800" style={{fontSize: scale(13)}}>Cloud-Based Data Storage</Text>
            <Text className="text-gray-700 mt-2 font-pRegular" style={{fontSize: scale(10)}}>
              All air quality data is stored securely using **MongoDB**, allowing users to **track historical trends** and make informed decisions about their indoor environment.
            </Text>
          </View>

          <View className="bg-blue-100 rounded-xl p-4 shadow-sm mb-3">
            <Text className="font-pSemiBold text-blue-800" style={{fontSize: scale(13)}}>User-Friendly Interface</Text>
            <Text className="text-gray-700 mt-2 font-pRegular" style={{fontSize: scale(10)}}>
              Designed with **React Native & Expo**, the app offers a sleek and intuitive user experience, making it easy for anyone to understand air quality data at a glance.
            </Text>
          </View>
        </View>

        {/* Benefits Section */}
        <View className="mb-6">
          <Text className="font-pBold text-gray-800 mb-3" style={{fontSize: scale(13)}}>Why Use This App?</Text>
          
          <View className="bg-green-50 rounded-xl p-4 shadow-sm">
            <View className="mb-2">
              <Text className="text-green-700 font-pRegular" style={{fontSize: scale(10)}}>🏠 **Monitor indoor air quality** for healthier living</Text>
            </View>
            
            <View className="mb-2">
              <Text className="text-green-700 font-pRegular" style={{fontSize: scale(10)}}>📊 **Monitor trends** with historical data tracking</Text>
            </View>
            
            <View className="mb-2">
              <Text className="text-green-700 font-pRegular" style={{fontSize: scale(10)}}>🚀 **Get real-time updates** with seamless connectivity</Text>
            </View>
            
            <View className="mb-2">
              <Text className="text-green-700 font-pRegular" style={{fontSize: scale(10)}}>🔔 **Receive instant alerts** for unsafe air conditions</Text>
            </View>
            
            <View>
              <Text className="text-green-700 font-pRegular" style={{fontSize: scale(10)}}>☁️ **Access cloud-stored data** anytime, anywhere</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <Text className="text-gray-400 font-pRegular text-center mt-6 mb-10" style={{fontSize: scale(10)}}>
          Breathe better, live healthier with our real-time monitoring
        </Text>
      </ScrollView>
    </View>
  )
}

export default sAbout
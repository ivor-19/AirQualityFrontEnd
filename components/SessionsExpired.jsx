import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import { router } from 'expo-router'
import { useAuth } from '../context/AuthContext'
import { useAQI } from '../context/AQIContext'

const SessionsExpired = () => {
  const { logout } = useAuth();
  const { resetAQI } = useAQI();

  const toggleLogout = () => {
    logout();
    resetAQI();
  }

  return (
    <View className='absolute h-full w-full items-center justify-center z-10' style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
      <View className='w-[80%] bg-white rounded-[10px] p-4' style={{gap: scale(12)}}>
        <Text className='font-pRegular text-[12px]'>Session expired! Please login again.</Text>
        <TouchableOpacity
          className={`bg-pastel-black h-10 w-[100%] rounded-[10px] justify-center`}
          activeOpacity={0.8}
          onPress={toggleLogout}
        >
          <Text className='text-center font-pRegular text-white text-[12px]'>Go to Login Page</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SessionsExpired
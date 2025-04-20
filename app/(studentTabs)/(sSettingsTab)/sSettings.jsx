import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { scale } from 'react-native-size-matters'
import { router } from 'expo-router'
import { useAuth } from '../../../context/AuthContext'
import SettingsControl from '../../../components/SettingsControl'
import CustomHeader from '../../../components/CustomHeader'
import Modal from "react-native-modal"

const StudentSettings = () => {
  const { user, logout } = useAuth()
  const [showLogout, setShowLogout] = useState(false)

  const avatarMap = {
    koala: require('../../../assets/user-avatars/koala.png'),
    beaver: require('../../../assets/user-avatars/beaver.png'),
    dog: require('../../../assets/user-avatars/dog.png'),
    kangaroo: require('../../../assets/user-avatars/kangaroo.png'),
    platypus: require('../../../assets/user-avatars/platypus.png'),
    lemur: require('../../../assets/user-avatars/lemur.png')
  }

  const avatar = avatarMap[user?.avatarPath || 'lemur'] || avatarMap.lemur;

  const toggleLogout = () => {
    logout()
    setShowLogout(false)
  }

  return (
    <View className='flex-1 bg-white'>
      <CustomHeader title={'Settings'}/>
      
      <View className='px-4 w-full bg-white border-b-[1px] border-gray-100 flex-row items-center justify-between' 
        style={{gap: scale(24), height: scale(120)}}>
        <Image 
          source={avatar} 
          contentFit='contain' 
          className='rounded-full' 
          style={{height: scale(100), width: scale(100)}}
        />
        <View className='h-full w-full py-4'>
          <View className='flex-1 justify-center'>
            <Text className='font-pSemiBold text-pastel-black'>{user.username}</Text>
            <Text className='font-pRegular text-gray-400' style={{fontSize: scale(8)}}>
              {user.account_id}
            </Text>
          </View>
          <TouchableOpacity 
            className='bg-pastel-black px-4 py-2 rounded-[10px] item' 
            activeOpacity={0.7} 
            onPress={() => router.push('sProfile')} 
            style={{width: scale(120)}}
          >
            <Text className='font-pRegular text-white text-[10px] text-center'>Go to Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <SettingsControl 
        title={'User Guide and Tutorial'} 
        icon={'ri-guide-line'} 
        onPress={() => router.push("sUsersManual")}
      />
      <SettingsControl 
        title={'About this app'} 
        icon={'ri-question-line'} 
        onPress={() => router.push("sAbout")}
      />
      <SettingsControl 
        title={'Report an Issue'} 
        icon={'ri-alarm-warning-line'} 
        onPress={() => router.push("sContactUs")}
      />
      <SettingsControl 
        title={'AQI Threshold and Pollutants Guide'} 
        icon={'ri-shield-check-line'} 
        onPress={() => router.push("sSafetyThreshold")}
      />
      <SettingsControl 
        title={'Log Out'} 
        icon={'ri-logout-circle-line'} 
        onPress={() => setShowLogout(true)}
      />
      
      <Text className='font-pRegular text-gray-400 text-[10px] text-center'>v7.5.0</Text>

      <Modal isVisible={showLogout} animationIn="fadeIn" animationOut="fadeOut">
        <View className='absolute h-full w-full items-center justify-center z-50' 
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <View className='w-[80%] bg-white rounded-[10px] p-4' style={{gap: 10}}>
            <Text className='font-pSemiBold' style={{fontSize: scale(14)}}>Logout?</Text>
            <Text className='font-pRegular' style={{fontSize: scale(10)}}>
              Are you sure you want to logout?
            </Text>
            <View className='flex-row justify-between mt-4'>
              <TouchableOpacity 
                onPress={() => setShowLogout(false)} 
                className='bg-gray-100 w-[45%] h-10 rounded-[10px] justify-center' 
                activeOpacity={0.6}
              >
                <Text className='text-center font-pRegular text-black text-[12px]'>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={toggleLogout} 
                className='bg-pastel-black w-[45%] h-10 rounded-[10px] justify-center' 
                activeOpacity={0.6}
              >
                <Text className='text-center font-pRegular text-white text-[12px]'>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default StudentSettings
import { View, Text, TouchableOpacity, Platform, Linking, Alert} from 'react-native'
import React from 'react'
// import { LinearGradient } from 'expo-linear-gradient'
import RemixIcon from 'react-native-remix-icon'

const settings = () => {
  const openWifiSettings = () => {
    if(Platform.OS === 'ios'){
      Linking.openSettings().catch(() => {
        Alert.alert('Error', 'Unable to open settings')
      })
    }
    else if(Platform.OS === 'android'){
      Linking.openSettings().catch(() => {
        Alert.alert('Error', 'Unable to open settings')
      })
    }
  }

  return (
    <View className='flex-1'>
      <TouchableOpacity activeOpacity={0.6}>
        <View className='px-4 w-full bg-white h-16 border-b-[1px] border-gray-100 flex-row items-center justify-between'>
          <Text className='font-pRegular text-pastel-black'>User Guide and Tutorial</Text>
          <RemixIcon name='ri-arrow-drop-right-line' size={30} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.6}>
        <View className='px-4 w-full bg-white h-16 border-b-[1px] border-gray-100 flex-row items-center justify-between'>
          <Text className='font-pRegular text-pastel-black'>About this app</Text>
          <RemixIcon name='ri-arrow-drop-right-line' size={30} color='#1d1c1a'/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.6}>
        <View className='px-4 w-full bg-white h-16 border-b-[1px] border-gray-100 flex-row items-center justify-between'>
          <Text className='font-pRegular text-pastel-black'>Legal & Policies</Text>
          <RemixIcon name='ri-arrow-drop-right-line' size={30} color='#1d1c1a'/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.6}>
        <View className='px-4 w-full bg-white h-16 border-b-[1px] border-gray-100 flex-row items-center justify-between'>
          <Text className='font-pRegular text-pastel-black'>Contact Us</Text>
          <RemixIcon name='ri-arrow-drop-right-line' size={30} color='#1d1c1a'/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.6} onPress={openWifiSettings}>
        <View className='px-4 w-full bg-white h-16 border-b-[1px] border-gray-100 flex-row items-center justify-between'>
          <Text className='font-pRegular text-pastel-black'>Connected</Text>
          <RemixIcon name='ri-arrow-drop-right-line' size={30} color='#1d1c1a'/>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default settings

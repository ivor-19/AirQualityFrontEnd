import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import RemixIcon from 'react-native-remix-icon'
import { scale } from 'react-native-size-matters'

const SettingsControl = ({onPress, title, icon}) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
        <View className='px-4 w-full bg-white border-b-[1px] border-gray-100 flex-row items-center justify-between' style={{height: scale(54)}}>
            <View className='flex-row items-center justify-center' style={{gap: scale(12)}}>
                <RemixIcon name={icon}></RemixIcon>
                <Text className='font-pRegular text-pastel-black'>{title}</Text>
            </View>
            <RemixIcon name='ri-arrow-drop-right-line' size={30} />
        </View>
    </TouchableOpacity>
  )
}

export default SettingsControl
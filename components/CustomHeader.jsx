import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import RemixIcon from 'react-native-remix-icon'
import { scale } from 'react-native-size-matters'

const CustomHeader = ({title, onPressBack, showBack}) => {
  return (
    <View className='items-center relative border-b-[1px] border-gray-100 px-4 bg-white flex-row' style={{gap: scale(6),height: scale(56), shadowColor: 'gray', elevation: 8}}>
        {showBack && (
          <TouchableOpacity onPress={onPressBack}>
            <RemixIcon name='ri-arrow-drop-left-line' size={scale(36)}></RemixIcon>
          </TouchableOpacity>
        )}
        <Text className='text-left font-pBold text-[20px] text-pastel-black'>{title}</Text>
    </View>
  )
}

export default CustomHeader
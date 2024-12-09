import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import RemixIcon from 'react-native-remix-icon'
import { scale } from 'react-native-size-matters'

const CustomHeader = ({title, onPressBack, showBack}) => {
  return (
    <View className='items-center justify-center border-b-[1px] border-gray-100 relative px-4 bg-white flex-row ' style={{height: scale(56)}}>
      {showBack && (
        <TouchableOpacity onPress={onPressBack} className='absolute left-0'>
          <RemixIcon name='ri-arrow-drop-left-line' size={scale(36)}></RemixIcon>
        </TouchableOpacity>
      )}
      <Text className='text-left font-pBold text-[20px] text-pastel-black'>{title}</Text>
    </View>
  )
}

export default CustomHeader
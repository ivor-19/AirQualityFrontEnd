import { View, Text, TouchableHighlight, TouchableOpacity } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'

const CustomButton = ({ title, customButtomStyle, onPress, customTitleStyle}) => {
  return (
    <TouchableOpacity
        className={`px-4 rounded-[20px] items-center justify-center bg-pastel-green ${customButtomStyle}`}
        activeOpacity={0.8}
        onPress={onPress}
        style={{height: scale(48), shadowColor: 'gray', elevation: 4}}
    >
      <Text className={`text-center font-pSemiBold text-pastel-black ${customTitleStyle}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton
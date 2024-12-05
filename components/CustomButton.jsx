import { View, Text, TouchableHighlight, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({ title, customButtomStyle, onPress, customTitleStyle}) => {
  return (
    <TouchableOpacity
        className={`h-14 px-4 rounded-[20px] items-center justify-center bg-pastel-green ${customButtomStyle}`}
        activeOpacity={0.8}
        onPress={onPress}
        style={{shadowColor: 'gray', elevation: 4}}
    >
      <Text className={`text-center font-pSemiBold text-pastel-black ${customTitleStyle}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton
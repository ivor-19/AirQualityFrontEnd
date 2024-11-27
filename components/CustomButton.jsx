import { View, Text, TouchableHighlight, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({ title, customButtomStyle, onPress, customTitleStyle}) => {
  return (
    <TouchableOpacity
        className={`h-14 px-4 rounded-[20px] items-center justify-center ${customButtomStyle}`}
        activeOpacity={0.8}
        onPress={onPress}
    >
      <Text className={`text-center font-pSemiBold ${customTitleStyle}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import RemixIcon from 'react-native-remix-icon'

const CustomCat = ({customStyle, icon, onPress, isPressed}) => {
  return (
    <TouchableOpacity 
      className={`w-10 h-10 rounded-xl items-center justify-center ${customStyle}`} 
      activeOpacity={0.7} 
      style={{backgroundColor: isPressed ? '#4a2bf6' : '#fff', shadowColor: "black", shadowOffset: {width: 0, height: 0,}, shadowOpacity: 0.8, shadowRadius: 0, elevation: 3,}}
      onPress={onPress}
      >
      
      <RemixIcon size={20} name={icon} color={isPressed ? 'white' : '#4a2bf6'}/>
    </TouchableOpacity>
  )
}

export default CustomCat
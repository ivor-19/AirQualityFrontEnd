import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import RemixIcon from 'react-native-remix-icon'
import { scale } from 'react-native-size-matters';

const CustomFormField = ({title, placeholder, onChangeText, value, textAlign, containerStyle, customTextStyle, validationMessage, isInvalid, isEditable, showEditButton, toggleEdit }) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(prevState => !prevState);
    }
    
    return (
        <View className='w-full'>
            <View className='w-full flex-row justify-between'>
                <Text className={`font-pRegular text-left`} style={{fontSize: scale(11)}}>{title}</Text>
                {isInvalid && 
                    <Text className={`font-pRegular text-right text-[10px] text-red-400`} style={{fontSize: scale(8)}}>{validationMessage}</Text>
                }
            </View>
            <View className={`
                bg-white border-[1px] 
                border-gray-300 
                  rounded-[12px]    
                  px-2 
                  flex-row 
                  items-center 
                  ${containerStyle} 
                  focus:border-2
                `} 
                style={{height: scale(40)}}>
                <TextInput 
                    className={`${(title === 'Password' || title === 'Confirm Password' || showEditButton === true)  ? 'w-[90%]' : 'w-full'} h-full flex-row font-pRegular
                                
                             `}
                    placeholder={placeholder}
                    placeholderTextColor={'gray'}
                    onChangeText={onChangeText}
                    value={value}
                    textAlign={textAlign}
                    secureTextEntry={(title === 'Password' || title === 'Confirm Password') && !showPassword}
                    autoCapitalize='none'
                    editable={isEditable}
                >

                </TextInput>
                {(title === 'Password' || title === 'Confirm Password') &&
                    <TouchableOpacity activeOpacity={0.6} onPress={toggleShowPassword} className='w-[10%] items-center justify-center h-full z-10'>
                        <RemixIcon name={showPassword ? 'ri-eye-fill' : 'ri-eye-off-fill'} color='gray' size={18}></RemixIcon>
                    </TouchableOpacity>
                }
                {showEditButton &&
                    <TouchableOpacity activeOpacity={0.6} onPress={toggleEdit} className='w-[10%] items-center justify-center h-full z-10'>
                        <RemixIcon name='ri-pencil-fill' color='gray' size={18}></RemixIcon>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

export default CustomFormField
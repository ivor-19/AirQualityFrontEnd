import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import RemixIcon from 'react-native-remix-icon'

const CustomFormField = ({title, placeholder, onChangeText, value, textAlign, containerStyle, customTextStyle, validationMessage, isInvalid }) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(prevState => !prevState);
    }
    
    return (
        <View className='w-full'>
            <View className='w-full flex-row justify-between'>
                <Text className={`font-pRegular text-left`}>{title}</Text>
                {isInvalid && 
                    <Text className={`font-pRegular text-right text-[10px] text-red-400`}>{validationMessage}</Text>
                }
            </View>
            <View className={`bg-white border-[1px] border-gray-300 rounded-[12px] h-12 px-2 flex-row items-center ${containerStyle} focus:border-2`}>
                <TextInput 
                    className={`${(title === 'Password' || title === 'Confirm Password')  ? 'w-[90%]' : 'w-full'} h-full flex-row font-pRegular`}
                    placeholder={placeholder}
                    placeholderTextColor={'gray'}
                    onChangeText={onChangeText}
                    value={value}
                    textAlign={textAlign}
                    secureTextEntry={(title === 'Password' || title === 'Confirm Password') && !showPassword}
                    autoCapitalize='none'
                >

                </TextInput>
                {(title === 'Password' || title === 'Confirm Password') &&
                    <TouchableOpacity activeOpacity={0.6} onPress={toggleShowPassword}>
                        <RemixIcon name={showPassword ? 'ri-eye-fill' : 'ri-eye-off-fill'} color='gray' size={18}></RemixIcon>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

export default CustomFormField
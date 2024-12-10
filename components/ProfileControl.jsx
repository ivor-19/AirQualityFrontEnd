import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import RemixIcon from 'react-native-remix-icon'

const ProfileControl = ({onPress, title, username, email}) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
        <View className='w-full bg-white border-y-[1px] border-gray-100 flex-row items-center justify-between' style={{height: scale(80)}}>
            <View className='justify-center'>
                <Text className='font-pSemiBold text-pastel-black'>{title}</Text>
                {title === 'Edit Profile' ? (
                  <View>
                    <Text className='font-pRegular text-gray-400' style={{fontSize: scale(10)}}>{username}</Text>
                    <Text className='font-pRegular text-gray-400' style={{fontSize: scale(10)}}>{email}</Text>
                  </View>
                ):null}
            </View>
            <RemixIcon name='ri-arrow-drop-right-line' size={30} />
        </View>
    </TouchableOpacity>
  )
}

export default ProfileControl
import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { scale } from 'react-native-size-matters'
import RemixIcon from 'react-native-remix-icon'
import CustomFormField from './CustomFormField'

const ProfileControl = ({onPress, title, username, email}) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(prevState => !prevState);
  }

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={toggleOpen} className='border-y-[1px] border-gray-100'>
      <View className='w-full bg-white flex-row items-center justify-between py-4'>
          <View className='justify-center'>
              <Text className='font-pSemiBold text-pastel-black'>{title}</Text>
              {title === 'Edit Profile' &&
                <View>
                  <Text className='font-pRegular text-gray-400' style={{ fontSize: scale(10) }}>{username}</Text>
                  <Text className='font-pRegular text-gray-400' style={{ fontSize: scale(10) }}>{email}</Text>
                </View>
              }
          </View>
          <RemixIcon name={title === 'Change Password' ? `ri-arrow-drop-down-line`: `ri-arrow-drop-right-line`} size={30} />
         
      </View>
      <View>
        {open && (
          <>
            {title === 'Change Password' ? (
              <View className='pb-4 flex-col' style={{gap: 10}}>
                <CustomFormField title={'Password'} />
                <CustomFormField title={'Confirm Password'} />
              </View>
            ) : null}
          </>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default ProfileControl
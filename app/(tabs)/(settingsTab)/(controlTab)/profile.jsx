import { View, Text, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import CustomHeader from '../../../../components/CustomHeader'
import { router } from 'expo-router'
import { scale } from 'react-native-size-matters'
import CustomFormField from '../../../../components/CustomFormField'
import CustomButton from '../../../../components/CustomButton'
import { Image } from 'expo-image'
import { useAuth } from '../../../../context/AuthContext'
import RemixIcon from 'react-native-remix-icon'

const Profile = () => {
  const { user } = useAuth();
  const [editable, setEditable] = useState(false); // Fixed here
  const [usenameInvalid, isUsernameInvalid] = useState(false);
  const [emailInvalid, isEmailInvalid] = useState(false);

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const toggleCancel = () => {
    setEditable(false);
    setUsername(user.username);
    setEmail(user.email);
  }

  return (
    <KeyboardAvoidingView className='flex-1' behavior='height'> 
      <View className='bg-white h-full w-full'>
        <CustomHeader title={'Profile'} showBack={true} onPressBack={() => router.push('settings')}/>
        <ScrollView>
          <View className='flex-1 p-4 items-center'>
            <View className='items-center justify-center w-full' style={{height: scale('120')}}>
              <Image 
                source={require('../../../../assets/images/sukuna.jpg')} 
                contentFit='contain' 
                className='rounded-full'
                style={{height: scale(120), width: scale(120)}}
              />
            </View>
            <View className='flex-1 w-full py-4 px-2' style={{gap: scale(20)}}>
              <Text className='font-pSemiBold text-[16px]'>Profile Information</Text>
              <View style={{gap: scale(12)}}>  
                <View className='w-full'>
                  <View className='w-full flex-row justify-between'>
                      <Text className={`font-pRegular text-left`}>Username</Text>
                      {usenameInvalid ? (
                        <Text className={`font-pRegular text-right text-[10px] text-red-400`}>Username is already taken</Text>
                      ):null}
                  </View>
                  <View className={`${editable ? 'bg-white' : 'bg-gray-200'} border-[1px] border-gray-300 rounded-[12px] h-12 px-2 flex-row items-center focus:border-2`}>
                      <TextInput 
                          className={`w-[90%]  h-full flex-row font-pRegular`}
                          placeholder='Username'
                          placeholderTextColor={'gray'}
                          onChangeText={(text) => setUsername(text)}
                          value={username}
                          autoCapitalize='none'
                          editable={editable}
                      >
                      </TextInput> 
                  </View>
                </View>
                <View className='w-full'>
                  <View className='w-full flex-row justify-between'>
                      <Text className={`font-pRegular text-left`}>Email</Text>
                      {emailInvalid ? (
                        <Text className={`font-pRegular text-right text-[10px] text-red-400`}>Email is already taken</Text>
                      ):null}
                  </View>
                  <View className={`${editable ? 'bg-white' : 'bg-gray-200'} border-[1px] border-gray-300 rounded-[12px] h-12 px-2 flex-row items-center focus:border-2`}>
                      <TextInput 
                          className={`w-[90%]  h-full flex-row font-pRegular`}
                          placeholder='Username'
                          placeholderTextColor={'gray'}
                          onChangeText={(text) => setEmail(text)}
                          value={email}
                          autoCapitalize='none'
                          editable={editable}
                      >
                      </TextInput> 
                  </View>
                </View>
              </View>
              <View className='w-full'>
                {editable ? (
                  <View className='w-full flex flex-row space-x-2' style={{gap: scale(6)}}>
                    <CustomButton 
                      customButtomStyle={'flex-1 bg-gray-200'} 
                      title={'Cancel'}
                      customTitleStyle={'text-black-pastel font-pRegular'}
                      onPress={() => toggleCancel()}
                    />
                    <CustomButton 
                      customButtomStyle={'flex-1 bg-pastel-black'} 
                      title={'Save'}
                      customTitleStyle={'text-white font-pRegular'}
                    />
                </View>
                ):(
                  <CustomButton 
                    customButtomStyle={'w-full bg-pastel-black'} 
                    title={'Edit'}
                    customTitleStyle={'text-white font-pRegular'}
                    onPress={() => setEditable(true)}
                  />
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView> 
  )
}

export default Profile

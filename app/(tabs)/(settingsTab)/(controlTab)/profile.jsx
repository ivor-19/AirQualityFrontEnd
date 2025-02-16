import { View, Text, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '../../../../components/CustomHeader'
import { router } from 'expo-router'
import { scale } from 'react-native-size-matters'
import CustomFormField from '../../../../components/CustomFormField'
import CustomButton from '../../../../components/CustomButton'
import { Image } from 'expo-image'
import { useAuth } from '../../../../context/AuthContext'
import RemixIcon from 'react-native-remix-icon'
import ProfileControl from '../../../../components/ProfileControl'
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import api from '../../../../utils/api'

const Profile = () => {
  const { user } = useAuth();
  const [editable, setEditable] = useState(true); // Fixed here
  const [open, setOpen] = useState(false);

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const [password, setPassword]= useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordNotMatch, setPasswordNotMatch] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading ] = useState(false);

  const toggleOpen = () => {
    setOpen(prevState => !prevState);
  }

  const toggleChangePassword = async () => {
    if(password === confirmPassword){
      setLoading(true);
      setEditable(false);
      try{
        await api.post(`/users/editUser/${user._id}`, {password: confirmPassword})
        setTimeout(() => {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Your password has been successfully updated!',
            textBody: `Please ensure you keep it secure. If you didn't make this change, please contact support immediately.`,
            autoClose: 4000,
            closeOnOverlayTap: true,
          })
          setLoading(false);
          setOpen(false);
          setPassword('');
          setConfirmPassword('');
          setEditable(true);
        }, 4000);
        
      }
      catch (error){
        console.error('Error changing password', error);
      }
    }
    else{
      setPasswordNotMatch(true);
    }
  }

  useEffect(() => {
    if(password.trim().length >= 5 ){
      setShowConfirm(true);
    }
    else{
      setShowConfirm(false);
    }
  },[password])

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
              <View className='rounded-full bg-[#00000070] absolute items-center justify-center' style={{height: scale(120), width: scale(120)}} activeOpacity={0.8}>
                <TouchableOpacity className='items-center justify-center h-[50%] w-[50%] rounded-full' activeOpacity={0.6}>
                  <Image source={require('../../../../assets/icons/camera.png')} style={{height: scale(30), width: scale(30)}}></Image>
                </TouchableOpacity>
              </View>
            </View>
           <View className='flex-1 w-full py-4 px-2' style={{gap: scale(10)}}>
              <Text className='font-pSemiBold text-[16px]'>Profile Information</Text>
              <View style={{gap: scale(10)}}>
                <View>
                  <Text className='font-pRegular text-gray-400' style={{ fontSize: scale(10) }}>Username: {user.username}</Text>
                  <Text className='font-pRegular text-gray-400' style={{ fontSize: scale(10) }}>Student ID: {user.account_id}</Text> 
                </View>
                
                <TouchableOpacity className='w-full bg-white flex-row items-center justify-between py-4' activeOpacity={0.6} onPress={toggleOpen}>
                  <View className='justify-center'>
                      <Text className='font-pSemiBold text-pastel-black'>Change Password</Text>
                  </View>
                  <RemixIcon name={open === true ? 'ri-arrow-drop-up-line' : 'ri-arrow-drop-down-line'} size={30} />
                </TouchableOpacity>
                {open && 
                  <View className='pb-4' style={{gap: 10}}>
                    <View className='flex-col' style={{gap: 10}}>
                      <CustomFormField
                        title={'New Password'}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        validationMessage={'Password do not match'}
                        isEditable={editable}
                      />
                      <CustomFormField
                        title={'Confirm Password'}
                        value={confirmPassword}
                        onChangeText={(text) => {setConfirmPassword(text); setPasswordNotMatch(false)}}
                        containerStyle={passwordNotMatch === true ? 'border-2 border-red-300' : 'border-gray-300 focus:border-pastel-green-v2'}
                        validationMessage={'Password do not match'}
                        isInvalid={passwordNotMatch}
                        isEditable={editable}
                      />
                    </View>
                    <View className={`w-full items-end`}>
                      {loading ? (
                        <View className='w-full'>
                          <ActivityIndicator size="large" color="#000"/>
                        </View>
                      ):(
                        showConfirm &&
                          <TouchableOpacity className='bg-pastel-black px-4 py-2 rounded-[10px] items-center justify-center w-20' activeOpacity={0.7} onPress={toggleChangePassword}>
                            <Text className='font-pRegular text-white' style={{fontSize: scale(8)}}>Confirm</Text>
                          </TouchableOpacity>
                        
                      )}
                    </View>
                  </View>
                  }
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView> 
  )
}

export default Profile
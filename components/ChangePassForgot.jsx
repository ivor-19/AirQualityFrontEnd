import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Touchable } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { router } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

import { usePushNotifications } from "../usePushNotifications";
import * as Notifications from "expo-notifications";
import { scale } from 'react-native-size-matters';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});


const ChangePassForgot = ({id}) => {
    const { expoPushToken, notification, registerForPushNotifications } = usePushNotifications();
    
    useEffect(() => {
      registerForPushNotifications();
    }, []);
  
    useEffect(() => {
      if (expoPushToken) {
        console.log("Production Push Token:", expoPushToken);
        // Here you should send this token to your backend server
      }
    }, [expoPushToken]);


  const { user, renderUserData } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showModelAsset, setShowModelAsset] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [enableButton, setEnableButton] = useState(false);
  const [connected, isConnected] = useState(false);
  const [assetNotFound, isAssetNotFound] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const textInputRef = useRef(null);
  
  const toggleShow = () => {
    setShowModelAsset(prevState => !prevState);
    setEnableButton(false);
  }

  const handlePassword = (text) => {
    setPassword(text);
    if(text.trim().length >= 6){
      setEnableButton(true);
    }
    else{
      setEnableButton(false);
    }
  }

  
  const toggleUpdate = async () => {
    setLoading(true);
    if(password.trim() !== confirmPassword.trim()){ 
      setValidationMessage('Passwords do not match');
      setLoading(false);
      return;
    }
    
    try {
      const updateResponse = await api.post(`/users/editUser/${id}`, { 
        password: password,
      });
      console.log('User updated:', updateResponse);
      setLoading(false);
      setShowModelAsset(false);
    } catch(error) {
      console.error('Error updating', error);
      setValidationMessage('Failed to update password');
    } finally {
      setLoading(false); 
    }
  }
  return (
    <View className='absolute h-full w-full items-center justify-center z-10' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <View className='w-[80%] bg-white rounded-[10px] p-4 '>
        <View className="mb-4 bg-blue-50 p-3 rounded-lg">
          <Text className="font-pRegular text-blue-800" style={{fontSize: scale(10)}}>
            Create a new secure password. Make sure it's different from your previous one.
          </Text>
          <View className="mt-2 ml-2">
            <Text className="font-pRegular text-blue-800" style={{fontSize: scale(9)}}>• At least 6 characters</Text>
            <Text className="font-pRegular text-blue-800" style={{fontSize: scale(9)}}>• Not easily guessable</Text>
            <Text className="font-pRegular text-blue-800" style={{fontSize: scale(9)}}>• Avoid common passwords</Text>
          </View>
        </View>
        
        <View className='w-full bg-white items-center' style={{gap: 10}}>
          <View className='bg-gray-100 w-[100%] rounded-[10px] flex-row items-center'>
            <TextInput 
              ref={textInputRef}
              secureTextEntry
              className='bg-gray-100 flex-1 rounded-[10px] py-3 px-4 font-pRegular text-[12px]' 
              placeholder='Enter new password'
              onChangeText={(text) => handlePassword(text.trim())}
              maxLength={20}
              value={password}
              autoCapitalize='none'
            />
          </View>
          <View className='bg-gray-100 w-[100%] rounded-[10px] flex-row items-center'>
            <TextInput 
              ref={textInputRef}
              secureTextEntry
              className='bg-gray-100 flex-1 rounded-[10px] py-3 px-4 font-pRegular text-[12px]' 
              placeholder='Confirm password'
              onChangeText={(text) => setConfirmPassword(text.trim())}
              maxLength={20}
              value={confirmPassword}
              autoCapitalize='none'
            />
          </View>
          
          { loading ? (
            <ActivityIndicator size="large" color="#1d1c1a" />
          ) : (
            <TouchableOpacity
              className={`bg-pastel-black h-10 w-[100%] rounded-[10px] justify-center ${enableButton ? 'opacity-100' : 'opacity-70'}`}
              activeOpacity={0.8}
              disabled={!enableButton}
              onPress={toggleUpdate}
            >
              <Text className='text-center font-pRegular text-white' style={{fontSize: scale(10)}}>Reset Password</Text>
            </TouchableOpacity>
          )}
          
          {validationMessage && (
            <Text className='font-pRegular text-red-500' style={{fontSize: scale(8)}}>
              {validationMessage}
            </Text>
          )}
          
        </View>
      </View>
    </View>

  )
}

export default ChangePassForgot
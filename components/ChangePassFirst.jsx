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


const ChangePassFirst = () => {
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
    try{
      const updateResponse = await api.post(`/users/editUser/${user._id}`, { 
        password: password,
        asset_model: "modelx21", 
        first_access: "No",
      });
      console.log('User updated:', updateResponse);

      if (updateResponse.data) {
        const updatedUser = { ...user, password: password, asset_model: "modelx21", first_access: "No" };
        renderUserData(updatedUser);
        setLoading(false);
        // Step 5: Redirect to home page
        if(user.role === "Student"){
          router.replace('studentHome');
        }
        else if(user.role === "Admin"){
          router.replace('home');
        }
      } else {
        setLoading(false);
        console.log('Error: User was not updated');
      }
    }
    catch(error){
      console.error('Error updating', error)
    }
  }
  return (
    <View className='absolute h-full w-full items-center justify-center z-10' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <View className='w-[80%] bg-white rounded-[10px] p-4 '>
       <View className="mb-4 bg-blue-50 p-3 rounded-lg">
            <Text className="font-pRegular text-blue-800" style={{fontSize: scale(10)}}>
              For security reasons, you need to change your default password on first login. Your password should be:
            </Text>
            <View className="mt-2 ml-2">
              <Text className="font-pRegular text-blue-800" style={{fontSize: scale(9)}}>• Minimum 6 characters</Text>
              <Text className="font-pRegular text-blue-800" style={{fontSize: scale(9)}}>• Unique and not easily guessable</Text>
            </View>
          </View>
        <View className='w-full bg-white items-center' style={{gap: 10}}>
            <View className='bg-gray-100 w-[100%] rounded-[10px] flex-row items-center'>
              <TextInput 
                ref={textInputRef}
                secureTextEntry
                className='bg-gray-100 flex-1 rounded-[10px] py-3 px-4 font-pRegular text-[12px]' 
                placeholder='New password'
                onChangeText={(text) => handlePassword(text.trim())}
                maxLength={20}
                value={password}
                autoCapitalize='none'
              >
              </TextInput>
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
                <Text className='text-center font-pRegular text-white' style={{fontSize: scale(10)}}>Change Password</Text>
              </TouchableOpacity>
            )
            }
            <TouchableOpacity activeOpacity={0.6} onPress={() => {setPassword("@Student"), toggleUpdate()}}>
              <Text className='font-pRegular text-gray-400' style={{fontSize: scale(8)}}>skip for now</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>

  )
}

export default ChangePassFirst
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Touchable } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { router } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

import { usePushNotifications } from "../usePushNotifications";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});


const ConnectAsset = () => {
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
  const [assetName, setAssetName] = useState('');
  const [enableButton, setEnableButton] = useState(false);
  const [connected, isConnected] = useState(false);
  const [assetNotFound, isAssetNotFound] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const textInputRef = useRef(null);
  
  const toggleShow = () => {
    setShowModelAsset(prevState => !prevState);
    setEnableButton(false);
  }

  const handleAssetName = (text) => {
    setAssetName(text);
    if(text.trim().length >= 5){
      setEnableButton(true);
    }
    else{
      setEnableButton(false);
    }
  }

  const toggleConnect = async () => {
    setLoading(true);
    try {
      const response = await api.post('/assets/getAssetName', { assetName });
      if (response.data) {
        console.log('Asset is found');
        console.log(response.data);
  
        const updateResponse = await api.post(`/users/editUser/${user._id}`, { 
          asset_model: assetName, 
          first_access: "No",
          token_notif: expoPushToken.data
        });
        console.log('User updated:', updateResponse);
  
        if (updateResponse.data) {
          const updatedUser = { ...user, asset_model: assetName, first_access: "No" };
          renderUserData(updatedUser);
  
          isConnected(true);
          setLoading(false);
          isAssetNotFound(false);
          setEnableButton(false);
          textInputRef.current.blur();
  
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
      } else {
        isAssetNotFound(true);
        setValidationMessage("Can't find asset name");
        setLoading(false);
        isConnected(false);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || error.response.data.error;
        console.log(errorMessage);
        if (errorMessage === "Can't find asset name") {
          isAssetNotFound(true);
          setValidationMessage(errorMessage);
          setLoading(false);
          isConnected(false);
        }
      } else {
        console.error('Error updating user:', error);
        setLoading(false);
      }
    }
  };
  return (
    <View className='absolute h-full w-full items-center justify-center z-10' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <View className='w-[80%] bg-white rounded-[10px] p-4 '>
        <View className='w-full bg-white items-center' style={{gap: 10}}>
          <Text>ROle: {user.role}</Text>
          <View className="h-32 w-full items-center justify-center top-0 bottom-0 z-100">
            <Text className='font-bold'>Push Notification Demo</Text>
            <Text>Your push token:</Text>
            <Text className='bg-gray-400 text-[12px]'>{expoPushToken?.data || "No token yet"}</Text>
            {notification && (
              <View>
                <Text>Last Notification:</Text>
                <Text>
                  {JSON.stringify(notification.request.content, null, 2)}
                </Text>
              </View>
            )}
            
          </View>
          {assetNotFound ? (
              <View className='w-[100%]'>
                <Text className='text-right font-pRegular text-[10px] text-red-400'>{validationMessage}</Text>
              </View>
            ) : null}
            <View className='bg-gray-100 w-[100%] rounded-[10px] flex-row items-center'>
              <TextInput 
                ref={textInputRef}
                className='bg-gray-100 flex-1 rounded-[10px] py-3 px-4 font-pRegular text-[12px]' 
                placeholder='enter model asset name'
                onChangeText={(text) => handleAssetName(text.trim())}
                maxLength={20}
                value={assetName}
                autoCapitalize='none'
              >
              </TextInput>
              {connected ? (
                <Text className='font-pRegular text-[12px] text-gray-400 text-right px-4'>Connected</Text>
              ) : null}
            </View>
            
            
              { loading ? (
                <ActivityIndicator size="large" color="#1d1c1a" />
              ) : (
                <TouchableOpacity
                  className={`bg-pastel-black h-10 w-[100%] rounded-[10px] justify-center ${enableButton ? 'opacity-100' : 'opacity-70'}`}
                  activeOpacity={0.8}
                  disabled={!enableButton}
                  onPress={toggleConnect}
                >
                  <Text className='text-center font-pRegular text-white'>Pair</Text>
                </TouchableOpacity>
              )
              }
              <TouchableOpacity activeOpacity={0.6}>
                <Text className='font-pRegular text-gray-400 text-[10px]'>or pair using QR</Text>
              </TouchableOpacity>
        </View>
      </View>
    </View>

  )
}

export default ConnectAsset
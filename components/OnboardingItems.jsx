import { View, Text, TouchableOpacity, useWindowDimensions, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from './CustomButton';
import { router } from 'expo-router';

import { usePushNotifications } from "../usePushNotifications";
import * as Notifications from "expo-notifications";
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const OnboardingItems = ({customStyle, title, image, customImageStyle, description, showButton, setShowConnect}) => {
  const {width} = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const { user, renderUserData } = useAuth();

  const toggleConnect = () => {
    setShowConnect(true);
  }

  // Remove this if you want to require a user to input the model name at the start
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

  const toggleUpdate = async () => {
    setLoading(true);
    try{
      const updateResponse = await api.post(`/users/editUser/${user._id}`, { 
        asset_model: "modelx21", 
        first_access: "No",
        device_notif: expoPushToken.data
      });
      console.log('User updated:', updateResponse);

      if (updateResponse.data) {
        const updatedUser = { ...user, asset_model: "modelx21", first_access: "No" };
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
    <View className={`flex-1 bg-white items-center justify-center ${customStyle}`}>
      {loading &&
        <View className='h-full w-full absolute z-50 items-center justify-center' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <ActivityIndicator size="large" color="#4caf50" />
        </View>
      }
      <Image source={image} style={{width}} className={`flex-[0.5] ${customImageStyle}`}></Image>
      <View className={`flex-[0.3] w-80`} style={{gap: 20}}>
          <Text className='text-center text-pastel-black text-2xl font-semibold font-pBold'>{title}</Text>
          <Text className='text-center text-gray-500 font-pRegular'>{description}</Text> 
      </View>
      {showButton && (
        <CustomButton
          title={'Get started'}
          customButtomStyle={'bg-pastel-green w-[50%]'}
          customTitleStyle={'text-pastel-black'}
          onPress={toggleUpdate}
        />
      )}

    </View>
  )
}

export default OnboardingItems
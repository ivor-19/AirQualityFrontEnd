import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../../components/CustomButton'
import CustomFormField from '../../components/CustomFormField';
import { scale } from 'react-native-size-matters';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import * as SecureStore from 'expo-secure-store'; // Import SecureStore
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

import { usePushNotifications } from "../../usePushNotifications";
import * as Notifications from "expo-notifications";
import { useAQI } from '../../context/AQIContext';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const ForgotPasswordScreen = () => {
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
  
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [emailValidation, setEmailValidation] = useState('');
  const [enableButton, setEnableButton] = useState(false);
  
  useEffect(() => {
    registerForPushNotifications();
  }, []);

  useEffect(() => {
    setEnableButton(email.trim() !== '');
  }, [email]);

  const handleSend = async () => {
    try {
      setLoading(true);
      setEmailInvalid(false);
      setEmailValidation('');
      
      const response = await api.get(`/users/email/${email}`);
      
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: 'Email found! Redirecting...',
      });
      
      // router.push({ 
      //   pathname: 'resetPasswordScreen', 
      //   params: { email } 
      // });
      
    } catch (error) {
      let errorMessage = "An error occurred";
      
      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = error.response.data.message || "Email not found";
        }
      } else if (error.request) {
        errorMessage = "No response from server";
      } else {
        errorMessage = error.message || "Request failed";
      }
      
      setEmailValidation(errorMessage);
      setEmailInvalid(true);
      
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <AlertNotificationRoot>
      <SafeAreaView className='flex-1 bg-white'>
        {loading && (
          <View className='h-full w-full absolute z-50 items-center justify-center' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <ActivityIndicator size="large" color="#4caf50" />
          </View>
        )}
        
        <ScrollView>
          <Image 
            source={require('../../assets/background/drop3.png')} 
            className='absolute opacity-50' 
            style={{top: scale(-30), left: scale(0), height: scale(400), width: scale(400)}}
            contentFit='contain'
          />
          <Image 
            source={require('../../assets/background/drop4.png')} 
            className='absolute opacity-50' 
            style={{top: scale(400), height: scale(600), width: scale(600)}}
            contentFit='contain'
          />
          
          <View className='h-full w-full p-8 mt-16' style={{ gap: scale(16) }}> 
            <View className='mb-6 items-center'>
              <Text className='font-pBold text-pastel-black text-center' style={{fontSize: scale(18)}}>
                Forgot Password
              </Text>
            </View>
            
            <CustomFormField
              title={'Email'}
              value={email}
              onChangeText={(text) => {
                setEmail(text.trim());
                setEmailInvalid(false);
                setEmailValidation('');
              }}
              containerStyle={emailInvalid ? 'border-2 border-red-300' : 'border-gray-300 focus:border-pastel-green-v2'}
              validationMessage={emailValidation}
              isInvalid={emailInvalid}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <View className='w-full my-4' style={{gap: scale(20)}}>
              <TouchableOpacity
                className={`bg-pastel-green-v2 h-14 w-[100%] rounded-[10px] justify-center ${enableButton ? 'opacity-100' : 'opacity-40'}`}
                activeOpacity={0.8}
                disabled={!enableButton || loading}
                onPress={handleSend}
                style={{height: scale(48), shadowColor: 'gray', elevation: 4}}
              >
                <Text className='text-center font-pSemiBold text-pastel-black'>
                  {loading ? 'Sending...' : 'Send'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={() => router.back()}
                className='w-full flex-row justify-center'
              >
                <Text className='font-pRegular text-pastel-green-v2'>
                  Back to Login
                </Text>
              </TouchableOpacity>
              
              <Text className='font-pRegular text-gray-400 text-[10px] text-center'>
                Version 7.5.0
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </AlertNotificationRoot>
  );
};

export default ForgotPasswordScreen;
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

const loginScreen = () => {
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

  //----------------------------

  const [loading, setLoading] = useState(false);
  const [account_id, setAccountId] = useState('');
  const [password, setPassword] = useState('');
  const [accountInvalid, setAccountInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [accountValidation, setAccountValidation] = useState('');
  const [passwordValidation, setPasswordValidaion] = useState('');
  const [showBlock, setShowBlock] = useState(false);
  
  const { user, login, logout } = useAuth();
  const { resetAQI } = useAQI();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await api.post('/users/login', { account_id, password });
      if (response.data.token) {
        const { token, user } = response.data;
        login(token, user);
        console.log('Login successful, token:', token, user);
  
        // Ensure all values are strings before storing
        await SecureStore.setItemAsync('userToken', token);
        await SecureStore.setItemAsync('_id', user._id);
        await SecureStore.setItemAsync('account_id', user.account_id);
        await SecureStore.setItemAsync('username', user.username);
        await SecureStore.setItemAsync('email', user.email);
        await SecureStore.setItemAsync('role', user.role);
        await SecureStore.setItemAsync('status', user.status);
        await SecureStore.setItemAsync('asset_model', user.asset_model);
        await SecureStore.setItemAsync('first_access', user.first_access);
        await SecureStore.setItemAsync('device_notif', user.device_notif);

        const res = await api.post('/expoToken', {token_notif: expoPushToken.data})
        console.log(res.data);
  
        setLoading(false);
        if(user.status === "Block"){
          setShowBlock(true);
        }
        else{
          if(user.first_access === "Yes"){
            router.replace('onboarding');
          }
          else if(user.first_access === "No"){
            if(user.role === "Admin"){
              router.replace('home');
            }
            else{
              router.replace('studentHome');
            }
          }
        }
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || error.response.data.error;
        console.log(errorMessage);
        if (errorMessage === 'Student does not exists') {
          setAccountInvalid(true);
          setAccountValidation(errorMessage);
        } 
        else if(errorMessage === 'Invalid id or password'){
          setPasswordInvalid(true);
          setPasswordValidaion(errorMessage);
        }
      } else {
        console.error('Error logging account', error);
      }
    }
};
  const toggleLogout = () => {
    logout();
    resetAQI();
    setShowBlock(false);
  }

 
  return (
    <AlertNotificationRoot>
      <SafeAreaView className='flex-1 bg-white'>
        {loading &&
          <View className='h-full w-full absolute z-50 items-center justify-center' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <ActivityIndicator size="large" color="#4caf50" />
          </View>
        }
      <ScrollView>

        <Image source={require('../../assets/background/drop3.png')} className='absolute opacity-50' style={{top: scale(-30), left: scale(0), height: scale(400), width: scale(400)}} contentFit='contain'></Image>
        <Image source={require('../../assets/background/drop4.png')} className='absolute opacity-50' style={{top: scale(400), height: scale(600), width: scale(600)}} contentFit='contain'></Image>
          <View className='h-full w-full p-8 mt-16' style={{ gap: scale(16) }}> 
            <View className='mb-6 items-center'>
                <Image source={require('../../assets/icons/leaf.png')} className='h-10 w-10' contentFit='contain'></Image>
                <Text className='font-pBold text-pastel-black text-center' style={{fontSize: scale(26)}}>Welcome!</Text>
                <Text className='font-pRegular text-gray-500  text-center' style={{fontSize: scale(10)}}>
                    Please log in to access your account and enjoy all the features.
                </Text>
            </View>
            <CustomFormField
              title={'Student ID'}
              value={account_id}
              onChangeText={(text) => {setAccountId(text.trim()); setAccountInvalid(false)}}
              containerStyle={accountInvalid === true ? 'border-2 border-red-300' : 'border-gray-300 focus:border-pastel-green-v2'}
              validationMessage={accountValidation}
              isInvalid={accountInvalid}
            />
            <CustomFormField
              title={'Password'}
              value={password}
              onChangeText={(text) => {setPassword(text.trim()); setPasswordInvalid(false)}}
              containerStyle={passwordInvalid === true ? 'border-2 border-red-300' : 'border-gray-300 focus:border-pastel-green-v2'}
              validationMessage={passwordValidation}
              isInvalid={passwordInvalid}
            />
            <View className='w-full my-4' style={{gap: scale(20)}}>
                <CustomButton
                    title={'Log In'}
                    customButtomStyle={'w-full'}
                    onPress={handleLogin}
                />
                {/* <TouchableOpacity onPress={() => router.push('signUpScreen')} className='w-full flex-row justify-center items-center' style={{gap: 4}} activeOpacity={0.7}>
                    <Text className='font-pRegular text-gray-500' style={{fontSize: scale(10)}}>
                        Don't have an account?
                    </Text>
                    <View className='items-center justify-center'>
                        <Text className='font-pBold text-pastel-black' style={{fontSize: scale(10)}}> Sign Up</Text>
                    </View>
                </TouchableOpacity> */}
                <Text className='font-pRegular text-gray-400 text-[10px] text-center'>7.5.0</Text>
                <View className="h-32 w-full items-center justify-center top-0 bottom-0 z-100 hidden">
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
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
       {showBlock ? (
          <Modal isVisible={showBlock} animationIn="fadeIn" animationOut="fadeOut" useNativeDriver={true} deviceHeight={1} deviceWidth={1}>
            <View className='absolute h-full w-full items-center justify-center z-50' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
              <View className='w-[80%] bg-white rounded-[10px] p-4' style={{gap: 10}}>
                <Text className='font-pSemiBold text-[16px]'>Account Blocked!</Text>
                <Text className='font-pRegular text-[12px]'>Your account has been temporarily blocked due to suspicious activity. Please contact support for further assistance.</Text>
                <View className='flex-row justify-end mt-4'>
                  <TouchableOpacity onPress={toggleLogout} className='bg-pastel-black w-[45%] h-10 rounded-[10px] justify-center' activeOpacity={0.6}>
                    <Text className='text-center font-pRegular text-white text-[12px]'>Exit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
      ):null}
    </AlertNotificationRoot>
  )
}

export default loginScreen
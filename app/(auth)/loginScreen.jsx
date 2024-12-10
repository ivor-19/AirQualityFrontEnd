import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../../components/CustomButton'
import axios from 'axios';
import CustomFormField from '../../components/CustomFormField';
import { scale } from 'react-native-size-matters';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import * as SecureStore from 'expo-secure-store'; // Import SecureStore
import { useAuth } from '../../context/AuthContext';

const loginScreen = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [emailValidation, setEmailValidaion] = useState('');
  const [passwordValidation, setPasswordValidaion] = useState('');
  
  const { user, login } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://air-quality-back-end-v2.vercel.app/users/login', { email, password });
      if (response.data.token) {
        const { token, user } = response.data;
        login(token, user);
        console.log('Login successful, token:', token, user);
  
        // Serialize the data before storing it
        await SecureStore.setItemAsync('userToken', token);
        await SecureStore.setItemAsync('_id', user._id);
        await SecureStore.setItemAsync('username', user.username);
        await SecureStore.setItemAsync('email', user.email);
        await SecureStore.setItemAsync('asset_model', user.asset_model);
        await SecureStore.setItemAsync('first_access', user.first_access);
  
        setLoading(false);
        if(user.first_access === "Yes"){
          router.replace('onboarding');
        }
        else if(user.first_access === "No"){
          router.replace('home');
        }
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || error.response.data.error;
        console.log(errorMessage);
        if (errorMessage === 'Email does not exists') {
          setEmailInvalid(true);
          setEmailValidaion(errorMessage);
        } 
        else if(errorMessage === 'Invalid email or password'){
          setPasswordInvalid(true);
          setPasswordValidaion(errorMessage);
        }
      } else {
        console.error('Error creating account', error);
      }
    }
  };

 
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
              title={'Email'}
              value={email}
              onChangeText={(text) => {setEmail(text.trim()); setEmailInvalid(false)}}
              containerStyle={emailInvalid === true ? 'border-2 border-red-300' : 'border-gray-300 focus:border-pastel-green-v2'}
              validationMessage={emailValidation}
              isInvalid={emailInvalid}
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
                <TouchableOpacity onPress={() => router.push('signUpScreen')} className='w-full flex-row justify-center items-center' style={{gap: 4}} activeOpacity={0.7}>
                    <Text className='font-pRegular text-gray-500' style={{fontSize: scale(10)}}>
                        Don't have an account?
                    </Text>
                    <View className='items-center justify-center'>
                        <Text className='font-pBold text-pastel-black' style={{fontSize: scale(10)}}> Sign Up</Text>
                    </View>
                </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        {/* {success &&
          <View className='h-full w-full absolute z-50 items-center justify-center' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <View className='w-[80%] bg-white rounded-[10px] px-8 '>
                  <View className='my-5' style={{gap: 10}}>
                  <Text className='font-pRegular text-[12px]'>Login successful, welcome aboard!</Text>
                  </View>
              </View>
          </View>
        } */}
      </SafeAreaView>
    </AlertNotificationRoot>
  )
}

export default loginScreen
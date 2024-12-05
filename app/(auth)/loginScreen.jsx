import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../../components/CustomButton'
import axios from 'axios';
import CustomFormField from '../../components/CustomFormField';
import { scale } from 'react-native-size-matters';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import AsyncStorage from '@react-native-async-storage/async-storage';

const loginScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://air-quality-back-end-v2.vercel.app/api/users/login', { email, password });
      if (response.data.token) {
        const { token } = response.data;

        await AsyncStorage.setItem('userToken', token);  // Store token
  
        console.log('Login successful, token:', token);
        router.push('onboarding');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || error.response.data.error;
        console.log(errorMessage)
        if (errorMessage === 'Invalid email or password' || errorMessage === 'Invalid email or password') {
          setEmailInvalid(true);
          setPasswordInvalid(true);
        } 
      } else {
        console.error('Error creating account', error);
      }
    }
  };

 
  return (
    <SafeAreaView className='flex-1 bg-white'>
     <ScrollView>
      <Image source={require('../../assets/background/drop3.png')} className='absolute opacity-50' style={{top: scale(-30), left: scale(0), height: scale(400), width: scale(400)}} contentFit='contain'></Image>
      <Image source={require('../../assets/background/drop4.png')} className='absolute opacity-50' style={{top: scale(400), height: scale(600), width: scale(600)}} contentFit='contain'></Image>
        <View className='h-full w-full p-8 mt-20' style={{ gap: scale(16) }}> 
          <View className='mb-6'>
              <Text className='font-pBold text-pastel-black text-center' style={{fontSize: scale(26)}}>Welcome!</Text>
              <Text className='font-pRegular text-gray-500  text-center' style={{fontSize: scale(10)}}>
                  Please log in to access your account and enjoy all the features.
              </Text>
          </View>
          <CustomFormField
            title={'Email'}
            value={email}
            onChangeText={(text) => {setEmail(text); setEmailInvalid(false)}}
            containerStyle={emailInvalid === true ? 'border-2 border-red-300' : 'border-gray-300 focus:border-pastel-green-v2'}
            validationMessage={'Invalid email or password'}
            isInvalid={emailInvalid}
          />
          <CustomFormField
            title={'Password'}
            value={password}
            onChangeText={(text) => {setPassword(text); setPasswordInvalid(false)}}
            containerStyle={passwordInvalid === true ? 'border-2 border-red-300' : 'border-gray-300 focus:border-pastel-green-v2'}
            validationMessage={'Invalid email or password'}
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
    </SafeAreaView>
  )
}

export default loginScreen
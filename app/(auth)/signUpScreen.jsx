import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, ScrollView, Alert, Modal } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../../components/CustomButton'
import axios from 'axios';
import CustomFormField from '../../components/CustomFormField';
import { scale } from 'react-native-size-matters';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { ALERT_TYPE, AlertNotificationRoot, Dialog } from 'react-native-alert-notification';

const signUpScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [passwordNotMatch, setPasswordNotMatch] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [emailTaken, setEmailTaken] = useState(false);

  const toggleGoLogin = () => {
    router.push('loginScreen')
  }

  const handleSubmit = async () => {
    if(password === confirmPassword) {
      const newAccount = { username, email, password, asset_model: " ", first_access: "Yes" };
      setLoading(true);
      try {
        const response = await axios.post('https://air-quality-back-end-v2.vercel.app/users/signup', newAccount);
        console.log('Account Setup Complete', response.data);
        
        setUsername('');
        setEmail('');
        setPassword('');
        setLoading(false);
        setConfirmPassword('');

        setShowModal(true);
        setTimeout(() => {
         setShowModal(false);
         router.push('loginScreen')
        }, 5000); 
        
      } catch (error) {
        setLoading(false);
      
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message || error.response.data.error;
          console.log(errorMessage)
          if (errorMessage === 'Username is already taken.') {
            setUsernameTaken(true);
          } else if (errorMessage === 'Email is already taken.') {
            setEmailTaken(true);
          }
        } else {
          console.error('Error creating account', error);
        }
      }
    } else {
      console.log('Password do not match');
      setPasswordNotMatch(true);
    }
  };

  return (
     <KeyboardAvoidingView className='flex-1' behavior='height'> 
      {showModal && (
        <Modal visible={showModal} animationType="fade">
          <View className='absolute h-full w-full items-center justify-center z-10' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View className='w-[80%] bg-white rounded-[10px] p-4 ' style={{gap: scale(12)}}>
              <Text className='font-pRegular'>Login Success</Text>
              <CustomButton title={'Go to login'} onPress={() => {setShowModal(false); router.push('loginScreen')}}/>
            </View>
          </View>
        </Modal>
      )}
      {loading &&
        <View className='h-full w-full absolute z-50 items-center justify-center' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <ActivityIndicator size="large" color="#4caf50" />
        </View>
      }
      <SafeAreaView className='flex-1 bg-white'>
        <ScrollView>
        <Image source={require('../../assets/background/drop2.png')} className='absolute opacity-50' style={{top: scale(-20), left: scale(-90), height: scale(300), width: scale(300)}} contentFit='contain'></Image>
        <Image source={require('../../assets/background/drop1.png')} className='absolute opacity-50' style={{bottom: scale(-80), right: scale(-90), height: scale(300), width: scale(300)}} contentFit='contain'></Image>
        <View className='h-full w-full p-8 mt-10' style={{ gap: scale(16) }}> 
          <View className='mb-6 items-center'>
              <Image source={require('../../assets/icons/leaf.png')} className='h-10 w-10' contentFit='contain'></Image>
              <Text className='font-pBold text-pastel-black text-center' style={{fontSize: scale(26)}}>Create Your Account!</Text>
              <Text className='font-pRegular text-gray-500  text-center' style={{fontSize: scale(10)}}>
                  Sign up to detect air quality with Air Guard.
              </Text>
          </View>
          <CustomFormField
            title={'Username'}
            value={username}
            onChangeText={(text) => {setUsername(text.trim()); setUsernameTaken(false)}}
            containerStyle={usernameTaken === true ? 'border-2 border-red-300' : 'border-gray-300 focus:border-pastel-green-v2'}
            validationMessage={'Username is already taken'}
            isInvalid={usernameTaken}
          />
          
          <CustomFormField
            title={'Email'}
            value={email}
            onChangeText={(text) => {setEmail(text.trim()); setEmailTaken(false)}}
            containerStyle={emailTaken === true ? 'border-2 border-red-300' : 'border-gray-300 focus:border-pastel-green-v2'}
            validationMessage={'Email is already taken'}
            isInvalid={emailTaken}
          />
          
          <CustomFormField
            title={'Password'}
            value={password}
            onChangeText={(text) => setPassword(text)}
            validationMessage={'Password do not match'}
          />
          <CustomFormField
            title={'Confirm Password'}
            value={confirmPassword}
            onChangeText={(text) => {setConfirmPassword(text); setPasswordNotMatch(false)}}
            containerStyle={passwordNotMatch === true ? 'border-2 border-red-300' : 'border-gray-300 focus:border-pastel-green-v2'}
            validationMessage={'Password do not match'}
            isInvalid={passwordNotMatch}
          />
          
          <View className='w-full my-4' style={{gap: scale(20)}}>
              <CustomButton
                  title={'Sign Up'}
                  customButtomStyle={'w-full'}
                  onPress={handleSubmit}
              />
              <TouchableOpacity onPress={() => router.push('loginScreen')} className='w-full flex-row justify-center items-center' style={{gap: 4}} activeOpacity={0.7}>
                  <Text className='font-pRegular text-gray-500' style={{fontSize: scale(10)}}>
                      Already have an account?
                  </Text>
                  <View className='items-center justify-center'>
                      <Text className='font-pBold text-pastel-black' style={{fontSize: scale(10)}}> Sign In</Text>
                  </View>
              </TouchableOpacity>
          </View>    
        </View>
        </ScrollView>
      </SafeAreaView>
      {/* {success &&
        <View className='h-full w-full absolute z-50 items-center justify-center' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View className='w-[80%] bg-white rounded-[10px] px-8 '>
                <View className='my-5' style={{gap: 10}}>
                <Text className='font-pRegular text-[12px]'>Your account has been created successfully! Redirecting to Login page...</Text>
                </View>
            </View>
        </View>
      } */}
    </KeyboardAvoidingView>
  )
}

export default signUpScreen;

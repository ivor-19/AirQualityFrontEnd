import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../../../components/CustomButton'
import axios from 'axios';
import CustomFormField from '../../../components/CustomFormField';
import { Image } from 'expo-image';
import { scale } from 'react-native-size-matters';
import { router } from 'expo-router';
import ComingSoon from '../../../components/ComingSoon';

const about = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    const newAccount = { username, email, password };
    try {
      const response = await axios.post('https://air-quality-back-end-v2.vercel.app/users/signup', newAccount);
      console.log('Account Setup Complete', response.data);
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error creating account', error);
    }
  }
  return (
    <SafeAreaView className='h-full w-full'>
      <ComingSoon pageName={'About'}/>
    </SafeAreaView>
  )
}

export default about
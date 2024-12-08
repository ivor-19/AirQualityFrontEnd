import { View, Text, SafeAreaView, TextInput } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../../../components/CustomButton'
import axios from 'axios';
import CustomFormField from '../../../components/CustomFormField';
import { Image } from 'expo-image';
import { scale } from 'react-native-size-matters';

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
    <SafeAreaView className='flex-1'>
      <View className='h-full bg-white items-center w-full p-6 justify-center' style={{ gap: 20 }}>  
        {/* <CustomFormField
          title={'Username'}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <CustomFormField
          title={'Email'}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <CustomFormField
          title={'Password'}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <CustomButton
          title={'Sign Up'}
          customButtomStyle={'w-full'}
          onPress={handleSubmit}
        /> */}
      </View>
    </SafeAreaView>
  )
}

export default about
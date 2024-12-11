import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../../../components/CustomButton'
import axios from 'axios';
import CustomFormField from '../../../components/CustomFormField';
import { Image } from 'expo-image';
import { scale } from 'react-native-size-matters';
import { router } from 'expo-router';
import ComingSoon from '../../../components/ComingSoon';
import * as SMS from 'expo-sms';

const about = () => {
  // const [phoneNumber, setPhoneNumber] = useState();
  // const [message, setMessage] = useState();

  //email
  const [to, setTo] = useState('ivorcruz19@gmail.com');
  const [subject, setSubject] = useState('random sheeesh');
  const [message, setMessage] = useState('Message from post')

  const sendAlert = async () => {
    const emailData = { to, subject, message };

    try {
      const response = await axios.post('https://air-quality-back-end-v2.vercel.app/email/send', emailData);
      console.log('Send Message', response.data.message)
    } catch (error) {
      console.error('Error sending email', error)
    }
  }

  const sendSMS = async () => {
    const { result } = await SMS.sendSMSAsync('09663470157', 'Hello');
    if( result === 'sent'){
      console.log('sent message successfully');
    }
  }

  return (
    <SafeAreaView className='h-full w-full'>
      <CustomButton title={'Send EMAIL'} onPress={sendAlert}/>
    </SafeAreaView>
  )
}

export default about
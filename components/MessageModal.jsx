import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { scale } from 'react-native-size-matters'
import { TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../context/AuthContext'
import { useAQI } from '../context/AQIContext'
import axios from 'axios'
import RemixIcon from 'react-native-remix-icon';
import { router } from 'expo-router'

const MessageModal = ({onPressCancelSend, onPressConfirmSend}) => {
    const { user, renderUserData } = useAuth();
    const { aqi, pm2_5, co, no2, aqiIC, aqiIL, aqiCon, timestamp, date, scanned_by, setAqi, setPm2_5, setC0, setN02, setTimestamp, setDate, setScannedBy, setScannedUsingModel } = useAQI(); 
    const emails = [
        {id: 1, email: "ivorcruz19@gmail.com"},
        {id: 2, email: "zpt.pogi@gmail.com"},
    ]
    const [toEmail, setToEmail] = useState([]);
    const [toSubject, setToSubject] = useState('Alert')
    const [toMessage, setToMessage] = useState('Immediate notice: AQI index is too high. We highly recommend that students stay home.')
    const [qualityMessage, setQualityMessage] = useState('');

    const getCurrentDate = () => {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
      };
    
      const getCurrentTime = () => {
        const options = {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        };
        return new Date().toLocaleTimeString([], options);
      };
    
    useEffect(() => {
        const fetch = async () => {
            const currentDate = getCurrentDate();
            const currentTimestamp = getCurrentTime();
            setQualityMessage(
            `AQI: ${aqi}\nPM 2.5: ${pm2_5}\nCO: ${co}\nNO2: ${no2}\nTimestamp: ${currentTimestamp}\nDate: ${currentDate}\nRisk Percentage: ${aqiIL}\nCondition: ${aqiCon}`
            )
        
            // console.log(qualityMessage)
            const response = await axios.get('https://air-quality-back-end-v2.vercel.app/students/getEmails');
            const emails = response.data.emails;

            setToEmail(emails.map(item => item.email).join(','))
        }
        fetch();
    }, [])
        
    
    const sendAlert = async () => {
        try{
            const to = `${toEmail}`;
            const subject = `${toSubject}`;
            const message = `${toMessage}\n${qualityMessage}`;

            const emailData = { to, subject, message };

            console.log(emailData);
            try {
                onPressCancelSend();
                router.push('scanning');
                const response = await axios.post('https://air-quality-back-end-v2.vercel.app/email/send', emailData);
                console.log('Send Message', response.data.message);
                const responseReadings = await axios.get(`https://air-quality-back-end-v2.vercel.app/aqReadings/${user.asset_model}`);
                const data = responseReadings.data[0];
    
                console.log("API Response Data:", responseReadings.data);
                // const currentDate = getCurrentDate();
                // const currentTimestamp = getCurrentTime();
                const newHistoryData = {
                    date: date,
                    timestamp: timestamp,
                    aqi: aqi,
                    pm2_5: pm2_5,
                    co: co,
                    no2: no2,
                    scanned_by: user._id,
                    scanned_using_model: user.asset_model, 
                    message: message,
                };
                console.log('Saving data with model:', user.asset_model); // Debug log to confirm model
    
                await axios.post('https://air-quality-back-end-v2.vercel.app/history', newHistoryData);
                console.log('History data is saved:', newHistoryData);

            } catch (error) {
                console.error('Error sending email', error);
            }
            

        }
        catch (error){
            console.error('Error sending email', error);
        }
    };
  
  return (
    <View className='h-full w-full items-center justify-center z-50 absolute' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View className='w-[80%] bg-white rounded-[10px] px-8 '>
            <View className='my-5' style={{ gap: 10 }}>
                <Text className='font-pRegular text-[12px]'>
                    You are about to send a message
                </Text>
                {/* <TouchableOpacity className='flex-row items-center h-6' style={{ gap: 4 }} activeOpacity={0.6} onPress={toggleDontShow}>
                <RemixIcon name={dontShow ? 'ri-checkbox-fill' : 'ri-checkbox-blank-line'} size={16}></RemixIcon>
                <Text className='font-pRegular text-[10px]'>Don't show this message again</Text>
                </TouchableOpacity> */}
                <View className='w-full border-[1px] border-gray-200 rounded-[6px] flex-row items-center px-2 space-x-1 py-1'>
                <Text className='font-pRegular' style={{fontSize: scale(10)}}>To: </Text>
                <ScrollView horizontal={true}>
                    <View className='flex-row items-center h-full space-x-1'>
                    {/* {emails.map((email, index) => {
                        return(
                        <View key={index} className='bg-gray-100 rounded-custom px-1'>
                            <Text className='font-pRegular text-gray-400' style={{fontSize: scale(10)}}>{email.email}</Text>
                        </View>
                        )
                    })} */}
                    <Text className='font-pRegular text-gray-400' style={{fontSize: scale(10)}}>{toEmail}</Text>
                    </View>
                </ScrollView>
                </View>
                <View className='w-full border-[1px] border-gray-200 rounded-[6px] flex-row items-center px-2 space-x-1 py-1 overflow-hidden'>
                    <Text className='font-pRegular' style={{fontSize: scale(10)}}>Subject: </Text>
                    <View className='flex-row items-center space-x-1'>
                    <TextInput 
                        className='font-pRegular w-full' 
                        defaultValue={toSubject}
                        onChangeText={(text) => setToSubject(text)}
                        style={{fontSize: scale(10)}}></TextInput>
                    </View>
                </View>
                <View className='w-full border-[1px] border-gray-200 rounded-[6px]  px-2 space-x-1 py-1 overflow-hidden' style={{height: scale(160)}}>
                    <ScrollView>
                        <TextInput 
                            multiline={true} 
                            className='w-full font-pRegular' 
                            defaultValue={toMessage}
                            onChangeText={(text) => setToMessage(text)}
                            style={{fontSize: scale(10)}}></TextInput>
                        <Text className='text-gray-400 font-pRegular' style={{fontSize: scale(8)}}>{qualityMessage}</Text>
                    </ScrollView>
                </View>     
            </View>
            <View className='py-4 w-full items-end justify-center'>
                <View className='flex-row' style={{ gap: 10 }}>
                <TouchableOpacity onPress={onPressCancelSend} className='py-2 px-4' activeOpacity={0.6}>
                    <Text className='font-pRegular text-[10px]'>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={sendAlert} className='space-x-1 py-2 px-4 bg-pastel-black rounded-custom flex-row items-center justify-center' activeOpacity={0.6}>
                    <Text className='text-white font-pRegular text-[10px]'>Send</Text>
                    <RemixIcon name='ri-send-plane-fill' color='white' size={14}></RemixIcon>
                </TouchableOpacity>
                </View>
            </View>
        </View>
    </View>
  )
}

export default MessageModal
import { View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomHeader from '../../components/CustomHeader'
import { ScrollView } from '@motify/components'
import RemixIcon from 'react-native-remix-icon'
import CustomFormField from '../../components/CustomFormField'
import { scale } from 'react-native-size-matters'
import api from '../../utils/api'
import { useAuth } from '../../context/AuthContext'
import { Image } from 'expo-image'
import axios from 'axios'
import { useNotificationContext } from '../../context/NotificationContext'

const chatPage = () => {
  const { user } = useAuth();
  const { notifTokens, userNotifToken } = useNotificationContext();
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const scrollViewRef = useRef();
  const prevChatLengthRef = useRef(chat.length);
  const [loading, setLoading] = useState(true);
  const [disableButton, setDisableButton] = useState(false);

  const getCurrentTime = () => {
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return new Date().toLocaleTimeString([], options);
  };

  const getCurrentDate = () => {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const currentTime = getCurrentTime();
  const currentDate = getCurrentDate();

  useEffect(() => {
    if (chat.length > prevChatLengthRef.current) {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
    prevChatLengthRef.current = chat.length;
  }, [chat]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await api.get('/chat');
        setChat(response.data)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching chats', error);
        setLoading(false);
      }
    }
    fetchChats();
  },[chat])

  const handleSend = async () => {
    if (!message.trim()) {
      console.log('Message is empty, nothing to send');
      return; 
    }
    
    
    const newChat = { message, sender: user.username, role: user.role, timestamp: currentTime, date: currentDate};
    try {
      setDisableButton(true);
      const response = await api.post('/chat', newChat);
      console.log('Send success', response.data);
  
      const uniqueTokens = [...new Set(notifTokens)]; // filter the tokens if duplicate is found
      const tokensToSend = uniqueTokens.filter(token => token !== userNotifToken); // filter the token to not send a notification to themselves
  
      const notificationPromises = tokensToSend.map(token => 
        axios.post("https://exp.host/--/api/v2/push/send", {
          to: token,
          title: "Air Guard Chat",
          body: `${user.username}: ${message}`,
          sound: "default"
        })
      );
  
      // Wait for all notifications to be sent
      const responses = await Promise.all(notificationPromises);
      console.log("Notifications sent successfully", responses);
      setMessage('');
      setDisableButton(false);
      
      Keyboard.dismiss();
    } catch (error) {
      console.error('Error sending chat', error);
    }
  };
  


  return (
    <SafeAreaView className='h-full w-full bg-white'>
      <CustomHeader title={'Chat'}/>
      {loading ? (
         <View className='h-full items-center my-20'>
            <Image source={require('../../assets/animated/loading.gif')} className='h-[30%] w-[30%]'/>
            <Text className='font-pRegular text-gray-500 text-[12px]'>One moment, fetching the chats...</Text>
          </View>
      ) : chat.length === 0 ? (
          <View className='flex flex-col h-screen w-full justify-evenly'>
            <View className='items-center flex-grow-1' style={{gap: 12}}>
              <Image source={require('../../assets/images/oops_empty.png')} style={{height: scale(240), width: scale(240)}}/>
              <Text className='font-pRegular text-gray-500 text-[12px]'>Oops, chat is empty.</Text>
            </View>
            <View className='w-full h-20 p-4'>
              <View className='flex flex-row items-center' style={{gap: 6}}>
                <View className='bg-white border-[1px] flex-1 px-2 rounded-[12px] border-gray-300 focus-border-2'>
                  <TextInput 
                    className={` h-full flex-row font-pRegular w-full`}
                    placeholderTextColor={'gray'}
                    onChangeText={(text) => setMessage(text)}
                    value={message}
                    autoCapitalize='none'
                    
                  >
                  </TextInput>
                </View>
        
                <View className='w-[10%]'>
                  <TouchableOpacity onPress={handleSend}>
                    <RemixIcon name='ri-send-plane-2-fill'/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
      ) : (
        <>
        <ScrollView contentContainerStyle={{flexGrow: 1}} ref={scrollViewRef}>
          <View className='p-4 h-full w-full' style={{gap: 18}}>
            {/* content start */}
            {chat.map((data, index) => {
              return(
                <View className={`w-full flex flex-row ${data.sender === user.username ? 'flex-row-reverse justify-start' : ''}`} key={index}>
                  <View className={`w-[10%] justify-end pb-2`}>
                    <RemixIcon name='ri-account-circle-fill' size={28} color='blue'/>
                  </View>
                  <View className='max-w-[80%] flex-col' style={{gap: scale(4)}}>
                    <Text className={`font-pRegular text-[8px] text-gray-600 px-2 ${data.sender === user.username ? 'text-right' : 'text-left'}`}>
                      {data.sender === user.username ? 'You' : data.sender}{data.role === "Admin" ? ' - Admin' : ''} 
                    </Text>
                    <View className={`bg-white rounded-[18px] border-2 border-gray-100`} activeOpacity={0.7} style={{shadowColor: 'gray', elevation: 4}}>
                      <View className='p-3 flex-col items-center' style={{gap: 6}}>
                        <View className='w-full px-2'>
                          <Text className='text-pastel-black font-pRegular text-[12px]'>{data.message}</Text>
                        </View> 
                        <View className='w-full px-2  flex flex-row justify-between'>
                        
                          {/* <Text className='font-pRegular text-[8px] text-gray-600'>{data.date}</Text> */}
                        </View>
                      </View>
                    </View>
                    <Text className={`font-pRegular text-[8px] text-gray-600 px-2 ${data.sender === user.username ? 'text-right' : 'text-left'}`}>
                     {`${data.timestamp} - ${data.date}`}
                    </Text>              
                  </View>
                </View>      
              )
            })}
            </View>
        </ScrollView>
        <View className='w-full h-20 p-4'>
          <View className='flex flex-row items-center' style={{gap: 6}}>
            <View className='bg-white border-[1px] flex-1 px-2 rounded-[12px] border-gray-300 focus-border-2'>
              <TextInput 
                className={` h-full flex-row font-pRegular w-full`}
                placeholder='Type your message here...'
                placeholderTextColor={'gray'}
                onChangeText={(text) => setMessage(text)}
                value={message}
                autoCapitalize='none'     
              >
              </TextInput>
            </View>
    
            <View className='w-[10%]'>
              <TouchableOpacity onPress={handleSend} disabled={disableButton}>
                <RemixIcon name='ri-send-plane-2-fill'/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </>
      )}
    </SafeAreaView>
  )
}

export default chatPage
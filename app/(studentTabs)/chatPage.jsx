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

const chatPage = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const scrollViewRef = useRef();
  const prevChatLengthRef = useRef(chat.length);
  const [loading, setLoading] = useState(true);

  const [notifTokens, setNotifTokens] = useState([]);
  const [userNotifToken, setUserNotifToken] = useState("");

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/expoToken');
        const tokenList = response.data.tokens.map(item => item.token_notif);
        // const uniqueTokens = [...new Set(tokenList)];
        console.log("token list: ", tokenList)

        const getUserNotifToken = await api.get(`/users/${user._id}`);
        console.log("Notif Token: ", getUserNotifToken.data.user.token_notif);
        
        setNotifTokens(tokenList);
        setUserNotifToken(getUserNotifToken.data.user.token_notif);
      } catch (error) {
        console.error("Error getting notification token:", error);
      
      }
    };

    fetchData();
  }, []);

  const handleSend = async () => {
    //userNotifToken = "this is example because userNotifToken is the one should be compared"
    const newChat = {message, sender: user.username, role: user.role}
    try {
      const response = await api.post('/chat', newChat)
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
      Keyboard.dismiss();
    } catch (error) {
      console.error('Error sending chat', error)
    }
  }


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
                  <View className={`w-[10%] justify-end`}>
                    <RemixIcon name='ri-account-circle-fill' size={28} color='blue'/>
                  </View>
                  <View className={`bg-white rounded-custom border-2 border-gray-100 max-w-[80%]`} activeOpacity={0.7} style={{shadowColor: 'gray', elevation: 4}}>
                    <View className='rounded-custom p-4 flex-col items-center' style={{gap: 6}}>
                      <View className='w-full px-2'>
                        <Text className='text-pastel-black font-pRegular text-[12px]'>{data.message}</Text>
                      </View> 
                      <View className='w-full px-2  flex flex-row justify-between'>
                        <Text className='font-pRegular text-[8px] text-gray-600'>
                          {data.sender === user.username ? 'You' : data.sender}{data.role === "Admin" ? ' - Admin' : ''} 
                        </Text>
                        {/* <Text className='font-pRegular text-[8px] text-gray-600'>{data.date}</Text> */}
                      </View>
                    </View>
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
        </>
      )}
    </SafeAreaView>
  )
}

export default chatPage
import React, { useState, useEffect } from 'react';
import { Tabs } from 'expo-router';
import RemixIcon from 'react-native-remix-icon';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import NoInternetChecker from '../../components/NoInternetChecker';
import Modal from "react-native-modal";
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { darkThemeColors, lightThemeColors } from '../../utils/alertColorUtils';
import { useAQI } from '../../context/AQIContext';
import { useAuth } from '../../context/AuthContext';
import SessionsExpired from '../../components/SessionsExpired';
import api from '../../utils/api';
import { Text, TouchableOpacity, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const TabLayout = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [showSession, setShowSession] = useState(false);
  const navigation = useNavigation(); // Initialize navigation
  const { token, user, logout } = useAuth();
  const { resetAQI } = useAQI();
  const [showBlock, setShowBlock] = useState(false);
  const [deletedAccount, setDeletedAccount] = useState(false);


  useEffect(() => {
    setShowSession(false);
    console.log("Role: " , user.role)
    if(token === ''){
      console.log('No token was found. Session expired.')
      setShowSession(true);
    }
  }, [token]); 

  useEffect(() => {
    const resetModalOnFocus = navigation.addListener('focus', () => {
      // Reset modal when scanning tab is focused
      if (navigation.isFocused() && modalVisible) {
        setModalVisible(false); // Close the modal if scanning tab is focused
      }
    });

    return resetModalOnFocus; // Cleanup the listener when the component unmounts
  }, [navigation, modalVisible]);

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const response = await api.get(`/users/${user?._id}`);
        console.log("STATUS", response.data.user.status);
        if (response.data.user.status === "Blocked") {
          setShowBlock(true);
        }
      } catch (error) {
        console.log("Account is deleted");
        setDeletedAccount(true);
      }
    };

    const checkNetworkAndFetch = async () => {
      const state = await NetInfo.fetch();
      
      // Check if the device is connected via Wi-Fi or Cellular
      if (state.isConnected && (state.type === 'wifi' || state.type === 'cellular')) {
        await fetchUserStatus();
      } else {
        Alert.alert(
          "No Internet Connection",
          "Please connect to Wi-Fi or Cellular data to continue."
        );
      }
    };

    checkNetworkAndFetch();

    const interval = setInterval(() => {
      checkNetworkAndFetch();
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

  const toggleLogout = () => {
    logout();
    resetAQI();
    setShowBlock(false);
    setDeletedAccount(false);
  }

  return (
    <AlertNotificationRoot
      theme='light'
      colors={[lightThemeColors, darkThemeColors]}
    >
      <NoInternetChecker />
      <Tabs
        screenOptions={({ route }) => ({
          tabBarStyle: {
            height: 70,
            backgroundColor: '#1d1c1a',
            marginHorizontal: 8,
            bottom: 10,
            borderRadius: 28,
            display: route.name === '(controlTab)' ? 'none' : 'flex', // Hide tab bar on controlTab
          },
          tabBarLabelStyle: { margin: 6 },
          tabBarItemStyle: { padding: 12 },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#d1d5db70',
          tabBarHideOnKeyboard: true,
        })}
      >
        {/* Tab Screens */}
        <Tabs.Screen
          name='(studentHomeTab)'
          options={{
            headerShown: false,
            title: '',
            tabBarIcon: ({ color, focused }) => (
              <RemixIcon size={24} name={focused ? 'ri-home-fill' : 'ri-home-line'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='chatPage'
          options={{
            headerShown: false,
            title: '',
            tabBarIcon: ({ color, focused }) => (
              <RemixIcon size={24} name={focused ? 'ri-chat-3-fill' : 'ri-chat-3-line'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='(sSettingsTab)'
          options={{
            headerShown: false,
            title: '',
            tabBarIcon: ({ color, focused }) => (
              <RemixIcon size={24} name={focused ? 'ri-settings-fill' : 'ri-settings-line'} color={color} />
            ),
          }}
        />

      </Tabs>
      {showSession ? (
        <SessionsExpired />
      ) : null}
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
      {deletedAccount ? (
        <Modal isVisible={deletedAccount} animationIn="fadeIn" animationOut="fadeOut" useNativeDriver={true} deviceHeight={1} deviceWidth={1}>
          <View className='absolute h-full w-full items-center justify-center z-50' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
            <View className='w-[80%] bg-white rounded-[10px] p-4' style={{gap: 10}}>
              <Text className='font-pSemiBold text-[16px]'>Account Access Issue!</Text>
              <Text className='font-pRegular text-[12px]'>We couldn't locate your account in our system. It may have been deleted or is not currently available. Please contact support for further assistance.</Text>
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
  );
};

export default TabLayout;

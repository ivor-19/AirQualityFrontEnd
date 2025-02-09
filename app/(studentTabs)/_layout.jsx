import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { router, Tabs } from 'expo-router';
import RemixIcon from 'react-native-remix-icon';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import NoInternetChecker from '../../components/NoInternetChecker';
import Modal from "react-native-modal";
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { darkThemeColors, lightThemeColors } from '../../utils/alertColorUtils';
import { useAQI } from '../../context/AQIContext';
import { scale } from 'react-native-size-matters';
import { ScrollView } from '@motify/components';
import MessageModal from '../../components/MessageModal';
import { useAuth } from '../../context/AuthContext';
import SessionsExpired from '../../components/SessionsExpired';

const TabLayout = () => {
  const { aqi, pm2_5, co, no2, aqiIC, aqiIL, aqiCon, timestamp, date, scanned_by, setAqi, setPm2_5, setC0, setN02, setTimestamp, setDate, setScannedBy, setScannedUsingModel } = useAQI(); 
  const [modalVisible, setModalVisible] = useState(false);
  const [showSession, setShowSession] = useState(false);
  const navigation = useNavigation(); // Initialize navigation
  const { token, user } = useAuth();

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
    </AlertNotificationRoot>
  );
};

export default TabLayout;

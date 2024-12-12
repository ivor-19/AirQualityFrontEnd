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

const TabLayout = () => {
  const { aqi, pm2_5, co, no2, aqiIC, aqiIL, aqiCon, timestamp, date, scanned_by, setAqi, setPm2_5, setC0, setN02, setTimestamp, setDate, setScannedBy, setScannedUsingModel } = useAQI(); 
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation(); // Initialize navigation

  const openModal = () => {
    setModalVisible(true);
  };

  const toggleConfirmSend = () => {
    setModalVisible(false);
    console.log('send')
    // router.push('scanning');
  };

  const toggleCancelSend = () => {
    setModalVisible(false);
  };

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
          name='(homeTab)'
          options={{
            headerShown: false,
            title: '',
            tabBarIcon: ({ color, focused }) => (
              <RemixIcon size={24} name={focused ? 'ri-home-fill' : 'ri-home-line'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='(historyTab)'
          options={{
            headerShown: false,
            title: '',
            tabBarIcon: ({ color, focused }) => (
              <RemixIcon size={24} name={focused ? 'ri-file-list-2-fill' : 'ri-file-list-2-line'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name='scanning'
          options={({ route }) => ({
            headerShown: false,
            title: '',
            tabBarStyle: { display: route.name === 'scanning' ? 'none' : 'flex' },
            tabBarButton: (props) => (
              <View className='h-20 w-20 bg-pastel-black items-center justify-center rounded-full absolute top-[-50] border-4 border-white'>
                  <TouchableOpacity
                    onPress={openModal}
                    className='h-full w-full items-center justify-center rounded-full'
                    activeOpacity={0.5}
                  >
                    <RemixIcon size={24} name={'ri-send-plane-fill'} color='white' />
                  </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Tabs.Screen
          name='(aboutTab)'
          options={({ route }) => ({
            headerShown: false,
            title: '',
            // tabBarStyle: { display: route.name === '(aboutTab)' ? 'none' : 'flex' },
            tabBarIcon: ({ color, focused }) => (
              <RemixIcon size={24} name={focused ? 'ri-information-fill' : 'ri-information-line'} color={color} />
            ),
          })}
        />
        <Tabs.Screen
          name='(settingsTab)'
          options={{
            headerShown: false,
            title: '',
            tabBarIcon: ({ color, focused }) => (
              <RemixIcon size={24} name={focused ? 'ri-settings-fill' : 'ri-settings-line'} color={color} />
            ),
          }}
        />
      </Tabs>

      {/* Modal that will show when sample tab is clicked */}
      {modalVisible ? (
       <MessageModal onPressCancelSend={toggleCancelSend} onPressConfirmSend={toggleConfirmSend}/>
      ) : null}
    </AlertNotificationRoot>
  );
};

export default TabLayout;

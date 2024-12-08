import { View, Text, Modal, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { router, Tabs } from 'expo-router';
import RemixIcon from 'react-native-remix-icon';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import NetInfo from '@react-native-community/netinfo'; // Import NetInfo
import { Image } from 'expo-image';
import { scale } from 'react-native-size-matters';

const TabLayout = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation(); // Initialize navigation
  const [noConnection, setNoConnection] = useState(false);
  const [isConnectedToWifi, setIsConnectedToWifi] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnectedToWifi(state.isConnected && state.type === 'wifi');
    });
    
    if (isConnectedToWifi) {
      setNoConnection(false);
      console.log('connected')
    }

    if (!isConnectedToWifi) {
      setNoConnection(true);
      console.log('no connection')
    }

    return () => {
      unsubscribe();
    };
  }, [isConnectedToWifi]);

  const [dontShow, setDontShow] = useState(false);
  const toggleDontShow = () => {
    setDontShow(prevState => !prevState);
  }

  const openModal = () => {
    setModalVisible(true);
  };

  const toggleConfirmScan = () => {
    setModalVisible(false);
    router.push('scanning');
  };

  const toggleCancelScan = () => {
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
    <>
      {noConnection ? (
        <View className='h-full bg-white items-center w-full p-6 justify-center z-50' style={{ gap: 20 }}>  
          <Image source={require('../../assets/images/ghost.png')} style={{height: scale(100), width: scale(100)}}></Image>
          <Text className='font-pBold' style={{fontSize: scale(18)}}>Oops!</Text>
          <Text className='font-pRegular text-center' style={{fontSize: scale(10)}}>No internet connection was found. Check your internet connection.</Text>
        </View>
      ) : null}
      <>
        <Tabs screenOptions={{
          tabBarStyle: {height: 70, backgroundColor: '#1d1c1a', marginHorizontal: 8, bottom: 10, borderRadius: 28,},
          tabBarLabelStyle: {margin: 6},
          tabBarItemStyle: {padding: 12}, 
          tabBarActiveTintColor: '#fff',  
          tabBarInactiveTintColor: '#d1d5db70', 
          tabBarHideOnKeyboard: true,
      }}>
        {/* Tab Screens */}
        <Tabs.Screen
          name='(homeTab)'
          options={{
            headerShown: false,
            title: '',
            tabBarIcon: ({ color, focused }) => <RemixIcon size={24} name={focused ? 'ri-home-fill' : 'ri-home-line'} color={color} />,
          }}
        />
        <Tabs.Screen
          name='(historyTab)'
          options={{
            headerShown: false,
            title: '',
            tabBarIcon: ({ color, focused }) => <RemixIcon size={24} name={focused ? 'ri-file-list-2-fill' : 'ri-file-list-2-line'} color={color} />,
          }}
        />
        <Tabs.Screen
          name='scanning'
          options={({ route }) => ({
            headerShown: false,
            title: '',
            tabBarStyle: { display: route.name === 'scanning' ? 'none' : 'flex' },
            tabBarButton: (props) => (
              // Intercept the sample tab press and show the modal
              <TouchableOpacity onPress={openModal} className='h-20 w-20 bg-pastel-black items-center justify-center rounded-full absolute top-[-50] border-4 border-white'>
                <RemixIcon size={24} name={'ri-scan-2-line'} color='white' />
              </TouchableOpacity>
            ),
          })}
        />
        {/* Other Tabs */}
        <Tabs.Screen
          name='(settingsTab)'
          options={{
            headerShown: false,
            title: '',
            tabBarIcon: ({ color, focused }) => <RemixIcon size={24} name={focused ? 'ri-settings-fill' : 'ri-settings-line'} color={color} />,
          }}
        />
        <Tabs.Screen
          name='(aboutTab)'
          options={{
            headerShown: false,
            title: '',
            tabBarIcon: ({ color, focused }) => <RemixIcon size={24} name={focused ? 'ri-information-fill' : 'ri-information-line'} color={color} />,
          }}
        />
        </Tabs>
        {/* Modal that will show when sample tab is clicked */}
        {modalVisible === true ? (
        <View className='h-full w-full items-center justify-center z-50 absolute' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View className='w-[80%] bg-white rounded-[10px] px-8 '>
            <View className='my-5' style={{gap: 10}}>
              <Text className='font-pRegular text-[12px]'>You are about to begin the scanning process</Text>
              <TouchableOpacity className='flex-row items-center h-6' style={{gap: 4}} activeOpacity={0.6} onPress={toggleDontShow}>
                <RemixIcon name={dontShow ? 'ri-checkbox-fill' : 'ri-checkbox-blank-line'} size={16}></RemixIcon>
                <Text className='font-pRegular text-[10px]'>Don't show this message again</Text>
              </TouchableOpacity>
            </View>
            <View className='py-4 w-full items-end justify-center'>
              <View className='flex-row' style={{gap: 10}}>
                <TouchableOpacity onPress={toggleCancelScan} className='py-2 px-4' activeOpacity={0.6}>
                  <Text className='font-pRegular text-[10px]'>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleConfirmScan} className='py-2 px-4 bg-pastel-black rounded-custom' activeOpacity={0.6}>
                  <Text className='text-white font-pRegular text-[10px]'>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        ) : null}
      </>
    </>
  );
};

export default TabLayout;

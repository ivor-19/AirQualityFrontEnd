import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import RemixIcon from 'react-native-remix-icon';
import { scale } from 'react-native-size-matters';
import axios from 'axios';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store'; // Import SecureStore
import { useAuth } from '../../../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import { useAQI } from '../../../context/AQIContext';
import SettingsControl from '../../../components/SettingsControl';
import CustomHeader from '../../../components/CustomHeader';
import { Image } from 'expo-image';
import { darkThemeColors, lightThemeColors } from '../../../utils/alertColorUtils';
import Modal from "react-native-modal";

const settings = () => {
  const { user, logout, renderUserData } = useAuth();
  const { resetAQI } = useAQI();

  const [loading, setLoading] = useState(false);
  const [showModelAsset, setShowModelAsset] = useState(false);
  const [assetName, setAssetName] = useState(user.asset_model);
  const [enableButton, setEnableButton] = useState(false);
  const [connected, isConnected] = useState(true);
  const [assetNotFound, isAssetNotFound] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const textInputRef = useRef(null);
  const [showLogout, setShowLogout] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(false);
      setShowModelAsset(false);
      setAssetName(user.asset_model);
      setEnableButton(false);
      isConnected(true);
      isAssetNotFound(false);
      setValidationMessage('');
      textInputRef.current?.blur();
    }, [user.asset_model])
  );

  const toggleShow = () => {
    setShowModelAsset(prevState => !prevState);
    setEnableButton(false);
  }

  const toggleLogout = () => {
    logout();
    resetAQI();
    setShowLogout(false);
  }

  const handleAssetName = (text) => {
    setAssetName(text);
    if(text.trim().length >= 5){
      setEnableButton(true);
    }
    else{
      setEnableButton(false);
    }
  }

  const toggleConnect = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://air-quality-back-end-v2.vercel.app/assets/getAssetName', {assetName})
      if(response.data){

        await axios.put(`https://air-quality-back-end-v2.vercel.app/users/editUser/${user._id}`, {asset_model: assetName})

        console.log('Asset is found');
        isConnected(true);
        setLoading(false);
        isAssetNotFound(false);
        setEnableButton(false);
        textInputRef.current.blur();

        renderUserData({ ...user, asset_model: assetName });
        resetAQI();
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: `You are now connected to model: ${assetName}`,
          autoClose: 3000,
          closeOnOverlayTap: true,
        })
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || error.response.data.error;
        console.log(errorMessage)
        if (errorMessage === "Can't find asset name") {
          isAssetNotFound(true)
          setValidationMessage(errorMessage);
          setLoading(false);
          isConnected(false);
        } 
      } else {
        console.error('Error creating account', error);
      }
    }
  }

  // const toggleDeleteUser = async () => {
  //   try {
  //     const response = await axios.delete(`https://air-quality-back-end-v2.vercel.app/users/deleteUser/${user._id}`);
  //     console.log('delete successfully', response.data)
  //     toggleLogout();
  //   } catch (error) {
  //     console.error('Error deleting user', error)
  //   }
  // }
  
  return (
   
      <View className='flex-1 bg-white'>
        <CustomHeader title={'Settings'}/>
        <View>
          <View className='px-4 w-full bg-white border-b-[1px] border-gray-100 flex-row items-center justify-between' style={{gap: scale(24), height: scale(120)}}>
            <Image source={require('../../../assets/images/sukuna.jpg')} contentFit='contain' className='rounded-full' style={{height: scale(100), width: scale(100)}}></Image>
              <View className='h-full w-full py-4'>
                <View className='flex-1 justify-center'>
                  <Text className='font-pSemiBold text-pastel-black'>{user.username}</Text>
                  <Text className='font-pRegular text-gray-400 text-[10px]'>{user.email}</Text>
                </View>
                <TouchableOpacity className='bg-pastel-black px-4 py-2 rounded-[10px] item' activeOpacity={0.7} onPress={() => router.push('profile')} style={{width: scale(120)}}>
                  <Text className='font-pRegular text-white text-[10px] text-center'>Go to Profile</Text>
                </TouchableOpacity>
              </View>
          </View>
        </View>
        <View className='border-b-[1px] border-gray-100'>
            <TouchableOpacity activeOpacity={0.6} onPress={toggleShow}>
              <View className='px-4 w-full bg-white flex-row items-center justify-between' style={{height: scale(54)}}>
                <View className='flex-row items-center justify-center' style={{gap: scale(12)}}>
                  <RemixIcon name='ri-robot-2-line'></RemixIcon>
                  <Text className='font-pRegular text-pastel-black'>Model asset name</Text>
                </View>
                {/* <TouchableOpacity className='bg-pastel-black px-4 py-2 rounded-[10px]' activeOpacity={0.7} onPress={toggleShow}>
                  <Text className='font-pRegular text-white text-[10px]'>Edit</Text>
                </TouchableOpacity> */}
                <Text className='font-pRegular text-gray-400 text-[10px]'>{showModelAsset ? '' : 'edit'}</Text>
              </View>
            </TouchableOpacity>
            {showModelAsset ? (
                <View className='w-full bg-white items-center pb-4' style={{gap: 10}}>
                  {assetNotFound ? (
                    <View className='w-[80%]'>
                      <Text className='text-right font-pRegular text-[10px] text-red-400'>{validationMessage}</Text>
                    </View>
                  ) : null}
                  <View className='bg-gray-100 w-[80%] rounded-[10px] flex-row items-center'>
                    <TextInput 
                      ref={textInputRef}
                      className='bg-gray-100 flex-1 rounded-[10px] py-3 px-4 font-pRegular text-[12px]' 
                      placeholder=''
                      onChangeText={(text) => handleAssetName(text.trim())}
                      maxLength={20}
                      value={assetName}
                      autoCapitalize='none'
                    >
                    </TextInput>
                    {connected ? (
                      <Text className='font-pRegular text-[12px] text-gray-400 text-right px-4'>Connected</Text>
                    ) : null}
                  </View>
                  {enableButton ? (
                    loading ? (
                      <ActivityIndicator size="large" color="#1d1c1a" />
                    ) : (
                      <TouchableOpacity activeOpacity={0.8} disabled={!enableButton} onPress={toggleConnect} className={`bg-pastel-black h-10 w-[80%] rounded-[10px] justify-center ${enableButton ? 'opacity-100' : 'opacity-70'}`}>
                        <Text className='text-center font-pRegular text-white'>Connect</Text>
                      </TouchableOpacity>
                    )
                  ) : null}
                  <TouchableOpacity activeOpacity={0.6}>
                    <Text className='font-pRegular text-gray-400 text-[10px]'>or pair using QR</Text>
                  </TouchableOpacity>
              </View>
              ) : null}
        </View>
        <SettingsControl title={'User Guide and Tutorial'} icon={'ri-guide-line'}/>
        <SettingsControl title={'About this app'} icon={'ri-question-line'}/>
        <SettingsControl title={'Legal & Policy'} icon={'ri-shake-hands-line'}/>
        <SettingsControl title={'Contact Us'} icon={'ri-phone-fill'}/>
        <SettingsControl title={'Log Out'} icon={'ri-logout-circle-line'} onPress={() => setShowLogout(true)}/>
        {/* <SettingsControl title={'Delete User'} onPress={toggleDeleteUser}/> */}
        
        {showLogout ? (
            <Modal isVisible={showLogout} animationIn="fadeIn" animationOut="fadeOut" useNativeDriver={true} deviceHeight={1} deviceWidth={1}>
              <View className='absolute h-full w-full items-center justify-center z-50' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
                <View className='w-[80%] bg-white rounded-[10px] p-4' style={{gap: 10}}>
                  <Text className='font-pSemiBold text-[16px]'>Logout?</Text>
                  <Text className='font-pRegular text-[12px]'>Are you sure you want to logout?</Text>
                  <View className='flex-row justify-between mt-4'>
                    <TouchableOpacity onPress={() => setShowLogout(false)} className='bg-gray-100 w-[45%] h-10 rounded-[10px] justify-center' activeOpacity={0.6}>
                      <Text className='text-center font-pRegular text-black text-[12px] '>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleLogout} className='bg-pastel-black w-[45%] h-10 rounded-[10px] justify-center' activeOpacity={0.6}>
                      <Text className='text-center font-pRegular text-white text-[12px]'>Log Out</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
        ):null}
      </View>
  
  )
}


export default settings
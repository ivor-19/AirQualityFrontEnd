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
      const response = await axios.post('https://air-quality-back-end-v2.vercel.app/assets/getAsset', {assetName})
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
  return (
    <View className='flex-1'>
      <View className='border-b-[1px] border-gray-100'>
          <TouchableOpacity activeOpacity={0.6} onPress={toggleShow}>
            <View className='px-4 w-full bg-white flex-row items-center' style={{height: scale(54)}}>
              <RemixIcon name={showModelAsset ? 'ri-arrow-drop-down-line' : 'ri-arrow-drop-right-line'} size={30} />
              <Text className='font-pRegular text-pastel-black'>Model asset name</Text>
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
                    <TouchableOpacity
                      className={`bg-pastel-black h-10 w-[80%] rounded-[10px] justify-center ${enableButton ? 'opacity-100' : 'opacity-70'}`}
                      activeOpacity={0.8}
                      disabled={!enableButton}
                      onPress={toggleConnect}
                    >
                      <Text className='text-center font-pRegular text-white'>Connect</Text>
                    </TouchableOpacity>
                  )
                ) : null}
              
            </View>
            ) : null}
      </View>
      <TouchableOpacity activeOpacity={0.6}>
        <View className='px-4 w-full bg-white border-b-[1px] border-gray-100 flex-row items-center justify-between' style={{height: scale(54)}}>
          <Text className='font-pRegular text-pastel-black'>User Guide and Tutorial</Text>
          <RemixIcon name='ri-arrow-drop-right-line' size={30} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.6}>
        <View className='px-4 w-full bg-white border-b-[1px] border-gray-100 flex-row items-center justify-between' style={{height: scale(54)}}>
          <Text className='font-pRegular text-pastel-black'>About this app</Text>
          <RemixIcon name='ri-arrow-drop-right-line' size={30} color='#1d1c1a'/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.6}>
        <View className='px-4 w-full bg-white border-b-[1px] border-gray-100 flex-row items-center justify-between' style={{height: scale(54)}}>
          <Text className='font-pRegular text-pastel-black'>Legal & Policies</Text>
          <RemixIcon name='ri-arrow-drop-right-line' size={30} color='#1d1c1a'/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.6}>
        <View className='px-4 w-full bg-white border-b-[1px] border-gray-100 flex-row items-center justify-between' style={{height: scale(54)}}>
          <Text className='font-pRegular text-pastel-black'>Contact Us</Text>
          <RemixIcon name='ri-arrow-drop-right-line' size={30} color='#1d1c1a'/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.6} onPress={() => setShowLogout(true)}>
        <View className='px-4 w-full bg-white border-b-[1px] border-gray-100 flex-row items-center justify-between' style={{height: scale(54)}}>
          <Text className='font-pRegular text-pastel-black'>Log Out</Text>
        </View>
      </TouchableOpacity>
      {showLogout ? (
        <View className='absolute h-full w-full items-center justify-center z-50' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
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
      ):null}
  </View>
  )
}


export default settings
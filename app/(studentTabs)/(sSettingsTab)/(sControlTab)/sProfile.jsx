import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, Modal } from 'react-native';
import React, { useState } from 'react';
import CustomHeader from '../../../../components/CustomHeader';
import { router } from 'expo-router';
import { scale } from 'react-native-size-matters';
import CustomFormField from '../../../../components/CustomFormField';
import { Image } from 'expo-image';
import { useAuth } from '../../../../context/AuthContext';
import RemixIcon from 'react-native-remix-icon';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import api from '../../../../utils/api';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const StudentProfile = () => {
  const { user, renderUserData } = useAuth();
  const [open, setOpen] = useState(false);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  
  const avatars = [
    { id: 1, path: 'koala', source: require('../../../../assets/user-avatars/koala.png') },
    { id: 2, path: 'beaver', source: require('../../../../assets/user-avatars/beaver.png') },
    { id: 3, path: 'dog', source: require('../../../../assets/user-avatars/dog.png') },
    { id: 4, path: 'kangaroo', source: require('../../../../assets/user-avatars/kangaroo.png') },
    { id: 5, path: 'platypus', source: require('../../../../assets/user-avatars/platypus.png') },
    { id: 6, path: 'lemur', source: require('../../../../assets/user-avatars/lemur.png') },
  ];

  const [selectedAvatarPath, setSelectedAvatarPath] = useState(user?.avatarPath || 'lemur');
  const [selectedAvatarSource, setSelectedAvatarSource] = useState(
    avatars.find(avatar => avatar.path === (user?.avatarPath || 'lemur'))?.source
  );
  const [avatarUpdateLoading, setAvatarUpdateLoading] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordNotMatch, setPasswordNotMatch] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleOpen = () => setOpen(prev => !prev);

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatarPath(avatar.path);
    setSelectedAvatarSource(avatar.source);
  };

  const saveAvatarSelection = async () => {
    setAvatarUpdateLoading(true);
    try {
      // Update on server
      await api.post(`/users/editUser/${user._id}`, {
        avatarPath: selectedAvatarPath
      });
      
      // Update local state
      const updatedUser = {
        ...user,
        avatarPath: selectedAvatarPath
      };
      await renderUserData(updatedUser);
      
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Avatar Updated',
        textBody: 'Your profile picture has been successfully updated!',
        autoClose: 2000,
      });
      
      setShowAvatarSelector(false);
    } catch (error) {
      console.error('Error updating avatar:', error);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Update Failed',
        textBody: 'Could not update your avatar. Please try again.',
        autoClose: 2000,
      });
    } finally {
      setAvatarUpdateLoading(false);
    }
  };

  const toggleChangePassword = async () => {
    if (password !== confirmPassword) {
      setPasswordNotMatch(true);
      return;
    }

    setLoading(true);
    try {
      await api.post(`/users/editUser/${user._id}`, { password });
      
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Password Updated',
        textBody: 'Your password has been successfully changed!',
        autoClose: 4000,
      });
      
      setPassword('');
      setConfirmPassword('');
      setOpen(false);
    } catch (error) {
      console.error('Error changing password', error);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Failed to update password. Please try again.',
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView className='flex-1' behavior='padding'> 
      <View className='bg-white h-full w-full'>
        <CustomHeader 
          title={'Profile'} 
          showBack={true} 
          onPressBack={() => router.push('sSettings')}
        />
        
        <ScrollView className='flex-1'>
          <View className='p-4 items-center'>
            {/* Avatar Section */}
            <View className='items-center justify-center w-full mb-6' style={{height: scale(120)}}>
              <Image 
                source={selectedAvatarSource} 
                contentFit='contain' 
                className='rounded-full'
                style={{height: scale(120), width: scale(120)}}
              />
              <TouchableOpacity 
                className='absolute inset-0 items-center justify-center rounded-full bg-black/30'
                activeOpacity={0.7}
                onPress={() => setShowAvatarSelector(true)}
              >
                <Image 
                  source={require('../../../../assets/icons/camera.png')} 
                  style={{height: scale(30), width: scale(30)}}
                />
              </TouchableOpacity>
            </View>

            {/* User Info Section */}
            <View className='w-full mb-6'>
              <Text className='font-pSemiBold text-lg mb-2'>Profile Information</Text>
              <View className='bg-gray-50 p-4 rounded-lg'>
                <Text className='font-pRegular text-gray-600 mb-1' style={{fontSize: scale(10)}}>
                  Name: {user?.username}
                </Text>
                <Text className='font-pRegular text-gray-600 mb-1' style={{fontSize: scale(10)}}>
                  Student ID: {user?.account_id}
                </Text>
                <Text className='font-pRegular text-gray-600' style={{fontSize: scale(10)}}>
                  Email: {user?.email}
                </Text>
              </View>
            </View>

            {/* Change Password Section */}
            <View className='w-full border border-gray-200 rounded-lg overflow-hidden'>
              <TouchableOpacity 
                className='w-full p-4 flex-row justify-between items-center bg-white'
                activeOpacity={0.7}
                onPress={toggleOpen}
              >
                <Text className='font-pSemiBold text-base' style={{fontSize: scale(12)}}>Change Password</Text>
                <MaterialCommunityIcons name="dots-horizontal" size={24} color="black" />
              </TouchableOpacity>

              {open && (
                <View className='p-4 bg-gray-50'>
                  <CustomFormField
                    title={'New Password'}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    containerStyle='mb-4'
                  />
                  <CustomFormField
                    title={'Confirm Password'}
                    value={confirmPassword}
                    onChangeText={(text) => {
                      setConfirmPassword(text);
                      setPasswordNotMatch(false);
                    }}
                    secureTextEntry
                    containerStyle={passwordNotMatch ? 'border-red-300' : ''}
                  />
                  {passwordNotMatch && (
                    <Text className='text-red-500 text-xs mt-1'>
                      Passwords do not match
                    </Text>
                  )}

                  {password.length >= 5 && (
                    <TouchableOpacity
                      className='bg-pastel-black mt-4 p-3 rounded-lg items-center'
                      activeOpacity={0.7}
                      onPress={toggleChangePassword}
                      disabled={loading}
                    >
                      {loading ? (
                        <ActivityIndicator color="white" />
                      ) : (
                        <Text className='text-white font-pMedium'>Update Password</Text>
                      )}
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          </View>
        </ScrollView>

        {/* Avatar Selection Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showAvatarSelector}
          onRequestClose={() => setShowAvatarSelector(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/70">
            <View className="bg-white p-6 rounded-lg w-5/6 max-w-md">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="font-pSemiBold text-lg">Choose Avatar</Text>
                <TouchableOpacity onPress={() => setShowAvatarSelector(false)}>
                  <RemixIcon name="ri-close-line" size={24} />
                </TouchableOpacity>
              </View>
              
              <View className="flex-row flex-wrap justify-center gap-4">
                {avatars.map((avatar) => (
                  <TouchableOpacity 
                    key={avatar.id}
                    onPress={() => handleAvatarSelect(avatar)}
                    className={`p-2 rounded-full ${selectedAvatarPath === avatar.path ? 'border-2 border-green-500' : ''}`}
                  >
                    <Image 
                      source={avatar.source} 
                      style={{height: scale(60), width: scale(60)}}
                      contentFit='contain'
                    />
                  </TouchableOpacity>
                ))}
              </View>
              
              <TouchableOpacity 
                className="mt-6 bg-pastel-black py-3 rounded-lg items-center"
                onPress={saveAvatarSelection}
                disabled={avatarUpdateLoading}
              >
                {avatarUpdateLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white font-pMedium">Save Avatar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView> 
  );
};

export default StudentProfile;
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
  Keyboard,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomButton from '../../components/CustomButton';
import CustomFormField from '../../components/CustomFormField';
import { scale } from 'react-native-size-matters';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import * as SecureStore from 'expo-secure-store';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import { usePushNotifications } from "../../usePushNotifications";
import * as Notifications from "expo-notifications";
import { useAQI } from '../../context/AQIContext';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const loginScreen = () => {
  const { expoPushToken, notification, registerForPushNotifications } = usePushNotifications();
  const [loading, setLoading] = useState(false);
  const [account_id, setAccountId] = useState('');
  const [password, setPassword] = useState('');
  const [accountInvalid, setAccountInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [accountValidation, setAccountValidation] = useState('');
  const [passwordValidation, setPasswordValidaion] = useState('');
  const [showBlock, setShowBlock] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const { user, login, logout } = useAuth();
  const { resetAQI } = useAQI();

  useEffect(() => {
    registerForPushNotifications();
  }, []);

  useEffect(() => {
    if (expoPushToken) {
      console.log("Production Push Token:", expoPushToken);
    }
  }, [expoPushToken]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleLogin = async () => {
    if (!account_id.trim() || !password.trim()) {
      setAccountInvalid(true);
      setPasswordInvalid(true);
      setAccountValidation("Please fill up the fields");
      return;
    }

    try {
      setLoading(true);
      const response = await api.post('/users/login', { account_id, password });

      if (response.data.token) {
        const { token, user } = response.data;

        await api.post(`/users/editUser/${user._id}`, { device_notif: expoPushToken.data });
        const userDeviceNotif = await api.get(`/users/${user._id}`);

        const updatedUser = {
          ...user,
          device_notif: userDeviceNotif.data.user.device_notif,
        };

        login(token, updatedUser);

        await SecureStore.setItemAsync('userToken', token);
        await SecureStore.setItemAsync('_id', updatedUser._id);
        await SecureStore.setItemAsync('account_id', updatedUser.account_id);
        await SecureStore.setItemAsync('username', updatedUser.username);
        await SecureStore.setItemAsync('email', updatedUser.email);
        await SecureStore.setItemAsync('role', updatedUser.role);
        await SecureStore.setItemAsync('status', updatedUser.status);
        await SecureStore.setItemAsync('asset_model', updatedUser.asset_model);
        await SecureStore.setItemAsync('first_access', updatedUser.first_access);
        await SecureStore.setItemAsync('device_notif', updatedUser.device_notif);

        const res = await api.post('/expoToken', { token_notif: expoPushToken.data });
        console.log(res.data);

        setLoading(false);
        if (user.status === "Blocked") {
          setShowBlock(true);
        } else {
          if (user.first_access === "Yes") {
            router.replace('onboarding');
          } else {
            user.role === "Admin" ? router.replace('home') : router.replace('studentHome');
          }
        }
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || error.response.data.error;
        console.log(errorMessage);
        if (errorMessage === 'Student does not exists') {
          setAccountInvalid(true);
          setAccountValidation(errorMessage);
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: errorMessage,
          });
        } else if (errorMessage === 'Invalid id or password') {
          setPasswordInvalid(true);
          setPasswordValidaion(errorMessage);
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Error',
            textBody: errorMessage,
          });
        }
      } else {
        console.error('Error logging account', error);
      }
    }
  };

  const toggleLogout = () => {
    logout();
    resetAQI();
    setShowBlock(false);
  };

  useEffect(() => {
    if (account_id.trim() !== '' || password.trim() !== '') {
      setAccountInvalid(false);
      setPasswordInvalid(false);
      setAccountValidation("");
    }
  }, [account_id, password]);

  return (
    <AlertNotificationRoot>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <SafeAreaView className="flex-1 bg-white">
          {loading && (
            <View className="h-full w-full absolute z-50 items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <ActivityIndicator size="large" color="#4caf50" />
            </View>
          )}
          <ScrollView keyboardShouldPersistTaps="handled">
            <Image
              source={require('../../assets/background/drop3.png')}
              className="absolute opacity-50"
              style={{ top: scale(-30), left: scale(0), height: scale(400), width: scale(400) }}
              contentFit="contain"
            />
            <Image
              source={require('../../assets/background/drop4.png')}
              className="absolute opacity-50"
              style={{ top: scale(400), height: scale(600), width: scale(600) }}
              contentFit="contain"
            />
            <View className="h-full w-full p-8 mt-16" style={{ gap: scale(16) }}>
              <View className="mb-6 items-center">
                <Image source={require('../../assets/icons/leaf.png')} className="h-10 w-10" contentFit="contain" />
                <Text className="font-pBold text-pastel-black text-center" style={{ fontSize: scale(26) }}>
                  Welcome!
                </Text>
                <Text className="font-pRegular text-gray-500 text-center" style={{ fontSize: scale(10) }}>
                  Please log in to access your account and enjoy all the features.
                </Text>
              </View>
              <CustomFormField
                title={'ID'}
                value={account_id}
                onChangeText={(text) => {
                  setAccountId(text.trim());
                  setAccountInvalid(false);
                }}
                containerStyle={
                  accountInvalid ? 'border-2 border-red-300' : 'border-gray-300 focus:border-pastel-green-v2'
                }
                validationMessage={accountValidation}
                isInvalid={accountInvalid}
              />
              <View className="flex flex-col" style={{ gap: scale(8) }}>
                <CustomFormField
                  title={'Password'}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text.trim());
                    setPasswordInvalid(false);
                  }}
                  containerStyle={
                    passwordInvalid ? 'border-2 border-red-300' : 'border-gray-300 focus:border-pastel-green-v2'
                  }
                  validationMessage={passwordValidation}
                  isInvalid={passwordInvalid}
                />
                <View className="w-full flex flex-row justify-end">
                  <TouchableOpacity activeOpacity={0.6} onPress={() => router.push('forgotPasswordScreen')}>
                    <Text className="font-pRegular text-gray-500" style={{ fontSize: scale(8) }}>
                      Forgot password?
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View className="w-full my-4" style={{ gap: scale(20) }}>
                <TouchableOpacity
                  className={`bg-pastel-green-v2 h-14 w-[100%] rounded-[10px] justify-center`}
                  activeOpacity={0.8}
                  onPress={handleLogin}
                  style={{ height: scale(48), shadowColor: 'gray', elevation: 4 }}
                >
                  <Text className="text-center font-pSemiBold text-pastel-black">Login</Text>
                </TouchableOpacity>
                <Text className="font-pRegular text-gray-400 text-[10px] text-center">Version 7.5.0</Text>
              </View>
            </View>
          </ScrollView>

          {!keyboardVisible && (
            <TouchableOpacity
              className="absolute bottom-0 left-0 right-0 mb-4"
              activeOpacity={0.7}
              onPress={() => router.push('issueScreen')}
            >
              <Text className="font-pRegular text-gray-500 text-center" style={{ fontSize: scale(8) }}>
                Having an issue?
              </Text>
            </TouchableOpacity>
          )}
        </SafeAreaView>
      </KeyboardAvoidingView>

      {showBlock && (
        <Modal
          isVisible={showBlock}
          animationIn="fadeIn"
          animationOut="fadeOut"
          useNativeDriver={true}
          deviceHeight={1}
          deviceWidth={1}
        >
          <View className="absolute h-full w-full items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
            <View className="w-[80%] bg-white rounded-[10px] p-4" style={{ gap: 10 }}>
              <Text className="font-pSemiBold text-[16px]">Account Blocked!</Text>
              <Text className="font-pRegular text-[12px]">
                Your account has been temporarily blocked due to suspicious activity. Please contact support for further assistance.
              </Text>
              <View className="flex-row justify-end mt-4">
                <TouchableOpacity
                  onPress={toggleLogout}
                  className="bg-pastel-black w-[45%] h-10 rounded-[10px] justify-center"
                  activeOpacity={0.6}
                >
                  <Text className="text-center font-pRegular text-white text-[12px]">Exit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </AlertNotificationRoot>
  );
};

export default loginScreen;

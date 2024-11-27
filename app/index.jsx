import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomButton from '../components/CustomButton';
import { router } from 'expo-router';
import Onboarding from '../components/Onboarding';

const Index = () => {
  return (
    <SafeAreaView className="h-screen bg-[#F2F6F9]">
      {/* <View className="h-screen items-center justify-center relative">
        <Image
          className="absolute bottom-0 w-full h-[400px] opacity-50"
          resizeMode="contain"
          source={require('../assets/images/bg-graph.png')}
        />
        <View className="h-[70%] w-full items-center justify-center">
          <Image
            className="h-[70%]"
            resizeMode="contain"
            source={require('../assets/images/mock-up-logo.png')}
          />
          <Text className="text-[#35BA74] font-semibold text-2xl">AIR GUARD</Text>
        </View>
        <View className="h-[30%] w-full p-10 items-center justify-end">
          <CustomButton
            title={'Continue'}
            customButtomStyle={'w-[80%] bg-[#35BA74]'}
            customTitleStyle={'text-white'}
            onPress={() => router.push('home')}
          />
        </View>
      </View> */}
      <Onboarding
      />
    </SafeAreaView>
  );
};

export default Index;

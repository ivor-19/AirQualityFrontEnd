import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomButton from '../components/CustomButton';
import { router } from 'expo-router';
import Onboarding from '../components/Onboarding';

const Index = () => {
  return (
    <SafeAreaView className="h-screen bg-[#F2F6F9]">
      <Onboarding/>
    </SafeAreaView>
  );
};

export default Index;

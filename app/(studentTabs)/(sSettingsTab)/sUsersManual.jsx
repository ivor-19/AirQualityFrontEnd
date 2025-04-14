import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';
import CustomHeader from '../../../components/CustomHeader';
import { scale } from 'react-native-size-matters';

const sUsersManual = () => {
  const [currentPage, setCurrentPage] = useState(0);
  
  const manualPages = [
    {
      title: "Getting Started",
      image: require('../../../assets/users-manual/title-student.jpg'),
      description: "Welcome to Airguard! This user manual will guide you through the features and functionalities of the application."
    },
    {
      title: "Login Page",
      image: require('../../../assets/users-manual/main-login-student.jpg'),
      description: "Enter your Student ID and the default password (@Student01). Remember to change your password after your first login for security purposes."
    },
    {
      title: "Dashboard",
      image: require('../../../assets/users-manual/main-student-home.png'),
      description: "The Dashboard displays important information color-coded for easy navigation: Location and Weather, Gas Card, AQI Score Board, and Statistics View."
    },
    {
      title: "Statistics Page",
      image: require('../../../assets/users-manual/main-statistics-student.png'),
      description: "View detailed information about air quality scanned by the system. Check the Health Information card and Pie Chart showing gas composition."
    },
    {
      title: "Settings",
      image: require('../../../assets/users-manual/main-settings-student.png'),
      description: "Edit your personal information, change profile picture and password, or log out of your account."
    }
  ];

  const goToNextPage = () => {
    if (currentPage < manualPages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <CustomHeader 
        title={'User Guide and Tutorial'} 
        showBack={true} 
        onPressBack={() => router.push('sSettings')}
      />

      {/* Content */}
      <ScrollView className="flex-1 p-4">
        <View className="mb-6">
          <Text className="font-pSemiBold mb-2" style={{fontSize: scale(16)}}>{manualPages[currentPage].title}</Text>
          <Text className="text-gray-500 font-pRegular">Step {currentPage + 1} of {manualPages.length}</Text>
        </View>

        <Image 
          source={manualPages[currentPage].image}
          className="w-full h-64 rounded-lg bg-gray-100 mb-6"
          contentFit='contain'
        />

        <Text className="text-base leading-6 text-gray-800 mb-8 font-pRegular" style={{fontSize: scale(12)}}>
          {manualPages[currentPage].description}
        </Text>

        {/* Page Indicators */}
        <View className="flex-row justify-center mb-6">
          {manualPages.map((_, index) => (
            <View 
              key={index} 
              className={`w-2 h-2 mx-1 rounded-full ${currentPage === index ? 'bg-green-500' : 'bg-gray-300'}`}
            />
          ))}
        </View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View className="flex-row justify-between p-4 border-t border-gray-200">
        <TouchableOpacity 
          onPress={goToPrevPage}
          disabled={currentPage === 0}
          className={`p-3 rounded-lg ${currentPage === 0 ? 'opacity-50' : 'bg-green-50'} opacity-50`}
        >
          <Text className={`${currentPage === 0 ? 'text-gray-400' : 'text-black'} font-pRegular`} style={{fontSize: scale(12)}}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={goToNextPage}
          disabled={currentPage === manualPages.length - 1}
          className={`p-3 rounded-lg ${currentPage === manualPages.length - 1 ? 'opacity-50' : 'bg-green-500'}`}
        >
          <Text className="text-white font-pRegular" style={{fontSize: scale(12)}}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default sUsersManual;
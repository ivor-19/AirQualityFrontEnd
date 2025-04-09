import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import CustomHeader from '../../../components/CustomHeader'
import { router } from 'expo-router'
import { scale } from 'react-native-size-matters'
import { MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons'

const ContactUs = () => {
  return (
    <View className='bg-gray-50 h-full w-full'>
      <CustomHeader title={'Contact Us'} showBack={true} onPressBack={() => router.push('sSettings')}/>
      
      <ScrollView contentContainerStyle={{padding: scale(15)}} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View className="bg-white p-6 rounded-xl shadow-sm mb-6">
          <Text className="font-pBold text-gray-900 text-center" style={{fontSize: scale(18)}}>We're Here to Help!</Text>
          <Text className="text-gray-600 mt-2 font-pRegular text-center" style={{fontSize: scale(12)}}>Have questions or need assistance? Our team is ready to help you with any inquiries.</Text>
        </View>

        {/* Contact Methods */}
        <View className="mb-6">
          <Text className="font-pBold text-gray-800 mb-3" style={{fontSize: scale(16)}}>Contact Information</Text>
          
          <View className="bg-white rounded-xl p-4 shadow-sm">
            {/* Email Contact onPress={() => Linking.openURL('mailto:support@sample.com')}*/}
            <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-100"  activeOpacity={0.7}>
              <View className="mr-3">
                <MaterialIcons name="email" size={scale(18)} color="#3B82F6" />
              </View>
              <View className="flex-1">
                <Text className="font-pSemiBold text-gray-700" style={{fontSize: scale(12)}}>Email</Text>
                <Text className="text-gray-500 font-pRegular mt-1" style={{fontSize: scale(11)}}>support@sample.com</Text>
              </View>
              <MaterialIcons name="chevron-right" size={scale(20)} color="#9CA3AF" />
            </TouchableOpacity>
            
            {/* Website Contact  onPress={() => Linking.openURL('https://www.support-sample.com')}*/}
            <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-100" activeOpacity={0.7}>
              <View className="mr-3">
                <Feather name="globe" size={scale(18)} color="#3B82F6" />
              </View>
              <View className="flex-1">
                <Text className="font-pSemiBold text-gray-700" style={{fontSize: scale(12)}}>Website</Text>
                <Text className="text-gray-500 font-pRegular mt-1" style={{fontSize: scale(11)}}>www.support-sample.com</Text>
              </View>
              <MaterialIcons name="chevron-right" size={scale(20)} color="#9CA3AF" />
            </TouchableOpacity>
            
            {/* Location Contact */}
            <TouchableOpacity className="flex-row items-center py-3" activeOpacity={1}>
              <View className="mr-3">
                <MaterialIcons name="location-on" size={scale(18)} color="#3B82F6" />
              </View>
              <View className="flex-1">
                <Text className="font-pSemiBold text-gray-700" style={{fontSize: scale(12)}}>Location</Text>
                <Text className="text-gray-500 font-pRegular mt-1" style={{fontSize: scale(11)}}>123 Sample</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Support Info */}
        <View className="mb-6">
          <Text className="font-pBold text-gray-800 mb-3" style={{fontSize: scale(16)}}>Support Options</Text>
          
          <View className="bg-white rounded-xl p-4 shadow-sm">
            <View className="flex-row items-start mb-3">
              <MaterialIcons name="support-agent" size={scale(18)} color="#10B981" style={{marginTop: 2}} />
              <View className="ml-3 flex-1">
                <Text className="font-pSemiBold text-gray-700" style={{fontSize: scale(12)}}>24/7 Email Support</Text>
                <Text className="text-gray-500 font-pRegular mt-1" style={{fontSize: scale(11)}}>Get help anytime via email with average response time of 2 hours</Text>
              </View>
            </View>
            
            <View className="flex-row items-start mb-3">
              <MaterialIcons name="help-center" size={scale(18)} color="#3B82F6" style={{marginTop: 2}} />
              <View className="ml-3 flex-1">
                <Text className="font-pSemiBold text-gray-700" style={{fontSize: scale(12)}}>Help Center</Text>
                <Text className="text-gray-500 font-pRegular mt-1" style={{fontSize: scale(11)}}>Browse our FAQ section for quick answers</Text>
              </View>
            </View>
            
            <View className="flex-row items-start">
              <MaterialIcons name="feedback" size={scale(18)} color="#F59E0B" style={{marginTop: 2}} />
              <View className="ml-3 flex-1">
                <Text className="font-pSemiBold text-gray-700" style={{fontSize: scale(12)}}>Feedback & Suggestions</Text>
                <Text className="text-gray-500 font-pRegular mt-1" style={{fontSize: scale(11)}}>We value your input to improve our service</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Social Media */}
        <View>
          <Text className="font-pBold text-gray-800 mb-3" style={{fontSize: scale(16)}}>Follow Us</Text>
          
          <View className="bg-white rounded-xl p-4 shadow-sm">
            {/* Facebook onPress={() => Linking.openURL('https://facebook.com/sample')}*/}
            <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-100"  activeOpacity={0.7}>
              <View className="mr-3">
                <FontAwesome name="facebook" size={scale(18)} color="#3B82F6" />
              </View>
              <View className="flex-1">
                <Text className="font-pSemiBold text-gray-700" style={{fontSize: scale(12)}}>Facebook</Text>
                <Text className="text-gray-500 font-pRegular mt-1" style={{fontSize: scale(11)}}>facebook.com/sample</Text>
              </View>
              <MaterialIcons name="chevron-right" size={scale(20)} color="#9CA3AF" />
            </TouchableOpacity>
            
            {/* Instagram  onPress={() => Linking.openURL('https://instagram.com/sample')}*/ }
            <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-100" activeOpacity={0.7}>
              <View className="mr-3">
                <FontAwesome name="instagram" size={scale(18)} color="#E1306C" />
              </View>
              <View className="flex-1">
                <Text className="font-pSemiBold text-gray-700" style={{fontSize: scale(12)}}>Instagram</Text>
                <Text className="text-gray-500 font-pRegular mt-1" style={{fontSize: scale(11)}}>@sample</Text>
              </View>
              <MaterialIcons name="chevron-right" size={scale(20)} color="#9CA3AF" />
            </TouchableOpacity>
            
            {/* Twitter onPress={() => Linking.openURL('https://twitter.com/sample')}*/}
            <TouchableOpacity className="flex-row items-center py-3"  activeOpacity={0.7}>
              <View className="mr-3">
                <FontAwesome name="twitter" size={scale(18)} color="#1DA1F2" />
              </View>
              <View className="flex-1">
                <Text className="font-pSemiBold text-gray-700" style={{fontSize: scale(12)}}>Twitter</Text>
                <Text className="text-gray-500 font-pRegular mt-1" style={{fontSize: scale(11)}}>@sample</Text>
              </View>
              <MaterialIcons name="chevron-right" size={scale(20)} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer Note */}
        <Text className="text-gray-400 font-pRegular text-center mt-6" style={{fontSize: scale(10)}}>We typically respond to inquiries within 24 hours</Text>
      </ScrollView>
    </View>
  )
}

export default ContactUs
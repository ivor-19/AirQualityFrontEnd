import { View, Text, ScrollView, TouchableOpacity, Linking, TextInput, Alert, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { scale } from 'react-native-size-matters'
import { MaterialIcons, FontAwesome, Feather, Ionicons } from '@expo/vector-icons'
import RemixIcon from 'react-native-remix-icon'
import api from '../../utils/api'
import CustomButton from '../../components/CustomButton'

const issueScreen = () => {
  const [issue, setIssue] = useState('')
  const [title, setTitle] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showError, setShowError] = useState(false)
  const [showIssueList, setShowIssueList] = useState(false)
  const [issueList, setIssueList] = useState([])
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async () => {
    if (!issue.trim() || !name.trim() || !title.trim() || !email.trim()) {
      setShowError(true);
      return
    }

    try {
      setIsSubmitting(true)
      const newIssue = {
        sender_id: '', 
        sender_accountId: '', 
        sender_name: name, 
        email: email,
        title: title,
        description: issue,
      }
      await api.post('/issue', newIssue);
      setIsSubmitting(false)
      setShowModal(true)
      
    } catch (error) {
      console.error("Error sending issue", error)
    }
    
  }


  const contactMethods = [
    {
      title: "Email Us",
      description: "airguard.alert@gmail.com",
      icon: <MaterialIcons name="email" size={scale(22)} color="#43A047" />,
      onPress: () => Linking.openURL('mailto:airguard.alert@gmail.com')
    },
    {
      title: "Call Us",
      description: "+63 9663470157",
      icon: <FontAwesome name="phone" size={scale(22)} color="#43A047" />,
      onPress: () => Linking.openURL('tel:+639663470157')
    },
  ]

  return (
    <View className='bg-white h-full w-full'>
      <TouchableOpacity 
        onPress={() => router.back()}
        className='w-full flex-row justify-start'
      >
        <RemixIcon name='ri-arrow-drop-left-line' size={scale(36)}/>
      </TouchableOpacity>
      <ScrollView 
        contentContainerStyle={{padding: scale(15)}} 
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View className="bg-white p-6 rounded-xl shadow-sm mb-6" style={{shadowColor: 'gray', elevation: 4}}>
          <Text className="font-pBold text-gray-900 text-center" style={{fontSize: scale(14)}}>We're Here to Help!</Text>
          <Text className="text-gray-600 mt-2 font-pRegular text-center" style={{fontSize: scale(10)}}>
            Have questions or need assistance? Our team is ready to help you with any inquiries.
          </Text>
        </View>

        {/* Contact Methods */}
        <View className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden" style={{shadowColor: 'gray', elevation: 4}}>
          {contactMethods.map((method, index) => (
            <TouchableOpacity 
              key={index} 
              className={`flex-row items-center p-4 ${
                index < contactMethods.length - 1 ? "border-b border-gray-100" : ""
              }`}
              onPress={method.onPress}
              activeOpacity={0.7}
            >
              <View className="bg-green-50 p-2 rounded-lg mr-4">
                {method.icon}
              </View>
              <View className="flex-1">
                <Text className="font-pMedium text-gray-800" style={{fontSize: scale(10)}}>
                  {method.title}
                </Text>
                <Text className="text-gray-500 font-pRegular" style={{fontSize: scale(10)}}>
                  {method.description}
                </Text>
              </View>
              <Feather name="chevron-right" size={scale(18)} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Issue Form */}
        <View className="bg-white p-6 rounded-xl shadow-sm mb-6" style={{shadowColor: 'gray', elevation: 4}}>
          <Text className="font-pBold text-gray-900 mb-4" style={{fontSize: scale(14)}}>
            Report Your Issue
          </Text>

          <Text className="font-pMedium text-gray-700 mb-2" style={{fontSize: scale(10)}}>
            Name
          </Text>
          <TextInput
            className="bg-gray-50 rounded-lg p-3 mb-4 font-pRegular text-gray-800"
            style={{fontSize: scale(10)}}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
          />
          
          <Text className="font-pMedium text-gray-700 mb-2" style={{fontSize: scale(10)}}>
            Title
          </Text>
          <TextInput
            className="bg-gray-50 rounded-lg p-3 mb-4 font-pRegular text-gray-800"
            style={{fontSize: scale(10)}}
            placeholder="Your issue"
            value={title}
            onChangeText={setTitle}
            autoCapitalize="none"
          />
          
          <Text className="font-pMedium text-gray-700 mb-2" style={{fontSize: scale(10)}}>
            Describe your issue
          </Text>
          <TextInput
            className="bg-gray-50 rounded-lg p-3 mb-4 font-pRegular text-gray-800"
            style={{fontSize: scale(10), height: scale(100)}}
            placeholder="Please provide details about your issue..."
            value={issue}
            onChangeText={setIssue}
            multiline={true}
            textAlignVertical="top"
          />

          <Text className="font-pMedium text-gray-700 mb-2" style={{fontSize: scale(10)}}>
            Email (provide your email to get notified)
          </Text>
          <TextInput
            className="bg-gray-50 rounded-lg p-3 mb-4 font-pRegular text-gray-800"
            style={{fontSize: scale(10)}}
            placeholder="Your email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {showError && 
            <Text className='font-pRegular text-right text-red-500 mb-2' style={{fontSize: scale(8)}}>Please fill up the fields.</Text>
          }
          <TouchableOpacity 
            className={`rounded-lg p-4 items-center ${isSubmitting ? "bg-indigo-300" : "bg-green-600"}`}
            onPress={handleSubmit}
            disabled={isSubmitting}
            activeOpacity={0.6}
          >
            <Text className="font-pBold text-white" style={{fontSize: scale(10)}}>
              {isSubmitting ? "Submitting..." : "Submit Issue"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer Note */}
        <Text className="text-gray-400 font-pRegular text-center mt-6" style={{fontSize: scale(8)}}>
          We typically respond to inquiries within 24 hours
        </Text>
      </ScrollView>
      {showModal && (
       
          <View className='absolute h-full w-full items-center justify-center z-10' style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
            <View className='w-[80%] bg-white rounded-[10px] p-4 items-center' style={{gap: scale(12)}}>
              <Text className='font-pRegular text-[12px]'>Your concern has been sent successfully!</Text>
              <CustomButton title={'Go to login'} onPress={() => {setShowModal(false); router.push('loginScreen')}}/>
            </View>
          </View>

      )}
    </View>
  )
}

export default issueScreen
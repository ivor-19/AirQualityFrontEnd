import { View, Text, ScrollView, TouchableOpacity, Linking, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '../../../components/CustomHeader'
import { router } from 'expo-router'
import { scale } from 'react-native-size-matters'
import { MaterialIcons, FontAwesome, Feather, Ionicons } from '@expo/vector-icons'
import api from '../../../utils/api'
import { useAuth } from '../../../context/AuthContext'

const ContactUs = () => {
  const [issue, setIssue] = useState('')
  const [title, setTitle] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showIssueList, setShowIssueList] = useState(false)
  const [issueList, setIssueList] = useState([])
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!issue.trim()) {
      Alert.alert("Error", "Please describe your issue")
      return
    }

    try {
      const newIssue = {
        sender_id: user._id, 
        sender_accountId: user.account_id, 
        sender_name: user.username, 
        email: email,
        title: title,
        description: issue,
      }
      await api.post('/issue', newIssue);

      setIsSubmitting(true)
      setTimeout(() => {
        setIsSubmitting(false)
        Alert.alert(
          "Thank You", 
          "Your issue has been submitted. We'll get back to you soon.",
          [{ text: "OK", onPress: () => {
            setIssue('')
            setEmail('')
            setTitle('')
          }}]
        )
      }, 1500)
      
    } catch (error) {
      
    }
    
  }

  const fetchIssue = async () => {
    try {
      const response = await api.get('/issue');
      const filteredIssues = response.data.issueList.filter(
        (issue) => issue.sender_id === user._id
      );
      setIssueList(filteredIssues);
    } catch (error) {
      console.error("Error fetching issues", error);
    }
  }

  useEffect(() => {
    fetchIssue();
  }, [])

  const toggleShowList = () => {
    fetchIssue();
    setShowIssueList(prev => !prev);
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
      description: "+1 (555) 123-4567",
      icon: <FontAwesome name="phone" size={scale(22)} color="#43A047" />,
      onPress: () => Linking.openURL('tel:+15551234567')
    },
  ]

  return (
    <View className='bg-white h-full w-full'>
      <CustomHeader 
        title={'Report an Issue'} 
        showBack={true} 
        onPressBack={() => router.push('sSettings')}
      />
      
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
        <TouchableOpacity 
          className={`rounded-lg p-4 items-center bg-gray-600 mb-2`} 
          activeOpacity={0.6} 
          onPress={toggleShowList}
        >
          <Text className="font-pBold text-white" style={{fontSize: scale(10)}}>
            {showIssueList ? "Close" : "View submitted issues"}
          </Text>
        </TouchableOpacity>

        {showIssueList && (
          <View className="bg-white rounded-lg mb-4" style={{ 
            shadowColor: 'gray', 
            elevation: 4,
            maxHeight: scale(200), // Set a maximum height
            flex: 1 // Important for proper scrolling
          }}>
            <ScrollView 
              contentContainerStyle={{ padding: scale(8) }}
              nestedScrollEnabled={true} // Enable nested scrolling
            >
              {issueList.length === 0 ? (
                <View className='flex justify-center items-center h-20'>
                  <Text className='font-pRegular text-gray-500'>No submitted issues</Text>
                </View>
              ) : (
                issueList.map((issue) => (
                  <View
                    key={issue._id}
                    className="p-3 border-b border-gray-100"
                  >
                    <View className="flex-row mb-1">
                      <Text className="font-pMedium mr-2" style={{ fontSize: scale(10), width: scale(50) }}>
                        Title:
                      </Text>
                      <Text className="font-pRegular flex-1" style={{ fontSize: scale(10) }}>
                        {issue.title}
                      </Text>
                    </View>

                    <View className="flex-row mb-1">
                      <Text className="font-pMedium mr-2" style={{ fontSize: scale(10), width: scale(50) }}>
                        Concern:
                      </Text>
                      <Text className="font-pRegular flex-1" style={{ fontSize: scale(10) }}>
                        {issue.description}
                      </Text>
                    </View>

                    <View className="flex-row mb-1">
                      <Text className="font-pMedium mr-2" style={{ fontSize: scale(10), width: scale(50) }}>
                        Status:
                      </Text>
                      <View className={`rounded-md px-2 ${
                        issue.status === 'Resolved' ? 'bg-green-100' : 'bg-yellow-100'
                      }`}>
                        <Text className="font-pRegular" style={{ fontSize: scale(10) }}>
                          {issue.status}
                        </Text>
                      </View>
                    </View>

                    <View className="flex-row">
                      <Text className="font-pMedium mr-2" style={{ fontSize: scale(10), width: scale(50) }}>
                        Date:
                      </Text>
                      <Text className="font-pRegular flex-1" style={{ fontSize: scale(10) }}>
                        {issue.created_at}
                      </Text>
                    </View>
                    <View className="flex-row">
                      <Text className="font-pMedium mr-2" style={{ fontSize: scale(10), width: scale(50) }}>
                        Resolved at:
                      </Text>
                      <Text className="font-pRegular flex-1" style={{ fontSize: scale(10) }}>
                        {issue.updated_at === '' ? (
                          <Text>---</Text>
                        ):(
                          <Text>{issue.updated_at}</Text>
                        )}
                      </Text>
                    </View>
                  </View>
                ))
              )}
            </ScrollView>
          </View>
        )}
        {/* Footer Note */}
        <Text className="text-gray-400 font-pRegular text-center mt-6" style={{fontSize: scale(10)}}>
          We typically respond to inquiries within 24 hours
        </Text>
      </ScrollView>
    </View>
  )
}

export default ContactUs
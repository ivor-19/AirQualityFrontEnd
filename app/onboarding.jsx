import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Onboarding from '../components/Onboarding'

const onboarding = () => {
  return (
    <SafeAreaView className="h-screen bg-[#F2F6F9]">
        <Onboarding/>
    </SafeAreaView>
  )
}

export default onboarding
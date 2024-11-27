import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { router, useNavigation } from 'expo-router'
import { MotiView } from '@motify/components'
import { Easing } from 'react-native-reanimated';

const Scanning = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const handleTimeOut = () => {
      setTimeout(() => {
        router.push('home');
      }, 3000);
    }
    const reset = navigation.addListener('focus', () => {
      handleTimeOut();
    })

    return () => {
      reset();
    }
  }, [navigation])

  return (
    <View className='flex-1 items-center justify-center bg-white'>
      {[...Array(3).keys()].map(index => {
        return (
          <MotiView
            from={{ opacity: 0.7, scale: 1.5 }} 
            animate={{ opacity: 0, scale: 4 }} 
            transition={{
              loop: true, 
              type: 'timing', 
              duration: 2000, 
              easing: Easing.inOut(Easing.ease),
              delay: index * 400, 
              repeatReverse: false, 
            }}
            key={index}
            style={{
              width: 80, 
              height: 80, 
              borderRadius: 50, 
              backgroundColor: '#699571',
              position: 'absolute', 
              
            }}
          />
          
        )
      })}
      <View className='bg-primary-OP w-28 h-28 rounded-full z-50' style={{shadowColor:'#699571', elevation: 40, justifyContent: 'center', alignItems: 'center'}}></View>
      
      {/* Optionally, you can add a button to manually navigate to home */}
      {/* <TouchableOpacity className='bg-slate-200 h-6 px-2' onPress={() => router.push('home')}>
        <Text>Go Back</Text>
      </TouchableOpacity> */}
    </View>
  )
}

const styles = StyleSheet.create({
  // You can add more styles here
})

export default Scanning

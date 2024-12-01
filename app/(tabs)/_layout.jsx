import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import RemixIcon from 'react-native-remix-icon'

const TabLayout = () => {
  return (
   <Tabs screenOptions={{
        tabBarStyle: {height: 70, backgroundColor: '#1d1c1a', marginHorizontal: 8, bottom: 10, borderRadius: 28,}, 
        tabBarLabelStyle: {margin: 6},
        tabBarItemStyle: {padding: 12}, 
        tabBarActiveTintColor: '#fff',  
        tabBarInactiveTintColor: '#d1d5db70', 
        tabBarHideOnKeyboard: true,
    }}>
    <Tabs.Screen 
        name='(homeTab)'
        options={{
            headerShown: false,
            title: '',
            tabBarIcon: ({ color, focused }) => <RemixIcon size={24} name={focused ? 'ri-home-fill' : 'ri-home-line'} color={color} />,
            // tabBarLabel: ({focused}) => <Text className={`text-[10px] mt-2 text-black`}>{focused ? 'Home' : ''}</Text>,
        }}
    />
    <Tabs.Screen
        name='(historyTab)'
        options={{
            headerShown: false,
            title: '',
            tabBarIcon: ({ color, focused }) => <RemixIcon size={24} name={focused ? 'ri-file-list-2-fill' : 'ri-file-list-2-line'} color={color} />,
            // tabBarLabel: ({focused}) => <Text className={`text-[10px] mt-2 text-primary-MAIN`}>{focused ? 'History' : ''}</Text>,
        }}
    />    
    <Tabs.Screen
        name='scanning'
        options={({ route }) => ({
            headerShown: false,
            title: '',
            tabBarStyle: { display: route.name === 'scanning' ? 'none' : 'flex' },  // Hide tab bar when on scanning tab
            tabBarIcon: ({ color, focused }) => (
            <View className='h-20 w-20 bg-pastel-black items-center justify-center rounded-full absolute top-[-50] border-4 border-white'>
                <RemixIcon size={24} name={'ri-scan-2-line'} color='white' />
            </View>
        ),
      })}
    />
    <Tabs.Screen
        name='(settingsTab)'
        options={{
            headerShown: false,
            title: '',
            tabBarIcon: ({ color, focused }) => <RemixIcon size={24} name={focused ? 'ri-settings-fill' : 'ri-settings-line'} color={color} />,
            // tabBarLabel: ({focused}) => <Text className={`text-[10px] mt-2 text-primary-MAIN`}>{focused ? 'Settings' : ''}</Text>,
        }}
    />
    <Tabs.Screen
        name='(aboutTab)'
        options={{
            headerShown: false,
            title: '',
            tabBarIcon: ({ color, focused }) => <RemixIcon size={24} name={focused ? 'ri-information-fill' : 'ri-information-line'} color={color} />,
            // tabBarLabel: ({focused}) => <Text className={`text-[10px] mt-2 text-primary-MAIN`}>{focused ? 'About' : ''}</Text>,
        }}
    />
   </Tabs>
  )
}

export default TabLayout
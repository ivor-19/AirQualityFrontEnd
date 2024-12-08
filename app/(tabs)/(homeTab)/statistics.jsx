import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import RemixIcon from 'react-native-remix-icon'
import { router } from 'expo-router'
import { Image } from 'expo-image'
import CustomLineChart from '../../../components/CustomLineChart'
import { useAQI } from '../../../context/AQIContext'

const statistics = () => {
    const { aqi, pm2_5, co, no2, aqiIC, aqiIL, aqiCon, aqiDet, coIC, coIL, no2IC, no2IL, timestamp } = useAQI();

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View className='h-16 justify-center relative border-b-[1px] border-gray-100'>
                <TouchableOpacity className='absolute z-10' onPress={() => router.push('home')} activeOpacity={0.6}>
                    <RemixIcon name='ri-arrow-drop-left-line' size={46} color='#1d1c1a'/>
                </TouchableOpacity>
                <Text className='text-center font-pBold text-[20px] text-pastel-black'>Statistics</Text>
            </View>
            <ScrollView contentContainerStyle={{}}>
                <View className='h-full w-full p-4' style={{gap: 12}}>
                    <View className='h-32 flex flex-row space-x-2'>
                        <View className='bg-white h-full w-[40%] rounded-custom items-center justify-center p-4 border-2 border-gray-100' style={{shadowColor: 'gray', elevation: 4}}>
                            <Text className='font-pBold text-[24px]'>{aqi}</Text>
                            <Text className='font-pRegular text-[10px]'>AQI score</Text>
                            <Text className='font-pRegular text-[10px] text-gray-400'>Timestamp: {timestamp}</Text>
                        </View>
                        <View className='bg-white h-full flex-1 rounded-custom p-4 border-2 border-gray-100' style={{shadowColor: 'gray', elevation: 4}}>
                            <View className='flex-row items-center' style={{gap: 4}}>
                                <Text className='font-pRegular text-[10px]'>Risk Indicator: </Text>
                                <View className={`h-[6px] w-[6px] rounded-full`} style={{backgroundColor: aqiIC}}></View>
                                <Text className='font-pSemiBold text-[10px]'>{aqiIL}</Text>
                            </View>
                            <View className='flex-row' style={{gap: 4}}>
                                <Text className='font-pRegular text-[10px]'>Condition: </Text>
                                <Text className='font-pSemiBold text-[10px]'>{aqiCon}</Text>
                            </View>
                            <View className='h-20 mt-2'>
                                <Text className='font-pRegular text-[10px]'>
                                    {aqiDet}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View className='h-52 bg-white rounded-custom border-2 border-gray-100' style={{shadowColor: 'gray', elevation: 4}}>
                        <CustomLineChart/>
                    </View>
                    <View className='w-full flex-1 flex flex-col space-y-2'>
                        <View className='bg-pastel-green h-24 rounded-custom p-4 flex-row items-center'>
                            <View className='w-[20%] h-10 items-center justify-center'>
                                <Text className='text-pastel-black font-pBold text-[30px]'>{pm2_5}</Text>
                                <Text className='text-pastel-black font-pRegular text-[10px]'>µg/m³</Text>
                            </View>
                            <View className='flex-1 h-full px-2'>
                                <Text className='font-pBold text-pastel-black text-[16px]'>Particulate Matter 2.5</Text>
                                <Text className='font-pRegular text-pastel-black text-[10px]'>Risk Indicator: {aqiIL}</Text>
                            </View> 
                            <View className='w-[20%] h-full items-center justify-center'>
                                <View className='h-16 w-16 rounded-full bg-pastel-black items-center justify-center'>
                                    <Image source={require('../../../assets/icons/pm2.5.png')} className='h-10 w-10'/>
                                </View>
                            </View>
                        </View>
                        <View className='bg-pastel-green h-24 rounded-custom p-4 flex-row items-center'>
                            <View className='w-[20%] h-10 items-center justify-center'>
                                <Text className='text-pastel-black font-pBold text-[30px]'>{co}</Text>
                                <Text className='text-pastel-black font-pRegular text-[10px]'>PPM</Text>
                            </View>
                            <View className='flex-1 h-full px-2'>
                                <Text className='font-pBold text-pastel-black text-[16px]'>Carbon Monoxide</Text>
                                <Text className='font-pRegular text-pastel-black text-[10px]'>Risk Indicator: {coIL}</Text>
                            </View> 
                            <View className='w-[20%] h-full items-center justify-center'>
                                <View className='h-16 w-16 rounded-full bg-pastel-black items-center justify-center'>
                                    <Image source={require('../../../assets/icons/smoke-white.png')} className='h-10 w-10'/>
                                </View>
                            </View>
                        </View>
                        <View className='bg-pastel-green h-24 rounded-custom p-4 flex-row items-center'>
                            <View className='w-[20%] h-10 items-center justify-center'>
                                <Text className='text-pastel-black font-pBold text-[30px]'>{no2}</Text>
                                <Text className='text-pastel-black font-pRegular text-[10px]'>PPB</Text>
                            </View>
                            <View className='flex-1 h-full px-2'>
                                <Text className='font-pBold text-pastel-black text-[16px]'>Nitrogen Dioxide</Text>                           
                                <Text className='font-pRegular text-pastel-black text-[10px]'>Risk Indicator: {no2IL}</Text>
                            </View> 
                            <View className='w-[20%] h-full items-center justify-center'>
                                <View className='h-16 w-16 rounded-full bg-pastel-black items-center justify-center'>
                                    <Image source={require('../../../assets/icons/nitrogen.png')} className='h-10 w-10'/>
                                </View>
                            </View>
                        </View>
                        <View className='bg-pastel-green h-24 rounded-custom p-4 flex-row items-center'>
                            <View className='w-[20%] h-10 items-center justify-center'>
                                <Text className='text-pastel-black font-pBold text-[30px]'>24</Text>
                                <Text className='text-pastel-black font-pRegular text-[10px]'>???</Text>
                            </View>
                            <View className='flex-1 h-full px-2'>
                                <Text className='font-pBold text-pastel-black text-[16px]'>???</Text>
                                <Text className='font-pRegular text-pastel-black text-[10px]'>Risk Indicator: --</Text>
                            </View> 
                            <View className='w-[20%] h-full items-center justify-center'>
                                <View className='h-16 w-16 rounded-full bg-pastel-black items-center justify-center'>
                                    <Image source={require('../../../assets/icons/pm2.5.png')} className='h-10 w-10'/>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default statistics
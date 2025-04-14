import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import RemixIcon from 'react-native-remix-icon'
import { router } from 'expo-router'
import { Image } from 'expo-image'
import CustomLineChart from '../../../components/CustomLineChart'
import { useAQI } from '../../../context/AQIContext'
import CustomHeader from '../../../components/CustomHeader'
import { scale } from 'react-native-size-matters'

const studentStatistics = () => {
    const { aqi, pm2_5, pm10, co, no2, aqiIC, aqiIL, aqiCon, aqiDet, coIL, no2IL, pm2_5IL, pm10IL, timestamp } = useAQI();

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <CustomHeader title={'Statistics'} showBack={true} onPressBack={() => router.push('studentHome')}/>
            <ScrollView contentContainerStyle={{}}>
                <View className='h-full w-full p-4' style={{gap: 12}}>
                    <View className='h-32 flex flex-row space-x-2'>
                        <View className='bg-white h-full w-[40%] rounded-custom items-center justify-center p-4 border-2 border-gray-100' style={{shadowColor: 'gray', elevation: 4}}>
                            <Text className='font-pBold' style={{fontSize: scale(20)}}>{aqi}</Text>
                            <Text className='font-pRegular' style={{fontSize: scale(8)}}>AQI score</Text>
                            <Text className='font-pRegular text-gray-400' style={{fontSize: scale(7)}}>Timestamp: {timestamp}</Text>
                        </View>
                        <View className='bg-white h-full flex-1 rounded-custom p-4 border-2 border-gray-100' style={{shadowColor: 'gray', elevation: 4}}>
                            <View className='flex-row items-center' style={{gap: 4}}>
                                <Text className='font-pRegular' style={{fontSize: scale(8)}}>Risk Indicator: </Text>
                                <View className={`h-[6px] w-[6px] rounded-full`} style={{backgroundColor: aqiIC}}></View>
                                <Text className='font-pSemiBold' style={{fontSize: scale(8)}}>{aqiIL}</Text>
                            </View>
                            <View className='flex-row' style={{gap: 4}}>
                                <Text className='font-pRegular' style={{fontSize: scale(8)}}>Condition: </Text>
                                <Text className='font-pSemiBold' style={{fontSize: scale(8)}}>{aqiCon}</Text>
                            </View>
                            <View className='h-20 mt-2'>
                                <Text className='font-pRegular' style={{fontSize: scale(8)}}>
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
                                <Text className='text-pastel-black font-pBold' style={{fontSize: scale(20)}}>{pm2_5}</Text>
                                <Text className='text-pastel-black font-pRegular text-[10px]'>µg/m³</Text>
                            </View>
                            <View className='flex-1 h-full px-2'>
                                <Text className='font-pBold text-pastel-black text-[16px]'>Particulate Matter 2.5</Text>
                                <Text className='font-pRegular text-pastel-black text-[10px]'>Risk Indicator: {pm2_5IL}</Text>
                            </View> 
                            <View className='w-[20%] h-full items-center justify-center'>
                                <View className='h-16 w-16 rounded-full bg-pastel-black items-center justify-center'>
                                    <Image source={require('../../../assets/icons/pm2.5.png')} className='h-10 w-10'/>
                                </View>
                            </View>
                        </View>
                        <View className='bg-pastel-green h-24 rounded-custom p-4 flex-row items-center'>
                            <View className='w-[20%] h-10 items-center justify-center'>
                                <Text className='text-pastel-black font-pBold' style={{fontSize: scale(20)}}>{pm10}</Text>
                                <Text className='text-pastel-black font-pRegular text-[10px]'>µg/m³</Text>
                            </View>
                            <View className='flex-1 h-full px-2'>
                                <Text className='font-pBold text-pastel-black text-[16px]'>Particulate Matter 2.5</Text>
                                <Text className='font-pRegular text-pastel-black text-[10px]'>Risk Indicator: {pm10IL}</Text>
                            </View> 
                            <View className='w-[20%] h-full items-center justify-center'>
                                <View className='h-16 w-16 rounded-full bg-pastel-black items-center justify-center'>
                                    <Image source={require('../../../assets/icons/pm2.5.png')} className='h-10 w-10'/>
                                </View>
                            </View>
                        </View>
                        <View className='bg-pastel-green h-24 rounded-custom p-4 flex-row items-center'>
                            <View className='w-[20%] h-10 items-center justify-center'>
                                <Text className='text-pastel-black font-pBold' style={{fontSize: scale(20)}}>{co}</Text>
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
                                <Text className='text-pastel-black font-pBold' style={{fontSize: scale(20)}}>{no2}</Text>
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
                      
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default studentStatistics
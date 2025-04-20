import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import RemixIcon from 'react-native-remix-icon'
import { router } from 'expo-router'
import { Image } from 'expo-image'
import CustomLineChart from '../../../components/CustomLineChart'
import { useAQI } from '../../../context/AQIContext'
import CustomHeader from '../../../components/CustomHeader'
import { scale } from 'react-native-size-matters'
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

const studentStatistics = () => {
    const { aqi, pm2_5, pm10, co, no2, aqiIC, aqiIL, aqiCon, aqiDet, coIC, coIL, n2oIC, no2IL, pm2_5IL, pm10IL, timestamp } = useAQI();

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
                        <View className='bg-pastel-green h-28 rounded-custom p-4 flex-row items-center'>
                            <View className='w-[20%] h-10 items-center justify-center'>
                                <Text className='text-pastel-black font-pBold' style={{fontSize: scale(20)}}>{pm2_5}</Text>
                     
                            </View>
                            <View className='flex-1 h-full px-2'>
                                <Text className='font-pBold text-pastel-black text-[16px]'>Particulate Matter 2.5</Text>
                                <Text className='font-pRegular text-pastel-black text-[10px]'>Fine particulate matter with diameter less than 2.5 micrometers. Can penetrate deep into lungs and bloodstream.</Text>
                            </View> 
                            <View className='w-[20%] h-full items-center justify-center'>
                                <View className='h-16 w-16 rounded-full bg-pastel-black items-center justify-center'>
                                    <MaterialIcons name="blur-on" size={scale(28)} color="#fff" />
                                </View>
                            </View>
                        </View>
                        <View className='bg-pastel-green h-28 rounded-custom p-4 flex-row items-center'>
                            <View className='w-[20%] h-10 items-center justify-center'>
                                <Text className='text-pastel-black font-pBold' style={{fontSize: scale(20)}}>{pm10}</Text>
                         
                            </View>
                            <View className='flex-1 h-full px-2'>
                                <Text className='font-pBold text-pastel-black text-[16px]'>Particulate Matter 10</Text>
                                <Text className='font-pRegular text-pastel-black text-[10px]'>Particulate matter with diameter less than 10 micrometers. Can cause respiratory issues.</Text>
                            </View> 
                            <View className='w-[20%] h-full items-center justify-center'>
                                <View className='h-16 w-16 rounded-full bg-pastel-black items-center justify-center'>
                                    <MaterialCommunityIcons name="dots-hexagon" size={scale(28)} color="#fff" />
                                </View>
                            </View>
                        </View>
                        <View className='bg-pastel-green h-28 rounded-custom p-4 flex-row items-center'>
                            <View className='w-[20%] h-10 items-center justify-center'>
                                <Text className='text-pastel-black font-pBold' style={{fontSize: scale(20)}}>{co}</Text>
                    
                            </View>
                            <View className='flex-1 h-full px-2'>
                                <Text className='font-pBold text-pastel-black text-[16px]'>Carbon Monoxide</Text>
                                <Text className='font-pRegular text-pastel-black text-[10px]'>Carbon Monoxide (CO) is a colorless, odorless gas that can be harmful when inhaled in large amounts.</Text>
                            </View> 
                            <View className='w-[20%] h-full items-center justify-center'>
                                <View className='h-16 w-16 rounded-full bg-pastel-black items-center justify-center'>
                                    <Image source={require('../../../assets/icons/smoke-white.png')} className='h-10 w-10'/>
                                </View>
                            </View>
                        </View>
                        <View className='bg-pastel-green h-28 rounded-custom p-4 flex-row items-center'>
                            <View className='w-[20%] h-10 items-center justify-center'>
                                <Text className='text-pastel-black font-pBold' style={{fontSize: scale(20)}}>{no2}</Text>
                   
                            </View>
                            <View className='flex-1 h-full px-2'>
                                <Text className='font-pBold text-pastel-black text-[16px]'>Nitrogen Dioxide</Text>                           
                                <Text className='font-pRegular text-pastel-black text-[10px]'>Nitrogen Dioxide (NO₂) is a gaseous air pollutant produced by combustion processes. Can cause respiratory issues.</Text>
                            </View> 
                            <View className='w-[20%] h-full items-center justify-center'>
                                <View className='h-16 w-16 rounded-full bg-pastel-black items-center justify-center'>
                                    <FontAwesome5 name="wind" size={scale(28)} color="#fff" />
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
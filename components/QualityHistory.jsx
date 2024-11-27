import { View, Text } from 'react-native'
import React from 'react'

const QualityHistory = () => {
  return (
    <View className="w-full flex-row bg-white h-20 rounded-2xl p-2" style={{shadowColor:'#d9d9d9', elevation: 4}}>
        <View className="w-[20%]">
            <Text className="text-primary-MAIN text-[45px] text-center font-pBold">23</Text>
        </View>
        <View className="w-[80%] flex-col items-end">
            <View className="h-[50%] w-[75%] flex-row flex-wrap justify-end" style={{gap: 6}}>
                <Text className="text-[10px] text-right font-pRegular flex-none">Temperature: <Text className="text-[10px] font-pSemiBold text-primary-MAIN">50</Text></Text>
                <Text className="text-[10px] text-right font-pRegular flex-none">Humidity: <Text className="text-[10px] font-pSemiBold text-primary-MAIN">50</Text></Text>
                <Text className="text-[10px] text-right font-pRegular flex-none">C02: <Text className="text-[10px] font-pSemiBold text-primary-MAIN">50</Text></Text>
                <Text className="text-[10px] text-right font-pRegular flex-none">C03: <Text className="text-[10px] font-pSemiBold text-primary-MAIN">50</Text></Text>
                <Text className="text-[10px] text-right font-pRegular flex-none">C04: <Text className="text-[10px] font-pSemiBold text-primary-MAIN">50</Text></Text>
                <Text className="text-[10px] text-right font-pRegular flex-none">C06: <Text className="text-[10px] font-pSemiBold text-primary-MAIN">50</Text></Text>
            </View>
            <View className="h-[50%] justify-end">
                <Text className="text-right font-pRegular text-[10px]">11-20-2024 10:23 AM</Text>
            </View>
        </View>  
    </View>
  )
}

export default QualityHistory
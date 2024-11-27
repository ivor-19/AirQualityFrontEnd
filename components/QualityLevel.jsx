import { View, Text } from 'react-native'
import React from 'react'
import RemixIcon from 'react-native-remix-icon'

const QualityLevel = ({ label, barLevel, ppmNum}) => {
  return (
    <View className="bg-white h-28 w-[178px] rounded-[20px] p-4"
           style={{shadowColor:'#000', elevation: 6}}
    >
      <View className='flex-2 flex-row justify-between items-center w-full'>
        <Text className='text-left text-[11px] flex-1 font-pRegular'>Level of {label}</Text>
        <Text className='text-right flex-1 font-pRegular'>
          <RemixIcon name='ri-drop-line' color='#4a2bf6'></RemixIcon>
        </Text>
      </View>
      <View className='flex-1 py-2'>
        <View className='w-full h-3 rounded-full bg-primary-OP '>
            <View className={`h-full rounded-full bg-primary-MAIN`} style={{ width: `${barLevel}%` }}></View>
        </View>
      </View>
      <View className="flex-row justify-between items-center w-full">
        <Text className="text-left flex-1 text-xl font-pBold text-primary-MAIN">{ppmNum}21 ppm</Text>
        {/* <Text className="text-right flex-1">PPM</Text> */}
      </View>
    </View>
  )
}

export default QualityLevel
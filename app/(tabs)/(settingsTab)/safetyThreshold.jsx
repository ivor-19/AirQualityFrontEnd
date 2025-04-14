import { View, Text, ScrollView } from 'react-native'
import { scale } from 'react-native-size-matters'
import CustomHeader from '../../../components/CustomHeader'
import { router } from 'expo-router'

const safetyThreshold = () => {
  const thresholds = [
    {
      range: '0-10',
      color: '#DAF7A6',
      label: 'Very Low',
      condition: 'Minimal Risk',
      details: 'Conditions are stable and low-risk, requiring minimal attention.',
      attention: 'Alert: Air quality is optimal, no health concerns. Outdoor activities can continue as usual.'
    },
    {
      range: '11-40',
      color: '#008000',
      label: 'Low',
      condition: 'Mild',
      details: 'Conditions are mostly safe with mild risk; basic precautions are enough.',
      attention: 'Advisory: Air quality is acceptable. Minor precautions may be needed for sensitive individuals.'
    },
    {
      range: '41-90',
      color: '#FFC300',
      label: 'Moderate',
      condition: 'Raised',
      details: 'Conditions could lead to mild health effects under certain circumstances.',
      attention: 'Warning: Air quality is moderate. Sensitive individuals may experience mild symptoms; consider limiting strenuous outdoor activities.'
    },
    {
      range: '91-200',
      color: '#C70039',
      label: 'High',
      condition: 'Serious',
      details: 'Conditions may cause health issues if ignored; increased vigilance and precautions are necessary.',
      attention: 'Warning: Air quality is high. People with respiratory or heart conditions should go far from areas with poor air quality to reduce exposure.'
    },
    {
      range: '201-280',
      color: '#900C3F',
      label: 'Very High',
      condition: 'Severe',
      details: 'Conditions are highly dangerous and can cause serious harm if not carefully managed.',
      attention: 'Advisory: Air quality is very hazardous. Everyone should avoid outdoor activities. Vulnerable individuals should stay indoors.'
    },
    {
      range: '281+',
      color: '#581845',
      label: 'Extremely High',
      condition: 'Hazardous',
      details: 'Conditions are extremely dangerous and can lead to serious health issues for everyone',
      attention: 'Emergency: Air quality is critically hazardous. It is strongly advised that everyone stay indoors and take necessary precautions.'
    }
  ]

  return (
    <View className="bg-white p-4 flex-1">
      <CustomHeader title={'AQI Threshold Guide'} showBack={true} onPressBack={() => router.push('settings')}/>    
      <ScrollView showsVerticalScrollIndicator={false}>
        {thresholds.map((item, index) => (
          <View key={index} className="mb-4 border border-gray-200 rounded-lg p-4">
            <View className="flex-row items-center mb-2">
              <View className="w-4 h-4 rounded-sm mr-2" style={{ backgroundColor: item.color }} />
              <Text className="font-pSemiBold">{item.label} ({item.range})</Text>
            </View>
            
            <View className="mb-2">
              <Text className="font-pSemiBold">Condition:</Text>
              <Text className='font-pRegular'>{item.condition}</Text>
            </View>
            
            <View className="mb-2">
              <Text className="font-pSemiBold">Details:</Text>
              <Text className='font-pRegular'>{item.details}</Text>
            </View>
            
            <View>
              <Text className="font-pSemiBold">Health Advisory:</Text>
              <Text className="text-red-600 font-pRegular">{item.attention}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

export default safetyThreshold
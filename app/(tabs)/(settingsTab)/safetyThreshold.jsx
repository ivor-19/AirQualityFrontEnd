import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { scale } from 'react-native-size-matters'
import CustomHeader from '../../../components/CustomHeader'
import { router } from 'expo-router'
import { MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'

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

  const pollutants = [
    {
      name: 'PM2.5',
      description: 'Fine particulate matter smaller than 2.5 micrometers. Can penetrate deep into lungs and even enter bloodstream.',
      sources: 'Vehicle emissions, wildfires, power plants, industrial processes',
      effects: 'Respiratory issues, cardiovascular problems, reduced lung function',
      icon: <MaterialIcons name="blur-on" size={24} color="#555" />,
      unit: 'µg/m³'
    },
    {
      name: 'PM10',
      description: 'Coarse particles smaller than 10 micrometers. Can irritate eyes, nose and throat.',
      sources: 'Dust, pollen, mold, construction sites, agriculture',
      effects: 'Aggravated asthma, bronchitis, other respiratory symptoms',
      icon: <MaterialCommunityIcons name="dots-hexagon" size={24} color="#555" />,
      unit: 'µg/m³'
    },
    {
      name: 'CO',
      description: 'Colorless, odorless gas produced by incomplete burning of carbon-based fuels.',
      sources: 'Vehicle exhaust, gas stoves, generators, tobacco smoke',
      effects: 'Headaches, dizziness, nausea, impaired vision and coordination at high levels',
      icon: <MaterialCommunityIcons name="molecule-co" size={24} color="#555" />,
      unit: 'ppm'
    },
    {
      name: 'NO₂',
      description: 'Reddish-brown gas that forms from emissions of cars, trucks and power plants.',
      sources: 'Combustion processes, especially diesel engines, power generation',
      effects: 'Lung irritation, increased asthma symptoms, susceptibility to respiratory infections',
      icon: <FontAwesome5 name="wind" size={24} color="#555" />,
      unit: 'ppb'
    }
  ]

  return (
    <View className="bg-gray-50 flex-1">
      <CustomHeader 
        title={'AQI Threshold Guide'} 
        showBack={true} 
        onPressBack={() => router.push('sSettings')}
      />    
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: scale(16) }}
      >
        {/* AQI Thresholds Section */}
        <View className="mb-8">
          <Text className="font-pBold text-2xl text-gray-900 mb-4">Air Quality Index (AQI) Thresholds</Text>
          <Text className="font-pRegular text-gray-600 mb-6">
            The AQI scale helps you understand what air quality means for your health. 
            Higher values mean greater health concerns.
          </Text>
          
          <View className="space-y-4">
            {thresholds.map((item, index) => (
              <View 
                key={index} 
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
              >
                <View className="flex-row items-center mb-3">
                  <View 
                    className="w-5 h-5 rounded-sm mr-3" 
                    style={{ backgroundColor: item.color }} 
                  />
                  <Text className="font-pBold text-lg text-gray-900">
                    {item.label} <Text className="font-pRegular text-gray-500">({item.range})</Text>
                  </Text>
                </View>
                
                <View className="mb-3">
                  <Text className="font-pSemiBold text-gray-700 mb-1">Condition:</Text>
                  <Text className='font-pRegular text-gray-800'>{item.condition}</Text>
                </View>
                
                <View className="mb-3">
                  <Text className="font-pSemiBold text-gray-700 mb-1">Details:</Text>
                  <Text className='font-pRegular text-gray-800'>{item.details}</Text>
                </View>
                
                <View className="bg-red-50 p-3 rounded-lg">
                  <Text className="font-pSemiBold text-red-700 mb-1">Health Advisory:</Text>
                  <Text className="text-red-700 font-pRegular">{item.attention}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Pollutants Section */}
        <View className="mt-2">
          <Text className="font-pBold text-2xl text-gray-900 mb-4">Common Air Pollutants</Text>
          <Text className="font-pRegular text-gray-600 mb-6">
            Understanding these pollutants will help you interpret air quality data and protect your health.
          </Text>

          <View className="space-y-5">
            {pollutants.map((pollutant, index) => (
              <View 
                key={index} 
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
              >
                <View className="flex-row items-center mb-4">
                  <View className="bg-gray-100 p-2 rounded-lg mr-3">
                    {pollutant.icon}
                  </View>
                  <View>
                    <Text className="font-pBold text-lg text-gray-900">
                      {pollutant.name}
                    </Text>
                    <Text className="font-pRegular text-sm text-gray-500">
                      Measurement unit: {pollutant.unit}
                    </Text>
                  </View>
                </View>
                
                <Text className="font-pRegular text-gray-800 mb-4">{pollutant.description}</Text>
                
                <View className="mb-3">
                  <Text className="font-pSemiBold text-gray-700 mb-1">Main Sources:</Text>
                  <Text className="font-pRegular text-gray-800">{pollutant.sources}</Text>
                </View>
                
                <View>
                  <Text className="font-pSemiBold text-gray-700 mb-1">Health Effects:</Text>
                  <Text className="font-pRegular text-gray-800">{pollutant.effects}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Footer Note */}
        <View className="mt-8 mb-4 p-4 bg-blue-50 rounded-lg">
          <Text className="font-pSemiBold text-blue-800 text-center">
            For more detailed information, consult your local environmental protection agency.
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default safetyThreshold
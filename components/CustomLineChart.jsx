import React from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';  
import { useAQI } from '../context/AQIContext';
const CustomPieChart = () => {
  const { pm2_5, co, no2 } = useAQI();

  const data = [
    {
      name: 'PM 2.5',
      population: pm2_5,
      color: '#e8a09a', // Red color
      legendFontColor: '#1d1c1a',
      legendFontSize: 12,
    },
    {
      name: 'CO',
      population: co,
      color: '#9bbfe0', // Blue color
      legendFontColor: '#1d1c1a',
      legendFontSize: 12,
    },
    {
      name: 'NO2',
      population: no2,
      color: '#c6d68f', // Green color
      legendFontColor: '#1d1c1a',
      legendFontSize: 12,
    },
    {
      name: '???',
      population: 0,
      color: '#fbe29f', // Yellow color
      legendFontColor: '#1d1c1a',
      legendFontSize: 12,
    },
  ];

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(29, 28, 26, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForLabels: {
      fontFamily: 'PoppinsSemiBold', 
      fontSize: 12, 
      color: 'gray',
    },
  };

  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
      <PieChart
        data={data} 
        width={Dimensions.get('window').width - 40} 
        height={180} 
        chartConfig={{
          backgroundColor: "transparent", 
          backgroundGradientFrom: "#ffffff", 
          backgroundGradientTo: "#000000",
          color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForLabels: {
            fontFamily: 'PoppinsRegular', 
          },
        }}
        accessor="population" 
        backgroundColor="transparent"
        paddingLeft="15" 
        center={[10, 10]} 
        hasLegend={true} 
      />
    </ScrollView>
  );
};

export default CustomPieChart;

import React from 'react';
import { ScrollView, Text, View, useWindowDimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';


const CustomLineChart = () => {
  const {width} = useWindowDimensions();

  const data = {
    labels: ['00', '01', '02', '03', '04', 'Now'],
    datasets: [
      {
        data: [30, 50, 40, 70, 120], // Example PM2.5 levels
        strokeWidth: 2,
        color: (opacity = 1) => `rgba(105, 149, 113, ${opacity})`, // 
        fillShadow: false, // Remove the fill under the line
      },
      {
        data: [10, 35, 25, 45, 90], // Example PM10 levels
        strokeWidth: 2,
        color: (opacity = 1) => `rgba(105, 149, 113, ${opacity})`, // 
      },
    ],
  };


  const chartConfig = {
    backgroundColor: '#000',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '2',
      strokeWidth: '0',
      stroke: '#ffffff',
    },
    propsForLabels: {
      fontFamily: 'Poppins-Regular', // Applying the custom font to the labels
      fontSize: 10, // Set font size for labels
    },
    color:() => '#699571',

  };

  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
      <LineChart
        data={data}
        width={width} // Adjust width for mobile screens
        height={160}
        chartConfig={chartConfig}
        bezier // Smooth curved line
        style={{ marginVertical: 8,}}
        withInnerLines={false}
      />
    </ScrollView>
  );
};

export default CustomLineChart;

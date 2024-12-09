import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import RemixIcon from 'react-native-remix-icon'
import { router } from 'expo-router'
import { Image } from 'expo-image'
import axios from 'axios'
import { ContributionGraph } from 'react-native-chart-kit'
import { scale } from 'react-native-size-matters'
import { useAuth } from '../../../context/AuthContext'
import CustomHeader from '../../../components/CustomHeader'

const history = () => {
  const { user, renderUserData } = useAuth();

  const {width} = useWindowDimensions();
  const [loading, setLoading] = useState(true);
  const [dataHistory, setDataHistory] = useState([]);
  const [dateFilter, setDateFilter] = useState([]);
 
  const [pressed, setPressed] = useState(null);
  const togglePressed = (id) => {
    setPressed(prevState => prevState === id ? null : id)
  }

  const [dateFilterExpand, setDateFilterExpand] = useState(false);
  const toggleFilterExpand = () => {
    setDateFilterExpand(prevState => !prevState);
  }

  const [graphExpand, setGraphExpand] = useState(true);
  const toggleGraphExpand = () => {
    setGraphExpand(prevState => !prevState);
  }

  const [selectedDate, setSelectedDate] = useState('All');
  const handleSelectedDate = (txtdate) => {
    setSelectedDate(txtdate);
    setDateFilterExpand(prevState => !prevState);
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://air-quality-back-end-v2.vercel.app/history');

        const filteredDataBasedOnUser = response.data.filter(item => item.scanned_by === user.username)
        setDataHistory(filteredDataBasedOnUser.reverse());

        //Extract the dates for filter
        const allDates = response.data.map(item => item.date);
        const uniqueDates = [...new Set(allDates)];
        setDateFilter(uniqueDates);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching data: ', error)
        setLoading(false);
      }
    }
    fetchData();

      // Set an interval to fetch data every 2 seconds
    const interval = setInterval(fetchData, 2000);

    // Cleanup the interval on unmount
    return () => clearInterval(interval);
  }, [])

  const filteredDate = selectedDate === 'All' ? dataHistory : dataHistory.filter(item => item.date === selectedDate)

  const dateCount = dataHistory.reduce((acc, item) => {
    const date = item.date;
    if (acc[date]){
      acc[date]++;
    }
    else{
      acc[date] = 1;
    }
    return acc;
  }, {})

  const graphDate = Object.keys(dateCount).map((date) => ({
    date,
    count: dateCount[date],
  }))
  
  
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <CustomHeader title={'Data History'}/>
      {loading ? (
        <View className='h-full items-center my-20'>
          <Image source={require('../../../assets/animated/loading.gif')} className='h-[30%] w-[30%]'/>
          <Text className='font-pRegular text-gray-500 text-[12px]'>One moment, fetching the details...</Text>
        </View>
      ) : dataHistory.length === 0 ? (
        <View className='h-full items-center my-20' style={{gap: 12}}>
          <Image source={require('../../../assets/images/oops_empty.png')} className='h-[300px] w-[300px]'/>
          <Text className='font-pRegular text-gray-500 text-[12px]'>Oops, we couldn't find any history data.</Text>
        </View>
      ) : (
        <View className='flex-1'> 
          {/* Graph */}
          {graphExpand ? (
            <View className='rounded-custom p-4 border-b-[1px] border-gray-100'>
              <View className='bg-pastel-black rounded-custom border-2 border-gray-100 h-60 relative' style={{shadowColor: 'gray', elevation: 4}}>
                <ContributionGraph
                  values={graphDate}
                  endDate={new Date()}
                  numDays={105}
                  width={scale(300)}
                  height={200}
                  squareSize={14}
                  gutterSize={6}
                  chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#1d1c1a',
                    backgroundGradientTo: '#1d1c1a',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(210, 231, 214, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                    propsForLabels: {
                      fontFamily: 'PoppinsSemiBold', 

                    },
                  }}
                />
                <View className='absolute bottom-4 w-full z-10 px-[30px] flex-row items-center justify-end' style={{gap: 6}}>
                  <Text className='font-pRegular text-gray-400 text-[10px]'>Less</Text>
                  <View className='h-[12px] w-[12px] bg-[#d2e7d640]'></View>
                  <View className='h-[12px] w-[12px] bg-[#d2e7d660]'></View>
                  <View className='h-[12px] w-[12px] bg-[#d2e7d6a2]'></View>
                  <View className='h-[12px] w-[12px] bg-[#d2e7d6dc]'></View>
                  <View className='h-[12px] w-[12px] bg-[#d2e7d6]'></View>
                  <Text className='font-pRegular text-gray-400 text-[10px]'>More</Text>
                </View>
              </View>
          </View>
          ) : null}
          {/* Date Filter */}
          <View className='h-10 justify-center relative border-b-[1px] border-gray-100 px-4 flex-row items-center justify-betweenr'>
            <TouchableOpacity onPress={toggleGraphExpand} className='bg-gray-100 h-[80%] rounded-custom w-[50%] items-center justify-center' activeOpacity={0.6}>
                <Text className='text-center font-pRegular text-[12px]'>{graphExpand ? 'Hide Graph' : 'Show Graph'}</Text>
            </TouchableOpacity>
            <View className='h-[80%] w-[50%] flex-col justify-center relative'>
              <TouchableOpacity onPress={toggleFilterExpand} className='bg-pastel-green h-full rounded-[20px] w-full px-4 flex-row items-center justify-between' activeOpacity={0.8}>
                <Text className='font-pRegular'>{selectedDate}</Text>
                <RemixIcon name={dateFilterExpand ? 'ri-arrow-drop-up-line' : 'ri-arrow-drop-down-line'}/>
              </TouchableOpacity>
              {dateFilterExpand ? (
                <View className='bg-pastel-green w-full h-auto rounded-[20px] absolute top-10 z-10 px-4 py-2' style={{shadowColor: 'gray', elevation: 4}}>
                  {dateFilter.map((date, index) => {
                    return(
                      <TouchableOpacity key={index} onPress={() => handleSelectedDate(date)} className='h-6'>
                        <Text className='font-pRegular text-[12px]'>{date}</Text>
                      </TouchableOpacity>
                    )
                  })}
                  <TouchableOpacity onPress={() => handleSelectedDate('All')} className='h-6'>
                    <Text className='font-pRegular text-[12px]'>All</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          </View>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View className='flex-1 w-full p-4' style={{gap: 12}}>
              {filteredDate.map((data, index) => {
                return(
                    <TouchableOpacity key={index} onPress={() => togglePressed(data._id)} className={`bg-white rounded-custom border-2 border-gray-100 'h-24'`} activeOpacity={0.7} style={{shadowColor: 'gray', elevation: 4}}>
                      <View className='rounded-custom p-4 flex-row items-center'>
                        <View className='w-[20%] h-10 items-center justify-center'>
                            <Text className='text-pastel-black font-pBold text-[30px]'>{data.aqi}</Text>
                            <Text className='text-pastel-black font-pRegular text-[10px]'>AQI score</Text>
                        </View>
                        <View className='flex-1 h-full px-2'>
                            <Text className='font-pBold text-pastel-black text-[16px]'>{data.date}</Text>
                            <Text className='font-pRegular text-pastel-black text-[10px]'>Timestamp: {data.timestamp}</Text>
                            <View className='flex-row items-center' style={{gap: 4}}>
                              <Text className='font-pRegular text-pastel-black text-[10px]'>Risk Indicator:</Text>
                              <View className={`h-[6px] w-[6px] rounded-full
                                ${
                                  data.aqi <= 50 ? 'bg-[#DAF7A6]' : 
                                  data.aqi <= 100 ? 'bg-[#008000]' : 
                                  data.aqi <= 150 ? 'bg-[#FFC300]' :
                                  data.aqi <= 200 ? 'bg-[#C70039]' :
                                  data.aqi <= 300 ? 'bg-[#900C3F]' :
                                  'bg-[#581845]' 
                                
                                }`}>
                              </View> 
                              <Text className='font-pRegular text-pastel-black text-[10px]'>
                                {
                                  data.aqi <= 50 ? 'Very Low' :
                                  data.aqi <= 100 ? 'Low' : 
                                  data.aqi <= 150 ? 'Moderate' :
                                  data.aqi <= 200 ? 'High' :
                                  data.aqi <= 300 ? 'Very High' :
                                  'Extremely High' 

                                }
                              </Text>
                            </View>
                        </View> 
                        <View className='h-full py-2'>
                          <Text className='font-pRegular text-[8px]'>{data.scanned_using_model}</Text>
                        </View>
                      </View>
                      {pressed === data._id ? (
                        <View className='bg-white rounded-custom h-24 p-4 w-full flex-row'>
                          <View className='w-[50%]'>
                            <Text className='font-pRegular'>PM2.5: <Text className='font-pBold'>{data.pm2_5}</Text></Text>
                            <Text className='font-pRegular'>CO: <Text className='font-pBold'>{data.co}</Text></Text>
                          </View>
                          <View className='w-[50%]'>
                            <Text className='font-pRegular'>NO2: <Text className='font-pBold'>{data.no2}</Text></Text>
                            <Text className='font-pRegular'>???: <Text className='font-pBold'>???</Text></Text>
                          </View>
                        </View>
                      ): null}
                      
                  </TouchableOpacity>
                  )
              })}
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  )
}

export default history
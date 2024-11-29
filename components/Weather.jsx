import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'expo-image'

const Weather = ({  }) => {
    const [time, setTime] = useState('');
    const [weather, setWeather] = useState('');
    const [weatherImage, setWeatherImage] = useState('');

    // const weatherCondition = [
    //     {id: 1, condition: 'Partly cloudy outside', image: require('../assets/animated/clouds.gif')},
    //     {id: 2, condition: 'Showers in the area', image: require('../assets/animated/rainy.gif')},
    //     {id: 3, condition: 'Stormy weather and thunder', image: require('../assets/animated/thunderstorm.gif')},
    //     {id: 4, condition: 'Mostly sunny outside', image: require('../assets/animated/sunny.gif')},
    //     {id: 5, condition: 'Cloudy with breaks of sunshine', image: require('../assets/animated/cloudy-sunny.gif')},
    //     {id: 6, condition: 'Misty night skies', image: require('../assets/animated/cloudy-night.gif')},
    // ]

    useEffect(() => {
        const interval = setInterval(() => {
          const currentTime = new Date();
          const hours = currentTime.getHours();
          const minutes = currentTime.getMinutes();
          const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
          setTime(formattedTime);
        }, 1000);
        return () => clearInterval(interval);
    }, [])

    return (
        <View className="h-24 rounded-[28px] bg-white items-center justify-end p-4 flex-row border-2 border-gray-100" style={{shadowColor: 'gray', elevation: 4 }}>  
            <View className='h-full w-[20%] items-center justify-center'>
                <Image source={require('../assets/animated/clouds.gif')} className='h-16 w-16'/>
            </View>
            <View className='h-full flex-1 px-2'>
                <Text className='font-pSemiBold text-[16px] text-pastel-black '>Santiago, Malolos</Text>
                <Text className='font-pRegular text-[10px] text-gray-500'>Partly cloudy outside</Text>
                <Text className='font-pSemiBold text-[10px] text-pastel-black '>{time}</Text>
            </View>
            <View className='h-full w-[20%] items-center justify-center'>
                <Text className='font-pBold text-[36px]'>28°</Text>
            </View>
        </View>
    )
}

export default Weather
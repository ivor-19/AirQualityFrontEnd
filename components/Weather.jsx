import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Image } from 'expo-image';

const Weather = () => {
    const [time, setTime] = useState('');
    const [weather, setWeather] = useState('');
    const [weatherImage, setWeatherImage] = useState(require('../assets/animated/sunny.gif')); // Default image
    const [temperature, setTemperature] = useState('');
    const [location, setLocation] = useState(''); // Default location
    const [locationInput, setLocationInput] = useState('Malolos');
    const [error, setError] = useState('');

    const apiKey = '25c30d10e8144335aff14750242511'; // Replace with your actual API key

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getPosition);
        }
    }
    const getPosition= (pos)=>{
        return pos.coords;
    }

    useEffect(() => {
        const fetchWeather = async () => {
         
            
            try {
                const response = await axios.get(
                    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${locationInput}`
                );
                console.log(response.data); // Debugging: Log the response data to the console
                console.log("getPOs", getPosition.longtitude)
                const data = response.data;
                if (data && data.location && data.current) {
                    setLocation(data.location.name + ', ' + data.location.region);
                    setWeather(data.current.condition.text);
                    setTemperature(data.current.temp_c + '°');
                    setWeatherImage(getWeatherImage(data.current.condition.text));
                } else {
                    setError('Invalid weather data');
                }
            } catch (err) {
                console.error(err); // Debugging: Log the error
                setError('Error fetching weather data.');
            }
        };
        fetchWeather();
    }, [])

    // Determine the weather image based on the condition
    const getWeatherImage = (condition) => {
        if (condition === 'Partly cloudy') {
            return require('../assets/animated/clouds.gif');
        } else if (condition === 'Showers') {
            return require('../assets/animated/rainy.gif');
        } else if (condition === 'Thunderstorm') {
            return require('../assets/animated/thunderstorm.gif');
        } else if (condition === 'Sunny') {
            return require('../assets/animated/sunny.gif');
        } else if (condition === 'Cloudy') {
            return require('../assets/animated/cloudy-sunny.gif');
        } else if (condition === 'Mist') {
            return require('../assets/animated/cloudy-night-v2.gif');
        }
        return require('../assets/animated/sunny.gif'); // Default image
    };

    // Set time every second
    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = new Date();
            const hours = currentTime.getHours();
            const minutes = currentTime.getMinutes();
            const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
            setTime(formattedTime);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View className="h-24 rounded-[28px] bg-white items-center justify-end p-4 flex-row border-2 border-gray-100" style={{shadowColor: 'gray', elevation: 4 }}>  
            <View className='h-full w-[20%] items-center justify-center'>
                <Image source={weatherImage} className='h-16 w-16'/>
            </View>
            <View className='h-full flex-1 px-2'>
                <Text className='font-pSemiBold text-[16px] text-pastel-black '>{location}</Text>
                <Text className='font-pRegular text-[10px] text-gray-500'>{weather}</Text>
                <Text className='font-pSemiBold text-[10px] text-pastel-black '>{time}</Text>
            </View>
            <View className='h-full w-[20%] items-center justify-center'>
                <Text className='font-pBold text-[36px]'>{temperature}</Text>
            </View>
        </View>
    );
};

export default Weather;

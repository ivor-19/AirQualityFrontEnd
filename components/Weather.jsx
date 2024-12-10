import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Image } from 'expo-image';
import { scale } from 'react-native-size-matters';

const Weather = () => {
    const [loading, setLoading] = useState(true);
    const [time, setTime] = useState('');
    const [weather, setWeather] = useState('');
    const [weatherImage, setWeatherImage] = useState(''); // Default image
    const [temperature, setTemperature] = useState('');
    const [location, setLocation] = useState(''); // Default location
    const [locationInput, setLocationInput] = useState('Malolos');
    const [error, setError] = useState('');

    const apiKey = '25c30d10e8144335aff14750242511'; // Replace with your actual API key

    // const getLocation = () => { // For further development
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(getPosition);
    //     }
    // }
    // const getPosition= (pos)=>{
    //     return pos.coords;
    // }

    useEffect(() => {
        const fetchWeather = async () => {   
            try {
                const response = await axios.get(
                    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${locationInput}`
                );
                console.log(response.data); // Debugging: Log the response data to the console
                // console.log("getPOs", getPosition.longtitude)
                const data = response.data;
                if (data && data.location && data.current) {
                    setLocation(data.location.name + ', ' + data.location.region);
                    setWeather(data.current.condition.text);
                    setTemperature(data.current.temp_c + '°');
                    setWeatherImage(getWeatherImage(data.current.condition.text));
                } else {
                    setError('Invalid weather data');
                }
                setLoading(false);
            } catch (err) {
                console.error(err); // Debugging: Log the error
                setError('Error fetching weather data.');
                setLoading(false);
            }
        };
        fetchWeather();
    }, [])

    // Determine the weather image based on the condition
    const getWeatherImage = (condition) => {
        if (condition.toLowerCase() === 'overcast with many clouds' || condition === 'overcast') {
            return require('../assets/animated/clouds.gif');
        } else if (condition.toLowerCase() === 'patchy rain nearby' || condition === 'light rain' || condition === 'moderate rain' || condition === 'heavy rain' || condition === 'very heavy rain' || condition === 'showers') {
            return require('../assets/animated/rainy.gif');
        } else if (condition.toLowerCase === 'thunderstorm') {
            return require('../assets/animated/thunderstorm.gif');
        } else if (condition.toLowerCase() === 'clear') {
            return require('../assets/animated/sunny.gif');
        } else if (condition.toLowerCase() === 'partly cloudy') {
            return require('../assets/animated/cloudy-sunny.gif');
        } else if (condition.toLowerCase() === 'mist') {
            return require('../assets/animated/foggy.gif');
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
        <>
            {loading ? (
                <View className="rounded-[28px] bg-white items-center justify-center p-4 flex-row border-2 border-gray-100" style={{height: scale(80), shadowColor: 'gray', elevation: 4 }}>
                    <ActivityIndicator size="large" color="#1d1c1a" />
                </View>  
            ):(
                <View className="rounded-[28px] bg-white items-center justify-end p-4 flex-row border-2 border-gray-100" style={{height: scale(80), shadowColor: 'gray', elevation: 4 }}>  
                    <View className='h-full w-[20%] items-center justify-center'>
                        <Image source={weatherImage} style={{height: scale(52), width: scale(52)}}/>
                    </View>
                    <View className='h-full flex-1 px-2'>
                        <Text className='font-pSemiBold text-pastel-black' style={{fontSize: scale(12)}}>{location}</Text>
                        <Text className='font-pRegular text-gray-500' style={{fontSize: scale(8)}}>{weather}</Text>
                        <Text className='font-pSemiBold text-pastel-black' style={{fontSize: scale(8)}}>{time}</Text>
                    </View>
                    <View className='h-full items-center justify-center'>
                        <Text className='font-pSemiBold' style={{fontSize: scale(24)}}>{temperature}</Text>
                    </View>
                </View>
            )}
        </>
    );
};

export default Weather;

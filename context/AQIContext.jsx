import React, { createContext, useState, useContext, useEffect } from 'react';

// Create Context
const AQIContext = createContext();

// Custom hook to access AQI context
export const useAQI = () => useContext(AQIContext);

// Provider to wrap around the app and provide the AQI state
export const AQIProvider = ({ children }) => {
  const [aqi, setAqi] = useState(0); // Initial AQI value
  const [pm2_5, setPm2_5] = useState(0);
  const [co, setC0] = useState(0);
  const [no2, setN02] = useState(0);
  const [timestamp, setTimestamp] = useState('');

  // IndicatorColor = IC
  // IndicatorLabel = IL

  let aqiIC = '';
  let aqiIL = '';
  
  let coIC = '';
  let coIL = '';

  let no2IC = '';
  let no2IL = '';

  // AQI
  if(aqi <= 50){
    aqiIC= '#DAF7A6';
    aqiIL= 'Very Low';
  }
  else if(aqi <= 100) {
    aqiIC= '#FFC300';
    aqiIL= 'Low';
  }
  else if(aqi <= 150) {
    aqiIC= '#FF5733';
    aqiIL= 'moderate';
  }
  else if(aqi <= 200) {
    aqiIC= '#C70039';
    aqiIL= 'High';
  }
  else if(aqi <= 300) {
    aqiIC= '#900C3F';
    aqiIL= 'Very High';
  }
  else{
    aqiIC= '#581845';
    aqiIL= 'Extremely High';
  }

  // CO
  if(co <= 9){
    coIC= '#DAF7A6';
    coIL= 'Very Low';
  }
  else if(co <= 35) {
    coIC= '#FFC300';
    coIL= 'Low';
  }
  else if(co <= 50) {
    coIC= '#FF5733';
    coIL= 'moderate';
  }
  else if(co <= 100) {
    coIC= '#C70039';
    coIL= 'High';
  }
  else if(co <= 200) {
    coIC= '#900C3F';
    coIL= 'Very High';
  }
  else{
    coIC= '#581845';
    coIL= 'Extremely High';
  }

  // NO2
  if(no2 <= 53){
    no2IC= '#DAF7A6';
    no2IL= 'Very Low';
  }
  else if(no2 <= 100) {
    no2IC= '#FFC300';
    no2IL= 'Low';
  }
  else if(no2 <= 200) {
    no2IC= '#FF5733';
    no2IL= 'moderate';
  }
  else if(no2 <= 300) {
    no2IC= '#C70039';
    no2IL= 'High';
  }
  else if(no2 <= 400) {
    no2IC= '#900C3F';
    no2IL= 'Very High';
  }
  else{
    no2IC= '#581845';
    no2IL= 'Extremely High';
  }


  return (
    <AQIContext.Provider value={{ aqi, setAqi, pm2_5, setPm2_5, co, setC0, no2, setN02, aqiIC, aqiIL, coIC, coIL, no2IC, no2IL, timestamp, setTimestamp}}>
      {children}
    </AQIContext.Provider>
  );
};

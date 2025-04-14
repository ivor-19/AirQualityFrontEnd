import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAqiIndicator, getCoIndicator, getNo2Indicator, getPm2_5Indicator, getPm10Indicator } from '../utils/aqiUtils';

const AQIContext = createContext();
export const useAQI = () => useContext(AQIContext);

export const AQIProvider = ({ children }) => {
  const [aqi, setAqi] = useState(0); 
  const [pm2_5, setPm2_5] = useState(0);
  const [pm10, setPm10] = useState(0);
  const [co, setC0] = useState(0);
  const [no2, setN02] = useState(0);
  const [timestamp, setTimestamp] = useState('');
  const [date, setDate] = useState('');
  const [scanned_by, setScannedBy] = useState('');
  const [scanned_using_model, setScannedUsingModel] = useState('');

  // IndicatorColor = IC
  // IndicatorLabel = IL

  const { color: aqiIC, label: aqiIL, condition: aqiCon ,details: aqiDet, attention: aqiAttention } = getAqiIndicator(aqi);
  const { color: coIC, label: coIL } = getCoIndicator(co);
  const { color: no2IC, label: no2IL } = getNo2Indicator(no2);
  const { color: pm2_5IC, label: pm2_5IL } = getPm2_5Indicator(pm2_5);
  const { color: pm10IC, label: pm10IL } = getPm10Indicator(pm10);

  const resetAQI = () => {
    setAqi(0);
    setPm2_5(0);
    setPm10(0);
    setC0(0);
    setN02(0);
    setTimestamp('');
    setDate('');
    setScannedBy('');
    console.log('resetted')
  };

  return (
    <AQIContext.Provider value={{ 
        date, setDate,
        timestamp, setTimestamp,
        aqi, setAqi, 
        pm2_5, setPm2_5, 
        pm10, setPm10, 
        co, setC0, 
        no2, setN02, 
        scanned_by, setScannedBy,
        scanned_using_model, setScannedUsingModel,
        aqiIC, aqiIL, aqiCon, aqiDet, aqiAttention,
        pm2_5IC, pm2_5IL, 
        pm10IC, pm10IL, 
        coIC, coIL, 
        no2IC, no2IL, 
        resetAQI,
        
      }}>
      {children}
    </AQIContext.Provider>
  );
};

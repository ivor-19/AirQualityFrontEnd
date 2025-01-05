export const getAqiIndicator = (aqi) => {
  if(aqi <= 50){
    return { 
      color: '#DAF7A6', 
      label: 'Very Low', 
      condition: 'Minimal Risk', 
      details: 'Conditions are stable and low-risk, requiring minimal attention.', 
      attention: 'Alert: Air quality is optimal, no health concerns. Outdoor activities can continue as usual.'
    };
  } else if(aqi <= 100) {
    return { 
      color: '#008000', 
      label: 'Low', 
      condition: 'Mild', 
      details: 'Conditions are mostly safe with minimal risk; basic precautions are enough.', 
      attention: 'Advisory: Air quality is acceptable. Minor precautions may be needed for sensitive individuals.'
    };
  } else if(aqi <= 150) {
    return { 
      color: '#FFC300', 
      label: 'Moderate', 
      condition: 'Raised', 
      details: 'Conditions could lead to mild health effects under certain circumstances.', 
      attention: 'Warning: Air quality is moderate. Sensitive individuals may experience mild symptoms; consider limiting strenuous outdoor activities.'
    };
  } else if(aqi <= 200) {
    return { 
      color: '#C70039', 
      label: 'High', 
      condition: 'Serious', 
      details: 'Conditions may cause health issues if ignored; increased vigilance and precautions are necessary.', 
      attention: 'Warning: Air quality is poor. People with respiratory or heart conditions should reduce outdoor exposure.'
    };
  } else if(aqi <= 300) {
    return { 
      color: '#900C3F', 
      label: 'Very High', 
      condition: 'Severe', 
      details: 'Conditions are highly dangerous and can cause serious harm if not carefully managed.', 
      attention: 'Advisory: Air quality is very hazardous. Everyone should avoid outdoor activities. Vulnerable individuals should stay indoors.'
    };
  } else {
    return { 
      color: '#581845', 
      label: 'Extremely High', 
      condition: 'Hazardous', 
      details: 'Conditions are extremely dangerous and can lead to serious health issues for everyone', 
      attention: 'Emergency: Air quality is critically hazardous. It is strongly advised that everyone stay indoors and take necessary precautions.'
    };
  }
};

export const getCoIndicator = (co) => {
  if(co <= 9){
    return { color: '#DAF7A6', label: 'Very Low' };
  } else if(co <= 35) {
    return { color: '#008000', label: 'Low' };
  } else if(co <= 50) {
    return { color: '#FFC300', label: 'Moderate' };
  } else if(co <= 100) {
    return { color: '#C70039', label: 'High' };
  } else if(co <= 200) {
    return { color: '#900C3F', label: 'Very High' };
  } else {
    return { color: '#581845', label: 'Extremely High' };
  }
};

export const getNo2Indicator = (no2) => {
  if(no2 <= 53){
    return { color: '#DAF7A6', label: 'Very Low' };
  } else if(no2 <= 100) {
    return { color: '#008000', label: 'Low' };
  } else if(no2 <= 200) {
    return { color: '#FFC300', label: 'Moderate' };
  } else if(no2 <= 300) {
    return { color: '#C70039', label: 'High' };
  } else if(no2 <= 400) {
    return { color: '#900C3F', label: 'Very High' };
  } else {
    return { color: '#581845', label: 'Extremely High' };
  }
};

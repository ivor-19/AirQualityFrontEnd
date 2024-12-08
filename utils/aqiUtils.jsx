export const getAqiIndicator = (aqi) => {
  if(aqi <= 50){
    return { color: '#DAF7A6', label: 'Very Low', condition : 'Minimal Risk', details: 'Conditions are stable and low-risk, requiring minimal attention.'};
  } else if(aqi <= 100) {
    return { color: '#008000', label: 'Low', condition : 'Mild', details: 'Conditions are mostly safe with minimal risk; basic precautions are enough.'};
  } else if(aqi <= 150) {
    return { color: '#FFC300', label: 'Moderate', condition : 'Raised', details: 'Conditions could lead to mild health effects under certain circumstances.'};
  } else if(aqi <= 200) {
    return { color: '#C70039', label: 'High', condition : 'Serious', details: 'Conditions may cause health issues if ignored; increased vigilance and precautions are necessary.'};
  } else if(aqi <= 300) {
    return { color: '#900C3F', label: 'Very High', condition : 'Severe', details: 'Conditions are highly dangerous and can cause serious harm if not carefully managed.'};
  } else {
    return { color: '#581845', label: 'Extremely High', condition : 'Hazardous', details: 'Conditions are extremely dangerous and can lead to serious health issues for everyone'};
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

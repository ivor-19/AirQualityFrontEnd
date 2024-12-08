import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import OnboardingItems from './OnboardingItems'
import ConnectAsset from './ConnectAsset';
import * as SecureStore from 'expo-secure-store'; // Import SecureStore
import { router } from 'expo-router';

const Onboarding = () => {
    const [showConnect, setShowConnect] = useState(false);

    const slides = [
        {id: 1, title: 'Breathe Easy, Live Healthier', description: 'Track and improve the air quality around you with real-time data, insights, and personalized recommendations.', image: require('../assets/images/slide1.png')},
        {id: 2, title: 'Stay Informed, Stay Safe', description: 'Get accurate, up-to-the-minute readings of air pollution levels wherever you are.', image: require('../assets/images/slide2.png')},
        {id: 3, title: 'Health Tips Just for You', description: 'Get expert advice and actionable tips to protect your health and breathe easier, based on your unique air quality data.', image: require('../assets/images/slide3.png')},
        {id: 4, title: 'Act on What You See', description: 'Make informed decisions—whether it’s improving indoor air quality or finding cleaner outdoor spaces to breathe.', image: require('../assets/images/slide4.png')},
    ]

    const renderSlides = ({item, index}) => {
      const isLastSlide = index === slides.length - 1;
      
        return(
          <OnboardingItems
            title={item.title}
            description={item.description}
            image={item.image}
            showButton={isLastSlide}
            setShowConnect={setShowConnect}
          />
        )
    }


  return (
    <>
      <FlatList
        data={slides}
        renderItem={renderSlides}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />
      {showConnect ? (
       <ConnectAsset />
      ) : null}
    </>
  )
}

export default Onboarding
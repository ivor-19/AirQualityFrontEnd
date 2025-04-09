import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import OnboardingItems from './OnboardingItems'
import ConnectAsset from './ConnectAsset';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import Modal from "react-native-modal";
import ChangePassFirst from './ChangePassFirst';

const { width } = Dimensions.get('window');

const Onboarding = () => {
  const [showConnect, setShowConnect] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  
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
  
  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setCurrentIndex(index);
  }
  
  // Render the dot indicators
  const renderDotIndicators = () => {
    // if (currentIndex === slides.length - 1) {
    //   return null;
    // }

    return (
      <View style={styles.dotContainer}>
        {slides.map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.dot, 
              { backgroundColor: index === currentIndex ? '#84af8c' : '#CCCCCC' }
            ]} 
          />
        ))}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList 
        ref={flatListRef}
        data={slides}
        renderItem={renderSlides}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      
      {renderDotIndicators()}
      
      {showConnect ? (
        <Modal 
          isVisible={showConnect} 
          animationIn="fadeIn" 
          animationOut="fadeOut" 
          useNativeDriver={true}
          deviceHeight={1}
          deviceWidth={1}
        >
          <ChangePassFirst />
        </Modal>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center'
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  }
});

export default Onboarding
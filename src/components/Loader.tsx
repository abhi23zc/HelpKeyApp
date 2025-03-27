import React, { useState, useEffect } from 'react';
import { View, Animated, Easing } from 'react-native';
import { useSelector } from 'react-redux';

const Loader = () => {
  const [rotateValue] = useState(new Animated.Value(0));
  const [scaleValue] = useState(new Animated.Value(0));
  const { isLoading } = useSelector(state => state.authReducer);

  useEffect(() => {
    // Rotation animation
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    );

    // Scale pulse animation
    const scaleAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease, // Changed from easeInOutQuad to ease
          useNativeDriver: true
        }),
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.ease, // Changed from easeInOutQuad to ease
          useNativeDriver: true
        })
      ])
    );

    // Start both animations if loading
    if (isLoading) {
      rotateAnimation.start();
      scaleAnimation.start();
    }

    return () => {
      rotateAnimation.stop();
      scaleAnimation.stop();
    };
  }, [isLoading]);

  // Interpolate rotation and scale
  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  const scale = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.3]
  });

  if (!isLoading) return null;

  return (
    <View className="absolute inset-0 items-center justify-center bg-white bg-opacity-70 z-50">
      <Animated.View
        style={{
          width: 100,
          height: 100,
          transform: [
            { rotate },
            { scale }
          ]
        }}
      >
        {/* Simplified cube faces with compatible transforms */}
        {[0, 1, 2, 3, 4, 5].map((face) => (
          <Animated.View
            key={face}
            style={{
              position: 'absolute',
              width: 50,
              height: 50,
              backgroundColor: `hsl(${face * 60}, 70%, 60%)`,
              opacity: 0.8,
              transform: [
                { translateX: 25 },
                { translateY: 25 },
                { rotate: `${face * 60}deg` } // Changed from rotateX to rotate
              ]
            }}
          />
        ))}
      </Animated.View>
    </View>
  );
};

export default Loader;
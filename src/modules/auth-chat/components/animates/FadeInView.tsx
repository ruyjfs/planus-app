import React from 'react';
import {Animated} from 'react-native';

export default ({style = '', children}) => {
  const [fadeAnim] = React.useState(new Animated.Value(0)); // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View // Special animatable View
      style={{
        ...style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {children}
    </Animated.View>
  );
};

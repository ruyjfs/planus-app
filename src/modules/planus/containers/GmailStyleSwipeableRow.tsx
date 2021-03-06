import React, {Component} from 'react';
import {Animated, StyleSheet, Text, View, I18nManager} from 'react-native';

import {RectButton} from 'react-native-gesture-handler';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export default ({
  children,
  left = {icon: 'archive', color: ''},
  onLeft = () => {},
  onRight = () => {},
}) => {
  const [swipeableRow, setSwipeableRow] = React.useState(null);

  const renderLeftActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 80],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    console.log(progress, '->>>', scale, progress > 0.16);
    return (
      <RectButton style={styles.leftAction} onPress={close}>
        <AnimatedIcon
          name={left.icon}
          size={30}
          color="#fff"
          style={[styles.actionIcon, {transform: [{scale}]}]}
        />
      </RectButton>
    );
  };
  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <RectButton style={styles.rightAction} onPress={close}>
        <AnimatedIcon
          name="delete-forever"
          size={30}
          color="#fff"
          style={[styles.actionIcon, {transform: [{scale}]}]}
        />
      </RectButton>
    );
  };
  const updateRef = (ref) => {
    setSwipeableRow(ref);
    // this._swipeableRow = ref;
  };

  const close = () => {
    if (swipeableRow !== null) {
      swipeableRow.close();
    }
  };

  return (
    <Swipeable
      ref={updateRef}
      friction={2}
      leftThreshold={80}
      rightThreshold={40}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      onSwipeableLeftOpen={() => {
        close();
        onLeft();
      }}
      onSwipeableRightOpen={() => {
        close();
        onRight();
      }}>
      {children}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#388e3c',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
  },
  actionIcon: {
    width: 30,
    marginHorizontal: 10,
  },
  rightAction: {
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    backgroundColor: '#dd2c00',
    flex: 1,
    justifyContent: 'flex-end',
  },
});

import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getStatusBarHeight, getBottomSpace} from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

export default ({children}) => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Container>
        <SafeAreaView>{children}</SafeAreaView>
      </Container>
    </>
  );
};

const Container = styled(LinearGradient).attrs({
  start: {x: 0, y: 0},
  end: {x: 0.5, y: 1.5},
  colors: ['#FFE6FF', '#E6FFFF', '#E6E6FF', '#E6FFE6', '#FFFFE6', '#FFE7E7'],
})`
  background-color: #ffb01c;
  padding-top: ${getStatusBarHeight()};
  padding-bottom: ${getBottomSpace()};
  align-items: center;
  justify-content: center;
  width: 100%;
`;

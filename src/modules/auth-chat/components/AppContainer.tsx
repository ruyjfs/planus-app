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
  colors: ['#FF6345', '#FF0274', '#E94D91', '#FF95EA'],
})`
  background-color: #ffb01c;
  /* padding-top: ${getStatusBarHeight()}; FICANDO TECLADO EM CIMA NO IPHONE*/
  padding-bottom: ${getBottomSpace()};
  align-items: center;
  justify-content: center;
`;

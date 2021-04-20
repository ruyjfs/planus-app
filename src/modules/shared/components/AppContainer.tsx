import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getStatusBarHeight, getBottomSpace} from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

import logo from '~/assets/images/Religare5003.png';
import {topHeigth, bottomHeigth} from '~/modules/shared/helpers/AppContainer';

const Logo = styled.ImageBackground`
  /* flex: 1; */
  /* size: 50%; */
  height: 400px;
  width: 400px;
  /* width: 100%;
  height: 100%; */
  opacity: 0.15;
  align-self: center;
  position: absolute;
`;

export default ({
  children,
  color = 'pink',
  paddingTop = false,
  showImage = true,
}: any) => {
  const colors: any = {
    pink: ['#FF6345', '#FF0274', '#E94D91', '#FF95EA'],
    orange: ['#ffb01c', '#ff5b3a', '#ff5b3a'],
    // orange: ['#fbd27d', '#FFAF00', '#FF6345', '#FF6345'],
    green: ['#00A247', '#02E265', '#00A247'],
    purple: ['#C774FD', '#A82CFB', '#7100BC', '#3F0167'],
    blue: ['#00BCD4', '#4BBAFF', '#009EFF', '#006BAD'],
    red: ['#ff5f6d', '#FF1E1E'],
    // red: ['#ffc371', '#FF7442', '#ff5f6d', '#FF1E1E'],
    white: ['#FFE6FF', '#E6FFFF', '#E6E6FF', '#E6FFE6', '#FFFFE6', '#FFE7E7'],
    beige: ['#FDF5E7', '#FDF5E7', '#FEFDDE'],
  };
  const [statusBarColor, setStatusBarColor] = useState('light-content');

  // useEffect(() => {
  //   console.log(color);
  // });

  return (
    <>
      <StatusBar
        barStyle={color === 'beige' ? 'dark-content' : 'light-content'}
      />
      <Container
        colors={colors[color]}
        style={{
          paddingTop: paddingTop ? topHeigth : 0,
          // paddingBottom: paddingTop ? 0 : getBottomSpace(),
        }}>
        {showImage && <Logo source={logo} />}
        {children}
        {/* <SafeAreaView></SafeAreaView> */}
      </Container>
    </>
  );
};

const Container = styled(LinearGradient).attrs({
  start: {x: 0, y: 0},
  end: {x: 0.5, y: 1.5},
  // colors: ['#ff512f', '#dd2476', '#ef629f', '#FFF',],
  // colors: ['#FF9E4E', '#dd2476', '#ef629f', '#FFFFFF',],
  // colors: ['#dd2476', '#ef629f', '#FF9E4E', '#9A5100',],
  // colors: ['#FF86B9', '#ef629f', '#dd2476', '#dd2476'],
})`
  background-color: #ffb01c;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

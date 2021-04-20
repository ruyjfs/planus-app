import {Platform} from 'react-native';
import {
  getStatusBarHeight,
  getBottomSpace,
  isIphoneX,
} from 'react-native-iphone-x-helper';

function topHeigthApple() {
  const heigthIpad = Platform.isPad ? 14 : 10;
  const heigthIphone = isIphoneX() ? 18 : 4;
  return 30 + heigthIphone + heigthIpad;
}

function bottomHeigthApple() {
  const heigthIpad = Platform.isPad ? 14 : 10;
  const heigthIphone = isIphoneX() ? 18 : 4;
  return 30 + heigthIphone + heigthIpad;
}

export const topHeigth = Platform.select({
  // ios: getStatusBarHeight() + topHeigthApple(),
  ios: getStatusBarHeight() + 10,
  android: 56,
});

export const bottomHeigth = Platform.select({
  ios: getBottomSpace() + bottomHeigthApple(),
  android: 56,
});

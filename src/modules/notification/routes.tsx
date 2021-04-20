import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {BlurView} from '@react-native-community/blur';
import styled from 'styled-components/native';

import NotificationDetail from '~/modules/publication/views/Detail';
import AppDrawerMenu from '~/modules/shared/components/AppDrawerMenu';

import Notifications from './views/Notifications';

const TopContainer = styled.View`
  flex: 1;
  background-color: #00000030;
`;

export default ({navigation}) => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        // backgroundColor: 'red',
      },
    }}>
    <Stack.Screen
      name="Notifications"
      component={Notifications}
      options={{
        title: 'Acontecimentos',
        headerTintColor: '#FFF',
        headerTransparent: true,
        headerLeft: () => AppDrawerMenu(navigation),
        headerBackground: () => (
          <TopContainer />
          // <BlurView
          //   style={{
          //     width: '100%',
          //     height: 85,
          //     position: 'absolute',
          //   }}
          //   // blurType="extraDark"
          //   blurType="dark"
          //   // blurType="light"
          //   // blurType="regular"
          //   blurAmount={10}
          // />
        ),
        // headerStyle: {
        //   position: 'absolute',
        //   backgroundColor: '#00000030',
        // },
      }}
    />
    <Stack.Screen
      name="NotificationDetail"
      component={NotificationDetail}
      options={{
        title: '',
        headerTransparent: true,
        headerLeft: () => AppDrawerMenu(navigation),
      }}
    />
  </Stack.Navigator>
);

const Stack = createStackNavigator();

// export default createStackNavigator({
//   Notification: {
//     screen: Notifications,
//     navigationOptions: params => ({
//       title: 'Acontecimentos',
//       headerBackTitle: ' ',
//       headerTintColor: '#FFF',
//       headerTransparent: true,
//       headerLeft: Menu(params),
//       headerStyle: {
//         backgroundColor: '#00000030',
//         //   borderBottomColor: '#ffb01c',
//         //   borderBottomWidth: 3,
//       },
//       tabBarVisible: false,
//     }),
//   },
//   NotificationDetail: {
//     screen: NotificationDetail,
//     navigationOptions: () => ({
//       title: ' ',
//       headerBackTitle: ' ',
//       headerTintColor: '#FFF',
//       headerTransparent: true,
//       headerStyle: {
//         backgroundColor: '#00000030',
//       },
//       tabBarVisible: false,
//     }),
//   },
// });

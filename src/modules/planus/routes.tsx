import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BlurView} from '@react-native-community/blur';
import {Platform} from 'react-native';
import styled from 'styled-components/native';

import AppDrawerMenu from '~/modules/shared/components/AppDrawerMenu';

import Tasks from './pages/Tasks';
import Perfil from './pages/Perfil';
import Write from './pages/Write';
import Backlog from './pages/Backlog';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BacklogScreen = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Backlog"
      component={Backlog}
      options={{
        title: 'Backlog',
        headerTintColor: '#FFF',
        headerTransparent: true,
        headerLeft: () => AppDrawerMenu(navigation),
      }}
    />
  </Stack.Navigator>
);
const HomeScreen = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={Tasks}
      options={{
        title: 'Tarefas',
        headerTintColor: '#FFF',
        headerTransparent: true,
        headerLeft: () => AppDrawerMenu(navigation),
      }}
    />
  </Stack.Navigator>
);
const WriteScreen = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Write"
      component={Write}
      options={{
        title: '',
        headerTintColor: '#FFF',
        headerTransparent: true,
      }}
    />
  </Stack.Navigator>
);
const PerfilScreen = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="PerfilScreen"
      component={Perfil}
      options={{
        title: 'No mundo',
        headerTintColor: '#FFF',
        headerTransparent: true,
        headerLeft: () => AppDrawerMenu(navigation),
      }}
    />
  </Stack.Navigator>
);

const HomeTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      tabBarOptions={{
        showLabel: false,
        activeTintColor: Platform.OS === 'ios' ? '#FFF' : '#FF2D94',
        inactiveTintColor: '#00000050',
        style: {
          // padding: 5,
          // backgroundColor: 'transparent',
          // position: 'absolute',
        },
      }}
      tabBar={(props) => <TabBarComponent {...props} />}>
      {/* <Tab.Screen
        name="Backlog"
        component={BacklogScreen}
        options={{
          tabBarIcon: (params) =>
            TabBarIcon({
              ...params,
              ...{name: 'package-variant-closed'},
            }),
        }}
      /> */}
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: (params) =>
            TabBarIcon({
              ...params,
              ...{name: 'format-list-checkbox'},
            }),
        }}
      />
      <Tab.Screen
        name="WriteScreen"
        component={WriteScreen}
        options={{
          tabBarIcon: (params) =>
            TabBarIcon({...params, ...{name: 'lead-pencil'}}),
        }}
      />
      {/* <Tab.Screen
        name="PerfilScreen"
        component={PerfilScreen}
        options={{
          tabBarIcon: (params) => TabBarIcon({...params, ...{name: 'account'}}),
        }}
      /> */}
    </Tab.Navigator>
  );
};

const RootStack = createStackNavigator();

export default ({route}) => (
  <RootStack.Navigator>
    <RootStack.Screen
      name="HomeTab"
      component={HomeTab}
      options={{
        title: ' ',
        headerTintColor: '#FFF',
        headerTransparent: true,
      }}
    />
  </RootStack.Navigator>
);

const TabBarIcon = ({focused, color, name}) => {
  if (name === 'package-variant-closed' && focused) {
    name = 'package-variant';
  }

  return (
    <Icon
      name={name}
      color={color}
      size={focused ? 30 : 25}
      style={
        focused
          ? {
              // color: 'red',
              shadowColor: '#fff',
              shadowRadius: 6,
              shadowOpacity: 100,
              shadowOffset: {width: 0, height: 0},
            }
          : {}
      }
    />
  );
};

//   const TabBarComponent = (props) => {
//     if (Platform.OS === 'android') {
//       return (
//         <LinearGradient
//           start={{x: 0, y: 0}}
//           end={{x: 1, y: 2}}
//           colors={[
//             '#FFE6FF',
//             '#E6FFFF',
//             '#E6E6FF',
//             '#E6FFE6',
//             '#FFFFE6',
//             '#FFE7E7',
//           ]}>
//           <BottomTabBar
//             {...props}
//             style={{
//               backgroundColor: 'transparent',
//               elevation: 0,
//             }}
//           />
//         </LinearGradient>
//       );
//     }

//     return (
//       <>
//         <BlurView
//           style={{
//             width: '100%',
//             height: 82,
//             position: 'absolute',
//             bottom: 0,
//             left: 0,
//           }}
//           blurType="light"
//           blurAmount={50}
//         />
//         <BottomTabBar
//           {...props}
//           style={{
//             padding: 5,
//             backgroundColor: 'transparent',
//             position: 'absolute',
//             borderTopColor: 'transparent',
//           }}
//         />
//       </>
//     );
//   };

const TabBarComponent = (props) => {
  if (Platform.OS === 'android') {
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 2}}
        colors={[
          '#FFE6FF',
          '#E6FFFF',
          '#E6E6FF',
          '#E6FFE6',
          '#FFFFE6',
          '#FFE7E7',
        ]}>
        <BottomTabBar
          {...props}
          style={{
            backgroundColor: 'transparent',
            elevation: 0,
          }}
        />
      </LinearGradient>
    );
  }

  return (
    <>
      <BlurView
        style={{
          width: '100%',
          height: 82,
          position: 'absolute',
          bottom: 0,
          left: 0,
        }}
        blurType="light"
        blurAmount={50}
      />
      <BottomTabBar
        {...props}
        style={{
          padding: 5,
          backgroundColor: 'transparent',
          position: 'absolute',
          borderTopColor: 'transparent',
        }}
      />
    </>
  );
};

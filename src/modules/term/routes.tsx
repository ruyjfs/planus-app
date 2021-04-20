import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AppDrawerMenu from '~/modules/shared/components/AppDrawerMenu';
import Main from './views/Main';

export default ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Main"
      component={Main}
      options={{
        title: '',
        headerTransparent: true,
        headerLeft: () => AppDrawerMenu(navigation, '#444'),
      }}
    />
  </Stack.Navigator>
);

const Stack = createStackNavigator();

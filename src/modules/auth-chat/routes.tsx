import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Main from './views/Main';

export default () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Main" component={Main} />
  </Stack.Navigator>
);

const Stack = createStackNavigator();

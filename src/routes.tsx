import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
// import {useSelector, useDispatch} from 'react-redux';

import Loading from '~/modules/shared/pages/Loading';
import Logout from '~/modules/shared/pages/Logout';
import AuthChat from '~/modules/auth-chat';
import Planus from '~/modules/planus';
// import PublicationPresentation from '~/modules/publication/views/Presentation';
// import Text from '~/modules/text';
// import Feedback from '~/modules/feedback';
// import Help from '~/modules/help';
// import Term from '~/modules/term';
// import User from '~/modules/user';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => (
  <Drawer.Navigator>
    <Drawer.Screen
      name="Planus"
      component={Planus}
      options={{title: 'Principal'}}
    />
    {/* <Drawer.Screen
      name="Configuration"
      component={User}
      options={{title: 'Configurações'}}
    />
    <Drawer.Screen name="Help" component={Help} options={{title: 'Sobre'}} />
    <Drawer.Screen name="Term" component={Term} options={{title: 'Termo'}} /> */}
    <Drawer.Screen name="Logout" component={Logout} options={{title: 'Sair'}} />
  </Drawer.Navigator>
);

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" mode="card">
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="AuthChat" component={AuthChat} />
        <Stack.Screen
          name="App"
          component={App}
          options={{
            animationTypeForReplace: 'pop',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

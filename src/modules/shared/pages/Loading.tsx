import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StatusBar} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';

import Auth from '~/services/firebase/Auth';
import Users from '~/services/firebase/Users';
// import Notification from '~/modules/notification/views/Main';

import AppContainer from '../components/AppContainer';

export default ({navigation}: any) => {
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);

  async function verifyAuth() {
    let authUser = await Auth.user();
    if (authUser) {
      if (auth === null || !auth.id) {
        let user = await Users.getByUid(authUser.uid);
        dispatch({
          type: 'AUTH_ADD',
          payload: user,
        });
      }

      // return navigation.navigate('User');
      // return navigation.navigate('PublicationView');
      // return navigation.navigate('Story');
      // return navigation.navigate('User');
      // return navigation.navigate('PublicationPresentation', {
      //   screen: 'Main',
      //   params: {parentId: 'eGcRM258yw7Bths2Brkw'},
      // });
      return navigation.replace('App', {
        screen: 'Publication',
        params: {screen: 'World'},
      });
      // return navigation.navigate('Feedback');
      // return navigation.navigate('Text');
    }
    return navigation.replace('AuthChat');
  }

  useEffect(() => {
    verifyAuth();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      {/* <Notification navigation={navigation} /> */}
      <AppContainer showImage={true} color="orange">
        <Container>
          <ActivityIndicator size="large" color="#FFF" />
          {/* <Text style={styles.text}>Loading...</Text> */}
          <Text>Só um instante...</Text>
        </Container>
      </AppContainer>
    </>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  min-width: 100%;
`;

const Text = styled.Text`
  font-size: 18px;
  margin: 15px;
  color: #fff;
`;

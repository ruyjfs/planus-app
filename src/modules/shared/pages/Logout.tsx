import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import styled from 'styled-components';
import {ActivityIndicator, StatusBar} from 'react-native';

import AppContainer from '../components/AppContainer';

import Auth from '~/services/firebase/Auth';

export default ({navigation}: any) => {
  const dispatch = useDispatch();

  async function logout() {
    dispatch({type: 'AUTH_RESET'});
    dispatch({type: 'AUTH_CHAT_RESET'});
    Auth.logout();
    await AsyncStorage.clear();
    setTimeout(() => navigation.navigate('AuthChat'), 200);
    return false;
  }

  useEffect(() => {
    logout();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <AppContainer color="orange" showImage={true}>
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

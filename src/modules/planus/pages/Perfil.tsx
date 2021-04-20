import React from 'react';
import styled from 'styled-components/native';
import {Alert, StatusBar} from 'react-native';

import AppContainer from '~/modules/shared/components/AppContainer';

export default () => {
  return (
    <AppContainer showImage={false} color="pink">
      <StatusBar barStyle={'dark-content'} />
      <Container>
        <Text>PERFIL</Text>
      </Container>
    </AppContainer>
  );
};

const Container = styled.View``;
const Text = styled.Text`
  color: #fff;
`;

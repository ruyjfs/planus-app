import React from 'react';
import styled from 'styled-components/native';
import {StatusBar} from 'react-native';

import AppContainer from '~/modules/shared/components/AppContainer';

export default () => {
  return (
    <AppContainer color="purple" showImage={false}>
      <StatusBar barStyle={'light-content'} />
      <Container>
        <Text>Home</Text>
      </Container>
    </AppContainer>
  );
};

const Container = styled.View``;
const Text = styled.Text`
  color: #fff;
`;

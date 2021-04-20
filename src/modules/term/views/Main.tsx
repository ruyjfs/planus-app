import React from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';

import AppContainer from '~/modules/shared/components/AppContainer';
import Term from '../components/Term';

export default () => {
  // Regra dos 3 no começo da descrição, algo do tipo Amor, Fraternidade e Caridade.
  return (
    <AppContainer color="white" paddingTop={true}>
      <Container>
        <Term />
      </Container>
    </AppContainer>
  );
};

const Container = styled.View`
  /* background-color: red; */
  flex: 1;
  min-width: 100%;
  padding: 0 10px;
`;

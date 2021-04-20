import React from 'react';
import styled from 'styled-components/native';
import {Modal} from 'react-native';

import AppContainer from '~/modules/shared/components/AppContainer';
import AppButton from './AppButton';
import Term from './Term';
import {SafeAreaView} from 'react-native-safe-area-context';

export default ({visible = false, setVisible = (param: boolean) => {}}) => {
  return (
    <Modal animationType="slide" visible={visible}>
      <AppContainer color="white">
        <SafeAreaView>
          <Container>
            <Term />
            <AppButton label="Entendi" onPress={() => setVisible(false)} />
          </Container>
        </SafeAreaView>
      </AppContainer>
    </Modal>
  );
};

const Container = styled.View`
  padding: 0 10px;
`;

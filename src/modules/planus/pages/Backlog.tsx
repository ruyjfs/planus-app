import React, {useState, useEffect, useMemo} from 'react';
import styled from 'styled-components/native';
import {StatusBar} from 'react-native';

import AppContainer from '~/modules/shared/components/AppContainer';
import Tasks from '../containers/Tasks';
import WeekList from '../components/WeekList';

export default ({navigation}: any) => {
  return (
    <AppContainer color="orange" showImage={false} paddingTop={true}>
      <Container>
        {/* <WeekList /> */}
        <Tasks navigation={navigation} />
      </Container>
    </AppContainer>
  );
};

const Container = styled.View`
  padding-top: 48px;
`;
const Text = styled.Text`
  color: #fff;
`;

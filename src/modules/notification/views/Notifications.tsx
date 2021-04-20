import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {FlatList, ScrollView, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import _ from 'lodash';
import {BlurView} from '@react-native-community/blur';

import ServiceMain from '~/services/firebase/Notifications';

import NotificationListItem from './components/ListItem';
import AppContainer from '~/modules/shared/components/AppContainer';

export default ({navigation}) => {
  const data = useSelector(state => state.notifications.all);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [stopLoad, setStopLoad] = useState(false);

  async function refreshList() {
    setRefreshing(true);
    setPage(1);
    await loadData();
    setRefreshing(false);
  }

  async function load() {
    setPage(page + 1);
    if (stopLoad === false) {
      setLoading(true);
      await loadData();
    }
    setLoading(false);
  }

  async function loadData() {
    // let test = _.values(await ServiceMain.getAll(null)).length;
    // console.log('AAAAAA', test);
    let valuesFromApi = await ServiceMain.getByDocId(auth.id, page);
    let totalFromApi = _.values(valuesFromApi).length;
    if (total == totalFromApi) setStopLoad(true);
    // console.log('LOAD', page, totalFromApi, total);
    setTotal(totalFromApi);
    // console.log(valuesFromApi);

    await dispatch({type: 'NOTIFICATIONS_ADD', values: valuesFromApi});
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      {/* <TutorialModal /> */}
      <AppContainer color="purple" paddingTop={true}>
        <Container>
          <FlatList
            data={_.keys(data)}
            keyExtractor={item => String(item)}
            // onEndReached={() => load()}
            onEndReachedThreshold={0}
            onRefresh={refreshList}
            refreshing={refreshing}
            ListFooterComponent={
              loading ? (
                <Loading />
              ) : (
                <Footer
                  style={{
                    backgroundColor:
                      Platform.OS === 'ios' ? '#00000050' : 'transparent',
                    height: Platform.OS === 'ios' ? 84 : 0,
                  }}
                />
              )
            }
            renderItem={({item}) =>
              item && (
                <NotificationListItem
                  id={item}
                  redirectRouteName="Detail"
                  navigation={navigation}
                />
              )
            }
          />
        </Container>
        {/* <BlurView
          style={{
            width: '100%',
            height: 90,
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          blurType="dark"
          blurAmount={10}
        /> */}
        {/* <TopView /> */}
      </AppContainer>
    </>
  );
};

const Footer = styled.View`
  /* position: absolute; */
  /* top: 0; */
  height: 84;
  flex: 1;
  width: 100%;
`;

const TopView = styled.View`
  position: absolute;
  top: 0;
  height: 90;
  background-color: #00000050;
  flex: 1;
  width: 100%;
`;

const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  min-width: 100%;
  /* margin-top: 39px; */
`;

const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#FFF',
})`
  margin: 30px 0;
`;

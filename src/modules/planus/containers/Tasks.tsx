import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {FlatList, Platform, View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import Types from '~/redux/sagas/types';

import TasksItem from './TasksItem';
import TasksS from './TasksS';

export default ({navigation}: any) => {
  const list = useSelector((state: any) => state.tasks.allId);
  const auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  async function refreshList() {
    setRefreshing(true);
    setPage(1);
    dispatch({
      type: Types.TASKS.LOAD,
      payload: {page, userId: auth.id},
    });
    setRefreshing(false);
  }

  async function load() {
    if (list.length === 0) {
      dispatch({
        type: Types.TASKS.LOAD,
        payload: {page, userId: auth.id},
      });
      console.log('load()');
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <Container>
      <TasksS />
      {/* <FlatList
        data={list}
        keyExtractor={(item) => String(item)}
        onEndReached={() => load()}
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
          item && <TasksItem id={item} navigation={navigation} />
        }
      /> */}
    </Container>
  );
};

const Footer = styled.View`
  height: 84px;
  flex: 1;
  width: 100%;
`;

const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  min-width: 100%;
`;

const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#FFF',
})`
  margin: 30px 0;
  padding-bottom: ${Platform.OS === 'ios' ? 84 : 0}px;
`;

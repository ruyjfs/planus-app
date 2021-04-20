import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, I18nManager} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  FlatList,
  RectButton,
  TouchableOpacity,
} from 'react-native-gesture-handler';

//  To toggle LTR/RTL uncomment the next line
// I18nManager.allowRTL(true);

import AppleStyleSwipeableRow from './AppleStyleSwipeableRow';
import GmailStyleSwipeableRow from './GmailStyleSwipeableRow';
import {AppContainer} from '~/modules/shared/components';

import Types from '~/redux/sagas/types';

const Row = ({item}: any) => (
  <RectButton style={styles.rectButton} onPress={() => alert(item.from)}>
    <Container>
      {/* <Text style={styles.fromText}>{item.from}</Text> */}
      <Icon
        name={item?.done ? 'check-circle' : 'circle-outline'}
        size={32}
        style={{marginHorizontal: 5, color: '#fff'}}
      />
      <Text numberOfLines={2} style={styles.messageText}>
        {item?.text}
      </Text>
      {/* <Text style={styles.dateText}>
      {item.when} {'❭'}
    </Text> */}
    </Container>
  </RectButton>
);

const SwipeableRow = ({item, index, onLeft, onRight}) => {
  return (
    <GmailStyleSwipeableRow onLeft={onLeft} onRight={onRight}>
      <Row item={item} />
    </GmailStyleSwipeableRow>
  );
};
// const SwipeableRow = ({item, index}) => {
//   if (index % 2 === 0) {
//     return (
//       <AppleStyleSwipeableRow>
//         <Row item={item} />
//       </AppleStyleSwipeableRow>
//     );
//   } else {
//     return (
//       <GmailStyleSwipeableRow>
//         <Row item={item} />
//       </GmailStyleSwipeableRow>
//     );
//   }
// };

export default ({navigation, id}: any) => {
  const list = useSelector((state: any) => state.tasks.allId);
  const listById = useSelector((state: any) => state.tasks.byId);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  async function refreshList() {
    setRefreshing(true);
    setPage(1);
    dispatch({
      type: Types.TASKS.LOAD,
      payload: {page},
    });
    setRefreshing(false);
  }

  async function load() {
    if (list.length === 0) {
      dispatch({
        type: Types.TASKS.LOAD,
        payload: {page},
      });
      console.log('load()');
    }
  }

  useEffect(() => {
    load();
  }, []);

  function onLeft(item) {
    console.log('DONE');
    item.done = !item.done;
    dispatch({
      type: Types.TASKS.SAVE,
      payload: item,
      id: item.id,
    });
  }
  function onRight(item) {
    console.log('DELETED');
    dispatch({
      type: Types.TASKS.DEL,
      id: item.id,
    });
  }

  return (
    <FlatList
      data={list}
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
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({item, index}) => (
        // <SwipeableRow
        //   item={listById[item]}
        //   index={index}
        //   onLeft={onLeft}
        //   onRight={onRight}
        // />
        <GmailStyleSwipeableRow
          onLeft={() => onLeft(listById[item])}
          left={{icon: listById[item]?.done ? 'circle-outline' : 'check'}}
          onRight={() => onRight(listById[item])}>
          <Row item={listById[item]} />
        </GmailStyleSwipeableRow>
      )}
      keyExtractor={(item, index) => `message ${index}`}
    />
  );
};

const Footer = styled.View`
  height: 84px;
  flex: 1;
  width: 100%;
`;

const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#FFF',
})`
  margin: 30px 0;
  padding-bottom: ${Platform.OS === 'ios' ? 84 : 0}px;
`;

const Container = styled.View`
  /* padding: 0 20px; */
  flex-direction: row;
  /* background-color: #00000030; */
  margin: 0;
  max-width: 100%;
`;

const styles = StyleSheet.create({
  rectButton: {
    flex: 1,
    // height: 80,
    height: 60,
    paddingVertical: 10,
    paddingHorizontal: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#00000030',
    alignItems: 'center',
  },
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: StyleSheet.hairlineWidth,
  },
  fromText: {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  messageText: {
    color: '#FFF',
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  dateText: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 20,
    top: 10,
    color: '#999',
    fontWeight: 'bold',
  },
});

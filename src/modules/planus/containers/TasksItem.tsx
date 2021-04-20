import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {SwipeListView} from 'react-native-swipe-list-view';

import Swipeable from 'react-native-gesture-handler/Swipeable';

import _ from 'lodash';

import FadeInView from '~/modules/shared/components/FadeInView';

const styles = StyleSheet.create({
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
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
    color: '#999',
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

export default ({navigation, id}: any) => {
  const item = useSelector((state: any) => state.tasks.byId[id]);

  return (
    <FadeInView>
      <Container style={{backgroundColor: '#00000030'}}>
        {/* <Icon
          name={item?.done ? 'check-circle' : 'circle-outline'}
          size={32}
          style={{marginHorizontal: 5, color: '#fff'}}
        /> */}
        <Item>
          {/* {data.title && <TitleText>{data.title}</TitleText>} */}
          {/* {user && user.private === false && ()} */}
          {/* {user.showName && <TitleText>{user?.name}</TitleText>} */}
          {/* {<DescriptionText>{text}</DescriptionText>} */}
          <DescriptionText>{item?.text}</DescriptionText>
          {/* {data.comments && (<Text>{data.comments.length} ajudas</Text>)}
            {data.likes && (<Text>{data.totalLikes} curtiram</Text>)} */}
        </Item>
      </Container>
      {/* <Modal
        navigation={navigation}
        id={id}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        type={item.type}
        redirect={false}
      /> */}
      {/* <ListItem
        data={item}
        authId={auth.id}
        user={user}
        onPress={redirect}
        onLongPress={showModal}
        color="#00000030"
      /> */}
    </FadeInView>
  );
};

const IconCustom = styled(Icon).attrs({size: 18})`
  margin: 0 10px;
  margin-left: 0;
`;

const Divider = styled.View`
  flex: 1;
  width: 100%;
  margin: 5px 0;
  border-width: 0.5px;
  border-color: #ffffff30;
`;

const Actions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-top-width: 0.5px;
  border-top-color: #00000030;
  padding-top: 8px;
`;

const Action = styled.TouchableOpacity`
  flex-direction: row;
  /* margin: 10px 0; */
  /* background-color: red; */
  /* flex: 1; */
  align-items: center;
  justify-content: center;
`;

const ActionText = styled.Text`
  color: #fff;
  margin-right: 10px;
  font-size: 14px;
`;

const Container = styled.TouchableOpacity`
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
  /* border-color: #ff0274;
  border-color: #ff6345; */
  border-color: #fff;
  border-bottom-width: 0.4px;
  /* border-top-width: 0.5px; */
  /* border-left-color: #ff0274; */
  padding: 10px;
  min-width: 100%;
  /* margin-bottom: 15px; */
  /* box-shadow: 0px 0px 3px #444; */
`;

const InfoText = styled.Text`
  color: #ccc;
  margin: 0 5px;
  font-size: 12px;
  margin-bottom: 10px;
`;

const Infos = styled.View`
  /* background-color: red; */
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  /* align-items: flex-end; */
  /* flex: 1; */
  /* align-items: flex-end;
  align-content: flex-end;
  align-self: flex-end; */
  /* min-width: 100%; */
  /*
  border-bottom-color: #eaeae8;
  border-bottom-width: 1px;
  padding: 10px;
  min-width: 100%; */
  /* align-content: space-between; */
`;

const Info = styled.View`
  flex-direction: row;
  align-items: center;
  /* margin: 0 10px; */
  /* background-color: red; */
  /* flex-direction: row; */
  /* align-items: flex-end; */
  /* flex: 1; */
  /* align-items: flex-end;aa
  align-content: flex-end;
  align-self: flex-end; */
  /* min-width: 100%; */
  /*
  border-bottom-color: #eaeae8;
  border-bottom-width: 1px;
  padding: 10px;
  min-width: 100%; */
`;

const Item = styled.View`
  /* background-color: #FFFFFF20; */
  /* background-color: #24140cc4; */
  /* background-color: #00000050; */
  /* background-color: #24140c40; */
  /* border-radius: 10px; */
  /* border: 1px solid #FFF; */
  /* min-height: 30px; */
  /* border-bottom-color: #eaeae8;
  border-bottom-width: 1px;
  padding: 10px;
  min-width: 100%; */
  /* margin: 5px 10px; */
  margin-bottom: 10px;
`;

const TitleText = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const DescriptionText = styled.Text`
  color: #fff;
  /* font-weight: bold; */
  font-size: 14px;
  /* box-shadow: 0px 0px 0px red; */
`;

const Text = styled.Text`
  margin-top: 5px;
  color: #ccc;
`;

// const Item = styled.TouchableOpacity`
//           background-color: #24140cc4;
//           border-radius: 10px;
//           border: 0px solid #FFF;
//           /* min-height: 30px; */
//           padding: 10px;
//           margin: 5px 10px;
//         `;

// const DescriptionText = styled.Text`
//           color: #FFF;
//         /* font-weight: bold; */
//         font-size: 18px;
//         `;

// const Text = styled.Text`
// margin-top: 5px;
// color: #ccc;
// `;

import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';
import _ from 'lodash';

import FadeInView from '~/modules/shared/components/FadeInView';
import ServiceMain from '~/services/firebase/Publications';
import CommentsService from '~/services/firebase/Comments';

import PublicationsService from '~/services/firebase/Publications';
import FeedbacksService from '~/services/firebase/Feedbacks';
import TextsService from '~/services/firebase/Texts';

import Modal from './Modal';
import ListItem from '../../components/ListItem';

export default ({navigation, id, redirectRouteName}) => {
  const item = useSelector(state => state.notifications.all[id]);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  if (!item) {
    return <></>;
  }

  // function setModalDetailVisible() {

  // }

  async function showModal() {
    // item.comments = await CommentsService.getAll({parentId: id});
    // await dispatch({type: 'PUBLICATIONS_ADD', id: id, value: item});
    // setModalVisible(true);
  }

  async function redirect() {
    if (item.data && item.data.parentId && item.data.type) {
      let dataTemp = {};
      dataTemp[item.data.parentId] = await PublicationsService.find(
        item.data.parentId,
      );

      if (!dataTemp[item.data.parentId]) {
        Alert.alert('Poxa, alguém deletou a publicação!');
        return false;
      }

      await dispatch({
        type: 'PUBLICATIONS_ADD',
        values: dataTemp,
      });

      navigation.navigate('Detail', {
        id: item.data.parentId,
      });
    }
  }

  return (
    <FadeInView>
      {/* <Modal
        navigation={navigation}
        id={id}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      /> */}
      <Container>
        <ListItem data={item} onPress={redirect} onLongPress={showModal} />
      </Container>
    </FadeInView>
  );
};

const Container = styled.View`
  /* border-color: #fff; */
  /* border-left-color: red; */
  /* border-left: 2px; */
  /* margin: green; */
`;

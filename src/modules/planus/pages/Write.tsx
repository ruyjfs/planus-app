import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {Alert, StatusBar} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import _ from 'lodash';

import Types from '~/redux/sagas/types';
import AppContainer from '~/modules/shared/components/AppContainer';
import AppWriteForm from '~/modules/shared/components/AppWriteFormWithSelects';

export default ({navigation}) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  // const id = route.params.id;
  // const yearDay = route.params.yearDay;
  // const data = useSelector(state => state.stories.list[id]);
  // const dispatch = useDispatch();
  const [value, setValue] = useState({text: '', category: ''});
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (id && data) {
  //     console.log(id, data);

  //     setValue(data);
  //   }
  // }, []);
  // useEffect(() => {
  //   if (id && data) {
  //     setValue(data);
  //   }
  // }, [id]);

  function onClose() {
    setValue({text: ''});
    return navigation.goBack();
  }

  async function onSubmit(value) {
    if (loading) {
      Alert.alert('Aguarde um instante!');
      return false;
    }

    setLoading(true);
    await dispatch({
      type: Types.TASKS.SAVE,
      payload: {
        text: _.trim(value.text),
        weekDay: value.weekDay,
        priority: value.priority,
        userId: auth.id,
      },
    });
    setLoading(false);
    return onClose();

    // const result = await ServiceMain.save(
    //   {
    //     text: _.trim(value.text),
    //     userId: auth.id,
    //     yearDay: yearDay,
    //   },
    //   id ? id : null,
    // );

    // if (result.status) {
    //   // await dispatch({
    //   //   type: 'STORY_MY_ADD',
    //   //   values: result.data,
    //   //   userId: auth.id,
    //   //   id: result.data.id,
    //   // });
    //   // await dispatch({
    //   //   type: 'STORY_MY_ADD',
    //   //   values: result.data,
    //   //   id: result.data.id,
    //   // });
    //   // await dispatch({
    //   //   type: 'STORY_BY_USER_ADD',
    //   //   values: result.data,
    //   //   userId: auth.id,
    //   //   id: result.data.id,
    //   // });
    //   setLoading(false);
    //   return onClose();
    // }

    setLoading(false);
    Alert.alert('Não foi possível enviar o texto!');
  }

  const prioritys = [
    {label: '0', value: '0'},
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
  ];

  const weekDays = [
    {label: 'Segunda', value: '1'},
    {label: 'Terça', value: '2'},
    {label: 'Quarta', value: '3'},
    {label: 'Quinta', value: '4'},
    {label: 'Sexta', value: '5'},
    {label: 'Sábado', value: '6'},
    {label: 'Domingo', value: '0'},
  ];

  return (
    <AppContainer color="orange" showImage={true} paddingTop={true}>
      {/* <StatusBar barStyle={'dark-content'} /> */}
      {/* <Container> */}
      <AppWriteForm
        onSubmit={onSubmit}
        onClose={onClose}
        value={value}
        theme="dark"
        selectOptions1={weekDays}
        selectOptions2={prioritys}
        placeholder="O que fazer?"
      />
      {/* </Container> */}
    </AppContainer>
  );
};

const Container = styled.View`
  flex: 1;
`;

const Text = styled.Text`
  color: #fff;
`;

const ButtonSend = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  margin: 5px;
  z-index: 10;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: ${Platform.OS === 'ios' ? 30 : 0};
  right: 0;
`;

const ButtonClose = styled.TouchableOpacity`
  width: 54px;
  height: 54px;
  border-radius: 50;
  margin: 5px;
  z-index: 10;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: ${Platform.OS === 'ios' ? 30 : 0};
  left: 0;
`;

const TextInput = styled.TextInput.attrs({
  keyboardAppearance: 'dark',
  numberOfLines: 10,
  multiline: true,
  onSubmitEditing: false,
  autoCorrect: true,
  autoFocus: true,
  keyboardType: 'default',
})`
  text-align-vertical: bottom;
  min-width: 100%;
  font-size: 16px;
  padding: 10px 10px;
  justify-content: flex-end;
  align-items: flex-end;
  align-self: flex-end;
  ${Platform.OS === 'android' ? 'flex: 1' : ''};
`;

const Row = styled.View`
  /* flex: 1; */
  flex-direction: row;
  align-items: flex-end;
  /* align-self: flex-end; */
  background-color: #00000030;
`;
const Col = styled.View`
  /* flex: 1; */
  /* flex: 1; */
  /* flex-direction: row; */
  /* align-self: flex-end; */
  align-items: flex-end;
  justify-content: center;
  /* background-color: red; */
  /* height: 120; */
`;

const TotalText = styled.Text`
  font-size: 18px;
  right: 0;
  margin-right: 10px;
  margin-bottom: 10px;
  /* align-self: flex-end; */
  /* background-color: red; */
  /* flex: 1; */
  /* width: 100%; */
  /* justify-content: center;
  align-items: center; */
  /* align-self: flex-end; */
`;

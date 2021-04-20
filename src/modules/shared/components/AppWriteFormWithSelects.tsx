import React, {useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  Alert,
  Picker,
  ScrollView,
  SafeAreaView,
  Vibration,
} from 'react-native';
import styled from 'styled-components/native';
import {topHeigth} from '~/modules/shared/helpers/AppContainer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AppButton from '~/modules/shared/components/AppButtonSimple';

export default ({
  onSubmit,
  onClose,
  value = {text: '', category: ''},
  selectOptions1 = [],
  selectOptions2 = [],
  placeholder = 'Conte para nós...',
  maxLength = 5000,
  minLength = 6,
  theme = 'dark',
}) => {
  const [formValue, setFormValue] = useState('');
  const [selectOption1, setSelectOption1] = useState('');
  const [selectOption2, setSelectOption2] = useState('');
  const [total, setTotal] = useState(0);
  const [totalStyle, setTotalStyle] = useState('default');
  const colors = {
    dark: '#FFF',
    light: '#4B3F32',
  };

  function isValid() {
    if (formValue.length === 0) {
      Alert.alert('Rsrsrs.. Você esqueceu de escrever algo.');
      return false;
    }

    if (selectOptions1.length > 0 && selectOption1.length === 0) {
      Alert.alert('Selecione um tipo.');
      return false;
    }

    if (formValue.length < minLength) {
      Alert.alert('Hey.. Muito pequeno, não acha?');
      return false;
    }

    onSubmit({text: formValue, weekDay: selectOption1, priority: selectOption2});
  }

  useEffect(() => {
    setFormValue(value.text);
    setSelectOption1(value.weekDay);
    setSelectOption2(value.priority);
  }, [value]);

  useEffect(() => {
    setTotal(formValue.length);
    if (formValue.length <= 500) {
      setTotalStyle('default');
    } else if (formValue.length <= 1000) {
      setTotalStyle('warning');
    } else {
      Vibration.vibrate(10000);
      setTotalStyle('danger');
    }
  }, [formValue]);

  let totalStyles = {
    default: {},
    warning: {
      // color: 'orange',
      // fontWeight: 'bold',
      fontSize: 22,
    },
    danger: {
      // color: 'red',
      fontWeight: 'bold',
      fontSize: 28,
    },
  };
  const ButtonSend = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    margin: 5px;
    z-index: 10;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: ${Platform.OS === 'ios' ? 30 : selectOptions1.length > 0 ? -50 : 0}px;
    right: 0;
    /* z-index: 500; */
  `;

  const ButtonClose = styled.TouchableOpacity`
    width: 54px;
    height: 54px;
    border-radius: 50px;
    margin: 5px;
    z-index: 10;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: ${Platform.OS === 'ios' ? 30 : 0}px;
    left: 0;
  `;

  return (
    <>
      <ButtonClose onPress={() => onClose()}>
        <Icon name="close" size={28} color={colors[theme]} />
      </ButtonClose>
      <ButtonSend onPress={() => isValid()}>
        <Icon name="send" size={28} color={colors[theme]} />
      </ButtonSend>
      <KeyboardAvoidingView
        behavior="padding"
        enabled={Platform.OS == 'ios'}
        style={{flex: 1, justifyContent: 'space-between'}}>
        {selectOptions1.length > 0 && (
          <Picker
            mode="dialog"
            selectedValue={selectOption1}
            style={{color: '#FFF'}}
            itemStyle={{
              width: '100%',
              height: 120,
              color: '#FFF',
            }}
            onValueChange={(itemValue, itemIndex) => setSelectOption1(itemValue)}>
            <Picker.Item label="Selecione um tipo" value="" />
            {selectOptions1.map((row) => (
              <Picker.Item label={row.label} value={row.value} />
            ))}
          </Picker>
        )}
        {selectOptions2.length > 0 && (
          <Picker
            mode="dialog"
            selectedValue={selectOption2}
            style={{color: '#FFF'}}
            itemStyle={{
              width: '100%',
              height: 120,
              color: '#FFF',
            }}
            onValueChange={(itemValue, itemIndex) => setSelectOption2(itemValue)}>
            <Picker.Item label="Selecione um tipo" value="" />
            {selectOptions2.map((row) => (
              <Picker.Item label={row.label} value={row.value} />
            ))}
          </Picker>
        )}
        <Container
          style={{
            justifyContent: selectOptions1.length == 0 ? 'flex-end' : 'flex-start',
          }}>
          <TextInput
            placeholderTextColor={colors[theme]}
            placeholder={placeholder}
            onChangeText={(formValue) => setFormValue(formValue)}
            value={formValue}
            maxLength={maxLength}
            style={{color: colors[theme]}}
          />
        </Container>
        <TotalText
          style={{...totalStyles[totalStyle], ...{color: colors[theme]}}}>
          {total}
        </TotalText>
      </KeyboardAvoidingView>
    </>
  );
};

const TotalText = styled.Text`
  font-size: 18px;
  right: 0;
  margin: 10px;
  align-self: flex-end;
`;

const Container = styled.View`
  flex: 1;
`;

const TextInput = styled.TextInput.attrs({
  keyboardAppearance: 'dark',
  numberOfLines: 10,
  multiline: true,
  // onSubmitEditing: false,
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

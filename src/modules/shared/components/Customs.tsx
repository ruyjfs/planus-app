import React from 'react';
import styled from 'styled-components/native';
// import { TextField as TextFieldBread, Icon, Button as ButtonBread } from 'material-bread';

export const Form = styled.View.attrs({
  type: 'flat',
  containerStyle: {marginTop: 20, color: '#FFF'},
})`
  align-self: stretch;
  margin-top: 30px;
`;

export const TextField = styled(TextFieldBread).attrs({
  labelColor: '#FFF',
  underlineActiveColor: '#FFF',
  autoCapitalize: 'none',
  autoCorrect: false,
})`
  color: #fff;
`;

export const Button = styled(ButtonBread).attrs({
  // icon: <Icon name="arrow-forward" />,
  iconPosition: 'right',
  type: 'contained',
  fullWidth: true,
  radius: 20,
})`
  height: 45;
  border-radius: 30;
  margin-top: 25;
`;

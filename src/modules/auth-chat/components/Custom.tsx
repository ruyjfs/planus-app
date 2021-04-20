import React from 'react';
import styled from 'styled-components/native';

export const TextInput = styled.TextInput.attrs({
  placeholderTextColor: '#FFF',
})`
  /* width: 50%; */
  flex: 1;
  color: #fff;
  border-radius: 30px;
  border: 1px solid #fff;
  padding: 0 20px 0 20px;
  font-size: 16px;
  height: 54px;
`;

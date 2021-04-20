import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default (navigation, color = '#FFF') => {
  return (
    <MenuButtom onPress={() => navigation.toggleDrawer()}>
      <Icon name="menu" size={30} color={color} />
    </MenuButtom>
  );
};

const MenuButtom = styled.TouchableOpacity`
  margin: 0 15px;
`;

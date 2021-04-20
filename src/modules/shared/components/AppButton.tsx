import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

export default ({onPress, label, icon = '', color = 'pink'}) => {
  const colors: any = {
    pink: ['#FE2286', '#F968A7', '#FE2286'],
    orange: ['#FFAF00', '#fbd27d', '#FFAF00'],
    green: ['#00A247', '#02E265', '#00A247'],
    purple: ['#7100BC', '#A82CFB', '#7100BC'],
    blue: ['#006BAD', '#00BCD4', '#006BAD'],
  };

  return (
    <Button onPress={() => onPress()}>
      <Container colors={colors[color]}>
        <Text>{label} </Text>
        {icon !== 'icon' && <Icon name={icon} size={20} color="#FFF" />}
      </Container>
    </Button>
  );
};

const Button = styled.TouchableOpacity`
  flex-direction: row;
  height: 44px;
  justify-content: center;
  align-items: center;
  border-radius: 50;
  align-self: stretch;
  margin: 10px 20px;
`;

const Container = styled(LinearGradient).attrs({
  start: {x: 0, y: 0},
  end: {x: 0.5, y: 4.5},
})`
  flex-direction: row;
  flex: 1;
  border-radius: 50;
  align-items: center;
  justify-content: center;
  height: 44;
`;

const Text = styled.Text`
  font-size: 18px;
  color: #fff;
`;

import React from 'react';
import Styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

export default ({onPress, label, icon = false}) => {
  return (
    <Button onPress={() => onPress()}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0.5, y: 4.5}}
        colors={['#FE2286', '#F968A7', '#FE2286']}
        style={{
          flexDirection: 'row',
          flex: 1,
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center',
          height: 44,
        }}>
        <Text>{label} </Text>
        {icon && <Icon name={icon} size={20} color="#FFF" />}
      </LinearGradient>
    </Button>
  );
};

const Text = Styled.Text`
  font-size: 18px;
  color: #FFF;
`;

const Button = Styled.TouchableOpacity`
  flex-direction: row;
  height: 44px;
  justify-content: center;
  align-items: center;
  border-radius: 50;
  align-self: stretch;
  margin: 10px 20px;
`;

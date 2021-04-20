import React from 'react';
import styled from 'styled-components/native';

export default ({data}: any) => {
  return (
    <Container>
      <ListTitle style={{color: data?.color}}>{data?.total}</ListTitle>
      <ListDescription>{data?.name}</ListDescription>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  background-color: #00000050;
  margin: 6px 3px;
  padding: 2px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  /* width: 65px; */
  width: 55px;
  height: 40px;
`;

const ListTitle = styled.Text`
  font-size: 18px;
  color: #fff;
`;

const ListDescription = styled.Text`
  font-size: 10px;
  font-weight: bold;
  color: #fff;
`;

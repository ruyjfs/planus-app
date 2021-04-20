import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';

import WeekListItem from './WeekListItem';

export default () => {
  const data = [
    {code: 1, name: 'Dom', total: 5, color: '#FF0274'},
    {code: 2, name: 'Seg', total: 8, color: '#C774FD'},
    {code: 3, name: 'Ter', total: 10, color: '#08BC00'},
    {code: 4, name: 'Qua', total: 5, color: '#00F3FE'},
    {code: 5, name: 'Qui', total: 5, color: '#FEE600'},
    {code: 6, name: 'Sex', total: 5, color: '#FF0274'},
    {code: 7, name: 'Sab', total: 5, color: '#FF62CA'},
  ];

  return (
    <Container>
      {/* <FlatList
        data={data}
        extraData={data}
        horizontal
        style={{maxHeight: 90}}
        keyExtractor={(item: any) => item.name}
        renderItem={({item, index}) => (
          // <WeekListItem data={item} onSelect={onSelect} selectedDay={selectedDay} />
          <WeekListItem data={item} />
        )}
      /> */}
      {data.map((item, index) => (
        <WeekListItem data={item} />
      ))}
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

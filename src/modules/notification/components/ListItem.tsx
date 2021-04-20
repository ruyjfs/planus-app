import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import _ from 'lodash';
import {BlurView} from '@react-native-community/blur';

import FadeInView from '~/modules/shared/components/FadeInView';
import {MomentCustom} from '~/services/Moment';

interface Data {
  title: '';
  text: '';
  body: {};
  createdAt: {};
}

export default ({
  date = null,
  data = {},
  onPress = () => {},
  onLongPress = () => {},
}) => {
  const colorsByType: any = {
    question: '#ff0274',
    text: '#00A247',
    feedback: '#FF6345',
    grateful: '#009EFF',
    default: '#FFFfff',
  };

  if (!data.data || !data.data.type) {
    data.data = {type: 'default'};
  }

  return (
    <FadeInView>
      {/* <BlurView
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
        // blurType="dark"
        blurType="light"
        // blurType="light"
        // blurType="regular"
        blurAmount={1}
      /> */}
      <Container
        onPress={() => onPress()}
        onLongPress={() => onLongPress()}
        style={{
          backgroundColor: '#00000030',
          borderColor: colorsByType[data.data.type],
          borderBottomColor: '#FFF',
          borderLeftWidth: 5,
        }}>
        <Item>
          {data.title && <TitleText>{data.title}</TitleText>}
          {data.body && <DescriptionText>{data.body}</DescriptionText>}
          {data.text && <DescriptionText>{data.text}</DescriptionText>}
        </Item>
        <Actions>
          <Action>
            {data.createdAt && (
              <ActionText>
                {MomentCustom.toView(data.createdAt.toDate())}
              </ActionText>
            )}
          </Action>
        </Actions>
      </Container>
    </FadeInView>
  );
};

const Container = styled.TouchableOpacity`
  /* border-color: #ff0274;
  border-color: #ff6345; */
  border-color: #fff;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  /* border-top-width: 0.5px; */
  /* border-left-color: #ff0274; */
  padding: 10px;
  min-width: 100%;
  /* margin-bottom: 20px; */
  /* box-shadow: 0px 0px 3px #444; */
`;

const ActionText = styled.Text`
  color: #ccc;
  margin: 0 5px;
`;

const Actions = styled.View`
  /* background-color: red; */
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  /* align-items: flex-end; */
  /* flex: 1; */
  /* align-items: flex-end;
  align-content: flex-end;
  align-self: flex-end; */
  /* min-width: 100%; */
  /*
  border-bottom-color: #eaeae8;
  border-bottom-width: 1px;
  padding: 10px;
  min-width: 100%; */
  /* align-content: space-between; */
`;
const Action = styled.TouchableOpacity`
  flex-direction: row;
  /* margin: 0 10px; */
  /* background-color: red; */
  /* flex-direction: row; */
  /* align-items: flex-end; */
  /* flex: 1; */
  /* align-items: flex-end;aa
  align-content: flex-end;
  align-self: flex-end; */
  /* min-width: 100%; */
  /*
  border-bottom-color: #eaeae8;
  border-bottom-width: 1px;
  padding: 10px;
  min-width: 100%; */
`;

const Item = styled.View`
  /* background-color: #FFFFFF20; */
  /* background-color: #24140cc4; */
  /* background-color: #00000050; */
  /* background-color: #24140c40; */
  /* border-radius: 10px; */
  /* border: 1px solid #FFF; */
  /* min-height: 30px; */
  /* border-bottom-color: #eaeae8;
  border-bottom-width: 1px;
  padding: 10px;
  min-width: 100%; */
  /* margin: 5px 10px; */
  margin-bottom: 10px;
`;

const TitleText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  /* margin-bottom: 10px; */
`;

const DescriptionText = styled.Text`
  color: #fff;
  /* font-weight: bold; */
  font-size: 18px;
  /* box-shadow: 0px 0px 0px red; */
`;

const Text = styled.Text`
  margin-top: 5px;
  color: #ccc;
`;

// const Item = styled.TouchableOpacity`
//           background-color: #24140cc4;
//           border-radius: 10px;
//           border: 0px solid #FFF;
//           /* min-height: 30px; */
//           padding: 10px;
//           margin: 5px 10px;
//         `;

// const DescriptionText = styled.Text`
//           color: #FFF;
//         /* font-weight: bold; */
//         font-size: 18px;
//         `;

// const Text = styled.Text`
// margin-top: 5px;
// color: #ccc;
// `;

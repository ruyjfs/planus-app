import React from 'react';
import styled from 'styled-components/native';
import {Modal, Alert, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import AppContainer from '../components/AppContainerWhite';
import AppButtom from '../components/AppButton';

export default () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function close() {
    dispatch({type: 'AUTH_ADD', payload: {showTutorial: false}});
  }

  return (
    <Modal
      animationType="fade"
      presentationStyle="overFullScreen"
      transparent={true}
      visible={auth.showTutorial && auth.id && true}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <Container>
        <AppContainer>
          <ContentView>
            <ScrollView>
              <TitleText>
                Bem vindo ao <Bold>Religare!</Bold>
              </TitleText>
              <DescriptionText>
                Estou muito feliz em te ver por aqui. 😊
              </DescriptionText>
              <DescriptionText>
                Fui criado por sua causa, para ser algo de bom na sua vida, um
                lugar agradável, aconchegante, de muita sabedoria e fraternidade
                para interligar à todos nós atravéz do amor.
              </DescriptionText>
              <DescriptionText>Vamos ajudar uns aos outros? 🤗</DescriptionText>
              <HeaderText>Importante saber:</HeaderText>
              <DescriptionText>
                Sou dividido em <Bold>3 cores</Bold> principais:{' '}
                <Bold>Rosa, Azul, Verde e Laranja</Bold>, que representam
                cantinhos diferentes.
              </DescriptionText>
              <HeaderTextPink>Rosa [Questões]</HeaderTextPink>
              <DescriptionText>
                Compartilhe suas <Bold>questões</Bold> pessoais, desabafe,{' '}
                <Bold>receba ajudas</Bold> de outras pessoas e ajude outras
                pessoas também. Na parte rosa, vamos nos ajudar, fale pra gente
                o que te incomoda! Ahh, todas as informações postadas são{' '}
                <Bold>anônimas</Bold>! 😊
              </DescriptionText>
              <HeaderTextGreen>Verde [Textos]</HeaderTextGreen>
              <DescriptionText>
                Escreva o que há de melhor em <Bold>você</Bold>. É tão bom
                compartilhar pensamentos, reflexões, citações e poesias, né? No
                cantinho verde, você pode compartilhar com a gente e, também,
                pode ler um pouquinho dos sentimentos das outras pessoas.
                Desperte seu lado artista!
              </DescriptionText>

              <HeaderTextYellow>Laranja [Sugestões]</HeaderTextYellow>
              <DescriptionText>
                Todas as sugestões são bem-vindas. 😊 Compartilhe suas{' '}
                <Bold>ideias</Bold> para melhorarmos o App e torná-lo ainda
                melhor para você. Na parte laranja, você faz sugestões, elogios,
                reclamações, vê as sugestões dos outros ou perguntar sobre algo
                do app.
              </DescriptionText>

              <HeaderText>Tudo entendido?</HeaderText>
              <DescriptionText>
                Ahhh você também pode <Bold>amar</Bold> as publicações, ajudas,
                sugestões e textos, como também pode denunciar, caso encontre
                algo indevido.
              </DescriptionText>
              <TitleEndText>Lembre-se sempre:</TitleEndText>
              <BoldEnd>~VOCÊ É ESPECIAL~</BoldEnd>
              <DescriptionEndText> em um mundo</DescriptionEndText>
              <WorldText>🌎</WorldText>
              <DescriptionEndText>onde todos nós</DescriptionEndText>
              <BoldEnd>SOMOS ESPECIAIS!</BoldEnd>
              <AppButtom
                color="pink"
                label="Entendi"
                icon="check"
                onPress={() => close()}
              />
              {/* <BottomView /> */}
            </ScrollView>
          </ContentView>
        </AppContainer>
      </Container>
    </Modal>
  );
};

// const BottomView = styled.View`
//   margin-bottom: 0;
// `;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #00000080;
  width: 100%;
  height: 100%;
`;

const ContentView = styled.View`
  padding: 10px;
  /* background-color: #fff; */
  width: 100%;
  height: 100%;
`;

const TitleText = styled.Text`
  /* font-weight: bold; */
  font-size: 32;
  padding-bottom: 20px;
  color: #333;
`;

const SubtitleText = styled.Text`
  /* font-weight: bold; */
  font-size: 22;
  padding-bottom: 20px;
  color: #333;
`;

const HeaderText = styled.Text`
  font-weight: bold;
  font-size: 26;
`;
const HeaderTextPink = styled.Text`
  color: #ff0274;
  font-weight: bold;
  font-size: 26;
`;
const HeaderTextYellow = styled.Text`
  color: #ff8b00;
  font-weight: bold;
  font-size: 26;
`;
const HeaderTextGreen = styled.Text`
  color: green;
  font-weight: bold;
  font-size: 26;
`;

const DescriptionText = styled.Text`
  font-size: 20;
  padding-bottom: 20px;
  color: #333;
  text-align: auto;
`;

const Bold = styled.Text`
  font-weight: bold;
`;

const TitleEndText = styled.Text`
  font-size: 20;
  color: #333;
  text-align: auto;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const DescriptionEndText = styled.Text`
  font-size: 20;
  color: #333;
  text-align: auto;
  text-align: center;
`;
const WorldText = styled.Text`
  font-size: 42;
  padding-bottom: 10px;
  color: #333;
  text-align: auto;
  text-align: center;
`;

const BoldEnd = styled.Text`
  font-weight: bold;
  font-size: 26px;
  text-align: center;
  color: #ff0274;
`;

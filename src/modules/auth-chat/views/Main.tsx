import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {FlatList, KeyboardAvoidingView, Platform, Modal} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import packageJson from '~/../package.json';

// import {NavigationSwitchScreenProps} from 'react-navigation';

// import PushNotificationService, {
//   messaging,
//   PushNotification,
//   PushNotificationIOS,
// } from '~/modules/notification/services/PushNotification';

import Auth from '~/services/firebase/Auth';
import Users from '~/services/firebase/Users';
import TermModal from '~/modules/term/components/Modal';

import AppContainer from '~/modules/shared/components/AppContainer';
import FadeInView from '../components/animates/FadeInView';
import {TextInput} from '../components/Custom';

// export default ({navigation}: NavigationSwitchScreenProps) => {
export default ({navigation}: any) => {
  const dispatch = useDispatch();
  const authChat = useSelector((state: any) => state.authChat);
  const messages = useSelector((state: any) => state.authChat.messages);
  const [keyboardType, setKeyboardType] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(false);
  const [label, setLabel] = useState('');
  const [text, setText] = useState('');
  const [showModalTerm, setShowModalTerm] = useState(false);
  const [totalPasswordInvalid, setTotalPasswordInvalid] = useState(0);
  const [flatListRef, setFlatListRef] = useState(null);
  const [tokenFcm, setTokenFcm] = useState('');
  const [typing, setTyping] = useState(false);
  // const [messages, setMessages] = useState([]);
  // const messages = [
  // ,
  // { text: 'Fico muito feliz em te ver por aqui!' },
  // { text: 'Preciso saber o seu melhor email para mantermos contato caso você precise resetar a  sua senha.' },
  // { text: 'Para continuar, preciso saber se você está de acordo com os nossos Termos de Uso e Política de Privacidade ABRIR TERMO' },
  // { text: 'Qual o seu sexo?' },
  // { text: 'Como você gosta de ser chamado(a)?' },
  // { text: 'Bonito nome FULANA.' },
  // { text: 'Você nasceu quando?' },
  // { text: 'COMENTAR SOBRE A IDADE' },
  // { text: 'Para manter a sua segurança qual senha gostaria de usar?' },
  // { text: 'Tudo que você ver por aqui foi feito e pensado em você.. Obrigado por fazer parte e seja muito bem vindo(a)!!!' },
  // ].reverse();

  let messageBot: any = [];

  useEffect(() => {
    // console.log('alterou', messages);
  }, [messageBot]);

  useEffect(() => {
    bot();
  }, []);

  async function reset() {
    await dispatch({type: 'AUTH_RESET'});
    await dispatch({type: 'AUTH_CHAT_RESET'});
    await dispatch({
      type: 'AUTH_CHAT_MESSAGES_RESET',
    });
  }

  async function bot() {
    // checkPushNotification();
    await reset();
    dispatch({
      type: 'AUTH_CHAT_MESSAGES_ADD',
      payload: {me: false, text: 'Olá! 😃'},
    });

    setTyping(true);
    setTimeout(() => {
      addMessage('Fico muito feliz em te ver por aqui!');
      setTimeout(() => {
        botEmail();
        setTyping(false);
      }, 2000);
    }, 1000);
  }

  function botEmail() {
    addMessage(`Qual o seu melhor email?`, false, 'email');
    setTimeout(() => {
      setSecureTextEntry(false);
      setKeyboardType('email-address');
      setLabel('Digite o seu melhor email...');
    }, 1300);
  }

  function botPassword() {
    setTyping(true);
    setTimeout(() => {
      addMessage('Qual a sua senha?');
      setTyping(false);
      setTimeout(() => {
        setKeyboardType('');
        setSecureTextEntry(true);
        setLabel('Digite a sua senha...');
      }, 1000);
    }, 1500);
  }

  function botName() {
    setTyping(true);
    setTimeout(() => {
      addMessage('Como você gosta de ser chamado(a)?');
      setTyping(false);
      setTimeout(() => {
        setKeyboardType('');
        setSecureTextEntry(false);
        setLabel('Digite aqui...');
      }, 1000);
    }, 1500);
  }

  // function botDate() {
  //   setTimeout(() => {
  //     dispatch({
  //       type: 'AUTH_CHAT_MESSAGES_ADD',
  //       payload: { me: false, text: 'Qual dia voce nasceu?' }
  //     })
  //     setTimeout(() => {
  //       setKeyboardType('');
  //       setSecureTextEntry(true);
  //       setLabel('Digite aqui...')
  //     }, 1000);
  //   }, 1500);
  // }

  async function sendInputText() {
    // console.log('AUTH_CHAT', authChat);

    if (authChat.email === '') {
      setTyping(true);
      addMessage(text, true);
      if (validateEmail(text) && validateEmailRegex(text)) {
        dispatch({
          type: 'AUTH_CHAT_ADD',
          payload: {email: text.toLowerCase(), me: true, type: 'email'},
        });
        setText('');
        setLabel('');
        const user = await Users.getByEmail(text);
        // console.log('Users', user);

        dispatch({
          type: 'AUTH_CHAT_ADD',
          payload: user,
        });

        if (user) {
          setTimeout(() => {
            addMessage('Legal, bom te ver de volta!');
            setTyping(false);
            botPassword();
          }, 500);
          return true;
        }

        setTimeout(() => {
          addMessage('Legal.. Prazer em te conhecer!');

          setTimeout(() => {
            addMessage(`Eu me chamo Planus!`);
            setTyping(false);
            // addMessage(
            //   'Fui criado por sua causa, para ser algo de bom na sua vida, um lugar agradável, aconchegante, de muita sabedoria e fraternidade, para interligar à todos nós através do amor.',
            // );
            botName();
          }, 500);
        }, 500);
      }
      return false;
    }

    if (authChat.name === '') {
      setTyping(true);
      dispatch({
        type: 'AUTH_CHAT_ADD',
        payload: {name: text},
      });
      addMessage(`Bonito nome ${text}!`);
      setText('');
      setLabel('');

      setTimeout(() => {
        addMessage(
          `É importante informar que ao utilizar o Religare você estará de acordo com os nossos termos.`,
          false,
          'term',
        );

        setTimeout(() => {
          setTyping(false);
          botPassword();
        }, 2000);
      }, 2000);
      return false;
    }

    if (authChat.password === '') {
      if (!validatePassword(text)) {
        return false;
      }
      dispatch({
        type: 'AUTH_CHAT_ADD',
        payload: {password: text},
      });
    }

    authentication();
  }

  function validateEmailRegex(mail: string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    dispatch({
      type: 'AUTH_CHAT_MESSAGES_ADD',
      payload: {me: false, text: 'Esse não é o seu email, é?'},
    });
    return false;
  }

  function validateEmail(text) {
    if (!text) {
      dispatch({
        type: 'AUTH_CHAT_MESSAGES_ADD',
        payload: {me: false, text: 'Ops.. Falta o seu email!'},
      });
      setTyping(false);
      return false;
    }
    if (text.length < 10) {
      dispatch({
        type: 'AUTH_CHAT_MESSAGES_ADD',
        payload: {me: false, text: `Esse não é o seu email, é?`},
      });
      setTyping(false);
      return false;
    }
    return true;
  }

  function validatePassword(text) {
    if (!text) {
      addMessage('Ops.. Falta informar a sua senha.');
      setTyping(false);
      return false;
    }
    if (text.length < 6) {
      addMessage('A sua senha é muito pequena, informe uma maior..');
      setTyping(false);
      return false;
    }
    return true;
  }

  function addMessage(text: string, me = false, type = '') {
    dispatch({
      type: 'AUTH_CHAT_MESSAGES_ADD',
      payload: {me: me, text: text, type: type},
    });
  }

  async function checkPushNotification() {
    try {
      const enabled = await messaging().hasPermission();
      // PushNotificationIOS.setApplicationIconBadgeNumber(0);
      // console.log('CHECK');
      // console.log('PUSHs', enabled);

      if (enabled) {
        await messaging().registerForRemoteNotifications();
        await messaging()
          .getToken()
          .then((fcmToken) => {
            setTokenFcm(fcmToken);
            // console.log(
            //   'fcmTokennn: ',
            //   Platform.OS,
            //   '-------AH-------',
            //   tokenFcm,
            // );
            dispatch({
              type: 'AUTH_ADD',
              payload: {tokenFcm: fcmToken, fcmToken: fcmToken},
            });
            dispatch({
              type: 'AUTH_CHAT_ADD',
              payload: {tokenFcm: fcmToken, fcmToken: fcmToken},
            });
          });
        await messaging().subscribeToTopic('users');
      } else {
        try {
          await messaging().requestPermission();
          // User has authorised
          await messaging()
            .getToken()
            .then((fcmToken) => {
              setTokenFcm(fcmToken);
              dispatch({
                type: 'AUTH_ADD',
                payload: {tokenFcm: fcmToken, fcmToken: fcmToken},
              });
              dispatch({
                type: 'AUTH_CHAT_ADD',
                payload: {tokenFcm: fcmToken, fcmToken: fcmToken},
              });
              // console.log(
              //   'fcmTokennn: ',
              //   Platform.OS,
              //   '-------AH-------',
              //   tokenFcm,
              // );
            });
          await messaging().subscribeToTopic('users');
        } catch (error) {
          // User has rejected permissions
          console.log('permission rejected');
        }
      }
    } catch (error) {
      console.log(error);
    }
    // await new Promise((resolve, reject) => setTimeout(() => resolve(), 8000));
  }

  async function authentication() {
    // console.log('Realizando autenticação!', authChat.email, text);
    const login = await Auth.login(authChat.email, text);
    // console.log('Retorno de login', login, text);

    if (login.status) {
      let user = await Auth.user();
      let userNew = {
        ...authChat,
        ...{
          emailVerified: user.emailVerified,
          uid: user.uid,
          displayName: user.displayName,
          tokenFcm: tokenFcm,
          fcmToken: tokenFcm,
          platform: Platform.OS,
          version: packageJson.version,
        },
      };
      await delete userNew.messages;
      await dispatch({
        type: 'AUTH_ADD',
        payload: {...userNew, ...{showTutorial: true}},
      });
      // Users.save(userNew, userNew.id);
      // console.log('SALVOU 1:', userNew);
      return redirectToMain();
      // return navigation.navigate('Social');
      return false;
    }

    if (login.error.code === 'auth/user-not-found') {
      // console.log('Usuario nao encontrado!');
      const result = await Auth.signup(authChat.email, text);
      // console.log('Cadastro para autenticação com sucesso!');
      if (result.status) {
        let user = await Auth.user();
        let userNew = {
          ...authChat,
          ...{
            emailVerified: user.emailVerified,
            uid: user.uid,
            displayName: user.displayName,
            // tokenFcm: tokenFcm,
            // fcmToken: tokenFcm,
            platform: Platform.OS,
            version: packageJson.version,
          },
        };
        delete userNew.me;
        delete userNew.messages;
        // console.log('SALVOU \\o/', userNew, userNew.fcmToken, tokenFcm);

        console.log('FOIIII', userNew.uid, userNew);
        if (userNew.uid) {
          userNew.id = await Users.save(userNew);
        }
        dispatch({
          type: 'AUTH_ADD',
          payload: {...userNew, ...{showTutorial: true}},
        });
        // messaging().subscribeToTopic(`user-${userNew.id}`);
        // console.log('Cadastro do usuário com sucesso!');

        console.log('FOIIII');

        return redirectToMain();
      }
      addMessage('Não está sendo possível entrar...');
      return false;
    }

    setTimeout(() => {
      passwordInvalid();
    }, 1000);
    return false;
  }

  async function passwordInvalid() {
    setTotalPasswordInvalid(totalPasswordInvalid + 1);
    console.log(totalPasswordInvalid);

    if (totalPasswordInvalid === 0) {
      addMessage(
        `Ops.. Informações incorretas para o email "${authChat.email}"!`,
      );
    }

    // setTimeout(() => {
    if (totalPasswordInvalid === 1) {
      addMessage(
        `Se errar a senha novamente, será enviado um email para resetar a senha!`,
      );
    }

    if (totalPasswordInvalid === 2) {
      await Auth.sendPasswordResetEmail(authChat.email);
      addMessage(
        `Foi enviado para o seu email o link para alterar a sua senha!`,
      );
    }

    if (totalPasswordInvalid >= 3) {
      addMessage(`Verifique o seu email!`);
    }

    // this.ref.flatList.scrollToEnd();
    // }, 1000);
  }

  function onEdit() {
    dispatch({type: 'AUTH_CHAT_EMAIL_DEL'});
    botEmail();
  }

  function onTerm() {
    setShowModalTerm(true);

    // dispatch({type: 'AUTH_CHAT_EMAIL_DEL'});
    // botEmail();
  }

  function redirectToMain() {
    addMessage('Seja muito bem vindo, entre e sinta-se à vontade!');
    setText('');
    setLabel('');

    setTimeout(() => {
      return navigation.navigate('App', {screen: 'Planus'});
    }, 5000);
  }

  return (
    <>
      <TermModal visible={showModalTerm} setVisible={setShowModalTerm} />
      <AppContainer color="orange" showImage={true}>
        <KeyboardAvoidingView
          behavior="padding"
          enabled={Platform.OS == 'ios'}
          style={{
            flex: 1,
            justifyContent: 'center',
            padding: 30,
          }}>
          <Container>
            <ContainerChat>
              <FlatList
                ref={(ref) => {
                  setFlatListRef(ref);
                }}
                onContentSizeChange={(elm) => {
                  flatListRef.scrollToEnd({animated: true});
                }}
                data={messages}
                // keyExtractor={notification => String(notification.id)}
                // onEndReached={() => loadPage()}
                onEndReachedThreshold={0.1}
                // onRefresh={refreshList}
                // refreshing={refreshing}
                // ListFooterComponent={loading && <Loading />}
                renderItem={({item}: any) => (
                  <>
                    <FadeInView>
                      {item.me ? (
                        <>
                          {item.text !== '' && (
                            <RowMe>
                              {/* {item.type === 'email' && ( */}
                              <Button onPress={() => onEdit()}>
                                <Icon
                                  name="lead-pencil"
                                  size={20}
                                  color="#FFF"
                                />
                              </Button>
                              {/* )} */}
                              <TextMe>{item.text}</TextMe>
                            </RowMe>
                          )}
                        </>
                      ) : (
                        <>
                          {item.type == 'term' ? (
                            <>
                              <Row>
                                <Text>{item.text}</Text>
                              </Row>
                              <Row>
                                <ButtonLink onPress={() => onTerm()}>
                                  <TextLink>Ler Termos</TextLink>
                                </ButtonLink>
                              </Row>
                            </>
                          ) : (
                            <Row>
                              <Text>{item.text}</Text>
                            </Row>
                          )}
                        </>
                      )}
                    </FadeInView>
                  </>
                )}
              />
              {/* <FlatList
              inverted
              data={messages}
              renderItem={({ item }) => (
                <FadeInView>
                  <Text>{item.text}</Text>
                </FadeInView>
              )}
            /> */}
              {label !== '' && (
                <FadeInView>
                  <FooterView>
                    <TextInput
                      blurOnSubmit
                      placeholder={label}
                      onChangeText={(value) => setText(value)}
                      value={text}
                      keyboardType={keyboardType}
                      autoCapitalize="none"
                      autoCorrect={false}
                      onSubmitEditing={sendInputText}
                      secureTextEntry={secureTextEntry}
                    />
                    <ButtonSend onPress={sendInputText}>
                      <Icon name="send" size={28} color="#FFF" />
                    </ButtonSend>
                  </FooterView>
                </FadeInView>
              )}
              {typing && (
                <>
                  <Text>Digitando...</Text>
                </>
              )}
            </ContainerChat>
          </Container>
        </KeyboardAvoidingView>
      </AppContainer>
    </>
  );
};

const FooterView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ButtonSend = styled.TouchableOpacity`
  width: 54px;
  height: 54px;
  /* background-color: #fff; */
  border: solid 1px #fff;
  border-radius: 50;
  margin-left: 10px;
  justify-content: center;
  align-items: center;
`;

const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  /* align-items: center; */
  min-width: 100%;
  margin: 10px 0;
`;

const ButtonLink = styled.TouchableOpacity`
  /* background-color: red; */
  /* flex: 1; */
  /* align-items: flex-end;
  min-width: 5px;
  padding-right: 5px; */
`;

const TextLink = styled.Text`
  /* min-width: 100%; */
  font-size: 18px;
  text-decoration: underline;
  color: #fff;
  font-weight: bold;
`;

const Button = styled.TouchableOpacity`
  /* flex: 1; */
  align-items: flex-end;
  min-width: 5px;
  padding-right: 5px;
`;

const ContainerChat = styled.View`
  justify-content: flex-end;
  /* align-items: center; */
  min-width: 100%;
  margin: 10px 0;
`;

const Text = styled.Text`
  /* min-width: 100%; */
  font-size: 18px;
  color: #fff;
`;

const RowMe = styled.View`
  flex-direction: row;
  /* background-color: green; */
  margin: 15px 0;
  justify-content: flex-end;
`;

const Row = styled.View`
  flex-direction: row;
  min-width: 100%;
  /* background-color: blue; */
  margin: 15px 0;
`;

const TextMe = styled.Text`
  /* background-color: red; */
  text-align: right;
  /* min-width: 90%; */
  max-width: 95%;
  font-size: 18px;
  color: #fff;
`;

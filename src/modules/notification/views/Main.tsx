import React, {useEffect} from 'react';
import {Alert, AppRegistry, Platform, AppState} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import packageJson from '~/../package.json';
// import {requestNotifications} from 'react-native-permissions'; //todo REMOVER lib
// import {Notifications} from 'react-native-notifications';
import Auth from '~/services/firebase/Auth';
import Users from '~/services/firebase/Users';

import PushNotificationService, {
  messaging,
  PushNotification,
  PushNotificationIOS,
} from '../services/PushNotification';

// import PushNotification from 'react-native-push-notification';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';

// import bgMessaging from '../bgMessaging';
// AppRegistry.registerHeadlessTask(
//   'ReactNativeFirebaseMessagingHeadlessTask',
//   () => bgMessaging,
// );

export default ({navigation}) => {
  // Notifications.registerRemoteNotifications();
  // Notifications.getInitialNotification().then(notifications =>
  //   console.log('foi', notifications),
  // );
  // navigation.navigate('PublicationPresentation', {
  //   parentId: 'vqwGiS4ItQXUNdQtLbu8',
  // });
  // console.log('REDIRECIONANDO DO NAVIGATION ');
  // return false;
  // return navigation.navigate('Notification');
  // return navigation.navigate('Notifications', {
  //   parentId: 'vqwGiS4ItQXUNdQtLbu8',
  // });
  // setTimeout(() => {
  //   navigation.navigate('App', {
  //     screen: 'Publication',
  //     params: {screen: 'World', params: {screen: 'PublicationPresentation'}},
  //   });
  // }, 500);

  // return false;

  const serviceMain = new PushNotificationService(
    token => console.log('onRegister? TOKEN = ', token),
    notification => {
      console.log(
        'CLICOU222',
        Platform.OS,
        // notification.parentId,
        'NotificationDetail',
        notification.userInteraction,
        notification.foreground,
        AppState.currentState,
        // notification,
      );
      // if (notification.foreground === true) {
      //   return true;
      // }

      // (notification.data &&
      //   notification.data.parentId &&
      //   notification.foreground === true) ||
      // notification.parentId

      // if (notification.userInteraction) {
      if (
        (notification.data && notification.data.parentId) ||
        notification.parentId
      ) {
        return navigation.navigate('PublicationPresentation', {
          screen: 'Main',
          params: {
            parentId: notification.data
              ? notification.data.parentId
              : notification.parentId,
          },
        });
        // return navigation.navigate('PublicationPresentation', {
        //   parentId: notification.data
        //     ? notification.data.parentId
        //     : notification.parentId,
        // });
      }

      return navigation.navigate('App', {
        screen: 'Publication',
        params: {screen: 'Notification'},
      });
      // }
    },
  );
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);

  //todo Melhorar depois o codigo unificando codigo.
  async function checkPushNotification() {
    try {
      const enabled = await messaging().hasPermission();
      if (enabled) {
        await messaging().registerForRemoteNotifications();
        await messaging()
          .getToken()
          .then(fcmToken => {
            console.log('TOKEN = ', auth.id, fcmToken);
            dispatch({
              type: 'AUTH_ADD',
              payload: {
                tokenFcm: fcmToken,
                fcmToken: fcmToken,
                platform: Platform.OS,
              },
            });
            if (typeof auth.messages !== 'undefined') {
              delete auth.messages;
            }
            if (auth.id) {
              Users.save(
                {
                  ...auth,
                  ...{
                    tokenFcm: fcmToken,
                    fcmToken: fcmToken,
                    platform: Platform.OS,
                    version: packageJson.version,
                  },
                },
                auth.id,
              );
            }
          });
        messaging().subscribeToTopic('users');
        if (auth.id) {
          messaging().subscribeToTopic(`user-${auth.id}`);
          console.log('SUBSCRIBE1 = ', `user-${auth.id}`);
        }
        // console.log('subscrive to topics users/userId ' + auth.id);
      } else {
        try {
          await messaging().requestPermission();
          // User has authorised
          await messaging()
            .getToken()
            .then(fcmToken => {
              dispatch({type: 'AUTH_ADD', payload: {tokenFcm: fcmToken}});
              if (auth.id) {
                Users.save(
                  {
                    ...auth,
                    ...{tokenFcm: fcmToken, version: packageJson.version},
                  },
                  auth.id,
                );
              }
            });
          messaging().subscribeToTopic('users');
          messaging().subscribeToTopic(`user-${auth.id}`);
          console.log('SUBSCRIBE2 = ', `user-${auth.id}`);
        } catch (error) {
          console.log('permission rejected', error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkPushNotification();
  }, []);

  // useEffect(() => {
  //   messaging().onMessage((message: any) => {
  //     console.log('onMessage', Platform.OS);
  //     serviceMain.localNotification({
  //       title: message.data.title,
  //       message: message.data.body,
  //     });
  //   });
  // }, []);

  return <></>;
};

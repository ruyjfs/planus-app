import React, {useEffect} from 'react';
import {Alert, AppRegistry, Platform} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Notifications} from 'react-native-notifications';
// import {requestNotifications} from 'react-native-permissions'; //todo REMOVER lib

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

export default () => {
  const serviceMain = new PushNotificationService();
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);

  useEffect(() => {
    // OneSignal.init('4e4d7ea3-8576-495c-91cf-6b40a99a4dbd', {
    //   kOSSettingsKeyAutoPrompt: true,
    // });
    // OneSignal.addEventListener('received', onReceived);
    // OneSignal.addEventListener('opened', onOpened);
    // OneSignal.addEventListener('ids', onIds);
    console.log('AHHHHHH');
    Notifications.events().registerRemoteNotificationsRegistered(
      (event: Registered) => {
        // TODO: Send the token to my server so it could send back push notifications...
        console.log('Device Token Received', event.deviceToken);
      },
    );

    // Notifications.events().registerRemoteNotificationsRegistrationFailed(
    //   (event: RegistrationError) => {
    //     console.error(event);
    //   },
    // );

    Notifications.ios.checkPermissions().then(currentPermissions => {
      console.log('Badges enabled: ' + !!currentPermissions.badge);
      console.log('Sounds enabled: ' + !!currentPermissions.sound);
      console.log('Alerts enabled: ' + !!currentPermissions.alert);
    });

    // Notifications.requestPermissions();

    Notifications.registerRemoteNotifications();

    Notifications.events().registerNotificationReceivedForeground(
      (notification: Notification, completion) => {
        console.log(
          `Notification received in foreground: ${notification.title} : ${notification.body}`,
        );
        completion({alert: false, sound: false, badge: false});
      },
    );

    Notifications.events().registerNotificationOpened(
      (notification: Notification, completion) => {
        console.log(`Notification opened: ${notification.payload}`);
        completion();
      },
    );
  }, []);

  function onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  function onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  function onIds(device) {
    console.log('Device info: ', device);
  }

  //todo Melhorar depois o codigo unificando codigo.
  async function checkPushNotification() {
    try {
      // console.log('PUSH1');
      const enabled = await messaging().hasPermission();
      // const enabled = await messaging()
      //   .hasPermission()
      //   .then(() => console.log('ENABLED', enabled));
      // PushNotificationIOS.setApplicationIconBadgeNumber(null);
      // console.log('PUSH', Platform.OS);

      if (enabled) {
        await messaging().registerForRemoteNotifications();

        // PushNotificationIOS.addEventListener('notification', notification => {
        //   console.log('NOTIFICATION->>>>', notification);
        // });
        // PushNotificationIOS.addEventListener(
        //   'localNotification',
        //   notification => {
        //     console.log('LOCAL->>>>', notification);
        //   },
        // );
        // PushNotificationIOS.addEventListener(
        //   'registrationError',
        //   notification => {
        //     console.log('registrationError->>>>', notification);
        //   },
        // );
        // PushNotificationIOS.addEventListener('register', notification => {
        //   console.log('register->>>>', notification);
        // });

        // messaging().setBackgroundMessageHandler(async (message: any) => {
        //   console.log('AAA1', Platform.OS, message);
        //   serviceMain.localNotification({
        //     title: message.data.title,
        //     message: message.data.body,
        //   });
        // });

        // messaging().onMessage((message: any) => {
        //   console.log('AAA2', Platform.OS, message);
        //   serviceMain.localNotification({
        //     title: message.data.title,
        //     message: message.data.body,
        //   });
        // });

        await messaging()
          .getToken()
          .then(fcmToken => {
            // dispatch({ type: 'FIREBASE_MESSAGING_TOKEN', messaging: { token: fcmToken } });
            // user.fcmToken = fcmToken;
            console.log('fcmToken: ', Platform.OS, fcmToken);
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
                  },
                },
                auth.id,
              );
            }
          });
        await messaging().subscribeToTopic('users');
        await messaging().subscribeToTopic(`user-${auth.id}`);
        // console.log('subscrive to topics users/userId ' + auth.id);
      } else {
        try {
          await messaging().requestPermission();
          // User has authorised
          await messaging()
            .getToken()
            .then(fcmToken => {
              // dispatch({ type: 'FIREBASE_MESSAGING_TOKEN', messaging: { token: fcmToken } });
              // user.fcmToken = fcmToken;
              // console.log('fcmToiken: ', Platform.OS, fcmToken);
              dispatch({type: 'AUTH_ADD', payload: {tokenFcm: fcmToken}});
              Users.save({...auth, ...{tokenFcm: fcmToken}}, auth.id);
            });
          // console.log(
          //   'subscrive to topics users/userId ',
          //   Platform.OS,
          //   auth.id,
          // );
          await messaging().subscribeToTopic('users');
          await messaging().subscribeToTopic(`user-${auth.id}`);
        } catch (error) {
          // User has rejected permissions
          // Alert.alert('Habilite as notificacoes e fique por dentro.');
          console.log('permission rejected', error);
        }
      }
    } catch (error) {
      console.log(error);
    }
    // await new Promise((resolve, reject) => setTimeout(() => resolve(), 8000));
  }

  useEffect(() => {
    // checkPushNotification();
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

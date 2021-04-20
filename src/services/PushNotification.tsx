import PushNotification from 'react-native-push-notification';
import {PushNotificationIOS} from 'react-native';

const configure = () => {
  PushNotification.configure({
    onRegister: function (token: any) {
      console.log('TOKEN', token);

      //process token
    },

    onNotification: function (notification: any) {
      // process the notification
      // required on iOS only
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    popInitialNotification: true,
    requestPermissions: true,
  });

  PushNotification.localNotificationSchedule({
    //... You can use all the options from localNotifications
    message: 'My Notification Message', // (required)
    // date: new Date(Date.now() + 60 * 1000), // in 60 secs
    date: new Date(Date.now()), // in 60 secs
  });

  console.log('FOI configure');
};

export {configure};

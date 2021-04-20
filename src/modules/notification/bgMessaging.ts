import PushNotificationService from './services/PushNotification';
import {Platform} from 'react-native';
// Optional flow type
// import type { RemoteMessage } from '@react-native-firebase';

export default async (message: any) => {
  const serviceMain = new PushNotificationService();
  // console.log('AAA2', message.messageId, message.data.body, message.data.title);
  serviceMain.localNotification({
    title: message.data.title,
    message: message.data.body,
  });
  console.log('Notificou BACKGROUND', Platform.OS);

  return Promise.resolve();
};

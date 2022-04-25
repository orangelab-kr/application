import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {Notifier} from 'react-native-notifier';
import {AccountsClient} from '../api/accounts';
import {onSchemeAction} from './scheme';

export let initalized = false;

export const onRegisterFCM = async () => {
  if (initalized) return;
  initalized = true;

  const fcm = messaging();
  if (!fcm.isDeviceRegisteredForRemoteMessages) {
    console.log('Registering fcm.');
    await fcm.registerDeviceForRemoteMessages();
  }

  const onMessage = (
    notification: FirebaseMessagingTypes.RemoteMessage | null,
  ) => {
    if (!notification || !notification.data) return;
    onSchemeAction(notification.data.url);
  };

  fcm.onNotificationOpenedApp(onMessage);
  fcm.getInitialNotification().then(onMessage);
  fcm.onMessage(message => {
    if (!message.notification) return;
    const {title, body: description} = message.notification;
    const action = message.data?.url || null;
    const onPress = () => onSchemeAction(action);
    console.log(`New notification: ${title} ${description} ${action}`);
  });

  const token = await fcm.getToken();
  console.log('Get FCM Token:', token);
};

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosInstance} from 'axios';
import CodePush from 'react-native-code-push';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {navigationRef} from '../navigators/navigation';

export const endpoint = `https://coreservice.hikick.kr/v1`;
export const createClient = (service: string, auth = true): AxiosInstance => {
  const debug = true;
  const baseURL = `${endpoint}/${service}`;
  const client = axios.create({baseURL});

  client.interceptors.request.use(async request => {
    if (debug) {
      console.log(
        `New api request to ${service}: (${request.method?.toUpperCase()}) ${
          request.url
        }`,
      );

      if (request.params) {
        console.log(`API Parameters: ${JSON.stringify(request.params)}`);
      }

      if (request.data) {
        console.log(`API Body: ${JSON.stringify(request.data)}`);
      }
    }

    if (auth) {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        console.log('There is not access token');
        return request;
      }

      if (debug) console.log(`Access Token: ${accessToken}`);
      if (!request.headers) request.headers = {};
      request.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return request;
  });

  client.interceptors.response.use(undefined, error => {
    console.log(`There was an error: ${error.message}`);
    if (!axios.isAxiosError(error)) return Promise.reject(error);
    const {response} = error;
    if (response?.data) {
      console.log(`Error API Body: ${JSON.stringify(response.data)}`);
      if (response.data.message) {
        Notifier.showNotification({
          title: response.data.message,
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: 'warn',
            titleStyle: {color: '#fff'},
          },
        });
      }

      switch (response.data.opcode) {
        case 104: // 로그인이 필요한 서비스
          const page = navigationRef.current?.getCurrentRoute()?.name;
          if (
            page &&
            !page.startsWith('Signup') &&
            !['Verify', 'Start', 'Splash'].includes(page)
          ) {
            CodePush.restartApp();
          }

          break;
        case 118: // 면허 인증
          navigationRef.current?.navigate('Weblink', {
            page: 'settings?license=1&later=1',
          });
          break;
        case 221: // 결제 수단
          navigationRef.current?.navigate('Payment');
        default:
          break;
      }
    }

    return Promise.reject(error);
  });

  return client;
};

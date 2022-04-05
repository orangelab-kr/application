import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosInstance} from 'axios';

export const createClient = (service: string, auth = true): AxiosInstance => {
  const debug = true;
  const baseURL = `https://coreservice.hikick.kr/v1/${service}`;
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
    }

    return Promise.reject(error);
  });

  return client;
};

import AsyncStorage from '@react-native-async-storage/async-storage';
import {parse, UrlObject} from 'ale-url-parser';
import _ from 'lodash';
import {Alert, Linking} from 'react-native';
import CodePush from 'react-native-code-push';
import {navigationRef} from '../navigators/navigation';

let initalized = false;
export const routes: {
  path: string;
  children?: boolean;
  action: (url: UrlObject) => any;
}[] = [];

export const onSchemeInitalize = async () => {
  if (initalized || !navigationRef.current) return;
  initalized = true;

  routes.push({
    path: 'home',
    action: () => navigationRef.current?.navigate('Main', {screen: 'Home'}),
  });

  routes.push({
    path: 'weblink',
    children: true,
    action: url => {
      const {path, query} = url;
      if (!path) return;

      const rawQuery = new URLSearchParams(query).toString();
      let page = `${path.join('/')}`;
      if (rawQuery) page += `?${rawQuery}`;
      navigationRef.current?.navigate('Weblink', {page});
    },
  });

  routes.push({
    path: 'payments',
    action: () => navigationRef.current?.navigate('Payment', {screen: 'List'}),
  });

  routes.push({
    path: 'rides',
    action: () => navigationRef.current?.navigate('Rides'),
  });

  routes.push({
    path: 'payments/register',
    action: ({query: params}) =>
      navigationRef.current?.navigate('Payment', {screen: 'Register', params}),
  });

  routes.push({
    path: 'notices',
    children: true,
    action: url => {
      const page = url.path?.join('/');
      navigationRef.current?.navigate('Notice', {page});
    },
  });

  routes.push({
    path: 'coupons',
    action: () => navigationRef.current?.navigate('Coupon', {screen: 'List'}),
  });

  routes.push({
    path: 'coupons/register',
    action: ({query: params}) =>
      navigationRef.current?.navigate('Coupon', {screen: 'Register', params}),
  });

  routes.push({
    path: 'debug',
    action: ({path}) => {
      const screen: any = _.camelCase(path?.join('/'));
      navigationRef.current?.navigate('Debug', {screen});
    },
  });

  routes.push({
    path: 'auth/logout',
    action: () => {
      const onPress = () => {
        AsyncStorage.clear();
        CodePush.restartApp();
      };

      Alert.alert(
        '로그아웃',
        '정말로 로그아웃하시겠습니까?',
        [
          {text: '아니요', style: 'cancel'},
          {text: '네, 로그아웃합니다', onPress},
        ],
        {cancelable: true},
      );
    },
  });

  routes.push({
    path: 'qrcode',
    action: ({query: params}) =>
      navigationRef.current?.navigate('Qrcode', params),
  });

  routes.push({
    path: 'helmet',
    action: () => navigationRef.current?.navigate('Helmet'),
  });

  routes.push({
    path: 'kakaotalk',
    action: () => Linking.openURL('kakaoplus://plusfriend/home/338273664'),
  });

  await Linking.getInitialURL().then(onSchemeAction);
  Linking.addEventListener('url', ({url}) => onSchemeAction(url));
};

export const onSchemeAction = async (url: string | null) => {
  console.log(`Opening url: ${url}`);
  if (!url || !url.startsWith('hikick')) return;
  const parsedUrl = parse(url);
  const {host, path} = parsedUrl;

  let rawPath = host;
  if (path && path.length > 0) rawPath += `/${path.join('/')}`;
  const route = routes.reverse().find(route => {
    const matchPath = route.children ? host : rawPath;
    return route.path === matchPath;
  });

  if (!route) {
    console.log(`Cannot find route for ${rawPath}`);
    return;
  }

  route.action(parsedUrl);
};

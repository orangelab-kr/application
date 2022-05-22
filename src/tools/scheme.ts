import {parse} from 'ale-url-parser';
import {Linking} from 'react-native';
import {navigationRef} from '../navigators/navigation';

export let initalized = false;
export const routes: {
  [key: string]: (params: string[], query?: any) => void;
} = {
  home: () => navigationRef.current?.navigate('Main', {screen: 'Home'}),
  weblink: ([], {page}) => navigationRef.current?.navigate('Weblink', {page}),
  payments: () => navigationRef.current?.navigate('Payment'),
  add_payments: () => navigationRef.current?.navigate('Payment'),
  notices: () => navigationRef.current?.navigate('Notice'),
  coupons: () => navigationRef.current?.navigate('Coupon', {screen: 'List'}),
  register_coupon: ([], params) =>
    navigationRef.current?.navigate('Coupon', {screen: 'Register', params}),
  debug: () => navigationRef.current?.navigate('Debug'),
};

export const onSchemeInitalize = async () => {
  if (initalized) return;
  initalized = true;

  await Linking.getInitialURL().then(onSchemeAction);
  Linking.addEventListener('url', ({url}) => onSchemeAction(url));
};

export const onSchemeAction = async (url: string | null) => {
  console.log(`Intent url: ${url}`);
  if (!url || !url.startsWith('hikick')) return;
  const {host, path = [], query = {}} = parse(url);
  const route = Object.keys(routes).find(key => key === host);
  if (!route) return;

  try {
    routes[route](path, query);
  } catch (err) {
    console.log(err);
  }
};

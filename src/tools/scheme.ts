import {Linking} from 'react-native';
import {navigationRef} from '../navigators/navigation';

export let initalized = false;

export const onSchemeInitalize = async () => {
  if (initalized) return;
  initalized = true;

  await Linking.getInitialURL().then(onSchemeAction);
  Linking.addEventListener('url', ({url}) => onSchemeAction(url));
};

export const onSchemeAction = async (url: string | null) => {
  console.log(`Intent url: ${url}`);
  if (!url || !url.startsWith('hikick')) return;
  navigationRef.current?.navigate('Qrcode');
};

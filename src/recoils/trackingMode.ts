import {TrackingMode} from 'react-native-nmap';
import {atom} from 'recoil';

export const trackingModeState = atom<
  Exclude<TrackingMode, TrackingMode.None | TrackingMode.NoFollow>
>({
  key: 'trackingMode',
  default: TrackingMode.Face,
});

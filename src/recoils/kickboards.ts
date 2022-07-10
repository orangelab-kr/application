import {atom} from 'recoil';
import {RideKickboard} from '../api/ride';

export const kickboardsState = atom<{
  [key: string]: RideKickboard;
}>({
  key: 'kickboards',
  default: {},
});

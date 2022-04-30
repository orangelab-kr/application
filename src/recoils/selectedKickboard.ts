import {atom, selector} from 'recoil';
import {RideClient, RideKickboard} from '../api/ride';
import {selectedKickboardCodeState} from './selectedKickboardCode';

export const resetSelectedKickboardState = atom({
  key: 'resetSelectedKickboardState',
  default: false,
});

export const selectedKickboardState = selector<RideKickboard | undefined>({
  key: 'selectedKickboard',
  get: async ({get}) => {
    get(resetSelectedKickboardState);
    const kickboardCode = get(selectedKickboardCodeState);
    if (!kickboardCode) return undefined;

    const {kickboard} = await RideClient.getKickboard(kickboardCode);
    return kickboard;
  },
});

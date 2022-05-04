import {atom, selector} from 'recoil';
import {RideClient, RideKickboard} from '../api/ride';
import {selectedKickboardCodeState} from './selectedKickboardCode';

export const resetSelectedKickboardState = atom({
  key: 'resetSelectedKickboardState',
  default: false,
});

export const selectedKickboardState = selector<
  RideKickboard | undefined | null
>({
  key: 'selectedKickboard',
  get: async ({get}) => {
    try {
      get(resetSelectedKickboardState);
      const kickboardCode = get(selectedKickboardCodeState);
      if (!kickboardCode) return undefined;

      const {kickboard} = await RideClient.getKickboard(kickboardCode);
      return kickboard;
    } catch (err) {
      return null;
    }
  },
});

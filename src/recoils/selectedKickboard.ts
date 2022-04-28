import {selector} from 'recoil';
import {RideClient, RideKickboard} from '../api/ride';
import {selectedKickboardCodeState} from './selectedKickboardCode';

export const selectedKickboardState = selector<RideKickboard | undefined>({
  key: 'selectedKickboard',
  get: async ({get}) => {
    const kickboardCode = get(selectedKickboardCodeState);
    if (!kickboardCode) return undefined;

    const {kickboard} = await RideClient.getKickboard(kickboardCode);
    return kickboard;
  },
});

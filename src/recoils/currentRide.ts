import {atom} from 'recoil';
import {RideClient, RideRide} from '../api/ride';

export const currentRideState = atom<RideRide | undefined>({
  key: 'currentRide',
  default: undefined,
  effects: [
    ({setSelf}) => {
      const getRide = async () => {
        const currentRide = await RideClient.getCurrentRide();
        setSelf(currentRide.ride);
      };

      getRide();
      const interval = setInterval(getRide, 30000);
      return () => clearInterval(interval);
    },
  ],
});

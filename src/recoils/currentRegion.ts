import {atom} from 'recoil';
import {RideGeofenceWithRegion} from '../api/ride';

export const currentRegionState = atom<RideGeofenceWithRegion | undefined>({
  key: 'currentRegion',
  default: undefined,
});

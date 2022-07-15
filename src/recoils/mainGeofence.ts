import {atom} from 'recoil';
import {RideRegionGeofence} from '../api/ride';

export const mainGeofenceState = atom<RideRegionGeofence | undefined>({
  key: 'mainGeofence',
  default: undefined,
});

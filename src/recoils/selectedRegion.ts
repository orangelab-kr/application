import {atom} from 'recoil';
import {RideRegionGeofence} from '../api/ride';

export const selectedGeofenceState = atom<RideRegionGeofence | undefined>({
  key: 'selectedGeofence',
  default: undefined,
});

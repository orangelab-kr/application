import {atom} from 'recoil';
import {RideRegionGeofence} from '../api/ride';

export const geofencesState = atom<RideRegionGeofence[]>({
  key: 'geofences',
  default: [],
});

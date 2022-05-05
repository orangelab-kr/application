import {atom} from 'recoil';
import {RideRegion, RideRegionGeofence} from '../api/ride';

export interface SelectedRegion {
  region: RideRegion;
  geofence: RideRegionGeofence;
}

export const selectedRegionState = atom<SelectedRegion | undefined>({
  key: 'selectedRegion',
  default: undefined,
});

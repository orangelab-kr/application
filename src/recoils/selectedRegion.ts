import {atom} from 'recoil';
import {RideRegionGeofence, RideShortRegion} from '../api/ride';

export interface SelectedRegion {
  region: RideShortRegion;
  geofence: RideRegionGeofence;
}

export const selectedRegionState = atom<SelectedRegion | undefined>({
  key: 'selectedRegion',
  default: undefined,
});

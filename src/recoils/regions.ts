import {atom} from 'recoil';
import {ResponseRideGetRegions} from '../api/ride';

export const RegionsState = atom<ResponseRideGetRegions['regions'] | undefined>(
  {
    key: 'regions',
    default: undefined,
  },
);

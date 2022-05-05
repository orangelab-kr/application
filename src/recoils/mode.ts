import {selector} from 'recoil';
import {currentRideState} from './currentRide';
import {selectedKickboardCodeState} from './selectedKickboardCode';
import {selectedRegionState} from './selectedRegion';

type Modes = 'welcome' | 'region' | 'kickboard' | 'riding';

export const modeState = selector({
  key: 'mode',
  get: ({get}) => {
    let mode: Modes = 'welcome';
    const selectedKickboard = get(selectedKickboardCodeState);
    const selectedRegion = get(selectedRegionState);
    const currentRide = get(currentRideState);
    if (selectedRegion) mode = 'region';
    if (selectedKickboard) mode = 'kickboard';
    if (currentRide) mode = 'riding';
    console.log(mode);
    return mode;
  },
});

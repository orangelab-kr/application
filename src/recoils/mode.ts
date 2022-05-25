import {selector} from 'recoil';
import {confirmState} from './confirm';
import {currentRideState} from './currentRide';
import {selectedKickboardCodeState} from './selectedKickboardCode';
import {selectedRegionState} from './selectedRegion';

type Modes = 'welcome' | 'region' | 'kickboard' | 'riding' | 'confirm';

export const modeState = selector({
  key: 'mode',
  get: ({get}) => {
    let mode: Modes = 'welcome';
    const selectedKickboard = get(selectedKickboardCodeState);
    const selectedRegion = get(selectedRegionState);
    const currentRide = get(currentRideState);
    const confirm = get(confirmState);
    if (selectedRegion) mode = 'region';
    if (selectedKickboard) mode = 'kickboard';
    if (selectedKickboard && confirm) mode = 'confirm';
    if (currentRide) mode = 'riding';
    console.log(mode);
    return mode;
  },
});

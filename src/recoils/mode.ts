import {selector} from 'recoil';
import {currentRideState} from './currentRide';
import {selectedKickboardCodeState} from './selectedKickboardCode';

type Modes = 'welcome' | 'kickboard' | 'riding';

export const modeState = selector({
  key: 'mode',
  get: ({get}) => {
    let mode: Modes = 'welcome';
    const selectedKickboard = get(selectedKickboardCodeState);
    const currentRide = get(currentRideState);
    if (selectedKickboard) mode = 'kickboard';
    if (currentRide) mode = 'riding';
    console.log(mode);
    return mode;
  },
});

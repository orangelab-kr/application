import {atom} from 'recoil';
import {CameraLoc} from '../models/cameraLoc';

export const cameraLocState = atom<CameraLoc | undefined>({
  key: 'cameraLoc',
  default: undefined,
});

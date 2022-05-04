import {atom} from 'recoil';

export const confirmState = atom<boolean>({
  key: 'confirm',
  default: false,
});

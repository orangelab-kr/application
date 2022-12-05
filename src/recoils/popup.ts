import {atom} from 'recoil';

export const PopupState = atom<boolean>({
  key: 'popup',
  default: false,
});

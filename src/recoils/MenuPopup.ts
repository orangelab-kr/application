import {atom} from 'recoil';

export const menuPopupState = atom<boolean>({
  key: 'menuPopup',
  default: false,
});

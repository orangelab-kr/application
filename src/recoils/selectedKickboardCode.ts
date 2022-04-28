import {atom} from 'recoil';

export const selectedKickboardCodeState = atom<string | undefined>({
  key: 'selectedKickboardCode',
  default: undefined,
});

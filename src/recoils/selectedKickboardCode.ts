import {atom} from 'recoil';

export const selectedKickboardCodeState = atom<string | null | undefined>({
  key: 'selectedKickboardCode',
  default: undefined,
});

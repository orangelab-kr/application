import {atom} from 'recoil';

export const CouponSelectorState = atom<boolean>({
  key: 'couponSelector',
  default: false,
});

import {atom} from 'recoil';
import {PaymentsCoupon} from '../api/payments';

export const selectedCouponState = atom<PaymentsCoupon | undefined>({
  key: 'selectedCoupon',
  default: undefined,
});

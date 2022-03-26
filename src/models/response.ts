import {AuthVerifyPhone} from './auth';
import {CommonResponse} from './common';

export type AccountsMethodsPhoneVerify = CommonResponse<{
  phone: AuthVerifyPhone;
  code: string;
}>;

import {AuthVerifyPhone} from './auth';

export interface AccountsAuthSignup {
  realname: string;
  birthday: Date | string;
  email?: string;
  receiveSMS?: boolean;
  receivePush?: boolean;
  receiveEmail?: boolean;
  phone: AuthVerifyPhone;
}

import {CommonResponse} from '../models/common';
import {createClient} from './client';

export interface RequestAccountsAuthSignup {
  realname: string;
  birthday: Date | string;
  email?: string;
  receiveSMS?: boolean;
  receivePush?: boolean;
  receiveEmail?: boolean;
  phone: AuthVerifyPhone;
}

export type ResponseAccountsMethodsPhoneVerify = CommonResponse<{
  phone: AuthVerifyPhone;
}>;

export type ResponseAccountsAuthInfo = CommonResponse<{
  user: AuthUser;
}>;

export type ResponseAccountsAuthLogin = CommonResponse<{
  user: AuthUser;
  sessionId: string;
}>;

export interface AuthVerifyPhone {
  phoneId: string;
  phoneNo: string;
  code?: string;
}

export interface AuthUser {
  userId: string;
  realname: string;
  phoneNo: string;
  email?: string;
  levelNo: number;
  birthday: string;
  licenseId: string;
  profileUrl: string;
  receiveEmail?: string;
  receiveSMS?: string;
  receivePush?: string;
  referralCode: string;
  referrerUserId?: string;
  usedAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
}

export class AccountsClient {
  private static client = createClient('accounts');

  static async getUser(): Promise<ResponseAccountsAuthInfo> {
    return this.client.get('/auth').then(r => r.data);
  }

  static async requestPhone(phoneNo: string): Promise<void> {
    await this.client.get('/methods/phone/verify', {
      params: {phoneNo},
    });
  }

  static async verifyPhone(
    phoneNo: string,
    code: string,
  ): Promise<ResponseAccountsMethodsPhoneVerify> {
    return this.client
      .post('/methods/phone/verify', {phoneNo, code})
      .then(r => r.data);
  }

  static async loginByPhone(
    phone: AuthVerifyPhone,
  ): Promise<ResponseAccountsAuthLogin> {
    return this.client.post(`/auth/login/phone`, {phone}).then(r => r.data);
  }
}

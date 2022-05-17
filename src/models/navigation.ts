import {ParamListBase} from '@react-navigation/native';
import {TakePictureResponse} from 'react-native-camera';
import {AuthVerifyPhone} from '../api/accounts';

type SubNavigator<T extends ParamListBase> = {
  [K in keyof T]: {screen: K; params?: T[K]};
}[keyof T];

export type RootNavigatorRouteParams = {
  Splash: undefined;
  Start: undefined;
  Permission: undefined;
  Main: undefined | SubNavigator<MainNavigatorRouteParams>;
  Auth: undefined | SubNavigator<AuthNavigatorRouteParams>;
  ReturnedPhoto: SubNavigator<ReturnedPhotoNavigatorRouteParams>;
  Payment: undefined | SubNavigator<PaymentsNavigatorRouteParams>;
  Weblink: {page: string};
  Qrcode: undefined;
};

export type ReturnedPhotoNavigatorRouteParams = {
  Camera: {rideId: string};
  Confirm: ReturnedPhotoNavigatorRouteParams['Camera'] & {
    photo: TakePictureResponse;
  };
};

export type PaymentsNavigatorRouteParams = {
  List: undefined;
  Register: {
    cardNumber?: string;
    expiry?: string;
    password?: string;
    birthday?: string;
  };
};

export type AuthNavigatorRouteParams = {
  SignupName: {phone: AuthVerifyPhone};
  SignupBirthday: AuthNavigatorRouteParams['SignupName'] & {realname: string};
  SignupTerms: AuthNavigatorRouteParams['SignupBirthday'] & {birthday: Date};
  Verify: {phoneNo: string};
};

export type MainNavigatorRouteParams = {
  Home: undefined;
};

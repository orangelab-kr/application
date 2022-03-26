import {ParamListBase} from '@react-navigation/native';
import {AuthVerifyPhone} from './auth';

type SubNavigator<T extends ParamListBase> = {
  [K in keyof T]: {screen: K; params?: T[K]};
}[keyof T];

export type RootNavigatorRouteParams = {
  Splash: undefined;
  Start: undefined;
  Auth: SubNavigator<AuthNavigatorRouteParams>;
};

export type AuthNavigatorRouteParams = {
  SignupName: {phone: AuthVerifyPhone};
  SignupBirthday: AuthNavigatorRouteParams['SignupName'] & {realname: string};
  SignupTerms: AuthNavigatorRouteParams['SignupBirthday'] & {birthday: Date};
  Verify: {phoneNo: string};
};

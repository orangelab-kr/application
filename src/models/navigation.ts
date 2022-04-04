import {ParamListBase} from '@react-navigation/native';
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
};

export type AuthNavigatorRouteParams = {
  SignupName: {phone: AuthVerifyPhone};
  SignupBirthday: AuthNavigatorRouteParams['SignupName'] & {realname: string};
  SignupTerms: AuthNavigatorRouteParams['SignupBirthday'] & {birthday: Date};
  Verify: {phoneNo: string};
};

export type MainNavigatorRouteParams = {
  Home: undefined;
  History: undefined;
  Settings: undefined;
};

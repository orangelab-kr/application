import {LabelPosition} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {NavigationContainerRef} from '@react-navigation/native';
import * as React from 'react';
import {
  AuthNavigatorRouteParams,
  RootNavigatorRouteParams,
} from '../models/navigation';

export interface RootParamList
  extends RootNavigatorRouteParams,
    AuthNavigatorRouteParams {}

export const navigationRef =
  React.createRef<NavigationContainerRef<RootParamList>>();

export interface TabScreenLabelProps {
  focused: boolean;
  color: string;
  position: LabelPosition;
}

export interface TabScreenIconProps {
  focused: boolean;
  color: string;
  size: number;
}

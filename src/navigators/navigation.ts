import {LabelPosition} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {NavigationContainerRef} from '@react-navigation/core';
import * as React from 'react';

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

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

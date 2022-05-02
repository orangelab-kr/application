import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {RootNavigatorRouteParams} from '../models/navigation';
import {Permission} from '../screens/permission';
import {Qrcode} from '../screens/qrcode';
import {ReturnedPhoto} from '../screens/returnedPhoto';
import {Splash} from '../screens/splash';
import {Start} from '../screens/start';
import {Weblink} from '../screens/weblink';
import {AuthNavigator} from './auth';
import {MainNavigator} from './main';

export const RootNavigator: React.FC = () => {
  const Stack = createNativeStackNavigator<RootNavigatorRouteParams>();

  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen
        name="Main"
        component={MainNavigator}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen
        name="Permission"
        component={Permission}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen name="Start" component={Start} />
      <Stack.Screen
        name="Auth"
        component={AuthNavigator}
        options={{animation: 'fade_from_bottom'}}
      />
      <Stack.Screen
        name="Qrcode"
        component={Qrcode}
        options={{animation: 'fade_from_bottom'}}
      />
      <Stack.Screen
        name="ReturnedPhoto"
        component={ReturnedPhoto}
        options={{animation: 'fade_from_bottom'}}
      />
      <Stack.Screen name="Weblink" component={Weblink} />
    </Stack.Navigator>
  );
};

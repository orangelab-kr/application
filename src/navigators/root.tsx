import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {RootNavigatorRouteParams} from '../models/navigation';
import {Notice} from '../screens/notice';
import {Permission} from '../screens/permission';
import {Qrcode} from '../screens/qrcode';
import {Splash} from '../screens/splash';
import {Start} from '../screens/start';
import {Weblink} from '../screens/weblink';
import {AuthNavigator} from './auth';
import {CouponNavigator} from './coupon';
import {DebugNavigator} from './debug';
import {HelmetNavigator} from './helmet';
import {MainNavigator} from './main';
import {PaymentNavigator} from './payment';
import {ReturnedPhotoNavigator} from './returnedPhoto';
import {RideNavigator} from './ride';

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
        name="ReturnedPhoto"
        component={ReturnedPhotoNavigator}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen
        name="Permission"
        component={Permission}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen
        name="Start"
        component={Start}
        options={{gestureEnabled: false}}
      />
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
      <Stack.Screen name="Rides" component={RideNavigator} />
      <Stack.Screen name="Helmet" component={HelmetNavigator} />
      <Stack.Screen name="Payment" component={PaymentNavigator} />
      <Stack.Screen name="Coupon" component={CouponNavigator} />
      <Stack.Screen name="Debug" component={DebugNavigator} />
      <Stack.Screen name="Weblink" component={Weblink} />
      <Stack.Screen name="Notice" component={Notice} />
    </Stack.Navigator>
  );
};

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {CouponsNavigatorRouteParams} from '../models/navigation';
import {CouponList} from '../screens/coupons/list';
import {CouponRegister} from '../screens/coupons/register';

export const CouponNavigator: React.FC = () => {
  const Stack = createNativeStackNavigator<CouponsNavigatorRouteParams>();

  return (
    <Stack.Navigator
      initialRouteName="List"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="List" component={CouponList} />
      <Stack.Screen
        name="Register"
        component={CouponRegister}
        options={{animation: 'fade'}}
      />
    </Stack.Navigator>
  );
};

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {RidesNavigatorRouteParams} from '../models/navigation';
import {PaymentRegister} from '../screens/payment/register';
import {RideDetail} from '../screens/rides/detail';
import {RideList} from '../screens/rides/list';

export const RideNavigator: React.FC = () => {
  const Stack = createNativeStackNavigator<RidesNavigatorRouteParams>();

  return (
    <Stack.Navigator
      initialRouteName="List"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="List" component={RideList} />
      <Stack.Screen
        name="Detail"
        component={RideDetail}
        options={{animation: 'fade'}}
      />
    </Stack.Navigator>
  );
};

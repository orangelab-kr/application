import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {PaymentsNavigatorRouteParams} from '../models/navigation';
import {PaymentList} from '../screens/payment/list';
import {PaymentRegister} from '../screens/payment/register';

export const PaymentNavigator: React.FC = () => {
  const Stack = createNativeStackNavigator<PaymentsNavigatorRouteParams>();

  return (
    <Stack.Navigator
      initialRouteName="List"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="List" component={PaymentList} />
      <Stack.Screen
        name="Register"
        component={PaymentRegister}
        options={{animation: 'fade'}}
      />
    </Stack.Navigator>
  );
};

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {PaymentsNavigatorRouteParams} from '../models/navigation';
import {PaymentRegister} from '../screens/payment/register';

export const PaymentNavigator: React.FC = () => {
  const Stack = createNativeStackNavigator<PaymentsNavigatorRouteParams>();

  return (
    <Stack.Navigator
      initialRouteName="Register"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Register" component={PaymentRegister} />
    </Stack.Navigator>
  );
};

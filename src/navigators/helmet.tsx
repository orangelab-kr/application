import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {HelmetNavigatorRouteParams} from '../models/navigation';
import {HelmetBorrow} from '../screens/helmet/borrow';
import {HelmetReturn} from '../screens/helmet/return';
import {HelmetTerms} from '../screens/helmet/terms';

export const HelmetNavigator: React.FC = () => {
  const Stack = createNativeStackNavigator<HelmetNavigatorRouteParams>();

  return (
    <Stack.Navigator
      initialRouteName="Terms"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Terms" component={HelmetTerms} />
      <Stack.Screen name="Borrow" component={HelmetBorrow} />
      <Stack.Screen name="Return" component={HelmetReturn} />
    </Stack.Navigator>
  );
};

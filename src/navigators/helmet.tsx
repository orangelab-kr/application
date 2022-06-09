import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {HelmetNavigatorRouteParams} from '../models/navigation';
import {HelmetTerms} from '../screens/helmet/terms';

export const HelmetNavigator: React.FC = () => {
  const Stack = createNativeStackNavigator<HelmetNavigatorRouteParams>();

  return (
    <Stack.Navigator
      initialRouteName="Terms"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Terms" component={HelmetTerms} />
    </Stack.Navigator>
  );
};

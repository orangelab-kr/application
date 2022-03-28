import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {RootNavigatorRouteParams} from '../models/navigation';
import {Main} from '../screens/main';
import {Splash} from '../screens/splash';
import {Start} from '../screens/start';
import {AuthNavigator} from './auth';

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
        component={Main}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen name="Start" component={Start} />
      <Stack.Screen
        name="Auth"
        component={AuthNavigator}
        options={{animation: 'fade_from_bottom'}}
      />
    </Stack.Navigator>
  );
};

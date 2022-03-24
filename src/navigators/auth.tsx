import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AuthNavigatorRouteParams} from '../models/navigation';
import {AuthSignupBirthday} from '../screens/auth/signup/birthday';
import {AuthSignupName} from '../screens/auth/signup/name';
import {AuthSignupTerms} from '../screens/auth/signup/terms';
import {AuthVerify} from '../screens/auth/verify';

export const AuthNavigator: React.FC = () => {
  const Stack = createNativeStackNavigator<AuthNavigatorRouteParams>();

  return (
    <Stack.Navigator
      initialRouteName="Verify"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Verify" component={AuthVerify} />
      <Stack.Screen
        name="SignupName"
        component={AuthSignupName}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen name="SignupBirthday" component={AuthSignupBirthday} />
      <Stack.Screen name="SignupTerms" component={AuthSignupTerms} />
    </Stack.Navigator>
  );
};

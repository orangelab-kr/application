import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {DebugNavigatorRouteParams} from '../models/navigation';
import {DebugBluetooth} from '../screens/debug/bluetooth';

export const DebugNavigator: React.FC = () => {
  const Stack = createNativeStackNavigator<DebugNavigatorRouteParams>();

  return (
    <Stack.Navigator
      initialRouteName="Bluetooth"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Bluetooth" component={DebugBluetooth} />
    </Stack.Navigator>
  );
};

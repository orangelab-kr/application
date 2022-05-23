import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {DebugNavigatorRouteParams} from '../models/navigation';
import {DebugBluetooth} from '../screens/debug/bluetooth';
import {DebugMenu} from '../screens/debug/menu';

export const DebugNavigator: React.FC = () => {
  const Stack = createNativeStackNavigator<DebugNavigatorRouteParams>();

  return (
    <Stack.Navigator
      initialRouteName="Menu"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Menu" component={DebugMenu} />
      <Stack.Screen name="Bluetooth" component={DebugBluetooth} />
    </Stack.Navigator>
  );
};

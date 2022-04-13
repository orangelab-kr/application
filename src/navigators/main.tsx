import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {MainNavigatorRouteParams} from '../models/navigation';
import {Home} from '../screens/main/home';

export const MainNavigator: React.FC = () => {
  const Tab = createNativeStackNavigator<MainNavigatorRouteParams>();

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
};

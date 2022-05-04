import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ReturnedPhotoNavigatorRouteParams} from '../models/navigation';
import {ReturnedPhotoCamera} from '../screens/returnedPhoto/camera';
import {ReturnedPhotoConfirm} from '../screens/returnedPhoto/confirm';

export const ReturnedPhotoNavigator: React.FC = () => {
  const Stack = createNativeStackNavigator<ReturnedPhotoNavigatorRouteParams>();

  return (
    <Stack.Navigator
      initialRouteName="Camera"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Camera"
        component={ReturnedPhotoCamera}
        options={{animation: 'fade_from_bottom'}}
      />
      <Stack.Screen
        name="Confirm"
        component={ReturnedPhotoConfirm}
        options={{animation: 'fade_from_bottom'}}
      />
    </Stack.Navigator>
  );
};

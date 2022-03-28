import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useUser} from '../hooks/useUser';

export const Main: React.FC = () => {
  const navigation = useNavigation();
  const user = useUser({cache: true});

  const realname = user && user.realname;
  console.log(user);

  return (
    <SafeAreaView>
      <Text>{realname}</Text>
      <Button
        title="로그아웃"
        onPress={async () => {
          await AsyncStorage.removeItem('accessToken');
          navigation.dispatch(
            CommonActions.reset({index: 0, routes: [{name: 'Splash'}]}),
          );
        }}
      />
    </SafeAreaView>
  );
};

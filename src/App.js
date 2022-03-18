import React from 'react';
import {SafeAreaView, StatusBar, Text} from 'react-native';

export const App = () => {
  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <Text>하이킥</Text>
    </SafeAreaView>
  );
};

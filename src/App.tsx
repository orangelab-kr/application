import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {LogBox, StatusBar, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {navigationRef} from './navigators/navigation';
import {RootNavigator} from './navigators/root';

const styles = StyleSheet.create({container: {flex: 1}});
export const App: React.FC = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer
        ref={navigationRef}
        theme={{colors: {background: '#fff'}} as any}>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  'Node of type rule not supported as an inline style',
]);

LogBox.ignoreAllLogs();

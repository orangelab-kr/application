import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
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

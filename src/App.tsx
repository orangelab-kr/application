import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {LogBox, StatusBar, StyleSheet} from 'react-native';
import {NotifierWrapper} from 'react-native-notifier';
import {ShowNotificationParams} from 'react-native-notifier/lib/typescript/types';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RecoilRoot} from 'recoil';
import {navigationRef} from './navigators/navigation';
import {RootNavigator} from './navigators/root';
import {onRemoteConfigInitalize} from './tools/remoteConfig';

const styles = StyleSheet.create({container: {flex: 1}});
export const App: React.FC = () => {
  useEffect(() => {
    onRemoteConfigInitalize();
  }, []);

  const notifierProps: ShowNotificationParams = {
    duration: 5000,
    showAnimationDuration: 700,
    hideOnPress: true,
    componentProps: {
      containerStyle: {borderRadius: 12},
      titleStyle: {color: '#0a0c0c', fontWeight: '700'},
      descriptionStyle: {color: '#0a0c0c', fontWeight: '400'},
    },
  };

  return (
    <RecoilRoot>
      <NotifierWrapper {...notifierProps}>
        <SafeAreaProvider style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <NavigationContainer
            ref={navigationRef}
            theme={{colors: {background: '#fcfeff'}} as any}>
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </NotifierWrapper>
    </RecoilRoot>
  );
};

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  'Node of type rule not supported as an inline style',
]);

LogBox.ignoreAllLogs();

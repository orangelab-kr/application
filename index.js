/**
 * @format
 */

import {AppRegistry} from 'react-native';
import CodePush from 'react-native-code-push';
import 'react-native-gesture-handler';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {name as appName} from './app.json';
import {App} from './src/App';

AppRegistry.registerComponent(appName, () =>
  CodePush(gestureHandlerRootHOC(App)),
);

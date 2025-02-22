/**
 * @format
 */

import {AppRegistry} from 'react-native';
import CodePush from 'react-native-code-push';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import 'react-native-reanimated';
import {name as appName} from './app.json';
import './shim';
import {App} from './src/App';

const options = {checkFrequency: CodePush.CheckFrequency.MANUAL};
AppRegistry.registerComponent(appName, () =>
  CodePush(options)(gestureHandlerRootHOC(App)),
);

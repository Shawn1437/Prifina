/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Global warning suppression for NativeEventEmitter issues
if (__DEV__) {
  LogBox.ignoreLogs([
    'new NativeEventEmitter',
    'addListener',
    'removeListeners',
    'EventEmitter.removeListener',
    'was called with a non-null argument without the required',
  ]);
}

AppRegistry.registerComponent(appName, () => App);

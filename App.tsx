/**
 * Prifina App
 * Mobile interface for educational sessions and live feeds
 *
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import StackNavigator from '@src/navigations/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <NavigationContainer>
        <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
        <StackNavigator />
      </NavigationContainer>
    </>
  );
}

export default App;

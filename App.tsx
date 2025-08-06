/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import useAppStore from './src/store/appStore';
import { StatusBar, useColorScheme, LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppNavigator } from './src/navigation';
import SplashScreen from './src/components/SplashScreen';
import { colors } from './src/styles';

// Suppress NativeEventEmitter warnings in development
if (__DEV__) {
  LogBox.ignoreLogs([
    'new NativeEventEmitter',
    'addListener',
    'removeListeners',
    'EventEmitter.removeListener',
  ]);
  
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (
      args[0] &&
      typeof args[0] === 'string' &&
      (args[0].includes('new NativeEventEmitter') ||
        args[0].includes('was called with a non-null argument without the required') ||
        args[0].includes('addListener') ||
        args[0].includes('removeListeners'))
    ) {
      return;
    }
    originalWarn(...args);
  };
}

function App() {
  // Zustand state usage example
  const count = useAppStore((state: { count: number }) => state.count);
  const increase = useAppStore((state: { increase: () => void }) => state.increase);
  const decrease = useAppStore((state: { decrease: () => void }) => state.decrease);
  // Log to console for test
  console.log('Zustand count:', count);

  // Directly increment count on mount for testing
  React.useEffect(() => {
    increase();
    setTimeout(() => {
      // Log again after increment
      console.log('Zustand count after increase:', useAppStore.getState().count);
    }, 100);
    // eslint-disable-next-line
  }, []);
  const [showSplash, setShowSplash] = useState(true);
  const [appReady, setAppReady] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';

  // Preload the main app
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setAppReady(true);
    }, 1000); // Give main app time to initialize

    return () => clearTimeout(timer);
  }, []);

  const handleSplashEnd = () => {
    // Only hide splash if main app is ready
    if (appReady) {
      setShowSplash(false);
    } else {
      // Wait for app to be ready
      const checkReady = setInterval(() => {
        if (appReady) {
          clearInterval(checkReady);
          setShowSplash(false);
        }
      }, 100);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <SafeAreaProvider>
        {/* Always render main app to preload it */}
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={colors.white}
        />
        <AppNavigator />
        
        {/* Show splash screen overlay while loading */}
        {showSplash && (
          <SplashScreen onAnimationEnd={handleSplashEnd} />
        )}
        {/* Example buttons to test Zustand actions in UI (optional, remove if not needed) */}
        {/*
        <View style={{ position: 'absolute', bottom: 40, left: 20 }}>
          <Button title="Increase" onPress={increase} />
          <Button title="Decrease" onPress={decrease} />
        </View>
        */}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;

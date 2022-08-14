import 'react-native-gesture-handler';
import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { Platform, StatusBar } from 'react-native';

const App = () => {
  const ColorTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      defaultColor: '#FFFFFF',
      defaultDarkColor: '#000000',
      backgroundColor: '#FFFFFF',
    }
  };

  return (
    <NavigationContainer theme={ColorTheme}>
      {Platform.OS === 'ios' && <StatusBar barStyle={'dark-content'} />}
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;

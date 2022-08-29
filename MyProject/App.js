import 'react-native-gesture-handler';
import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { Platform, StatusBar } from 'react-native';
import { enableScreens } from 'react-native-screens';

enableScreens(false);

const App = () => {
  const ColorTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      defaultColor: '#FFFFFF',
      defaultDarkColor: '#575757',
      backgroundColor: '#FDFDFD',
      green : {
        1: '#28b0e0',
        2: '#88d2f5',
        3: '#BEDEF3',
      },
      blue: {
        1: '#aeddf7',
        2: '#d7effb',
      },
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

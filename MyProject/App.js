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
      backgroundColor: '#F8F8F8',
      green : {
        1: '#70743A',
        2: '#B3B46D',
        3: '#D8D2C0',
      },
      blue: {
        1: '#CDD3D5',
        2: '#D4D6E0',
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

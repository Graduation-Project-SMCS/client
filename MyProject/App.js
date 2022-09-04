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
      defaultDarkColor: '#666666',
      backgroundColor: '#FDFDFD',
      brown : {
        1: '#3d2102',
        2: '#68523a',
        3: '#ffa35c',
        4: '#9e9081',
        5: '#b4a99d',
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

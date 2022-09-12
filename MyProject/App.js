import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { Platform, StatusBar } from 'react-native';
import { enableScreens } from 'react-native-screens';
import UserInfoContext from './components/UserInfoContext';
import { Provider } from './context';

enableScreens(false);

const App = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState(0);

  const userInfo = {
    email: userEmail,
    name: userName,
    role: userRole,
    id: userId,
    setUserEmail,
    setUserName,
    setUserRole,
    setUserId,
  };

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
    <Provider>
      <UserInfoContext.Provider value={userInfo}>
        <NavigationContainer theme={ColorTheme}>
          {Platform.OS === 'ios' && <StatusBar barStyle={'dark-content'} />}
          <AppNavigator />
        </NavigationContainer>
      </UserInfoContext.Provider>
    </Provider>
  );
};

export default App;

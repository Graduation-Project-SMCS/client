import React from 'react';
import {
  useColorScheme,
  Image,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { HomeScreen, CalendarScreen, MissionScreen, MyPageScreen } from './pages';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? require('./assets/images/icon/home_filled.png') : require('./assets/images/icon/home.png');
          } else if (route.name === 'Calendar') {
            iconName = focused ? require('./assets/images/icon/calendar_filled.png') : require('./assets/images/icon/calendar.png');
          } else if (route.name === 'Mission') {
            iconName = focused ? require('./assets/images/icon/mission_filled.png') : require('./assets/images/icon/mission.png');
          } else if (route.name === 'My') {
            iconName = focused ? require('./assets/images/icon/my_filled.png') : require('./assets/images/icon/my.png');
          }

          return <Image source={iconName} style={{width: 25, height: 25}} />;
        },
        tabBarActiveTintColor: 'green', tabBarInactiveTintColor: 'grey', tabBarStyle: [{display: 'flex'}], headerShown: false
      })}
      >
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="Mission" component={MissionScreen} />
        <Tab.Screen name="My" component={MyPageScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

import React from 'react';
import {
  Image,
  View,
} from 'react-native';
import { HomeScreen, CalendarScreen, MissionScreen, MyPageScreen } from '../pages';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MissionNavigator from './MissionNavigator';
import { useTheme } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function HomeNavigator({navigation}) {
  const {colors} = useTheme();

  return (
        <Tab.Navigator initialRouteName='Home'
            screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
                let iconName;
                if (route.name === 'Home') {
                iconName = focused ? require('../assets/images/icon/home_filled.png') : require('../assets/images/icon/home.png');
                } else if (route.name === 'Calendar') {
                iconName = focused ? require('../assets/images/icon/calendar_filled.png') : require('../assets/images/icon/calendar.png');
                } else if (route.name === 'Mission') {
                iconName = focused ? require('../assets/images/icon/mission_filled.png') : require('../assets/images/icon/mission.png');
                } else if (route.name === 'My') {
                iconName = focused ? require('../assets/images/icon/my_filled.png') : require('../assets/images/icon/my.png');
                }

                return <Image source={iconName} style={{width: 25, height: 25}} />;
            },
            tabBarActiveTintColor: colors.green[1], tabBarInactiveTintColor: colors.defaultDarkColor, tabBarStyle: [{display: 'flex'}], headerShown: false
            })}
            >
            <Tab.Screen name="Home" children={() => <HomeScreen navigation={navigation}/>} />
            <Tab.Screen name="Calendar" component={CalendarScreen} />
            <Tab.Screen name="Mission" children={() => <MissionNavigator navigation={navigation}/>} />
            <Tab.Screen name="My" component={MyPageScreen} />
        </Tab.Navigator>
    );
};

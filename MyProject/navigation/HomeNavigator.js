import React from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';
import { HomeScreen, CalendarScreen, MissionScreen, MyPageScreen } from '../pages';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MissionNavigator from './MissionNavigator';
import { useTheme } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function HomeNavigator({navigation, setIsSignedIn}) {
  const {colors} = useTheme();

  return (
        <Tab.Navigator initialRouteName='Home'
            screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
                let iconName;
                if (route.name === 'Home') {
                iconName = require('../assets/images/icon/home-wuga.png');
                } else if (route.name === 'Calendar') {
                iconName = require('../assets/images/icon/calendar-wuga.png');
                } else if (route.name === 'Mission') {
                iconName = require('../assets/images/icon/mission-wuga.png');
                } else if (route.name === 'My') {
                iconName = require('../assets/images/icon/my-wuga.png');
                }

                return (
                  <>
                  {
                    focused ?
                    <View style={{ backgroundColor: colors.brown[3], ...style.tabIconBg}}>
                      <Image source={iconName} style={{width: 25, height: 25, resizeMode: 'contain'}} />
                    </View> :
                    <View style={{ backgroundColor: 'transparent', ...style.tabIconBg }}>
                      <Image source={iconName} style={{width: 25, height: 25, resizeMode: 'contain'}} />
                    </View>
                  }
                  </>
                );
            },
            tabBarActiveTintColor: colors.brown[1], tabBarInactiveTintColor: colors.defaultDarkColor, tabBarStyle: [{display: 'flex'}], headerShown: false,
            tabBarLabelStyle: [{ fontFamily: 'SongMyung-Regular', fontWeight: '600', marginBottom: 2.5}]
            })}
            >
            <Tab.Screen name="Home" children={() => <HomeScreen navigation={navigation}/>} />
            <Tab.Screen name="Calendar" component={CalendarScreen} />
            <Tab.Screen name="Mission" children={() => <MissionNavigator navigation={navigation}/>} />
            <Tab.Screen name="My" children={()=><MyPageScreen setIsSignedIn={setIsSignedIn}/>} />
        </Tab.Navigator>
    );
};

const style = StyleSheet.create({
  tabIconBg: {
    borderRadius: 20,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

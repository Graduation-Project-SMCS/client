import React from 'react';
import {
  Image,
  View,
} from 'react-native';
import { AuthScreen, FamilyCodeScreen } from '../pages';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function AuthNavigator({navigation}) {
  return (
        <Stack.Navigator initialRouteName='Register' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Register" children={() => <AuthScreen navigation={navigation}/>} />
            <Stack.Screen name="FamilyCode" children={() => <FamilyCodeScreen navigation={navigation}/>} />
        </Stack.Navigator>
    );
};

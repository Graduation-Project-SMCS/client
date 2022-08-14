import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeNavigator from './HomeNavigator';
import { Quest, Answer } from '../pages';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <>
            <Stack.Screen name="App" children={({navigation}) => <HomeNavigator navigation={navigation}/>} />
            {/* <Stack.screen name="Quest" component={Quest} />
            <Stack.screen name="Answer" component={Answer} /> */}
        </>
    </Stack.Navigator>
);
};

export default AppNavigator;

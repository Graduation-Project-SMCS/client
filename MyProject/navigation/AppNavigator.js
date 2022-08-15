import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeNavigator from './HomeNavigator';
import AuthNavigator from './AuthNavigator';
import TodayQuestNavigator from './TodayQuestNavigator';
import { QuestComponent } from '../pages';

const Stack = createStackNavigator();

const AppNavigator = () => {
    // redux 사용해서 token 이용하여 자동 로그인 필요
    const [isSignedIn, setIsSignedIn] = useState(true);

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {
                isSignedIn ?
                <>
                    <Stack.Screen name="App" children={({navigation}) => <HomeNavigator navigation={navigation}/>} />
                    {/* <Stack.Screen name="TodayQuest" children={({navigation}) => <TodayQuestNavigator navigation={navigation}/>} /> */}
                    <Stack.Screen name="QuestComponent" component={QuestComponent} />
                </> :
                <Stack.Screen name='Auth' children={({navigation}) => <AuthNavigator navigation={navigation} />} />
            }
        </Stack.Navigator>
    );
};

export default AppNavigator;

import React, { useContext, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeNavigator from './HomeNavigator';
import AuthNavigator from './AuthNavigator';
import { QuestComponent } from '../pages';
import { Context } from '../context';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const {
        state: {
            userInfo,
        }
    } = useContext(Context);

    const [isSignedIn, setIsSignedIn] = useState(false);

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {
                isSignedIn ?
                <>
                    <Stack.Screen name="App" children={({navigation}) => <HomeNavigator navigation={navigation} setIsSignedIn={setIsSignedIn}/>} />
                    <Stack.Screen name="QuestComponent" component={QuestComponent} />
                </> :
                <Stack.Screen name='Auth' children={({navigation}) => <AuthNavigator navigation={navigation} setIsSignedIn={setIsSignedIn}/>} />
            }
        </Stack.Navigator>
    );
};

export default AppNavigator;

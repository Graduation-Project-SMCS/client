import React from 'react';
import { AuthScreen, FamilyCodeScreen, UserRegisterScreen, LoginScreen } from '../pages';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function AuthNavigator({navigation, setIsSignedIn}) {
  return (
        <Stack.Navigator initialRouteName='Register' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Register" children={() => <AuthScreen navigation={navigation}/>} setIsSignedIn={setIsSignedIn}/>
            <Stack.Screen name="User" children={() => <UserRegisterScreen navigation={navigation} setIsSignedIn={setIsSignedIn}/>} />
            <Stack.Screen name="Login" children={() => <LoginScreen navigation={navigation} setIsSignedIn={setIsSignedIn}/>} />
            <Stack.Screen name="FamilyCode" children={() => <FamilyCodeScreen navigation={navigation} setIsSignedIn={setIsSignedIn}/>} />
        </Stack.Navigator>
    );
};

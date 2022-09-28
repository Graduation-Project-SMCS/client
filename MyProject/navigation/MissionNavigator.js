import React from 'react';
import { MissionScreen, MissionDetailScreen } from '../pages';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MissionModalNavigator from './MissionModalNavigator';
const Stack = createNativeStackNavigator();

const MissionNavigator = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName='Quest' screenOptions={{headerShown: false, animation: 'none'}}>
            <Stack.Screen name="Mission-Main"
                children={() => <MissionScreen navigation={navigation}/>}
            />
            <Stack.Screen name="Detail" component={MissionDetailScreen} />
            <Stack.Screen name="MissionNavigator" children={() => <MissionModalNavigator navigation={navigation}/>} />
        </Stack.Navigator>
    );
};

export default MissionNavigator;

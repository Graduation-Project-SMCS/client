import React from 'react';
import { MissionScreen, SurpriseMissionScreen, MissionAnalyzeScreen, MissionDetailScreen } from '../pages';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const MissionNavigator = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName='Quest' screenOptions={{headerShown: false, animation: 'none'}}>
            <Stack.Screen name="Mission-Main"
                children={() => <MissionScreen navigation={navigation}/>}
            />
            <Stack.Screen name="Detail" component={MissionDetailScreen} />
            <Stack.Screen name="Analyze" children={() => <MissionAnalyzeScreen navigation={navigation}/>} />
            <Stack.Screen name="Mission-Surprise" children={() => <SurpriseMissionScreen navigation={navigation}/>} />
        </Stack.Navigator>
    );
};

export default MissionNavigator;

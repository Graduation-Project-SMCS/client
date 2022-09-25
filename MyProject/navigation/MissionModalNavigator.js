import React from 'react';
import { SurpriseMissionScreen, MissionAnalyzeScreen } from '../pages';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

const MissionModalNavigator = ({modalVisible, setModalVisible, navigation, now}) => {
    return (
        <Stack.Navigator initialRouteName='Mission-Surprise' screenOptions={{headerShown: false, animation: 'none', animationEnabled: false}}>
            <Stack.Screen name="Mission-Surprise" children={() => <SurpriseMissionScreen navigation={navigation} modalVisible={modalVisible} setModalVisible={setModalVisible} now={now}/>}  />
            <Stack.Screen name="Analyze" children={() => <MissionAnalyzeScreen modalVisible={modalVisible} setModalVisible={setModalVisible}/>} />
        </Stack.Navigator>
    );
};

export default MissionModalNavigator;

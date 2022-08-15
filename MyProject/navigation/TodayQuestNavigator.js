import React, { useState } from 'react';
import { AnswerScreen, QuestScreen } from '../pages';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const TodayQuestNavigator = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName='Quest' screenOptions={{headerShown: false}}>
            <Stack.Screen name="Quest"
                children={() => <QuestScreen navigation={navigation}/>}
            />
            <Stack.Screen name="Answer" children={() => <AnswerScreen navigation={navigation}/>} />
        </Stack.Navigator>
    );
};

export default TodayQuestNavigator;

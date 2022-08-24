import React, { useState } from 'react';
import { AnswerScreen, QuestScreen } from '../pages';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const TodayQuestNavigator = ({navigation}) => {
    return (
        <Stack.Navigator initialRouteName='Quest'
            screenOptions={{headerShown: false, animation: 'none', contentStyle: {
                backgroundColor: 'white',
            }}}
        >
            <Stack.Screen name="Quest"
                children={() => <QuestScreen navigation={navigation}/>}
            />
            <Stack.Screen name="Answer" component={AnswerScreen} />
        </Stack.Navigator>
    );
};

export default TodayQuestNavigator;

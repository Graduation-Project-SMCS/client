import React, { useState } from 'react';
import { AnswerScreen, QuestScreen } from '../pages';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@react-navigation/native';
const Stack = createNativeStackNavigator();

const TodayQuestNavigator = ({navigation}) => {
    const {colors} = useTheme();

    return (
        <Stack.Navigator initialRouteName='Quest'
            screenOptions={{headerShown: false, animation: 'none', contentStyle: {
                backgroundColor: colors.defaultColor,
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

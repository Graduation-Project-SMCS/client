import { useTheme } from '@react-navigation/native';
import React from 'react';
import {SafeAreaView} from "react-native";

const ScreenContainer = props => {
    const { colors } = useTheme();

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.backgroundColor,
            ...props.style,
            paddingTop: 25,
            paddingHorizontal: 20,
        }}>
            {props.children}
        </SafeAreaView>
    )
}

export default ScreenContainer;
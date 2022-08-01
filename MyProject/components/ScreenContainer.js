import React from 'react';
import {SafeAreaView} from "react-native";

const ScreenContainer = props => {
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: props.backgroundColor,
            ...props.style,
            paddingTop: 25,
            paddingHorizontal: 20,
        }}>
            {props.children}
        </SafeAreaView>
    )
}

export default ScreenContainer;
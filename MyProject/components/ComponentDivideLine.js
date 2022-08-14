import React from 'react';
import {View} from "react-native";
import {useTheme} from "@react-navigation/native";

const ComponentDivideLine = (props) => {
    const {colors} = useTheme();

    return (
        <View style={[{
            height: 1,
            backgroundColor: 'green',
        }, props.style && props.style.marginVertical ? {marginVertical: props.style.marginVertical} : {marginVertical: 25}]}></View>
    )
}

export default ComponentDivideLine;
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native';
import StyleText from './StyleText';

const BackBtn = (props, { navigation }) => {
    const {colors} = useTheme();
    return (
        <Pressable
            onPress={()=>navigation.popToTop()}
            style={{...styles.backBtnSection, ...props.style}}
        >
            <View style={{borderRadius: 10, backgroundColor: colors.brown[1]}}>
                <StyleText style={{...styles.backBtnText, color: colors.defaultColor}}>뒤로</StyleText>
            </View>
        </Pressable>
    );
};

export default BackBtn;

const styles = StyleSheet.create({
    backBtnSection: {
        position: 'absolute',
        right: 15,
        bottom: 40,
        borderRadius: 10
    },
    backBtnText: {
        fontSize: 12,
        color: 'white',
        paddingHorizontal: 10,
        paddingVertical: 7.5,
    }
});
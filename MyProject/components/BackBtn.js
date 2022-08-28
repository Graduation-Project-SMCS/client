import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native';

const BackBtn = ({ navigation }) => {
    const {colors} = useTheme();
    return (
        <Pressable
            onPress={()=>navigation.popToTop()}
            style={{...styles.backBtnSection}}
        >
            <View style={{borderRadius: 10, backgroundColor: colors.green[1]}}>
                <Text style={{...styles.backBtnText, color: colors.defaultColor}}>뒤로</Text>
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
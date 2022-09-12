import { useTheme } from '@react-navigation/native';
import React from 'react';
import {View, Image, Text, StyleSheet} from "react-native";
import StyleText from './StyleText';

const CommentForm = (props) => {
    const {e, idx} = props;
    const {colors} = useTheme();

    return (
        <View key={idx} style={{ marginVertical: 10 }}>
            <View style={styles.formSection}>
                <View style={styles.profileSection}>
                    <Image source={e.image} style={styles.profileImage} />
                    <StyleText style={{...styles.profileName, color: colors.defaultDarkColor,}}>{e.name}</StyleText>
                </View>
                <StyleText style={{ textAlign: 'left', color: colors.defaultDarkColor }}>{e.answer}</StyleText>
            </View>
        </View>
    )
}

export default CommentForm;

const styles = StyleSheet.create({
    formSection: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    profileSection: {
        alignItems: 'center',
        marginRight: 15,
        width: '20%',
        justifyContent: 'flex-start'
    },
    profileImage: {
        width: 25,
        height: 25,
        resizeMode: 'cover'
    },
    profileName: {
        marginTop: 5,
        fontWeight: '300',
        fontSize: 12
    },
});
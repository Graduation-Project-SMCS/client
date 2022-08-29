import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import ScreenContainer from '../../../components/ScreenContainer';
import StyleText from '../../../components/StyleText';
import MissionModalNavigator from '../../../navigation/MissionModalNavigator';

const MissionModalComponent = ({ modalVisible, setModalVisible, navigation }) => {
    const {colors} = useTheme();

    return (
        <ScreenContainer style={{ ...styles.modalView }}>
            <Pressable
                onPress={()=>setModalVisible(!modalVisible)}
            >
                <StyleText style={{...styles.modalX, color: colors.defaultDarkColor}}>X</StyleText>
            </Pressable>
            <MissionModalNavigator navigation={navigation}/>
        </ScreenContainer>
    );
};

export default MissionModalComponent;

const styles = StyleSheet.create({
    modalView: {
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 15,
        left: 20
    },
    modalX: {
        fontWeight: '800',
        textAlign: 'center',
        alignSelf: 'flex-end',
        fontSize: 20,
    }
});
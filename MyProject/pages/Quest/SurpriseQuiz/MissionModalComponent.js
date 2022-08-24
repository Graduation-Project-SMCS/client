import React from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import ScreenContainer from '../../../components/ScreenContainer';
import MissionModalNavigator from '../../../navigation/MissionModalNavigator';
import SurpriseQuiz from './SurpriseQuiz';

const MissionModalComponent = ({ modalVisible, setModalVisible, navigation }) => {
    return (
        <ScreenContainer style={{ ...styles.modalView }}>
            <Pressable
                onPress={()=>setModalVisible(!modalVisible)}
            >
                <Text style={styles.modalX}>X</Text>
            </Pressable>
            <MissionModalNavigator navigation={navigation}/>
        </ScreenContainer>
    );
};

export default MissionModalComponent;

const styles = StyleSheet.create({
    modalView: {
        backgroundColor: "white",
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
        color: 'gray',
        fontWeight: '800',
        textAlign: 'center',
        alignSelf: 'flex-end',
        fontSize: 20,
    }
});
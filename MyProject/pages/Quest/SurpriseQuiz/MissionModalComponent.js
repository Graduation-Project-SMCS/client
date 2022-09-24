import React from 'react';
import { View, StyleSheet } from 'react-native';
import MissionModalNavigator from '../../../navigation/MissionModalNavigator';

const MissionModalComponent = ({ modalVisible, setModalVisible, navigation }) => {
    return (
        <View style={{ ...styles.modalView }}>
            <MissionModalNavigator navigation={navigation} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        </View>
    );
};

export default MissionModalComponent;

const styles = StyleSheet.create({
    modalView: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 10,
        left: 20,
        flex: 1,
    },
});
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Pressable, StyleSheet, Text, ImageBackground, Image } from 'react-native';
import ScreenContainer from '../../../components/ScreenContainer';
import StyleText from '../../../components/StyleText';
import MissionModalNavigator from '../../../navigation/MissionModalNavigator';

const MissionModalComponent = ({ modalVisible, setModalVisible, navigation }) => {
    const {colors} = useTheme();

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
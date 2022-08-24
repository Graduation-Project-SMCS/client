import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import HeaderNavigation from '../../components/HeaderNavigation';
import ScreenContainer from '../../components/ScreenContainer';
import TodayQuestNavigator from '../../navigation/TodayQuestNavigator';

const QuestComponent = ({ navigation }) => {
    return (
        <>
            <HeaderNavigation navigation={navigation} />
            <ScreenContainer style={{ marginTop: -10 }}>
                <Text style={{ color: 'brown', fontSize: 25, textAlign: 'center' }}>#{1}</Text>
                <View style={styles.questionBox}>
                    <Text style={{ fontSize: 22, textAlign: 'center', paddingVertical: 50 }}>
                        오늘의 질문
                    </Text>
                </View>
                <TodayQuestNavigator navigation={navigation}/>
            </ScreenContainer>
        </>
    );
};

export default QuestComponent;

const styles = StyleSheet.create({
  questionBox: {
    backgroundColor: 'lightgray',
    width: '90%',
    marginVertical: 25,
    justifyContent: 'center',
    alignSelf: 'center'
  },
});
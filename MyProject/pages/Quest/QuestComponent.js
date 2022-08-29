import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import HeaderNavigation from '../../components/HeaderNavigation';
import ScreenContainer from '../../components/ScreenContainer';
import StyleText from '../../components/StyleText';
import TodayQuestNavigator from '../../navigation/TodayQuestNavigator';

const QuestComponent = ({ navigation }) => {
    const {colors} = useTheme();

    return (
        <>
            <HeaderNavigation navigation={navigation} />
            <ScreenContainer style={{ marginTop: -10 }}>
                <StyleText style={{ color: colors.defaultDarkColor, fontSize: 22, textAlign: 'center', fontWeight: '700' }}>#{1}</StyleText>
                <View style={{...styles.questionBox, backgroundColor: colors.blue[1]}}>
                    <StyleText style={{ fontSize: 20, textAlign: 'center', paddingVertical: 45, color: colors.defaultDarkColor }}>
                        오늘의 질문
                    </StyleText>
                </View>
                <TodayQuestNavigator navigation={navigation}/>
            </ScreenContainer>
        </>
    );
};

export default QuestComponent;

const styles = StyleSheet.create({
  questionBox: {
    width: '90%',
    marginVertical: 25,
    justifyContent: 'center',
    alignSelf: 'center'
  },
});
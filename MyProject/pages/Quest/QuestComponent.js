import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, StyleSheet, View, ImageBackground } from 'react-native';
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
                <View>
                    <ImageBackground
                        source={require('../../assets/images/wuga/questbg-wuga.png')}
                        resizeMode={"contain"}
                        style={{...styles.questionBox}}
                    >
                        <StyleText style={{ fontSize: 20, textAlign: 'center', paddingVertical: 45, color: colors.defaultDarkColor }}>
                            오늘의 질문
                        </StyleText>
                    </ImageBackground>
                </View>
                <TodayQuestNavigator navigation={navigation}/>
            </ScreenContainer>
        </>
    );
};

export default QuestComponent;

const styles = StyleSheet.create({
  questionBox: {
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center'
  },
});
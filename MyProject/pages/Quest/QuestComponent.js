import { useTheme } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Text, StyleSheet, View, ImageBackground, TextInput, Pressable } from 'react-native';
import { getAPI, postAPI } from '../../api';
import HeaderNavigation from '../../components/HeaderNavigation';
import ScreenContainer from '../../components/ScreenContainer';
import StyleText from '../../components/StyleText';
import { Context } from '../../context';
import TodayQuestNavigator from '../../navigation/TodayQuestNavigator';

const QuestComponent = ({ route, navigation }) => {
    const {colors} = useTheme();
    const { questInfo } = route.params;
    const [info, setInfo] = useState({
        id: 0,
        question: "",
        date: "",
        complete: false,
      });
    const [answers, setAnswers] = useState([]);

    const {
        state: {
            userInfo,
        }
    } = useContext(Context);
    const [userAnswer, setUserAnswer] = useState('');

    const getAnswers = async () => {
        await getAPI(
            {},
            `/question/answers/${info.id}/${userInfo.id}`,
            "",
        )
        .then(({ data, status }) => {
            console.log(data, info.id, userInfo.id);
            if(status === 200 || status === 201 || status === 204) {
                setAnswers(data);
            }
        })
        .catch((e) => {
            console.log(e);
        });
    };
    
    const setAnswer = async () => {
        await postAPI(
            {
               emoji: '0',
               answer: userAnswer, 
            },
            `/answer/${info.id}/${userInfo.id}`,
            "",
        )
        .then(({ data, status }) => {
            if(status === 200 || status === 201 || status === 204) {
                console.log(data, status);
                getAnswers();
            }
        })
        .catch((e) => {
            console.log(e);
        });
    };

    useEffect(() => {
        setInfo(questInfo);
        const getAnswers = async () => {
            await getAPI(
                {},
                `/question/answers/${questInfo.id}/${userInfo.id}`,
                "",
            )
            .then(({ data, status }) => {
                console.log(data, info.id, userInfo.id);
                if(status === 200 || status === 201 || status === 204) {
                    setAnswers(data);
                }
            })
            .catch((e) => {
                console.log(e);
            });
        };
        getAnswers();
    }, []);

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
                            {info.question}
                        </StyleText>
                    </ImageBackground>
                </View>
                
                <View style={{ width: '100%', marginTop: 15, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', flexDirection: 'row'}}>
                    <TextInput
                        style={{...styles.inviteText, color: colors.defaultDarkColor, fontFamily: 'SongMyung-Regular'}}
                        value={userAnswer}
                        autoFocus={false}
                        onChangeText={(text)=>setUserAnswer(text)}
                        autoCorrect={false}
                    />
                    <Pressable
                        onPress={()=>setAnswer()}
                        style={{...styles.backBtnSection}}
                    >
                        <View style={{borderRadius: 10, backgroundColor: colors.brown[1]}}>
                            <StyleText style={{...styles.backBtnText, color: colors.defaultColor}}>등록</StyleText>
                        </View>
                    </Pressable>
                </View>

                {
                    answers.length > 0 ?
                    <TodayQuestNavigator navigation={navigation} answers={answers}/> :
                    <></>
                }
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
    inviteText: {
        textAlign: 'left',
        paddingLeft: 25,
        borderWidth: 1,
        width: '80%',
        marginHorizontal: 15
    },
    backBtnSection: {
        borderRadius: 10,
        width: '15%',
        },
    backBtnText: {
        color: 'white',
        paddingHorizontal: 10,
        paddingVertical: 7.5,
        textAlign: 'center'
    },
});
import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, Text, View, StyleSheet, TextInput, Image } from 'react-native';
import HeaderNavigation from '../../components/HeaderNavigation';
import ScreenContainer from '../../components/ScreenContainer';
import StyleText from '../../components/StyleText';

const FamilyCodePage = ({navigation}) => {
    const {colors} = useTheme();
    const [code, setCode] = useState('');
    const [hasCode, setHasCode] = useState(false);

    const makeCode = () => ((Math.random()).toString(36)).slice(2, 8);
    const codeConditionConfirmed = (inviteCode) => inviteCode.length === 6;

    return (
        <>
            <HeaderNavigation navigation={navigation} />
            <ScreenContainer>
                <View
                    nativeID='family-code-title-zone'
                    style={{ marginVertical: 10 }}
                >
                    <StyleText
                        style={{ fontSize: 24, textAlign: 'center', color: colors.defaultDarkColor, fontWeight: '900' }}
                    >우리 가족 찾기</StyleText>

                    <View
                        style={{ marginTop: 30 }}
                    >
                        <Pressable
                            style={{...styles.inviteBtn, backgroundColor: colors.brown[4]}}
                            onPress={()=>{
                                setCode(makeCode());
                            }}
                        >
                            <StyleText
                                style={{...styles.inviteText, color: colors.defaultColor}}
                            >내가 초대하기</StyleText>
                        </Pressable>

                        <Pressable
                            style={{...styles.inviteBtn, backgroundColor: colors.brown[4]}}
                            onPress={()=>{
                                setHasCode(true);
                                setCode('');
                            }}
                        >
                            <StyleText
                                style={{...styles.inviteText, color: colors.defaultColor}}
                            >{hasCode ? '🔽  코드를 입력하세요' : '초대 코드가 있어요!'}</StyleText>
                        </Pressable>

                        <View
                            style={styles.codeConfirm}
                        >
                            <View
                                style={{ ...styles.codeBtn, backgroundColor: colors.brown[2] }}
                            >
                                <TextInput
                                    style={{...styles.inviteText, color: colors.defaultColor, fontFamily: 'SongMyung-Regular'}}
                                    maxLength={6}
                                    value={code}
                                    autoFocus={true}
                                    onChangeText={(text)=>setCode(text)}
                                    autoCorrect={false}
                                />
                            </View>
                            <Pressable
                                style={{ ...styles.codeBtn, width: '35%' }}
                                disabled={codeConditionConfirmed(code) ? false : true}
                                onPress={()=>{
                                    console.log('pressed')
                                }}
                            >
                                <StyleText
                                    style={
                                        codeConditionConfirmed(code) ? {
                                            color: colors.defaultColor,
                                            backgroundColor: colors.brown[5],
                                            ...styles.inviteText,
                                        } : {
                                            color: colors.defaultColor,
                                            backgroundColor: colors.defaultDarkColor,
                                            ...styles.inviteText,
                                        }
                                    }
                                >확인</StyleText>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View nativeID='family-code-image-zone'
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                    <Image
                        source={require('../../assets/images/wuga/characters-wuga.png')}
                        style={{ width: 300, height: 200, resizeMode: 'cover' }}
                    />
                </View>
            </ScreenContainer>
        </>
    )
};

export default FamilyCodePage;

const styles = StyleSheet.create({
    inviteBtn: {
        width: '85%',
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 5
    },
    inviteText: {
        fontSize: 16,
        fontWeight: '800',
        textAlign: 'center',
        padding: 15
    },
    codeBtn: {
        width: '55%',
        alignSelf: 'center',
        borderRadius: 25,
    },
    codeConfirm: {
        marginVertical: 30,
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '85%',
        alignSelf: 'center'
    }
  });
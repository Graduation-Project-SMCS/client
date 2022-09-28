import { useTheme } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { Pressable, View, StyleSheet, TextInput, Image, Alert } from 'react-native';
import { getAPI, postAPI } from '../../api';
import HeaderNavigation from '../../components/HeaderNavigation';
import ScreenContainer from '../../components/ScreenContainer';
import StyleText from '../../components/StyleText';
import { Context } from '../../context';
import Clipboard from '@react-native-clipboard/clipboard';

const FamilyCodePage = ({navigation, setIsSignedIn}) => {
    const {colors} = useTheme();
    const [code, setCode] = useState('');
    const {
        state: {
            userInfo,
        }
    } = useContext(Context);

    const makeCode = async () => {
        await getAPI(
            {
                email: userInfo.email,
                name: userInfo.name,
                member: userInfo.member,
            },
            `/familycode/${userInfo.id}`,
            "",
        )
        .then(({ data, status }) => {
            console.log(data, status);
            setCode(data);
        })
        .catch((e) => {
            console.log(e, userInfo.id);
        });
    };

    const confirmCode = async () => {
        await postAPI(
            {},
            `/familycode/${userInfo.id}?familycode=${code}`,
            "",
        )
        .then(({ data, status }) => {
            if(status === 200 || status === 201 || status === 204) {
                console.log(code, data, status);
                setIsSignedIn(true);
            }
        })
        .catch((e) => {
            console.log(e);
        });
    };

    const codeConditionConfirmed = (inviteCode) => inviteCode.length === 6;

    const getCode = async () => {
        const text = await Clipboard.getString();
        console.log(text);
        setCode(text);
    };

    const copyCode = () => {
        Clipboard.setString(code);
        Alert.alert("", "코드가 복사되었습니다.");
    };

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
                                if(code.length === 6) copyCode();
                                else setCode(makeCode());
                            }}
                        >
                            <StyleText
                                style={{...styles.inviteText, color: colors.defaultColor}}
                            >{code.length === 6 ? '코드 복사하기' : '내가 초대하기'}</StyleText>
                        </Pressable>

                        <Pressable
                            style={{...styles.inviteBtn, backgroundColor: colors.brown[4]}}
                            onPress={()=>getCode()}
                        >
                            <StyleText
                                style={{...styles.inviteText, color: colors.defaultColor}}
                            >{'초대 코드가 있어요!'}</StyleText>
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
                                    value={code.toString()}
                                    autoFocus={true}
                                    autoCorrect={false}
                                    onChangeText={(text)=>setCode(text.toString())}
                                />
                            </View>
                            <Pressable
                                style={{ ...styles.codeBtn, width: '35%' }}
                                disabled={codeConditionConfirmed(code) ? false : true}
                                onPress={()=>{
                                    confirmCode();
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
                                >가입완료!</StyleText>
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
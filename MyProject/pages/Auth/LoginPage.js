import { useTheme } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { Pressable, Text, View, StyleSheet, TextInput, Image, Alert } from 'react-native';
import { getAPI } from '../../api';
import HeaderNavigation from '../../components/HeaderNavigation';
import ScreenContainer from '../../components/ScreenContainer';
import StyleText from '../../components/StyleText';
import { Context } from '../../context';
import { USER_INFO } from '../../context/actionTypes';

const LoginPage = ({navigation, setIsSignedIn}) => {
    const {colors} = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {
        state: {
            userInfo,
        },
        dispatch,
    } = useContext(Context);

    const login = async () => {
        await getAPI(
            {
            },
            `/login?email=${email}&password=${password}`,
            "",
        )
        .then(({ data, status }) => {
            if(status === 200 || status === 201 || status === 204) {
                console.log(typeof data, status);
                if(typeof data === 'object') {
                    dispatch({
                        type: USER_INFO,
                        payload: {
                            email: data.email,
                            id: data.id,
                            name: data.name,
                            member: data.member,
                        },
                    });
                    setIsSignedIn(true);
                }
                else {
                    Alert.alert(
                        "아이디 오류",
                        "아이디나 비밀번호가 틀립니다.",
                        [
                          {
                            text: '확인',
                            style: "cancel",
                          },
                        ]
                      )
                }
            }
        })
        .catch((e) => {
            console.log(e);
            console.log(email, password)
        });
    };

    return (
        <>
            <HeaderNavigation navigation={navigation} />
            <ScreenContainer>
                <View
                    nativeID='family-code-title-zone'
                    style={{ zIndex: 2000 }}
                >
                    <StyleText
                        style={{ fontSize: 24, textAlign: 'center', color: colors.defaultDarkColor, fontWeight: '900' }}
                    >로그인</StyleText>

                    <View
                        style={{ marginTop: 30 }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10}}>
                            <View style={{ width: '10%'}}>
                                <StyleText style={{ textAlign: 'center' }}>이메일</StyleText>
                            </View>
                            <View style={{ backgroundColor: colors.brown[4], width: '80%', marginLeft: 15}}>
                                <TextInput
                                    style={{...styles.inviteText, color: colors.defaultColor, fontFamily: 'SongMyung-Regular'}}
                                    value={email}
                                    autoFocus={true}
                                    onChangeText={(text)=>setEmail(text)}
                                    autoCorrect={false}
                                />
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10}}>
                            <View style={{ width: '10%'}}>
                                <StyleText style={{ textAlign: 'center' }}>비밀번호</StyleText>
                            </View>
                            <View style={{ backgroundColor: colors.brown[4], width: '80%', marginLeft: 15}}>
                                <TextInput
                                    style={{...styles.inviteText, color: colors.defaultColor, fontFamily: 'SongMyung-Regular'}}
                                    value={password}
                                    autoFocus={false}
                                    onChangeText={(text)=>setPassword(text)}
                                    autoCorrect={false}
                                    secureTextEntry={true}
                                    placeholder={"8자리 이상을 입력하세요"}
                                />
                            </View>
                        </View>

                        <View
                            style={styles.codeConfirm}
                        >
                            <Pressable
                                style={{ width: '30%', marginRight: 15 }}
                                disabled={(email && password.length >= 8) ? false : true}
                                onPress={()=>{
                                    login()
                                }}
                            >
                                <StyleText
                                    style={
                                        (email && password.length >= 8) ? {
                                            color: colors.defaultColor,
                                            backgroundColor: colors.brown[5],
                                            ...styles.confirmText,
                                        } : {
                                            color: colors.defaultColor,
                                            backgroundColor: colors.defaultDarkColor,
                                            ...styles.confirmText,
                                        }
                                    }
                                >로그인</StyleText>
                            </Pressable>

                            <Pressable
                                style={{ width: '30%', marginRight: 15 }}
                                onPress={()=>
                                    navigation.navigate('User')
                                }
                            >
                                <StyleText
                                    style={{
                                        color: colors.defaultColor,
                                        backgroundColor: colors.brown[4],
                                        ...styles.confirmText,
                                    }}
                                >회원가입</StyleText>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View nativeID='family-code-image-zone'
                    style={{ justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}
                >
                    <Image
                        source={require('../../assets/images/wuga/maincharacter-wuga.png')}
                        style={{ width: 300, height: 300, resizeMode: 'contain' }}
                    />
                </View>
            </ScreenContainer>
        </>
    )
};

export default LoginPage;

const styles = StyleSheet.create({
    inviteBtn: {
        width: '85%',
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 5
    },
    inviteText: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'left',
        padding: 10,
    },
    confirmText: {
        fontSize: 16,
        textAlign: 'center',
        padding: 15,
    },
    codeConfirm: {
        marginVertical: 30,
        justifyContent: 'flex-end',
        width: '100%',
        flexDirection: 'row',
        alignSelf: 'center',
        zIndex: 1000
    }
  });
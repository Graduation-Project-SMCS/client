import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, Text, View, StyleSheet, Pressable } from 'react-native';
import { getAPI } from '../../api';
import ScreenContainer from '../../components/ScreenContainer';
import StyleText from '../../components/StyleText';

const AuthPage = ({navigation}) => {
    const {colors} = useTheme();

    const signInWithGoogle = async () => {
        await getAPI(
            {},
            '/oauth2/authorization/google',
            "",
        ).then(({ status }) => {
            console.log(status);
          });
    };

    const signInWithNaver = async () => {
        await getAPI(
            {},
            '/oauth2/authorization/naver',
            "",
        )
        .then(({ data, status }) => {
            console.log(data, status);
        })
        .catch((e) => {
            console.log(e);
        });
    };

    const signInWithKakao = async () => {
        await getAPI(
            {},
            '/oauth2/authorization/kakao',
            "",
        )
        .then(({ data, status }) => {
            console.log(data, status);
        })
        .catch((e) => {
            console.log(e);
        });
    };

    return (
        <>
            <ScreenContainer>
                <Image
                    source={require('../../assets/images/wuga/main-wuga.png')}
                    style={{ width: '100%', height: 350, justifyContent: 'center', alignSelf: 'center', resizeMode: 'contain' }}
                />
            </ScreenContainer>
            <View
                nativeID='social-login'
                style={{ position: 'absolute', bottom: 20, width: '100%'}}
            >
                <Pressable
                    onPress={() =>
                        signInWithGoogle()
                    }
                >
                    <View style={{ backgroundColor: '#FFFFFF', borderWidth: 0.5, ...styles.socialLoginBtn }}>
                        <Image
                            source={require('../../assets/images/icon/google.png')}
                            style={{ width: 24, height: 24 }}
                        />
                        <Text
                            style={styles.socialLoginText}
                        >구글로 로그인</Text>
                    </View>
                </Pressable>
                <Pressable
                    onPress={() =>
                        signInWithNaver()
                    }
                >
                    <View style={{ backgroundColor: '#2DB400', ...styles.socialLoginBtn }}>
                        <Image
                            source={require('../../assets/images/icon/naver.webp')}
                            style={{ width: 24, height: 24 }}
                        />
                        <Text
                            style={{color: '#F0F0F0', ...styles.socialLoginText}}
                        >네이버로 로그인</Text>
                    </View>
                </Pressable>
                <Pressable
                    onPress={() =>
                        signInWithKakao()
                    }
                >
                    <View style={{ backgroundColor: '#F9E000', ...styles.socialLoginBtn }}>
                        <Image
                            source={require('../../assets/images/icon/kakao.png')}
                            style={{ width: 24, height: 24 }}
                        />
                        <Text
                            style={styles.socialLoginText}
                        >카카오톡으로 로그인</Text>
                    </View>
                </Pressable>
                <Pressable
                    onPress={() =>
                        navigation.navigate('Login')
                    }
                >
                    <View style={{ backgroundColor: colors.brown[5], ...styles.socialLoginBtn }}>
                        <Image
                            source={require('../../assets/images/icon/email.png')}
                            style={{ width: 24, height: 24 }}
                        />
                        <Text
                            style={styles.socialLoginText}
                        >이메일로 로그인</Text>
                    </View>
                </Pressable>
            </View>
        </>
    )
};

export default AuthPage;

const styles = StyleSheet.create({
    socialLoginBtn: {
        width: '80%',
        alignSelf: 'center',
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    socialLoginText: {
        fontSize: 14,
        textAlign: 'left',
        padding: 15,
        fontWeight: '700'
    }
  });
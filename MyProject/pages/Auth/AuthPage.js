import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, Text, View, StyleSheet, Pressable } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import StyleText from '../../components/StyleText';

const AuthPage = ({navigation}) => {
    const {colors} = useTheme();
    return (
        <>
            <ScreenContainer>
                <View nativeID='title' style={{ marginTop: 20 }}>
                    <Image
                    source={require('../../assets/images/wuga.png')}
                    style={{ width: 250, height: 100, justifyContent: 'center', alignSelf: 'center', resizeMode: 'contain' }}
                    />
                    <View style={{ marginVertical: 40 }}>
                        <Image
                            source={require('../../assets/images/sylvanian/mainpage.png')}
                            style={{ width: '90%', height: 200, resizeMode: 'cover', alignSelf: 'center' }}
                        />
                    </View>
                </View>
            </ScreenContainer>
            <View
                nativeID='social-login'
                style={{ position: 'absolute', bottom: 50, width: '100%'}}
            >
                {/* https://medium.com/@milind.patil/social-login-for-react-native-app-facebook-linkedin-gmail-815c4832f77 */}
                <View style={{ backgroundColor: 'orange', ...styles.socialLoginBtn }}>
                    <StyleText
                        style={styles.socialLoginText}
                    >Google 로그인</StyleText>
                </View>
                <Pressable
                    onPress={() =>
                        navigation.navigate('FamilyCode')
                    }
                >
                    <View style={{ backgroundColor: 'yellow', ...styles.socialLoginBtn }}>
                        <StyleText
                            style={styles.socialLoginText}
                        >Kakao 로그인 (일단 가족 연결 페이지로 연결)</StyleText>
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
        marginVertical: 5
    },
    socialLoginText: {
        fontSize: 14,
        textAlign: 'center',
        padding: 15,
        fontWeight: '700'
    }
  });
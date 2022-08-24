import React from 'react';
import { Image, Text, View, StyleSheet, Pressable } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';

const AuthPage = ({navigation}) => {
    return (
        <>
            <ScreenContainer>
                <View nativeID='title' style={{ marginTop: 20 }}>
                    <Text style={{ textAlign: 'center', fontSize: 32, color: 'green', fontWeight: '800' }}>
                        Wuga!
                    </Text>
                    <View style={{ marginVertical: 60 }}>
                        <Image
                            source={require('../../assets/images/galleryImages.png')}
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
                    <Text
                        style={styles.socialLoginText}
                    >Google 로그인</Text>
                </View>
                <Pressable
                    onPress={() =>
                        navigation.navigate('FamilyCode')
                    }
                >
                    <View style={{ backgroundColor: 'yellow', ...styles.socialLoginBtn }}>
                        <Text
                            style={styles.socialLoginText}
                        >Kakao 로그인 (일단 가족 연결 페이지로 연결)</Text>
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
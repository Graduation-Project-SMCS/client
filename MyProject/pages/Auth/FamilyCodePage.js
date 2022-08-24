import React, { useState } from 'react';
import { Pressable, Text, View, StyleSheet, TextInput, Image } from 'react-native';
import HeaderNavigation from '../../components/HeaderNavigation';
import ScreenContainer from '../../components/ScreenContainer';

const FamilyCodePage = ({navigation}) => {
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
                    <Text
                        style={{ fontSize: 24, textAlign: 'center', color: 'gray', fontWeight: '700' }}
                    >우리 가족 찾기</Text>

                    <View
                        style={{ marginTop: 30 }}
                    >
                        <Pressable
                            style={styles.inviteBtn}
                            onPress={()=>{
                                setCode(makeCode());
                            }}
                        >
                            <Text
                                style={styles.inviteText}
                            >내가 초대하기</Text>
                        </Pressable>

                        <Pressable
                            style={styles.inviteBtn}
                            onPress={()=>{
                                setHasCode(true);
                                setCode('');
                            }}
                        >
                            <Text
                                style={styles.inviteText}
                            >{hasCode ? '🔽  코드를 입력하세요' : '초대 코드가 있어요!'}</Text>
                        </Pressable>

                        <View
                            style={styles.codeConfirm}
                        >
                            <View
                                style={{ ...styles.codeBtn }}
                            >
                                <TextInput
                                    style={styles.inviteText}
                                    maxLength={6}
                                    value={code}
                                    autoFocus={true}
                                    onChangeText={(text)=>setCode(text)}
                                    autoCorrect={false}
                                />
                            </View>
                            <Pressable
                                style={{ ...styles.codeBtn, backgroundColor: 'gray', width: '35%' }}
                                disabled={codeConditionConfirmed(code) ? false : true}
                                onPress={()=>{
                                    console.log('pressed')
                                }}
                            >
                                <Text
                                    style={
                                        codeConditionConfirmed(code) ? {
                                            color: 'white',
                                            backgroundColor: 'navy',
                                            ...styles.inviteText,
                                        } : {
                                            color: 'lightgray',
                                            backgroundColor: 'gray',
                                            ...styles.inviteText,
                                        }
                                    }
                                >확인</Text>
                            </Pressable>
                        </View>
                    </View>

                    <View nativeID='family-code-image-zone'>
                        <Image
                            source={require('../../assets/images/icon/home.png')}
                            style={{ position: 'absolute', top: 25, left: 35, width: 85, height: 85 }}
                        />
                        <Image
                            source={require('../../assets/images/icon/my.png')}
                            style={{ position: 'absolute', top: 65, right: 45, width: 100, height: 60, resizeMode: 'contain' }}
                        />
                        <Image
                            source={require('../../assets/images/galleryImages.png')}
                            style={{ position: 'absolute', top: 150, left: 20, width: 400, height: 60, resizeMode: 'cover' }}
                        />
                    </View>
                </View>
            </ScreenContainer>
        </>
    )
};

export default FamilyCodePage;

const styles = StyleSheet.create({
    inviteBtn: {
        width: '85%',
        backgroundColor: 'lightgray',
        alignSelf: 'center',
        marginVertical: 15
    },
    inviteText: {
        fontSize: 20,
        fontWeight: '800',
        textAlign: 'center',
        padding: 15
    },
    codeBtn: {
        width: '55%',
        alignSelf: 'center',
        borderRadius: 25,
        backgroundColor: 'lightgreen'
    },
    codeConfirm: {
        marginVertical: 30,
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '85%',
        alignSelf: 'center'
    }
  });
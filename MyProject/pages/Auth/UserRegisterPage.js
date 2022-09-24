import { useTheme } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { Pressable, Text, View, StyleSheet, TextInput, Image, Alert } from 'react-native';
import { postAPI } from '../../api';
import HeaderNavigation from '../../components/HeaderNavigation';
import ScreenContainer from '../../components/ScreenContainer';
import StyleText from '../../components/StyleText';
import DropDownPicker from 'react-native-dropdown-picker';
import UserInfoContext from '../../components/UserInfoContext';
import { Context } from '../../context';
import { USER_INFO } from '../../context/actionTypes';

const UserRegisterPage = ({navigation}) => {
    const {colors} = useTheme();
    const [email, setEmail] = useState('');
    const [member, setMember] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
      {label: '아빠', value: 'father'},
      {label: '엄마', value: 'mother'},
      {label: '아들', value: 'son'},
      {label: '딸', value: 'daughter'},
      {label: '친척', value: 'other'},
    ]);

    const {
        state: {
            userInfo,
        },
        dispatch,
    } = useContext(Context);

    const signUp = async () => {
        await postAPI(
            {
                email: email,
                member: member,
                name: name,
                password: password,
                role: 'GUEST'
            },
            "/signup",
            "",
        )
        .then(({ data, status }) => {
            if(status === 200 || status === 201 || status === 204) {
                //data: id 반환
                console.log(data, status);

                dispatch({
                    type: USER_INFO,
                    payload: {
                        email: email,
                        member: member,
                        name: name,
                        id: data,
                    },
                });

                navigation.navigate('FamilyCode');
            }
        })
        .catch((e) => {
            console.log(e);
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
                    >회원가입</StyleText>

                    <View
                        style={{ marginTop: 30 }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10}}>
                            <View style={{ width: '10%'}}>
                                <StyleText style={{ textAlign: 'center' }}>아이디</StyleText>
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

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10}}>
                            <View style={{ width: '10%'}}>
                                <StyleText style={{ textAlign: 'center' }}>이름</StyleText>
                            </View>
                            <View style={{ backgroundColor: colors.brown[4], width: '80%', marginLeft: 15}}>
                                <TextInput
                                    style={{...styles.inviteText, color: colors.defaultColor, fontFamily: 'SongMyung-Regular'}}
                                    value={name}
                                    autoFocus={false}
                                    onChangeText={(text)=>setName(text)}
                                    autoCorrect={false}
                                />
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10, zIndex: 2000}}>
                            <View style={{ width: '10%'}}>
                                <StyleText style={{ textAlign: 'center' }}>역할</StyleText>
                            </View>
                            <View style={{ width: '80%', marginLeft: 15}}>
                                <DropDownPicker
                                    open={open}
                                    value={member}
                                    items={items}
                                    setOpen={setOpen}
                                    setValue={setMember}
                                    setItems={setItems}
                                    disableBorderRadius={true}
                                    style={{ backgroundColor: colors.brown[4], borderWidth: 0, borderRadius: 0, paddingLeft: 10}}
                                    textStyle={{ fontFamily: 'SongMyung-Regular', fontSize: 16, color: colors.defaultColor }}
                                    listParentContainerStyle={{ backgroundColor: colors.brown[4], paddingLeft: 10}}
                                    listParentLabelStyle={{ color: colors.defaultColor }}
                                    dropDownContainerStyle={{ borderWidth: 0, borderRadius: 0}}
                                    placeholder={"당신의 역할은?"}
                                />
                            </View>
                        </View>

                        <View
                            style={styles.codeConfirm}
                        >
                            <Pressable
                                style={{ width: '30%', marginRight: 15 }}
                                disabled={(email && member && name && password.length >= 8) ? false : true}
                                onPress={()=>{
                                    signUp()
                                }}
                            >
                                <StyleText
                                    style={
                                        (email && member && name && password.length >= 8) ? {
                                            color: colors.defaultColor,
                                            backgroundColor: colors.brown[5],
                                            ...styles.confirmText,
                                        } : {
                                            color: colors.defaultColor,
                                            backgroundColor: colors.defaultDarkColor,
                                            ...styles.confirmText,
                                        }
                                    }
                                >확인</StyleText>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScreenContainer>
        </>
    )
};

export default UserRegisterPage;

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
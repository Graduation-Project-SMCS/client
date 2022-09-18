
import { useTheme } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Pressable, StyleSheet, ImageBackground, FlatList, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { putAPI } from '../api';
import StyleText from '../components/StyleText';

const EditModalComponent = ({ modalVisible, setModalVisible, userInfo, getUserProfile }) => {
    const {colors} = useTheme();
    const [defaultCharacterList, setDefaultCharacterList] = useState([
        {
            id: 1,
            name: 'ele',
            image: require('../assets/images/wuga/characters/ele.png'),
        }, {
            id: 2,
            name: 'dino',
            image: require('../assets/images/wuga/characters/dino.png'),
        }, {
            id: 3,
            name: 'bunny',
            image: require('../assets/images/wuga/characters/bunny.png'),
        }, {
            id: 4,
            name: 'icebunny',
            image: require('../assets/images/wuga/characters/icebunny.png'),
        },
    ]);
    const [image, setImage] = useState({
        id : -1,
        name: '',
        image: require('../assets/images/wuga/characters/ele.png'),
    });
    const [email, setEmail] = useState('');
    const [member, setMember] = useState('');
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
      {label: '아빠', value: 'father'},
      {label: '엄마', value: 'mother'},
      {label: '아들', value: 'son'},
      {label: '딸', value: 'daughter'},
      {label: '친척', value: 'other'},
    ]);

    useEffect(() => {
        //api 들어오면 조건부 렌더링으로 프사 설정
        setEmail(userInfo.email);
        setMember(userInfo.member);
        setName(userInfo.name);
        setImage(userInfo.profile_img);
    }, []);

    const editUserProfile = async () => {
        await putAPI(
            {
                member: member,
                name: name,
                profile_img: image.id,
            },
            `/user/${userInfo.id}`,
            "",
        )
        .then(({ data, status }) => {
            if(status === 200 || status === 201 || status === 204) {
                Alert.alert("", "수정되었습니다.");
                setModalVisible(!modalVisible);
                getUserProfile();
            }
        })
        .catch((e) => {
            console.log(e, userInfo, email, member, name);
            Alert.alert("서버 오류", "잠시 후 다시 시도해주세요.");
        });
    };

    return (
        <View style={{ ...styles.modalView }}>
            <Pressable
                onPress={()=>setModalVisible(!modalVisible)}
            >
                <StyleText style={{...styles.modalX, color: colors.defaultDarkColor}}>X</StyleText>
            </Pressable>
            <View style={{ backgroundColor: colors.backgroundColor, flex: 1, alignItems: 'center' }}>
                <ImageBackground
                    source={require('../assets/images/wuga/background-wuga.png')}
                    resizeMode={"contain"}
                    style={{width: '100%', height: '98%'}}
                >
                <View style={{ paddingTop: 65, justifyContent: 'center', alignItems: 'center' }}>
                    <StyleText style={{ fontSize: 22, color: colors.defaultDarkColor, textAlign: 'center' }}>내 정보 수정</StyleText>
                        <Image source={image.image} style={{...styles.selectedImage}}/>
                        <FlatList data={defaultCharacterList} horizontal
                            listKey='01'
                            renderItem={({item, index}) => {
                                return (
                                    <TouchableOpacity onPress={() => {
                                        setImage({...item})
                                    }} activeOpacity={0.8} key={item.id}>
                                        <View style={{
                                            width: 28,
                                            height: 28,
                                            borderRadius: 10,
                                            marginHorizontal: 5,
                                            marginTop: 17
                                        }}>
                                            <Image source={item.image} resizeMode={"contain"} style={{ width: '100%', height: '100%'}}/>
                                        </View>
                                        
                                    </TouchableOpacity>
                                );
                            }}
                            keyExtractor={(item, idx) => {
                                idx.toString();
                            }}
                            key={(item, idx) => {
                                (item.id).toString();
                            }}
                            nestedScrollEnabled
                        />
                        <View style={{ marginHorizontal: 15, marginTop: 25 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10}}>
                                <View style={{ width: '12%'}}>
                                    <StyleText style={{ textAlign: 'center' }}>이름</StyleText>
                                </View>
                                <View style={{ backgroundColor: colors.brown[4], width: '75%', marginLeft: 15}}>
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
                                <View style={{ width: '12%'}}>
                                    <StyleText style={{ textAlign: 'center' }}>역할</StyleText>
                                </View>
                                <View style={{ width: '75%', marginLeft: 15}}>
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

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10}}>
                                <View style={{ width: '12%'}}>
                                    <StyleText style={{ textAlign: 'center' }}>이메일</StyleText>
                                </View>
                                <View style={{ backgroundColor: colors.brown[2], width: '75%', marginLeft: 15}}>
                                    <TextInput
                                        style={{...styles.inviteText, color: colors.defaultColor, fontFamily: 'SongMyung-Regular'}}
                                        value={email + ' (수정불가)'}
                                        autoFocus={false}
                                        onChangeText={(text)=>setEmail(text)}
                                        autoCorrect={false}
                                        editable={false}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <Pressable
                        onPress={()=>editUserProfile()}
                        style={{...styles.backBtnSection}}
                    >
                        <View style={{borderRadius: 10, backgroundColor: colors.brown[1]}}>
                            <StyleText style={{...styles.backBtnText, color: colors.defaultColor}}>수정</StyleText>
                        </View>
                    </Pressable>
                </ImageBackground>
            </View>
        </View>
    );
};

export default EditModalComponent;

const styles = StyleSheet.create({
    modalView: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 10,
        left: 20,
        flex: 1,
    },
    modalX: {
        fontWeight: '800',
        textAlign: 'center',
        alignSelf: 'flex-end',
        fontSize: 20,
    },
    //profile
    selectedImage: {
        width: 100,
        height: 100,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
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
        // zIndex: 1000
    },
    backBtnSection: {
        borderRadius: 10,
        width: '12%',
        alignSelf: 'flex-end',
        marginRight: 40,
        marginTop: 10
    },
    backBtnText: {
        fontSize: 12,
        color: 'white',
        paddingHorizontal: 10,
        paddingVertical: 7.5,
        textAlign: 'center'
    },
});
import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Pressable, StyleSheet, ImageBackground, FlatList, TouchableOpacity } from 'react-native';
import StyleText from '../../components/StyleText';

const EditModalComponent = ({ modalVisible, setModalVisible }) => {
    const {colors} = useTheme();
    const [defaultCharacterList, setDefaultCharacterList] = useState([
        {
            id: 1,
            name: 'ele',
            image: require('../../assets/images/wuga/characters/ele.png'),
        }, {
            id: 2,
            name: 'dino',
            image: require('../../assets/images/wuga/characters/dino.png'),
        }, {
            id: 3,
            name: 'bunny',
            image: require('../../assets/images/wuga/characters/bunny.png'),
        }, {
            id: 4,
            name: 'icebunny',
            image: require('../../assets/images/wuga/characters/icebunny.png'),
        },
    ]);
    const [image, setImage] = useState({
        id : -1,
        name: '',
        image: require(''),
    });

    useEffect(() => {
        //api 들어오면 조건부 렌더링으로 바꾸기
        setImage({
            ...defaultCharacterList[0],
        });
    }, []);

    return (
        <View style={{ ...styles.modalView }}>
            <Pressable
                onPress={()=>setModalVisible(!modalVisible)}
            >
                <StyleText style={{...`styles`.modalX, color: colors.defaultDarkColor}}>X</StyleText>
            </Pressable>
            <View style={{ backgroundColor: colors.backgroundColor, flex: 1, alignItems: 'center' }}>
                <ImageBackground
                    source={require('../../assets/images/wuga/background-wuga.png')}
                    resizeMode={"contain"}
                    style={{width: '100%', height: '98%'}}
                >
                    <View style={{ padding: 5, justifyContent: 'center', alignItems: 'center', height: '50%' }}>
                        <StyleText style={{ fontSize: 22, color: colors.defaultDarkColor }}>내 정보 수정</StyleText>

                        <View>
                            <StyleText>프로필 사진 설정</StyleText>

                            <Image source={{uri: image.image}} style={{...styles.selectedImage}}/>
                            <FlatList data={defaultCharacterList} horizontal
                                renderItem={({item, index}) =>
                                    <TouchableOpacity onPress={() => {
                                    }} activeOpacity={0.8} key={index}>
                                        <View style={{
                                            width: 28,
                                            height: 28,
                                            borderRadius: 10,
                                            marginHorizontal: 5,
                                            marginTop: 17
                                        }}> 
                                            <Image source={item.image} />
                                        </View>
                                    </TouchableOpacity>
                                }
                                keyExtractor={(item, idx) => {
                                    idx.toString();
                                }}
                                key={(item, idx) => {
                                    idx.toString();
                                }}
                                nestedScrollEnabled
                            />
                        </View>
                    </View>
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
        width: 108,
        height: 108,
        borderRadius: 10,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
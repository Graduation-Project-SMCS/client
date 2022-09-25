import { useIsFocused, useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {View, Image, Text, StyleSheet, Pressable, Alert} from "react-native";
import { putAPI } from '../api';
import StyleText from './StyleText';

const CommentForm = (props) => {
    const {e, idx, getAnswers} = props;
    const {colors} = useTheme();
    const [defaultImage, setDefaultImage] = useState({
        id: -1,
        name: 'null',
        image: require('../assets/images/wuga/character2-wuga.png'),
      });
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

    const [emojis, setEmojis] = useState({
        good: 0,
        heart: 0,
        smile: 0
    });

    const [good, setGood] = useState(false);
    const [heart, setHeart] = useState(false);
    const [smile, setSmile] = useState(false);

    const splitEmojis = () => {
        setEmojis({
            good: e.emj_good,
            heart: e.emj_heart,
            smile: e.emj_smile,
        });
    };

    useEffect(() => {
        splitEmojis();
    }, [useIsFocused()]);

    const editEmoji = async (type) => {
        await Alert.alert(
            "",
            "추천하시겠습니까?",
            [
              { 
                text: "추천",
                onPress: () => {
                  editUserEmoji(type, 1);
                },
              },
              {
                text: "비추천",
                onPress: () => {
                    console.log(typeof emojis[type]);
                    if(emojis[type] > 0) editUserEmoji(type, 0);
                    else Alert.alert("", "추천 수가 0일땐 추천할 수 없습니다.");
                },
              },
            ]
        );

    };

    const editUserEmoji = async (type, now) => {
        await putAPI(
            {},
            `/answer/emoji/${idx}/${e.id}?emoji=${type}&calc=${now}`,
            "",
        )
        .then(({ data, status }) => {
            if(status === 200 || status === 201 || status === 204) {
                console.log(data);
                getAnswers();
                splitEmojis();
            }
        })
        .catch((e) => {
            console.log(e, idx);
            Alert.alert("서버 오류", "잠시 후 다시 시도해주세요.");
        });
    };

    return (
        <View key={idx} style={{ marginVertical: 10 }}>
            <View style={styles.formSection}>
                <View style={styles.profileSection}>
                    <Image
                     source={e.image ? defaultCharacterList[parseInt(e.image)-1].image : defaultImage.image}
                     style={styles.profileImage} />
                    <StyleText style={{...styles.profileName, color: colors.defaultDarkColor,}}>{e.user_name}</StyleText>
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <StyleText style={{ textAlign: 'left', color: colors.defaultDarkColor }}>{e.answer}</StyleText>

                </View>
            </View>
            <View style={{ position: 'absolute', right: 0, bottom: 10}}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end'}}>
                    <Pressable
                        onPress={()=>{
                            editEmoji('good');
                        }}
                        style={{ marginHorizontal: 5 }}
                    >
                        <View style={{ width: '100%'}}>
                            <StyleText style={{ color: good ? colors.brown[3] : colors.defaultDarkColor}}>👍 {e.emj_good}</StyleText>
                        </View>
                    </Pressable>
                    <Pressable
                        onPress={()=>{
                            editEmoji('heart');
                        }}
                        style={{ marginHorizontal: 5 }}
                    >
                        <View style={{ width: '100%'}}>
                            <StyleText style={{ color: heart ? colors.brown[3] : colors.defaultDarkColor}}>❤️ {e.emj_heart}</StyleText>
                        </View>
                    </Pressable>
                    <Pressable
                        onPress={()=>{
                            editEmoji('smile');
                        }}
                        style={{ marginHorizontal: 5 }}
                    >
                        <View style={{ width: '100%'}}>
                            <StyleText style={{ color: smile ? colors.brown[3] : colors.defaultDarkColor}}>😊 {e.emj_smile}</StyleText>
                        </View>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default CommentForm;

const styles = StyleSheet.create({
    formSection: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    profileSection: {
        alignItems: 'center',
        marginRight: 15,
        width: '20%',
        justifyContent: 'flex-start'
    },
    profileImage: {
        width: 25,
        height: 25,
        resizeMode: 'cover'
    },
    profileName: {
        marginTop: 5,
        fontWeight: '300',
        fontSize: 12
    },
});
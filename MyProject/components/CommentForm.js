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
        let splitted = e.emoji.split(',').map(Number);
        setEmojis({
            good: splitted[0],
            heart: splitted[1],
            smile: splitted[2],
        });
    };

    useEffect(() => {
        splitEmojis();
    }, [useIsFocused()]);

    const editEmoji = async () => {
        let g = 0, h = 0, s = 0;
        // if(good)
        // let body = emojis.good + ',' + emojis.heart + ',' + emojis.smile;
        await putAPI(
            {
                emoji: body,
                user_name: e.name,
            },
            `/answer/emoji/${e.idx}`,
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
            console.log(e, body, e.idx);
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
                    <StyleText style={{...styles.profileName, color: colors.defaultDarkColor,}}>{e.name}</StyleText>
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <StyleText style={{ textAlign: 'left', color: colors.defaultDarkColor }}>{e.answer}</StyleText>

                </View>
            </View>
            <View style={{ position: 'absolute', right: 0, bottom: 0}}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end'}}>
                    <Pressable
                        onPress={()=>{
                            setGood(!good);
                            editEmoji()
                        }}
                        style={{ marginHorizontal: 5 }}
                    >
                        <StyleText>👍{}</StyleText>
                    </Pressable>
                    <Pressable
                        onPress={()=>{
                            setHeart(!heart);
                            editEmoji()
                        }}
                        style={{ marginHorizontal: 5 }}
                    >
                        <StyleText>❤️{e.emoji}</StyleText>
                    </Pressable>
                    <Pressable
                        onPress={()=>{
                            setSmile(!smile);
                            editEmoji()
                        }}
                        style={{ marginHorizontal: 5 }}
                    >
                        <StyleText>😊{}</StyleText>
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
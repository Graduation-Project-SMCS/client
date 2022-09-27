import { useTheme } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { getAPI, postAPI } from '../../../api';
import CommentForm from '../../../components/CommentForm';
import ComponentDivideLine from '../../../components/ComponentDivideLine';
import HeaderNavigation from '../../../components/HeaderNavigation';
import ScreenContainer from '../../../components/ScreenContainer';
import StyleText from '../../../components/StyleText';
import { Context } from '../../../context';

const MissionDetail = ({ route, navigation }) => {
    const { idx, originImg, curImg, id, similarity } = route.params;
    const [commentInfo, setCommentInfo] = useState({});
    const {colors} = useTheme();
    const [isAlreadyWritten, setIsAlreadyWritten] = useState(false);

    const {
        state: {
            userInfo,
        }
    } = useContext(Context);
    const [userComment, setUserComment] = useState('');

    const setComment = async () => {
        await postAPI(
            {
                emj_good: 0,
                emj_heart: 0,
                emj_smile: 0,
                comment: userComment, 
            },
            `/comment/${id}/${userInfo.id}`,
            "",
        )
        .then(({ data, status }) => {
            if(status === 200 || status === 201 || status === 204) {
                console.log(data, status);
                getComments();
                setUserComment('');
                setIsAlreadyWritten(true);
            }
        })
        .catch((e) => {
            console.log(e);
        });
    };

    const getComments = async () => {
        await getAPI(
            {},
            `/mission/comments/${id}/${userInfo.id}`,
            "",
        )
        .then(({ data, status }) => {
            console.log('hi~hi this is ', data);
            if(data.length > 0) {
                for(let i=0;i<data.length;i++) {
                    if(data[i].user_name === userInfo.name) setIsAlreadyWritten(true);
                }
            }
            if(status === 200 || status === 201 || status === 204) {
                setCommentInfo(data);
            }
        })
        .catch((e) => {
            console.log(e);
        });
    };

    useEffect(() => {
        const getComments = async () => {
            await getAPI(
                {},
                `/mission/comments/${id}/${userInfo.id}`,
                "",
            )
            .then(({ data, status }) => {
                console.log('hi~ this is ', data);
                if(data.length > 0) {
                    for(let i=0;i<data.length;i++) {
                        if(data[i].user_name === userInfo.name) setIsAlreadyWritten(true);
                    }
                }
                if(status === 200 || status === 201 || status === 204) {
                    setCommentInfo(data);
                }
            })
            .catch((e) => {
                console.log(e, id, userInfo.id);
            });
        };
        getComments();
    }, []);

    return (
        <>
            <HeaderNavigation navigation={navigation}/>
            <ScreenContainer style={{ marginTop: -10 }}>
                <View nativeID='title'>
                    <StyleText style={{ fontSize: 20, color: colors.defaultDarkColor, fontWeight: '800', textAlign: 'center', alignSelf: 'center' }}>깜짝 미션 #{idx}</StyleText>
                </View>

                <View nativeID='imageInfo'
                    style={{...styles.imageSection, marginTop: 10}}
                >
                    <Image
                        source={{uri: originImg}}
                        style={{ width: 100, height: 100, resizeMode: 'contain', marginRight: 5 }}
                    />
                    <Image
                        source={{uri: curImg}}
                        style={{ width: 200, height: 200, resizeMode: 'contain', marginLeft: 5 }}
                    />
                </View>

                <View style={{...styles.imageSection, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ marginHorizontal: 20, marginTop: 15 }}>
                        <StyleText style={{...styles.infoText, color: colors.defaultDarkColor}}>유사도 {similarity}%</StyleText>
                    </View>
                </View>

                <ComponentDivideLine />

                <StyleText style={{...styles.infoText, ...styles.commentsTitle, color: colors.defaultDarkColor}}>Comments</StyleText>
                <View
                    style={{ width: '100%', marginTop: 15, alignItems: 'center',
                    justifyContent: 'center', alignSelf: 'center', flexDirection: 'row',
                    display: isAlreadyWritten ? 'none' : 'flex'
                    }}
                >
                    <TextInput
                        style={{...styles.inviteText, color: colors.defaultDarkColor, fontFamily: 'SongMyung-Regular'}}
                        value={userComment}
                        autoFocus={false}
                        onChangeText={(text)=>setUserComment(text)}
                        autoCorrect={false}
                    />
                    <Pressable
                        onPress={()=>setComment()}
                        style={{...styles.backBtnSection}}
                    >
                        <View style={{borderRadius: 10, backgroundColor: colors.brown[1]}}>
                            <StyleText style={{...styles.backBtnText, color: colors.defaultColor}}>등록</StyleText>
                        </View>
                    </Pressable>
                </View>
                
                <SafeAreaView flex={1} style={{...styles.commentsList}}>
                    <ScrollView nativeID='commentScroll' showsVerticalScrollIndicator={false} >
                    {
                        commentInfo.length > 0 ?
                        commentInfo.map((e, idx) => {
                            return (
                                <CommentForm e={e} idx={userInfo.id} key={idx} id={id} type={'comment'} getComments={getComments}/>
                            )
                        }) :
                        <></>
                    }
                    </ScrollView>
                </SafeAreaView>
            </ScreenContainer>
        </>
    );
};

export default MissionDetail;

const styles = StyleSheet.create({
    imageSection: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginHorizontal: 10,
    },
    infoText: {
        fontSize: 18,
        fontWeight: '900',
    },
    emojiSection: {
        paddingHorizontal: 5,
        paddingVertical: 15,
        borderWidth: 2,
        borderColor: 'green',
        width: '50%'
    },
    emojiText: {
        marginHorizontal: 5
    },
    commentsTitle: {
        textAlign: 'left',
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 15,
    },
    commentsList: {
        marginHorizontal: 15,
        marginTop: 15,
    },
    inviteText: {
        textAlign: 'left',
        paddingLeft: 25,
        borderWidth: 1,
        width: '80%',
        marginHorizontal: 15
    },
    backBtnSection: {
        borderRadius: 10,
        width: '15%',
        },
    backBtnText: {
        color: 'white',
        paddingHorizontal: 10,
        paddingVertical: 7.5,
        textAlign: 'center'
    },
});
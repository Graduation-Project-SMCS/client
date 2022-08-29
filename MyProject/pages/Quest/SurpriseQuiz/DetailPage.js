import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import CommentForm from '../../../components/CommentForm';
import ComponentDivideLine from '../../../components/ComponentDivideLine';
import HeaderNavigation from '../../../components/HeaderNavigation';
import ScreenContainer from '../../../components/ScreenContainer';
import StyleText from '../../../components/StyleText';

const MissionDetail = ({ route, navigation }) => {
    const { idx, originImg, curImg } = route.params;
    const [commentInfo, setCommentInfo] = useState([]);
    const {colors} = useTheme();

    useEffect(() => {
        setCommentInfo([
            {
                id: 1,
                answer: 'nice!',
                image: require('../../../assets/images/icon/my_filled.png'),
                name: 'minsun',
            }, {
                id: 2,
                answer: 'cool!',
                image: require('../../../assets/images/icon/my.png'),
                name: 'minsun',
            }, {
                id: 3,
                answer: 'awesome!',
                image: require('../../../assets/images/icon/my_filled.png'),
                name: 'minseok',
            }, {
                id: 4,
                answer: 'great!',
                image: require('../../../assets/images/icon/my.png'),
                name: 'eunha',
            }, {
                id: 5,
                answer: 'dope!',
                image: require('../../../assets/images/icon/my_filled.png'),
                name: 'minseok',
            },
        ]);
    }, []);

    return (
        <>
            <HeaderNavigation navigation={navigation}/>
            <ScreenContainer>
                <View nativeID='title'>
                    <StyleText style={{ fontSize: 20, color: colors.defaultDarkColor, fontWeight: '800', textAlign: 'center', alignSelf: 'center' }}>깜짝 미션 #{idx}</StyleText>
                </View>

                <View nativeID='imageInfo'
                    style={{...styles.imageSection}}
                >
                    <View style={{...styles.imageMargin}}>
                        <Image
                            source={originImg}
                            style={{ width: 100, height: 100, resizeMode: 'cover' }}
                        />
                    </View>
                    <View style={{...styles.imageMargin}}>
                        <Image
                            source={curImg}
                            style={{ width: 200, height: 200, resizeMode: 'cover' }}
                        />
                    </View>
                </View>

                <View style={{...styles.imageSection, ...styles.imageMargin, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ marginHorizontal: 20 }}>
                        <StyleText style={{...styles.infoText, color: colors.defaultDarkColor}}>유사도 {}%</StyleText>
                    </View>
                    {/* 이 부분 공감 부분인데 다시 할 필요있음 */}
                    {/* <View style={{...styles.emojiSection}}>
                        <ScrollView nativeID='emoji'
                            style={{...styles.emojiSectionScroll}}
                            horizontal={true}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        >
                            <StyleText style={{...styles.infoText, ...styles.emojiText}}>❤️</StyleText>
                            <StyleText style={{...styles.infoText, ...styles.emojiText}}>👍</StyleText>
                        </ScrollView>
                    </View> */}
                </View>

                <ComponentDivideLine />

                <StyleText style={{...styles.infoText, ...styles.commentsTitle, color: colors.defaultDarkColor}}>Comments</StyleText>
                <SafeAreaView flex={1} style={{...styles.commentsList}}>
                    <ScrollView nativeID='commentScroll' showsVerticalScrollIndicator={false} >
                    {
                        commentInfo.length > 0 ?
                        commentInfo.map((e, idx) => {
                            return (
                                <CommentForm e={e} idx={idx} />
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
        marginHorizontal: 10
    },
    imageMargin: {
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
    }
});
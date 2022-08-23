import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import ComponentDivideLine from '../../../components/ComponentDivideLine';
import HeaderNavigation from '../../../components/HeaderNavigation';
import ScreenContainer from '../../../components/ScreenContainer';

const MissionDetail = ({ route, navigation }) => {
    const { idx, originImg, curImg } = route.params;

    return (
        <>
            <HeaderNavigation navigation={navigation}/>
            <ScreenContainer>
                <View nativeID='title'>
                    <Text style={{ fontSize: 24, color: 'green', fontWeight: '800', textAlign: 'center', alignSelf: 'center' }}>깜짝 미션 #{idx}</Text>
                </View>

                <View nativeID='imageInfo'
                    style={{...styles.imageSection}}
                >
                    <View style={{...styles.imageMargin}}>
                        <Image
                            source={originImg}
                            style={{ width: 65, height: 65, resizeMode: 'contain' }}
                        />
                    </View>
                    <View style={{...styles.imageMargin}}>
                        <Image
                            source={curImg}
                            style={{ width: 120, height: 120, resizeMode: 'contain' }}
                        />
                    </View>
                </View>

                <View style={{...styles.imageSection, ...styles.imageMargin, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ marginHorizontal: 20 }}>
                        <Text style={{...styles.infoText}}>유사도 {}%</Text>
                    </View>
                    <View style={{...styles.emojiSection}}>
                        <ScrollView nativeID='emoji'
                            style={{...styles.emojiSectionScroll}}
                            horizontal={true}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        >
                            {/* 만약 관련해서 0이면 아예 없애는 조건식 넣기 */}
                            <Text style={{...styles.infoText, ...styles.emojiText}}>❤️ {}</Text>
                            <Text style={{...styles.infoText, ...styles.emojiText}}>👍 {}</Text>
                        </ScrollView>
                    </View>

                </View>

                <ComponentDivideLine />

                <View nativeID='commentSection'>
                    <Text style={{...styles.infoText, ...styles.commentsTitle}}>Comments</Text>
                </View>
            </ScreenContainer>
        </>
    );
};

export default MissionDetail;

const styles = StyleSheet.create({
    imageSection: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 35,
    },
    imageMargin: {
        marginHorizontal: 5,
    },
    infoText: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
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
    }
});
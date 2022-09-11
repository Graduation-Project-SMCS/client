import React, { Fragment, useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    Pressable,
  } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ScreenContainer from '../components/ScreenContainer';
import ComponentDivideLine from '../components/ComponentDivideLine';
import { getAPI } from '../api';
import { useTheme } from '@react-navigation/native';
import StyleText from '../components/StyleText';

const MyPage = () => {
  const {colors} = useTheme();
  const getUserProfile = async () => {
    // if(authContext.state.userSeq) {
        await getAPI(
            {
            },
            "/familycode", //바꿔야함
            "",
        )
        .then(({ data, status}) => {
          console.log(data, status);
        })
        .catch((e) => {
            console.log(e);
        });
    // }
  };
  // useEffect(() => {

  //   getUserProfile();
  // }, []);

  return (
    <ScreenContainer style={{ alignContent: 'center' }}>
      <Pressable onPress={()=>getUserProfile()}>
        <StyleText style={{ textAlign: 'right', color: colors.defaultDarkColor }}>로그아웃</StyleText>
      </Pressable>
      <View nativeID='user-profile' style={{ alignSelf: 'center', marginTop: 15 }}>
        <Image
          source={require('../assets/images/wuga/character2-wuga.png')}
          style={{width: 150, height: 150, borderRadius: 50, resizeMode: 'contain', marginBottom: 5 }}
        ></Image>
        {/* 이름 다시 */}
        <StyleText style={{ textAlign: 'center', fontSize: 20, color: colors.defaultDarkColor}}>{}myname</StyleText>
      </View>

      <ComponentDivideLine />

      <View nativeID='user-family'>
        <StyleText style={{ fontSize: 14, color: colors.defaultDarkColor }}>나의 가족들</StyleText>
        {/* 가족 구성원 api 들어오면 다시 */}
        <View style={{ marginTop: 10, color: colors.defaultDarkColor }}>
          <StyleText style={{...styles.familyText, color: colors.defaultDarkColor}}>❤️     가장 가까운 ...    [{}]</StyleText>
          <StyleText style={{...styles.familyText, color: colors.defaultDarkColor}}>🙏     친해지길 바라 ... [{}]    ☎️</StyleText>
        </View>
      </View>

      <ComponentDivideLine />
      
      <View nativeID='setting'>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginVertical: 10 }}>
          <StyleText style={{ fontSize: 14, color: colors.defaultDarkColor }}>내 정보 수정</StyleText>
        </View>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginVertical: 10 }}>
          <StyleText style={{ fontSize: 14, color: colors.defaultDarkColor }}>우리 가족 정보 수정</StyleText>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default MyPage;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },

  body: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    height: Dimensions.get('screen').height - 250,
    width: Dimensions.get('screen').width
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 50,
    justifyContent: 'center'
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 1.5
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom:10
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight:'bold'
  },
  familyText: {
    fontSize: 16,
    textAlign: 'left',
    lineHeight: 36
  }
});
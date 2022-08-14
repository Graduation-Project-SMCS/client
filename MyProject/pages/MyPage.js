import React, { Fragment, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
  } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ScreenContainer from '../components/ScreenContainer';
import ComponentDivideLine from '../components/ComponentDivideLine';

const MyPage = () => {
  return (
    <ScreenContainer style={{ alignContent: 'center' }}>
      <View nativeID='user-profile' style={{ alignSelf: 'center', marginTop: 15 }}>
        <Image
          source={require('../assets/images/dummy.png')}
          style={{width: 125, height: 125, borderRadius: 50, resizeMode: 'contain', marginBottom: 15 }}
        ></Image>
        {/* 이름 다시 */}
        <Text style={{ textAlign: 'center', fontSize: 20}}>{}myname</Text>
      </View>

      <ComponentDivideLine />

      <View nativeID='user-family'>
        <Text style={{ fontSize: 16 }}>나의 Family</Text>
        {/* 가족 구성원 api 들어오면 다시 */}
        <View style={{ marginTop: 10 }}>
          <Text style={styles.familyText}>❤️     가장 가까운 ...    [{}]</Text>
          <Text style={styles.familyText}>🙏     친해지길 바라 ... [{}]    ☎️</Text>
        </View>
      </View>

      <ComponentDivideLine />
      
      <View nativeID='setting'>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginVertical: 10 }}>
          <Text style={{ fontSize: 22 }}>내 정보 수정</Text>
          <Text style={{ fontSize: 22, marginRight: 15, fontWeight: '700' }}>{'>'}</Text>
        </View>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginVertical: 10 }}>
          <Text style={{ fontSize: 22 }}>우리 가족 정보 수정</Text>
          <Text style={{ fontSize: 22, marginRight: 15, fontWeight: '700' }}>{'>'}</Text>
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
    fontSize: 20,
    textAlign: 'left',
    lineHeight: 36
  }
});
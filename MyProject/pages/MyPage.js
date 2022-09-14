import React, { useContext, useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    Pressable,
    Alert,
  } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ScreenContainer from '../components/ScreenContainer';
import ComponentDivideLine from '../components/ComponentDivideLine';
import { getAPI } from '../api';
import { useIsFocused, useTheme } from '@react-navigation/native';
import StyleText from '../components/StyleText';
import { Context } from '../context';
import { USER_INFO } from '../context/actionTypes';
import EditModalComponent from './Auth/EditModalComponent';

const MyPage = ({ setIsSignedIn }) => {
  const {colors} = useTheme();
  const [info, setInfo] = useState({
      email: '',
      id: 0,
      name: '',
  });
  const [userName, setUserName] = useState('아직 이름이 없습니다!');
  const [userCode, setUserCode] = useState('아직 코드가 없습니다!');
  const [userMember, setUserMember] = useState('당신의 역할은?');
  const [editModalVisible, setEditModalVisible] = useState(false);

  const {
      state: {
          userInfo,
      },
      dispatch,
  } = useContext(Context);

  const isFocused = useIsFocused();

  useEffect(() => {
      setInfo({
          email: userInfo.email,
          id: userInfo.id,
          name: userInfo.name,
      });
      const getUserProfile = async () => {
          await getAPI(
              info,
              `/user/${userInfo.id}`,
              "",
          )
          .then(({ data, status}) => {
            if((status === 200 || status === 201 || status === 204) && Object.keys(data).length > 0) {
              setUserName(userInfo.name);
              setUserCode(data.family_id.familycode);
              setUserMember(data.member);
            }
          })
          .catch((e) => {
              console.log(e);
              console.log(info);
          });
      };
      getUserProfile();
  }, [isFocused]);

  const Logout = () => {
    Alert.alert(
      "로그아웃",
      "로그아웃 하시겠습니까?",
      [
        { 
          text: "네",
          onPress: () => {
            dispatch({
                type: USER_INFO,
                payload: {
                    email: '',
                    member: '',
                    name: '',
                    id: 0,
                },
            });
            setIsSignedIn(false);
          },
        },
        {
          text: '아니오',
          style: "cancel",
        },
      ]
    )
  };

  const setMemberNaming = (member) => {
    if(member === 'father') return '아빵💕';
    else if(member === 'mother') return '엄망💘';
    else if(member === 'son') return '아들래미💝';
    else if(member === 'daughter') return '딸래미💗';
    else if(member === 'other') return '가족💖';
    else return '';
  };

  return (
    <ScreenContainer style={{ alignContent: 'center' }}>
      <View nativeID='user-profile' style={{ alignSelf: 'center', marginTop: 15 }}>
        <Image
          source={require('../assets/images/wuga/character2-wuga.png')}
          style={{width: 150, height: 150, borderRadius: 50, resizeMode: 'contain', marginBottom: 5 }}
        ></Image>
        <StyleText style={{ textAlign: 'center', fontSize: 20, color: colors.defaultDarkColor}}>{userName}</StyleText>
      </View>

      <ComponentDivideLine />

      <View nativeID='user-family'>
        <StyleText style={{ fontSize: 14, color: colors.defaultDarkColor, marginBottom: 15 }}>나와 가족 정보</StyleText>
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
            <StyleText style={{...styles.familyText, color: colors.defaultDarkColor}}>우리 가족 코드는 : {userCode}</StyleText>
            <Pressable
              style={{ backgroundColor: colors.defaultDarkColor, marginLeft: 15}}
            >
              <StyleText style={{ color: colors.defaultColor, padding: 5}}>복사하기</StyleText>
            </Pressable>
          </View>
          <StyleText style={{...styles.familyText, color: colors.defaultDarkColor}}>나는 가족에서 : {setMemberNaming(userMember)}</StyleText>
        </View>
      </View>

      <ComponentDivideLine />
      
      <View nativeID='setting'>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginVertical: 10 }}>
          <Pressable
            onPress={()=>setEditModalVisible(true)}
          >
            <StyleText style={{ fontSize: 14, color: colors.defaultDarkColor }}>프로필 수정</StyleText>
          </Pressable>
        </View>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginVertical: 10 }}>
          <Pressable
              onPress={()=>Logout()}
            >
            <StyleText style={{ fontSize: 14, color: colors.defaultDarkColor }}>로그아웃</StyleText>
          </Pressable>
        </View>
      </View>
      {
        editModalVisible &&
        <EditModalComponent
          modalVisible={editModalVisible}
          setModalVisible={setEditModalVisible}
        />
      }
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
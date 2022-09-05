import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    Pressable,
    ImageBackground,
  } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import StyleText from '../components/StyleText';

const MainPage = ({ navigation }) => {
  const [familyInfo, setFamilyInfo] = useState([]);
  const {colors} = useTheme();

  useEffect(() => {
    setFamilyInfo([
      {
        name: 'minsun',
        role: 'me',
        image: require('../assets/images/wuga/characters/bunny.png'),
      }, {
        name: 'minseok',
        role: 'bro',
        image: require('../assets/images/wuga/characters/dino.png'),
      }, {
        name: 'eunha',
        role: 'mom',
        image: require('../assets/images/wuga/characters/ele.png'),
      },      {
        name: 'minsu',
        role: 'sis',
        image: require('../assets/images/wuga/characters/icebunny.png'),
      },
    ])
  }, []);

  const style = {
    fontColor: { color: colors.defaultDarkColor }
  };
  

  return (
    <>
      <ScreenContainer>
        <View
            nativeID='topInfo'
            style={{ justifyContent: 'space-between', flexDirection: 'row' }}
          >
            <Image
              source={require('../assets/images/wuga/logo-wuga.png')}
              style={{ width: 125, height: 50, justifyContent: 'flex-start', resizeMode: 'contain' }}
            />
        </View>
          {/* family info api 들어오면 다시 */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', height: 40, width: '100%', alignItems: 'center', marginTop: 20, justifyContent: 'center' }}>
          {
            familyInfo.length > 0 ?
              familyInfo.map((info, idx) => {
                return (
                  <View key={idx} style={{flexDirection: 'row', width: '45%', marginVertical: 5, alignItems: 'center'}}>
                    <Image
                      source={info.image}
                      style={{width: 30, height: 45, borderRadius: 50, resizeMode: 'contain', marginRight: 10}}
                    ></Image>
                    <View>
                      <StyleText style={{...style.fontColor}}>{info.name}</StyleText>
                      <StyleText style={{...style.fontColor}}>{info.role}</StyleText>
                    </View>
                  </View>
                )
              }) :
              <></>
          }
          </View>

          <View nativeID='familyPic'
              style={{flex: 1, justifyContent: 'center'}}
            >
            <Image
              source={require('../assets/images/wuga/maincharacter-wuga.png')}
              style={{ width: '80%', resizeMode: 'center', alignSelf: 'center' }}
            ></Image>
          </View>

          <Pressable
            nativeID='questionBtn'
            style={{ position: 'absolute', bottom: 30, alignSelf: 'center', width: '100%' }}
            onPress={() => {
              navigation.navigate('QuestComponent')
            }}
          >
            <ImageBackground
              source={require('../assets/images/wuga/questbg-wuga.png')}
              resizeMode={"contain"}
              style={{width: '100%', height: 100, alignItems: 'center', justifyContent: 'center'}}
            >
              <StyleText style={{ fontSize: 16, padding: 15, color: colors.brown[1], textAlign: 'center'}}>오늘 내가 먹은 아침은?</StyleText>
            </ImageBackground>
          </Pressable>
      </ScreenContainer>
    </>
  );
};

export default MainPage;
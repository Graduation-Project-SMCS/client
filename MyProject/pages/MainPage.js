import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    Pressable,
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
      }, {
        name: 'minseok',
        role: 'bro',
      }, {
        name: 'eunha',
        role: 'mom',
      },      {
        name: 'minsun',
        role: 'me',
      }, {
        name: 'minseok',
        role: 'bro',
      },
    ])
  }, []);

  const style = {
    fontColor: { color: colors.defaultDarkColor }
  };
  

  return (
    <>
      <ScreenContainer style={{ flexDirection: 'column' }}>
          <View
            nativeID='topInfo'
            style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 10 }}
          >
            <Image
              source={require('../assets/images/wuga.png')}
              style={{ width: 75, height: 50, justifyContent: 'flex-start', resizeMode: 'contain' }}
            />
          </View>

          {/* family info api 들어오면 다시 */}
          <View style={{ justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'wrap', height: 90 }}>
          {
            familyInfo.length > 0 ?
              familyInfo.map((info, idx) => {
                return (
                  <View key={idx} style={{flexDirection: 'row', width: '50%', marginVertical: 5, alignItems: 'center'}}>
                    <Image
                      source={require('../assets/images/sylvanian/basic1.png')}
                      style={{width: 30, height: 45, borderRadius: 50, resizeMode: 'contain', marginRight: 5}}
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
              style={{flex: 2, justifyContent: 'center'}}
            >
            <Image
              source={require('../assets/images/sylvanian/mainpage.png')}
              style={{ width: '80%', resizeMode: 'center', alignSelf: 'center', marginBottom: 20 }}
            ></Image>
          </View>

          <Pressable
            nativeID='questionBtn'
            style={{ position: 'absolute', bottom: 50, alignSelf: 'center', width: '85%' }}
            onPress={() => {
              navigation.navigate('QuestComponent')
            }}
          >
            <View style={{ backgroundColor: colors.green[1] }}>
              <StyleText style={{ fontSize: 16, padding: 15, color: colors.defaultColor, textAlign: 'center'}}>오늘 내가 먹은 아침은?</StyleText>
            </View>
          </Pressable>
      </ScreenContainer>
    </>
  );
};

export default MainPage;
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    Pressable,
  } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';

const MainPage = ({ navigation }) => {
  const [familyInfo, setFamilyInfo] = useState([]);

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
  

  return (
    <>
      <ScreenContainer style={{ flexDirection: 'column'}}>
          <View
            nativeID='topInfo'
            style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 20 }}
          >
            {/* point 정보 들어오면 바꾸기 */}
            <Text style={{ fontSize: 20 }}>{0} Points</Text> 
            {/* shop 아이콘은 일단 넣지 않겠음 */}
          </View>

          {/* family info api 들어오면 다시 */}
          <View style={{ justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'wrap', height: 90 }}>
          {
            familyInfo.length > 0 ?
              familyInfo.map((info, idx) => {
                return (
                  <View key={idx} style={{flexDirection: 'row', width: '50%', marginVertical: 5}}>
                    <Image
                      source={require('../assets/images/dummy.png')}
                      style={{width: 25, height: 25, borderRadius: 50, resizeMode: 'contain'}}
                    ></Image>
                    <View>
                      <Text>{info.name}</Text>
                      <Text>{info.role}</Text>
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
              source={require('../assets/images/galleryImages.png')}
              style={{ width: '80%', resizeMode: 'center', alignSelf: 'center', marginBottom: 20 }}
            ></Image>
          </View>

          <Pressable
            nativeID='questionBtn'
            style={{ position: 'absolute', bottom: 30, alignSelf: 'center', width: '85%' }}
            onPress={() => {
              navigation.navigate('QuestComponent')
            }}
          >
            <View style={{ backgroundColor: 'green' }}>
              <Text style={{ fontSize: 18, padding: 20, color: 'white', textAlign: 'center'}}>오늘 내가 먹은 아침은?</Text>
            </View>
          </Pressable>
      </ScreenContainer>
    </>
  );
};

export default MainPage;
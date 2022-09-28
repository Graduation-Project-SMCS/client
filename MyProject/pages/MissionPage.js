import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  FlatList,
  Pressable,
} from 'react-native';
import { getAPI } from '../api';
import ScreenContainer from '../components/ScreenContainer';
import StyleText from '../components/StyleText';
import MissionModalComponent from './Quest/SurpriseQuiz/MissionModalComponent';
import { useIsFocused } from '@react-navigation/native';

const Mission = ({navigation}) => {
  const [missions, setMissions] = useState([]);
  const [surpriseQuizModalVisible, setSurpriseQuizModalVisible] = useState(false);
  const {colors} = useTheme();

  useEffect(() => {
    const getMissions = async () => {
        setMissions([]);
        await getAPI(
            {},
            `/missions`,
            "",
        )
        .then(({ data, status}) => {
          console.log(data, status);
          if(data.length > 0) {
            setMissions(data);
          }
        })
        .catch((e) => {
            console.log(e);
        });
    };
    getMissions();
  }, [useIsFocused()]);

  const missionGrid = ({ item, index }) => {
    return (
      <Pressable
        onPress={()=>navigation.navigate('Detail', { idx: missions.length-index, originImg: item.mission,
                                                  // curImg: item.image,
                                                  curImg: 'file:///storage/emulated/0/Android/data/com.myproject/files/Pictures/80120eac-b3f3-4a22-9305-6fd982ef4342.jpg',
                                                  id: item.id, similarity: item.similarity })}
        style={{ width: '30%', margin: 5, alignSelf: 'center', borderWidth: 0.5, borderColor: colors.brown[4], }}
      >
        <Image
          style={{ width: '100%', height: 150, resizeMode: 'contain' }}
          // source={{uri: item.image}}
          source={{uri: 'file:///storage/emulated/0/Android/data/com.myproject/files/Pictures/80120eac-b3f3-4a22-9305-6fd982ef4342.jpg'}}
          />
          
        <View style={{ paddingHorizontal: 15, position: 'absolute' }}>
          <StyleText style={{ textAlign: 'left', marginTop: 10, color: colors.defaultDarkColor, fontWeight: '800', fontSize: 14 }}>#{missions.length-index}</StyleText>
        </View>
      </Pressable>
    )
  };

  return (
    <ScreenContainer>
      <View style={{ flexDirection: 'row', marginBottom: 45, justifyContent: 'center' }}>
        <Pressable
          onPress={()=>setSurpriseQuizModalVisible(true)}
          style={{ position: 'absolute', right: 15 }}
        >
          <Image
            source={require('../assets/images/icon/help.png')}
            style={{ width: 25, height: 25, tintColor: colors.defaultDarkColor }}
          /> 
        </Pressable>
      </View>
      <SafeAreaView flex={1}>
        {
          missions.length > 0 ?
          <FlatList
            data={missions.slice(0).reverse()}
            renderItem={missionGrid}
            keyExtractor={item => item.id}
            numColumns={3}
            showsVerticalScrollIndicator={false}
          /> :
          <View style={{ justifyContent: 'center', alignItems: 'center'}}>
            <StyleText style={{ fontSize: 24, textAlign: 'center' }}>아직 미션이 없습니다!</StyleText>
          </View>
        }
      </SafeAreaView>

      {
        surpriseQuizModalVisible &&
        <MissionModalComponent
          modalVisible={surpriseQuizModalVisible}
          setModalVisible={setSurpriseQuizModalVisible}
          navigation={navigation}
          now={missions.length+1} //현재 진도
        />
      }
    </ScreenContainer>
  );
};

export default Mission;
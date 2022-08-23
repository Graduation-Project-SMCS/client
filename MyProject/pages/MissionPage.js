import React, { Fragment, useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  PermissionsAndroid,
  ScrollView,
  FlatList,
  Pressable,
  Modal,
} from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import SurpriseQuiz from './Quest/SurpriseQuiz/SurpriseQuiz';

const Mission = ({navigation}) => {
  const [missions, setMissions] = useState([]);
  const [surpriseQuizModalVisible, setSurpriseQuizModalVisible] = useState(false);

  useEffect(() => {
    setMissions([
      {
        id: 1,
        image: require('../assets/images/icon/home_filled.png'),
        originImage: require('../assets/images/icon/home_filled.png'),
      }, {
        id: 2,
        image: require('../assets/images/icon/my.png'),
        originImage: require('../assets/images/icon/my.png'),
      }, {
        id: 3,
        image: require('../assets/images/icon/mission_filled.png'),
        originImage: require('../assets/images/icon/mission_filled.png'),
      }, {
        id: 4,
        image: require('../assets/images/icon/mission_filled.png'),
        originImage: require('../assets/images/dummy.png'),
      }, {
        id: 5,
        image: require('../assets/images/icon/mission_filled.png'),
        originImage: require('../assets/images/galleryImages.png'),
      }, {
        id: 6,
        image: require('../assets/images/icon/mission_filled.png'),
        originImage: require('../assets/images/icon/home_filled.png'),
      }, {
        id: 7,
        image: require('../assets/images/icon/mission_filled.png'),
        originImage: require('../assets/images/icon/home_filled.png'),
      }, {
        id: 8,
        image: require('../assets/images/icon/mission_filled.png'),
        originImage: require('../assets/images/icon/my.png'),
      }, {
        id: 9,
        image: require('../assets/images/icon/mission_filled.png'),
        originImage: require('../assets/images/icon/mission_filled.png'),
      }, {
        id: 10,
        image: require('../assets/images/icon/mission_filled.png'),
        originImage: require('../assets/images/dummy.png'),
      }, {
        id: 11,
        image: require('../assets/images/icon/mission_filled.png'),
        originImage: require('../assets/images/galleryImages.png'),
      }, {
        id: 12,
        image: require('../assets/images/icon/mission_filled.png'),
        originImage: require('../assets/images/icon/home_filled.png'),
      },
    ])
  }, []);

  const missionGrid = ({ item, index }) => {
    return (
      <View style={{ width: '33%', alignSelf: 'center', borderWidth: 1, borderColor: 'gray' }}>
        <Pressable
          onPress={()=>navigation.navigate('Detail', { idx: missions.length-index, originImg: item.originImage, curImg: item.image })}
        >
          <View style={{ paddingHorizontal: 15, paddingVertical: 5, backgroundColor: 'lightgray' }}>
            <Text style={{ textAlign: 'left', marginTop: 15, color: 'gray', fontWeight: '700', fontSize: 16 }}>#{item.id}</Text>
            <Image source={item.image} style={{ width: '100%', height: 125, resizeMode: 'contain' }}/>
          </View>
        </Pressable>
      </View> 
    )
  };

  return (
    <ScreenContainer>
      <View style={{ flexDirection: 'row', marginVertical: 30, justifyContent: 'center' }}>
        <Text style={{ fontSize: 32, color: 'green', fontWeight: '800', textAlign: 'center', alignSelf: 'center' }}>Missions</Text>
        <Pressable
          onPress={()=>setSurpriseQuizModalVisible(true)}
          style={{ position: 'absolute', right: 20 }}
        >
          <Image
            source={require('../assets/images/icon/help.png')}
            style={{ width: 25, height: 25 }}
          /> 
        </Pressable>
      </View>
      <SafeAreaView flex={1}>
        <FlatList
          data={missions.slice(0).reverse()}
          renderItem={missionGrid}
          keyExtractor={item => item.id}
          numColumns={3}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
      
      <Modal
        animationType="none"
        transparent={true}
        visible={surpriseQuizModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setSurpriseQuizModalVisible(!surpriseQuizModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <ScreenContainer style={{ ...styles.modalView }}>
            <Pressable
              onPress={()=>setSurpriseQuizModalVisible(!surpriseQuizModalVisible)}
            >
              <Text style={styles.modalX}>X</Text>
            </Pressable>
            <SurpriseQuiz />
          </ScreenContainer>
        </View>
      </Modal>
    </ScreenContainer>
  );
};

export default Mission;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 30
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalX: {
    color: 'gray',
    fontWeight: '800',
    textAlign: 'center',
    alignSelf: 'flex-end',
    fontSize: 20,
  }
});
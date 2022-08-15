import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Pressable,
    Modal,
  } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import TodayQuestNavigator from '../navigation/TodayQuestNavigator';

const MainPage = ({ navigation }) => {
  const [familyInfo, setFamilyInfo] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [init, setInit] = useState('');

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
              setModalVisible(true)
              console.log(modalVisible)
            }}
          >
            <View style={{ backgroundColor: 'green' }}>
              <Text style={{ fontSize: 18, padding: 20, color: 'white', textAlign: 'center'}}>오늘 내가 먹은 아침은?</Text>
              <Text style={{ fontSize: 18, padding: 20, color: 'white', textAlign: 'center'}}>{init}</Text>
            </View>
          </Pressable>
      </ScreenContainer>
      <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
    >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>X</Text>
            </Pressable>

            <Text style={{ color: 'brown', fontSize: 25}}>#{1}</Text>
            <View style={{ backgroundColor: 'lightgray', width: '80%', marginTop: 25, justifyContent: 'center', marginHorizontal: 25 }}>
              <Text style={{ fontSize: 25, textAlign: 'center', paddingVertical: 50 }}>
                오늘의 질문
              </Text>
            </View>
            <TodayQuestNavigator navigation={navigation} />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    marginVertical: 20,
    marginHorizontal: 30,
    backgroundColor: "white",
    borderRadius: 20,

    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    height: '100%',
  },
  button: {
    borderRadius: 20,
    paddingHorizontal: 35,
    paddingTop: 35,
    alignSelf: 'flex-end',
  },
  textStyle: {
    color: 'black',
    fontWeight: '900',
    fontSize: 24,
  },
});
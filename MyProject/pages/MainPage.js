import React, { Fragment, useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Dimensions,
    Image,
    ScrollView,
    Pressable,
    Alert, Modal,
  } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ScreenContainer from '../components/ScreenContainer';

const MainPage = () => {
  const [familyInfo, setFamilyInfo] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

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
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'wrap', height: 100 }}>
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
            style={{ width: '80%', resizeMode: 'center', alignSelf: 'center', marginBottom: 50 }}
          ></Image>
        </View>

        <Pressable
          nativeID='questionBtn'
          style={{ position: 'absolute', bottom: 30, alignSelf: 'center', width: '65%' }}
          onPress={() => setModalVisible(true)}
        >
          <View style={{ width: '100%', backgroundColor: 'green', borderRadius: 15}}>
            <Text style={{ fontSize: 14, padding: 10, color: 'white', textAlign: 'center'}}>질문</Text>
          </View>
        </Pressable>

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
              {/* 이 부분 navigator로 바꿔야함 */}
              <Text style={styles.modalText}>Hello World!</Text>
            </View>
          </View>
        </Modal>
    </ScreenContainer>
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
    margin: 20,
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
    padding: 35,
    alignSelf: 'flex-end',
  },
  textStyle: {
    color: 'black',
    fontWeight: '900',
    fontSize: 24,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
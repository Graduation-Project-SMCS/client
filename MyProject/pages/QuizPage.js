import React, { Fragment, useState } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
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
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { poseApi } from '../api';

const Quiz = () => {
  const [filePath, setFilePath] = useState({ uri: '' });
  const [fileUri, setFileUri] = useState('');
  const [originImage, setOriginImage] = useState({
    uri: '../assets/dummy.png',
    req: require('../assets/dummy.png'),
  });

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message:"App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
        lCamera();
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const lCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        console.log(response)
        const res = response.assets[0];
        setFilePath(res);
        setFileUri(res.uri);
      }
    });
  }

  const lImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const res = response.assets[0];
        console.log(response)
        setFilePath(res);
        setFileUri(res.uri);
      }
    });

  }

  const renderOriginImg = () => {
    //포즈 데모 api 들어오면 바꿀 예정
    return <Image source={originImage.req}
      style={styles.images}
    />
  }

  const renderFileUri = () => {
    if (fileUri) {
      return <Image
        nativeID='dataImage'
        source={{ uri: fileUri }}
        style={styles.images}
      />
    } else {
      return <Image
        source={require('../assets/galleryImages.png')}
        style={styles.images}
      />
    }
  }

  const compareImages = async () => {
    await poseApi(
      fileUri
    );
  }

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={{ marginTop: 50 }}>
          <Text style={{textAlign:'center',fontSize:20,paddingBottom:10}} >깜짝 퀴즈!</Text>
          <Text style={{textAlign:'center',fontSize:20}} >주어진 사진과 같은 포즈를 잡아보세요</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.ImageSections}>
            <View>
              {renderOriginImg()}
            </View>
            <View>
              {renderFileUri()}
            </View>
          </View>

          <View style={styles.btnParentSection}>
            <TouchableOpacity onPress={requestCameraPermission} style={styles.btnSection}  >
              <Text style={styles.btnText}>사진 찍기</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={lImageLibrary} style={styles.btnSection}  >
              <Text style={styles.btnText}>사진 가져오기</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.btnParentSection}>
            <TouchableOpacity onPress={compareImages} style={styles.btnSection} disabled={fileUri ? false : true}>
                <Text style={styles.btnText}>준비 완료!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default Quiz;
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
  }
});
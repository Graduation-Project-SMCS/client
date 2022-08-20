import React, { Fragment, useEffect, useState } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
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
import { poseApi } from '../../../api';
import ScreenContainer from '../../../components/ScreenContainer';

const SurpriseQuiz = () => {
  const [filePath, setFilePath] = useState({ uri: '' });
  const [fileUri, setFileUri] = useState('');
  const [originImage, setOriginImage] = useState({
    uri: '../../../assets/images/dummy.png',
    req: require('../../../assets/images/dummy.png'),
  });
  const [imgUrl, setImgUrl] = useState();

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
        const res = response.assets[0];
        ImageCropPicker.openCropper({
          path: res.uri,
          width: 450,
          height: 800,
        }).then(image => {
          setImgUrl(image.path);
          setFilePath(image);
          setFileUri(image.path);
        });
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
        ImageCropPicker.openCropper({
          path: res.uri,
          width: 450,
          height: 800
        }).then(image => {
          setImgUrl(image.path);
          setFilePath(image);
          setFileUri(image.path);
        });
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
        source={require('../../../assets/images/galleryImages.png')}
        style={styles.images}
      />
    }
  }

  // const getImg = async () => {
  //   const response = await fetch(fileUri);
  //   const imageBlob = await response.blob();
  //   console.log(imageBlob)
  //   const reader = new FileReader();
  //   reader.readAsDataURL(imageBlob);
  //   reader.onloadend = () => {
  //     const base64data = reader.result;
  //     setImgUrl(base64data);
  //   };
  // };
  function toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

  const compareImages = async () => {
    // console.log(imgUrl)
    await poseApi(
      imgUrl
    );
  }

  return (
    <ScreenContainer>
      <View>
        <Text style={{textAlign:'center',fontSize: 18, paddingBottom:10}} >깜짝 퀴즈!</Text>
        <Text style={{textAlign:'center',fontSize: 18}} >주어진 사진과 같은 포즈를 잡아보세요</Text>
      </View>
      <View>
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

          <TouchableOpacity onPress={compareImages} style={styles.btnSection} disabled={fileUri ? false : true}>
              <Text style={styles.btnText}>준비 완료!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default SurpriseQuiz;
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 40,
    justifyContent: 'center'
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 5
  },
  btnParentSection: {
    alignItems: 'center',
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
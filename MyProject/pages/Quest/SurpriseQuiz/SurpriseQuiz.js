import React, { useState } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  ImageBackground,
  Pressable,
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import StyleText from '../../../components/StyleText';

const SurpriseQuiz = ({ modalVisible, setModalVisible }) => {
  const {colors} = useTheme();
  const [filePath, setFilePath] = useState({ uri: '' });
  const [fileUri, setFileUri] = useState('');
  const [originImage, setOriginImage] = useState({
    uri: '../../../assets/images/wuga/character1-wuga.png',
    req: require('../../../assets/images/wuga/character1-wuga.png'),
  });
  const [imgUrl, setImgUrl] = useState();
  const navigation = useNavigation();

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

  const lImageWeb = () => {
    let path = 'https://image.kmib.co.kr/online_image/2019/0916/201909160001_23110924097767_1.jpg';
    setImgUrl(path);
    setFilePath(path);
    setFileUri(path);
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
      return <View style={{ width: 150, height: 150, alignItems: 'center'}}>
        <StyleText style={{ color: colors.brown[4], fontSize: 120, fontWeight: '900', textAlign: 'center', justifyContent: 'center', }}>?</StyleText>
      </View>
    }
  }

  return (
    <View style={{ backgroundColor: colors.backgroundColor, flex: 1, alignItems: 'center' }}>
      <ImageBackground
        source={require('../../../assets/images/wuga/background-wuga.png')}
        resizeMode={"contain"}
        style={{width: '100%', height: '98%'}}
      >
        <View style={{ padding: 30 }}>
          <Pressable
              onPress={()=>setModalVisible(!modalVisible)}
          >
              <StyleText style={{...styles.modalX, color: colors.defaultDarkColor}}>X</StyleText>
          </Pressable>
          <View>
            <StyleText
              style={{textAlign:'center',fontSize: 18, paddingVertical: 10, lineHeight: 32, color: colors.defaultDarkColor}}
            >주어진 사진과 같은 포즈를 취해{'\n'} 미션을 완료하세요</StyleText>
          </View>
          <View style={styles.ImageSections}>
              {renderOriginImg()}
              {renderFileUri()}
          </View>

          <View style={styles.btnParentSection}>
            <TouchableOpacity onPress={requestCameraPermission} style={{...styles.btnSection, backgroundColor: colors.brown[3]}}>
              <StyleText style={{...styles.btnText, color: colors.defaultDarkColor }}>사진 찍기</StyleText>
            </TouchableOpacity>

            <TouchableOpacity onPress={lImageLibrary} style={{...styles.btnSection, backgroundColor: colors.brown[3]}}>
              <StyleText style={{...styles.btnText, color: colors.defaultDarkColor }}>사진 가져오기</StyleText>
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={lImageWeb} style={{...styles.btnSection, backgroundColor: colors.brown[3]}}>
              <StyleText style={{...styles.btnText, color: colors.defaultDarkColor }}>웹에서 가져오기</StyleText>
            </TouchableOpacity> */}

            <TouchableOpacity
              onPress={()=>navigation.navigate('Analyze', { image: imgUrl })}
              style={{...styles.btnSection, backgroundColor: colors.brown[3]}}
              disabled={imgUrl ? false : true}
            >
                <StyleText style={{...styles.btnText, color: colors.defaultDarkColor }}>준비 완료!</StyleText>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SurpriseQuiz;
const styles = StyleSheet.create({
  ImageSections: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  images: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  btnParentSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSection: {
    width: 225,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 15
  },
  btnText: {
    textAlign: 'center',
  },
  modalX: {
      fontWeight: '800',
      textAlign: 'center',
      alignSelf: 'flex-end',
      fontSize: 20,
  }
});
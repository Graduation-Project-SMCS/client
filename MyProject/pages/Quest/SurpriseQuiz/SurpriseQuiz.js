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
} from 'react-native';
import ScreenContainer from '../../../components/ScreenContainer';
import { useNavigation, useTheme } from '@react-navigation/native';
import StyleText from '../../../components/StyleText';

const SurpriseQuiz = () => {
  const {colors} = useTheme();
  const [filePath, setFilePath] = useState({ uri: '' });
  const [fileUri, setFileUri] = useState('');
  const [originImage, setOriginImage] = useState({
    uri: '../../../assets/images/sylvanian/basic1.png',
    req: require('../../../assets/images/sylvanian/basic1.png'),
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
        <StyleText style={{ color: colors.blue[1], fontSize: 125, fontWeight: '900'}}>?</StyleText>
      </View>
    }
  }

  return (
    <View style={{ backgroundColor: colors.backgroundColor, flex: 1, alignItems: 'center' }}>
      <View>
        <StyleText
          style={{textAlign:'center',fontSize: 16, paddingBottom:10, lineHeight: 34, color: colors.defaultDarkColor, fontWeight: '700'}}
        >깜짝 퀴즈!{'\n'}주어진 사진과 같은 포즈를 잡아보세요</StyleText>
      </View>
      <View style={styles.ImageSections}>
          {renderOriginImg()}
          {renderFileUri()}
      </View>

      <View style={styles.btnParentSection}>
        <TouchableOpacity onPress={requestCameraPermission} style={{...styles.btnSection, backgroundColor: colors.green[3]}}>
          <StyleText style={{...styles.btnText, color: colors.defaultDarkColor }}>사진 찍기</StyleText>
        </TouchableOpacity>

        <TouchableOpacity onPress={lImageLibrary} style={{...styles.btnSection, backgroundColor: colors.green[3]}}>
          <StyleText style={{...styles.btnText, color: colors.defaultDarkColor }}>사진 가져오기</StyleText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={()=>navigation.navigate('Analyze', { image: imgUrl })}
          style={{...styles.btnSection, backgroundColor: colors.green[3]}}
          disabled={imgUrl ? false : true}
        >
            <StyleText style={{...styles.btnText, color: colors.defaultDarkColor }}>준비 완료!</StyleText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SurpriseQuiz;
const styles = StyleSheet.create({
  ImageSections: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  images: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  btnParentSection: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 25
  },
  btnSection: {
    width: 225,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 20
  },
  btnText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '800'
  }
});
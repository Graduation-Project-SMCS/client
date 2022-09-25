import React, { useEffect, useState } from 'react';
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
  Platform,
} from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import StyleText from '../../../components/StyleText';
import { getAPI, poseAPI, postAPI, putAPI } from '../../../api';
import axios from 'axios';
import dayjs from 'dayjs';

const SurpriseQuiz = ({ modalVisible, setModalVisible, now }) => {
  const {colors} = useTheme();
  const [filePath, setFilePath] = useState({ uri: '' });
  const [fileUri, setFileUri] = useState('');
  const [originImage, setOriginImage] = useState({
    mission: 'https://image.kmib.co.kr/online_image/2019/0916/201909160001_23110924097767_1.jpg',
  });
  const [originInfo, setOriginInfo] = useState([]); //현재 들어온 미션 사진에 대한 정보

  const [imgUrl, setImgUrl] = useState();
  const [response, setResponse] = useState(null);
  const navigation = useNavigation();
  const [imageInfo, setImageInfo] = useState({});
  const getCurQuest = async () => {
      await getAPI(
          {},
          `/mission/${now}`,
          "",
      )
      .then(async ({ data, status }) => {
          // console.log(data);
          if(status === 200 || status === 201 || status === 204) {
              setOriginImage(data);

              const config = {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                  // Accept: "application/json;charset=utf-8",
                  Authorization: "KakaoAK f2213ccc98faaaf7f11618144febcbe4",
                },
              };

              let formBody = [];
              let encodedKey = encodeURIComponent('image_url');
              let encodedValue = '';
              encodedValue = encodeURIComponent(data.mission);
              formBody.push(encodedKey + "=" + encodedValue);
              formBody = formBody.join("&");

              await axios.post('https://cv-api.kakaobrain.com/pose', formBody, config)
                .then(({ data, status }) => {
                  setOriginInfo(data);
                    // console.log(data, status);
                })
                .catch((error) => {
                    if (error.response) {
                        console.log(error.response.data);
                    }
                    console.log(error);
                });
          }
      })
      .catch((e) => {
          console.log(e);
      });
  };
  useEffect(() => {
    getCurQuest();
  }, []);

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
        setImageInfo({
          name: res.fileName,
          type: res.type,
          uri: Platform.OS === 'android' ? res.uri : res.uri.replace('file://', ''),
        });
        ImageCropPicker.openCropper({
          path: res.uri,
          width: 500,
          height: 800,
        }).then(image => {
          console.log(image)
          setImgUrl(image.path);
          setFilePath(image);
          setFileUri(res.uri);
          setResponse(res);
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
        setImageInfo({
          name: res.fileName,
          type: res.type,
          uri: Platform.OS === 'android' ? res.uri : res.uri.replace('file://', ''),
        });
        ImageCropPicker.openCropper({
          path: res.uri,
          width: 500,
          height: 800,
          mediaType: 'photo',
          includeBase64: Platform.OS === 'android',
        }).then(async image => {
          if (res.didCancel) return;
          setImgUrl(image.path);
          setFilePath(image);
          setFileUri(res.uri);
          setResponse(res);
        });
      }
    });
  }

  const renderOriginImg = () => {
    return <Image source={{uri: originImage.mission}}
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
  };

  const sendImageToServer = async () => {
    const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
    };

    const data = new FormData();
    let date = Date.now();
    let today = dayjs(date).format("YYYY-MM-DD");
    // let i = [fileUri];
    let i = [fileUri]
    // data.append('images', i);
    // data.append('images', JSON.stringify(i));
    // data.append('images', new Blob([JSON.stringify(i)], {type: 'multipart/form-data'}));
    let m = {
      date: today,
      similarity: 0,
      success: false,
    };
    // data.append('images', fileUri);
    data.append('mission', new Blob([JSON.stringify(m)], {type: 'application/json'}));
    // data.append('mission', JSON.stringify(m));
    // data.append('mission', m);
    // data.append('mission', JSON.stringify(m));
    // data.append('images', i);
    data.append("images", imageInfo);

    
    await axios.put(`https://wuga-server.herokuapp.com/mission/${now}`, data, config)
      .then(({ data, status }) => {
          if(status === 200 || status === 201 || status === 204) {
              console.log(code, data, status);
              navigation.navigate('Analyze', { image: imgUrl, originInfo: originInfo });
          }
      })
      .catch((error) => {
        if (error.response) {
          // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
          console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
        }
        else if (error.request) {
          // 요청이 이루어 졌으나 응답을 받지 못했습니다.
          // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
          // Node.js의 http.ClientRequest 인스턴스입니다.
          console.log(error.request);
        };
        console.log(error, data, imageInfo);
          // console.log(e, data, today, imageInfo.uri);
      });
  };

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

            <TouchableOpacity
              onPress={()=>sendImageToServer()}
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
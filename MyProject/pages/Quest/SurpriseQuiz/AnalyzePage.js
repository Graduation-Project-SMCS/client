import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Image, View, ActivityIndicator, Pressable, ImageBackground } from 'react-native';
import { poseAPI } from '../../../api';
import BackBtn from '../../../components/BackBtn';
import StyleText from '../../../components/StyleText';

const QuestAnalyze = ({ modalVisible, setModalVisible }) => {
    const {colors} = useTheme();
    const route = useRoute();
    const navigation = useNavigation();
    const { image, originInfo } = route.params;
    const [analyzeRes, setAnalyzeRes] = useState('성공!');
    const [isAnalyzeFinished, setIsAnalyzeFinished] = useState(false);

    useEffect(() => {
        // compareImages();
        setTimeout(() => {
            setIsAnalyzeFinished(true)
        }, 3000);
    }, []);

    const compareImages = async () => {
        console.log(image)
        await poseAPI(
            image
        )
        .then(({ data, status }) => {
            console.log(data, status);
            if(status === 200) setAnalyzeRes('성공!');
            setTimeout(() => {
                setIsAnalyzeFinished(true)
            }, 3000);
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response.data);
            }
            console.log(error);
            setTimeout(() => {
                setIsAnalyzeFinished(true)
            }, 3000);
        });
    };

    return (
        <View style={{ backgroundColor: colors.backgroundColor, flex: 1, alignItems: 'center' }}>
            <ImageBackground
                source={require('../../../assets/images/wuga/background-wuga.png')}
                resizeMode={"contain"}
                style={{width: '100%', height: '98%'}}
            >
                <View style={{ padding: 5 }}>
                    <Pressable
                        onPress={()=>setModalVisible(!modalVisible)}
                    >
                        <StyleText style={{...styles.modalX, color: colors.defaultDarkColor}}>X</StyleText>
                    </Pressable>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 45 }}>
                        <Image
                            nativeID='dataImage'
                            source={{ uri: image }}
                            style={styles.images}
                        />
                        { isAnalyzeFinished ?
                            <></> :
                            <>
                                <StyleText style={{ justifyContent: 'center', alignSelf: 'center', fontSize: 24, color: colors.defaultDarkColor, marginBottom: 25 }}>
                                    미션 분석 중...
                                </StyleText>
                                <ActivityIndicator size={"large"} color={colors.brown[3]} /> 
                            </>
                        }
                    </View>
                    
                    { isAnalyzeFinished
                        && 
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5  }}>
                            <StyleText style={{...styles.analyzeRes, color: colors.brown[2]}}>{ analyzeRes }</StyleText>
                            <StyleText style={{ fontSize: 22, color: colors.brown[4], marginTop: 30 }}>{ '유사도 : 63.5%' }</StyleText>
                        </View>
                    }
                </View>
                <BackBtn navigation={navigation} style={{right: 25}}/>
            </ImageBackground>
        </View>
    );
};

export default QuestAnalyze;

const styles = StyleSheet.create({
    images: {
      width: 200,
      height: 200,
      marginVertical: 20,
      resizeMode: 'contain'
    },
    analyzeRes: {
        fontSize: 32,
    },
    modalX: {
        fontWeight: '800',
        textAlign: 'center',
        alignSelf: 'flex-end',
        fontSize: 20,
        marginTop: 25,
        marginRight: 25
    }
  });
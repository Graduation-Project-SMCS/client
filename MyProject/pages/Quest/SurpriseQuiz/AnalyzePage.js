import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Image, View, ActivityIndicator, Pressable, ImageBackground } from 'react-native';
import { poseAPI } from '../../../api';
import BackBtn from '../../../components/BackBtn';
import ScreenContainer from '../../../components/ScreenContainer';
import StyleText from '../../../components/StyleText';

const QuestAnalyze = ({ route, navigation }) => {
    const {colors} = useTheme();
    const { image } = route.params;
    const [analyzeRes, setAnalyzeRes] = useState('실패!');
    const [isAnalyzeFinished, setIsAnalyzeFinished] = useState(false);

    useEffect(() => {
        compareImages();
    }, []);

    const compareImages = async () => {
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
        .catch((e) => {
            console.log(e);
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
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: '50%' }}>
                        { isAnalyzeFinished ?
                            <></> :
                            <StyleText style={{ fontSize: 16, color: colors.defaultDarkColor, fontWeight: '700' }}>
                                미션 분석 중...
                            </StyleText>
                        }
                        <Image
                            nativeID='dataImage'
                            source={{ uri: image }}
                            style={styles.images}
                        />
                        { !isAnalyzeFinished && <ActivityIndicator size={"large"} color={colors.brown[3]} /> }
                    </View>
                    
                    { isAnalyzeFinished
                        && 
                        <View style={{ justifyContent: 'center', alignItems: 'center'  }}>
                            <StyleText style={{...styles.analyzeRes, color: colors.brown[2]}}>{ analyzeRes }</StyleText>
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
        fontWeight: '900',
        marginTop: 30
    },
  });
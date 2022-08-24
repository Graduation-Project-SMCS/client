import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Image, View, ActivityIndicator, Pressable } from 'react-native';
import { poseAPI } from '../../../api';
import ScreenContainer from '../../../components/ScreenContainer';

const QuestAnalyze = ({ route, navigation }) => {
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
        <ScreenContainer>
            <View style={{ justifyContent: 'center', alignItems: 'center', height: '50%' }}>
                { isAnalyzeFinished ?
                    <></> :
                    <Text style={{ fontSize: 16, color: 'green', fontWeight: '700' }}>
                        미션 분석 중...
                    </Text>
                }
                <Image
                    nativeID='dataImage'
                    source={{ uri: image }}
                    style={styles.images}
                />
                { !isAnalyzeFinished && <ActivityIndicator size={"large"} color="olive" /> }
            </View>
            
            { isAnalyzeFinished
                && 
                <View style={{ justifyContent: 'center', alignItems: 'center'  }}>
                    <Text style={{...styles.analyzeRes}}>{ analyzeRes }</Text>
                </View>
            }
            <Pressable
                onPress={()=>navigation.popToTop()}
                style={{...styles.backBtn}}
            >
                <View style={{...styles.backBtn}}>
                    <Text style={{...styles.backBtnText}}>뒤로</Text>
                </View>
            </Pressable>
        </ScreenContainer>
    );
};

export default QuestAnalyze;

const styles = StyleSheet.create({
    images: {
      width: 175,
      height: 175,
      marginVertical: 20
    },
    analyzeRes: {
        fontSize: 36,
        fontWeight: '900',
        color: 'olive',
        marginTop: 30
    },
    backBtn: {
        position: 'absolute',
        right: 15,
        bottom: 15,
        backgroundColor: 'olive',
        borderRadius: 10
    },
    backBtnText: {
        fontSize: 12,
        color: 'white',
        paddingHorizontal: 10,
        paddingVertical: 7.5
    }
  });
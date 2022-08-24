import React from 'react';
import { Text, View, Image, SafeAreaView, Pressable, StyleSheet } from 'react-native';

const Answer = ({ route, navigation }) => {
    const { answer, image, name, idx } = route.params;

    return (
        <SafeAreaView flex={1} style={{ margin: 15 }}>
            <View key={idx} style={{ marginVertical: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <View style={{alignItems: 'center', marginRight: 15, width: '20%', justifyContent: 'flex-start' }}>
                        <Image source={image} style={{width: 25, height: 25, resizeMode: 'cover'}} />
                        <Text style={{ marginTop: 5 }}>{name}</Text>
                    </View>
                    <Text style={{ textAlign: 'left' }}>{answer}</Text>
                </View>
            </View>

            <Pressable
                onPress={()=>navigation.popToTop()}
            >
                <View style={{...styles.backBtn}}>
                    <Text style={{...styles.backBtnText}}>뒤로</Text>
                </View>
            </Pressable>
        </SafeAreaView>
    );
};

export default Answer;

const styles = StyleSheet.create({
    backBtn: {
        position: 'absolute',
        right: 15,
        top: 5,
        backgroundColor: 'olive',
        borderRadius: 10
    },
    backBtnText: {
        fontSize: 12,
        color: 'white',
        paddingHorizontal: 10,
        paddingVertical: 7.5
    }
})
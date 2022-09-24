import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import {View, Image, Text, StyleSheet, Pressable} from "react-native";
import StyleText from './StyleText';

const CommentForm = (props) => {
    const {e, idx} = props;
    const {colors} = useTheme();
    const [defaultImage, setDefaultImage] = useState({
        id: -1,
        name: 'null',
        image: require('../assets/images/wuga/character2-wuga.png'),
      });
      const [defaultCharacterList, setDefaultCharacterList] = useState([
          {
              id: 1,
              name: 'ele',
              image: require('../assets/images/wuga/characters/ele.png'),
          }, {
              id: 2,
              name: 'dino',
              image: require('../assets/images/wuga/characters/dino.png'),
          }, {
              id: 3,
              name: 'bunny',
              image: require('../assets/images/wuga/characters/bunny.png'),
          }, {
              id: 4,
              name: 'icebunny',
              image: require('../assets/images/wuga/characters/icebunny.png'),
          },
      ]);

    return (
        <View key={idx} style={{ marginVertical: 10 }}>
            <View style={styles.formSection}>
                <View style={styles.profileSection}>
                    <Image
                     source={e.image ? defaultCharacterList[parseInt(e.image)-1].image : defaultImage.image}
                     style={styles.profileImage} />
                    <StyleText style={{...styles.profileName, color: colors.defaultDarkColor,}}>{e.name}</StyleText>
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <StyleText style={{ textAlign: 'left', color: colors.defaultDarkColor }}>{e.answer}</StyleText>

                </View>
            </View>
            <View style={{ position: 'absolute', right: 0, bottom: 0}}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end'}}>
                    <Pressable
                        onPress={()=>console.log('hi')}
                        style={{ marginHorizontal: 5 }}
                    >
                        <StyleText>👍{}</StyleText>
                    </Pressable>
                    <Pressable
                        onPress={()=>setEmoji()}
                        style={{ marginHorizontal: 5 }}
                    >
                        <StyleText>❤️{}</StyleText>
                    </Pressable>
                    <Pressable
                        onPress={()=>setEmoji()}
                        style={{ marginHorizontal: 5 }}
                    >
                        <StyleText>😊{}</StyleText>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default CommentForm;

const styles = StyleSheet.create({
    formSection: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    profileSection: {
        alignItems: 'center',
        marginRight: 15,
        width: '20%',
        justifyContent: 'flex-start'
    },
    profileImage: {
        width: 25,
        height: 25,
        resizeMode: 'cover'
    },
    profileName: {
        marginTop: 5,
        fontWeight: '300',
        fontSize: 12
    },
});
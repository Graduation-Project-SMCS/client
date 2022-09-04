import React, { useEffect, useState } from 'react';
import {Pressable, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import CommentForm from '../../components/CommentForm';

const Quest = ({ navigation }) => {
  const [commentInfo, setCommentInfo] = useState([]);

  useEffect(() => {
      setCommentInfo([
        {
            id: 1,
            answer: 'nice!',
            image: require('../../assets/images/wuga/characters/bunny.png'),
            name: 'minsun',
        }, {
            id: 2,
            answer: 'cool!',
            image: require('../../assets/images/wuga/characters/ele.png'),
            name: 'minsun',
        }, {
            id: 3,
            answer: 'awesome!',
            image: require('../../assets/images/wuga/characters/icebunny.png'),
            name: 'minseok',
        }, {
            id: 4,
            answer: 'great!',
            image: require('../../assets/images/wuga/characters/dino.png'),
            name: 'eunha',
        }, {
            id: 5,
            answer: 'dope!',
            image: require('../../assets/images/wuga/characters/bunny.png'),
            name: 'minseok',
        }, {
          id: 6,
          answer: 'dope!',
          image: require('../../assets/images/wuga/characters/ele.png'),
          name: 'minseok',
        }, {
          id: 7,
          answer: 'dope!',
          image: require('../../assets/images/wuga/characters/icebunny.png'),
          name: 'minseok',
        }, {
          id: 8,
          answer: 'dope!',
          image: require('../../assets/images/wuga/characters/dino.png'),
          name: 'minseok',
        },
      ]);
  }, []);


    return (
      <>
        <SafeAreaView flex={1} style={{...styles.commentsList}}>
            <ScrollView nativeID='commentScroll' showsVerticalScrollIndicator={false} >
            {
                commentInfo.length > 0 ?
                commentInfo.map((e, idx) => {
                    return (
                        <Pressable
                          key={idx}
                          onPress={()=>navigation.navigate('Answer', {
                            answer: e.answer,
                            image: e.image,
                            name: e.name,
                            idx: idx,
                          })}
                        >
                          <CommentForm e={e} idx={idx} />
                        </Pressable>
                    )
                }) :
                <></>
            }
            </ScrollView>
        </SafeAreaView>
      </>
    );
};

export default Quest;

const styles = StyleSheet.create({
  commentsList: {
    margin: 15,
  },
});
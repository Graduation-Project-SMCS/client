import React, { useEffect, useState } from 'react';
import {Pressable, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import CommentForm from '../../components/CommentForm';

const Quest = ({ navigation, answers }) => {
  const [commentInfo, setCommentInfo] = useState([]);

  useEffect(() => {
    console.log("this is answer", answers);
    setCommentInfo(answers);
  }, []);

  const setRandomImage = (index) => {
    if (index % 2 === 0) {
      return require('../../assets/images/wuga/characters/bunny.png');
    } else if (index % 3 === 0) {
      return require('../../assets/images/wuga/characters/dino.png');
    } else if (index % 5 === 0) {
      return require('../../assets/images/wuga/characters/ele.png');
    } else {
      return require('../../assets/images/wuga/characters/icebunny.png');
    }
  };


    return (
      <>
        <SafeAreaView flex={1} style={{...styles.commentsList}}>
            <ScrollView nativeID='commentScroll' showsVerticalScrollIndicator={false} >
            {
                commentInfo.length > 0 ?
                commentInfo.map((e, idx) => {
                  const info = {
                    answer: e.answer ? e.answer : '',
                    image: setRandomImage(idx),
                    name: e.name ? e.name : 'none',
                    idx: e.id,
                  };

                  return (
                      <Pressable
                        key={idx}
                        onPress={()=>navigation.navigate('Answer', info)}
                      >
                        <CommentForm e={info} idx={idx} />
                      </Pressable>
                  );
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
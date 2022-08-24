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
            image: require('../../assets/images/icon/my_filled.png'),
            name: 'minsun',
        }, {
            id: 2,
            answer: 'cool!',
            image: require('../../assets/images/icon/my.png'),
            name: 'minsun',
        }, {
            id: 3,
            answer: 'awesome!',
            image: require('../../assets/images/icon/my_filled.png'),
            name: 'minseok',
        }, {
            id: 4,
            answer: 'great!',
            image: require('../../assets/images/icon/my.png'),
            name: 'eunha',
        }, {
            id: 5,
            answer: 'dope!',
            image: require('../../assets/images/icon/my_filled.png'),
            name: 'minseok',
        }, {
          id: 5,
          answer: 'dope!',
          image: require('../../assets/images/icon/my_filled.png'),
          name: 'minseok',
        }, {
          id: 5,
          answer: 'dope!',
          image: require('../../assets/images/icon/my_filled.png'),
          name: 'minseok',
        }, {
          id: 5,
          answer: 'dope!',
          image: require('../../assets/images/icon/my_filled.png'),
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
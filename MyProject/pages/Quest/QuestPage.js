import React, { useEffect, useState } from 'react';
import {Pressable, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import CommentForm from '../../components/CommentForm';

const Quest = ({ navigation, answers }) => {
  const [commentInfo, setCommentInfo] = useState([]);

  useEffect(() => {
    setCommentInfo(answers);
  }, []);

    return (
      <>
        <SafeAreaView flex={1} style={{...styles.commentsList}}>
            <ScrollView nativeID='commentScroll' showsVerticalScrollIndicator={false} >
            {
                commentInfo.length > 0 ?
                commentInfo.map((e, idx) => {
                  const info = {
                    answer: e.answer ? e.answer : '',
                    image: e.user_profile,
                    name: e.user_name ? e.user_name : 'none',
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
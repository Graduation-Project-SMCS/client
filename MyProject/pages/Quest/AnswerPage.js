import React from 'react';
import { SafeAreaView } from 'react-native';
import BackBtn from '../../components/BackBtn';
import CommentForm from '../../components/CommentForm';

const Answer = ({ route, navigation }) => {
    const { answer, image, name, idx } = route.params;

    return (
        <SafeAreaView flex={1} style={{ margin: 15 }}>
            <CommentForm e={{
                name: name,
                image: image,
                answer: answer,
            }} idx={idx} />

            <BackBtn navigation={navigation}/>
        </SafeAreaView>
    );
};

export default Answer;
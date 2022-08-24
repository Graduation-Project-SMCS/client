import React from 'react';
import {View, Image, Text} from "react-native";

const CommentForm = (props) => {
    const {e, idx} = props;

    return (
        <View key={idx} style={{ marginVertical: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <View style={{alignItems: 'center', marginRight: 15, width: '20%', justifyContent: 'flex-start' }}>
                    <Image source={e.image} style={{width: 25, height: 25, resizeMode: 'cover'}} />
                    <Text style={{ marginTop: 5 }}>{e.name}</Text>
                </View>
                <Text style={{ textAlign: 'left' }}>{e.answer}</Text>
            </View>
        </View>
    )
}

export default CommentForm;
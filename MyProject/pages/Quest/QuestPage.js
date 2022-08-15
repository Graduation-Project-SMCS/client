import React from 'react';
import { Text, Pressable } from 'react-native';

const Quest = ({ navigation }) => {
    return (
      <>
        <Pressable
          onPress={() =>{
            console.log('hi')
            navigation.navigate('Answer');
          }}
        >
          <Text>Go ot profile</Text>
        </Pressable>
      </>
    );
};

export default Quest;
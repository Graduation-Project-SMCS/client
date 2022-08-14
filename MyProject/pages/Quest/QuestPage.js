import React from 'react';
import { Button } from 'react-native';

const Quest = ({ navigation }) => {
    return (
      <>
      <Button
        title="Go to minsun's profile"
        onPress={() =>
          navigation.navigate('Profile', { name: 'Jane' })
        }
      />
      </>
    );
};

export default Quest;
import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';

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

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    marginVertical: 20,
    marginHorizontal: 30,
    backgroundColor: "white",
    borderRadius: 20,

    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    height: '100%',
  },
  button: {
    borderRadius: 20,
    paddingHorizontal: 35,
    paddingTop: 35,
    alignSelf: 'flex-end',
  },
  textStyle: {
    color: 'black',
    fontWeight: '900',
    fontSize: 24,
  },
});
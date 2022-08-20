import React from 'react';
import { Platform } from 'react-native';

const poseApi = async (img) => {
  const data = new FormData();
  data.append('file',  Platform.OS === "android"
  ? img
  : img.replace("file=@", ""));

    console.log(img)
    // try {
      await fetch('https://cv-api.kakaobrain.com/pose', {
          method: 'POST',
          headers: { 
            "Content-Type": "multipart/form-data",
            Accept: "application/json;charset=utf-8",
            Authorization: "KakaoAK f2213ccc98faaaf7f11618144febcbe4",
          },
          body: data,
          //file
      }).then((res) => res.json())
        .then((response) => {
            console.log(data)
          console.log(response)
      })
      .catch((err) => {
          console.error(err);
      });
};

export default poseApi;
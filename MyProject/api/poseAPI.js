import React, { useState } from 'react';
import { Platform } from 'react-native';
import axios from "axios";

const poseAPI = async (img) => {
  const data = new FormData();
  let blobImage = '';
  const response = await fetch(img);
  const blob = await response.blob();
  blobImage = blob._data.blobId+'.jpg';
  // data.append('file=@',  Platform.OS === "android"
  // ? img.replace("file:///", "")
  // : img.replace("file=@", ""));
  data.append('file', JSON.stringify(blobImage));

  // const param = {
  //   path: img,
  //   grayscale: false, // or true
  //   base64: true, // or true
  //   resizeRatio: 0.8, // 1.0 is origin value
  //   imageQuality: 0.7 // 1.0 is max quality value
  // }
  // const { success, errorMsg, imageURI, base64String } = await IImageConverter.convert(param)
  // console.log(success, errorMsg, imageURI, base64String)
  // let formBody = [];
  // let encodedKey = encodeURIComponent('image_url');
  // let encodedValue = '';
  // encodedValue = encodeURIComponent('https://pngimg.com/uploads/muscle/muscle_PNG9.png');
  // formBody.push(encodedKey + "=" + encodedValue);
  // formBody = formBody.join("&");
  // console.log(formBody)

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      // "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json;charset=utf-8",
      Authorization: "KakaoAK f2213ccc98faaaf7f11618144febcbe4",
    },
  };
  console.log(data)
  return await axios.post('https://cv-api.kakaobrain.com/pose', data, config);
};

export default poseAPI;
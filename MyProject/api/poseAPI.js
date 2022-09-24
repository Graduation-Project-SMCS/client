import React, { useState } from 'react';
import { Platform } from 'react-native';
import axios from "axios";

const poseAPI = async (img) => {
  const data = new FormData();

  let blobImage = '';
  // let blobImage = img.toString('base64');
  const response = await fetch(img);
  const blob = await response.blob();
  blobImage = blob._data.blobId;
  // data.append('file=@',  Platform.OS === "android"
  // ? img.replace("file:///", "")
  // : img.replace("file=@", ""));
  // data.append('file', base64String);
  data.append('file', blobImage);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      // "Content-Type": "application/x-www-form-urlencoded",
      // Accept: "application/json;charset=utf-8",
      Authorization: "KakaoAK f2213ccc98faaaf7f11618144febcbe4",
    },
  };
  console.log(data, img)
  return await axios.post('https://cv-api.kakaobrain.com/pose', data, config);
};

export default poseAPI;
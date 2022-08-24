import React from 'react';
import { Platform } from 'react-native';
import axios from "axios";

const poseAPI = async (img) => {
  const data = new FormData();
  data.append('file',  Platform.OS === "android"
  ? img
  : img.replace("file=@", ""));

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json;charset=utf-8",
      Authorization: "KakaoAK f2213ccc98faaaf7f11618144febcbe4",
    },
  };

  return await axios.post('https://cv-api.kakaobrain.com/pose', data, config);
};

export default poseAPI;
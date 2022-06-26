import React from 'react';
// import TmpImage from '../assets/image.png';
import { decode as atob, encode as btoa } from 'base-64';

const poseApi = async (img) => {
// console.log(img)
    let formBody = [];
    // let imageUrl = "https://media.vlpt.us/images/dnwlsrla40/post/3d79fa5b-aee7-4511-98ef-bef5d74747eb/image.png";
    // let encodedKey = encodeURIComponent('file');
    // let encodedValue = '';
    // encodedValue = encodeURIComponent(img);
    // formBody.push(encodedKey + "=" + encodedValue);
    // formBody = formBody.join("&");

      // dataURL 값이 data:image/jpeg:base64,~~~~~~~ 이므로 ','를 기점으로 잘라서 ~~~~~인 부분만 다시 인코딩
  const byteString = img.split(",")[1];

  // Blob를 구성하기 위한 준비, 이 내용은 저도 잘 이해가 안가서 기술하지 않았습니다.
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ia], {
    type: "image/jpeg"
  });
  const file = new File([blob], "image.jpg");

    let form = new FormData();
    form.append('file', file._data.blobId+'.jpg');

    try {
      await fetch('https://cv-api.kakaobrain.com/pose', {
          method: 'POST',
          headers: { 
            'Accept': 'application/json;charset=UTF-8',
            Authorization: "KakaoAK f2213ccc98faaaf7f11618144febcbe4",
            //   "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            "Content-Type": "multipart/form-data",
          },
          body: form,
          //file
      }).then((res) => res.json())
        .then((response) => {
            console.log(form)
          console.log(response)
          // if(response) {
          //     setInfo(response[0]);
          //     setScore(response[0].score);
          // }
      })
      .catch((err) => {
          console.error(err);
      });
    } catch (err) {
        console.error(err);
    }
};

export default poseApi;
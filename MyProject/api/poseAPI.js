import React from 'react';
// import TmpImage from '../assets/image.png';
 
const poseApi = async (img) => {
// console.log(img)
    let formBody = [];
    // let imageUrl = "https://media.vlpt.us/images/dnwlsrla40/post/3d79fa5b-aee7-4511-98ef-bef5d74747eb/image.png";
    let encodedKey = encodeURIComponent('image_url');
    let encodedValue = '';
    encodedValue = encodeURIComponent(img);
    formBody.push(encodedKey + "=" + encodedValue);
    formBody = formBody.join("&");

    try {
      await fetch('https://cv-api.kakaobrain.com/pose', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              Authorization: "KakaoAK f2213ccc98faaaf7f11618144febcbe4",
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: formBody,
          //file:
      }).then((res) => res.json())
        .then((response) => {
            console.log(formBody)
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
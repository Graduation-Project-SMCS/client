import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
} from 'react-native';
import TmpImage from '../assets/image.png';

const Pose = () => {
    const [info, setInfo] = useState(null);

    const getPoseAnalyzing = async () => {
        try {
            let formBody = [];
            let imageUrl = "https://media.vlpt.us/images/dnwlsrla40/post/3d79fa5b-aee7-4511-98ef-bef5d74747eb/image.png";
            let encodedKey = encodeURIComponent('image_url');
            let encodedValue = encodeURIComponent(imageUrl);
            formBody.push(encodedKey + "=" + encodedValue);
            formBody = formBody.join("&");

            fetch('https://cv-api.kakaobrain.com/pose', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    Authorization: "KakaoAK f2213ccc98faaaf7f11618144febcbe4",
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                },
                body: formBody,
                //file:
            }).then((res) => res.json())
                .then(async (response) => {
                    console.log(response[0])
                    setInfo(response[0]);
                })
                .catch((err) => {
                    console.error(err);
                });

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getPoseAnalyzing();
    }, []);

    return (
        <View>
            <Text>hi!</Text>
            <Text>{info.score}</Text>
        </View>
    );
};

export default Pose;
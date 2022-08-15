import React, {useState} from 'react';
import {Text, Platform, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
// ** customize 한 스택 네비게이션 헤더 입니다.
// ** props 로 navigation(navigation 객체), title(String) 을 받습니다.

const HeaderNavigation = props => {
    const {colors} = useTheme();

    return (
        <View flexDirection="row" style={{
            height: 24,
            paddingVertical: 25,
            paddingHorizontal: 25,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white'
        }}>
            <View style={{position: 'absolute', left: 10}}>
                <TouchableOpacity
                    onPress={() => props.navigation.goBack()}
                    activeOpacity={0.8}
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                    <Text style={{ fontSize: 26, color: 'gray', fontWeight: '900' }}>◀</Text>
                    <Text style={{ fontSize: 14, color: 'gray', fontWeight: '700' }}>  back</Text>
                </TouchableOpacity>
            </View>
            <Text style={{color: 'green', fontSize: 16, fontWeight: 'bold'}}>
                {props.title}
            </Text>
        </View>
    );
};

export default HeaderNavigation;
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import StyleText from './StyleText';

const HeaderNavigation = props => {
    const {colors} = useTheme();

    return (
        <View flexDirection="row" style={{
            height: 40,
            paddingTop: 45,
            paddingHorizontal: 25,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.backgroundColor
        }}>
            <View style={{position: 'absolute', left: 10}}>
                <TouchableOpacity
                    onPress={() => props.navigation.popToTop()}
                    activeOpacity={0.8}
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                    <StyleText style={{ fontSize: 22, color: colors.brown[1], fontWeight: '900' }}>◀</StyleText>
                    <StyleText style={{ fontSize: 14, color: colors.brown[1], fontWeight: '700', paddingTop: 4}}>  뒤로</StyleText>
                </TouchableOpacity>
            </View>
            <StyleText style={{color: colors.brown[1], fontSize: 16, fontWeight: 'bold'}}
            >{props.title}
            </StyleText>
        </View>
    );
};

export default HeaderNavigation;
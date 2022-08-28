import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

const HeaderNavigation = props => {
    const {colors} = useTheme();

    return (
        <View flexDirection="row" style={{
            height: 24,
            paddingVertical: 25,
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
                    <Text style={{ fontSize: 26, color: colors.defaultDarkColor, fontWeight: '900' }}>◀</Text>
                    <Text style={{ fontSize: 14, color: colors.defaultDarkColor, fontWeight: '700', paddingTop: 4, fontFamily: 'SongMyung-Regular' }}>  뒤로</Text>
                </TouchableOpacity>
            </View>
            <Text style={{color: colors.green[1], fontSize: 16, fontWeight: 'bold'}}>
                {props.title}
            </Text>
        </View>
    );
};

export default HeaderNavigation;
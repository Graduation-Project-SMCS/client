import React, { useEffect, useState } from 'react';
import {
    Image,
    View,
    Text,
    ScrollView,
    SafeAreaView,
    ImageBackground,
  } from 'react-native';
import { Calendar } from 'react-native-calendars';
import ScreenContainer from '../components/ScreenContainer';
import dayjs from 'dayjs';
import { useTheme } from '@react-navigation/native';
import StyleText from '../components/StyleText';

const CalendarPage = () => {
  const {colors} = useTheme();

  let date = Date.now();
  let today = dayjs(date).format("YYYY-MM-DD");
  let start = dayjs(today).startOf('year').format('YYYY-MM-DD');
  let end = dayjs(today).endOf('year').format('YYYY-MM-DD');

  const [nowDay, setNowDay] = useState(today);
  const [familyInfo, setFamilyInfo] = useState([]);

  useEffect(() => {
    setFamilyInfo([
      {
        name: 'minsun',
        answer: 'me',
        picture: require('../assets/images/wuga/character1-wuga.png'),
      }, {
        name: 'minseok',
        answer: 'bro',
        picture: require('../assets/images/wuga/character1-wuga.png'),
      }, {
        name: 'eunha',
        answer: 'mom',
        picture: require('../assets/images/wuga/character1-wuga.png'),
      },      {
        name: 'minsun',
        answer: 'me',
        picture: require('../assets/images/wuga/character1-wuga.png'),
      }, {
        name: 'minseok',
        answer: 'bro',
        picture: require('../assets/images/wuga/character1-wuga.png'),
      },
    ])
  }, []);

  return (
    <ScreenContainer>
        <Calendar
          markingType={'custom'}
          initialDate={today}
          markedDates={{
            [nowDay]: {
              selected: true,
              disableTouchEvent: true,
              selectedTextColor: colors.brown[1],
              selectedColor: colors.brown[3],
            }
          }}
          minDate={start}
          maxDate={end}
          onDayPress={day => {
            let formattedDay = dayjs(day.dateString).format('YYYY-MM-DD');
            setNowDay(formattedDay);
          }}
          monthFormat={'yyyy.MM'}
          renderArrow={direction => {
            return (
              <StyleText>{ direction === 'left' ? '<' : '>'}</StyleText>
            )
          }}
        />

        <View nativeID='day-question' style={{ marginTop: 5, height: 250 }}>
          <View nativeID='quest-box'
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Image
              source={require('../assets/images/wuga/questbg-wuga.png')}
              resizeMode={"contain"}
              style={{height: 100}}
            /> 
            <View nativeID='quest-num' style={{position: 'absolute'}}>
              <StyleText nativeID='quest' style={{ fontSize: 18, color: colors.defaultDarkColor, textAlign: 'center' }}>{'질문'}</StyleText>
            </View>
          </View>
          <SafeAreaView flex={1}>
            <ScrollView nativeID='family-answers' showsVerticalScrollIndicator={false} >
              {
                familyInfo.length > 0 ?
                familyInfo.map((e, idx) => {
                  return (
                    <View key={idx} style={{ marginVertical: 10 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Image source={e.picture} style={{width: 25, height: 25, marginLeft: 5, marginRight: 15}} />
                        <StyleText style={{ textAlign: 'left', color: colors.defaultDarkColor, fontSize: 12 }}>{e.answer}</StyleText>
                      </View>
                    </View>
                  )
                }) :
                <></>
              }
            </ScrollView>
          </SafeAreaView>
        </View>
    </ScreenContainer>
  );
};

export default CalendarPage;

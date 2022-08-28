import React, { useEffect, useState } from 'react';
import {
    Image,
    View,
    Text,
    ScrollView,
    SafeAreaView,
  } from 'react-native';
import { Calendar } from 'react-native-calendars';
import ScreenContainer from '../components/ScreenContainer';
import dayjs from 'dayjs';
import { useTheme } from '@react-navigation/native';

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
        picture: require('../assets/images/icon/home_filled.png'),
      }, {
        name: 'minseok',
        answer: 'bro',
        picture: require('../assets/images/icon/home_filled.png'),
      }, {
        name: 'eunha',
        answer: 'mom',
        picture: require('../assets/images/dummy.png'),
      },      {
        name: 'minsun',
        answer: 'me',
        picture: require('../assets/images/dummy.png'),
      }, {
        name: 'minseok',
        answer: 'bro',
        picture: require('../assets/images/dummy.png'),
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
              selectedTextColor: colors.green[1],
              selectedColor: colors.green[3],
            }
          }}
          minDate={start}
          maxDate={end}
          onDayPress={day => {
            let formattedDay = dayjs(day.dateString).format('YYYY-MM-DD');
            setNowDay(formattedDay);
          }}
          monthFormat={'yyyy MM'}
          renderArrow={direction => {
            return (
              <Text>{ direction === 'left' ? '<' : '>'}</Text>
            )
          }}
        />

        <View nativeID='day-question' style={{ marginTop: 25, height: 220 }}>
          <View nativeID='quest-num'>
            <Text style={{ fontSize: 14, color: colors.defaultDarkColor }}># {nowDay}</Text>
          </View>
          <View nativeID='quest-box'
            style={{ marginVertical: 15, backgroundColor: colors.blue[1], alignItems: 'center', justifyContent: 'center' }}
          >
            <Text nativeID='quest' style={{ fontSize: 16, paddingVertical: 12, color: colors.defaultDarkColor }}>{'질문'}</Text>
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
                        <Text style={{ textAlign: 'left', color: colors.defaultDarkColor, fontSize: 12 }}>{e.answer}</Text>
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

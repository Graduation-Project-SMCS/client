import React, { useContext, useEffect, useState } from 'react';
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
import { useIsFocused, useTheme } from '@react-navigation/native';
import StyleText from '../components/StyleText';
import { Context } from '../context';
import { getAPI } from '../api';

const CalendarPage = () => {
  const {colors} = useTheme();

  let date = Date.now();
  let today = dayjs(date).format("YYYY-MM-DD");
  let start = dayjs(today).startOf('year').format('YYYY-MM-DD');
  let end = dayjs(today).endOf('year').format('YYYY-MM-DD');

  const [nowDay, setNowDay] = useState(today);
  const [familyInfo, setFamilyInfo] = useState([]);
  const {
      state: {
          userInfo,
      }
  } = useContext(Context);
  const [todayQuest, setTodayQuest] = useState({
    id: 0,
    question: '',
  });
  const [defaultImage, setDefaultImage] = useState({
    id: -1,
    name: 'null',
    image: require('../assets/images/wuga/character2-wuga.png'),
  });
  const [defaultCharacterList, setDefaultCharacterList] = useState([
      {
          id: 1,
          name: 'ele',
          image: require('../assets/images/wuga/characters/ele.png'),
      }, {
          id: 2,
          name: 'dino',
          image: require('../assets/images/wuga/characters/dino.png'),
      }, {
          id: 3,
          name: 'bunny',
          image: require('../assets/images/wuga/characters/bunny.png'),
      }, {
          id: 4,
          name: 'icebunny',
          image: require('../assets/images/wuga/characters/icebunny.png'),
      },
  ]);
  const [todayDate, setTodayDate] = useState(dayjs(new Date()).format("YYYY-MM-DD"));
  const getTodayQuestion = async (date) => {
      await getAPI(
          {},
          `/question/${date}`,
          "",
      )
      .then(({ data, status }) => {
        console.log(data)
          setTodayQuest({
            ...data,
          });
        getAnswers(data.id)
      })
      .catch((e) => {
        console.log(e);
        setTodayQuest({
          id: -1,
          question: '',
        });
        setFamilyInfo([]);
      });
  };

  const getAnswers = async (id) => {
      await getAPI(
          {},
          `/question/answers/${id}/${userInfo.id}`,
          "",
      )
      .then(({ data, status }) => {
          console.log(data, userInfo.id);
          if(status === 200 || status === 201 || status === 204) {
              setFamilyInfo(data);
          }
      })
      .catch((e) => {
          console.log(e);
      });
  };
  useEffect(() => {

    getTodayQuestion(todayDate);
  }, [useIsFocused()]);

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
            setTodayDate(formattedDay);
            getTodayQuestion(formattedDay);
          }}
          monthFormat={'yyyy.MM'}
          renderArrow={direction => {
            return (
              <StyleText>{ direction === 'left' ? '<' : '>'}</StyleText>
            )
          }}
        />

        <View nativeID='day-question' style={{ marginTop: 5, height: 250, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View nativeID='quest-box'
            style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', width: '70%', marginTop: 15 }}
          >
            <StyleText style={{ textAlign: 'left', fontSize: 14, alignSelf: 'flex-start' }}># {nowDay}</StyleText>
            <ImageBackground
              source={require('../assets/images/wuga/questbg-wuga.png')}
              resizeMode={"contain"}
              style={{width: '100%', height: 100, justifyContent: 'center', alignItems: 'center'}}
            > 
              <View nativeID='quest-num' style={{position: 'absolute'}}>
                <StyleText nativeID='quest' style={{ fontSize: 18, color: colors.defaultDarkColor, textAlign: 'center' }}>{todayQuest.question}</StyleText>
              </View>
            </ImageBackground>
          </View>
          <View style={{ width: '40%', marginLeft: 25, marginTop: 35 }}>
            <SafeAreaView flex={1}>
              <ScrollView nativeID='family-answers' showsVerticalScrollIndicator={false}>
                {
                  familyInfo.length > 0 ?
                  familyInfo.map((e, idx) => {
                    return (
                      <View key={idx} style={{ marginVertical: 5 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                          <View>
                            <Image
                              source={e.user_profile ? defaultCharacterList[parseInt(e.user_profile)-1].image : defaultImage.image}
                              style={{width: 35, height: 35, marginLeft: 5, marginRight: 15, resizeMode: 'contain'}} />
                            <StyleText style={{fontSize: 10, marginTop: 2}}>{e.user_name}</StyleText>
                          </View>
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
        </View>
    </ScreenContainer>
  );
};

export default CalendarPage;

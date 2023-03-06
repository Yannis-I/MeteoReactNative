import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import datas5days from "../datas5days.json";
import DailyWeather from './DailyWeather';

export default function Previsons({location, API_KEY, setErrorMsg}) {
    const [fiveDaysWeather, setFiveDaysWeather] = useState(null);

    useEffect(() => {
        if (location) {
            const lat = location.coords.latitude;
            const lon = location.coords.longitude;
            
            /*axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=fr&units=metric`)
                .then(response => {
                    // iconUri = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
                    console.log(JSON.stringify(response.data));
                    // setCurrentWeather(response.data);
                })
                .catch(error => {
                    console.error(error);
                    setErrorMsg("Une erreur de connexion à l'API est survenue, réessayez plus tard");
                });*/

            console.log("fetch previsions (location : " + location + ")");
            
            setFiveDaysWeather(filterDatas(datas5days));
        }
    }, [location])

    const filterDatas = (datas) => {
        const now = new Date(Date.now());
        const today = new Date(now.getTime() - ((((now.getHours() - 1) * 3600) + (now.getMinutes() * 60) + (now.getSeconds())) * 1000) - (now.getMilliseconds()));
        const oneDay = 24 * 60 * 60 * 1000;

        let filteredDatas = [
            {jour: 0, datas: []},
            {jour: 1, datas: []},
            {jour: 2, datas: []},
            {jour: 3, datas: []},
            {jour: 4, datas: []},
            {jour: 5, datas: []},
        ]; 

        for(let i = 0; i < datas.list.length; i++) {
            const date = new Date(datas.list[i].dt * 1000)

            for(let j = 0; j <= 5; j++) {
                if(date.getTime() >= (today.getTime() + oneDay * j) && date.getTime() < (today.getTime() + oneDay * (j + 1)) && (date.getTime() >= now.getTime() || date.getTime() >= (today.getTime() + oneDay))){
                    filteredDatas[j].datas.push({date: date, temp: Math.round(datas.list[i].main.temp), text: datas.list[i].weather[0].description, icon: datas.list[i].weather[0].icon})
                }
            }
        }
        return filteredDatas;
    }

    return (
        <View style={styles.container}>
            {fiveDaysWeather ?
                <SwiperFlatList
                autoplay={false}
                index={0}
                showPagination={true}
                paginationStyleItemActive={{borderColor: "rgb(51, 54, 63)", borderWidth: 4, backgroundColor: "white"}}
                paginationStyleItemInactive={{backgroundColor: 'rgb(51, 54, 63)'}}
                data={fiveDaysWeather}
                renderItem={({ item, index }) => (
                    <View style={[styles.child, { backgroundColor: item }]}>
                        <DailyWeather key={index} datas={item} />
                    </View>
                )}
                />
            :
                <Text>Chargement...</Text>
            }
        </View>
    );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', marginBottom: 90 },
  child: { width, justifyContent: 'center' },
});

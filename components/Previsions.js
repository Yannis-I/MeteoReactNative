import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import DailyWeather from './DailyWeather';

export default function Previsons({location, API_KEY, setErrorMsg, getDayString}) {
    const [fiveDaysWeather, setFiveDaysWeather] = useState(null);
    const [city, setCity] = useState(null);

    useEffect(() => {
        if (location) {
            const lat = location.coords.latitude;
            const lon = location.coords.longitude;
            
            axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=fr&units=metric`)
                .then(response => {
                    setFiveDaysWeather(filterDatas(response.data));
                    setCity(response.data.city.name);
                })
                .catch(error => {
                    console.error(error);
                    setErrorMsg("Une erreur de connexion à l'API est survenue, réessayez plus tard");
                });
        }
    }, [location])

    const filterDatas = (datas) => {
        const now = new Date(Date.now());
        const today = new Date(now.getTime() - ((((now.getHours() - 1) * 3600) + (now.getMinutes() * 60) + (now.getSeconds())) * 1000) - (now.getMilliseconds()));
        const oneDay = 24 * 60 * 60 * 1000;

        let filteredDatas = setFilteredDays(today, oneDay);

        for(let i = 0; i < datas.list.length; i++) {
            const date = new Date(datas.list[i].dt * 1000)

            for(let j = 0; j <= 5; j++) {
                if(date.getTime() >= (today.getTime() + oneDay * j) && date.getTime() < (today.getTime() + oneDay * (j + 1)) && (date.getTime() >= now.getTime() || date.getTime() >= (today.getTime() + oneDay))){
                    filteredDatas[j].datas.push({hour: date.getHours() - 1, temp: Math.round(datas.list[i].main.temp), text: datas.list[i].weather[0].description, icon: datas.list[i].weather[0].icon})
                }
            }
        }
        return filteredDatas;
    }

    const setFilteredDays = (today, oneDay) => {
        let filteredDatas = []
        for(let i = 0; i <=3 ; i++) {
            filteredDatas[i] = {jour: getCurrentDay(today, oneDay, new Date((today.getTime() + (oneDay * (i + 2)) * 1000))), datas: []};
        }
        filteredDatas.push({jour: "Demain", datas: []});
        filteredDatas.push({jour: "Aujourd'hui", datas: []})
        filteredDatas.reverse();
        return filteredDatas;
    }

    const getCurrentDay = (today, oneDay, date) => {
        if(date < today + oneDay){
            return "Aujourd'hui"
        } else if(date >= today + oneDay && date < today + (oneDay * 2)) {
            return "Demain"
        } else {
            return getDayString(date.getDay());
        }
    }

    return (
        <View style={styles.container}>
            <Text  style={styles.title}>Prévision Météo pour {city}</Text>
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
  child: { width, justifyContent: 'center'},
  title: { fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginTop: 50 }
});

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import datas from '../datas.json';

import * as Location from 'expo-location';

export default function CurrentMeteo() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const API_KEY = "d67a9881ffa6a0cb88d07601ea126648";
  const [currentWeather, setCurrentWeather] = useState(null);
  const [iconUri, setIconUri] = useState("");
  const [text, setText] = useState('Waiting..');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setErrorMsg('Veillez activer les permissions de la localisation');
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      }catch(error){
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (currentWeather) {
      setText(currentWeather.name);
      setIconUri(`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`);
    }
  }, [currentWeather])

  useEffect(() => {
    if (errorMsg) {
      setText(errorMsg);
    } else if (location) {
      const lat = location.coords.latitude;
      const lon = location.coords.longitude;

    //   axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=fr&units=metric`)
    //       .then(response => {
    //         // iconUri = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
    //         console.log(response.data);
    //         setCurrentWeather(response.data);
    //       })
    //       .catch(error => {
    //         console.log(error);
    //          text = "Une erreur est survenue, réessayez plus tard";
    //       });

      setCurrentWeather(() => datas);
    }
  }, [location])

  return (
    
    <View style={styles.container}>
      {text && 
        <Text style={styles.paragraph}>Météo de <Text style={styles.city} >{text}</Text></Text>
      }
      {currentWeather &&
        <Text>{Math.round(currentWeather.main.temp)}°C</Text>
      }
      {iconUri != "" && 
        <Image style={styles.image} source={{ uri: iconUri }} ></Image>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  image: {
    width: 200,
    height: 200,
    margin: 10,
  },
  city:{
    fontWeight: "bold",
  }
});

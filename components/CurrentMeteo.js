import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import axios from 'axios';

export default function CurrentMeteo({location, API_KEY, setErrorMsg, getDayString}) {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [iconUri, setIconUri] = useState(null);
  const [dateFormatted, setDateFormatted] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("rgb(255, 255, 255)");

  useEffect(() => {
      setDateFormatted(currentDateFormat());
  }, []);
  
  useEffect(() => {
    if (location) {
      const lat = location.coords.latitude;
      const lon = location.coords.longitude;
      
      axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=fr&units=metric`)
        .then(response => {
        setCurrentWeather(response.data);
        })
        .catch(error => {
          console.log(error);
          setErrorMsg("Une erreur de connexion à l'API est survenue, réessayez plus tard");
        });
    }
  }, [location])
  

  useEffect(() => {
    if (currentWeather) {
      setIconUri(`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`);
      setBackgroundColor(temperatureToRGB(currentWeather.main.temp));
    }
  }, [currentWeather])

  const currentDateFormat = () => {
    const date = new Date(Date.now());
    const formattedDate = 
    getDayString(date.getDay()) 
        + " " 
        + date.getDate() 
        + " " 
        + getMonthString(date.getMonth() + 1) 
        + " " 
        + date.getFullYear();
    return formattedDate;
  }

  const getMonthString = (month) => {
    switch(month){
      case 1:
        return "Janvier"
      case 2:
        return "Février"
      case 3:
        return "Mars"
      case 4:
        return "Avril"
      case 5:
        return "Mai"
      case 6:
        return "Juin"
      case 7:
        return "Juillet"
      case 8:
        return "Août"
      case 9:
        return "Septembre"
      case 10:
        return "Octobre"
      case 11:
        return "Novembre"
      case 12:
        return "Décembre"
    }
  }

  const ucFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function temperatureToRGB(temp) {
    const breakpoints = [
      { temp: 50, color: { r: 255, g: 0, b: 0 } },
      { temp: 30, color: { r: 255, g: 255, b: 0 } },
      { temp: 10, color: { r: 0, g: 255, b: 0 } },
      { temp: -10, color: { r: 0, g: 0, b: 255 } },
      { temp: -30, color: { r: 150, g: 0, b: 255 } }
    ];
    
  
    let i;
    for (i = 0; i < breakpoints.length - 1; i++) {
      if (temp <= breakpoints[i].temp && temp >= breakpoints[i + 1].temp) {
        const ratio = (temp - breakpoints[i].temp) / (breakpoints[i + 1].temp - breakpoints[i].temp);
        const color = {
          r: Math.round(breakpoints[i].color.r + ratio * (breakpoints[i + 1].color.r - breakpoints[i].color.r)),
          g: Math.round(breakpoints[i].color.g + ratio * (breakpoints[i + 1].color.g - breakpoints[i].color.g)),
          b: Math.round(breakpoints[i].color.b + ratio * (breakpoints[i + 1].color.b - breakpoints[i].color.b))
        };
        return `rgba(${color.r}, ${color.g}, ${color.b}, 0.5)`;
      }
    }
  
    return 'rgb(255, 255, 255)';
  }

  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
        {currentWeather ? 
          <>
            <Text style={[styles.text, styles.titre]}>{("Météo actuelle").toUpperCase()}</Text>
            <Text style={styles.text}>{dateFormatted}</Text>
            <Text style={[styles.text, styles.city]}>{currentWeather.name}</Text>
            <Text style={[styles.text, styles.temp]}>{Math.round(currentWeather.main.temp)}°C</Text>
          </>
        :
          <Text style={styles.loading} >Chargement ...</Text>
        }
        {iconUri && 
          <Image style={styles.image} source={{ uri: iconUri }} ></Image>
        }
        {currentWeather && 
          <Text style={styles.text}>{ucFirstLetter(currentWeather.weather[0].description)}</Text>
        }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    width: "100%",
  },
  loading: {
    fontSize: 30,
  },
  text: {
    fontSize: 25,
  },
  titre: {
    fontWeight: 'bold',
    marginBottom: 40,
    fontSize: 30,
  },
  temp: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  image: {
    width: 150,
    height: 150,
    margin: 0,
  },
  city:{
    fontWeight: "bold",
  }
});

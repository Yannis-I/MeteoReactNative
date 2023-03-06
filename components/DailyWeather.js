import React from 'react';
import { Text, View, StyleSheet, Image, FlatList, Dimensions } from 'react-native';

export default function DailyWeather({datas}) {

    const renderFlatlist = ( item ) => {
      return (
        <View style={styles.hourly}>
          <Text style={[styles.space, styles.dim]}>{item.hour}h</Text>
          <Image style={[styles.dim, styles.image]} source={{ uri: `http://openweathermap.org/img/wn/${item.icon}.png` }} />
          <Text style={[styles.space, styles.dim]}>{item.temp}°C</Text>
          <Text style={styles.space}>{item.text}</Text>
        </View>
      );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{datas.jour}</Text>
            <FlatList
              data={datas.datas}
              renderItem={({item}) => renderFlatlist(item)}
              keyExtractor={(item, index) => index}
            />
        </View>
    );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginTop: 20
  },
  hourly: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width,
    height: 50,
  },
  space: {
    fontSize: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  image: {
    width: 65,
    height: "100%",
    margin: 0,
  },
  dim: {
    width: 65,
  }
});

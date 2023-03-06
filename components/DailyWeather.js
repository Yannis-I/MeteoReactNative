import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default function DailyWeather({datas}) {
    console.log(datas.datas[0].text);

    return (
        <View style={styles.container}>
            <Text>{datas.datas[0].text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "pink",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
});

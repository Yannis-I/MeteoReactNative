import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableRipple } from "react-native-paper";

export default function TabBar({page, setPage}) {
  return (
    <View style={styles.tabBar}>
      <TouchableRipple style={[styles.button, (page == 1 && {backgroundColor: "rgb(107, 114, 136)"})]} onPress={() => setPage(1)} >
        <Text style={styles.text}>ACTUEL</Text>
      </TouchableRipple>
      <TouchableRipple style={[styles.button, (page == 2 && {backgroundColor: "rgb(107, 114, 136)"})]} onPress={() => setPage(2)} >
        <Text style={styles.text}>PREVISIONS</Text>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgb(51, 54, 63)',
    height: 60,
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    height: "100%",
    width: "50%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  }
});
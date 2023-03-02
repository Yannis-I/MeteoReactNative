import { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Geolocation from "react-native-geolocation-service";

export default function CurrentMeteo() {
  const [postion, setPostion] = useState(null);

  // Récupérer la position GPS
  const getPosition = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  // Appeler l'API pour récupérer la météo actuel

  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
      <View
        style={{ marginTop: 10, padding: 10, borderRadius: 10, width: "40%" }}
      >
        <Button title="Get Location" onPress={getPosition} />
      </View>
      <Text>Latitude: </Text>
      <Text>Longitude: </Text>
      <View
        style={{ marginTop: 10, padding: 10, borderRadius: 10, width: "40%" }}
      >
        <Button title="Send Location" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

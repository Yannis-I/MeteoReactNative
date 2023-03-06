import { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import CurrentMeteo from "./components/CurrentMeteo";
import Previsons from "./components/Previsions";
import TabBar from "./components/TabBar";

import * as Location from 'expo-location';

export default function App() {
  const [page, setPage] = useState(1);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const API_KEY = "d67a9881ffa6a0cb88d07601ea126648";

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
        setErrorMsg("Une erreur de localisation s'est produite, réessayez ultérieurement");
      }
    })();
  }, []);

  useEffect(() => {
    setErrorMsg(null);
  }, [page]);

  return (
    <View style={styles.container}>
      {errorMsg ?
        <Text style={styles.errorMsg}>{errorMsg}</Text>
      :
        <>
          {page == 1 ? 
            <CurrentMeteo location={location} API_KEY={API_KEY} setErrorMsg={setErrorMsg} />
          :
            <Previsons location={location} API_KEY={API_KEY} setErrorMsg={setErrorMsg} />
          }
        </>
      }
      <TabBar page={page} setPage={setPage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
});

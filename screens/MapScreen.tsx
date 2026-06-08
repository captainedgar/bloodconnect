import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";

export default function MapScreen() {
  const [region, setRegion] = useState<Region | null>(null);

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = async () => {
    try {
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        alert("Permiso de ubicación denegado");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});

      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!region) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#E53935" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={region}
        showsUserLocation
        showsMyLocationButton
      >
        {/* Ejemplo de banco de sangre */}
        <Marker
          coordinate={{
            latitude: region.latitude + 0.002,
            longitude: region.longitude + 0.002,
          }}
          title="Banco de Sangre"
          description="Disponible"
        />
      </MapView>

      {/* Botón SOS */}
      <TouchableOpacity
        style={styles.sosButton}
        onPress={() => {
          console.log("SOS ACTIVADO");
        }}
      >
        <Text style={styles.sosText}>SOS</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  sosButton: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",

    width: 100,
    height: 100,
    borderRadius: 50,

    backgroundColor: "#E53935",

    justifyContent: "center",
    alignItems: "center",

    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },

  sosText: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold",
  },

  sosContainer: {
  position: "absolute",
  alignSelf: "center",
  bottom: 40,
},

outerRing: {
  width: 140,
  height: 140,
  borderRadius: 70,
  backgroundColor: "rgba(229,57,53,0.25)",
  justifyContent: "center",
  alignItems: "center",
},

innerRing: {
  width: 100,
  height: 100,
  borderRadius: 50,
  backgroundColor: "#E53935",
  justifyContent: "center",
  alignItems: "center",
},

});


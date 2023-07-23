import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';

const MapScreen = ({ route }) => {
  const { params } = route;
  const { route_long_name } = params;

  const renderMap = () => {
    return (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 18.4861,  // Latitud del centro de Santo Domingo
          longitude: -69.9312,  // Longitud del centro de Santo Domingo
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Dibuja la polilínea de la ruta en el mapa */}
        <Polyline
          coordinates={[]}
          strokeWidth={5}
          strokeColor="red"
        />
      </MapView>
    );
  };

  return <View style={styles.container}>{renderMap()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

const MapScreen = ({ route }) => {
  const { stops } = route.params;

  const renderMap = (firstStop, secondStop) => (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      customMapStyle={darkMapStyle}
      initialRegion={{
        latitude: firstStop.stop_lat,
        longitude: firstStop.stop_lon,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      key={firstStop.stop_id}
    >
      <Marker
        coordinate={{ latitude: firstStop.stop_lat, longitude: firstStop.stop_lon }}
        title={firstStop.stop_name}
        description="Primera parada"
      />
      <Marker
        coordinate={{ latitude: secondStop.stop_lat, longitude: secondStop.stop_lon }}
        title={secondStop.stop_name}
        description="Segunda parada"
      />
    </MapView>
  );

  const renderMaps = () => {
    const maps = [];
    for (let i = 0; i < stops.length; i += 2) {
      const firstStop = stops[i];
      const secondStop = stops[i + 1] ? stops[i + 1] : stops[i];
      maps.push(renderMap(firstStop, secondStop));
    }
    return maps;
  };

  return (
    <View style={styles.container}>
      {renderMaps()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { height: '100%' }, 
});

const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
  { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#263c3f' }] },
  { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#6b9a76' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#38414e' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#212a37' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#9ca5b3' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#746855' }] },
  { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#1f2835' }] },
  { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#f3d19c' }] },
  { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#2f3948' }] },
  { featureType: 'transit.station', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#17263c' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#515c6d' }] },
  { featureType: 'water', elementType: 'labels.text.stroke', stylers: [{ color: '#17263c' }] },
];

export default MapScreen;

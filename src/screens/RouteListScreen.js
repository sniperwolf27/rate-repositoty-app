import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { getStops } from '../../api.js';

const RouteListScreen = ({ navigation }) => {
  const [stops, setStops] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredStops, setFilteredStops] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      title: 'Wayfinders',
      headerStyle: {
        backgroundColor: '#F2EAD3',
      },
      headerTintColor: '#3F2305',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontStyle: 'italic',
      },
    });

    const fetchStops = async () => {
      const stopsData = await getStops();
      setStops(stopsData);
      setFilteredStops(stopsData);
    };

    fetchStops();
  }, []);

  useEffect(() => {
    if (search === '') {
      setFilteredStops(stops);
    } else {
      const newFilteredStops = stops.filter(stop => stop.stop_name.toLowerCase().includes(search.toLowerCase()));
      setFilteredStops(newFilteredStops);
    }
  }, [search, stops]);

  const updateSearch = (search) => {
    setSearch(search);
  };

  const renderStopItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('MapScreen', { stop: item })}
    >
      <Text style={styles.title}>{item.stop_name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Introduzca el nombre de la parada..."
        onChangeText={updateSearch}
        value={search}
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputStyle}
      />
      <FlatList
        data={filteredStops}
        renderItem={renderStopItem}
        keyExtractor={(item) => item.stop_id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2EAD3', 
    flex: 1,
    padding: 10,
  },
  item: {
    backgroundColor: '#3F2305', 
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
    color: '#F5F5F5', 
    fontFamily: 'Helvetica Neue',
  },
  searchContainer: {
    backgroundColor: '#F2EAD3',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    marginBottom: 10,
    marginTop: 10,
  },
  inputContainer: {
    backgroundColor: '#FFF', 
    borderRadius: 15,
  },
  inputStyle: {
    color: '#000',
  },
});

export default RouteListScreen;

import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { getRoutes, getStopsByRouteId, getNextStopByCurrentStopId } from '../../api';

const RouteListScreen = ({ navigation }) => {
  const [routes, setRoutes] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredRoutes, setFilteredRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      const routesData = await getRoutes();
      setRoutes(routesData);
      setFilteredRoutes(routesData);
    };

    fetchRoutes();
  }, []);

  useEffect(() => {
    if (search === '') {
      setFilteredRoutes(routes);
    } else {
      const newFilteredRoutes = routes.filter(route => route.route_long_name.toLowerCase().includes(search.toLowerCase()));
      setFilteredRoutes(newFilteredRoutes);
    }
  }, [search, routes]);

  const updateSearch = (search) => {
    setSearch(search);
  };

  const handleOnPress = async (routeId, routeName) => {
    const currentStop = await getStopsByRouteId(routeId);
    const nextStop = await getNextStopByCurrentStopId(currentStop.stop_id);
    navigation.navigate('MapScreen', { currentStop, nextStop });
  };

  const renderRouteItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => handleOnPress(item.route_id, item.route_long_name)}
    >
      <Text style={styles.title}>{item.route_long_name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Paradas</Text>
      <SearchBar
        placeholder="Buscar Ruta..."
        onChangeText={updateSearch}
        value={search}
        inputContainerStyle={styles.inputContainer}
        containerStyle={styles.searchContainer}
        inputStyle={styles.inputStyle}
        clearIcon={false}
        searchIcon={{ color: '#3F2305' }}
      />
      <FlatList
        data={filteredRoutes}
        renderItem={renderRouteItem}
        keyExtractor={(item) => item.route_id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2EAD3', 
    flex: 1,
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
    padding: 0,
  },
  inputContainer: {
    backgroundColor: '#FFF', 
    borderRadius: 15,
  },
  inputStyle: {
    color: '#000',
  },
  header: {
    fontSize: 40,
    color: '#3F2305',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'Helvetica-Oblique',
  },
});

export default RouteListScreen;

import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button } from 'react-native';
import { getRoutes } from '../api.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const RouteListScreen = ({ navigation }) => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      const routesData = await getRoutes();
      setRoutes(routesData);
    };

    fetchRoutes();
  }, []);

  const handleShowRouteOnMap = (route) => {
    navigation.navigate('Map', { route });
  };

  const renderRouteItem = ({ item }) => (
    <View style={{ marginBottom: 10 }}>
      <Text>{item.route_long_name}</Text>
      <Button
        title="Mostrar en el mapa"
        onPress={() => handleShowRouteOnMap(item)}
      />
    </View>
  );

  return (
    <View>
      <FlatList
        data={routes}
        renderItem={renderRouteItem}
        keyExtractor={(item) => item.route_id.toString()}
      />
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="RouteList"
          component={RouteListScreen}
          options={{ title: 'Lista de Rutas' }}
        />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{ title: 'Mapa de Ruta' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
